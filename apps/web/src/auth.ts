import type { NextAuthResult, User } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./config/auth.config";
import { getUser } from "./features/user/api/getUser";
import { env } from "./lib/env";

class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

const nextAuth = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const { usernameOrPhone } = credentials;
        if (!usernameOrPhone) {
          throw new CustomError("username_or_phone_required");
        }
        let user: User | null = null;
        try {
          user = await getUser({
            phoneNumber: usernameOrPhone as string,
          });
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new CustomError(error.message);
        }

        if (!user) {
          throw new CustomError("user_not_found");
        }

        return user;
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
