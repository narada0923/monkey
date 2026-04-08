import type { Metadata } from "next";

import { ProductListPage } from "@/components/shop/product-list-page";
import { listProducts } from "@/lib/services/product.service";

export const metadata: Metadata = {
  title: "Monkey Closet | Бүтээгдэхүүн",
  description: "Monkey Closet-ийн бүх бүтээгдэхүүний каталог.",
};

export default function ProductsRoute() {
  return <ProductListPage products={listProducts()} />;
}
