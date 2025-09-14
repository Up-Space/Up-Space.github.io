
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedRevalidateHeaderKeys: ['*'],
  },
  // Configure allowed origins for development
  async rewrites() {
    return [];
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
};

export default nextConfig;
