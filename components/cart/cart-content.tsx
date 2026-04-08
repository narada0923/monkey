"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { EmptyState } from "@/components/layout/empty-state";
import { MaterialIcon } from "@/components/storefront/material-icon";
import { formatMoney } from "@/lib/commerce/pricing";
import type { CartSummary } from "@/types/commerce";

type CartContentProps = {
  initialCart: CartSummary;
};

async function readResponseBody<T>(response: Response) {
  const raw = await response.text();

  if (!raw) {
    return {} as T;
  }

  return JSON.parse(raw) as T;
}

export function CartContent({ initialCart }: CartContentProps) {
  const router = useRouter();
  const [cart, setCart] = useState(initialCart);
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateItem(productId: string, quantity: number) {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/cart/items/${productId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        });
        const data = await readResponseBody<CartSummary & { message?: string }>(
          response,
        );

        if (!response.ok) {
          throw new Error(data.message || "Сагсыг шинэчилж чадсангүй.");
        }

        setCart(data);
        setFeedback("Сагс шинэчлэгдлээ.");
        router.refresh();
      } catch (error) {
        setFeedback(
          error instanceof Error
            ? error.message
            : "Сагс шинэчлэх үед алдаа гарлаа.",
        );
      }
    });
  }

  function removeItem(productId: string) {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/cart/items/${productId}`, {
          method: "DELETE",
        });
        const data = await readResponseBody<CartSummary & { message?: string }>(
          response,
        );

        if (!response.ok) {
          throw new Error(data.message || "Барааг устгаж чадсангүй.");
        }

        setCart(data);
        setFeedback("Бараа сагснаас хасагдлаа.");
        router.refresh();
      } catch (error) {
        setFeedback(
          error instanceof Error ? error.message : "Бараа хасах үед алдаа гарлаа.",
        );
      }
    });
  }

  if (!cart.items.length) {
    return (
      <EmptyState
        actionHref="/products"
        actionLabel="Каталог руу буцах"
        description="Одоогоор сагс хоосон байна. Бүтээгдэхүүний хуудаснаас өөрт таалагдсан бараагаа нэмээд энд буцаж ирээрэй."
        icon="shopping_cart"
        title="Сагсанд бараа алга"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <section className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={`${item.productId}-${item.selectedSize}`}
            className="flex flex-col gap-5 rounded-[2rem] bg-surface-container-low p-5 shadow-sm md:flex-row"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] md:w-40">
              <Image
                fill
                alt={item.name}
                className="object-cover"
                sizes="160px"
                src={item.image}
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-on-surface-variant">
                      Хэмжээ: {item.selectedSize}
                    </p>
                  </div>
                  <button
                    className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                    disabled={isPending}
                    onClick={() => removeItem(item.productId)}
                    type="button"
                  >
                    <MaterialIcon name="close" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center rounded-full bg-surface-container-lowest p-1">
                  <button
                    className="rounded-full px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-high"
                    disabled={isPending || item.quantity <= 1}
                    onClick={() => updateItem(item.productId, item.quantity - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span className="min-w-12 text-center text-sm font-bold text-on-surface">
                    {item.quantity}
                  </span>
                  <button
                    className="rounded-full px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-high"
                    disabled={isPending || item.quantity >= 10}
                    onClick={() => updateItem(item.productId, item.quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm text-on-surface-variant">Дүн</p>
                  <p className="text-xl font-bold text-primary">
                    {formatMoney(item.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <aside className="h-fit rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-on-surface">Хураангуй</h2>
        <dl className="mt-6 space-y-3 text-sm text-on-surface-variant">
          <div className="flex justify-between">
            <dt>Нийт тоо</dt>
            <dd>{cart.itemCount}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Барааны дүн</dt>
            <dd>{formatMoney(cart.subtotal)}</dd>
          </div>
        </dl>

        <Link
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-center font-bold text-white transition-opacity hover:opacity-90"
          href="/checkout"
        >
          Төлбөр хэсэг рүү шилжих
        </Link>

        <Link
          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-surface-container-lowest px-6 py-4 text-center font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          href="/products"
        >
          Дахин худалдан авалт хийх
        </Link>

        <div className="mt-5 min-h-6 text-sm font-medium text-primary">
          {feedback}
        </div>
      </aside>
    </div>
  );
}
