import type { Metadata } from "next";

import { CartPage } from "@/components/cart/cart-page";
import { getCartSummary } from "@/lib/services/cart.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Сагс",
  description: "Таны сонгосон бүтээгдэхүүнүүдийн сагс.",
};

export default async function CartRoute() {
  const cart = await getCartSummary();

  return <CartPage initialCart={cart} />;
}
