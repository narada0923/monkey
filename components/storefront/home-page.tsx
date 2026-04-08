import Image from "next/image";
import Link from "next/link";

import { MaterialIcon } from "./material-icon";
import { ParentsPocket } from "./parents-pocket";
import { StoreFooter } from "./store-footer";
import { homeArrivals, homeBentoTiles, homeCategories, homeHero } from "./store-data";
import { StoreNavbar } from "./store-navbar";

export function HomePage() {
  return (
    <>
      <StoreNavbar activeKey="new" />
      <main className="space-y-24 pt-24">
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="group relative h-[716px] w-full overflow-hidden rounded-[2rem]">
            <Image
              fill
              alt={homeHero.title}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="100vw"
              src={homeHero.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div className="max-w-2xl">
                <h1 className="font-headline text-5xl font-extrabold leading-tight text-white md:text-7xl">
                  {homeHero.title}
                </h1>
                <p className="mt-4 text-lg font-light text-white/90 md:text-xl">
                  {homeHero.description}
                </p>
              </div>
              <Link
                className="rounded-full bg-white px-10 py-5 font-headline text-lg font-bold text-primary transition-colors hover:bg-[#ffdbca]"
                href="/products"
              >
                Цогцолбор үзэх
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 flex items-end justify-between">
            <div className="space-y-2">
              <span className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Үндсэн хэрэгцээ
              </span>
              <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
                Ангилалаар дэлгүүр хэсэх
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {homeCategories.map((category) => (
              <Link
                key={category.title}
                className={`group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-container-low ${
                  category.lifted ? "md:-translate-y-6" : ""
                }`}
                href={category.href}
                id={category.title === "Охид" ? "girls" : category.title === "Хөвгүүд" ? "boys" : undefined}
              >
                <Image
                  fill
                  alt={category.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  src={category.image}
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-30" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="font-headline text-3xl font-bold text-white">
                    {category.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center font-medium text-white hover:underline">
                    Үзэх <MaterialIcon className="ml-2" name="trending_flat" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="bg-surface-container-low py-24"
          id="new-arrivals"
        >
          <div className="mx-auto mb-12 flex max-w-7xl items-center justify-between px-6 md:px-12">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
              Шинээр ирсэн
            </h2>
            <div className="flex gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-colors hover:bg-white">
                <MaterialIcon name="chevron_left" />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-colors hover:bg-white">
                <MaterialIcon name="chevron_right" />
              </button>
            </div>
          </div>

          <div className="hide-scrollbar mx-auto flex max-w-[1440px] gap-8 overflow-x-auto px-6 md:px-12">
            {homeArrivals.map((product) => (
              <Link
                key={product.title}
                className="group min-w-[300px] md:min-w-[380px]"
                href={product.href}
              >
                <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-surface-container-lowest">
                  <Image
                    fill
                    alt={product.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="380px"
                    src={product.image}
                  />
                  <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    <MaterialIcon className="text-sm" name="favorite" />
                  </button>
                </div>
                <div className="mt-6 space-y-1">
                  <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant">
                    {product.category}
                  </p>
                  <h4 className="font-headline text-xl font-bold text-on-surface">
                    {product.title}
                  </h4>
                  <p className="font-body font-semibold text-primary">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
          <div className="mb-16 space-y-4 text-center">
            <span className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Хэрэглэгчдийн сонголт
            </span>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
              Хамгийн их таалагдсан цуглуулгууд
            </h2>
          </div>

          <div className="grid auto-rows-[300px] grid-cols-1 gap-8 md:grid-cols-12">
            {homeBentoTiles.map((tile) => {
              if (tile.layout === "accent") {
                return (
                  <Link
                    key={tile.title}
                    className="group relative overflow-hidden rounded-[2rem] bg-secondary-container md:col-span-4"
                    href={tile.href}
                  >
                    <div className="flex h-full flex-col justify-between p-8">
                      <MaterialIcon
                        className="text-4xl text-on-secondary-container"
                        filled
                        name="star_rate"
                      />
                      <div>
                        <h3 className="font-headline text-2xl font-bold text-on-secondary-container">
                          {tile.title}
                        </h3>
                        <p className="mt-2 text-on-secondary-container/80">
                          {tile.description}
                        </p>
                        <span className="mt-4 inline-block border-b-2 border-on-secondary-container font-bold text-on-secondary-container">
                          Бэлэг үзэх
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              }

              const layoutClass =
                tile.layout === "wide"
                  ? "md:col-span-8"
                  : tile.layout === "portrait"
                    ? "md:col-span-4"
                    : "md:col-span-8";

              return (
                <Link
                  key={tile.title}
                  className={`group relative overflow-hidden rounded-[2rem] bg-surface-container ${layoutClass}`}
                  href={tile.href}
                >
                  <Image
                    fill
                    alt={tile.title}
                    className={`object-cover transition-transform duration-700 ${
                      tile.layout === "portrait" ? "group-hover:scale-110" : "group-hover:scale-105"
                    }`}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    src={tile.image ?? ""}
                  />
                  {tile.layout === "wide" ? (
                    <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/60 to-transparent px-12">
                      <h3 className="font-headline text-3xl font-bold text-white">
                        {tile.title}
                      </h3>
                      <p className="mt-2 max-w-xs text-white/80">{tile.description}</p>
                      <span className="mt-6 self-start rounded-full border border-white/30 bg-white/20 px-8 py-3 text-white backdrop-blur-lg transition-all hover:bg-white/40">
                        Багцыг үзэх
                      </span>
                    </div>
                  ) : tile.layout === "portrait" ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <h3 className="font-headline text-2xl font-bold text-white">
                        {tile.title}
                      </h3>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-12">
                      <h3 className="font-headline text-3xl font-bold text-white">
                        {tile.title}
                      </h3>
                      <p className="mt-2 text-white/80">{tile.description}</p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        <ParentsPocket />
      </main>
      <StoreFooter />
    </>
  );
}
