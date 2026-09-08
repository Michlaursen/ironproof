import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ResearchZeroBarriers } from "@/components/landing/research-zero-barriers";
import { RESEARCH_COPY } from "@/components/landing/research-copy";

const SLUG = "research/zero-barriers-one-reviewer";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? `/${SLUG}` : `/${locale}/${SLUG}`;
  const { title, description } = RESEARCH_COPY[locale].meta;

  return {
    title,
    description,
    authors: [{ name: "Miguel Laursen" }],
    alternates: {
      canonical: path,
      languages: { en: `/${SLUG}`, fr: `/fr/${SLUG}`, "x-default": `/${SLUG}` },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ironproof.ai${path}`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
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
    headline: RESEARCH_COPY[locale].h1,
    description: RESEARCH_COPY[locale].meta.description,
    author: {
      "@type": "Person",
      name: "Miguel Laursen",
      affiliation: { "@type": "Organization", name: "Ironproof" },
    },
    publisher: { "@type": "Organization", name: "Ironproof", url: "https://ironproof.ai" },
    datePublished: "2026-09-08",
    inLanguage: locale === "fr" ? "fr-CA" : "en",
    isAccessibleForFree: true,
    mainEntityOfPage: `https://ironproof.ai${locale === "en" ? `/${SLUG}` : `/${locale}/${SLUG}`}`,
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
      <ResearchZeroBarriers locale={locale} />
    </>
  );
}
