import api from "@/lib/axios";

interface Payment {
  status: boolean;
  data: DataItem[];
  message: string;
}
export interface DataItem {
  id: string;
  paymentId: string;
  trxId: null | string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  payerReference: string;
  merchantInvoiceNumber: string;
  paymentMethod: string;
  status: string;
  meta: null | Meta;
  createdAt: string;
  updatedAt: string;
  subscription: Subscription;
}
interface Subscription {
  id: string;
  userId: string;
  packageId: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  package: {
    id: string;
    name: string;
    price: number;
    speed: number;
    description: string;
    duration: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
interface Meta {
  payerType: string;
  statusCode: string;
  payerAccount: string;
  statusMessage: string;
  customerMsisdn: string;
  transactionStatus: string;
  paymentExecuteTime: string;
}

export const getPaymentHistory = async (userId: string) => {
  try {
    const response = await api.get(`/api/payments/user/${userId}`);
    return response.data.data as DataItem[];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching payment history:", error.message);
    } else {
      console.error("Error fetching payment history:", error);
    }
    return [];
  }
};
