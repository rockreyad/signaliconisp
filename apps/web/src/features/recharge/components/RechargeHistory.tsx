"use client";

import { FC, useCallback } from "react";
import { useGetUserProfile } from "@/features/user/api/queries";
import { UserInformation } from "./UserInformation";
import { RechargeHistoryTable } from "./RechargeHistoryTable";
import { SearchForm } from "./SearchForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useGetTransactions } from "@/features/transaction/api/queries";
import { useQueryState } from "nuqs";
import { NoUserFound } from "./NoUserFound";

interface RechargeHistoryProps {
  onRechargeClick: () => void;
}

export const RechargeHistory: FC<RechargeHistoryProps> = ({
  onRechargeClick,
}) => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    parse: (value: string) => value.trim(),
  });

  const {
    data: userProfile,
    isLoading: isUserLoading,
    refetch: refetchUser,
    isError: isUserError,
    error: userError,
    isFetched: isUserFetched,
  } = useGetUserProfile({
    userId: search,
    enabled: false,
  });

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
    error: transactionsError,
  } = useGetTransactions({
    userId: userProfile?.id || "",
    skip: 0,
    limit: 5,
    enabled: Boolean(userProfile?.id),
  });

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!search?.trim()) {
        return;
      }

      try {
        await setSearch(search);
        await refetchUser();
      } catch (error) {
        console.error("Search operation failed:", error);
      }
    },
    [search, setSearch, refetchUser],
  );

  const hasError = isUserError || isTransactionsError;
  const errorMessage = userError?.message || transactionsError?.message;

  const renderContent = () => {
    if (isUserLoading) {
      return <LoadingSkeleton />;
    }

    if (hasError) {
      return (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <p>An error occurred: {errorMessage}</p>
        </div>
      );
    }

    if (isUserFetched && !userProfile && search) {
      return <NoUserFound />;
    }

    if (userProfile) {
      return (
        <div className="flex flex-col gap-6">
          <UserInformation
            userProfile={userProfile}
            onRechargeClick={onRechargeClick}
          />
          {isTransactionsLoading ? (
            <LoadingSkeleton />
          ) : (
            <RechargeHistoryTable
              history={transactions || []}
              isLoading={false}
            />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchForm
        search={search}
        onSearchChange={setSearch}
        onSubmit={handleSearch}
        isLoading={isUserLoading}
      />
      {renderContent()}
    </div>
  );
};
