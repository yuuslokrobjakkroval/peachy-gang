import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
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

// --- Simplified & Explicit URL Configuration ---
// This now relies on a single, clear environment variable.
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const isSecureOrigin = baseURL.startsWith("https");
const discordRedirectUri = `${baseURL}/api/auth/callback/discord`;
const trustedOrigins = [baseURL]; // Only trust the base URL.

// --- Critical Startup Log ---
// This is the most important log. If you don't see this in your Vercel logs,
// it means a critical ENV VAR is missing and the server crashed on startup.
console.log("✅ [auth.ts] FINAL CHECK - Better Auth Configuration:", {
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
