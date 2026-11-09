import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ResearchZeroBarriers } from "@/components/landing/research-zero-barriers";
import { HUMAN_LOOP_COPY } from "@/components/landing/research-human-loop-copy";

const SLUG = "research/when-the-ai-hacks-the-human-in-the-loop";
const PUBLISHED = "2026-10-21";

/*
 * The French note is written and lives in HUMAN_LOOP_COPY.fr, but it has not
 * had a native Quebec French reader yet (rule #78), so it is not served: /fr/…
 * renders the English note with an English canonical, no fr hreflang and no
 * fr sitemap alternate — the same posture as the other two notes.
 *
 * To turn French on after review: set CONTENT_LOCALE back to `locale`, restore
 * the fr entry in `languages` below, and re-add the fr alternate in
 * src/app/sitemap.ts.
 */
const CONTENT_LOCALE = "en" as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { title, description } = HUMAN_LOOP_COPY[CONTENT_LOCALE].meta;

  return {
    title,
    description,
    authors: [{ name: "Ironproof Research" }],
    alternates: {
      canonical: `/${SLUG}`,
      languages: { en: `/${SLUG}`, "x-default": `/${SLUG}` },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ironproof.ai/${SLUG}`,
      locale: "en_US",
      publishedTime: PUBLISHED,
      authors: ["Ironproof Research"],
    },
  };
}

export default async function ResearchHumanLoopPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: HUMAN_LOOP_COPY[CONTENT_LOCALE].h1,
    description: HUMAN_LOOP_COPY[CONTENT_LOCALE].meta.description,
    author: { "@type": "Organization", name: "Ironproof", url: "https://ironproof.ai" },
    publisher: { "@type": "Organization", name: "Ironproof", url: "https://ironproof.ai" },
    datePublished: PUBLISHED,
    inLanguage: "en",
    isAccessibleForFree: true,
    mainEntityOfPage: `https://ironproof.ai/${SLUG}`,
    citation: HUMAN_LOOP_COPY[CONTENT_LOCALE].sources.items
      .map(([href]) => href)
      .filter((href) => href.startsWith("https://")),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchZeroBarriers
        locale={CONTENT_LOCALE}
        navLocale={locale}
        copy={HUMAN_LOOP_COPY[CONTENT_LOCALE]}
        page="research-human-loop"
      />
    </>
  );
}
