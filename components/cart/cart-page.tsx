import { CompactStoreFooter } from "@/components/storefront/store-footer";
import { StoreNavbar } from "@/components/storefront/store-navbar";
import type { CartSummary } from "@/types/commerce";

import { CartContent } from "./cart-content";

type CartPageProps = {
  initialCart: CartSummary;
};

export function CartPage({ initialCart }: CartPageProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8">
        <div className="mb-10">
          <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Сагс
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-on-surface">
            Таны сонгосон бараанууд
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-on-surface-variant">
            Захиалгаа баталгаажуулахаас өмнө тоо хэмжээ, хэмжээ, нийт дүнгээ шалгаарай.
          </p>
        </div>

        <CartContent initialCart={initialCart} />
      </main>
      <CompactStoreFooter variant="checkout" />
    </>
  );
}
