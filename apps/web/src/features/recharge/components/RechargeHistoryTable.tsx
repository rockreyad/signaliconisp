import { FC } from "react";
import { Payment } from "@repo/validation/payment";
import { formatBnDate } from "@/lib/utils";
import {
  DEFAULT_BANDWIDTH_UNIT,
  DEFAULT_CURRENCY_SYMBOL,
} from "@/lib/constant";

interface RechargeHistoryTableProps {
  history: Payment[];
  isLoading?: boolean;
}

export const RechargeHistoryTable: FC<RechargeHistoryTableProps> = ({
  history,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-dark-2">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-dark-3" />
        <div className="mt-4 space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-lg border border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-dark-3" />
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-dark-3" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-dark-3" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-dark-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-dark-2">
      <h4 className="mb-4 text-heading-6 font-bold text-dark dark:text-white">
        রিচার্জ হিস্টরি (সর্বশেষ ৫ টি)
      </h4>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-3">
              <th className="py-4 px-6 text-left font-medium text-gray-500 dark:text-gray-400">
                তারিখ
              </th>
              <th className="py-4 px-6 text-left font-medium text-gray-500 dark:text-gray-400">
                প্যাকেজের নাম
              </th>
              <th className="py-4 px-6 text-left font-medium text-gray-500 dark:text-gray-400">
                মূল্য
              </th>
              <th className="py-4 px-6 text-left font-medium text-gray-500 dark:text-gray-400">
                স্ট্যাটাস
              </th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 px-6 text-center text-gray-500">
                  রিচার্জ হিস্টরি খালি
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-stroke hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-dark-3"
                >
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {formatBnDate(String(item.updatedAt) || "")}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.subscription.package.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.subscription.package.speed}{" "}
                        {DEFAULT_BANDWIDTH_UNIT}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {DEFAULT_CURRENCY_SYMBOL} {item.amount}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-medium ${
                        item.status === "COMPLETED"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 sm:hidden">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">রিচার্জ হিস্টরি খালি</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatBnDate(String(item.updatedAt) || "")}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    item.status === "COMPLETED"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.subscription.package.name}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {item.subscription.package.speed} {DEFAULT_BANDWIDTH_UNIT}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {DEFAULT_CURRENCY_SYMBOL} {item.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
