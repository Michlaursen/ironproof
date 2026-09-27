import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { ProofSeal } from "@/components/landing/proof-seal";
import { GateLab } from "@/components/landing/gate-lab";
import { type L, pick } from "@/components/landing/i18n";
import { loadEvidencePack } from "@/lib/evidence";

/*
 * /lab — the sealed golden-path policy, handed to the visitor to attack.
 *
 * The policy and the two starting actions are read from the evidence pack at
 * build time (loadEvidencePack), which also refuses to build unless the site's
 * evaluator re-derives every sealed verdict. So the gate on this page is the
 * rule that was sealed, not a copy of it.
 */

const T: L<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  how: string;
  honestTitle: string;
  honest: string[];
  ctaPilot: string;
  ctaEvidence: string;
}> = {
  en: {
    metaTitle: "Try to get past the gate — Ironproof",
    metaDescription:
      "Attack a real sealed payment policy in your browser: push the amount, split the payment, hide the history, forge the record. Some attacks get through, and the page says exactly why.",
    eyebrow: "THE LAB",
    h1: "Try to get past the gate.",
    lead: "The policy below is the sealed one from the evidence pack, and every verdict on this page is computed in your browser by running it. Four attacks. Some get through, and the page says exactly why.",
    how: "Nothing is sent anywhere. Change a control and the gate decides again, in this tab.",
    honestTitle: "HOW THIS PAGE STAYS HONEST",
    honest: [
      "The site refuses to build unless its evaluator reaches all six verdicts sealed in the evidence pack.",
      "Before release, the same evaluator is run side by side with the engine’s own second implementation on every action this page can build.",
      "A lab where every attack fails is a demo. Where an attack gets through, the limit it hits is the one written in the pack.",
    ],
    ctaPilot: "START A PILOT",
    ctaEvidence: "SEE THE EVIDENCE PACK",
  },
  fr: {
    metaTitle: "Essayez de contourner la barrière — Ironproof",
    metaDescription:
      "Attaquez une vraie politique de paiement scellée dans votre navigateur : montez le montant, fractionnez le paiement, cachez l’historique, falsifiez le dossier. Certaines attaques passent, et la page dit exactement pourquoi.",
    eyebrow: "LE LABO",
    h1: "Essayez de contourner la barrière.",
    lead: "La politique ci-dessous est celle, scellée, du dossier de preuve, et chaque verdict de cette page est calculé dans votre navigateur en l’exécutant. Quatre attaques. Certaines passent, et la page dit exactement pourquoi.",
    how: "Rien n’est envoyé nulle part. Changez un réglage et la barrière décide à nouveau, dans cet onglet.",
    honestTitle: "COMMENT CETTE PAGE RESTE HONNÊTE",
    honest: [
      "Le site refuse de se construire si son évaluateur n’atteint pas les six verdicts scellés dans le dossier de preuve.",
      "Avant publication, le même évaluateur est exécuté côte à côte avec la seconde implémentation du moteur, sur chaque action que cette page peut construire.",
      "Un labo où toutes les attaques échouent est une démo. Quand une attaque passe, la limite qu’elle touche est celle écrite dans le dossier.",
    ],
    ctaPilot: "DÉMARRER UN PILOTE",
    ctaEvidence: "VOIR LE DOSSIER DE PREUVE",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = locale === "en" ? "/lab" : `/${locale}/lab`;
  const { metaTitle: title, metaDescription: description } = pick(T, locale);
  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path}`,
      languages: { en: "/lab", fr: "/fr/lab", "x-default": "/lab" },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function LabPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(T, locale);
  const pack = loadEvidencePack();
  const r = locale === "en" ? "" : `/${locale}`;
  const payment = pack.actions["pay-ok"];
  const window = pack.actions["ben-4th"];
  if (payment === undefined || window === undefined) {
    throw new Error("lab: the evidence pack no longer carries pay-ok and ben-4th");
  }

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="lab" />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-32 md:px-14">
          <div className="pointer-events-none absolute right-0 top-24 hidden opacity-40 lg:right-14 lg:block xl:opacity-55">
            <ProofSeal size={300} locale={locale} />
          </div>
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-4xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
          <p className="mt-4 max-w-2xl text-sm font-light text-neutral-500">{t.how}</p>
        </section>

        <GateLab
          policy={pack.policy}
          payment={payment}
          window={window}
          evidenceHref={`${r}/evidence#check`}
          locale={locale}
        />

        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-20 md:px-14">
          <p className="seal-label track-mid mb-6 text-xs">{t.honestTitle}</p>
          <ol className="grid gap-6 md:grid-cols-3">
            {t.honest.map((line, i) => (
              <li key={line} className="flex gap-4">
                <span className="font-serif text-2xl text-neutral-600">{i + 1}</span>
                <p className="text-sm font-light text-neutral-300">{line}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={`${r}/pilot`}
              className="track-mid rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-7 py-3 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
            >
              {t.ctaPilot}
            </a>
            <a href={`${r}/evidence`} className="chip-metal track-mid px-7 py-3 text-xs text-neutral-200 transition hover:text-white">
              {t.ctaEvidence}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
