import type { Metadata } from "next";

import { AdminDashboardPage } from "@/components/admin/dashboard-page";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPageAccess } from "@/lib/server/permissions";
import { listAllOrderRecords } from "@/lib/services/order.service";
import { listProducts } from "@/lib/services/product.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Админ",
  description: "Monkey Closet хянах самбар.",
};

export default async function AdminDashboardRoute() {
  const user = await requireAdminPageAccess();
  const [orders, products] = await Promise.all([
    listAllOrderRecords(),
    Promise.resolve(listProducts()),
  ]);
  const customerCount = new Set(orders.map((order) => order.authEmail)).size;

  return (
    <AdminShell activeHref="/admin" user={user}>
      <AdminDashboardPage
        customerCount={customerCount}
        orders={orders}
        productCount={products.length}
      />
    </AdminShell>
  );
}
