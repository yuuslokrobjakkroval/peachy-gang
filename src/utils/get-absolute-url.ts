import { APP_URL, BETTER_AUTH_URL } from "./auth/server";

export function getAbsoluteUrl(): string {
  // For Vercel deployments, use VERCEL_URL if available
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For production, use APP_URL or BETTER_AUTH_URL
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
  // For Vercel deployments, use VERCEL_URL if available
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For production, use BETTER_AUTH_URL or APP_URL
  if (BETTER_AUTH_URL) {
    return BETTER_AUTH_URL;
  }

  if (APP_URL) {
    return APP_URL;
  }

  // Development fallback
  return "http://localhost:3000";
}
