import type { DefaultSession, NextAuthConfig } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    phoneNumber: string;
    avatar?: string;
  }

  interface JWT {
    id: string;
    phoneNumber: string;
  }
}

export interface ISubscription {
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

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const authConfig = {
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnSignIn = nextUrl.pathname.startsWith("/signin");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/signin", nextUrl));
      } else if (isLoggedIn && isOnSignIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [], // configured in auth.ts
} satisfies NextAuthConfig;
