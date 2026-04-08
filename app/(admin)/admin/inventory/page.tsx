import type { Metadata } from "next";

import { AdminInventoryPage } from "@/components/admin/inventory-page";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPageAccess } from "@/lib/server/permissions";
import { listInventorySnapshots } from "@/lib/services/inventory.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Админ Нөөц",
  description: "Monkey Closet админ нөөцийн удирдлага.",
};

export default async function AdminInventoryRoute() {
  const user = await requireAdminPageAccess();

  return (
    <AdminShell activeHref="/admin/inventory" user={user}>
      <AdminInventoryPage inventory={listInventorySnapshots()} />
    </AdminShell>
  );
}
