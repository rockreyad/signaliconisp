import { auth } from "@/auth";
import { getPackages } from "@/server/packages";
import React from "react";
import { Package } from "./Package";

export const Packages = async () => {
  const packages = await getPackages();
  const session = await auth();

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg: any) => (
        <Package key={pkg.id} pkg={pkg} userId={session?.user?.id ?? ""} />
      ))}
    </div>
  );
};
