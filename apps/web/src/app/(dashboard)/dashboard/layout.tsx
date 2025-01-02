"use client";

import React from "react";
// import { DefaultLayout } from "@/components/Layouts/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
