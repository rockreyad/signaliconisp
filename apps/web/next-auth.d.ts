import { DefaultSession } from "next-auth";

interface ISubscription {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  package: {
    name: string;
    speed: number;
    price: number;
  };
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
    subscriptions: ISubscription[];
    addresses: IAddress[];
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phoneNumber: string;
    subscriptions: ISubscription[];
    addresses: IAddress[];
  }
}
