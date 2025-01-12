import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Package = z.infer<typeof PackageSchema>;

export const PackageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  speed: z.number(),
  description: z.string(),
  duration: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GetPackageSchema = z.object({
  params: z.object({
    id: z.string().regex(/^c[a-z0-9]{21,}$/i),
  }),
});
