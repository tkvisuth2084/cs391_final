import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.rescuegroups.org",
      },
    ],
  },
};

export default nextConfig;