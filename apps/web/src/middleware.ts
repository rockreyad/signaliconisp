import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { afterLoginUrl, authRoutes, protectedRoutes } from "@/config";
import { env } from "@/lib/env";

const redirectToSignIn = (req: NextRequest) => {
  return NextResponse.redirect(new URL(authRoutes.signIn, req.url));
};

const redirectToDashboard = (req: NextRequest) => {
  return NextResponse.redirect(new URL(afterLoginUrl, req.url));
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the current path is in any of the protected routes
  const isProtectedRoute = Object.values(protectedRoutes).some((routes) =>
    routes.includes(pathname),
  );
  const isAuthRoute = Object.values(authRoutes).includes(pathname);

  // Get the token with the secret from environment variable
  const token = await getToken({
    req,
    secret: env.AUTH_SECRET,
  });

  if (isAuthRoute) {
    if (token) {
      return redirectToDashboard(req);
    }
    return NextResponse.next();
  }

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToSignIn(req);
  }

  // Check role-based access
  const userRole = token?.role as keyof typeof protectedRoutes;
  const allowedRoutesForRole = protectedRoutes[userRole] || [];

  // If the user's role doesn't have access to this route
  if (!allowedRoutesForRole.includes(pathname)) {
    // Redirect to dashboard or show 403 page
    return NextResponse.redirect(new URL(afterLoginUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
