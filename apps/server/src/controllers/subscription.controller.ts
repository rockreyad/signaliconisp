import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { response } from '../utils/response';
import { z } from 'zod';
import { SubscriptionStatus } from '@prisma/client';
import { authHeaders } from '../utils/authHeader';
import bkashConfig from '../config/bkashConfig.json';
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';
import { logger } from '../utils/logger';

// Schema for subscription request validation
const createSubscriptionSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  packageId: z.string().uuid('Invalid package ID'),
});

// Initiate subscription and payment
export const initiateSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, packageId } = createSubscriptionSchema.parse(req.body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: {
          where: {
            status: SubscriptionStatus.ACTIVE,
            endDate: {
              gt: new Date(),
            },
          },
        },
      },
    });

    if (!user) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        null,
        'User not found',
      );
    }

    // Check if user already has an active subscription
    if (user.subscriptions.length > 0) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        'User already has an active subscription',
      );
    }

    // Get package details
    const package_ = await prisma.internetPackage.findUnique({
      where: { id: packageId },
    });

    if (!package_) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        null,
        'Package not found',
      );
    }

    // Create pending subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        packageId,
        startDate: new Date(),
        endDate: new Date(Date.now() + package_.duration * 24 * 60 * 60 * 1000),
        status: SubscriptionStatus.PENDING,
      },
    });

    // Prepare payment data
    const paymentData = {
      amount: package_.price.toString(),
      payerReference: user.phone,
      subscriptionId: subscription.id,
    };

    // Create bKash payment directly
    const headers = await authHeaders();
    const result = await fetch(bkashConfig.create_payment_url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        mode: '0011',
        payerReference: paymentData.payerReference,
        callbackURL: bkashConfig.backend_callback_url,
        amount: paymentData.amount,
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

      // Update subscription status to CANCELLED
      await updateSubscriptionStatus(
        subscription.id,
        SubscriptionStatus.CANCELLED,
      );

      return response(
        res,
        StatusCodes.BAD_GATEWAY,
        false,
        null,
        'Invalid payment response',
      );
    }

    // Create payment record in database
    await prisma.payment.create({
      data: {
        paymentId: data.paymentID,
        userId: subscription.userId,
        subscriptionId: subscription.id,
        amount: parseFloat(paymentData.amount),
        payerReference: paymentData.payerReference,
        merchantInvoiceNumber: data.merchantInvoiceNumber,
        status: 'CREATED',
      },
    });

    return response(
      res,
      StatusCodes.OK,
      true,
      {
        paymentID: data.paymentID,
        redirectURL: data.bkashURL,
      },
      'Payment initiated successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        error.errors,
        'Invalid input',
      );
    }

    console.error('Error initiating subscription:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error initiating subscription',
    );
  }
};

// Update subscription status
export const updateSubscriptionStatus = async (
  subscriptionId: string,
  status: SubscriptionStatus,
) => {
  try {
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status },
    });

    return true;
  } catch (error) {
    console.error('Error updating subscription status:', error);
    return false;
  }
};
