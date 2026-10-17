import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ResearchZeroBarriers } from "@/components/landing/research-zero-barriers";
import { LIMITS_COPY } from "@/components/landing/research-limits-copy";

const SLUG = "research/what-our-proofs-do-not-prove";
const PUBLISHED = "2026-10-16";

/*
 * English only, like the first note: /fr/… renders the English text with an
 * English canonical, no fr hreflang and no fr sitemap alternate, because no
 * French version exists yet.
 */
type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { title, description } = LIMITS_COPY.meta;

  return {
    title,
    description,
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
    },
  };
}

export default async function ResearchLimitsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: LIMITS_COPY.h1,
    description: LIMITS_COPY.meta.description,
    author: { "@type": "Organization", name: "Ironproof", url: "https://ironproof.ai" },
    publisher: { "@type": "Organization", name: "Ironproof", url: "https://ironproof.ai" },
    datePublished: PUBLISHED,
    inLanguage: "en",
    isAccessibleForFree: true,
    mainEntityOfPage: `https://ironproof.ai/${SLUG}`,
    citation: ["https://arxiv.org/abs/2610.11073"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchZeroBarriers
        locale="en"
        navLocale={locale}
        copy={LIMITS_COPY}
        page="research-limits"
      />
    </>
  );
}
