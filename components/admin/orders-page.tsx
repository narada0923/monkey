import { PageIntro } from "@/components/layout/page-intro";
import { formatMoney } from "@/lib/commerce/pricing";
import type { OrderRecord } from "@/types/commerce";

type AdminOrdersPageProps = {
  orders: OrderRecord[];
};

export function AdminOrdersPage({ orders }: AdminOrdersPageProps) {
  return (
    <div className="space-y-8">
      <PageIntro
        description="Auth0 хэрэглэгч, QPay нэхэмжлэл, төлбөрийн төлөвтэй хамт захиалгын мэдээллийг хянах хүснэгт."
        eyebrow="Admin · Orders"
        title="Захиалгууд"
      />

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderNumber}
            className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  {order.orderNumber}
                </p>
                <h2 className="mt-2 text-xl font-bold text-on-surface">
                  {order.authName}
                </h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {order.authEmail} · {order.customer.phone}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-on-surface-variant">Нийт</p>
                <p className="mt-2 text-xl font-bold text-primary">
                  {formatMoney(order.pricing.total)}
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {order.status === "paid" ? "Төлөгдсөн" : "Төлбөр хүлээгдэж байна"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
