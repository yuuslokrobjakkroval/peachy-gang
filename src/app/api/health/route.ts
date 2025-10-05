import { NextRequest, NextResponse } from "next/server";
import { getAbsoluteUrl, normalizeUrl } from "@/utils/get-absolute-url";

export async function GET(request: NextRequest) {
  const baseURL = getAbsoluteUrl({ request });
  const baseHost = (() => {
    try {
      return new URL(baseURL).hostname;
    } catch {
      return undefined;
    }
  })();

  const runtimeOrigin = normalizeUrl(request.headers.get("origin"));
  const response = NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      baseURL,
      domain: request.nextUrl.hostname,
      protocol: request.nextUrl.protocol,
      isCustomDomain: baseHost ? request.nextUrl.hostname === baseHost : false,
      isVercel: Boolean(process.env.VERCEL_URL),
      vercelUrl: process.env.VERCEL_URL,
      configuration: {
        hasAppUrl: Boolean(process.env.APP_URL),
        hasBetterAuthUrl: Boolean(process.env.BETTER_AUTH_URL),
        hasClientId: Boolean(process.env.BOT_CLIENT_ID),
        hasClientSecret: Boolean(process.env.BOT_CLIENT_SECRET),
        hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      },
      expectedRedirectUri: new URL(
        "/api/auth/callback/discord",
        baseURL
      ).toString(),
      authEndpoint: new URL("/api/auth", baseURL).toString(),
      recommendations: [],
    },
    {
      status: 200,
    }
  );

  response.headers.set(
    "Cache-Control",
    "no-cache, no-store, must-revalidate"
  );
  response.headers.set("Content-Type", "application/json");

  const corsOrigin =
    runtimeOrigin ?? normalizeUrl(request.nextUrl.origin) ?? baseURL;

  response.headers.set("Access-Control-Allow-Origin", corsOrigin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );

  const varyHeaders = [
    "Origin",
    "Access-Control-Request-Headers",
    "Access-Control-Request-Method",
  ];
  const existingVary = response.headers.get("Vary");
  const varySet = new Set(
    existingVary?.split(",").map((value) => value.trim()).filter(Boolean)
  );
  for (const header of varyHeaders) {
    if (!varySet.has(header)) {
      varySet.add(header);
    }
  }
  response.headers.set("Vary", Array.from(varySet).join(", "));

  return response;
}
