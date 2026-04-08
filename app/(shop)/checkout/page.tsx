import type { Metadata } from "next";

import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Monkey Closet | Төлбөр тооцоо",
  description: "Monkey Closet захиалгын төлбөр тооцооны хуудас.",
};

export default async function CheckoutRoute() {
  return <CheckoutPage />;
}
