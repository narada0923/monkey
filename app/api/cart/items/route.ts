import { NextResponse } from "next/server";

import { getProductById } from "@/lib/commerce/catalog";
import {
  addStoredCartLine,
  cartCookieOptions,
  readStoredCartLines,
  serializeStoredCart,
} from "@/lib/commerce/cart-cookie";
import { buildCartSummary } from "@/lib/commerce/cart-service";
import { cartItemInputSchema } from "@/lib/commerce/schemas";
import { getErrorMessage, getErrorStatusCode } from "@/lib/error-utils";
import { readValidatedJson } from "@/lib/request-utils";

export async function POST(request: Request) {
  try {
    const input = await readValidatedJson(request, cartItemInputSchema);
    const product = getProductById(input.productId);

    if (!product) {
      return NextResponse.json(
        { message: "Бараа олдсонгүй." },
        { status: 404 },
      );
    }

    const existingLines = await readStoredCartLines();
    const nextLines = addStoredCartLine(existingLines, {
      productId: product.id,
      quantity: input.quantity,
      selectedSize: input.selectedSize || product.sizes[0],
    });
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
