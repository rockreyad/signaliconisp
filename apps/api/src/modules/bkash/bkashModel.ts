import z from "zod";

const BkashTransactionStatus = z.enum([
  "Initiated",
  "Completed",
  "Pending Authorized",
  "Expired",
  "Cancelled",
  "Declined",
]);

// Create Payment
const BkashCreatePaymentRequest = z.object({
  mode: z.string().default("0011"),
  payerReference: z.string().min(1).max(255),
  callbackURL: z.string().url(),
  amount: z.string().min(1),
  currency: z.string().default("BDT"),
  intent: z.string().default("sale"),
  merchantInvoiceNumber: z.string().max(255),
  merchantAssociationInfo: z.string().optional(),
});

const BkashCreatePaymentResponse = z.object({
  paymentID: z.string(),
  paymentCreateTime: z.string(),
  transactionStatus: BkashTransactionStatus,
  amount: z.string(),
  currency: z.string(),
  intent: z.string(),
  merchantInvoiceNumber: z.string(),
  bkashURL: z.string().url(),
  callbackURL: z.string().url(),
  successCallbackURL: z.string().url(),
  failureCallbackURL: z.string().url(),
  cancelledCallbackURL: z.string().url(),
  statusCode: z.string(),
  statusMessage: z.string(),
});

// Execute Payment
const BkashExecutePaymentRequest = z.object({
  paymentID: z.string(),
});

const BkashExecutePaymentResponse = z.object({
  paymentID: z.string(),
  trxID: z.string(),
  transactionStatus: BkashTransactionStatus,
  amount: z.string(),
  currency: z.string(),
  intent: z.string(),
  paymentExecuteTime: z.string(),
  merchantInvoiceNumber: z.string(),
  payerType: z.string(),
  payerReference: z.string(),
  customerMsisdn: z.string(),
  payerAccount: z.string(),
  statusCode: z.string(),
  statusMessage: z.string(),
});

const BkashResponseCode = {
  "2062": "The payment has already been completed",
  "2056": "The payment has been cancelled",
  "2117": "The payment has been declined",
};

export {
  BkashCreatePaymentRequest,
  BkashCreatePaymentResponse,
  BkashExecutePaymentRequest,
  BkashExecutePaymentResponse,
  BkashResponseCode,
  BkashTransactionStatus,
};
