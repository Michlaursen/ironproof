import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { ZeroTrust } from "@/components/landing/zero-trust";
import { type L, pick } from "@/components/landing/i18n";

const META: L<{ title: string; description: string }> = {
  en: {
    title: "Zero Trust, extended to actions — Ironproof",
    description:
      "Zero Trust (NIST SP 800-207) decides who reaches a resource. Ironproof decides whether this exact action may run, against your formal policy, before it executes: PROCEED, BLOCK, or REFUSE when the solver cannot decide. Every decision on the production gate, allowed or blocked, is sealed, and you verify the record offline without having to trust us.",
  },
  fr: {
    title: "Le Zero Trust, étendu aux actions — Ironproof",
    description:
      "Le Zero Trust (NIST SP 800-207) décide qui atteint une ressource. Ironproof décide si cette action précise peut s’exécuter, selon votre politique formelle, avant l’exécution : PROCEED, BLOCK, ou REFUSE quand le solveur ne peut pas trancher. Chaque décision de la barrière de production, autorisée ou bloquée, est scellée, et vous vérifiez la trace hors ligne sans avoir à nous croire.",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/zero-trust" : `/${locale}/zero-trust`;
  const { title, description } = pick(META, locale);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/zero-trust", fr: "/fr/zero-trust", "x-default": "/zero-trust" },
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

export default async function ZeroTrustPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Copy lives in components/landing/zero-trust-copy.tsx, both languages.
  return <ZeroTrust locale={locale} />;
}
