import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ResearchZeroBarriers } from "@/components/landing/research-zero-barriers";
import { RESEARCH_COPY } from "@/components/landing/research-copy";

const SLUG = "research/zero-barriers-one-reviewer";

/*
 * The French note is written and lives in RESEARCH_COPY.fr, but it has not had
 * a native Quebec French reader yet (rule #78), so it is not served. /fr/…
 * renders the English note — the same posture /provable-ai takes — and points
 * its canonical at the English URL, so we are not advertising a French version
 * that does not exist. No fr hreflang and no fr sitemap alternate for the same
 * reason.
 *
 * To turn French on after review: set CONTENT_LOCALE back to `locale`, restore
 * the fr entry in `languages` below, and re-add the fr alternate in
 * src/app/sitemap.ts. Nothing else needs to change — the charts and the copy
 * are already bilingual and the layout guard already covers both.
 */
const CONTENT_LOCALE = "en" as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { title, description } = RESEARCH_COPY[CONTENT_LOCALE].meta;

  return {
    title,
    description,
    authors: [{ name: "Miguel Laursen" }],
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
      publishedTime: "2026-09-08",
      authors: ["Miguel Laursen"],
    },
  };
}

export default async function ResearchZeroBarriersPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Named authorship plus dated citations: this is a research note whose value
  // is that its figures trace to primary sources, and answer engines weight
  // that. The four cited URLs are the ones the derived figures come from.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: RESEARCH_COPY[CONTENT_LOCALE].h1,
    description: RESEARCH_COPY[CONTENT_LOCALE].meta.description,
    author: {
      "@type": "Person",
      name: "Miguel Laursen",
      affiliation: { "@type": "Organization", name: "Ironproof" },
    },
    publisher: { "@type": "Organization", name: "Ironproof", url: "https://ironproof.ai" },
    datePublished: "2026-09-08",
    inLanguage: "en",
    isAccessibleForFree: true,
    mainEntityOfPage: `https://ironproof.ai/${SLUG}`,
    citation: [
      "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing",
      "https://huggingface.co/blog/agent-intrusion-technical-timeline",
      "https://www.csis.org/analysis/out-bounds-what-us-government-should-do-response-ai-agent-containment-failures",
      "https://www.gravitee.io/state-of-ai-agent-security",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchZeroBarriers locale={CONTENT_LOCALE} navLocale={locale} />
    </>
  );
}
