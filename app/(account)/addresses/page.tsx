import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AddressesPage } from "@/components/account/addresses-page";
import { getCurrentUser } from "@/lib/auth";
import { listUserOrders } from "@/lib/services/order.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Хаягууд",
  description: "Monkey Closet хэрэглэгчийн хүргэлтийн мэдээлэл.",
};

export default async function AddressesRoute() {
  const user = await getCurrentUser();

  console.log(user)

  if (!user) {
    redirect("/login");
  }

  const latestOrder = (await listUserOrders(user.id))[0];

  return (
    <AddressesPage
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
    />
  );
}
