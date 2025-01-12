import { z } from "zod";

export const signInSchema = z.object({
  usernameOrPhone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a number",
    })
    .regex(/^[0-9]+$/, "Phone number must be a number"),
});
