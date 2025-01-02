"use server";

import React from "react";
import Image from "next/image";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { auth } from "@/auth";
import dayjs from "dayjs";
import { getUserActiveSubscription } from "@/server/subscriptions";
import clsx from "clsx";

export const UserInfo = async () => {
  const session = await auth();
  const activeSubscription = await getUserActiveSubscription(
    session?.user?.id || "",
  );

  return (
    <div className="relative flex flex-col gap-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
      {/* Recharge button */}
      {activeSubscription?.status !== "ACTIVE" ? (
        <ButtonDefault
          customClasses="absolute right-2 top-2 bg-primary text-white rounded-full px-4 py-2 md:block hidden"
          label="Recharge Now"
          link={{ pathname: "/dashboard/recharge" }}
        />
      ) : null}
      {/* Avatar and user basic info */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative h-24 w-24 rounded-full bg-gray-200">
          <Image src="/images/user/user-03.png" alt="Avatar" fill />
        </div>
        <div className="text-center">
          <h4 className="text-heading-6 font-bold text-dark dark:text-white">
            {session?.user?.name}
          </h4>
          <span
            className={clsx(
              "text-success text-uppercase text-sm font-bold",
              activeSubscription?.status === "ACTIVE"
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {activeSubscription?.status || "INACTIVE"}
          </span>
        </div>

        {activeSubscription?.status !== "ACTIVE" ? (
          <ButtonDefault
            customClasses="bg-primary text-white rounded-full px-4 py-2 block md:hidden"
            label="Recharge Now"
            link={{ pathname: "/dashboard/recharge" }}
          />
        ) : null}
      </div>

      {/* ISP Package Information */}
      <div className="border-t border-gray-200 pt-4">
        <h5 className="mb-3 font-semibold text-dark dark:text-white">
          Package Details
        </h5>
        <div className="grid grid-cols-2 gap-3 text-body-sm">
          <div>
            <p className="text-gray-500">Package Name</p>
            <p className="font-medium">
              {activeSubscription?.package.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Fee</p>
            <p className="font-medium">
              {activeSubscription?.package.price || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Next Payment Date</p>
            <p className="font-medium">
              {activeSubscription?.endDate
                ? dayjs(activeSubscription?.endDate).format("DD MMMM YYYY")
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Connection ID</p>
            <p className="font-medium">{activeSubscription?.id || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-200 pt-4">
        <h5 className="mb-3 font-semibold text-dark dark:text-white">
          Contact Information
        </h5>
        <div className="flex flex-col gap-2">
          <p className="text-body-sm">
            <span className="text-gray-500">Email: </span>
            <span className="font-medium">{session?.user?.email}</span>
          </p>
          <p className="text-body-sm">
            <span className="text-gray-500">Phone: </span>
            <span className="font-medium">{session?.user?.phoneNumber}</span>
          </p>
          <p className="text-body-sm">
            <span className="text-gray-500">Address: </span>
            <span className="font-medium">
              {/* {`${session?.user?.addresses[0]?.street}, ${session?.user?.addresses[0]?.city}, ${session?.user?.addresses[0]?.state}, ${session?.user?.addresses[0]?.zip}`} */}
            </span>
          </p>
        </div>
      </div>

      {/* INTERNET POPPE INFORMATION: usernamer and password */}
      <div className="border-t border-gray-200 pt-4">
        <h5 className="mb-3 font-semibold text-dark dark:text-white">
          Internet POPPE Information
        </h5>
        <div className="flex flex-col gap-2">
          {/* TODO: get username and password from database */}
          <p className="text-body-sm">
            <span className="text-gray-500">Username: </span>
            <span className="font-medium">mp10reyad</span>
          </p>
          <p className="text-body-sm">
            <span className="text-gray-500">Password: </span>
            <span className="font-medium">12345678</span>
          </p>
        </div>
      </div>
    </div>
  );
};
