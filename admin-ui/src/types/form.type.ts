import ZodProduct from "@/schema/product.schema";
import { z } from "zod";

export type LoginFormType = {
  email: string;
  password: string;
};

export type CategoryFormType = {
  categoryId?: number;
  categoryName?: string;
  status?: string;
  imageUrl?: string | Blob;
};

export interface ProductFormType {
  product_id?: string;
  product_name?: string;
  image_url?: string[];
  quantity?: number;
  featured_image: string;
  created_on?: string;
  price?: number;
  delivery_price?: number;
  product_desc?: string;
  gender?: string;
  category_id?: number;
  category_name?: string;
  country_id?: number;
  country_name?: string;
  onSubmit: (value: z.infer<typeof ZodProduct>) => void;
}
