import { APP_URL, BETTER_AUTH_URL } from "./auth/server";

export function getAbsoluteUrl(): string {
  const defaultUrl = "http://localhost:3000";
  console.log(APP_URL);
  return APP_URL ?? defaultUrl;
}

export function getBetterAuthUrl(): string {
  const defaultUrl = "https://peachygang.xyz";
  console.log(BETTER_AUTH_URL);
  return BETTER_AUTH_URL ?? defaultUrl;
}
