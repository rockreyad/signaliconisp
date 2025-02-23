import { db } from "@repo/database";

import type { GetUser } from "./userModel";

const getUserById = async (data: GetUser) => {
  const user = await db.user.findFirst({
    where: {
      OR: [
        { id: data.id },
        { email: data.id },
        { phone: data.id },
        { username: data.id },
      ],
    },
    select: {
      id: true,
      email: true,
      phone: true,
      name: true,
      username: true,
      fathersName: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          payments: true,
        },
      },
    },
  });

  return user;
};

const getUserProfile = async (data: GetUser) => {
  const user = await db.user.findFirst({
    where: { id: data.id },
    select: {
      name: true,
      email: true,
      phone: true,
      connection: {
        select: {
          poppeUserName: true,
          poppeUserPassword: true,
        },
      },
      address: {
        select: {
          street: true,
          city: true,
          state: true,
          zip: true,
        },
      },
      subscriptions: {
        where: {
          status: "ACTIVE",
        },
        select: {
          id: true,
          status: true,
          endDate: true,
          package: {
            select: {
              name: true,
              speed: true,
              price: true,
            },
          },
          payments: {
            select: {
              amount: true,
            },
          },
        },
      },
    },
  });

  return user;
};

export const userRepository = {
  getUserById,
  getUserProfile,
};
