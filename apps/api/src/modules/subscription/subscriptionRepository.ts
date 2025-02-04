import { db } from "@repo/database";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";

import { authHeaders } from "@/common/lib/bkash/authHeaders";
import { bkashConfig } from "@/common/lib/bkash/config";
import { generateInvoice } from "@/common/lib/utils";
import { ServiceResponse } from "@/common/models/serviceResponse";

import {
  BkashCreatePaymentRequest,
  BkashCreatePaymentResponse,
} from "../bkash/bkashModel";
import { packageRepository } from "../package/packageRepository";
import { paymentRepository } from "../payment/paymentRepository";
import type {
  CreateSubscription,
  CreateSubscriptionResponse,
  GetSubscription,
  UpdateSubscription,
} from "./subscriptionModel";

const getSubscription = async ({ userId, status }: GetSubscription) => {
  const subscription = await db.subscription.findMany({
    where: {
      userId,
      status: status ? { in: [status] } : undefined,
    },
    orderBy: {
      startDate: "desc",
    },
    include: {
      package: {
        select: {
          name: true,
          price: true,
          speed: true,
        },
      },
    },
  });

  return subscription;
};

const updateSubscription = async (data: UpdateSubscription) => {
  const subscription = await db.subscription.update({
    where: { id: data.id },
    data,
  });
  return subscription;
};

const createSubscription = async ({
  userId,
  packageId,
  paymentMethod,
}: CreateSubscription): Promise<CreateSubscriptionResponse> => {
  try {
    // Check for active subscription
    const activeSubscription = await getSubscription({
      userId,
      status: "ACTIVE",
    });

    if (activeSubscription && activeSubscription.length > 0) {
      return ServiceResponse.failure(
        "User already has an active subscription",
        null,
        StatusCodes.BAD_REQUEST,
      );
    }

    //30 days subscription , start date is month start date and end date is 30 days from start date
    const startDate = dayjs().startOf("month").toDate();
    const endDate = dayjs().startOf("month").add(30, "day").toDate();

    const intiatedSubscription = await db.subscription.create({
      data: {
        userId,
        packageId,
        startDate,
        endDate,
        status: "PENDING",
      },
    });

    //Get Package Details
    const interentPackage = await packageRepository.getPackage(packageId);

    if (!interentPackage) {
      return ServiceResponse.failure(
        "Package not found",
        null,
        StatusCodes.NOT_FOUND,
      );
    }

    //pre-processing payment data
    const paymentData = {
      subscriptionId: intiatedSubscription.id,
      amount: interentPackage.price.toString(),
    };

    if (paymentMethod === "BKASH") {
      const headers = await authHeaders();

      const bkashCreatePaymentRequest = BkashCreatePaymentRequest.parse({
        mode: "0011",
        payerReference: interentPackage.name,
        callbackURL: bkashConfig.backend_callback_url,
        amount: paymentData.amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: generateInvoice({
          packageName: interentPackage.name,
          subscriptionId: intiatedSubscription.id,
        }),
      });

      const bkashPayment = await fetch(bkashConfig.create_payment_url, {
        method: "POST",
        headers,
        body: JSON.stringify(bkashCreatePaymentRequest),
      });

      const _bkashPaymentResponse = await bkashPayment.json();

      const bkashPaymentResponse = BkashCreatePaymentResponse.parse(
        _bkashPaymentResponse,
      );

      if (!bkashPayment.ok) {
        return ServiceResponse.failure(
          "Bkash payment failed",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }

      if (!bkashPaymentResponse.bkashURL) {
        //UPDATE SUBSCRIPTION STATUS TO FAILED
        await updateSubscription({
          id: intiatedSubscription.id,
          status: "FAILED",
        });
        return ServiceResponse.failure(
          "No bkash URL found",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }

      //Create Payment
      await paymentRepository.createPayment({
        paymentId: bkashPaymentResponse.paymentID,
        userId: userId,
        subscriptionId: intiatedSubscription.id,
        amount: parseFloat(paymentData.amount),
        payerReference: userId,
        merchantInvoiceNumber: bkashPaymentResponse.merchantInvoiceNumber,
        status: "CREATED",
        paymentMethod: "BKASH",
      });

      return {
        paymentId: bkashPaymentResponse.paymentID,
        redirectUrl: bkashPaymentResponse.bkashURL,
      };
    }

    return ServiceResponse.failure(
      "Payment method not supported",
      null,
      StatusCodes.BAD_REQUEST,
    );
  } catch (error) {
    return ServiceResponse.failure(
      "Failed to create subscription",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export const subscriptionRepository = {
  getSubscription,
  createSubscription,
  updateSubscription,
};
