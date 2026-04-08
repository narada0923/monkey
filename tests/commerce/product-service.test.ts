import { describe, expect, it } from "vitest";

import {
  listProducts,
  listProductsByCategory,
} from "@/lib/services/product.service";

describe("product service", () => {
  it("returns catalog products", () => {
    expect(listProducts().length).toBeGreaterThan(0);
  });

  it("maps audience categories to matching products", () => {
    const girls = listProductsByCategory("girls");
    const accessories = listProductsByCategory("accessories");

    expect(girls.length).toBeGreaterThan(0);
    expect(accessories.some((product) => product.slug === "merino-wool-hat")).toBe(
      true,
    );
  });
});
