import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { response } from '../utils/response';
import { z } from 'zod';
import { logger } from '../utils/logger';

// Schema for user params validation
const userParamsSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
});

const paymentParamsSchema = z.object({
  paymentId: z.string().uuid('Invalid payment ID'),
});

// Get all payments for a user
export const getUserPayments = async (req: Request, res: Response) => {
  try {
    const { userId } = userParamsSchema.parse(req.params);

    const payments = await prisma.payment.findMany({
      where: {
        userId,
      },
      include: {
        subscription: {
          include: {
            package: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response(
      res,
      StatusCodes.OK,
      true,
      payments,
      'Payments fetched successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        error.errors,
        'Invalid user ID',
      );
    }

    logger.error(`Error fetching user payments: ${error}`);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching payments',
    );
  }
};

// Get payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { paymentId } = paymentParamsSchema.parse(req.params);

    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        subscription: {
          include: {
            package: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!payment) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        null,
        'Payment not found',
      );
    }

    return response(
      res,
      StatusCodes.OK,
      true,
      payment,
      'Payment fetched successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        error.errors,
        'Invalid payment ID',
      );
    }

    logger.error(`Error fetching payment: ${error}`);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching payment',
    );
  }
};

// Get payment statistics
export const getPaymentStats = async (_req: Request, res: Response) => {
  try {
    const [totalPayments, successfulPayments, failedPayments, totalRevenue] =
      await Promise.all([
        // Total number of payments
        prisma.payment.count(),
        // Successful payments count
        prisma.payment.count({
          where: {
            status: 'COMPLETED',
          },
        }),
        // Failed payments count
        prisma.payment.count({
          where: {
            status: 'FAILED',
          },
        }),
        // Total revenue from successful payments
        prisma.payment.aggregate({
          where: {
            status: 'COMPLETED',
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

    const stats = {
      totalPayments,
      successfulPayments,
      failedPayments,
      totalRevenue: totalRevenue._sum.amount || 0,
      successRate: (successfulPayments / totalPayments) * 100,
    };

    return response(
      res,
      StatusCodes.OK,
      true,
      stats,
      'Payment statistics fetched successfully',
    );
  } catch (error) {
    logger.error(`Error fetching payment statistics: ${error}`);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching payment statistics',
    );
  }
};

// Get recent payments
export const getRecentPayments = async (_req: Request, res: Response) => {
  try {
    const recentPayments = await prisma.payment.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
        subscription: {
          include: {
            package: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return response(
      res,
      StatusCodes.OK,
      true,
      recentPayments,
      'Recent payments fetched successfully',
    );
  } catch (error) {
    logger.error(`Error fetching recent payments: ${error}`);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching recent payments',
    );
  }
};
