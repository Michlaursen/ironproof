import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { ProofSeal } from "@/components/landing/proof-seal";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { ProofExplorer } from "@/components/landing/proof-explorer";
import { TestingVsProving } from "@/components/landing/testing-vs-proving";
import { Credibility } from "@/components/landing/credibility";
import { type L, pick } from "@/components/landing/i18n";

const T: L<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
}> = {
  en: {
    metaTitle: "The technical record — Ironproof",
    metaDescription:
      "Inspect a sealed proof artifact field by field, and the public record behind the engine: published research, assigned CVEs and upstream acknowledgements credited by IBM, GnuPG, Mozilla, Red Hat, wolfSSL, VideoLAN and DCMTK.",
    eyebrow: "THE TECHNICAL RECORD",
    h1: "Read the proof, not the promise.",
    lead: "The artifact below is the same one a decision produces. Every field is inspectable, and the record underneath it is hosted by other people — we cannot write it, retract it or edit it.",
  },
  fr: {
    metaTitle: "Le dossier technique — Ironproof",
    metaDescription:
      "Inspectez un artefact de preuve scellé champ par champ, et le dossier public derrière le moteur\u00a0: recherche publiée, CVE assignées et remerciements en amont crédités par IBM, GnuPG, Mozilla, Red Hat, wolfSSL, VideoLAN et DCMTK.",
    eyebrow: "LE DOSSIER TECHNIQUE",
    h1: "Lisez la preuve, pas la promesse.",
    lead: "L’artefact ci-dessous est exactement celui qu’une décision produit. Chaque champ est inspectable, et le dossier qui le soutient est hébergé par d’autres\u202f: nous ne pouvons ni l’écrire, ni le retirer, ni le modifier.",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/proof" : `/${locale}/proof`;
  const { metaTitle: title, metaDescription: description } = pick(T, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path}`,
      languages: { en: "/proof", fr: "/fr/proof", "x-default": "/proof" },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function ProofPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(T, locale);

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="proof" />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-32 md:px-14">
          {/* The seal is what both of these pages are about, so it anchors the
            * empty half instead of decorating it. Behind the text on narrow
            * screens, beside it once there is room. */}
          <div className="pointer-events-none absolute right-0 top-24 hidden opacity-40 lg:right-14 lg:block xl:opacity-55">
            <ProofSeal size={300} locale={locale} />
          </div>
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
            {t.lead}
          </p>
        </section>
        <ProofExplorer locale={locale} />
        <TestingVsProving locale={locale} />
        <Credibility locale={locale} />
      </main>
    </div>
  );
}
