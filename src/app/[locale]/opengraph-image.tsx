import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale } from "@/content";
import { HERO_COPY } from "@/components/landing/hero-copy";

// Surfaces publicly as og:image:alt and twitter:image:alt, so it carries the
// positioning wherever the page is shared. Built from the hero's own source.
export const alt = `Ironproof — ${HERO_COPY.en.headline} ${HERO_COPY.en.headlineEnd} / ${HERO_COPY.fr.headline} ${HERO_COPY.fr.headlineEnd}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

const GOLD = "#c9a24b";

async function dataUri(relPath: string, mime: string): Promise<string> {
  const buf = await readFile(join(process.cwd(), relPath), "base64");
  return `data:${mime};base64,${buf}`;
}

/*
 * The card LinkedIn, Slack and X show when the link is shared: the same scene
 * and sentence as the first screen (the two keys, logo 09, the serif statement),
 * so the preview and the page read as one object. EB Garamond ships with the
 * repo (src/assets/fonts, SIL OFL) because Satori needs the font bytes.
 */
export default async function Image({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const hero = HERO_COPY[locale];

  const [photo, mark, serif, serifItalic] = await Promise.all([
    dataUri("public/media/hero-keys.jpg", "image/jpeg"),
    dataUri("public/media/ironproof-mark.png", "image/png"),
    readFile(join(process.cwd(), "src/assets/fonts/EBGaramond-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/EBGaramond-Italic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#050506",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={photo}
          alt=""
          width={1120}
          height={630}
          style={{ position: "absolute", top: 0, right: -250, width: 1120, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, #050506 0%, #050506 38%, rgba(5,5,6,0.75) 52%, rgba(5,5,6,0) 70%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            width: 860,
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
            <img src={mark} alt="" width={36} height={70} />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: 12, color: "#cfd3da" }}>
              IRONPROOF
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 16, letterSpacing: 3.5, color: GOLD, marginBottom: 26 }}>
            {hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "EB Garamond",
              fontSize: 66,
              lineHeight: 1.05,
              color: "#f2f3f5",
            }}
          >
            <span>{hero.headline}</span>
            <span style={{ fontStyle: "italic", color: GOLD }}>{hero.headlineEnd}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "EB Garamond", data: serif, style: "normal", weight: 400 },
        { name: "EB Garamond", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
