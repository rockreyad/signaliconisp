import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      phone: string;
      name: string;
      username: string;
      fathersName: string;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    phone: string;
    name: string;
    username: string;
    fathersName: string;
    createdAt: string;
    updatedAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    username: string;
    fathersName: string;
    createdAt: string;
    updatedAt: string;
  }
}
