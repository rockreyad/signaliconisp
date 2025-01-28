import { z } from "zod";
import { passwordRegex } from "./lib/regex";

export const commonValidations = {
  id: z.string().cuid({
    message: "Invalid CUID",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .regex(
      /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
      {
        message: "Invalid phone number",
      },
    ),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(15, "Username must be at most 15 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(64, "Password must be at most 64 characters")
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
};
