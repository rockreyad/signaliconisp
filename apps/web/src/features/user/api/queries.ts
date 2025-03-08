import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { apiRoutes } from "@/config";
import { UserProfile } from "@repo/validation/user";

export const userKeys = {
  userProfile: ["user-profile"],
} as const;

export const useGetUserProfile = ({
  userId,
  enabled,
}: {
  userId: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [...userKeys.userProfile, userId],
    queryFn: async () => {
      const response = await apiClient.get<UserProfile>(
        apiRoutes.user.getUserProfile,
        {
          params: {
            id: userId,
          },
        },
      );
      return response.data;
    },
    enabled: enabled ?? false,
  });
};
