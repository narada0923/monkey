import type { Metadata } from "next";

import { AdminCustomersPage } from "@/components/admin/customers-page";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPageAccess } from "@/lib/server/permissions";
import { listAllOrderRecords } from "@/lib/services/order.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Админ Хэрэглэгчид",
  description: "Monkey Closet админ хэрэглэгчдийн жагсаалт.",
};

export default async function AdminCustomersRoute() {
  const user = await requireAdminPageAccess();
  const orders = await listAllOrderRecords();
  const customers = Array.from(
    orders.reduce((map, order) => {
      const existing = map.get(order.authEmail);

      if (existing) {
        existing.orderCount += 1;
        return map;
      }

      map.set(order.authEmail, {
        email: order.authEmail,
        name: order.authName,
        phone: order.customer.phone,
        orderCount: 1,
      });

      return map;
    }, new Map<string, { email: string; name: string; phone: string; orderCount: number }>()),
  ).map(([, value]) => value);

  return (
    <AdminShell activeHref="/admin/customers" user={user}>
      <AdminCustomersPage customers={customers} />
    </AdminShell>
  );
}
