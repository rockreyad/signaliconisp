import { getAllPackages } from "@/features/recharge/api/getAllPackages";
import { Package } from "@/features/recharge/components/Package";
import { getSubscriptions } from "@/features/user/api/getSubscriptions";
import { Package as PackageType } from "@repo/validation/package";
import { Session } from "next-auth";

interface CustomerRechargePageProps {
  session: Session | null;
  packages: PackageType[];
}
const CustomerRechargePage = async ({
  session,
  packages,
}: CustomerRechargePageProps) => {
  const subscription = await getSubscriptions({
    userId: session?.user.id || "",
    status: "ACTIVE",
  });
  const currentSubscription = subscription && subscription[0];
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {packages &&
        packages?.length > 0 &&
        packages.map((pkg: any) => (
          <Package
            key={pkg.id}
            pkg={pkg}
            userId={session?.user?.id ?? ""}
            isSubscribed={currentSubscription?.packageId === pkg.id}
            hasActiveSubscription={currentSubscription?.status === "ACTIVE"}
          />
        ))}
    </div>
  );
};

export default CustomerRechargePage;
