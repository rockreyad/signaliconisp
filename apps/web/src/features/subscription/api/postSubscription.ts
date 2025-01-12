import { apiRoutes } from "@/config";
import { api } from "@/lib/api";

export const postSubscription = async ({
  userId,
  packageId,
  paymentMethod = "BKASH",
}: {
  userId: string;
  packageId: string;
  paymentMethod: "BKASH";
}): Promise<{
  paymentId: string;
  redirectUrl: string;
}> => {
  const response = await api.post<{
    paymentId: string;
    redirectUrl: string;
  }>(apiRoutes.subscription.postSubscription, {
    body: {
      userId,
      packageId,
      paymentMethod,
    },
  });

  return response.data;
};
