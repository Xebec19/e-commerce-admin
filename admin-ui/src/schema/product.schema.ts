import { z } from "zod";

const ProductSchema = z.object({
  product_id: z.number(),
  image_url: z.string(),
  category_id: z.number(),
  category_name: z.string(),
  product_name: z.string().min(1, "Name is required"),
  price: z.number(),
  delivery_price: z.number(),
  gender: z.enum(["male", "female"]),
  product_desc: z.string(),
  quantity: z.number(),
  created_on: z.string(),
  total_count: z.number(),
});

export default ProductSchema;
