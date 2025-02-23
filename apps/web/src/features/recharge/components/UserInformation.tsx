import { UserProfile } from "@repo/validation/user";
import React, { FC } from "react";
import { cn, formatBnDate } from "@/lib/utils";
import { isEmpty } from "es-toolkit/compat";

interface UserInformationProps {
  userProfile: UserProfile;
  onRechargeClick: () => void;
}

export const UserInformation: FC<UserInformationProps> = ({
  userProfile,
  onRechargeClick,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <button
          onClick={onRechargeClick}
          className="self-end bg-primary text-white rounded-lg px-6 py-[15px] hover:bg-primary/90 transition-colors"
        >
          রিচার্জ করুন
        </button>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-stroke p-4 dark:border-dark-3">
            <h4 className="mb-4 text-heading-6 font-bold text-dark dark:text-white">
              ব্যবহারকারীর তথ্য
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  নাম:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {isEmpty(userProfile.name) ? "নাই" : userProfile.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ফোন নম্বর:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {userProfile.phone}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ঠিকানা:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {isEmpty(userProfile.address?.street)
                    ? "নাই"
                    : userProfile.address?.street}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  সাবস্ক্রিপশন স্ট্যাটাস:
                </span>
                <span
                  className={cn(
                    "font-medium text-dark dark:text-white",
                    userProfile.subscriptions?.[0]?.status === "ACTIVE"
                      ? "text-green-500"
                      : "text-red-500",
                  )}
                >
                  {userProfile.subscriptions?.[0]?.status === "ACTIVE"
                    ? "সক্রিয়"
                    : "নিষ্ক্রিয়"}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-stroke p-4 dark:border-dark-3">
            <h4 className="mb-4 text-heading-6 font-bold text-dark dark:text-white">
              প্যাকেজের তথ্য
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  প্যাকেজের নাম:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {userProfile.subscriptions[0]?.package?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  স্পীড:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {userProfile.subscriptions[0]?.package?.speed} Mbps
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  মূল্য:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  ৳{userProfile.subscriptions[0]?.package?.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  মেয়াদ শেষ:
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {formatBnDate(userProfile.subscriptions[0]?.endDate!)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
