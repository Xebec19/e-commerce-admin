import { z } from "zod";

const ProductSchema = z.object({
  productId: z.number(),
  imageUrl: z.string(),
  categoryId: z.number(),
  categoryName: z.string(),
  productName: z.string().min(1, "Name is required"),
  price: z.number(),
  deliveryPrice: z.number(),
  gender: z.enum(["male", "female"]),
  productDesc: z.string(),
  quantity: z.number(),
  createdOn: z.string(),
  totalCount: z.number(),
});

export default ProductSchema;
