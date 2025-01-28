import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import {
  CreateSubscription,
  GetSubscription,
  UpdateSubscription,
} from "./subscriptionModel";
import { subscriptionRepository } from "./subscriptionRepository";
import { handleServiceError } from "@/common/lib/utils";

const getSubscription = async (data: GetSubscription) => {
  const subscription = await subscriptionRepository.getSubscription(data);
  return ServiceResponse.success(
    "Subscription fetched successfully",
    subscription,
    StatusCodes.OK,
  );
};

const createSubscription = async (data: CreateSubscription) => {
  try {
    const subscriptionResult =
      await subscriptionRepository.createSubscription(data);

    // TODO: HANDLE ERROR

    // If it's a ServiceResponse (error case)
    if ("success" in subscriptionResult) {
      return subscriptionResult;
    }

    // If it's a successful bKash payment response
    return ServiceResponse.success(
      "Subscription initiated successfully",
      {
        paymentId: subscriptionResult.paymentId,
        redirectUrl: subscriptionResult.redirectUrl,
      },
      StatusCodes.CREATED,
    );
  } catch (error) {
    return handleServiceError(error as Error, "creating subscription");
  }
};

const updateSubscription = async (data: UpdateSubscription) => {
  const subscription = await subscriptionRepository.updateSubscription(data);
  return ServiceResponse.success(
    "Subscription updated successfully",
    subscription,
    StatusCodes.OK,
  );
};

export const subscriptionService = {
  getSubscription,
  createSubscription,
  updateSubscription,
};
