import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // List of valid routes in your app (adjust based on your app's routes)
  const validRoutes = [
    "/",
    "/login",
    "/peachy",
    // Add other valid routes here
  ];

  // Check if the requested path is not a valid route (i.e., it would result in a 404)
  const is404 = !validRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (is404) {
    // Get the auth token from cookies
    const token = getCookie("authToken", { req: request });

    // Redirect based on login status
    if (token) {
      return NextResponse.redirect(new URL("/peachy", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the route is valid, proceed as normal
  return NextResponse.next();
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)", // Match all routes except static files and API routes
  ],
};
