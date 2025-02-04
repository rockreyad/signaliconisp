import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

import { healthCheckRegistry } from "@/modules/healthCheck/healthCheckRouter";
import { packageRegistry } from "@/modules/package/packageRouter";
import { paymentRegistry } from "@/modules/payment/paymentRouter";
import { subscriptionRegistry } from "@/modules/subscription/subscriptionRouter";
import { userRegistry } from "@/modules/user/userRouter";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userRegistry,
    packageRegistry,
    subscriptionRegistry,
    paymentRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
