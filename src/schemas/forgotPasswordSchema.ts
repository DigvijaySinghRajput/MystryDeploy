import { z } from "zod";
export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  newpassword: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" }),
});
