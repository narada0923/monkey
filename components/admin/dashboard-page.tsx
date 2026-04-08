import { PageIntro } from "@/components/layout/page-intro";
import { StatCard } from "@/components/layout/stat-card";
import { formatMoney } from "@/lib/commerce/pricing";
import type { OrderRecord } from "@/types/commerce";

type AdminDashboardPageProps = {
  productCount: number;
  orders: OrderRecord[];
  customerCount: number;
};

export function AdminDashboardPage({
  productCount,
  orders,
  customerCount,
}: AdminDashboardPageProps) {
  const paidRevenue = orders
    .filter((order) => order.status === "paid")
    .reduce((sum, order) => sum + order.pricing.total, 0);

  return (
    <div className="space-y-8">
      <PageIntro
        description="Каталог, төлбөр, хэрэглэгч, нөөцийн төлөвийг нэг дороос хянах төв удирдлагын хэсэг."
        eyebrow="Admin"
        title="Хянах самбар"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          description="Каталогт нийт хэдэн бүтээгдэхүүн байгааг харуулна."
          label="Бүтээгдэхүүн"
          value={String(productCount)}
        />
        <StatCard
          description="MongoDB дээр хадгалагдсан нийт захиалгын тоо."
          label="Захиалга"
          tone="accent"
          value={String(orders.length)}
        />
        <StatCard
          description="Захиалгаас бүрдсэн давтагдашгүй хэрэглэгчдийн тоо."
          label="Хэрэглэгч"
          value={String(customerCount)}
        />
        <StatCard
          description="Зөвхөн төлөгдсөн захиалгуудын борлуулалтын нийлбэр."
          label="Орлого"
          tone="success"
          value={formatMoney(paidRevenue)}
        />
      </div>

      <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-on-surface">Сүүлийн захиалгууд</h2>
        <div className="mt-6 space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div
              key={order.orderNumber}
              className="flex flex-col gap-3 rounded-[1.5rem] bg-surface-container-lowest p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-bold text-on-surface">
                  {order.orderNumber}
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {order.authName} · {order.customer.phone}
                </p>
              </div>
              <div className="text-sm text-on-surface-variant">
                {order.status === "paid" ? "Төлөгдсөн" : "Төлбөр хүлээгдэж байна"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
