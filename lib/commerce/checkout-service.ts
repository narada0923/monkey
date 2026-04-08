import { randomUUID } from "node:crypto";

import type { AuthenticatedUser } from "@/lib/auth0";
import { AppError } from "@/lib/error-utils";
import {
  findOrderByInvoiceId,
  findOrderBySenderInvoiceNo,
  insertOrder,
  markOrderPaid,
} from "@/lib/commerce/order-repository";
import { buildCheckoutSummary } from "@/lib/commerce/cart-service";
import {
  buildQPayCallbackUrl,
  cancelQPayInvoice,
  checkQPayPayment,
  createQPayInvoice,
  getQPayPaymentSnapshot,
  type CreateQPayInvoiceInput,
} from "@/lib/commerce/qpay";
import { SHIPPING_METHODS, formatMoney } from "@/lib/commerce/pricing";
import type {
  CheckoutCustomerInput,
  OrderRecord,
  OrderSummaryCard,
  ShippingMethodCode,
  StoredCartLine,
} from "@/types/commerce";

function buildOrderNumber() {
  return `MC-${Date.now()}`;
}

function buildSenderInvoiceNo() {
  return `MONKEY-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`;
}

function buildReceiverCode(user: AuthenticatedUser) {
  return `WEB-${user.id.replace(/[^a-zA-Z0-9]/g, "").slice(-12) || Date.now()}`;
}

function buildInvoiceLines(
  items: ReturnType<typeof buildCheckoutSummary>["items"],
  shippingMethod: ShippingMethodCode,
  shippingAmount: number,
  vatAmount: number,
): CreateQPayInvoiceInput["lines"] {
  return items.map((item, index) => ({
    line_description: `${item.name} • ${item.selectedSize}`,
    line_quantity: item.quantity.toFixed(2),
    line_unit_price: item.price.toFixed(2),
    note: item.subtitle,
    ...(index === 0 && shippingAmount > 0
      ? {
          surcharges: [
            {
              surcharge_code: shippingMethod.toUpperCase(),
              description: SHIPPING_METHODS[shippingMethod].label,
              amount: shippingAmount,
              note: SHIPPING_METHODS[shippingMethod].description,
            },
          ],
        }
      : {}),
    ...(index === 0 && vatAmount > 0
      ? {
          taxes: [
            {
              tax_code: "VAT",
              description: "НӨАТ",
              amount: vatAmount,
              note: "Монгол Улсын НӨАТ",
            },
          ],
        }
      : {}),
  }));
}

