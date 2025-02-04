import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/lib/httpHandlers";

import type {
  CreateSubscription,
  GetSubscription,
  UpdateSubscription,
} from "./subscriptionModel";
import { subscriptionService } from "./subscriptionService";

const getSubscription: RequestHandler = async (req: Request, res: Response) => {
  const { userId, status } = req.query as GetSubscription;
  const serviceResponse = await subscriptionService.getSubscription({
    userId,
    status,
  });
  handleServiceResponse(serviceResponse, res);
};

const createSubscription: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const data = req.body as CreateSubscription;
  const serviceResponse = await subscriptionService.createSubscription(data);
  handleServiceResponse(serviceResponse, res);
};

const updateSubscription: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const data = req.body as UpdateSubscription;
  const serviceResponse = await subscriptionService.updateSubscription(data);
  handleServiceResponse(serviceResponse, res);
};

export const subscriptionController: Record<string, RequestHandler> = {
  createSubscription,
  getSubscription,
  updateSubscription,
};
