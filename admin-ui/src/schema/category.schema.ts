import { z } from "zod";

const CategorySchema = z.object({
  categoryId: z.number().nullable(),
  categoryName: z.string().min(1, "Name is required"),
  image: z.instanceof(File),
  status: z.enum(["active", "inactive"]),
});

export default CategorySchema;

export const ZodCategory = z.object({
  categoryId: z.number(),
  categoryName: z.string(),
  createdOn: z.string(),
  imageUrl: z.string(),
  status: z.string(),
});
