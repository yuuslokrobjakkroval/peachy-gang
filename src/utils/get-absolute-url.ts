import dotenv from "dotenv";

dotenv.config();

export function getAbsoluteUrl(): string {
  const defaultUrl = "http://localhost:3000";
  console.log(process.env.APP_URL);

  return process.env.APP_URL ?? defaultUrl;
}

export function getBetterAuthUrl(): string {
  const defaultUrl = "https://peachygang.xyz";
  console.log(process.env.BETTER_AUTH_URL);

  return process.env.BETTER_AUTH_URL ?? defaultUrl;
}
