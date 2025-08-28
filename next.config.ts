
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  experimental: {
    allowedDevOrigins: [
      "http://0.0.0.0:3000",
      "http://localhost:3000",
      "https://*.replit.dev",
      "https://*.repl.co",
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
};

export default nextConfig;
