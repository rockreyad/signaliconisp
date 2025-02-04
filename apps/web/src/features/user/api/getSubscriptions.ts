import type { Subscription } from "@repo/validation/subscription";

import { apiRoutes } from "@/config";
import { api } from "@/lib/api";

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
