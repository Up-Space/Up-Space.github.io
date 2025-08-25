import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'http://0.0.0.0:3000',
    'http://localhost:3000'
  ],
};

export default nextConfig;