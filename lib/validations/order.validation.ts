import { z } from "zod";

export const orderLookupSchema = z.object({
  orderId: z.string().min(1, "Захиалгын дугаар дутуу байна."),
});
