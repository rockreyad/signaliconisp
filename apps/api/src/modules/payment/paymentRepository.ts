import type { Prisma } from "@repo/database";
import { db } from "@repo/database";

import type { CreatePayment, GetPayment, UpdatePayment } from "./paymentModel";

const createPayment = async (data: CreatePayment) => {
  const payment = await db.payment.create({
    data,
  });
  return payment;
};

const updatePayment = async (data: UpdatePayment) => {
  const query: Prisma.PaymentUpdateArgs = {
    where: { id: data.id },
    data,
  };

  if (data.paymentId && !data.id) {
    query.where = { paymentId: data.paymentId };
  }

  const payment = await db.payment.update(query);
  return payment;
};

const getPayment = async (paymentId: string) => {
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
  });
  return payment;
};

const getPayments = async (data: GetPayment) => {
  const where: Prisma.PaymentWhereInput = {
    userId: data.userId,
  };
  if (data.status) {
    where.status = data.status;
  }

  const limit = data.limit ? parseInt(data.limit) : 5;
  const page = data.page ? parseInt(data.page) : 1;

  const payments = await db.payment.findMany({
    where,
    include: {
      subscription: {
        select: {
          package: {
            select: {
              name: true,
              speed: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  return payments;
};

export const paymentRepository = {
  createPayment,
  updatePayment,
  getPayment,
  getPayments,
};
