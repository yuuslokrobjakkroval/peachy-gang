import { APP_URL, BETTER_AUTH_URL } from "./auth/server";

export function getAbsoluteUrl(): string {
  const defaultUrl = "http://localhost:3000";
  return APP_URL ?? defaultUrl;
}

export function getBetterAuthUrl(): string {
  const defaultUrl = "http://localhost:3000";
  return BETTER_AUTH_URL ?? defaultUrl;
}
