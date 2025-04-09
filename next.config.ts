import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.imgur.com",
      "cdn.discordapp.com",
      "images.remotePatterns",
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
};

export default nextConfig;
