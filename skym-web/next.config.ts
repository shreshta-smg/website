import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: true,
  },
  images: {
    remotePatterns: [new URL("http://localhost:1337/uploads/**")],
  },
};

export default nextConfig;
