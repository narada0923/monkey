export type CurrencyCode = "MNT";

export type ShippingMethodCode = "standard" | "express";

export type CatalogProduct = {
  id: string;
  slug: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  rating: string;
  sizes: string[];
  highlights: string[];
  primaryImage: string;
  gallery: Array<{
    title: string;
    image: string;
    interactive?: boolean;
  }>;
};

export type StoredCartLine = {
  productId: string;
  quantity: number;
  selectedSize?: string;
};

export type CartLine = {
  productId: string;
  quantity: number;
  selectedSize: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  subtotal: number;
  currency: CurrencyCode;
};

export type CartSummary = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  currency: CurrencyCode;
};

export type CheckoutCustomerInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  notes?: string;
};

export type CheckoutPricing = {
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  currency: CurrencyCode;
};

export type QPayInvoiceLink = {
  name?: string;
  description?: string;
  link?: string;
};

export type OrderStatus = "pending_payment" | "paid" | "cancelled";

export type OrderRecord = {
  orderNumber: string;
  senderInvoiceNo: string;
  authUserId: string;
  authEmail: string;
  authName: string;
  customer: CheckoutCustomerInput;
  shippingMethod: ShippingMethodCode;
  pricing: CheckoutPricing;
  items: CartLine[];
  status: OrderStatus;
  invoice: {
    invoiceId: string;
    qrText: string;
    qrImage: string;
    urls: QPayInvoiceLink[];
  };
  payment: {
    paymentId: string | null;
    paidAmount: number;
    latestStatus: string | null;
    latestDescription: string | null;
    paidAt: Date | null;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type OrderSummaryCard = {
  orderNumber: string;
  createdAt: string;
  totalLabel: string;
  statusLabel: string;
  delivered: boolean;
};
