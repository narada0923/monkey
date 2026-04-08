import { describe, expect, it } from "vitest";

import { cartItemInputSchema, checkoutInvoiceSchema } from "@/lib/commerce/schemas";

describe("commerce schemas", () => {
  it("accepts a valid cart add payload", () => {
    expect(
      cartItemInputSchema.parse({
        productId: "merino-knit-sweater",
        quantity: 2,
        selectedSize: "2-3н",
      }),
    ).toEqual({
      productId: "merino-knit-sweater",
      quantity: 2,
      selectedSize: "2-3н",
    });
  });

  it("rejects an invalid checkout payload", () => {
    const result = checkoutInvoiceSchema.safeParse({
      shippingMethod: "standard",
      customer: {
        firstName: "",
        lastName: "Болд",
        email: "bad-email",
        phone: "123",
        addressLine1: "12",
        city: "",
        district: "",
      },
    });

    expect(result.success).toBe(false);
  });
});
