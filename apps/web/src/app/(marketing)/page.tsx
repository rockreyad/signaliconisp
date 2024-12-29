import React from "react";
import { Navbar } from "./_components_/Navbar";
import { Hero } from "./_components_/Hero";
import { FAQs } from "./_components_/FAQs";
import { Pricing } from "./_components_/Pricingdemo";
import { CallToAction } from "./_components_/CallToAction";
import { Footer } from "./_components_/Footer";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "সিগন্যাল আইকন",
  description:
    "সিগন্যাল আইকন এর মাধ্যমে আপনার ইন্টারনেট সার্ভার বিল পেমেন্ট করুন",
};

export default async function Home() {
  const session = await auth();
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar {...session} />
        <Hero />
        <Pricing />
        <FAQs />

        <CallToAction />
      </div>
      <Footer />
    </>
  );
}
