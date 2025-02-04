import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/lib/httpHandlers";

import { PackageSchema } from "../package/packageModel";
import { subscriptionController } from "./subscriptionController";
import {
  CreateSubscriptionSchema,
  GetSubscriptionSchema,
  SubscriptionSchema,
} from "./subscriptionModel";

export const subscriptionRouter: Router = express.Router();
export const subscriptionRegistry = new OpenAPIRegistry();

subscriptionRegistry.register("Subscription", SubscriptionSchema);

subscriptionRegistry.registerPath({
  method: "get",
  path: "/subscription",
  tags: ["Subscription"],
  request: {
    query: GetSubscriptionSchema.shape.query,
  },
  responses: createApiResponse(
    z.array(
      SubscriptionSchema.extend({
        package: PackageSchema.pick({
          name: true,
          price: true,
          speed: true,
        }),
      }),
    ),
    "Success",
  ),
});

subscriptionRouter.get(
  "/",
  validateRequest(GetSubscriptionSchema),
  subscriptionController.getSubscription,
);

subscriptionRegistry.registerPath({
  method: "post",
  path: "/subscription",
  tags: ["Subscription"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateSubscriptionSchema,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(
      z.object({
        paymentId: z.string(),
        redirectUrl: z.string(),
      }),
      "Subscription initiated successfully",
      StatusCodes.CREATED,
    ),
    ...createApiResponse(
      z.null(),
      "Bad Request - User already has an active subscription",
      StatusCodes.BAD_REQUEST,
    ),
  },
});

subscriptionRouter.post(
  "/",
  validateRequest(z.object({ body: CreateSubscriptionSchema })),
  subscriptionController.createSubscription,
);
