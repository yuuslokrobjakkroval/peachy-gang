import { NextRequest, NextResponse } from "next/server";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";

export async function GET(request: NextRequest) {
  const baseURL = getAbsoluteUrl();

  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    baseURL,
    isCustomDomain: request.nextUrl.hostname === "peachyganggg.com",
    isVercel: !!process.env.VERCEL_URL,
    vercelUrl: process.env.VERCEL_URL,
    domain: request.nextUrl.hostname,
    protocol: request.nextUrl.protocol,
    configuration: {
      hasAppUrl: !!process.env.APP_URL,
      hasBetterAuthUrl: !!process.env.BETTER_AUTH_URL,
      hasClientId: !!process.env.BOT_CLIENT_ID,
      hasClientSecret: !!process.env.BOT_CLIENT_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    },
    expectedRedirectUri: "https://peachyganggg.com/api/auth/callback/discord",
    authEndpoint: "https://peachyganggg.com/api/auth",
    recommendations: [],
  };

  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.VERCEL_URL
        ? "https://peachyganggg.com"
        : "*",
    },
  });
}
