import Image from "next/image";
import Link from "next/link";

import { formatMoney } from "@/lib/commerce/pricing";
import { getFeaturedProduct, listRelatedProducts } from "@/lib/commerce/catalog";

import { MaterialIcon } from "./material-icon";
import { ProductPurchasePanel } from "./product-purchase-panel";
import { StoreFooter } from "./store-footer";
import { StoreNavbar } from "./store-navbar";

export function ProductPage() {
  const product = getFeaturedProduct();
  const relatedProducts = listRelatedProducts(product.id);

  return (
    <>
      <StoreNavbar activeKey="new" />
      <main className="mx-auto max-w-7xl px-6 pb-12 pt-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[2rem] bg-surface-container-low">
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
              <div className="absolute left-6 top-6 hidden md:block">
                <div className="max-w-[140px] rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest/90 p-4 shadow-sm backdrop-blur-sm">
                  <p className="mb-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Материал
                  </p>
                  <p className="font-headline text-xs font-semibold">
                    100% Органик Мерино ноос
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((item, index) => (
                <button
                  key={item.title}
                  className={`relative aspect-square overflow-hidden rounded-[1.5rem] ${
                    index === 0
                      ? "border-2 border-primary ring-2 ring-primary/20"
                      : "bg-surface-container-low transition-opacity hover:opacity-80"
                  }`}
                  type="button"
                >
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    sizes="180px"
                    src={item.image}
                  />
                  {item.interactive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 transition-opacity hover:opacity-100">
                      <MaterialIcon className="text-white" name="play_circle" />
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-5">
            <div>
              <span className="mb-3 block font-label text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {product.subtitle}
              </span>
              <h1 className="mb-4 font-headline text-4xl font-extrabold leading-tight text-on-surface md:text-5xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="font-headline text-3xl font-bold text-primary">
                  {formatMoney(product.price)}
                </span>
                <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1 text-secondary-container">
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
                <div className="flex items-center gap-2">
                  <MaterialIcon className="text-xl text-primary" name="temp_preferences_custom" />
                  <span className="text-sm font-medium text-on-surface">
                    {product.highlights[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MaterialIcon className="text-xl text-primary" name="eco" />
                  <span className="text-sm font-medium text-on-surface">
                    {product.highlights[1]}
                  </span>
                </div>
              </div>
            </div>

            <ProductPurchasePanel product={product} />

            <div className="mt-4 space-y-3 rounded-[2rem] bg-surface-container-low p-6">
              <div className="group flex cursor-pointer items-center justify-between">
                <span className="font-headline font-semibold text-on-surface">
                  Материал ба арчилгаа
                </span>
                <MaterialIcon className="text-primary transition-transform group-hover:translate-x-1" name="chevron_right" />
              </div>
              <div className="h-px bg-outline-variant/10" />
              <div className="group flex cursor-pointer items-center justify-between">
                <span className="font-headline font-semibold text-on-surface">
                  Хүргэлт ба буцаалт
                </span>
                <MaterialIcon className="text-primary transition-transform group-hover:translate-x-1" name="chevron_right" />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 font-headline text-3xl font-bold">
                Танд мөн таалагдаж магадгүй
              </h2>
              <p className="text-on-surface-variant">
                Намрын тухтай төрхөд төгс зохицох загварууд.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-all hover:bg-primary hover:text-white">
                <MaterialIcon name="arrow_back" />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-all hover:bg-primary hover:text-white">
                <MaterialIcon name="arrow_forward" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <Link
                key={product.id}
                className={`group ${index % 2 === 1 ? "md:translate-y-8" : ""}`}
                href="/product"
              >
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[2rem] bg-surface-container-low">
                  <Image
                    fill
                    alt={product.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="280px"
                    src={product.primaryImage}
                  />
                  <button className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 opacity-0 shadow-md backdrop-blur transition-opacity group-hover:opacity-100">
                    <MaterialIcon className="text-primary" name="add" />
                  </button>
                </div>
                <h3 className="font-headline font-bold text-on-surface">
                  {product.name}
                </h3>
                <p className="mt-1 font-bold text-primary">
                  {formatMoney(product.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
