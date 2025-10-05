import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth handling for auth routes - let them be handled by the API route directly
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protected routes that require authentication
  // const protectedRoutes = ["/profile", "/general", "/rank", "/store"];
  // const isProtectedRoute = protectedRoutes.some(
  //   (route) =>
  //     pathname.includes(route) ||
  //     pathname.match(new RegExp(`^/[a-z]{2}${route}`))
  // );

  // if (isProtectedRoute) {
  //   // Simple cookie-based auth check to avoid PrismaClient in Edge Runtime
  //   const sessionToken = request.cookies.get("better-auth.session_token");

  //   if (!sessionToken || !sessionToken.value) {
  //     const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
  //     const loginUrl = new URL(`/${locale}/login`, request.url);
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   // Note: Full session validation happens on the server-side in components
  // }

  // Apply internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
