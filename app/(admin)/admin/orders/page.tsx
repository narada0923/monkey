import type { Metadata } from "next";

import { AdminOrdersPage } from "@/components/admin/orders-page";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPageAccess } from "@/lib/server/permissions";
import { listAllOrderRecords } from "@/lib/services/order.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Админ Захиалгууд",
  description: "Monkey Closet админ захиалгын удирдлага.",
};

export default async function AdminOrdersRoute() {
  const user = await requireAdminPageAccess();

  return (
    <AdminShell activeHref="/admin/orders" user={user}>
      <AdminOrdersPage orders={await listAllOrderRecords()} />
    </AdminShell>
  );
}
