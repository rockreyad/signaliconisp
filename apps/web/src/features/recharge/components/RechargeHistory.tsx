"use client";

import { FC, useEffect, useState } from "react";
import { useGetUserProfile } from "@/features/user/api/queries";
import { UserInformation } from "./UserInformation";
import { RechargeHistoryTable } from "./RechargeHistoryTable";
import { SearchForm } from "./SearchForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useGetTransactions } from "@/features/transaction/api/queries";
import { isEmpty } from "es-toolkit/compat";

interface RechargeHistoryProps {
  onRechargeClick: () => void;
}

export const RechargeHistory: FC<RechargeHistoryProps> = ({
  onRechargeClick,
}) => {
  const [search, setSearch] = useState("");
  const {
    data: userProfile,
    isLoading,
    refetch,
  } = useGetUserProfile({
    userId: search,
  });

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    refetch: refetchTransactions,
  } = useGetTransactions({
    userId: userProfile?.id || "",
    skip: 0,
    limit: 5,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      refetch();
      refetchTransactions();
    }
  };

  useEffect(() => {
    if (!isEmpty(userProfile?.id)) {
      refetchTransactions();
    }
  }, [userProfile?.id]);

  return (
    <div className="flex flex-col gap-6">
      <SearchForm
        search={search}
        onSearchChange={setSearch}
        onSubmit={handleSearch}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : userProfile ? (
        <div className="flex flex-col gap-6">
          <UserInformation
            userProfile={userProfile}
            onRechargeClick={onRechargeClick}
          />
          <RechargeHistoryTable
            history={transactions || []}
            isLoading={isTransactionsLoading}
          />
        </div>
      ) : null}
    </div>
  );
};
