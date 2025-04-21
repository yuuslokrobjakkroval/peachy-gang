import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.imgur.com",
      "images.remotePatterns",
      "cdn.discordapp.com",
      "i.pinimg.com",
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

export default nextConfig;
