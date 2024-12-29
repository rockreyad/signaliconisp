import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { ApiResponse } from './types';

export const response = async <T>(
  res: Response,
  code: number,
  status: boolean,
  data: T,
  message?: string,
): Promise<Response<ApiResponse<T>>> => {
  if (!message) {
    message = getReasonPhrase(code);
  }
  return res.status(code).json({
    status,
    data,
    message,
  });
};
