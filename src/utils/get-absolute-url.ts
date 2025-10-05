import type { NextRequest } from "next/server";

const DEFAULT_LOCAL_URL = "http://localhost:3000";
const DEFAULT_PRODUCTION_DOMAIN = "https://peachyganggg.com";

const ENV_URL_KEYS: (keyof NodeJS.ProcessEnv)[] = [
  "BETTER_AUTH_URL",
  "APP_URL",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_URL",
  "NEXT_PUBLIC_FRONTEND_URL",
  "NEXT_PUBLIC_WEBSITE_URL",
  "SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_BRANCH_URL",
];

function normalizeUrl(value?: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    return url.origin;
  } catch {
    return undefined;
  }
}

function getEnvUrl(): string | undefined {
  for (const key of ENV_URL_KEYS) {
    const value = normalizeUrl(process.env[key]);
    if (value) {
      return value;
    }
  }

  const nextPublicVercel = normalizeUrl(process.env.NEXT_PUBLIC_VERCEL_URL);
  if (nextPublicVercel) {
    return nextPublicVercel;
  }

  const vercelHost = process.env.VERCEL_URL
    ? normalizeUrl(`https://${process.env.VERCEL_URL}`)
    : undefined;
  if (vercelHost) {
    return vercelHost;
  }

  if (process.env.VERCEL_ENV === "production") {
    const fallbackProd = normalizeUrl(
      process.env.NEXT_PUBLIC_DEFAULT_DOMAIN ?? DEFAULT_PRODUCTION_DOMAIN
    );
    if (fallbackProd) {
      return fallbackProd;
    }
  }

  return undefined;
}

function getRequestOrigin(
  request?: Request | NextRequest
): string | undefined {
  if (!request) {
    return undefined;
  }

  const headers = request.headers;
  const forwardedProto = headers.get("x-forwarded-proto");
  const forwardedHost = headers.get("x-forwarded-host");
  if (forwardedProto && forwardedHost) {
    const forwardedOrigin = normalizeUrl(`${forwardedProto}://${forwardedHost}`);
    if (forwardedOrigin) {
      return forwardedOrigin;
    }
  }

  const originHeader = headers.get("origin") ?? headers.get("referer");
  const normalizedOrigin = normalizeUrl(originHeader);
  if (normalizedOrigin) {
    return normalizedOrigin;
  }

  const maybeNext = request as NextRequest;
  const nextUrlOrigin = maybeNext?.nextUrl?.origin;
  const normalizedNextOrigin = normalizeUrl(nextUrlOrigin);
  if (normalizedNextOrigin) {
    return normalizedNextOrigin;
  }

  const requestUrl = (request as Request).url;
  const normalizedRequestUrl = normalizeUrl(requestUrl);
  if (normalizedRequestUrl) {
    return normalizedRequestUrl;
  }

  return undefined;
}

export type AbsoluteUrlOptions = {
  request?: Request | NextRequest;
  fallback?: string;
};

export function getAbsoluteUrl(options?: AbsoluteUrlOptions): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  const requestOrigin = getRequestOrigin(options?.request);
  if (requestOrigin) {
    return requestOrigin;
  }

  const envUrl = getEnvUrl();
  if (envUrl) {
    return envUrl;
  }

  return options?.fallback ?? DEFAULT_LOCAL_URL;
}

export function getBetterAuthUrl(options?: AbsoluteUrlOptions): string {
  return getAbsoluteUrl(options);
}

export { normalizeUrl };
