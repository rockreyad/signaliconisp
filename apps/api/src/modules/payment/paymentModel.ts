import { z } from "zod";

export const PaymentSchema = z.object({
  id: z.string(),
  paymentId: z.string(),
  trxId: z.string().optional(),
  userId: z.string(),
  subscriptionId: z.string(),
  amount: z.number(),
  currency: z.string(),
  payerReference: z.string().optional(),
  merchantInvoiceNumber: z.string(),
  paymentMethod: z.enum(["BKASH", "CASH", "BANK_TRANSFER"]),
  status: z.enum(["CREATED", "PENDING", "COMPLETED", "FAILED", "CANCELLED"]),
  meta: z.record(z.string(), z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payment = z.infer<typeof PaymentSchema>;

export const CreatePaymentSchema = PaymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  currency: true,
});

export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

export const UpdatePaymentSchema = PaymentSchema.omit({
  userId: true,
  subscriptionId: true,
  createdAt: true,
  updatedAt: true,
  currency: true,
  paymentMethod: true,
  payerReference: true,
  merchantInvoiceNumber: true,
  amount: true,
})
  .extend({
    id: z.string().optional(),
    paymentId: z.string().optional(),
  })
  .refine((data) => data.id || data.paymentId, {
    message: "Either id or paymentId is required",
  });

export type UpdatePayment = z.infer<typeof UpdatePaymentSchema>;

export const GetPaymentSchema = z.object({
  query: PaymentSchema.pick({
    status: true,
    userId: true,
  }).partial({ status: true }),
});

export type GetPayment = z.infer<typeof GetPaymentSchema.shape.query>;

export const GetPaymentByIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export type GetPaymentById = z.infer<typeof GetPaymentByIdSchema.shape.params>;
