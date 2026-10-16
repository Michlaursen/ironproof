import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/content";

/*
 * The share card every page shows when its link is posted (LinkedIn, Slack,
 * iMessage). Measured 2026-10-15: og:image was absent on 13 of 13 pages, so a
 * link to ironproof.ai unfurled as bare text.
 *
 * The card never carries its own copy of a title. Each route's
 * opengraph-image.tsx hands this module the page's own generateMetadata, and
 * the card prints whatever title that function returns: change the page
 * title, the card follows. Same white, iron and gold as the site; fonts are
 * EB Garamond and JetBrains Mono (SIL OFL, licences in assets/og/).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const MOTTO: Record<Locale, string> = {
  en: "PROVE · ENFORCE · SEAL · VERIFY",
  fr: "PROUVER · APPLIQUER · SCELLER · VÉRIFIER",
};

const IRON = "#24262a";
const GRAPHITE = "#5b5f66";
const GOLD = "#a8843a";
const GOLD_TEXT = "#7a5c22";

type Params = { locale: string } & Record<string, string>;

// "Start a pilot — Ironproof" -> "Start a pilot". The brand is on the card already.
function bareTitle(meta: Metadata): string {
  const raw = meta.title;
  const t =
    typeof raw === "string"
      ? raw
      : raw && typeof raw === "object" && "absolute" in raw && typeof raw.absolute === "string"
        ? raw.absolute
        : raw && typeof raw === "object" && "default" in raw && typeof raw.default === "string"
          ? raw.default
          : "";
  return t
    .replace(/\s+[—|]\s+Ironproof( Research)?$/u, "")
    .replace(/^Ironproof\s+\|\s+/u, "")
    .trim();
}

async function asset(rel: string): Promise<Buffer> {
  return readFile(join(process.cwd(), rel));
}

export async function renderOgCard<P extends Params>(
  generateMetadata: (props: { params: Promise<P> }) => Promise<Metadata>,
  params: Promise<P>,
): Promise<ImageResponse> {
  const p = await params;
  const locale: Locale = isLocale(p.locale) ? p.locale : "en";

  let title = "Ironproof";
  try {
    const meta = await generateMetadata({ params: Promise.resolve(p) });
    title = bareTitle(meta) || title;
  } catch (err) {
    // Degrade, never crash: a card with the brand alone beats a 500 on share.
    console.error("og-card: generateMetadata failed", err);
  }

  const [garamond, mono, mark] = await Promise.all([
    asset("assets/og/EBGaramond-Medium.woff"),
    asset("assets/og/JetBrainsMono-Regular.woff"),
    asset("public/media/ironproof-mark.png"),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  const titleSize = title.length > 70 ? 60 : title.length > 45 ? 70 : 82;

  // Crop marks at the four corners of the plate, like the site's plates.
  const crop = (pos: Record<string, number>) => (
    <div style={{ position: "absolute", width: 22, height: 22, display: "flex", ...pos }}>
      <div style={{ position: "absolute", width: 22, height: 1, background: GOLD, ...(pos.bottom !== undefined ? { bottom: 0 } : { top: 0 }) }} />
      <div style={{ position: "absolute", width: 1, height: 22, background: GOLD, ...(pos.right !== undefined ? { right: 0 } : { left: 0 }) }} />
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(168deg, #f8f6f1 0%, #efede7 62%, #e7e4dc 100%)",
          borderTop: `6px solid ${GOLD}`,
          fontFamily: "Garamond",
          color: IRON,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            border: "1px solid rgba(36, 38, 42, 0.18)",
            display: "flex",
          }}
        />
        {crop({ top: 14, left: 14 })}
        {crop({ top: 14, right: 14 })}
        {crop({ bottom: 14, left: 14 })}
        {crop({ bottom: 14, right: 14 })}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 84px 64px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- satori renders <img>, not next/image */}
            <img src={markSrc} width={36} height={70} alt="" />
            <div style={{ fontFamily: "Mono", fontSize: 26, letterSpacing: 9, color: IRON }}>IRONPROOF</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div style={{ width: 90, height: 2, background: GOLD, display: "flex" }} />
            <div style={{ fontSize: titleSize, lineHeight: 1.04, maxWidth: 1000, display: "flex" }}>{title}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontFamily: "Mono", fontSize: 19, letterSpacing: 5, color: GOLD_TEXT }}>{MOTTO[locale]}</div>
            <div style={{ fontFamily: "Mono", fontSize: 19, letterSpacing: 3, color: GRAPHITE }}>ironproof.ai</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Garamond", data: garamond, style: "normal", weight: 500 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
