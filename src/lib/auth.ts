import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { APP_URL, BETTER_AUTH_URL, NODE_ENV } from "@/utils/auth/server";

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

// Get the base URL based on environment
function getBaseURL() {
  // In browser, use window.location.origin
  console.log("Start Determining base URL...");
  // In server-side, use environment variables
  if (BETTER_AUTH_URL) {
    return BETTER_AUTH_URL;
  }

  if (APP_URL) {
    return APP_URL;
  }

  console.log("No environment variable found for base URL.");
  // Fallback for development
  return NODE_ENV !== "dev"
    ? "http://peachyganggg.com"
    : "http://localhost:3000";
}
// Helper function to determine if we're in production
function isProduction(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  baseURL: getBaseURL(),
  socialProviders: {
    discord: {
      clientId: process.env.BOT_CLIENT_ID as string,
      clientSecret: process.env.BOT_CLIENT_SECRET as string,
      scope: ["identify", "email", "guilds"], // Proper Discord OAuth scopes
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
  emailVerification: {
    expiresIn: 60 * 30, // 30 minutes instead of 10
    sendOnSignUp: false, // Disable email verification for OAuth
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction(),
        path: "/",
      },
    },
  },
  plugins: [nextCookies()],
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    crossSubDomainCookies: {
      enabled: false, // Disable for now to avoid domain issues
    },
  },
});
