import { AUTH_CONFIG } from "@/lib/auth-config";
import { auth } from "@/lib/auth";
import { getAbsoluteUrl, normalizeUrl } from "@/utils/get-absolute-url";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

const allowedOrigins = new Set(
  [
    getAbsoluteUrl(),
    "http://localhost:3000",
    ...AUTH_CONFIG.trustedOrigins,
  ]
    .map((origin) => normalizeUrl(origin))
    .filter((origin): origin is string => Boolean(origin))
);

if (!allowedOrigins.size) {
  allowedOrigins.add(getAbsoluteUrl());
}

function ensureRuntimeOrigin(request: NextRequest) {
  const runtimeOrigin = normalizeUrl(request.nextUrl.origin);
  if (runtimeOrigin) {
    allowedOrigins.add(runtimeOrigin);
  }
}

function resolveCorsOrigin(request: NextRequest): string {
  ensureRuntimeOrigin(request);

  const originHeader = normalizeUrl(request.headers.get("origin"));
  if (originHeader && allowedOrigins.has(originHeader)) {
    return originHeader;
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedOrigin = normalizeUrl(
    forwardedProto && forwardedHost
      ? `${forwardedProto}://${forwardedHost}`
      : undefined
  );
  if (forwardedOrigin && allowedOrigins.has(forwardedOrigin)) {
    return forwardedOrigin;
  }

  const runtimeOrigin = normalizeUrl(request.nextUrl.origin);
  if (runtimeOrigin) {
    return runtimeOrigin;
  }

  const fallbackOrigin = allowedOrigins.values().next().value as string | undefined;
  return fallbackOrigin ?? getAbsoluteUrl();
}

function appendVary(headers: Headers, value: string) {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", value);
    return;
  }

  const values = existing.split(",").map((header) => header.trim());
  if (!values.includes(value)) {
    headers.set("Vary", `${existing}, ${value}`);
  }
}

function withCors(request: NextRequest, response: Response) {
  const origin = resolveCorsOrigin(request);

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  appendVary(response.headers, "Origin");
  appendVary(response.headers, "Access-Control-Request-Headers");
  appendVary(response.headers, "Access-Control-Request-Method");

  return response;
}

async function handleAuthRequest(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  request: NextRequest
) {
  const methodHandler = handler[method];
  if (!methodHandler) {
    return withCors(
      request,
      NextResponse.json(
        { error: "Method not supported" },
        { status: 405 }
      )
    );
  }

  try {
    const response = await methodHandler(request);
    return withCors(request, response as Response);
  } catch (error) {
    console.error(`Auth ${method} error:`, error);
    return withCors(
      request,
      NextResponse.json(
        { error: "Authentication error" },
        { status: 500 }
      )
    );
  }
}

export async function GET(request: NextRequest) {
  return handleAuthRequest("GET", request);
}

export async function POST(request: NextRequest) {
  return handleAuthRequest("POST", request);
}

export async function PUT(request: NextRequest) {
  return handleAuthRequest("PUT", request);
}

export async function PATCH(request: NextRequest) {
  return handleAuthRequest("PATCH", request);
}

export async function DELETE(request: NextRequest) {
  return handleAuthRequest("DELETE", request);
}

export function OPTIONS(request: NextRequest) {
  const origin = resolveCorsOrigin(request);
  const response = new NextResponse(null, { status: 204 });

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  appendVary(response.headers, "Origin");
  appendVary(response.headers, "Access-Control-Request-Headers");
  appendVary(response.headers, "Access-Control-Request-Method");

  return response;
}
