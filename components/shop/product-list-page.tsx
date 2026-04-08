import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { StoreFooter } from "@/components/storefront/store-footer";
import { StoreNavbar } from "@/components/storefront/store-navbar";
import type { CatalogProduct } from "@/types/commerce";

import { ProductGrid } from "./product-grid";

type ProductListPageProps = {
  products: CatalogProduct[];
};

export async function ProductListPage({ products }: ProductListPageProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto max-w-7xl space-y-12 px-6 pb-16 pt-28 lg:px-8">
        <PageIntro
          actions={
            <Link
              className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              href="/categories/accessories"
            >
              Онцлох ангилал
            </Link>
          }
          description="Monkey Closet-ийн үндсэн цуглуулга, шинэ ирэлт, өдөр тутмын хамгийн эрэлттэй бүтээгдэхүүнүүдийг эндээс нэг дор үзээрэй."
          eyebrow="Каталог"
          title="Бүх бүтээгдэхүүн"
        />

        <ProductGrid
          emptyDescription="Одоогоор нийтлэгдсэн бүтээгдэхүүн алга. Админ хэсгээс шинэ бүтээгдэхүүн нэмэхэд энд автоматаар харагдана."
          emptyTitle="Бүтээгдэхүүн олдсонгүй"
          products={products}
        />
      </main>
      <StoreFooter />
    </>
  );
}
