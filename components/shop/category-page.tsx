import { PageIntro } from "@/components/layout/page-intro";
import { StoreFooter } from "@/components/storefront/store-footer";
import { StoreNavbar } from "@/components/storefront/store-navbar";
import type { CatalogProduct } from "@/types/commerce";

import { ProductGrid } from "./product-grid";

type CategoryPageProps = {
  slug: string;
  title: string;
  description: string;
  products: CatalogProduct[];
};

export async function CategoryPage({
  slug,
  title,
  description,
  products,
}: CategoryPageProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto max-w-7xl space-y-12 px-6 pb-16 pt-28 lg:px-8">
        <PageIntro
          description={description}
          eyebrow={`Ангилал · ${slug}`}
          title={title}
        />

        <ProductGrid
          emptyDescription="Энэ ангилалд хараахан бүтээгдэхүүн тохируулагдаагүй байна. Өөр ангилал эсвэл бүх бүтээгдэхүүний хуудсыг үзнэ үү."
          emptyTitle="Энэ ангилал хоосон байна"
          products={products}
        />
      </main>
      <StoreFooter />
    </>
  );
}
