import { apiRoutes } from "@/config";
import { api } from "@/lib/api";
import { env } from "@/lib/env";
import type { UserProfile } from "@repo/validation/user";

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
