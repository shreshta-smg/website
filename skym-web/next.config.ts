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
        hostname: "res.cloudinary.com",
        pathname: "**", // Be specific here: /<YOUR_CLOUD_NAME>/**
      },
    ],
  },
};

export default nextConfig;
