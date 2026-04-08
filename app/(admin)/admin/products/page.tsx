import type { Metadata } from "next";

import { AdminProductsPage } from "@/components/admin/products-page";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPageAccess } from "@/lib/server/permissions";
import { listProducts } from "@/lib/services/product.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Админ Бүтээгдэхүүн",
  description: "Monkey Closet админ бүтээгдэхүүний жагсаалт.",
};

export default async function AdminProductsRoute() {
  const user = await requireAdminPageAccess();

  return (
    <AdminShell activeHref="/admin/products" user={user}>
      <AdminProductsPage products={listProducts()} />
    </AdminShell>
  );
}
