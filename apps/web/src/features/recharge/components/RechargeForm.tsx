"use client";

import { FC, useState } from "react";
import { Check, Money, CreditCard } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Package as PackageType } from "@repo/validation/package";
import { DEFAULT_BANDWIDTH_UNIT } from "@/lib/constant";

const paymentMethods = [
  {
    id: "cash",
    name: "নগদ",
    icon: Money,
    description: "নগদ টাকায় পেমেন্ট করুন",
  },
  {
    id: "bkash",
    name: "বিকাশ",
    icon: CreditCard,
    description: "বিকাশের মাধ্যমে পেমেন্ট করুন",
  },
];

export interface RechargeFormProps {
  packages: PackageType[];
}
export const RechargeForm: FC<RechargeFormProps> = ({ packages }) => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

  return (
    <div className="space-y-8">
      {/* Package Selection */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          প্যাকেজ নির্বাচন করুন
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "relative rounded-xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg",
                selectedPackage.id === pkg.id
                  ? "border-primary bg-primary/5 shadow-primary/20"
                  : "border-stroke hover:border-primary/50 dark:border-dark-3",
              )}
              onClick={() => setSelectedPackage(pkg)}
            >
              {selectedPackage.id === pkg.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <Check size={20} weight="bold" />
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>
                  <p className="text-3xl font-bold text-primary mt-2">
                    ৳{pkg.price}
                    <span className="text-sm font-normal text-gray-500">
                      /মাস
                    </span>
                  </p>
                </div>
                <div className="border-t border-gray-100 dark:border-dark-3 pt-4">
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    স্পিড: {pkg.speed} {DEFAULT_BANDWIDTH_UNIT}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          পেমেন্ট মেথড নির্বাচন করুন
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={cn(
                "relative rounded-xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg",
                selectedPayment.id === method.id
                  ? "border-primary bg-primary/5 shadow-primary/20"
                  : "border-stroke hover:border-primary/50 dark:border-dark-3",
              )}
              onClick={() => setSelectedPayment(method)}
            >
              {selectedPayment.id === method.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <Check size={20} weight="bold" />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <method.icon size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {method.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button className="bg-primary text-white rounded-lg px-8 py-3 font-medium hover:bg-primary/90 transition-colors hover:shadow-lg">
          পেমেন্ট করুন
        </button>
      </div>
    </div>
  );
};
