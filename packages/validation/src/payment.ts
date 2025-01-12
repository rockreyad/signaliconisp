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

export const GetPaymentsSchema = z.object({
  query: PaymentSchema.pick({
    userId: true,
    status: true,
  }).partial({ status: true }),
});

export type GetPayments = z.infer<typeof GetPaymentsSchema.shape.query>;
