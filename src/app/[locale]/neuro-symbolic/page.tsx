import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { NeuroSymbolic } from "@/components/landing/neuro-symbolic";
import { type L, pick } from "@/components/landing/i18n";

const META: L<{ title: string; description: string }> = {
  en: {
    title: "Neuro-symbolic AI and automated formal verification — Ironproof",
    description:
      "What neuro-symbolic AI is, what an automated formal verification engine does, and where each sits in Ironproof: the model proposes, the solver decides, and you verify the sealed proof yourself.",
  },
  fr: {
    title: "IA neuro-symbolique et vérification formelle automatisée — Ironproof",
    description:
      "Ce qu’est l’IA neuro-symbolique, ce que fait un moteur de vérification formelle automatisée, et où chacun se trouve dans Ironproof : le modèle propose, le solveur décide, et vous vérifiez vous-même la preuve scellée.",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/neuro-symbolic" : `/${locale}/neuro-symbolic`;
  const { title, description } = pick(META, locale);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/neuro-symbolic", fr: "/fr/neuro-symbolic", "x-default": "/neuro-symbolic" },
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

export default async function NeuroSymbolicPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Copy lives in components/landing/neuro-symbolic-copy.tsx, both languages.
  return <NeuroSymbolic locale={locale} />;
}
