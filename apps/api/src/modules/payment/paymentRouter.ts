import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import z from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { grantToken } from "@/common/lib/bkash/grantToken";
import { validateRequest } from "@/common/lib/httpHandlers";

import { PackageSchema } from "../package/packageModel";
import { paymentController } from "./paymentController";
import {
  GetPaymentByIdSchema,
  GetPaymentSchema,
  PaymentSchema,
} from "./paymentModel";

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

// CUSTOMER PAYMENT ROUTE
// GET ALL PAYMENTS
paymentRegistry.registerPath({
  method: "get",
  path: "/payment",
  tags: ["Payment"],
  request: {
    query: GetPaymentSchema.shape.query,
  },
  responses: createApiResponse(
    z.array(
      PaymentSchema.extend({
        subscription: z.object({
          package: PackageSchema.pick({
            name: true,
            speed: true,
          }),
        }),
      }),
    ),
    "Success",
  ),
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

// RECHARGE AGENT PAYMENT ROUTE
