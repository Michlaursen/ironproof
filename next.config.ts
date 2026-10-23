import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The round "N" badge in dev sat on top of the page and read as a play
  // button during design review. Dev-only; production never shows it.
  devIndicators: false,
  // Branded 404 for unmatched URLs: the root layout sits under [locale], so a
  // plain not-found.tsx cannot catch them (src/app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
  // AVIF first: the hero and plates are dark photographs, where AVIF is
  // markedly smaller than WebP at the same look (Lighthouse pass 2026-09-25).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  // sharp ships a musl (Alpine) build next to the glibc one, and both were
  // traced into every server function: 17 MB each that Vercel's glibc
  // runtime never loads. Function storage hit the Hobby cap on 2026-10-17.
  outputFileTracingExcludes: {
    "*": ["node_modules/@img/*linuxmusl*/**"],
  },
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/demo", destination: "/en/demo" },
      { source: "/demo/python-to-c", destination: "/en/demo/python-to-c" },
      { source: "/provable-ai", destination: "/en/provable-ai" },
      { source: "/neuro-symbolic", destination: "/en/neuro-symbolic" },
      { source: "/zero-trust", destination: "/en/zero-trust" },
      { source: "/critical-actions", destination: "/en/critical-actions" },
      { source: "/software-security", destination: "/en/software-security" },
      { source: "/modernization", destination: "/en/modernization" },
      { source: "/traceability-audit", destination: "/en/traceability-audit" },
      { source: "/proof", destination: "/en/proof" },
      { source: "/verify", destination: "/en/verify" },
      { source: "/evidence", destination: "/en/evidence" },
      { source: "/lab", destination: "/en/lab" },
      { source: "/pilot", destination: "/en/pilot" },
      { source: "/actions/:type", destination: "/en/actions/:type" },
      { source: "/research", destination: "/en/research" },
      { source: "/proof-intelligence", destination: "/en/proof-intelligence" },
      {
        source: "/research/zero-barriers-one-reviewer",
        destination: "/en/research/zero-barriers-one-reviewer",
      },
      {
        source: "/research/what-our-proofs-do-not-prove",
        destination: "/en/research/what-our-proofs-do-not-prove",
      },
      {
        source: "/research/when-the-ai-hacks-the-human-in-the-loop",
        destination: "/en/research/when-the-ai-hacks-the-human-in-the-loop",
      },
    ];
  },
};

export default nextConfig;
