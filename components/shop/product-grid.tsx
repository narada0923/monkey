import type { CatalogProduct } from "@/types/commerce";

import { EmptyState } from "@/components/layout/empty-state";

import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: CatalogProduct[];
  emptyTitle: string;
  emptyDescription: string;
};

export function ProductGrid({
  products,
  emptyTitle,
  emptyDescription,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <EmptyState
        actionHref="/products"
        actionLabel="Бүх бүтээгдэхүүн үзэх"
        description={emptyDescription}
        icon="storefront"
        title={emptyTitle}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
