import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Packages } from "./_components_/Packages";

export const metadata: Metadata = {
  title: "Recharge",
};

export default function Recharge() {
  return (
    <DefaultLayout>
      <Packages />
    </DefaultLayout>
  );
}
