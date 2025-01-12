import { apiRoutes } from "@/config";
import { api } from "@/lib/api";
import type { Subscription } from "@repo/validation/subscription";

export const getSubscriptions = async ({
  userId,
  status,
}: {
  userId: string;
  status?: string;
}): Promise<Subscription[] | null> => {
  const response = await api.get<Subscription[]>(
    apiRoutes.subscription.getSubscriptions,
    {
      query: {
        userId: userId,
        status: status,
      },
    },
  );
  return response.data;
};
