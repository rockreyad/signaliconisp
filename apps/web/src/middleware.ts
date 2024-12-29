import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnSignIn = req.nextUrl.pathname.startsWith("/signin");

  if (isLoggedIn && isOnSignIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (!isLoggedIn && isOnDashboard) {
    return Response.redirect(new URL("/signin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
