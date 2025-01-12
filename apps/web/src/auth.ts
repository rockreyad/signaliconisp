import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./config/auth.config";
import Credentials from "next-auth/providers/credentials";
import { Session, User } from "next-auth";
import { getUser } from "./features/user/api/getUser";
import { AuthError } from "next-auth";

class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.username = user.username;
        token.fathersName = user.fathersName;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          phone: token.phone as string,
          username: token.username as string,
          fathersName: token.fathersName as string,
          createdAt: token.createdAt as string,
          updatedAt: token.updatedAt as string,
        } satisfies User,
      };
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
