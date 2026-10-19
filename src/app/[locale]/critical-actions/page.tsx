import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { CriticalActionsSections } from "@/components/landing/landing";
import { type L, pick } from "@/components/landing/i18n";

/*
 * /critical-actions -- the second product, on its own page (Dom, 2026-10-19:
 * code first on the home page, the gate keeps everything it had). The
 * sections are the home page's former ones, moved as they were
 * (landing.tsx, CriticalActionsSections): the four action types deciding,
 * the sectors and their rules, the dated timeline, and the four steps.
 */

const COPY: L<{ title: string; description: string; eyebrow: string; h1: string; lead: string }> = {
  en: {
    title: "Critical actions — Ironproof",
    description:
      "Every payment, access grant, deletion or deployment checked against your rules before it runs: allowed when it complies, blocked when it breaks them, and every decision sealed so you can check it without trusting us.",
    eyebrow: "CRITICAL ACTIONS",
    h1: "Check every action before it runs.",
    lead: "An AI agent, a script or a person asks to pay, grant access, delete or ship a change. Ironproof checks the request against your rules first: allowed when it complies, blocked when it breaks them. Either way, the decision is sealed.",
  },
  fr: {
    title: "Actions critiques — Ironproof",
    description:
      "Chaque paiement, accès, suppression ou déploiement vérifié selon vos règles avant de partir : autorisé s’il les respecte, bloqué s’il les enfreint, et chaque décision scellée pour que vous puissiez la vérifier sans avoir à nous croire.",
    eyebrow: "ACTIONS CRITIQUES",
    h1: "Chaque action, vérifiée avant de partir.",
    lead: "Un agent IA, un script ou une personne demande de payer, d’ouvrir un accès, d’effacer ou de déployer. Ironproof vérifie d’abord la demande selon vos règles : autorisée si elle les respecte, bloquée si elle les enfreint. Dans les deux cas, la décision est scellée.",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = locale === "en" ? "/critical-actions" : `/${locale}/critical-actions`;
  const { title, description } = pick(COPY, locale);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/critical-actions", fr: "/fr/critical-actions", "x-default": "/critical-actions" },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ironproof.ai${path}`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
    },
    twitter: { title, description },
  };
}

export default async function CriticalActionsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(COPY, locale);

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page="critical-actions" />
      <main className="blueprint flex-1">
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-32 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">{t.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
        </section>
        <CriticalActionsSections locale={locale} />
      </main>
      <FadeUpInit />
    </div>
  );
}
