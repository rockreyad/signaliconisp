import type { Metadata } from "next";

import { auth } from "@/auth";

import CustomerRechargePage from "@/features/recharge/components/page/customer";
import AgentRechargePage from "@/features/recharge/components/page/agent";
import { getAllPackages } from "@/features/recharge/api/getAllPackages";

export const metadata: Metadata = {
  title: "Recharge",
};

const RechargePage = async () => {
  const session = await auth();
  const userRole = session?.user?.role;
  const packages = await getAllPackages();
  if (userRole === "CUSTOMER" && packages) {
    return <CustomerRechargePage session={session} packages={packages} />;
  }

  if (userRole === "RECHARGE_AGENT" && packages) {
    return <AgentRechargePage packages={packages} />;
  }

  return <div>No packages found</div>;
};

export default RechargePage;
