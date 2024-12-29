import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { response } from '../utils/response';
import { z } from 'zod';

// Schema for package params validation
const packageParamsSchema = z.object({
  id: z.string().uuid('Invalid package ID'),
});

const userParamsSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
});

// Get all packages
export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await prisma.internetPackage.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        speed: 'asc',
      },
    });

    return response(
      res,
      StatusCodes.OK,
      true,
      packages,
      'Packages fetched successfully',
    );
  } catch (error) {
    console.error('Error fetching packages:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching packages',
    );
  }
};

// Get single package by ID
export const getPackageById = async (req: Request, res: Response) => {
  try {
    const { id } = packageParamsSchema.parse(req.params);

    const package_ = await prisma.internetPackage.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
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

    return response(
      res,
      StatusCodes.OK,
      true,
      package_,
      'Package fetched successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        error.errors,
        'Invalid package ID',
      );
    }

    console.error('Error fetching package:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching package',
    );
  }
};

// Get user's current package
export const getUserCurrentPackage = async (req: Request, res: Response) => {
  try {
    const { userId } = userParamsSchema.parse(req.params);

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: {
          gt: new Date(),
        },
      },
      include: {
        package: true,
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!subscription) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        null,
        'No active subscription found',
      );
    }

    return response(
      res,
      StatusCodes.OK,
      true,
      subscription,
      'Current package fetched successfully',
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

    console.error('Error fetching current package:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching current package',
    );
  }
};

// Get user's package history
export const getUserPackageHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = userParamsSchema.parse(req.params);

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId,
      },
      include: {
        package: true,
        payments: {
          orderBy: {
            createdAt: 'desc',
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
      subscriptions,
      'Package history fetched successfully',
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

    console.error('Error fetching package history:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching package history',
    );
  }
};

// Get package statistics
export const getPackageStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.internetPackage.findMany({
      select: {
        id: true,
        name: true,
        speed: true,
        price: true,
        _count: {
          select: {
            subscriptions: true,
          },
        },
        subscriptions: {
          where: {
            status: 'ACTIVE',
          },
          select: {
            id: true,
          },
        },
      },
    });

    const packageStats = stats.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      speed: pkg.speed,
      price: pkg.price,
      totalSubscriptions: pkg._count.subscriptions,
      activeSubscriptions: pkg.subscriptions.length,
    }));

    return response(
      res,
      StatusCodes.OK,
      true,
      packageStats,
      'Package statistics fetched successfully',
    );
  } catch (error) {
    console.error('Error fetching package statistics:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching package statistics',
    );
  }
};
