"use client";

import { createSubscription } from "@/server/subscriptions";
import clsx from "clsx";
import React from "react";

export const Package = ({
  pkg,
  userId,
  isSubscribed,
}: {
  pkg: any;
  userId: string;
  isSubscribed: boolean;
}) => {
  return (
    <div
      key={pkg.id}
      className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Package Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
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
          <p className="text-gray-600">
            <span className="font-semibold">{pkg.speed} Mbps</span> Speed
          </p>
        </div>

        <p className="text-gray-600">{pkg.description}</p>
        <p className="text-gray-600">Duration: {pkg.duration} days</p>

        <button
          className={clsx(
            "w-full rounded-md py-3 text-white transition-colors duration-300",
            isSubscribed ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700",
          )}
          onClick={async () => {
            if (isSubscribed) {
              return;
            }
            try {
              const result = await createSubscription({
                userId: userId,
                packageId: pkg.id,
              });

              if (result.success) {
                window.location.href = result.redirectURL;
              }
            } catch (error) {
              console.error("Subscription error:", error);
            }
          }}
        >
          {isSubscribed ? "Subscribed" : "Choose Plan"}
        </button>
      </div>
    </div>
  );
};
