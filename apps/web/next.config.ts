import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    authInterrupts: true,
    typedRoutes: true,
  },
  transpilePackages: ["@repo/database", "@repo/validation"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_EXTERNAL_SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
