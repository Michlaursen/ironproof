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
        body: "A solver checks every case the model allows. A second, independent check confirms it: IBM’s compiler for COBOL, a second solver for policies, decoy fixes for C.",
      },
      {
        title: "Seal and hand over",
        body: "The proof, or the exact case that differs or breaks the rule, sealed with a classical and a post-quantum signature. Your auditor re-runs it without us.",
      },
    ],
    os: {
      k: "Ironproof cognitive operating system",
      t: "Governs the engineering agent that builds every check",
      items: [
        ["AXIOMS", "Truth first: proven, conjecture or open"],
        ["PERSISTENT MEMORY", "Every decision and lesson, versioned"],
        ["LEARNED RULES", "An error seen three times becomes a rule"],
        ["CLAIM CHECK", "No report without its command and output"],
        ["INDEPENDENT REVIEWER", "Objects before any risky action"],
        ["COMMIT CHAIN", "Type check, secret scan, named files only"],
        ["SIGNED LEDGER", "Every push authorized and recorded"],
        ["SESSION CLOSE", "Ten checks before a session ends"],
      ],
    },
    flow: {
      caption: "The path of one case: two independent checks, one verdict, a sealed record.",
      lead: [
        ["YOUR CASE", "policy, fix, program"],
        ["MODEL", "precise logic"],
      ],
      // The engines by name (Dom, 2026-10-19: « on parle pas des outils? »), the same set as the architecture plate.
      top: ["SOLVER", "every case the model allows"],
      bottom: ["SECOND CHECK", "independent of the first"],
      topInset: [["Z3", "SMT solver"], ["SPACER", "loop invariants"], ["CBMC", "C code, bounded"]],
      bottomInset: [["cvc5", "second solver"], ["IBM COBOL", "real runs"], ["LEAN 4", "gate logic"]],
      verdict: ["VERDICT", "holds, or what breaks it"],
      seal: ["SEALED", "re-run without us"],
    },
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
        body: "Un solveur vérifie tous les cas que le modèle permet. Une seconde vérification, indépendante, le confirme : le compilateur d’IBM pour le COBOL, un second solveur pour les politiques, des correctifs leurres pour le C.",
      },
      {
        title: "Sceller et remettre",
        body: "La preuve, ou le cas précis qui diffère ou qui brise la règle, scellée avec une signature classique et une signature post-quantique. Votre auditeur la refait sans nous.",
      },
    ],
    os: {
      k: "Système d’exploitation cognitif d’Ironproof",
      t: "Encadre l’agent d’ingénierie qui bâtit chaque vérification",
      items: [
        ["AXIOMES", "La vérité d’abord : prouvé, conjecture ou ouvert"],
        ["MÉMOIRE PERSISTANTE", "Chaque décision et leçon, versionnée"],
        ["RÈGLES APPRISES", "Une erreur vue trois fois devient une règle"],
        ["CONTRÔLE DES AFFIRMATIONS", "Aucun rapport sans commande ni sortie"],
        ["RELECTEUR INDÉPENDANT", "Objecte avant toute action risquée"],
        ["CHAÎNE DE COMMIT", "Types, secrets, fichiers nommés seulement"],
        ["REGISTRE SIGNÉ", "Chaque envoi autorisé et consigné"],
        ["FERMETURE DE SESSION", "Dix contrôles avant de fermer"],
      ],
    },
    flow: {
      caption: "Le parcours d’un cas : deux vérifications indépendantes, un verdict, un dossier scellé.",
      lead: [
        ["VOTRE CAS", "règle, correctif, code"],
        ["MODÈLE", "logique précise"],
      ],
      top: ["SOLVEUR", "tous les cas du modèle"],
      bottom: ["2E VÉRIFICATION", "indépendante de la 1re"],
      topInset: [["Z3", "solveur SMT"], ["SPACER", "invariants"], ["CBMC", "code C, borné"]],
      bottomInset: [["cvc5", "2e solveur"], ["IBM COBOL", "vraie exécution"], ["LEAN 4", "logique barrière"]],
      verdict: ["VERDICT", "tient, ou ce qui casse"],
      seal: ["SCELLÉ", "revérifiable sans nous"],
    },
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
