import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/auth0";
import { readStoredCartLines } from "@/lib/commerce/cart-cookie";
import { createCheckoutInvoice } from "@/lib/commerce/checkout-service";
import { checkoutInvoiceSchema } from "@/lib/commerce/schemas";
import { getErrorMessage, getErrorStatusCode } from "@/lib/error-utils";
import { readValidatedJson } from "@/lib/request-utils";

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const input = await readValidatedJson(request, checkoutInvoiceSchema);
    const cartLines = await readStoredCartLines();
    const result = await createCheckoutInvoice({
      authUser: user,
      cartLines,
      customer: input.customer,
      shippingMethod: input.shippingMethod,
    });

    return NextResponse.json({
      invoiceId: result.invoice.invoiceId,
      qrText: result.invoice.qrText,
      qrImage: result.invoice.qrImage,
      urls: result.invoice.urls,
      order: {
        orderNumber: result.order.orderNumber,
        status: result.order.status,
      },
      pricing: result.order.pricing,
    });
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: getErrorStatusCode(error) },
    );
  }
}
