"use client";

import PrivatePageWrapper from "@/components/global/PrivatePageWrapper";
import Loader from "@/components/Loader";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

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
      <SessionProvider>
        {loading ? (
          <Loader />
        ) : (
          <PrivatePageWrapper>{children}</PrivatePageWrapper>
        )}
      </SessionProvider>
    </SessionProvider>
  );
}
