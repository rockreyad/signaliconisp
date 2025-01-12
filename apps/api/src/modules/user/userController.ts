import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/lib/httpHandlers";

import { userService } from "@/modules/user/userService";
import { GetUser } from "./userModel";

const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params as GetUser;
  const serviceResponse = await userService.getUser({ id });

  handleServiceResponse(serviceResponse, res);
};

const getUserProfile: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params as GetUser;
  const serviceResponse = await userService.getUserProfile({ id });

  handleServiceResponse(serviceResponse, res);
};

export const userController: Record<string, RequestHandler> = {
  getUser,
  getUserProfile,
};
