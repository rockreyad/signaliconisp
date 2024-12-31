import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DataStatsOne } from "./_components_/DataStatsOne";
import { UserInfo } from "./_components_/UserInfo";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  console.log("session", session);
  return (
    <div>
      <UserInfo />
      {/* <DataStatsOne /> */}
    </div>
  );
}
