import { z } from "zod";

const ZodProduct = z.object({
  category_id: z.string().min(1, { message: "Required" }),
  product_name: z.string().min(1, { message: "Required" }),
  price: z
    .string({ invalid_type_error: "Invalid" })
    .refine((val) => !isNaN(+val), {
      message: "Price should be a number",
    }),
  delivery_price: z
    .string({ invalid_type_error: "Invalid" })
    .refine((val) => !isNaN(+val), {
      message: "Delivery Price should be a number",
    }),
  gender: z.string(),
  product_desc: z.string(),
  quantity: z
    .string({ invalid_type_error: "Invalid" })
    .refine((val) => !isNaN(+val), {
      message: "Quantity should be a number",
    }),
  country_id: z.string().min(1, { message: "Required" }),
  featured_image: z.any().refine((val) => val instanceof File, {
    message: "Please upload an image",
  }),
  images: z.any(),
});
export default ZodProduct;
