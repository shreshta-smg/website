import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: true,
  },
  images: {
    remotePatterns: [new URL("https://example.com/**")],
  },
};

export default nextConfig;
