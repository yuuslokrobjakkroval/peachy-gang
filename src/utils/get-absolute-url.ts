import { APP_URL, BETTER_AUTH_URL } from "./auth/server";

export function getAbsoluteUrl(): string {
  // Use custom domain for production deployments
  // Check if we have Vercel environment or if APP_URL/BETTER_AUTH_URL is not localhost
  if (
    process.env.VERCEL_URL ||
    (APP_URL && !APP_URL.includes("localhost")) ||
    (BETTER_AUTH_URL && !BETTER_AUTH_URL.includes("localhost"))
  ) {
    return "https://peachyganggg.com";
  }

  // For development, use APP_URL or BETTER_AUTH_URL if set
  if (APP_URL) {
    return APP_URL;
  }

  if (BETTER_AUTH_URL) {
    return BETTER_AUTH_URL;
  }

  // Development fallback
  return "http://localhost:3000";
}

export function getBetterAuthUrl(): string {
  // Use custom domain for production deployments
  // Check if we have Vercel environment or if BETTER_AUTH_URL/APP_URL is not localhost
  if (
    process.env.VERCEL_URL ||
    (BETTER_AUTH_URL && !BETTER_AUTH_URL.includes("localhost")) ||
    (APP_URL && !APP_URL.includes("localhost"))
  ) {
    return "https://peachyganggg.com";
  }

  // For development, use BETTER_AUTH_URL or APP_URL if set
  if (BETTER_AUTH_URL) {
    return BETTER_AUTH_URL;
  }

  if (APP_URL) {
    return APP_URL;
  }

  // Development fallback
  return "http://localhost:3000";
}
