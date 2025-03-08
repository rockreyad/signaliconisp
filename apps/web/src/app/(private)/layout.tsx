"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

import PrivatePageWrapper from "@/components/global/PrivatePageWrapper";
import Loader from "@/components/Loader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <SessionProvider>
      {loading ? (
        <Loader />
      ) : (
        <PrivatePageWrapper>
          <NuqsAdapter>{children}</NuqsAdapter>
        </PrivatePageWrapper>
      )}
    </SessionProvider>
  );
}
