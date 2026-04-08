"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { CatalogProduct } from "@/types/commerce";

import { MaterialIcon } from "./material-icon";

type ProductPurchasePanelProps = {
  product: CatalogProduct;
};

export function ProductPurchasePanel({
  product,
}: ProductPurchasePanelProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[1] || product.sizes[0] || "Нэг хэмжээ",
  );
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    setFeedback("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/cart/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
            selectedSize,
          }),
        });

        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;

        if (!response.ok) {
          throw new Error(data?.message || "Сагс шинэчлэхэд алдаа гарлаа.");
        }

        setFeedback("Сагсанд амжилттай нэмлээ.");
        router.refresh();
      } catch (error) {
        setFeedback(
          error instanceof Error
            ? error.message
            : "Сагсанд нэмэх үед алдаа гарлаа.",
        );
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <label className="font-headline text-sm font-bold text-on-surface">
            Хэмжээ сонгох
          </label>
          <a
            className="font-label text-xs font-medium text-primary transition-all hover:underline"
            href="/profile"
          >
            Хэмжээний заавар
          </a>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                selectedSize === size
                  ? "bg-secondary-container font-bold text-on-secondary-container ring-2 ring-secondary-container ring-offset-2"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              }`}
              onClick={() => setSelectedSize(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row">
        <button
          className="flex flex-[2] items-center justify-center gap-3 rounded-[1.5rem] bg-gradient-to-br from-primary to-primary-container py-5 font-headline text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
          onClick={handleAddToCart}
          type="button"
        >
          <MaterialIcon name="shopping_bag" />
          {isPending ? "Нэмж байна..." : "Сагсанд нэмэх"}
        </button>
        <button className="flex flex-1 items-center justify-center rounded-[1.5rem] bg-surface-container-low py-5 font-headline font-bold text-on-surface transition-all hover:bg-surface-container-high">
          <MaterialIcon name="favorite" />
        </button>
      </div>

      <div className="min-h-6 text-sm text-primary" role="status">
        {feedback}
      </div>
    </div>
  );
}