function buildCustomerNote(customer: CheckoutCustomerInput) {
  return [
    `Хүргэлтийн хаяг: ${customer.addressLine1}`,
    customer.addressLine2 ? customer.addressLine2 : null,
    `${customer.district}, ${customer.city}`,
    `Утас: ${customer.phone}`,
    customer.notes ? `Тэмдэглэл: ${customer.notes}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
}

export async function createCheckoutInvoice(input: {
  authUser: AuthenticatedUser;
  cartLines: StoredCartLine[];
  customer: CheckoutCustomerInput;
  shippingMethod: ShippingMethodCode;
}) {
  const checkout = buildCheckoutSummary(input.cartLines, input.shippingMethod);

  if (!checkout.items.length) {
    throw new AppError("Төлбөр үүсгэхийн өмнө сагсандаа бараа нэмнэ үү.", {
      statusCode: 400,
      code: "EMPTY_CART",
    });
  }

  const orderNumber = buildOrderNumber();
  const senderInvoiceNo = buildSenderInvoiceNo();
  const callbackUrl = buildQPayCallbackUrl(senderInvoiceNo);
  const note = buildCustomerNote(input.customer);

  const invoice = await createQPayInvoice({
    senderInvoiceNo,
    receiverCode: buildReceiverCode(input.authUser),
    description: `${orderNumber} захиалга`,
    amount: checkout.pricing.total,
    callbackUrl,
    note,
    receiverData: {
      name: `${input.customer.lastName} ${input.customer.firstName}`.trim(),
      email: input.customer.email,
      phone: input.customer.phone,
    },
    lines: buildInvoiceLines(
      checkout.items,
      input.shippingMethod,
      checkout.pricing.shipping,
      checkout.pricing.vat,
    ),
  });

  if (!invoice.invoice_id) {
    throw new AppError("QPay нэхэмжлэлийн дугаар ирсэнгүй.", {
      statusCode: 502,
      code: "QPAY_INVOICE_INVALID",
    });
  }

  const now = new Date();
  const order: OrderRecord = {
    orderNumber,
    senderInvoiceNo,
    authUserId: input.authUser.id,
    authEmail: input.authUser.email,
    authName: input.authUser.name,
    customer: input.customer,
    shippingMethod: input.shippingMethod,
    pricing: checkout.pricing,
    items: checkout.items,
    status: "pending_payment",
    invoice: {
      invoiceId: invoice.invoice_id,
      qrText: invoice.qr_text || "",
      qrImage: invoice.qr_image || "",
      urls: Array.isArray(invoice.urls) ? invoice.urls : [],
    },
    payment: {
      paymentId: null,
      paidAmount: 0,
      latestStatus: null,
      latestDescription: null,
      paidAt: null,
    },
    createdAt: now,
    updatedAt: now,
  };

  try {
    await insertOrder(order);
  } catch (error) {
    try {
      await cancelQPayInvoice(invoice.invoice_id);
    } catch {
      // Best effort cleanup when order persistence fails after invoice creation.
    }

    throw error;
  }

  return {
    order,
    invoice: {
      invoiceId: invoice.invoice_id,
      qrText: invoice.qr_text || "",
      qrImage: invoice.qr_image || "",
      urls: Array.isArray(invoice.urls) ? invoice.urls : [],
    },
  };
}

export async function getCheckoutInvoiceStatus(input: {
  invoiceId: string;
  authUserId: string;
}) {
  const order = await findOrderByInvoiceId(input.invoiceId);

  if (!order) {
    throw new AppError("Захиалга олдсонгүй.", {
      statusCode: 404,
      code: "ORDER_NOT_FOUND",
    });
  }

  if (order.authUserId !== input.authUserId) {
    throw new AppError("Энэ нэхэмжлэлд хандах эрх алга.", {
      statusCode: 403,
      code: "ORDER_FORBIDDEN",
    });
  }

  if (order.status === "paid") {
    return {
      order,
      payment: {
        paid: true,
        paymentId: order.payment.paymentId,
        paidAmount: order.payment.paidAmount,
        latestStatus: order.payment.latestStatus,
        latestDescription: order.payment.latestDescription,
        rows: [],
      },
    };
  }

  const paymentCheck = await checkQPayPayment(input.invoiceId);
  const paymentSnapshot = getQPayPaymentSnapshot(paymentCheck);

  if (!paymentSnapshot.paid) {
    return {
      order,
      payment: paymentSnapshot,
    };
  }

  const paidOrder = await markOrderPaid({
    invoiceId: input.invoiceId,
    paymentId: paymentSnapshot.paymentId,
    paidAmount: paymentSnapshot.paidAmount,
    latestStatus: paymentSnapshot.latestStatus,
    latestDescription: paymentSnapshot.latestDescription,
  });

  return {
    order: paidOrder ?? order,
    payment: paymentSnapshot,
  };
}

export async function syncOrderFromWebhook(input: {
  invoiceId?: string | null;
  senderInvoiceNo?: string | null;
}) {
  const order =
    (input.invoiceId ? await findOrderByInvoiceId(input.invoiceId) : null) ||
    (input.senderInvoiceNo
      ? await findOrderBySenderInvoiceNo(input.senderInvoiceNo)
      : null);

  if (!order) {
    return null;
  }

  const paymentCheck = await checkQPayPayment(order.invoice.invoiceId);
  const paymentSnapshot = getQPayPaymentSnapshot(paymentCheck);

  if (!paymentSnapshot.paid) {
    return {
      order,
      payment: paymentSnapshot,
    };
  }

  const paidOrder = await markOrderPaid({
    invoiceId: order.invoice.invoiceId,
    paymentId: paymentSnapshot.paymentId,
    paidAmount: paymentSnapshot.paidAmount,
    latestStatus: paymentSnapshot.latestStatus,
    latestDescription: paymentSnapshot.latestDescription,
  });

  return {
    order: paidOrder ?? order,
    payment: paymentSnapshot,
  };
}

export function mapOrderToProfileCard(order: OrderRecord): OrderSummaryCard {
  return {
    orderNumber: order.orderNumber,
    createdAt: new Intl.DateTimeFormat("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(order.createdAt),
    totalLabel: formatMoney(order.pricing.total),
    statusLabel: order.status === "paid" ? "Төлөгдсөн" : "Төлбөр хүлээгдэж байна",
    delivered: order.status === "paid",
  };
}
