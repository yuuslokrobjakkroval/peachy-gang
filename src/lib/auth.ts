import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

// Singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.APP_URL ||
    "http://localhost:3000",
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
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
  },
  plugins: [nextCookies()],
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});
