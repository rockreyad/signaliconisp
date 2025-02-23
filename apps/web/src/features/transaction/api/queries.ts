import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { apiRoutes } from "@/config";
import { Payment } from "@repo/validation/payment";

export const transactionKeys = {
  transactions: ["transactions"],
} as const;

export const useGetTransactions = ({
  userId,
  skip,
  limit,
}: {
  userId: string;
  skip: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: [...transactionKeys.transactions, userId],
    queryFn: async () => {
      const response = await apiClient.get<Payment[]>(
        apiRoutes.payment.getPayments,
        {
          query: {
            userId,
            skip: skip,
            limit: limit,
          },
        },
      );

      return response.data;
    },
    enabled: false,
  });
};
