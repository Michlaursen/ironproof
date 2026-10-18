import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ResearchZeroBarriers } from "@/components/landing/research-zero-barriers";
import { PI_COPY, PI_DEFINITION } from "@/components/landing/proof-intelligence-copy";

const SLUG = "proof-intelligence";
const PUBLISHED = "2026-10-17";
const FILM = {
  src: "/media/proof-intelligence-film.h264.mp4",
  poster: "/media/proof-intelligence-film-poster.jpg",
  label: "Film: Proof Intelligence, in under three minutes",
  note: "2 minutes 46 seconds, with sound. The payments in the film illustrate a payment policy; they are not a client case. Each application is shown with its status today. The standards shown are the ones each sector already works under; naming a sector does not mean it uses Ironproof today.",
};

/*
 * The definition of the term the hero carries. English only, like the
 * research notes: /fr/… renders the English text with an English canonical,
 * no fr hreflang and no fr sitemap alternate, until the French is reviewed.
 *
 * The JSON-LD declares a DefinedTerm so search engines and AI assistants read
 * the sentence as a definition of "Proof Intelligence", with Ironproof as the
 * source, not as one more paragraph.
 */
type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { title, description } = PI_COPY.meta;

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

export default async function ProofIntelligencePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const url = `https://ironproof.ai/${SLUG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${url}#term`,
        name: "Proof Intelligence",
        description: PI_DEFINITION,
        url,
        inDefinedTermSet: { "@id": `${url}#set` },
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${url}#set`,
        name: "Ironproof glossary",
        publisher: { "@id": "https://ironproof.ai/#organization" },
      },
      {
        "@type": "Article",
        headline: `What is ${PI_COPY.h1}?`,
        description: PI_COPY.meta.description,
        author: { "@id": "https://ironproof.ai/#organization" },
        publisher: { "@id": "https://ironproof.ai/#organization" },
        datePublished: PUBLISHED,
        inLanguage: "en",
        isAccessibleForFree: true,
        mainEntityOfPage: url,
        about: { "@id": `${url}#term` },
      },
      {
        "@type": "VideoObject",
        name: FILM.label,
        description: PI_DEFINITION,
        thumbnailUrl: `https://ironproof.ai${FILM.poster}`,
        contentUrl: `https://ironproof.ai${FILM.src}`,
        uploadDate: PUBLISHED,
        duration: "PT2M46S",
        publisher: { "@id": "https://ironproof.ai/#organization" },
      },
    ],
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
        copy={PI_COPY}
        page="proof-intelligence"
        film={FILM}
      />
    </>
  );
}
