import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { commonValidations } from "@repo/validation/common";
import { z } from "zod";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  name: z.string(),
  username: z.string(),
  fathersName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Input Validation for 'GET user/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({
    id: z.union([
      commonValidations.id,
      commonValidations.email,
      commonValidations.phone,
      commonValidations.username,
      // Specific CUID validation
      z.string().regex(/^c[a-z0-9]{21,}$/i),
    ]),
  }),
});

export type GetUser = z.infer<typeof GetUserSchema.shape.params>;
