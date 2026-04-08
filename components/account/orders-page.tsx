import Link from "next/link";

import { AccountShell } from "@/components/layout/account-shell";
import { EmptyState } from "@/components/layout/empty-state";
import { MaterialIcon } from "@/components/storefront/material-icon";
import type { OrderRecord } from "@/types/commerce";
import { formatMoney } from "@/lib/commerce/pricing";

type OrdersPageProps = {
  orders: OrderRecord[];
};

export async function OrdersPage({ orders }: OrdersPageProps) {
  return (
    <AccountShell
      activeHref="/orders"
      description="Таны үүсгэсэн бүх захиалга, төлбөрийн төлөв, хүргэлтийн мэдээлэл."
      title="Захиалгууд"
    >
      {!orders.length ? (
        <EmptyState
          actionHref="/products"
          actionLabel="Бүтээгдэхүүн үзэх"
          description="Анхны захиалгаа хийсний дараа бүх түүх энд харагдана."
          icon="package_2"
          title="Захиалгын түүх алга"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.orderNumber}
              className="block rounded-[2rem] bg-surface-container-low p-6 shadow-sm transition-transform hover:-translate-y-0.5"
              href={`/order/${order.orderNumber}`}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-primary/10 text-primary">
                    <MaterialIcon
                      name={order.status === "paid" ? "check_circle" : "pending"}
                    />
                  </div>
                  <div>
                    <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      {order.orderNumber}
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-on-surface">
                      {order.status === "paid" ? "Төлөгдсөн" : "Төлбөр хүлээгдэж байна"}
                    </h2>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      {new Intl.DateTimeFormat("mn-MN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-on-surface-variant">Нийт төлсөн</p>
                  <p className="mt-2 text-xl font-bold text-primary">
                    {formatMoney(order.pricing.total)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AccountShell>
  );
}
