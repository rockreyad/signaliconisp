"use client";

import { useState } from "react";

interface PricingTabProps {
  yearly: boolean;
  popular?: boolean;
  planName: string;
  price: {
    monthly: string;
    yearly: string;
  };
  planDescription: string;
  features: string[];
}

export function PricingTab(props: PricingTabProps) {
  return (
    <div className={`h-full `}>
      <div className="relative flex h-full flex-col rounded-2xl border border-white/30 bg-black p-6 shadow shadow-black/80">
        {props.popular && (
          <div className="absolute right-0 top-0 -mt-4 mr-6">
            <div className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-slate-950/5">
              পুপুলার প্ল্যান
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="mb-1 font-semibold text-white/70">
            {props.planName}
          </div>
          <div className="mb-2 inline-flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white/70">৳ </span>
            <span className="text-4xl font-bold text-white/50">
              {props.yearly ? props.price.yearly : props.price.monthly}
            </span>
            <span className="font-medium text-white/70">
              /{props.yearly ? "বছর" : "মাস"}
            </span>
          </div>
          <div className="mb-5 text-sm text-white/70">
            {props.planDescription}
          </div>
          <a
            className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-[#5D2CA8] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-[#5D2CA2] focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600"
            href="#0"
          >
            কিনুন
          </a>
        </div>
        <div className="mb-3 font-medium text-slate-200">সাথে থাকছে:</div>
        <ul className="grow space-y-3 text-sm text-slate-400">
          {props.features.map((feature, index) => {
            return (
              <li key={index} className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <div>
      {/* Pricing toggle */}
      <div className="m-auto mb-8 flex max-w-[14rem] justify-center lg:mb-16">
        <div className="relative flex w-full rounded-full bg-black p-1">
          <span
            className="pointer-events-none absolute inset-0 m-1"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 transform rounded-full bg-[#5D2CA8] shadow-sm shadow-[#5D2CA8] transition-transform duration-150 ease-in-out ${isAnnual ? "translate-x-0" : "translate-x-full"}`}
            ></span>
          </span>
          <button
            className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 ${isAnnual ? "text-white/70" : " text-white"}`}
            onClick={() => setIsAnnual(true)}
            aria-pressed={isAnnual}
          >
            বছর{" "}
            {/* <span
              className={`${isAnnual ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"}`}
            >
              -20%
            </span> */}
          </button>
          <button
            className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 ${isAnnual ? "text-white/70" : " text-white"}`}
            onClick={() => setIsAnnual(false)}
            aria-pressed={isAnnual}
          >
            মাস
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
        {/* Pricing tab 1 */}
        <PricingTab
          yearly={isAnnual}
          planName="৫ এমবিপিএস"
          price={{ yearly: "৬০০০", monthly: "৫০০" }}
          planDescription="অর্থপ্রদান নগদ, ব্যাঙ্ক ট্রান্সফার বা কোম্পানি দ্বারা সমর্থিত যেকোনো ডিজিটাল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে করা যেতে পারে।"
          features={[
            "ফ্রি কানেকশন",
            "24/7 কাটমার সাপোর্ট ",
            "50 mbps ইউটিউব ",
            "50 mbps ফেসবুক ",
          ]}
        />

        {/* Pricing tab 2 */}
        <PricingTab
          yearly={isAnnual}
          popular={true}
          planName="৮ এমবিপিএস"
          price={{ yearly: "৬৩০০", monthly: "৫২৫" }}
          planDescription="অর্থপ্রদান নগদ, ব্যাঙ্ক ট্রান্সফার বা কোম্পানি দ্বারা সমর্থিত যেকোনো ডিজিটাল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে করা যেতে পারে।"
          features={[
            "ফ্রি কানেকশন",
            "24/7 কাটমার সাপোর্ট ",
            "100 mbps ইউটিউব ",
            "100 mbps ফেসবুক ",
          ]}
        />

        {/* Pricing tab 3 */}
        <PricingTab
          yearly={isAnnual}
          planName="১০ এমবিপিএস"
          price={{ yearly: "৭২০০", monthly: "৬০০" }}
          planDescription="অর্থপ্রদান নগদ, ব্যাঙ্ক ট্রান্সফার বা কোম্পানি দ্বারা সমর্থিত যেকোনো ডিজিটাল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে করা যেতে পারে।"
          features={[
            "ফ্রি কানেকশন",
            "24/7 কাটমার সাপোর্ট ",
            "100 mbps ইউটিউব ",
            "100 mbps ফেসবুক ",
          ]}
        />
      </div>
    </div>
  );
}
