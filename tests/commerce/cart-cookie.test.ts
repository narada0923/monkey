import { describe, expect, it } from "vitest";

import {
  addStoredCartLine,
  parseStoredCart,
  removeStoredCartLine,
  updateStoredCartLine,
} from "@/lib/commerce/cart-cookie";

describe("cart cookie helpers", () => {
  it("merges matching product lines and caps the quantity", () => {
    const result = addStoredCartLine(
      [{ productId: "merino-knit-sweater", quantity: 9, selectedSize: "2-3н" }],
      { productId: "merino-knit-sweater", quantity: 3, selectedSize: "2-3н" },
    );

    expect(result).toEqual([
      { productId: "merino-knit-sweater", quantity: 10, selectedSize: "2-3н" },
    ]);
  });

  it("drops a line when the updated quantity becomes zero", () => {
    const result = updateStoredCartLine(
      [{ productId: "merino-knit-sweater", quantity: 2, selectedSize: "2-3н" }],
      "merino-knit-sweater",
      { quantity: 0 },
    );

    expect(result).toEqual([]);
  });

  it("removes invalid cookie payloads safely", () => {
    expect(parseStoredCart("{bad json")).toEqual([]);
    expect(parseStoredCart(JSON.stringify([{ productId: "", quantity: 1 }]))).toEqual(
      [],
    );
  });

  it("removes a single product by id", () => {
    const result = removeStoredCartLine(
      [
        { productId: "merino-knit-sweater", quantity: 1, selectedSize: "2-3н" },
        { productId: "nordic-wooden-toy", quantity: 1, selectedSize: "Нэг хэмжээ" },
      ],
      "merino-knit-sweater",
    );

    expect(result).toEqual([
      { productId: "nordic-wooden-toy", quantity: 1, selectedSize: "Нэг хэмжээ" },
    ]);
  });
});
