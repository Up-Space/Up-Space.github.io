import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'http://0.0.0.0:3000',
    'http://localhost:3000',
    'https://e16f5a21-3103-4093-8ef9-2cc91fb1f1e7-00-hc7hnmb93byy.kirk.replit.dev',
    'e16f5a21-3103-4093-8ef9-2cc91fb1f1e7-00-hc7hnmb93byy.kirk.replit.dev',
  ],
};

export default nextConfig;
