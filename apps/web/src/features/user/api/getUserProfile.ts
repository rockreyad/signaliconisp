import type { UserProfile } from "@repo/validation/user";

import { apiRoutes } from "@/config";
import { api } from "@/lib/api";

export const getUserProfile = async ({
  userId,
}: {
  userId: string;
}): Promise<UserProfile | null> => {
  const response = await api.get<UserProfile>(apiRoutes.user.getUserProfile, {
    params: {
      id: userId,
    },
  });

  return response.data;
};
