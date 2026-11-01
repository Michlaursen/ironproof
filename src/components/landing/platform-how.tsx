import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { FlowDiagram, type FlowCopy, type FlowRail } from "./flow-diagram";

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
  flow: FlowCopy;
  /** The engineering system around the method (Dom, 2026-10-19: « ironproof cognitive operating system + axiomes + memory »).
   *  Each module runs today in our own repository; none is shipped to the client, hence the label. */
  os: FlowRail;
};

/* The method diagram, in English on every page too (Dom, 2026-10-19: « tout en anglais, zero french »). */
const FLOW_EN: FlowCopy = {
      caption: "The path of one case: two independent checks, one verdict, a sealed record. “Holds” applies to policies and critical actions; for rewritten code it is suspended.",
      lead: [
        ["YOUR CASE", "policy, fix, program"],
        ["MODEL", "precise logic"],
      ],
      // The engines by name (Dom, 2026-10-19: « on parle pas des outils? »), the same set as the architecture plate.
      top: ["SOLVER", "every case the model allows"],
      bottom: ["SECOND CHECK", "independent of the first"],
      topInset: [["Z3", "SMT solver"], ["BITWUZLA", "bit-precise"], ["SPACER", "loop invariants"], ["CBMC", "C code, bounded"]],
      bottomInset: [["cvc5", "second solver"], ["IBM COBOL", "real runs"], ["LEAN 4", "gate logic"]],
      verdict: ["VERDICT", "one of three, always"],
      seal: ["SEALED", "Ed25519 + ML-DSA-65"],
      // From the architecture plate (Dom, 2026-10-19: « oui add »).
      propose: ["AI PROPOSES", "never decides"],
      recheck: ["RE-CHECK", "fresh solver"],
      outcomes: [
        ["HOLDS", "proven in scope"],
        ["BREAKS", "the exact case"],
        ["NOT DECIDED", "never a pass"],
      ],
      verify: ["VERIFY", "your auditor, offline"],
      scope: "STATED SCOPE",
    };

/* The cognitive operating system, in English on every page (Dom, 2026-10-19: « tout en anglais, zero french »). */
const OS_EN: FlowRail = {
      k: "Ironproof cognitive operating system",
      t: "Governs the engineering work behind every check",
      tagline: "MEMORY · CONTEXT · REASONING · PLANNING",
      foundation: {
        label: "FOUNDATION",
        items: [
          ["AXIOMS", "proven, conjecture or open"],
          ["THREE LAWS", "the human decides, truth first"],
          ["ACTION KERNEL", "a single-use key per action"],
          ["SIGNED LEDGER", "SHA3 chain, Ed25519 events"],
        ],
      },
      memory: {
        label: "MEMORY",
        items: [
          ["RECALL", "the right memory on every request"],
          ["PERSISTENT MEMORY", "each decision and lesson, versioned"],
          ["KNOWLEDGE GRAPH", "rebuilt from the signed ledger"],
          ["PROMISES", "every next action tracked, kept or open"],
        ],
      },
      learning: {
        label: "LEARNING",
        items: [
          ["OBSTACLE LOG", "each wall noted with its way around"],
          ["LEARNED RULES", "an error seen 3 times in 14 days"],
          ["RULE EFFICACY", "weak rules flagged for rewrite"],
          ["WAGERS", "bets fixed before the result"],
          ["CORRECTION RATE", "founder corrections, measured weekly"],
        ],
      },
      control: {
        label: "CONTROL",
        items: [
          ["ORCHESTRATOR", "plans, picks the tools, runs them"],
          ["CLAIM CHECK", "no claim without its command and output"],
          ["INDEPENDENT REVIEWER", "objects before any risky action"],
          ["COMMIT CHAIN", "types, secrets, named files only"],
          ["CHECK HEALTH", "each check seen refusing"],
        ],
      },
      arrows: {
        constrains: "constrains every step",
        out: "every result",
        refusal: "each refusal",
        rule: "a new rule",
        recall: "recall",
        loop: "EVERY REFUSAL BECOMES A RULE · EVERY RULE MEETS THE NEXT CASE",
      },
    };

const COPY: L<HowCopy> = {
  en: {
    eyebrow: "HOW OUR PLATFORM WORKS",
    title: "From your case to evidence you can re-check.",
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
    os: OS_EN,
    flow: FLOW_EN,
  },
  fr: {
    eyebrow: "COMMENT FONCTIONNE NOTRE PLATEFORME",
    title: "De votre cas à une preuve que vous pouvez revérifier.",
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
    os: OS_EN,
    flow: FLOW_EN,
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
        <FlowDiagram f={t.flow} rail={t.os} />
      </div>
    </section>
  );
}
