import { describe, expect, it } from "vitest";

import { calculateCheckoutPricing } from "@/lib/commerce/pricing";

describe("calculateCheckoutPricing", () => {
  it("calculates the standard shipping total correctly", () => {
    expect(calculateCheckoutPricing(113_000, "standard")).toEqual({
      subtotal: 113_000,
      shipping: 5_000,
      vat: 11_300,
      total: 129_300,
      currency: "MNT",
    });
  });

  it("calculates the express shipping total correctly", () => {
    expect(calculateCheckoutPricing(84_000, "express")).toEqual({
      subtotal: 84_000,
      shipping: 12_000,
      vat: 8_400,
      total: 104_400,
      currency: "MNT",
    });
  });
});
