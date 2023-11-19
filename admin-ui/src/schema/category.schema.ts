import { z } from "zod";

const CategorySchema = z.object({
  categoryId: z.string().nullable(),
  categoryName: z.string().min(1, "Name is required"),
  imageUrl: z.string().min(1, "Image is required"),
  status: z.enum(["active", "inactive"]),
});

export default CategorySchema;
