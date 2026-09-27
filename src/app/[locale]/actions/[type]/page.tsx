import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { HeroPhoto } from "@/components/landing/hero-photo";
import { type L, pick, NBSP } from "@/components/landing/i18n";
import {
  ACTION_COPY,
  ACTION_IDS,
  isActionId,
  type ActionId,
  type EvidenceLevel,
} from "@/components/landing/action-types";

/*
 * /actions/<type> — one page per action type the product is sold by.
 *
 * The content lives in action-types.ts, next to the evidence level of each
 * type. The page renders that level as it is: a type with nothing public says
 * so in the same visual weight as a type with a sealed pack.
 */

export function generateStaticParams() {
  return ACTION_IDS.map((type) => ({ type }));
}

const T: L<{
  eyebrow: string;
  initiatorsLabel: string;
  rulesTitle: string;
  rulesNote: string;
  breaksTitle: string;
  gateTitle: string;
  gate: string[];
  evidenceTitle: string;
  level: Record<EvidenceLevel, string>;
  openEvidence: string;
  openLab: string;
  others: string;
  ctaPilot: string;
}> = {
  en: {
    eyebrow: "ACTION TYPE",
    initiatorsLabel: "Who runs it today",
    rulesTitle: "The rules that usually govern it",
    rulesNote: "Typical rule shapes, not a claim about any one organisation. A pilot starts from yours.",
    breaksTitle: "Where rules like these break",
    gateTitle: "What the gate does",
    gate: [
      "Checks each request against the proven policy before it executes. What fails never reaches the system.",
      "Refuses when a window or population the rule depends on is missing or does not reconcile, instead of guessing.",
      "Seals every decision, allow or block, so it can be re-checked without us.",
    ],
    evidenceTitle: "What you can check today",
    level: { public: "PUBLIC", onRequest: "ON REQUEST", none: "NOT YET" },
    openEvidence: "OPEN THE EVIDENCE PACK",
    openLab: "ATTACK THE POLICY",
    others: "OTHER ACTION TYPES",
    ctaPilot: "START A PILOT",
  },
  fr: {
    eyebrow: "TYPE D’ACTION",
    initiatorsLabel: "Qui l’exécute aujourd’hui",
    rulesTitle: "Les règles qui l’encadrent d’habitude",
    rulesNote: "Des formes de règles typiques, pas une affirmation sur une organisation en particulier. Un pilote part des vôtres.",
    breaksTitle: "Où ce genre de règles casse",
    gateTitle: "Ce que fait la barrière",
    gate: [
      "Vérifie chaque demande contre la politique prouvée avant son exécution. Ce qui échoue n’atteint jamais le système.",
      "Refuse quand une fenêtre ou une population dont dépend la règle manque ou ne concorde pas, au lieu de deviner.",
      "Scelle chaque décision, autorisée ou bloquée, pour qu’elle soit revérifiable sans nous.",
    ],
    evidenceTitle: "Ce que vous pouvez vérifier aujourd’hui",
    level: { public: "PUBLIC", onRequest: "SUR DEMANDE", none: "PAS ENCORE" },
    openEvidence: "OUVRIR LE DOSSIER DE PREUVE",
    openLab: "ATTAQUER LA POLITIQUE",
    others: "AUTRES TYPES D’ACTION",
    ctaPilot: "DÉMARRER UN PILOTE",
  },
};

const LEVEL_COLOR: Record<EvidenceLevel, string> = {
  public: "var(--seal)",
  onRequest: "#e5e5e5",
  none: "#a3a3a3",
};

type PageProps = {
  params: Promise<{ locale: string; type: string }>;
};

