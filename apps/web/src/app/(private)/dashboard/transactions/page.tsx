import { auth } from "@/auth";
import { getPayments } from "@/features/transaction/api/getPayments";
import { InvoiceTable } from "@/features/transaction/components/InvoiceTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

const TransactionsPage = async () => {
  const session = await auth();
  const payments = await getPayments({
    userId: session?.user?.id || "",
    status: "COMPLETED",
  });

  return <InvoiceTable payments={payments || []} />;
};

export default TransactionsPage;
