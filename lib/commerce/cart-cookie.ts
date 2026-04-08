import { cookies } from "next/headers";
import { z } from "zod";

import type { StoredCartLine } from "@/types/commerce";

export const CART_COOKIE_NAME = "monkey-cart";

const storedCartLineSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
  selectedSize: z.string().max(30).optional(),
});

const storedCartSchema = z.array(storedCartLineSchema).max(50);

export const cartCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
};

export function parseStoredCart(value?: string): StoredCartLine[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    const result = storedCartSchema.safeParse(parsed);

    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

export async function readStoredCartLines() {
  const cookieStore = await cookies();

  return parseStoredCart(cookieStore.get(CART_COOKIE_NAME)?.value);
}

export function serializeStoredCart(lines: StoredCartLine[]) {
  return JSON.stringify(lines);
}

export function addStoredCartLine(
  lines: StoredCartLine[],
  nextLine: StoredCartLine,
) {
  const existingIndex = lines.findIndex(
    (line) =>
      line.productId === nextLine.productId &&
      (line.selectedSize || "") === (nextLine.selectedSize || ""),
  );

  if (existingIndex === -1) {
    return [...lines, nextLine];
  }

  return lines.map((line, index) =>
    index === existingIndex
      ? {
          ...line,
          quantity: Math.min(line.quantity + nextLine.quantity, 10),
        }
      : line,
  );
}

export function updateStoredCartLine(
  lines: StoredCartLine[],
  productId: string,
  update: Partial<StoredCartLine>,
) {
  return lines
    .map((line) =>
      line.productId === productId
        ? {
            ...line,
            ...update,
            quantity: Math.max(0, Math.min(update.quantity ?? line.quantity, 10)),
          }
        : line,
    )
    .filter((line) => line.quantity > 0);
}

export function removeStoredCartLine(lines: StoredCartLine[], productId: string) {
  return lines.filter((line) => line.productId !== productId);
}
