import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent, isLocale } from "@/content";

// Surfaces publicly as og:image:alt and twitter:image:alt, so it carries the
// positioning wherever the page is shared. Mirrors the two meta titles.
export const alt =
  "Ironproof — Verifiable authorization for AI financial workflows / Autorisation vérifiable pour les workflows financiers propulsés par l’IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const content = getContent(locale);

  const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #12161d 0%, #0a0d12 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#eef1f5",
            }}
          >
            <img src={logoSrc} width={38} height={38} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            <span style={{ color: "#eef1f5" }}>IRON</span>
            <span style={{ color: "#5b8def" }}>PROOF</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#5b8def",
            }}
          >
            {content.hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              color: "#eef1f5",
              maxWidth: 1000,
            }}
          >
            {content.hero.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            color: "#8b93a3",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              backgroundColor: "rgba(201,162,75,0.12)",
              color: "#c9a24b",
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#c9a24b",
                display: "flex",
              }}
            />
            {content.hero.proofCard.status}
          </div>
          {/*
            Was solution.diagram.proofArtifactValue. The diagram went away with
            the four-step rewrite; the card's own label says the same thing and
            is the object the badge belongs to.
          */}
          <span>{content.hero.proofCard.label}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
