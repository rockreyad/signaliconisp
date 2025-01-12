import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { GetPackageSchema, PackageSchema } from "./packageModel";
import z from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { packageController } from "./packageController";

export const packageRegistry = new OpenAPIRegistry();
export const packageRouter: Router = express.Router();

packageRegistry.register("Package", PackageSchema);

packageRegistry.registerPath({
  method: "get",
  path: "/package",
  tags: ["Package"],
  responses: createApiResponse(z.array(PackageSchema), "Success"),
});
packageRouter.get("/", packageController.getPackages);

packageRegistry.registerPath({
  method: "get",
  path: "/package/{id}",
  tags: ["Package"],
  request: { params: GetPackageSchema.shape.params },
  responses: createApiResponse(PackageSchema, "Success"),
});

packageRouter.get("/:id", packageController.getPackage);
