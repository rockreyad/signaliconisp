import type { Metadata } from "next";

import { UserInfo } from "@/features/user/components/UserInfo";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

const DashBoard = async () => {
  return (
    <div>
      <UserInfo />
    </div>
  );
};

export default DashBoard;
