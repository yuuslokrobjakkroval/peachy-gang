import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

// This sets up a single, shared Prisma Client instance to avoid creating too many connections.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Optional: logs database queries to the console. Useful for debugging.
    log: ["query"],
  });

globalForPrisma.prisma = prisma;

// --- Explicit URL and Environment Configuration ---
// This section is CRITICAL for Vercel. It removes all "magic" URL detection.
// It relies on ONE clear environment variable that you MUST set in your Vercel dashboard.

// 1. BETTER_AUTH_URL: This MUST be your full production domain.
//    Example: https://peachyganggg.com
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const isSecureOrigin = baseURL.startsWith("https");

// 2. This is derived from your baseURL.
const discordRedirectUri = `${baseURL}/api/auth/callback/discord`;

// 3. This is also derived. No need to add more URLs.
const trustedOrigins = [baseURL];

// --- Critical Startup Log ---
// This log runs when your Vercel server starts. If you do not see this in your Vercel logs,
// it means a critical environment variable is missing and the server crashed.
console.log("✅ [auth.ts] FINAL CONFIGURATION CHECK:", {
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
    useSecureCookies: isSecureOrigin,
  },
});
