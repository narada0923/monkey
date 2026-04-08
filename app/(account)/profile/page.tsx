import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountProfilePage } from "@/components/account/profile-page";
import { getCurrentUser } from "@/lib/auth";
import { mapOrderToProfileCard } from "@/lib/services/checkout.service";
import { listUserOrders } from "@/lib/services/order.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Миний мэдээлэл",
  description: "Monkey Closet хэрэглэгчийн профайл болон захиалгын түүх.",
};

export default async function ProfileRoute() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await listUserOrders(user.id);
  const latestOrder = orders[0];

  return (
    <AccountProfilePage
      latestAddress={
        latestOrder
          ? [
              `${latestOrder.customer.lastName} ${latestOrder.customer.firstName}`.trim(),
              latestOrder.customer.addressLine1,
              latestOrder.customer.addressLine2 || "",
              `${latestOrder.customer.district}, ${latestOrder.customer.city}`,
            ].filter(Boolean)
          : undefined
      }
      latestPhone={latestOrder?.customer.phone}
      orders={orders.map(mapOrderToProfileCard)}
      user={user}
    />
  );
}
