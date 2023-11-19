import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(8, "Password can not be less than 8 characters")
    .trim(),
});
