import React from "react";
import { PaymentHistory } from "./_components_/PaymentHistory";
import { auth } from "@/auth";
import { getPaymentHistory } from "@/server/payments";

export default async function TransactionsPage() {
  const session = await auth();
  const payments = await getPaymentHistory(session?.user?.id as string);
  return (
    <div>
      <PaymentHistory payments={payments} />
    </div>
  );
}
