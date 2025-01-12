import { commonValidations } from "@repo/validation/common";
import { z } from "zod";
import { PaymentSchema } from "../payment/paymentModel";
import { ServiceResponse } from "@/common/models/serviceResponse";

export const SubscriptionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  packageId: z.string().cuid(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum([
    "PENDING",
    "ACTIVE",
    "EXPIRED",
    "CANCELLED",
    "SUSPENDED",
    "FAILED",
  ]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const CreateSubscriptionSchema = SubscriptionSchema.omit({
  id: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
  status: true,
}).extend({
  paymentMethod: PaymentSchema.shape.paymentMethod.optional(),
});

export type CreateSubscription = z.infer<typeof CreateSubscriptionSchema>;

export const GetSubscriptionSchema = z.object({
  query: z.object({
    userId: commonValidations.id,
    status: SubscriptionSchema.shape.status.optional(),
  }),
});

export type GetSubscription = z.infer<typeof GetSubscriptionSchema.shape.query>;

export const UpdateSubscriptionSchema = SubscriptionSchema.omit({
  createdAt: true,
  updatedAt: true,
  startDate: true,
  endDate: true,
  userId: true,
  packageId: true,
});

export type UpdateSubscription = z.infer<typeof UpdateSubscriptionSchema>;

export type BkashPaymentResponse = {
  paymentId: string;
  redirectUrl: string;
};

export type CreateSubscriptionResponse =
  | ServiceResponse<null>
  | BkashPaymentResponse;
