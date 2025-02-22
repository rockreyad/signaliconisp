import { getAllPackages } from "@/features/recharge/api/getAllPackages";
import PricingTable from "./PricingTable";

const InternetPackages: { [key: string]: string[] } = {
  "500": ["Unlimited Data", "24/7 Customer Support", "Free Installation"],
  "525": ["Unlimited Data", "24/7 Customer Support", "Free Installation"],
  "600": [
    "Unlimited Data",
    "Buffer-less YouTube",
    "Buffer-less Facebook",
    "Online Gaming Support",
    "24/7 Customer Support",
    "Free Installation",
  ],
  "800": [
    "Unlimited Data",
    "Enhanced Speed",
    "Low Latency Gaming",
    "Professional Work Support",
    "24/7 Customer Support",
    "Free Installation",
  ],
  "1050": [
    "Unlimited Data",
    "Powerful Speed",
    "24/7 Upto 100% Speed Boost",
    "Professional Work Support",
    "24/7 Customer Support",
    "Priority Tech Support",
    "Free Installation",
  ],
};

export const Pricing = async () => {
  const packages = await getAllPackages();

  const mappedPackages = packages?.map((pkg) => ({
    yearly: false,
    popular: pkg.price === 600,
    planName: pkg.name,
    price: {
      monthly: pkg.price.toString(),
      yearly: (pkg.price * 12).toString(),
    },
    planDescription: pkg.description,
    features: [
      `${pkg.speed} Mbps Speed`,
      `${pkg.duration} Days Validity`,
      ...InternetPackages[pkg.price.toString()],
    ],
  }));

  return (
    <div className="bg-black bg-gradient-to-b  from-black via-[#5D2CA8] to-black py-[72px] text-white sm:py-24 ">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
          নিজে নিজেই মোবাইল এর মাধ্যমে রিচার্জ করুন!
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-xl text-white/70">
            সমস্যা হলে হেল্প লাইনে যোগাযোগ করুন এই ০১৭১২৯৬৫০০৭ নাম্বারে
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:px-24 py-[72px] sm:flex-row sm:py-24  ">
          <PricingTable packages={mappedPackages ?? []} />
        </div>
      </div>
    </div>
  );
};
