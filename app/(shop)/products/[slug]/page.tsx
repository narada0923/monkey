import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/product/product-detail-page";
import {
  getShopProductBySlug,
  listRelatedShopProducts,
} from "@/lib/services/product.service";

type ProductDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getShopProductBySlug(slug);

  if (!product) {
    return {
      title: "Monkey Closet | Бүтээгдэхүүн олдсонгүй",
    };
  }

  return {
    title: `Monkey Closet | ${product.name}`,
    description: product.description,
  };
}

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { slug } = await params;
  const product = getShopProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={listRelatedShopProducts(product.id)}
    />
  );
}
