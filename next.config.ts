import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App configuration
  appName: "Mystry World",

  // Build optimization
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Image optimization
  images: {
    domains: ["localhost"],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
