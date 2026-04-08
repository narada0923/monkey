import type { CartSummary, StoredCartLine } from "@/types/commerce";

import { getProductById } from "@/lib/commerce/catalog";
import { readStoredCartLines } from "@/lib/commerce/cart-cookie";
import { calculateCheckoutPricing } from "@/lib/commerce/pricing";

export function buildCartSummary(lines: StoredCartLine[]): CartSummary {
  const items = lines
    .map((line) => {
      const product = getProductById(line.productId);

      if (!product) {
        return null;
      }

      const selectedSize =
        line.selectedSize && product.sizes.includes(line.selectedSize)
          ? line.selectedSize
          : product.sizes[0] || "Нэг хэмжээ";

      return {
        productId: product.id,
        quantity: line.quantity,
        selectedSize,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        image: product.primaryImage,
        subtotal: product.price * line.quantity,
        currency: "MNT" as const,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    itemCount,
    subtotal,
    currency: "MNT",
  };
}

export async function getCartSummary() {
  const lines = await readStoredCartLines();

  return buildCartSummary(lines);
}

export function getCartCount(lines: StoredCartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function buildCheckoutSummary(
  lines: StoredCartLine[],
  shippingMethod: "standard" | "express",
) {
  const cart = buildCartSummary(lines);

  return {
    ...cart,
    pricing: calculateCheckoutPricing(cart.subtotal, shippingMethod),
  };
}
