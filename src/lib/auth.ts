import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { NODE_ENV } from "@/utils/auth/server";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";

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

const isProduction = NODE_ENV === "production";
const baseURL = getAbsoluteUrl();

console.log("Better Auth Configuration:", {
  NODE_ENV,
  baseURL,
  isProduction,
  hasClientId: !!process.env.BOT_CLIENT_ID,
  hasClientSecret: !!process.env.BOT_CLIENT_SECRET,
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
      redirectURI: `${baseURL}/api/auth/callback/discord`,
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
    expiresIn: 60 * 30, // 30 minutes
    sendOnSignUp: false, // Disable email verification for OAuth
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax", // Use "none" for production cross-site requests
        secure: isProduction, // Always secure in production
        path: "/",
        domain: isProduction ? undefined : undefined, // Let browser handle domain
      },
    },
  },
  plugins: [nextCookies()],
  trustedOrigins: [baseURL], // Add trusted origins for CORS
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    crossSubDomainCookies: {
      enabled: false,
    },
    generateId: false, // Let Better Auth handle ID generation
  },
});
