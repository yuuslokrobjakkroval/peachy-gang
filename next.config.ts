import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
    BOT_CLIENT_ID: process.env.BOT_CLIENT_ID,
    BOT_CLIENT_SECRET: process.env.BOT_CLIENT_SECRET,
    FIRST_SUB_CLIENT_ID: process.env.FIRST_SUB_BOT_CLIENT_ID,
    SECOND_SUB_CLIENT_ID: process.env.SECOND_SUB_BOT_CLIENT_ID,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  },
  reactStrictMode: true,
  images: {
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
        hostname: "i.pinimg.com",
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
