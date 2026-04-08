import Image from "next/image";
import Link from "next/link";

import { formatMoney } from "@/lib/commerce/pricing";
import type { CatalogProduct } from "@/types/commerce";

type ProductCardProps = {
  product: CatalogProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      className="group rounded-[2rem] bg-surface-container-low p-4 shadow-sm transition-transform hover:-translate-y-1"
      href={`/products/${product.slug}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-surface-container-lowest">
        <Image
          fill
          alt={product.name}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 100vw"
          src={product.primaryImage}
        />
      </div>
      <div className="space-y-2 px-1 pb-1 pt-5">
        <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          {product.category}
        </p>
        <h3 className="text-xl font-bold text-on-surface">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-on-surface-variant">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">
            {formatMoney(product.price)}
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {product.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
