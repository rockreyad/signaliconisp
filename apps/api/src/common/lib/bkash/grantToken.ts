import { type NextFunction, type Request, type Response } from "express";

import { logger } from "../logger";
import { bkashConfig } from "./config";
import { setGlobalIdToken } from "./globalData";
import { tokenHeaders } from "./tokenHeaders";

interface TokenResponse {
  id_token?: string;
  [key: string]: any;
}

export const grantToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("Grant Token API Start");
  try {
    const tokenResponse = await fetch(bkashConfig.grant_token_url, {
      method: "POST",
      headers: tokenHeaders(),
      body: JSON.stringify({
        app_key: bkashConfig.app_key,
        app_secret: bkashConfig.app_secret,
      }),
    });
    const tokenResult = (await tokenResponse.json()) as TokenResponse;

    if (!tokenResult.id_token) {
      logger.error("No token received");
      throw new Error("No token received");
    }

    setGlobalIdToken(tokenResult.id_token);
    logger.info("Token granted successfully");
    next();
  } catch (e: any) {
    logger.error("Token grant failed");
    next(e);
  }
};
