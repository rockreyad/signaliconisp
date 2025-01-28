import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/lib/httpHandlers";
import { packageService } from "./packageService";

const getPackages: RequestHandler = async (_req: Request, res: Response) => {
  const serviceResponse = await packageService.getPackages();

  handleServiceResponse(serviceResponse, res);
};

const getPackage: RequestHandler = async (req: Request, res: Response) => {
  const packageId = req.params.id;
  const serviceResponse = await packageService.getPackage(packageId);
  handleServiceResponse(serviceResponse, res);
};

export const packageController: Record<string, RequestHandler> = {
  getPackages,
  getPackage,
};
