import Image from "next/image";

import { PageIntro } from "@/components/layout/page-intro";
import { CompactStoreFooter } from "@/components/storefront/store-footer";
import { StoreNavbar } from "@/components/storefront/store-navbar";
import { formatMoney } from "@/lib/commerce/pricing";
import type { OrderRecord } from "@/types/commerce";

type OrderDetailPageProps = {
  order: OrderRecord;
};

export async function OrderDetailPage({ order }: OrderDetailPageProps) {
  const addressLines = [
    `${order.customer.lastName} ${order.customer.firstName}`.trim(),
    order.customer.addressLine1,
    order.customer.addressLine2,
    `${order.customer.district}, ${order.customer.city}`,
    order.customer.phone,
  ].filter(Boolean);

  return (
    <>
      <StoreNavbar />
      <main className="mx-auto max-w-7xl space-y-10 px-6 pb-20 pt-28 lg:px-8">
        <PageIntro
          description="Төлбөр, хүргэлтийн мэдээлэл болон захиалсан бүтээгдэхүүний хураангуйг эндээс харна."
          eyebrow="Захиалга"
          title={`#${order.orderNumber}`}
        />

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[2rem] bg-surface-container-low p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/20 pb-6">
              <div>
                <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  Төлөв
                </p>
                <p className="mt-2 text-2xl font-bold text-on-surface">
                  {order.status === "paid" ? "Төлөгдсөн" : "Төлбөр хүлээгдэж байна"}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                {order.shippingMethod === "express" ? "Шуурхай хүргэлт" : "Энгийн хүргэлт"}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedSize}`}
                  className="flex gap-4 rounded-[1.5rem] bg-surface-container-lowest p-4"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[1rem]">
                    <Image
                      fill
                      alt={item.name}
                      className="object-cover"
                      sizes="80px"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-on-surface">{item.name}</h2>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        {item.subtitle}
                      </p>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        Хэмжээ: {item.selectedSize} · Тоо: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {formatMoney(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-surface-container-low p-6">
              <h2 className="text-xl font-bold text-on-surface">Төлбөрийн мэдээлэл</h2>
              <dl className="mt-5 space-y-3 text-sm text-on-surface-variant">
                <div className="flex justify-between gap-4">
                  <dt>Дүн</dt>
                  <dd>{formatMoney(order.pricing.subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Хүргэлт</dt>
                  <dd>{formatMoney(order.pricing.shipping)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>НӨАТ</dt>
                  <dd>{formatMoney(order.pricing.vat)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-outline-variant/20 pt-3 text-base font-bold text-on-surface">
                  <dt>Нийт</dt>
                  <dd>{formatMoney(order.pricing.total)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[2rem] bg-surface-container-low p-6">
              <h2 className="text-xl font-bold text-on-surface">Хүргэлтийн хаяг</h2>
              <div className="mt-5 space-y-2 text-sm leading-6 text-on-surface-variant">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-surface-container-low p-6">
              <h2 className="text-xl font-bold text-on-surface">QPay</h2>
              <div className="mt-5 space-y-2 text-sm text-on-surface-variant">
                <p>Нэхэмжлэл: {order.invoice.invoiceId}</p>
                <p>Төлбөрийн төлөв: {order.payment.latestDescription || "Хүлээгдэж байна"}</p>
                {order.payment.paymentId ? (
                  <p>QPay Payment ID: {order.payment.paymentId}</p>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <CompactStoreFooter variant="profile" />
    </>
  );
}
