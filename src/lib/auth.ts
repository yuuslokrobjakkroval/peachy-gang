import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { AUTH_CONFIG } from "@/lib/auth-config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

globalForPrisma.prisma = prisma;

const {
  baseUrl,
  authApiBaseUrl,
  isSecure,
  discordRedirectUri,
  trustedOrigins,
} = AUTH_CONFIG;

if (!process.env.BOT_CLIENT_ID || !process.env.BOT_CLIENT_SECRET) {
  console.error(
    "❌ [auth.ts] Missing Discord OAuth credentials. Please set BOT_CLIENT_ID and BOT_CLIENT_SECRET."
  );
}

if (!process.env.DATABASE_URL) {
  console.error(
    "❌ [auth.ts] DATABASE_URL is not configured. Prisma adapter will fail without a database connection."
  );
}

console.log("✅ [auth.ts] Loaded Better Auth configuration", {
  baseUrl,
  authApiBaseUrl,
  isSecure,
  discordRedirectUri,
  trustedOrigins,
});

export const auth = betterAuth({
  baseURL: authApiBaseUrl,
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  trustedOrigins,
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
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: isSecure ? "none" : "lax",
        secure: isSecure,
        path: "/",
      },
    },
  },
  plugins: [nextCookies()],
  advanced: {
    useSecureCookies: isSecure,
  },
});
