import { z } from "zod";
export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" }),
});
