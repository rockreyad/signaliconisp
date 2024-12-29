import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { response } from '../utils/response';
import fetch from 'node-fetch';
import bkashConfig from '../config/bkashConfig.json';
import { authHeaders } from '../utils/authHeader';
import { v4 as uuid } from 'uuid';
import { BkashExecuteResponse } from '../utils/types';
import { updateSubscriptionStatus } from './subscription.controller';
import { prisma } from '../lib/prisma';
import { logger } from '../utils/logger';
import { SubscriptionStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, payerReference } = req.body;

    if (!amount || !payerReference) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        'Amount and payer reference are required',
      );
    }

    const headers = await authHeaders();
    const result = await fetch(bkashConfig.create_payment_url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        mode: '0011',
        payerReference,
        callbackURL: bkashConfig.backend_callback_url,
        amount: amount.toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: 'Inv' + uuid(),
      }),
    });

    const data = await result.json();

    if (!result.ok) {
      logger.error(`bKash API error: ${data}`);
      return response(
        res,
        StatusCodes.BAD_GATEWAY,
        false,
        null,
        'Failed to create payment',
      );
    }

    if (!data.bkashURL) {
      logger.error(`No bkashURL in response: ${data}`);
      return response(
        res,
        StatusCodes.BAD_GATEWAY,
        false,
        null,
        'Invalid payment response',
      );
    }

    return response(
      res,
      StatusCodes.CREATED,
      true,
      {
        paymentCreateResponse: data,
        redirectURL: data.bkashURL,
      },
      'Payment initiated successfully',
    );
  } catch (error) {
    logger.error(`Payment creation error: ${error}`);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Something went wrong',
    );
  }
};

export const bkashCallback = async (req: Request, res: Response) => {
  try {
    if (req.query.status === 'success') {
      logger.info('Execute Payment API Start');

      const paymentID = req.query.paymentID as string;

      const executeResponse = await fetch(bkashConfig.execute_payment_url, {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({
          paymentID,
        }),
      });
      const result = (await executeResponse.json()) as BkashExecuteResponse;

      if (result.statusCode && result.statusCode === '0000') {
        logger.success(`Payment Successful: ${JSON.stringify(result)}`);

        const paymentData: Prisma.PaymentUpdateInput = {
          trxId: result.trxID,
          status: 'COMPLETED',
          meta: {
            transactionStatus: result.transactionStatus,
            paymentExecuteTime: result.paymentExecuteTime,
            payerType: result.payerType,
            customerMsisdn: result.customerMsisdn,
            payerAccount: result.payerAccount,
            statusCode: result.statusCode,
            statusMessage: result.statusMessage,
          },
        };

        // Find and update the payment with transaction details
        const payment = await prisma.payment.update({
          where: { paymentId: paymentID },
          data: paymentData,
          include: {
            subscription: {
              include: {
                package: true,
              },
            },
          },
        });

        if (payment?.subscription) {
          // Activate the subscription and update dates
          await prisma.subscription.update({
            where: { id: payment.subscription.id },
            data: {
              status: SubscriptionStatus.ACTIVE,
              startDate: new Date(),
              endDate: new Date(
                Date.now() +
                  payment.subscription.package.duration * 24 * 60 * 60 * 1000,
              ),
            },
          });
        }

        return res.redirect(
          `${bkashConfig.frontend_success_url}?data=${
            result.statusMessage || ''
          }`,
        );
      } else {
        logger.error(`Payment Failed: ${JSON.stringify(result)}`);

        const paymentData: Prisma.PaymentUpdateInput = {
          status: 'FAILED',
          meta: {
            statusCode: result.statusCode,
            statusMessage: result.statusMessage,
          },
        };

        // Update payment with failure details
        const payment = await prisma.payment.update({
          where: { paymentId: paymentID },
          data: paymentData,
          include: {
            subscription: true,
          },
        });

        if (payment?.subscription) {
          await updateSubscriptionStatus(
            payment.subscription.id,
            SubscriptionStatus.CANCELLED,
          );
        }

        return res.redirect(bkashConfig.frontend_fail_url);
      }
    }
  } catch (error) {
    logger.error(`Payment Failed with error: ${error}`);
    return res.redirect(bkashConfig.frontend_fail_url);
  }
};
