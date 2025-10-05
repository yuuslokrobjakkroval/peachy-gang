import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { NODE_ENV } from "@/utils/auth/server";
import { getAbsoluteUrl, normalizeUrl } from "@/utils/get-absolute-url";

// Singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

globalForPrisma.prisma = prisma;

const baseURL = getAbsoluteUrl();
const isSecureOrigin = baseURL.startsWith("https://");
const discordRedirectUri = new URL(
  "/api/auth/callback/discord",
  baseURL
).toString();

const additionalOrigins = [
  baseURL,
  process.env.APP_URL,
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NEXT_PUBLIC_URL,
  process.env.NEXT_PUBLIC_VERCEL_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL ? `${process.env.VERCEL_URL}` : undefined,
  process.env.NEXT_PUBLIC_DEFAULT_DOMAIN,
];

const trustedOrigins = Array.from(
  new Set(
    additionalOrigins
      .map((origin) => normalizeUrl(origin))
      .filter((origin): origin is string => Boolean(origin))
  )
);

if (!trustedOrigins.includes(baseURL)) {
  trustedOrigins.unshift(baseURL);
}

console.log("✅ [auth.ts] Better Auth Configuration being used:", {
  NODE_ENV,
  baseURL,
  isSecureOrigin,
  discordRedirectUri,
  trustedOrigins: JSON.stringify(trustedOrigins),
  hasClientId: !!process.env.BOT_CLIENT_ID,
  hasClientSecret: !!process.env.BOT_CLIENT_SECRET,
  hasDatabaseUrl: !!process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  baseURL,
  socialProviders: {
    discord: {
      clientId: process.env.BOT_CLIENT_ID as string,
      clientSecret: process.env.BOT_CLIENT_SECRET as string,
      scope: ["identify", "email", "guilds"],
      redirectURI: discordRedirectUri,
      storeAccessToken: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session daily
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: isSecureOrigin ? "none" : "lax",
        secure: isSecureOrigin,
        path: "/",
      },
    },
  },
  plugins: [nextCookies()],
  trustedOrigins,
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    crossSubDomainCookies: {
      enabled: false,
    },
    useSecureCookies: isSecureOrigin,
  },
});
