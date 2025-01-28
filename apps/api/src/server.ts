import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { env } from "@/common/lib/env";
import errorHandler from "@/middlewares/errorHandler";
import { healthCheckRouter } from "@/modules/healthCheck/healthCheckRouter";

import notFoundHandler from "@/middlewares/notFoundHandler";
import requestLogger from "@/middlewares/requestLogger";

import rateLimiter from "@/middlewares/rateLimiter";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { userRouter } from "./modules/user/userRouter";
import { packageRouter } from "./modules/package/packageRouter";
import { subscriptionRouter } from "./modules/subscription/subscriptionRouter";
import { paymentRouter } from "./modules/payment/paymentRouter";

extendZodWithOpenApi(z);

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cookie",
    ],
    exposedHeaders: ["Set-Cookie"],
  }),
);
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/user", userRouter);
app.use("/package", packageRouter);
app.use("/subscription", subscriptionRouter);
app.use("/payment", paymentRouter);

// Swagger UI
app.use(openAPIRouter);

// Not found handler
app.use(notFoundHandler);

// Error handlers
app.use(errorHandler());

export { app };
