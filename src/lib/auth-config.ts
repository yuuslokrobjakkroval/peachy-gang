import { getAbsoluteUrl, normalizeUrl } from "@/utils/get-absolute-url";

const DEFAULT_AUTH_FALLBACK = "http://localhost:3000";

function uniqueStrings(values: (string | undefined | null)[]): string[] {
  const seen = new Set<string>();
  for (const value of values) {
    if (typeof value === "string" && value.length > 0 && !seen.has(value)) {
      seen.add(value);
    }
  }
  return Array.from(seen.values());
}

function resolveBaseUrl(): string {
  const explicitEnv =
    process.env.BETTER_AUTH_URL ||
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_URL;

  const normalizedExplicit = normalizeUrl(explicitEnv);
  if (normalizedExplicit) {
    return normalizedExplicit;
  }

  const inferred = normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (inferred) {
    return inferred;
  }

  const vercelUrl =
    process.env.VERCEL_URL && normalizeUrl(`https://${process.env.VERCEL_URL}`);
  if (vercelUrl) {
    return vercelUrl;
  }

  return getAbsoluteUrl({ fallback: DEFAULT_AUTH_FALLBACK });
}

const AUTH_BASE_URL = resolveBaseUrl();

export const AUTH_CONFIG = {
  baseUrl: AUTH_BASE_URL,
  isSecure: AUTH_BASE_URL.startsWith("https://"),
  discordRedirectUri: `${AUTH_BASE_URL.replace(/\/$/, "")}/api/auth/callback/discord`,
  trustedOrigins: uniqueStrings(
    [
      AUTH_BASE_URL,
      process.env.APP_URL,
      process.env.BETTER_AUTH_URL,
      process.env.NEXT_PUBLIC_APP_URL,
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.NEXT_PUBLIC_URL,
      process.env.NEXT_PUBLIC_FRONTEND_URL,
      process.env.NEXT_PUBLIC_WEBSITE_URL,
      process.env.SITE_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
      process.env.NEXT_PUBLIC_DEFAULT_DOMAIN,
    ].map((origin) => normalizeUrl(origin))
  ),
} as const;

export type AuthConfig = typeof AUTH_CONFIG;
