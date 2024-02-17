import { z } from "zod";

const ZodProduct = z.object({
  product_id: z.number().optional(),
  product_name: z.string().min(1, "required"),
  featured_image: z.string().min(1, "required"),
  image_url: z.array(z.string()),
  quantity: z.number(),
  price: z.number(),
  delivery_price: z.number(),
  product_desc: z.string(),
  gender: z.string(),
  category_id: z.number(),
});

export default ZodProduct;
