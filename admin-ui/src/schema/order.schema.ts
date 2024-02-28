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

const ZodOrderSummary = z.object({
  order_id: z.string(),
  user_name: z.string(),
  email: z.string(),
  price: z.number(),
  delivery_price: z.number(),
  total: z.number(),
  status: z.string(),
  created_on: z.string(),
  billing_user_name: z.string(),
  billing_email: z.string(),
  billing_phone: z.string(),
  billing_address: z.string(),
  shipping_user_name: z.string(),
  shipping_email: z.string(),
  shipping_phone: z.string(),
  shipping_address: z.string(),
  discount_code: z.string(),
  discount_amount: z.number(),
});

const ZodOrderItem = z.object({
  od_id: z.number(),
  product_id: z.number(),
  product_name: z.string(),
  price: z.number(),
  delivery_price: z.number(),
  quantity: z.number(),
  product_desc: z.string(),
  status: z.string(),
  country_id: z.number(),
  category_id: z.number(),
  category_name: z.string(),
});

export const ZodOrderDetails = z.object({
  order: ZodOrderSummary,
  order_items: z.array(ZodOrderItem),
});
