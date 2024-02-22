import { z } from "zod";

export const ZodProduct = z.object({
  product_id: z.number({ invalid_type_error: "Invalid" }),
  category_id: z.number({ invalid_type_error: "Invalid" }),
  product_name: z.string().min(1, { message: "Required" }),
  price: z.number({ invalid_type_error: "Invalid" }),
  delivery_price: z.number({ invalid_type_error: "Invalid" }),
  gender: z.string(),
  product_desc: z.string(),
  quantity: z.number({ invalid_type_error: "Invalid" }),
  country_id: z.number({ invalid_type_error: "Invalid" }),
  featured_image: z.any(),
  image_url: z.string(),
  category_name: z.string(),
  created_on: z.string(),
});

export const ZodProductForm = z.object({
  category_id: z.string({ invalid_type_error: "Invalid" }),
  product_name: z.string().min(1, { message: "Required" }),
  price: z.string({ invalid_type_error: "Invalid" }),
  delivery_price: z.string({ invalid_type_error: "Invalid" }),
  gender: z.string(),
  product_desc: z.string(),
  quantity: z.string({ invalid_type_error: "Invalid" }),
  country_id: z.number({ invalid_type_error: "Invalid" }),
  featured_image: z.any().refine((val) => val instanceof File, {
    message: "Please upload an image",
  }),
  images: z.any(),
});
