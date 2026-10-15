import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { HeroPhoto } from "@/components/landing/hero-photo";
import { CtaForm } from "@/components/landing/cta-form";
import { PILOT_COPY } from "@/components/landing/pilot-copy";
import { type L, pick } from "@/components/landing/i18n";

/*
 * /pilot — the one place a buyer lands from every "Start a pilot" button.
 *
 * The steps and the fit list are PILOT_COPY, shared with the home page's
 * #pilot section. What is new here is what a pilot takes, what it leaves
 * behind, and what it will not tell you. No price and no scarcity: both are
 * Dom's call and neither is decided (2026-09-26).
 */

type Offer = { tag: string; name: string; question: string; deliver: string[]; success: string; limits: string };

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  offersEyebrow: string;
  offersTitle: string;
  offers: Offer[];
  deliverLabel: string;
  successLabel: string;
  limitsLabel: string;
  stepsEyebrow: string;
  bringTitle: string;
  bring: string[];
  keepTitle: string;
  keep: ReactNode[];
  notEyebrow: string;
  notTitle: string;
  not: { head: string; body: string }[];
  formTitle: string;
  formLead: string;
};

const link = "underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60";

function copy(r: string): L<Copy> {
  return {
    en: {
      metaTitle: "Start a pilot — Ironproof",
      metaDescription:
        "A fixed-scope design-partner pilot on one action your automation already performs. You keep the gate, the sealed records, and what the solver found in your rule.",
      eyebrow: "PILOT",
      h1: "Pick one critical action. We prove your rules hold, or show you exactly where they break.",
      lead: "You pick one action your systems already perform, a wire transfer for example. We turn your rules into a check, block anything that breaks them before it runs, and seal every decision. At the end, your risk team re-checks everything themselves, without us.",
      offersEyebrow: "THREE PILOTS, ONE METHOD",
      offersTitle: "Each pilot ends with a verification dossier your team can re-check.",
      deliverLabel: "YOU RECEIVE",
      successLabel: "SUCCESS MEANS",
      limitsLabel: "LIMITS, IN WRITING",
      offers: [
        {
          tag: "ENTRY PILOT",
          name: "Verifiable authorization",
          question: "Does this critical action follow your rules, every time it is requested?",
          deliver: [
            "Your rule written as logic, with the readings we chose.",
            "A result per property: proven, refuted with the exact sequence that breaks it, or not demonstrated with the reason.",
            "The gate in front of the action, and a sealed record of every decision.",
          ],
          success: "Your risk team re-derives the decisions from the sealed records on its own machine, and every gap the solver found is fixed or accepted in writing.",
          limits: "Holds where the action can only run through the gate, within the model and bounds the dossier states.",
        },
        {
          tag: "PILOT",
          name: "Fix verification (C)",
          question: "Does each fix remove the failure its vulnerability causes?",
          deliver: [
            "Per fix: the test harness, the bounds, and one result (closed, test fooled, or not analyzed) with the reason.",
            "The decoy fixes the test had to reject, and the commands to re-run everything.",
          ],
          success: "Every fix has one of the three results, and nothing is reported as closed unless the test also rejected the decoys.",
          limits: "A bounded check of the failure our test exhibits, not of every way an attacker reaches the code. Our C verdict judge is being rebuilt; results are reported as bounded checks, not complete proofs.",
        },
        {
          tag: "EARLY ACCESS",
          name: "Equivalence check (COBOL)",
          question: "Does the Python translation compute what the COBOL computes?",
          deliver: [
            "Per program: the generated Python and the equivalence obligations.",
            "One result per part: equivalent under our model, the input where they differ, or not covered with the reason.",
            "The compiler and CICS assumptions the result depends on.",
          ],
          success: "Every part of each program falls in one of the three results, and the not-covered list is written down.",
          limits: "Proofs hold against our model of the COBOL, not every compiler or CICS configuration. No third-party replay yet.",
        },
      ],
      stepsEyebrow: "HOW THE AUTHORIZATION PILOT RUNS",
      bringTitle: "What you bring",
      bring: [
        "The action type, and where it runs today.",
        "The rule as it is written now: limits, approvals, windows, holds.",
        "One person who owns that rule and can say what it was meant to say.",
        "A place in your environment where the gate can sit in front of the action.",
      ],
      keepTitle: "What you keep",
      keep: [
        "The gate, running in front of that action.",
        <>
          A sealed record of every decision, like the{" "}
          <a href={`${r}/evidence`} className={link}>verification dossier</a>.
        </>,
        <>
          What the solver found in your rule, including where it leaks, like the{" "}
          <a href={`${r}/lab`} className={link}>lab</a> shows.
        </>,
        "The readings we chose for your rule, and the limits of what was proven, in writing.",
      ],
      notEyebrow: "WHAT A PILOT WILL NOT TELL YOU",
      notTitle: "Three things, said before you ask.",
      not: [
        {
          head: "Whether your rule is the right rule.",
          body: "It shows exactly what your rule allows, including what nobody meant it to allow. Choosing the rule stays yours.",
        },
        {
          head: "Anything about actions that bypass the gate.",
          body: "The proof holds where the action can only execute through the gate. The certificate states that boundary.",
        },
        {
          head: "Whether what the caller declares is true.",
          body: "A declared window or population is sealed with the verdict, not checked against your systems. A consistent lie is on the record, not prevented.",
        },
      ],
      formTitle: "Tell us which action.",
      formLead: "Leave a work email. We reply to set up a first call about the action and the rule behind it.",
    },
    fr: {
      metaTitle: "Démarrer un pilote — Ironproof",
      metaDescription:
        "Un pilote de partenaire de conception, à périmètre fixe, sur une action que votre automatisation exécute déjà. Vous gardez la barrière, les traces scellées, et ce que le solveur a trouvé dans votre règle.",
      eyebrow: "PILOTE",
      h1: "Choisissez une action critique. On prouve que vos règles tiennent, ou on vous montre exactement où elles cassent.",
      lead: "Vous choisissez une action que vos systèmes font déjà, par exemple un virement. On traduit vos règles en vérification, on bloque avant l’exécution tout ce qui les enfreint, et chaque décision est scellée. À la fin, votre équipe de risque revérifie tout elle-même, sans nous.",
      offersEyebrow: "TROIS PILOTES, UNE MÉTHODE",
      offersTitle: "Chaque pilote se termine par un dossier de vérification que votre équipe peut revérifier.",
      deliverLabel: "VOUS RECEVEZ",
      successLabel: "RÉUSSI SI",
      limitsLabel: "LES LIMITES, PAR ÉCRIT",
      offers: [
        {
          tag: "PILOTE D’ENTRÉE",
          name: "Autorisation vérifiable",
          question: "Cette action critique respecte-t-elle vos règles, chaque fois qu’elle est demandée ?",
          deliver: [
            "Votre règle écrite en logique, avec les lectures que nous avons choisies.",
            "Un résultat par propriété : prouvée, réfutée avec la séquence exacte qui la brise, ou non démontrée avec la raison.",
            "La barrière devant l’action, et une trace scellée de chaque décision.",
          ],
          success: "Votre équipe de risque recalcule les décisions à partir des traces scellées sur sa propre machine, et chaque faille trouvée par le solveur est corrigée ou acceptée par écrit.",
          limits: "Vaut là où l’action ne peut s’exécuter qu’à travers la barrière, dans le modèle et les bornes que le dossier énonce.",
        },
        {
          tag: "PILOTE",
          name: "Vérification de correctifs (C)",
          question: "Chaque correctif supprime-t-il l’échec que cause sa faille ?",
          deliver: [
            "Par correctif : le harnais de test, les bornes, et un résultat (fermé, test trompé ou non analysé) avec la raison.",
            "Les faux correctifs que le test devait rejeter, et les commandes pour tout rejouer.",
          ],
          success: "Chaque correctif a l’un des trois résultats, et rien n’est déclaré fermé si le test n’a pas aussi rejeté les leurres.",
          limits: "Une vérification bornée de l’échec que notre test met en évidence, pas de tous les chemins d’un attaquant. Notre juge des verdicts C est en reconstruction ; les résultats sont présentés comme des vérifications bornées, pas comme des preuves complètes.",
        },
        {
          tag: "ACCÈS ANTICIPÉ",
          name: "Contrôle d’équivalence (COBOL)",
          question: "La traduction Python calcule-t-elle ce que calcule le COBOL ?",
          deliver: [
            "Par programme : le Python généré et les obligations d’équivalence.",
            "Un résultat par partie : équivalente sous notre modèle, l’entrée où elles diffèrent, ou non couverte avec la raison.",
            "Les hypothèses sur le compilateur et CICS dont dépend le résultat.",
          ],
          success: "Chaque partie de chaque programme tombe dans l’un des trois résultats, et la liste du non couvert est écrite.",
          limits: "Les preuves tiennent contre notre modèle du COBOL, pas contre tout compilateur ou toute configuration CICS. Pas encore de rejeu par un tiers.",
        },
      ],
      stepsEyebrow: "COMMENT SE DÉROULE LE PILOTE D’AUTORISATION",
      bringTitle: "Ce que vous apportez",
      bring: [
        "Le type d’action, et où il s’exécute aujourd’hui.",
        "La règle telle qu’elle est écrite : limites, approbations, fenêtres, gels.",
        "Une personne responsable de cette règle, qui peut dire ce qu’elle voulait dire.",
        "Un endroit dans votre environnement où la barrière peut se placer devant l’action.",
      ],
      keepTitle: "Ce que vous gardez",
      keep: [
        "La barrière, devant cette action.",
        <>
          Une trace scellée de chaque décision, comme le{" "}
          <a href={`${r}/evidence`} className={link}>dossier de vérification</a>.
        </>,
        <>
          Ce que le solveur a trouvé dans votre règle, y compris ses fuites, comme le montre le{" "}
          <a href={`${r}/lab`} className={link}>labo</a>.
        </>,
        "Les lectures choisies pour votre règle, et les limites de ce qui a été prouvé, par écrit.",
      ],
      notEyebrow: "CE QU’UN PILOTE NE VOUS DIRA PAS",
      notTitle: "Trois choses, dites avant que vous les demandiez.",
      not: [
        {
          head: "Si votre règle est la bonne.",
          body: "Il montre exactement ce que votre règle permet, y compris ce que personne ne voulait permettre. Le choix de la règle vous appartient.",
        },
        {
          head: "Quoi que ce soit sur les actions qui contournent la barrière.",
          body: "La preuve tient là où l’action ne peut s’exécuter qu’à travers la barrière. Le certificat énonce cette frontière.",
        },
        {
          head: "Si ce que l’appelant déclare est vrai.",
          body: "Une fenêtre ou une population déclarée est scellée avec le verdict, pas vérifiée contre vos systèmes. Un mensonge cohérent est au dossier, pas empêché.",
        },
      ],
      formTitle: "Dites-nous quelle action.",
      formLead: "Laissez un courriel professionnel. Nous répondons pour fixer un premier appel sur l’action et la règle derrière elle.",
    },
  };
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = locale === "en" ? "/pilot" : `/${locale}/pilot`;
  const { metaTitle: title, metaDescription: description } = pick(copy(""), locale);
  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path}`,
      languages: { en: "/pilot", fr: "/fr/pilot", "x-default": "/pilot" },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function PilotPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const r = locale === "en" ? "" : `/${locale}`;
  const t = pick(copy(r), locale);
  const p = pick(PILOT_COPY, locale);

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="pilot" />
      <main className="blueprint">
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-32 md:px-14">
          <HeroPhoto src="/media/critical-switches-white.jpg" position="50% 55%" />
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-4xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
        </section>

        {/* Three pilots, one method (Dom, 2026-10-15): what each delivers, what
          * success means, and its limits, written before anyone signs. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">{t.offersEyebrow}</p>
          <h2 className="metal-text max-w-3xl font-serif text-3xl font-medium leading-tight md:text-5xl">{t.offersTitle}</h2>
          <ol className="fade-up mt-12 grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 lg:grid-cols-3">
            {t.offers.map((o) => (
              <li key={o.name} className="flex flex-col bg-ink px-7 py-9">
                <p className="track-mid text-xs text-seal">{o.tag}</p>
                <h3 className="mt-4 font-serif text-2xl text-neutral-100">{o.name}</h3>
                <p className="mt-3 text-base font-light leading-relaxed text-neutral-300">{o.question}</p>
                <p className="track-mid mt-7 text-xs text-neutral-500">{t.deliverLabel}</p>
                <ul className="mt-3 space-y-2.5">
                  {o.deliver.map((d) => (
                    <li key={d} className="flex items-baseline gap-3 text-sm font-light leading-relaxed text-neutral-400">
                      <span className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-white/30" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <p className="track-mid mt-7 text-xs text-neutral-500">{t.successLabel}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-neutral-300">{o.success}</p>
                <p className="track-mid mt-7 text-xs text-neutral-500">{t.limitsLabel}</p>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-neutral-400">{o.limits}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* The four steps: the same grammar and the same text as the home page. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <p className="seal-label track-mid mb-10 text-xs">{t.stepsEyebrow}</p>
          <ol className="fade-up grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {p.steps.map((st, i) => {
              const last = i === p.steps.length - 1;
              return (
                <li key={st.title} className={`min-w-0 border-t pt-6 ${last ? "border-seal/60" : "border-white/15"}`}>
                  <span className={`font-serif text-6xl leading-none ${last ? "text-seal" : "text-neutral-600"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-5 font-serif text-3xl text-neutral-100">{st.title}</h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-neutral-400">{st.body}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="grid gap-12 lg:grid-cols-2">
            {[
              { title: t.bringTitle, items: t.bring as ReactNode[], gold: false },
              { title: t.keepTitle, items: t.keep, gold: true },
            ].map((col) => (
              <div key={col.title} className="fade-up">
                <h2 className={`font-serif text-3xl md:text-4xl ${col.gold ? "metal-text" : "text-neutral-100"}`}>{col.title}</h2>
                <ul className="mt-8 space-y-5">
                  {col.items.map((it, i) => (
                    <li key={i} className="flex items-baseline gap-4 text-base font-light leading-relaxed text-neutral-300">
                      <span className={`h-px w-6 shrink-0 translate-y-[-0.3em] ${col.gold ? "bg-seal" : "bg-white/30"}`} aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">{t.notEyebrow}</p>
          <h2 className="metal-text max-w-3xl font-serif text-3xl font-medium leading-tight md:text-5xl">{t.notTitle}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {t.not.map((n, i) => (
              <li key={n.head} className="chip-metal fade-up p-6">
                <span className="font-serif text-3xl text-neutral-600">{i + 1}</span>
                <p className="mt-3 font-serif text-xl leading-snug text-neutral-100">{n.head}</p>
                <p className="mt-3 text-sm font-light text-neutral-400">{n.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="request" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_32rem] lg:items-end">
            <div>
              <p className="track-mid mb-6 text-xs text-neutral-500">{p.fitLabel}</p>
              <ul className="space-y-4">
                {p.fit.map((f) => (
                  <li key={f} className="flex items-baseline gap-4 font-serif text-xl leading-snug text-neutral-200 md:text-2xl">
                    <span className="h-px w-6 shrink-0 translate-y-[-0.35em] bg-seal" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full min-w-0">
              <h2 className="metal-text font-serif text-3xl md:text-4xl">{t.formTitle}</h2>
              <p className="mb-6 mt-4 text-base font-light text-neutral-300">{t.formLead}</p>
              <div className="pilot-form">
                <CtaForm locale={locale} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
