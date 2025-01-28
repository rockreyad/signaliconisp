import { z } from "zod";

export const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  speed: z.number(),
  description: z.string(),
  duration: z.number(),
  isActive: z.boolean(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type Package = z.infer<typeof packageSchema>;
