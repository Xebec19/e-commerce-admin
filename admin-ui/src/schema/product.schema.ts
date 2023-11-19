import { z } from "zod";

const ProductSchema = z.object({
  categoryId: z.string().uuid(),
  productName: z.string().min(1, "Name is required"),
  price: z.string(),
  deliveryPrice: z.string(),
  gender: z.enum(["male", "female"]),
  productDesc: z.string(),
  quantity: z.string(),
  status: z.enum(["active", "inactive"]),
});

export default ProductSchema;
