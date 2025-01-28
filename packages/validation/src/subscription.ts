import { z } from "zod";
import { packageSchema } from "./package";

export const subscriptionSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    packageId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .extend({
    package: packageSchema.pick({
      name: true,
      price: true,
      speed: true,
    }),
  });

export type Subscription = z.infer<typeof subscriptionSchema>;
