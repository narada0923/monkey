import { NextResponse } from "next/server";

import {
  cartCookieOptions,
  readStoredCartLines,
  removeStoredCartLine,
  serializeStoredCart,
  updateStoredCartLine,
} from "@/lib/commerce/cart-cookie";
import { buildCartSummary } from "@/lib/commerce/cart-service";
import { cartItemUpdateSchema } from "@/lib/commerce/schemas";
import { getErrorMessage, getErrorStatusCode } from "@/lib/error-utils";
import { readValidatedJson } from "@/lib/request-utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    const input = await readValidatedJson(request, cartItemUpdateSchema);
    const existingLines = await readStoredCartLines();
    const nextLines = updateStoredCartLine(existingLines, productId, input);
    const summary = buildCartSummary(nextLines);
    const response = NextResponse.json(summary);

    response.cookies.set(
      "monkey-cart",
      serializeStoredCart(nextLines),
      cartCookieOptions,
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: getErrorStatusCode(error) },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    const existingLines = await readStoredCartLines();
    const nextLines = removeStoredCartLine(existingLines, productId);
    const summary = buildCartSummary(nextLines);
    const response = NextResponse.json(summary);

    response.cookies.set(
      "monkey-cart",
      serializeStoredCart(nextLines),
      cartCookieOptions,
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: getErrorStatusCode(error) },
    );
  }
}
