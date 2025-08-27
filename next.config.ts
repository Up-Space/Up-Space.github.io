import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "http://0.0.0.0:3000",
    "http://localhost:3000",
  ],
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "@mdx-js/loader",
          options: {
            // You can add remark/rehype plugins here if needed
          },
        },
      ],
      include: path.resolve(__dirname),
    });

    return config;
  },
};

export default nextConfig;