import "server-only";

import { listCatalogProducts } from "@/lib/commerce/catalog";

export function listInventorySnapshots() {
  return listCatalogProducts().map((product, index) => ({
    productId: product.id,
    productName: product.name,
    sku: `MC-${(index + 1).toString().padStart(4, "0")}`,
    stockOnHand: 12 + index * 4,
    status: index % 2 === 0 ? "in_stock" : "low_stock",
  }));
}
