import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    BOT_CLIENT_ID: process.env.BOT_CLIENT_ID,
    BOT_CLIENT_SECRET: process.env.BOT_CLIENT_SECRET,
    FIRST_SUB_BOT_CLIENT_ID: process.env.FIRST_SUB_BOT_CLIENT_ID,
    SECOND_SUB_BOT_CLIENT_ID: process.env.SECOND_SUB_BOT_CLIENT_ID,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    OWNER_IDS: process.env.OWNER_IDS,
    STAFF_IDS: process.env.STAFF_IDS,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    NEXT_PUBLIC_DEFAULT_DOMAIN: process.env.NEXT_PUBLIC_DEFAULT_DOMAIN,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.remotePatterns",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "x.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during production build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Optionally ignore ESLint errors (e.g., unused components)
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
