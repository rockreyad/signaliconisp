import type { GetPayments, Payment } from "@repo/validation/payment";

import { apiRoutes } from "@/config";
import { api } from "@/lib/api";

export const getPayments = async (
  data: GetPayments,
): Promise<Payment[] | null> => {
  const response = await api.get<Payment[]>(apiRoutes.payment.getPayments, {
    query: {
      userId: data.userId,
      status: data.status,
    },
  });

  return response.data;
};
