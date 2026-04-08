import { z } from "zod";

export const cartItemInputSchema = z.object({
  productId: z.string().min(1, "Барааны мэдээлэл дутуу байна."),
  quantity: z.coerce
    .number()
    .int()
    .min(1, "Тоо хэмжээ 1-ээс багагүй байна.")
    .max(10, "Нэг удаад 10-аас их бараа нэмж болохгүй.")
    .default(1),
  selectedSize: z.string().trim().max(30).optional(),
});

export const cartItemUpdateSchema = z.object({
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Тоо хэмжээ 0-ээс бага байж болохгүй.")
    .max(10, "Тоо хэмжээ 10-аас их байж болохгүй.")
    .optional(),
  selectedSize: z.string().trim().max(30).optional(),
});

export const checkoutInvoiceSchema = z.object({
  shippingMethod: z.enum(["standard", "express"]),
  customer: z.object({
    firstName: z.string().trim().min(1, "Нэрээ оруулна уу."),
    lastName: z.string().trim().min(1, "Овгоо оруулна уу."),
    email: z.string().trim().email("Имэйл хаяг буруу байна."),
    phone: z.string().trim().min(6, "Утасны дугаар буруу байна."),
    addressLine1: z.string().trim().min(5, "Хүргэлтийн хаягаа дэлгэрэнгүй оруулна уу."),
    addressLine2: z.string().trim().max(120).optional(),
    city: z.string().trim().min(2, "Хотын нэр буруу байна."),
    district: z.string().trim().min(2, "Дүүргийн нэр буруу байна."),
    notes: z.string().trim().max(500).optional(),
  }),
});

export type CartItemInput = z.infer<typeof cartItemInputSchema>;
export type CartItemUpdateInput = z.infer<typeof cartItemUpdateSchema>;
export type CheckoutInvoiceInput = z.infer<typeof checkoutInvoiceSchema>;
