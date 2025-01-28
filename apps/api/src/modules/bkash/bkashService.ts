import { authHeaders } from "@/common/lib/bkash/authHeaders";
import { bkashConfig } from "@/common/lib/bkash/config";
import z from "zod";
import { paymentRepository } from "../payment/paymentRepository";
import { PaymentSchema } from "../payment/paymentModel";
import { subscriptionRepository } from "../subscription/subscriptionRepository";
import { SubscriptionSchema } from "../subscription/subscriptionModel";

import {
  BkashExecutePaymentRequest,
  BkashExecutePaymentResponse,
  BkashResponseCode,
} from "./bkashModel";
import { env } from "@/common/lib/env";

const executeResponse = async (paymentID: string, _status: string) => {
  const bkashExecutePaymentRequest = BkashExecutePaymentRequest.parse({
    paymentID,
  });

  const bkashExecutePayment = await fetch(bkashConfig.execute_payment_url, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(bkashExecutePaymentRequest),
  });

  const _payment = await bkashExecutePayment.json();

  // Handle payment already completed
  if (
    BkashResponseCode[_payment.statusCode as keyof typeof BkashResponseCode]
  ) {
    return {
      redirectUrl: env.APP_ORIGIN,
      message:
        BkashResponseCode[
          _payment.statusCode as keyof typeof BkashResponseCode
        ] || _payment.statusMessage,
    };
  }

  const bkashPayment = BkashExecutePaymentResponse.parse(_payment);

  if (bkashPayment.statusCode && bkashPayment.statusCode === "0000") {
    const preposesPaymentData = {
      paymentId: bkashPayment.paymentID,
      trxId: bkashPayment.trxID,
      status: PaymentSchema.shape.status.enum.COMPLETED,
      meta: {
        transactionStatus: bkashPayment.transactionStatus,
        paymentExecuteTime: bkashPayment.paymentExecuteTime,
        payerType: bkashPayment.payerType,
        payerReference: bkashPayment.payerReference,
        customerMsisdn: bkashPayment.customerMsisdn,
        payerAccount: bkashPayment.payerAccount,
      },
    };

    try {
      // TODO: PROMISE ALL
      // UPDATE PAYMENT STATUS TO COMPLETED
      const updatedPayment =
        await paymentRepository.updatePayment(preposesPaymentData);

      // UPDATE SUBSCRIPTION STATUS TO ACTIVE
      await subscriptionRepository.updateSubscription({
        id: updatedPayment.subscriptionId,
        status: SubscriptionSchema.shape.status.enum.ACTIVE,
      });

      return {
        redirectUrl: `${bkashConfig.frontend_success_url}?data=${
          bkashPayment.statusMessage || ""
        }`,
      };
    } catch (error) {
      console.error(error);
      return {
        redirectUrl: `${bkashConfig.frontend_fail_url}?data=${
          bkashPayment.statusMessage || ""
        }`,
      };
    }
  } else {
    // UPDATE PAYMENT STATUS TO FAILED
    const updatedPayment = await paymentRepository.updatePayment({
      id: paymentID,
      status: PaymentSchema.shape.status.enum.FAILED,
    });

    // UPDATE SUBSCRIPTION STATUS TO FAILED
    await subscriptionRepository.updateSubscription({
      id: updatedPayment.subscriptionId,
      status: SubscriptionSchema.shape.status.enum.FAILED,
    });

    return {
      redirectUrl: `${bkashConfig.frontend_fail_url}?data=${
        bkashPayment.statusMessage || ""
      }`,
    };
  }
};

export const bkashService = {
  executeResponse,
};
