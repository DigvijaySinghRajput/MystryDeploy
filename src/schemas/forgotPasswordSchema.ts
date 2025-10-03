import { z } from "zod";
export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  token: z.string().optional(),
});
