import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ProvableAI } from "@/components/landing/provable-ai";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/provable-ai" : `/${locale}/provable-ai`;
  const title = "What is Provable AI? — IronProof";
  const description =
    "Provable AI: prove — mathematically and cryptographically — that an AI agent could not cross the line you drew, and hand you an artifact you verify yourself, offline, without trusting the vendor.";

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

  // English copy inline for phase 1 (same posture as the landing); /fr resolves
  // to the same component until the i18n content is reconnected.
  return <ProvableAI locale={locale} />;
}
