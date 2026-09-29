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

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
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
      stepsEyebrow: "HOW IT RUNS",
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
          <a href={`${r}/evidence`} className={link}>evidence pack</a>.
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
      stepsEyebrow: "COMMENT ÇA SE DÉROULE",
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
          <a href={`${r}/evidence`} className={link}>dossier de preuve</a>.
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
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-32 md:px-14">
          <HeroPhoto src="/media/critical-switches.jpg" position="50% 55%" />
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-4xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
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
