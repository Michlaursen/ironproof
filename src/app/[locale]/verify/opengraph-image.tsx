import { generateMetadata } from "./page";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

// Share card: prints this route's own metadata title (see src/lib/og-card.tsx).
export const alt = "Ironproof";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  return renderOgCard(generateMetadata, params);
}
