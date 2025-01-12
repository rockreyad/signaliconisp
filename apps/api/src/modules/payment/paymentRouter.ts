import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  GetPaymentByIdSchema,
  GetPaymentSchema,
  PaymentSchema,
} from "./paymentModel";
import express, { type Router } from "express";
import { CreatePaymentSchema } from "./paymentModel";
import { validateRequest } from "@/common/lib/httpHandlers";
import { paymentController } from "./paymentController";
import { grantToken } from "@/common/lib/bkash/grantToken";
import z from "zod";

export const paymentRouter: Router = express.Router();
export const paymentRegistry = new OpenAPIRegistry();

paymentRegistry.register("Payment", PaymentSchema);

// CREATE CASH PAYMENT ROUTE
// paymentRegistry.registerPath({
//   method: "post",
//   path: "/payment",
//   tags: ["Payment"],
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: CreatePaymentSchema,
//         },
//       },
//     },
//   },
//   responses: createApiResponse(PaymentSchema, "Success"),
// });

// paymentRouter.post(
//   "/",
//   validateRequest(CreatePaymentSchema),
//   paymentController.createPayment
// );

// GET ALL PAYMENTS
paymentRegistry.registerPath({
  method: "get",
  path: "/payment",
  tags: ["Payment"],
  request: {
    query: GetPaymentSchema.shape.query,
  },
  responses: createApiResponse(z.array(PaymentSchema), "Success"),
});

paymentRouter.get("/", paymentController.getPayments);

// GET PAYMENT BY ID
paymentRegistry.registerPath({
  method: "get",
  path: "/payment/{id}",
  tags: ["Payment"],
  request: { params: GetPaymentByIdSchema.shape.params },
  responses: createApiResponse(PaymentSchema, "Success"),
});

paymentRouter.get(
  "/:id",
  validateRequest(GetPaymentByIdSchema),
  paymentController.getPaymentById,
);

paymentRouter.use(grantToken);
paymentRouter.get("/bkash/callback", paymentController.bkashCallback);
