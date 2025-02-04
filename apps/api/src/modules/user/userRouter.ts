import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserProfileSchema } from "@repo/validation/user";
import express, { type Router } from "express";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/lib/httpHandlers";
import { userController } from "@/modules/user/userController";
import { GetUserSchema, UserSchema } from "@/modules/user/userModel";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

// userRegistry.registerPath({
//   method: "get",
//   path: "/user",
//   tags: ["User"],
//   responses: createApiResponse(z.array(UserSchema), "Success"),
// });

// userRouter.get("/", userController.getUser);

// userRegistry.registerPath({
//   method: "patch",
//   path: "/user",
//   tags: ["User"],
//   responses: createApiResponse(z.array(UserSchema), "Success"),
// });

// userRouter.patch("/", userController.updateUser);

// userRegistry.registerPath({
//   method: "patch",
//   path: "/user/change-password",
//   tags: ["User"],
//   responses: createApiResponse(z.array(UserSchema), "Success"),
// });

// userRouter.patch("/change-password", userController.changePassword);

userRegistry.registerPath({
  method: "get",
  path: "/user/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

// TODO: Add validation
userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);

userRegistry.registerPath({
  method: "get",
  path: "/user/profile/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserProfileSchema, "Success"),
});

userRouter.get(
  "/profile/:id",
  validateRequest(GetUserSchema),
  userController.getUserProfile,
);
