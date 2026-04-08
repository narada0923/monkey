import type { Metadata } from "next";

import { AdminCouponsPage } from "@/components/admin/coupons-page";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPageAccess } from "@/lib/server/permissions";

export const metadata: Metadata = {
  title: "Monkey Closet | Админ Купон",
  description: "Monkey Closet админ купон, хямдралын хэсэг.",
};

export default async function AdminCouponsRoute() {
  const user = await requireAdminPageAccess();

  return (
    <AdminShell activeHref="/admin/coupons" user={user}>
      <AdminCouponsPage />
    </AdminShell>
  );
}
