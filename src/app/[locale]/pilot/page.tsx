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

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";

/*
 * /pilot — the one place a buyer lands from every "Start a pilot" button.
 *
 * The steps and the fit list are PILOT_COPY, shared with the home page's
 * #pilot section. What is new here is what a pilot takes, what it leaves
 * behind, and what it will not tell you. No price and no scarcity: both are
 * Dom's call and neither is decided (2026-09-26).
 *
 * 2026-10-19 (Dom, "les autres pages passe les au peigne fin"): code
 * verification is the entry pilot; the authorization pilot comes second and
 * keeps its steps, bring and keep lists, which are labelled as its own. The
 * old COBOL card said "the generated Python": we no longer translate.
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
  bookOr: string;
  bookLink: string;
};

const link = "underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60";

function copy(r: string): L<Copy> {
  return {
    en: {
      metaTitle: "Start a pilot — Ironproof",
      metaDescription:
        "A fixed-scope pilot on one translated module, or on one critical action. You keep the answers, every case to replay, and the sealed record.",
      eyebrow: "PILOT",
      h1: "Bring one translated module. We tell you if it still does the same thing, or show you exactly where it differs.",
      lead: "Your integrator or your AI tool translated a program. You send us the original and the translation. Each module comes back with one of three answers, and every difference replays on your own compiler. Critical actions have their own pilot, just below.",
      offersEyebrow: "THREE PILOTS, ONE METHOD",
      offersTitle: "Each pilot ends with a verification dossier your team can re-check.",
      deliverLabel: "YOU RECEIVE",
      successLabel: "SUCCESS MEANS",
      limitsLabel: "LIMITS, IN WRITING",
      offers: [
        {
          tag: "ENTRY PILOT",
          name: "Code verification",
          question: "Does the translation you received still do what the original did?",
          deliver: [
            "Per module, one of three answers: same behavior within the stated scope, the exact input where it differs, or not decided with the reason.",
            "Every difference, with what you need to replay it on your compiler and on the new code.",
            "The scope, and the compiler and CICS assumptions each answer depends on.",
          ],
          success: "Every module has one of the three answers, every difference replays on your side, and what was not covered is written down.",
          limits: "Answers hold against our model of the original program, not every compiler or CICS configuration. No third-party replay yet.",
        },
        {
          tag: "PILOT · CRITICAL ACTIONS",
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
          tag: "RESEARCH PILOT",
          name: "Fix verification (C)",
          question: "Does each fix remove the failure its vulnerability causes?",
          deliver: [
            "Per fix: the test harness, the bounds, and one result (closed, test fooled, or not analyzed) with the reason.",
            "The decoy fixes the test had to reject, and the commands to re-run everything.",
          ],
          success: "Every fix has one of the three results, and nothing is reported as closed unless the test also rejected the decoys.",
          limits: "A bounded check of the failure our test exhibits, not of every way an attacker reaches the code. Our C verdict judge is being rebuilt; results are reported as bounded checks, not complete proofs.",
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
      notTitle: "Four things, said before you ask.",
      not: [
        {
          head: "Whether the old program was right.",
          body: "We check that the new code does what the old one did, quirks included. Whether the old behavior was the right one stays yours to judge.",
        },
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
      formTitle: "Tell us which module, or which action.",
      formLead: "Leave a work email. We reply to set up a first call about what you need checked.",
      bookOr: "Or pick a time directly:",
      bookLink: "BOOK A 30-MINUTE CALL",
    },
    fr: {
      metaTitle: "Démarrer un pilote — Ironproof",
      metaDescription:
        "Un pilote à périmètre fixe sur un module traduit, ou sur une action critique. Vous gardez les réponses, chaque cas à rejouer et la trace scellée.",
      eyebrow: "PILOTE",
      h1: "Apportez un module traduit. On vous dit s’il fait encore la même chose, ou on vous montre exactement où il diffère.",
      lead: "Votre intégrateur ou votre outil d’IA a traduit un programme. Vous nous envoyez l’original et la traduction. Chaque module revient avec l’une des trois réponses, et chaque écart se rejoue sur votre propre compilateur. Les actions critiques ont leur propre pilote, juste en dessous.",
      offersEyebrow: "TROIS PILOTES, UNE MÉTHODE",
      offersTitle: "Chaque pilote se termine par un dossier de vérification que votre équipe peut revérifier.",
      deliverLabel: "VOUS RECEVEZ",
      successLabel: "RÉUSSI SI",
      limitsLabel: "LES LIMITES, PAR ÉCRIT",
      offers: [
        {
          tag: "PILOTE D’ENTRÉE",
          name: "Vérification de code",
          question: "La traduction que vous avez reçue fait-elle encore ce que faisait l’original ?",
          deliver: [
            "Par module, l’une des trois réponses : même comportement dans le périmètre annoncé, l’entrée précise où il diffère, ou impossible à trancher, avec la raison.",
            "Chaque écart, avec de quoi le rejouer sur votre compilateur et sur le nouveau code.",
            "Le périmètre, et les hypothèses sur le compilateur et CICS dont dépend chaque réponse.",
          ],
          success: "Chaque module a l’une des trois réponses, chaque écart se rejoue chez vous, et ce qui n’a pas été couvert est écrit.",
          limits: "Les réponses tiennent contre notre modèle du programme d’origine, pas contre tout compilateur ou toute configuration CICS. Pas encore de rejeu par un tiers.",
        },
        {
          tag: "PILOTE · ACTIONS CRITIQUES",
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
          tag: "PILOTE DE RECHERCHE",
          name: "Vérification de correctifs (C)",
          question: "Chaque correctif supprime-t-il l’échec que cause sa faille ?",
          deliver: [
            "Par correctif : le harnais de test, les bornes, et un résultat (fermé, test trompé ou non analysé) avec la raison.",
            "Les faux correctifs que le test devait rejeter, et les commandes pour tout rejouer.",
          ],
          success: "Chaque correctif a l’un des trois résultats, et rien n’est déclaré fermé si le test n’a pas aussi rejeté les leurres.",
          limits: "Une vérification bornée de l’échec que notre test met en évidence, pas de tous les chemins d’un attaquant. Notre juge des verdicts C est en reconstruction ; les résultats sont présentés comme des vérifications bornées, pas comme des preuves complètes.",
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
      notTitle: "Quatre choses, dites avant que vous les demandiez.",
      not: [
        {
          head: "Si l’ancien programme avait raison.",
          body: "On vérifie que le nouveau code fait ce que faisait l’ancien, bizarreries comprises. Savoir si l’ancien comportement était le bon, ça reste à vous de le juger.",
        },
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
      formTitle: "Dites-nous quel module, ou quelle action.",
      formLead: "Laissez un courriel professionnel. On vous répond pour fixer un premier appel sur ce que vous voulez faire vérifier.",
      bookOr: "Ou choisissez un moment directement\u00a0:",
      bookLink: "RÉSERVER UN APPEL",
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
              {/* Booking (Dom, 2026-10-16): shown only once a booking page exists,
                * set in NEXT_PUBLIC_BOOKING_URL. No embed, so no third-party script
                * or cookie on our page: the link opens the booking page itself. */}
              {BOOKING_URL ? (
                <p className="mt-6 text-sm font-light text-neutral-400">
                  {t.bookOr}
                  <br />
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="track-mid mt-2 inline-block border-b border-seal/60 pb-0.5 text-xs text-neutral-200 transition hover:text-white"
                  >
                    {t.bookLink} <span aria-hidden="true">&#8599;</span>
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
