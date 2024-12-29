import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import chalk from 'chalk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeData = (data: any) => {
  if (!data || typeof data !== 'object') return undefined;

  try {
    // Create a copy to avoid modifying the original data
    const sanitized = { ...data };

    // List of sensitive fields to mask
    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'authorization',
      'app_secret',
    ];

    // Recursively mask sensitive data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mask = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;

      Object.keys(obj).forEach((key) => {
        if (
          sensitiveFields.some((field) => key.toLowerCase().includes(field))
        ) {
          obj[key] = '********';
        } else if (typeof obj[key] === 'object') {
          mask(obj[key]);
        }
      });
    };

    mask(sanitized);
    return sanitized;
  } catch (error) {
    logger.error('Error sanitizing data');
    return undefined;
  }
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const start = Date.now();
    const requestBody = sanitizeData(req.body);
    const requestQuery = sanitizeData(req.query);

    // Store original response.json function
    const originalJson = res.json;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseBody: any;

    // Override response.json to capture response body
    res.json = function (body) {
      responseBody = body;
      return originalJson.call(this, body);
    };

    res.on('finish', () => {
      try {
        const duration = Date.now() - start;
        const statusColor = res.statusCode >= 400 ? chalk.red : chalk.green;

        // Log request details
        console.log('\n' + chalk.gray('─'.repeat(100)));
        logger.route(
          req.method,
          `${req.path} ${statusColor(`${res.statusCode}`)} ${chalk.gray(
            `✓ ${duration}ms`,
          )}`,
        );

        // Log request data if exists
        if (requestQuery && Object.keys(requestQuery).length > 0) {
          console.log(
            chalk.cyan('Request Query:'),
            chalk.gray(JSON.stringify(requestQuery, null, 2)),
          );
        }

        if (requestBody && Object.keys(requestBody).length > 0) {
          console.log(
            chalk.cyan('Request Body:'),
            chalk.gray(JSON.stringify(requestBody, null, 2)),
          );
        }

        // Log response data if exists
        if (responseBody) {
          const sanitizedResponse = sanitizeData(responseBody);
          if (sanitizedResponse) {
            console.log(
              chalk.cyan('Response:'),
              chalk.gray(JSON.stringify(sanitizedResponse, null, 2)),
            );
          }
        }

        console.log(chalk.gray('─'.repeat(100)) + '\n');
      } catch (error) {
        logger.error('Error in request logger finish handler');
        console.error(error);
      }
    });

    next();
  } catch (error) {
    logger.error('Error in request logger');
    console.error(error);
    next();
  }
};
