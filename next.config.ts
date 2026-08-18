import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/provable-ai", destination: "/en/provable-ai" },
    ];
  },
};

export default nextConfig;
