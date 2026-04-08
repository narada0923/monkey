import Image from "next/image";
import Link from "next/link";

import { MaterialIcon } from "@/components/storefront/material-icon";
import { ProductPurchasePanel } from "@/components/storefront/product-purchase-panel";
import { StoreFooter } from "@/components/storefront/store-footer";
import { StoreNavbar } from "@/components/storefront/store-navbar";
import { formatMoney } from "@/lib/commerce/pricing";
import type { CatalogProduct } from "@/types/commerce";

type ProductDetailPageProps = {
  product: CatalogProduct;
  relatedProducts: CatalogProduct[];
};

export async function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto max-w-7xl px-6 pb-12 pt-28 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-container-low">
              <Image
                fill
                alt={product.name}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(min-width: 1024px) 56vw, 100vw"
                src={product.primaryImage}
              />
              <div className="absolute bottom-6 right-6 rounded-full border border-outline-variant/20 bg-surface/80 p-3 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <MaterialIcon className="text-primary" name="zoom_in" />
              </div>
            </div>

            {product.gallery.length ? (
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((item, index) => (
                  <div
                    key={item.title}
                    className={`relative aspect-square overflow-hidden rounded-[1.5rem] ${
                      index === 0
                        ? "border-2 border-primary ring-2 ring-primary/20"
                        : "bg-surface-container-low"
                    }`}
                  >
                    <Image
                      fill
                      alt={item.title}
                      className="object-cover"
                      sizes="180px"
                      src={item.image}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-5">
            <div>
              <span className="mb-3 block font-label text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {product.subtitle}
              </span>
              <h1 className="mb-4 text-4xl font-extrabold leading-tight text-on-surface md:text-5xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  {formatMoney(product.price)}
                </span>
                <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-secondary-container">
                  <MaterialIcon className="text-sm" filled name="star" />
                  <span className="text-xs font-bold text-on-secondary-container">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-on-surface-variant">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                {product.highlights.map((highlight, index) => (
                  <div key={highlight} className="flex items-center gap-2">
                    <MaterialIcon
                      className="text-xl text-primary"
                      name={index === 0 ? "temp_preferences_custom" : "eco"}
                    />
                    <span className="text-sm font-medium text-on-surface">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <ProductPurchasePanel product={product} />

            <div className="space-y-3 rounded-[2rem] bg-surface-container-low p-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface">Материал ба арчилгаа</span>
                <MaterialIcon className="text-primary" name="chevron_right" />
              </div>
              <div className="h-px bg-outline-variant/10" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface">Хүргэлт ба буцаалт</span>
                <MaterialIcon className="text-primary" name="chevron_right" />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-on-surface">
              Танд мөн таалагдаж магадгүй
            </h2>
            <p className="mt-2 text-on-surface-variant">
              Ижил уур амьсгалтай, хүүхдийн өдөр тутмын хэрэгцээнд тохирсон сонголтууд.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                className="group"
                href={`/products/${related.slug}`}
              >
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[2rem] bg-surface-container-low">
                  <Image
                    fill
                    alt={related.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="280px"
                    src={related.primaryImage}
                  />
                </div>
                <h3 className="font-bold text-on-surface">{related.name}</h3>
                <p className="mt-1 text-primary">{formatMoney(related.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
