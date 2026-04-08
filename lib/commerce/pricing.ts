import type { CheckoutPricing, ShippingMethodCode } from "@/types/commerce";

export const VAT_RATE = 0.1;

export const SHIPPING_METHODS: Record<
  ShippingMethodCode,
  {
    code: ShippingMethodCode;
    label: string;
    description: string;
    fee: number;
  }
> = {
  standard: {
    code: "standard",
    label: "Стандарт хүргэлт",
    description: "24-48 цагийн дотор хүргэгдэнэ",
    fee: 5_000,
  },
  express: {
    code: "express",
    label: "Шуурхай курьер",
    description: "20:00 цагаас өмнө захиалбал тухайн өдөртөө",
    fee: 12_000,
  },
};

export function roundMoney(value: number) {
  return Math.round(value);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(roundMoney(amount));
}

export function calculateCheckoutPricing(
  subtotal: number,
  shippingMethod: ShippingMethodCode,
): CheckoutPricing {
  const shipping = SHIPPING_METHODS[shippingMethod]?.fee ?? 0;
  const vat = roundMoney(subtotal * VAT_RATE);
  const total = roundMoney(subtotal + shipping + vat);

  return {
    subtotal: roundMoney(subtotal),
    shipping,
    vat,
    total,
    currency: "MNT",
  };
}
