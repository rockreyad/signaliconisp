import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { commonValidations } from "@repo/validation/common";
import { z } from "zod";

extendZodWithOpenApi(z);

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
