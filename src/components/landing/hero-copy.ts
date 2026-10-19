import type { L } from "./i18n";

/*
 * The hero's three lines, in one place. The landing, the Open Graph card
 * (what LinkedIn shows when the link is shared) and the JSON-LD slogan all
 * read this object. Before, the card and the slogan read an older headline
 * from src/content and kept selling "what an AI agent cannot do" after the
 * page had moved to any action, any initiator.
 *
 * Repositioned 2026-10-13 (Dom): one technology, three applications (AI
 * agents and critical actions, C software security, legacy modernization).
 * "If it isn't authorized, it never executes" now opens the first of the
 * three pillars instead of the page (platform-copy.ts).
 *
 * Repositioned 2026-10-19 (Dom, "PARFAIT LETS GO"): the check of what a
 * machine rewrote leads; the gate in front of critical actions comes second,
 * in the lines under the title (landing.tsx, hero.boundary).
 */
export type HeroCopy = {
  /** The category, set on its own line so it hits (Dom, 2026-10-16). */
  eyebrow: string;
  /** Where it applies, on the line under the category. */
  eyebrowSub: string;
  /** Two clauses: the condition (plain) and the consequence (gold italic). */
  headline: string;
  headlineEnd: string;
  /** The value line right under the title (Dom, 2026-10-15): what every result carries. */
  value: string;
};

export const HERO_COPY: L<HeroCopy> = {
  en: {
    eyebrow: "PROOF INTELLIGENCE",
    // Dom, 2026-10-19: the company line under the category, kept short (« le tiers indépendant qui prouve »).
    eyebrowSub: "THE INDEPENDENT THIRD PARTY THAT PROVES",
    headline: "Your code was rewritten.",
    headlineEnd: "Does it still do the same thing?",
    value: "MATHEMATICALLY PROVEN · POST-QUANTUM SEALED · INDEPENDENTLY VERIFIABLE",
  },
  fr: {
    eyebrow: "PROOF INTELLIGENCE",
    eyebrowSub: "LE TIERS INDÉPENDANT QUI PROUVE",
    headline: "Votre code a été réécrit.",
    headlineEnd: "Fait-il toujours la même chose ?",
    value: "PROUVÉ MATHÉMATIQUEMENT · SCELLÉ POST-QUANTIQUE · VÉRIFIABLE DE FAÇON INDÉPENDANTE",
  },
};

/*
 * What the hero brain says (Dom, 2026-10-15): the white half proposes, the iron
 * half decides, and every result leaves a dossier anyone can re-check. The
 * dossier card is an example and says so; the SMT lines are the real shape of
 * a proof: assert the negation, the solver answers unsat, the property holds.
 */
export type HeroEngineCopy = {
  neural: string;
  neuralLine: string;
  symbolic: string;
  symbolicLine: string;
  steps: readonly [string, string, string, string];
  dossierTag: string;
  dossierVerdict: string;
  dossierScope: string;
  dossierSeal: string;
  dossierCheck: string;
  dossierLink: string;
  // Phone only: the three roles drawn on the head, so the method reads at a
  // glance on a small screen (Dom, 2026-10-15).
  map: { neural: string; neuralRole: string; symbolic: string; symbolicRole: string; proven: string; provenRole: string };
};

export const HERO_ENGINE_COPY: L<HeroEngineCopy> = {
  en: {
    neural: "NEURAL · THE LANGUAGE MODEL",
    // Verbatim from the site (platform-copy.ts, "WHAT YOU RECEIVE").
    neuralLine: "AI reads the code or the policy and proposes what to check. It proves nothing on its own.",
    symbolic: "SYMBOLIC · THE SOLVER",
    // Bounded on purpose (Dom, 2026-10-15): within defined models, never "every case".
    symbolicLine: "Mathematically verifies properties within defined models and assumptions.",
    // Three verdicts, never two (Proven / Refuted / Not demonstrated).
    steps: ["PROVE", "ENFORCE", "SEAL", "VERIFY"],
    dossierTag: "EXAMPLE DOSSIER",
    dossierVerdict: "PROVEN",
    dossierScope: "within the stated model and assumptions",
    dossierSeal: "SEALED · Ed25519 + ML-DSA-65",
    dossierCheck: "re-checkable without us",
    dossierLink: "Verify a real sealed dossier",
    map: {
      neural: "NEURAL",
      neuralRole: "proposes what to check",
      symbolic: "SYMBOLIC",
      symbolicRole: "proves it, within the model",
      proven: "PROVEN",
      provenRole: "sealed, re-checkable without us",
    },
  },
  fr: {
    neural: "NEURONAL · LE MODÈLE DE LANGAGE",
    neuralLine: "L’IA lit le code ou la politique et propose quoi vérifier. Elle ne prouve rien seule.",
    symbolic: "SYMBOLIQUE · LE SOLVEUR",
    symbolicLine: "Vérifie mathématiquement des propriétés, dans des modèles et des hypothèses définis.",
    steps: ["PROUVER", "APPLIQUER", "SCELLER", "VÉRIFIER"],
    dossierTag: "DOSSIER D’EXEMPLE",
    dossierVerdict: "PROUVÉ",
    dossierScope: "dans le modèle et les hypothèses déclarés",
    dossierSeal: "SCELLÉ · Ed25519 + ML-DSA-65",
    dossierCheck: "revérifiable sans nous",
    dossierLink: "Vérifier un vrai dossier scellé",
    map: {
      neural: "NEURONAL",
      neuralRole: "propose quoi vérifier",
      symbolic: "SYMBOLIQUE",
      symbolicRole: "le prouve, dans le modèle",
      proven: "PROUVÉ",
      provenRole: "scellé, revérifiable sans nous",
    },
  },
};
