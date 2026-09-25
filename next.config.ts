import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The round "N" badge in dev sat on top of the page and read as a play
  // button during design review. Dev-only; production never shows it.
  devIndicators: false,
  // AVIF first: the hero and plates are dark photographs, where AVIF is
  // markedly smaller than WebP at the same look (Lighthouse pass 2026-09-25).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/provable-ai", destination: "/en/provable-ai" },
      { source: "/proof", destination: "/en/proof" },
      { source: "/verify", destination: "/en/verify" },
      { source: "/research", destination: "/en/research" },
      {
        source: "/research/zero-barriers-one-reviewer",
        destination: "/en/research/zero-barriers-one-reviewer",
      },
    ];
  },
};

export default nextConfig;
