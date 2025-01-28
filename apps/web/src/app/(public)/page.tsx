import { Metadata } from "next";
import { CallToAction } from "@/components/public/CallToAction";
import { FAQs } from "@/components/public/Faqs";
import { Hero } from "@/components/public/Hero";
import { Pricing } from "@/components/public/Pricing";

export const metadata: Metadata = {
  title: "সিগন্যাল আইকন",
  description:
    "সিগন্যাল আইকন এর মাধ্যমে আপনার ইন্টারনেট সার্ভার বিল পেমেন্ট করুন",
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Pricing />
      <FAQs />

      <CallToAction />
    </div>
  );
}
