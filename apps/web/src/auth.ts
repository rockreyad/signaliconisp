import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUserByPhoneNumber } from "./server/users";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { usernameOrPhone } = credentials;

          if (!usernameOrPhone) {
            return null;
          }

          const user = await getUserByPhoneNumber({
            phoneNumber: usernameOrPhone as string,
          });

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar || "",
            subscriptions: user.subscriptions,
            addresses: user.addresses,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.subscriptions = user.subscriptions;
        token.addresses = user.addresses;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phoneNumber: token.phoneNumber,
          subscriptions: token.subscriptions,
          addresses: token.addresses,
        },
      };
    },
  },
});