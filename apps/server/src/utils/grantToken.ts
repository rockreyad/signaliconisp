import { Request, Response, NextFunction } from 'express';
import bkashConfig from '../config/bkashConfig.json';
import fetch from 'node-fetch';
import { setGlobalIdToken } from './globalData';
import { StatusCodes } from 'http-status-codes';
import { response } from './response';
import { tokenHeaders } from './tokenHeaders';
import { logger } from './logger';

interface TokenResponse {
  id_token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const grantToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info('Grant Token API Start');
  try {
    const tokenResponse = await fetch(bkashConfig.grant_token_url, {
      method: 'POST',
      headers: tokenHeaders(),
      body: JSON.stringify({
        app_key: bkashConfig.app_key,
        app_secret: bkashConfig.app_secret,
      }),
    });
    const tokenResult = (await tokenResponse.json()) as TokenResponse;

    if (!tokenResult.id_token) {
      logger.error('No token received');
      throw new Error('No token received');
    }

    setGlobalIdToken(tokenResult.id_token);
    logger.success('Token granted successfully');
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    logger.error('Token grant failed');
    return response(
      res,
      StatusCodes.UNAUTHORIZED,
      false,
      {},
      'You are not allowed',
    );
  }
};