function path(locale: Locale, type: ActionId): string {
  return `${locale === "en" ? "" : `/${locale}`}/actions/${type}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, type } = await params;
  if (!isLocale(locale) || !isActionId(type)) return {};
  const a = pick(ACTION_COPY, locale)[type];
  const title = `${a.h1} — Ironproof`;
  const description = a.lead;
  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path(locale, type)}`,
      languages: { en: path("en", type), fr: path("fr", type), "x-default": path("en", type) },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path(locale, type)}` },
  };
}

export default async function ActionPage({ params }: PageProps) {
  const { locale, type } = await params;
  if (!isLocale(locale) || !isActionId(type)) notFound();
  const t = pick(T, locale);
  const all = pick(ACTION_COPY, locale);
  const a = all[type];
  const r = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page={`act-${type}`} />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-32 md:px-14">
          <HeroPhoto src="/media/gate-chip.jpg" position="50% 50%" />
          <p className="seal-label track-mid mb-4 text-xs">
            {t.eyebrow} · {a.tab}
          </p>
          <h1 className="metal-shine max-w-4xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {a.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{a.lead}</p>
          <p className="mt-6 max-w-2xl text-sm font-light text-neutral-500">
            <span className="text-neutral-300">
              {t.initiatorsLabel}
              {locale === "fr" ? NBSP : ""}:
            </span> {a.initiators}
          </p>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="grid gap-14 lg:grid-cols-2">
            <div className="fade-up">
              <h2 className="metal-text font-serif text-3xl md:text-4xl">{t.rulesTitle}</h2>
              <ul className="mt-8 space-y-4">
                {a.rules.map((rule) => (
                  <li key={rule} className="flex items-baseline gap-4 text-base font-light text-neutral-300">
                    <span className="h-px w-6 shrink-0 translate-y-[-0.3em] bg-white/30" aria-hidden="true" />
                    {rule}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-light text-neutral-500">{t.rulesNote}</p>
            </div>
            <div className="fade-up">
              <h2 className="metal-text font-serif text-3xl md:text-4xl">{t.breaksTitle}</h2>
              <ol className="mt-8 space-y-4">
                {a.breaks.map((b) => (
                  <li key={b.head} className="chip-metal p-5">
                    <p className="font-serif text-xl text-neutral-100">{b.head}</p>
                    <p className="mt-2 text-sm font-light text-neutral-400">{b.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <h2 className="metal-text font-serif text-3xl md:text-4xl">{t.gateTitle}</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {t.gate.map((g, i) => (
              <li key={g} className="fade-up border-t border-white/15 pt-5">
                <span className="font-serif text-4xl text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-sm font-light leading-relaxed text-neutral-300">{g}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="chip-metal p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="font-serif text-2xl text-neutral-100 md:text-3xl">{t.evidenceTitle}</h2>
              <span
                className="track-mid rounded-[4px] border px-2.5 py-1 text-xs"
                style={{ color: LEVEL_COLOR[a.evidence], borderColor: "rgba(255,255,255,0.22)" }}
              >
                {t.level[a.evidence]}
              </span>
            </div>
            <p className="mt-5 max-w-3xl text-base font-light text-neutral-300">{a.evidenceBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {a.evidence === "public" ? (
                <>
                  <a href={`${r}/evidence`} className="chip-metal track-mid px-6 py-3 text-xs text-neutral-200 transition hover:text-white">
                    {t.openEvidence}
                  </a>
                  <a href={`${r}/lab`} className="chip-metal track-mid px-6 py-3 text-xs text-neutral-200 transition hover:text-white">
                    {t.openLab}
                  </a>
                </>
              ) : null}
              <a
                href={`${r}/pilot`}
                className="track-mid rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-7 py-3 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
              >
                {t.ctaPilot}
              </a>
            </div>
          </div>
        </section>

        <nav className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-16 md:px-14" aria-label={t.others}>
          <p className="seal-label track-mid mb-6 text-xs">{t.others}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {ACTION_IDS.filter((id) => id !== type).map((id) => (
              <li key={id}>
                <a href={path(locale, id)} className="chip-metal block p-5 transition hover:border-white/30">
                  <span className="track-mid text-xs text-neutral-400">{all[id].tab}</span>
                  <span className="mt-2 block font-serif text-lg leading-snug text-neutral-100">{all[id].h1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
