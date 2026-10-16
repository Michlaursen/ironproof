import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ApplicationPage } from "@/components/landing/application-page";
import { APP_PILLAR } from "@/components/landing/application-copy";
import { PLATFORM_COPY } from "@/components/landing/platform-copy";
import { pick } from "@/components/landing/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/modernization" : `/${locale}/modernization`;
  // Title and description read from the landing's pillar: one source.
  const pillar = pick(PLATFORM_COPY, locale).pillars[APP_PILLAR["modernization"]];
  if (!pillar) return {};
  const title = `${pillar.name} — Ironproof`;
  const description = pillar.claim;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/modernization", fr: "/fr/modernization", "x-default": "/modernization" },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ironproof.ai${path}`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
    },
    // Without this the X card falls back to the home page's title.
    twitter: { title, description },
  };
}

export default async function ModernizationPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <ApplicationPage app="modernization" locale={locale} />;
}
