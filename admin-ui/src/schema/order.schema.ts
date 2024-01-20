import { z } from "zod";

export const ZodOrder = z.object({
  orderId: z.string(),
  userName: z.string(),
  email: z.string(),
  price: z.number(),
  deliveryPrice: z.number(),
  total: z.number(),
  status: z.string(),
  createdOn: z.string(),
  discountAmount: z.number(),
  discountCode: z.string(),
});
