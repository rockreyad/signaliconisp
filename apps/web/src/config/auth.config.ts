import type { NextAuthConfig, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { protectedRoutes } from ".";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnSignIn = nextUrl.pathname.startsWith("/sign-in");

      if (isOnDashboard) {
        if (isLoggedIn) {
          // Check role-based access
          const userRole = auth?.user?.role as keyof typeof protectedRoutes;
          const allowedRoutesForRole = protectedRoutes[userRole] || [];

          // If the user's role doesn't have access to this route
          if (!allowedRoutesForRole.includes(nextUrl.pathname)) {
            // Redirect to dashboard or show 403 page
            return Response.redirect(new URL("/dashboard", nextUrl));
          }

          return true;
        }
        return Response.redirect(new URL("/sign-in", nextUrl));
      } else if (isLoggedIn && isOnSignIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.phone = user.phone;
        token.username = user.username;
        token.fathersName = user.fathersName;
        token.role = user.role;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phone: token.phone,
          username: token.username,
          fathersName: token.fathersName,
          role: token.role,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
        },
      };
    },
  },
  providers: [], // configured in auth.ts
};
