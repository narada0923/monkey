import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/auth0";
import { cartCookieOptions } from "@/lib/commerce/cart-cookie";
import { getCheckoutInvoiceStatus } from "@/lib/commerce/checkout-service";
import { getErrorMessage, getErrorStatusCode } from "@/lib/error-utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ invoiceId: string }> },
) {
  try {
    const { invoiceId } = await params;

    if (!invoiceId) {
      return NextResponse.json(
        { message: "Нэхэмжлэлийн дугаар дутуу байна." },
        { status: 400 },
      );
    }

    const user = await requireCurrentUser();
    const result = await getCheckoutInvoiceStatus({
      invoiceId,
      authUserId: user.id,
    });
    const response = NextResponse.json({
      paid: result.payment.paid,
      paymentId: result.payment.paymentId,
      paidAmount: result.payment.paidAmount,
      latestStatus: result.payment.latestStatus,
      latestDescription: result.payment.latestDescription,
      orderNumber: result.order.orderNumber,
    });

    if (result.payment.paid) {
      response.cookies.set("monkey-cart", "[]", {
        ...cartCookieOptions,
        maxAge: 0,
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: getErrorStatusCode(error) },
    );
  }
}
