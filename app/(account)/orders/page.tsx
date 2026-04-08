import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { OrdersPage } from "@/components/account/orders-page";
import { getCurrentUser } from "@/lib/auth";
import { listUserOrders } from "@/lib/services/order.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Захиалгууд",
  description: "Monkey Closet хэрэглэгчийн бүх захиалгын жагсаалт.",
};

export default async function OrdersRoute() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <OrdersPage orders={await listUserOrders(user.id)} />;
}
