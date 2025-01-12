import { apiRoutes } from "@/config";
import { api } from "@/lib/api";
import type { User } from "@repo/validation/user";

export const getUser = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}): Promise<User | null> => {
  const response = await api.get<User>(apiRoutes.user.getUser, {
    params: {
      id: phoneNumber,
    },
  });

  return response.data;
};
