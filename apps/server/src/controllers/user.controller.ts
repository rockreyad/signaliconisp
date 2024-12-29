import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { response } from '../utils/response';
import { z } from 'zod';

// Schema for validating user lookup parameters
const userLookupSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
});

export const getUserByIdentifier = async (req: Request, res: Response) => {
  try {
    const { identifier } = userLookupSchema.parse(req.params);

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: identifier },
          { email: identifier },
          { phone: identifier },
          { username: identifier },
        ],
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        username: true,
        fathersName: true,
        createdAt: true,
        addresses: {
          select: {
            street: true,
            city: true,
            state: true,
            zip: true,
          },
        },
        subscriptions: {
          where: {
            status: 'ACTIVE',
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            status: true,
            package: {
              select: {
                name: true,
                speed: true,
                price: true,
              },
            },
          },
        },
        _count: {
          select: {
            payments: true,
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

    return response(res, StatusCodes.OK, true, user, 'User found successfully');
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

    console.error('Error fetching user:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching user',
    );
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        username: true,
        createdAt: true,
        subscriptions: {
          where: {
            status: 'ACTIVE',
          },
          select: {
            package: {
              select: {
                name: true,
                speed: true,
              },
            },
          },
        },
        _count: {
          select: {
            payments: true,
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
      users,
      'Users fetched successfully',
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      'Error fetching users',
    );
  }
};
