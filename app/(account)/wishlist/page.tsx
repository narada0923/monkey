import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { WishlistPage } from "@/components/account/wishlist-page";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Monkey Closet | Хадгалсан бараа",
  description: "Monkey Closet wishlist хуудас.",
};

export default async function WishlistRoute() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <WishlistPage />;
}
