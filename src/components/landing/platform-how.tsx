import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { CognitiveOsFigure } from "./cognitive-os-figure";
import { TheoremScene } from "./theorem-scene";

/*
 * How the platform works, on the home page right under "Why Ironproof" (Dom,
 * 2026-10-17, after Code Metal's home: why, use cases, then "How Our
 * Platform Works" in four steps). One path for every application: a policy,
 * a C fix, a COBOL program.
 *
 * Every line restates what is already published: guarantees written before
 * the solver runs, two independent solvers for policies, decoy fixes for C,
 * IBM's compiler for COBOL, the dual seal. No figure here.
 */

type HowCopy = {
  eyebrow: string;
  title: string;
  steps: readonly { title: string; body: string }[];
};

const COPY: L<HowCopy> = {
  en: {
    eyebrow: "HOW OUR PLATFORM WORKS",
    title: "From your code to code that carries its proof.",
    steps: [
      {
        title: "Scope",
        body: "Bring one case: a translated program, the policy behind an action, a security fix. Before anything runs, we write down exactly what will be checked.",
      },
      {
        title: "Model",
        body: "We turn it into precise logic a solver can read. Whatever we cannot model is listed as not covered, never skipped.",
      },
      {
        title: "Compare and cross-check",
        body: "A solver checks every case the model allows. A second, independent check confronts it: IBM’s compiler for COBOL, a second solver for policies, decoy fixes for C.",
      },
      {
        title: "Seal and hand over",
        body: "The proof, or the exact case that differs or breaks the rule, sealed with a classical and a post-quantum signature. Built so your auditor can re-run it without us.",
      },
    ],
  },
  fr: {
    eyebrow: "COMMENT FONCTIONNE NOTRE PLATEFORME",
    title: "De votre code à du code qui porte sa preuve.",
    steps: [
      {
        title: "Cadrer",
        body: "Apportez un cas : un programme traduit, la politique derrière une action, un correctif de sécurité. Avant que quoi que ce soit s’exécute, nous écrivons exactement ce qui sera vérifié.",
      },
      {
        title: "Modéliser",
        body: "Nous le traduisons en logique précise, lisible par un solveur. Ce que nous ne pouvons pas modéliser est déclaré non couvert, jamais escamoté.",
      },
      {
        title: "Compare and cross-check",
        body: "Un solveur vérifie tous les cas que le modèle permet. Une seconde vérification, indépendante, le confronte : le compilateur d’IBM pour le COBOL, un second solveur pour les politiques, des correctifs leurres pour le C.",
      },
      {
        title: "Sceller et remettre",
        body: "La preuve, ou le cas précis qui diffère ou qui brise la règle, scellée avec une signature classique et une signature post-quantique. C’est fait pour que votre auditeur la refasse sans nous.",
      },
    ],
  },
};

export function PlatformHow({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);

  return (
    <section id="how-platform" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up max-w-4xl">
          <p className="seal-label track-mid mb-5 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{t.title}</h2>
        </div>
        <ol className="fade-up mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s.title} className="card-premium p-6">
              <span className="num-badge font-serif text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl text-neutral-100">{s.title}</h3>
              <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{s.body}</p>
            </li>
          ))}
        </ol>
        {/* The method diagram left the home (Dom, 2026-11-07: « l'architecture… c'est ça qu'on enlève »);
          * it stays on /proof-intelligence (EngineeringSystem) and /modernization. */}
        <TheoremScene />
      </div>
    </section>
  );
}

/* The engineering system around the method, moved from the home to
 * /proof-intelligence (Dom, 2026-11-01): it reads as our tooling, not as what a
 * bank buys. Since 2026-11-11 it shows the whole architecture with its organs
 * (cognitive-os-figure.tsx). */
export function EngineeringSystem({ locale = defaultLocale }: { locale?: Locale }) {
  return (
    <section id="engineering-system" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <CognitiveOsFigure locale={locale} />
      </div>
    </section>
  );
}
