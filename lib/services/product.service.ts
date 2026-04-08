import "server-only";

import { getFeaturedProduct, getProductBySlug, listCatalogProducts, listRelatedProducts } from "@/lib/commerce/catalog";

export function listProducts() {
  return listCatalogProducts();
}

export function getFeaturedShopProduct() {
  return getFeaturedProduct();
}

export function getShopProductBySlug(slug: string) {
  return getProductBySlug(slug);
}

export function listProductsByCategory(categorySlug: string) {
  const normalized = decodeURIComponent(categorySlug).toLowerCase();
  const audienceMap: Record<string, string[]> = {
    girls: ["merino-knit-sweater", "soft-velvet-pants"],
    boys: ["merino-knit-sweater", "sheepskin-boots"],
    accessories: ["merino-wool-hat", "nordic-wooden-toy"],
  };

  const audienceProducts = audienceMap[normalized];

  if (audienceProducts) {
    return listCatalogProducts().filter((product) =>
      audienceProducts.includes(product.id),
    );
  }

  return listCatalogProducts().filter((product) => {
    const slug = product.category
      .toLowerCase()
      .replace(/\s+/g, "-");

    return slug === normalized;
  });
}

export function listRelatedShopProducts(productId: string) {
  return listRelatedProducts(productId);
}
