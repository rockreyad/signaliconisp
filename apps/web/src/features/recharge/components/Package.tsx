import clsx from "clsx";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

import { postSubscription } from "@/features/subscription/api/postSubscription";

export const Package = ({
  pkg,
  userId,
  isSubscribed,
  hasActiveSubscription,
}: {
  pkg: any;
  userId: string;
  isSubscribed: boolean;
  hasActiveSubscription: boolean;
}) => {
  return (
    <div
      key={pkg.id}
      className="overflow-hidden rounded-lg bg-white dark:bg-gray-dark shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Package Header */}
      <div className="p-6 text-gray-800 dark:text-gray-200 border-b border-stroke dark:border-dark-3">
        <h3 className="text-2xl font-bold">{pkg.name}</h3>
        <p className="mt-2 text-4xl font-bold">
          ৳{pkg.price}
          <span className="text-sm font-normal">/month</span>
        </p>
      </div>

      {/* Package Details */}
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{pkg.speed} Mbps</span> Speed
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-400">{pkg.description}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Duration: {pkg.duration} days
        </p>
        <button
          className={clsx(
            "w-full rounded-md py-3 text-white transition-colors duration-300",
            {
              "cursor-default": isSubscribed || hasActiveSubscription,
              "bg-blue-600 hover:bg-blue-700":
                !isSubscribed && !hasActiveSubscription,
              "bg-gray-600": hasActiveSubscription,
              "bg-green-600 font-bold": isSubscribed,
            },
          )}
          onClick={async () => {
            "use server";
            if (isSubscribed || hasActiveSubscription) {
              return;
            }

            const result = await postSubscription({
              userId: userId,
              packageId: pkg.id,
              paymentMethod: "BKASH",
            });

            redirect(result.redirectUrl, RedirectType.replace);
          }}
        >
          {isSubscribed ? "Subscribed" : "Choose Plan"}
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};
