import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: true,
  },
  images: {
    remotePatterns: [
      new URL("https://example.com/**"),
      {
        protocol: "https",
        hostname: "cxcqcvvtjyqmcwrmtpsj.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
