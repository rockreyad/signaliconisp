import { UserInfo } from "@/features/user/components/UserInfo";
import { Metadata } from "next";

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
