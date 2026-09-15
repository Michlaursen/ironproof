import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ProvableAI } from "@/components/landing/provable-ai";
import { type L, pick } from "@/components/landing/i18n";

const META: L<{ title: string; description: string }> = {
  en: {
    title: "What is Provable AI? — Ironproof",
    description:
      "Provable AI: prove — mathematically and cryptographically — that an AI agent could not cross the line you drew, and hand you an artifact you verify yourself, offline, without trusting the vendor.",
  },
  fr: {
    title: "Qu’est-ce que l’IA prouvable ? — Ironproof",
    description:
      "L’IA prouvable : prouver — mathématiquement et cryptographiquement — qu’un agent IA n’a pas pu franchir la ligne que vous avez tracée, et vous remettre un artefact que vous vérifiez vous-même, hors ligne, sans faire confiance au fournisseur.",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/provable-ai" : `/${locale}/provable-ai`;
  const { title, description } = pick(META, locale);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/provable-ai", fr: "/fr/provable-ai", "x-default": "/provable-ai" },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ironproof.ai${path}`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
    },
  };
}

export default async function ProvableAIPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Copy lives in components/landing/provable-ai-copy.tsx, both languages.
  return <ProvableAI locale={locale} />;
}
