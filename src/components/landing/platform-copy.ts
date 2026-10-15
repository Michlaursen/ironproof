import type { L } from "./i18n";

/*
 * The landing's opening below the hero: one technology, three applications,
 * then the method (repositioned 2026-10-13 on Dom's text).
 *
 * Every claim was read against the code or a phrase already ratified on the
 * site before it was written here:
 *   - pillar 1 keeps the ratified tagline with BOTH sides (block AND allow,
 *     2026-09-14), any initiator (2026-09-03), and "without having to trust us"
 *     (2026-10-12, provable-ai-copy.tsx). Blocked decisions are sealed too:
 *     ironproof/inquest/governed_executor.py:323 requires the ledger.
 *   - pillar 2's replay line: on 2026-10-12 a context-free agent replayed our
 *     4 Cobalt archives and reached the same 8 verdicts out of 8. Pillar 3
 *     gets no such line until a COBOL proof has been replayed the same way.
 *   - pillar 2 says C, not C/C++: every fix measured so far is C
 *     (cobalt-ai bench/lot20_2026-10-11, 20 fixes drawn at random).
 *   - pillar 3 says "defined equivalence properties" with explicit
 *     assumptions: results are proven under a stated model, never more.
 *   - the three verdicts are Dom's words (2026-10-13); the neuro-symbolic
 *     page says the same three states as holds / breaks / not covered.
 */

export type Pillar = {
  num: string;
  name: string;
  claim: string;
  body: string;
  href?: string;
  cta?: string;
  /** What a reader can re-check today for this application, said plainly, including "not yet". */
  evidence: string;
};

export type Verdict = { word: string; body: string; receive: string };

export type PlatformCopy = {
  eyebrow: string;
  title: string;
  pillars: readonly Pillar[];
  method: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    verdicts: readonly Verdict[];
    /** Transversal to the three pillars (Dom, 2026-10-13): never drop it. */
    independent: { title: string; body: string };
    foot: string;
  };
  research: { eyebrow: string; title: string; lead: string; cta: string };
};

export const PLATFORM_COPY: L<PlatformCopy> = {
  en: {
    eyebrow: "ONE CORE TECHNOLOGY",
    title: "Three applications. One standard of evidence.",
    pillars: [
      {
        num: "01",
        name: "AI agents & critical actions",
        claim: "If it isn’t authorized, it never executes. If it is, it executes — with verifiable evidence.",
        body: "Ironproof checks every critical action against your policy before it runs, whether an AI agent, a script, an API or a person started it. Unauthorized actions are blocked, and every decision is sealed with cryptographic evidence anyone can verify offline, without having to trust us.",
        href: "#problem",
        cta: "HOW THE GATE WORKS",
        evidence: "Today: every decision is sealed and checkable in your browser, with no server and no account.",
      },
      {
        num: "02",
        name: "C software security",
        claim: "Don’t just find vulnerabilities. Prove the fix closes them.",
        body: "Our verification technology analyzes C software to identify security violations, mathematically verify defined properties, and assess whether a fix addresses the underlying vulnerability. Each verdict can be replayed by a third party, without having to trust us.",
        evidence: "Today: a third party with none of our context replayed 4 archives and reached the same 8 verdicts out of 8 (October 12, 2026).",
      },
      {
        num: "03",
        name: "COBOL modernization",
        claim: "Modernize the code. Preserve the behavior.",
        body: "Modernization can introduce subtle changes to critical business logic. Ironproof compares legacy and modernized programs to prove defined equivalence properties or identify behavioral differences, with explicit assumptions and verification boundaries.",
        evidence: "Today: no third-party replay yet. We will publish it when it exists.",
      },
    ],
    method: {
      eyebrow: "WHAT YOU RECEIVE",
      title: "Three verdicts. Each one ships with its evidence.",
      lead: "Never a green checkmark. Every result is one of three, and each comes with what you need to re-check it.",
      body: "AI reads the code or the policy and drafts the obligations. Formal solvers decide. Independent checks — a second solver, deliberate faults, a replay by someone else — test the decision itself.",
      verdicts: [
        { word: "Proven.", body: "The property holds within the stated model and its assumptions.", receive: "You get the obligation and the solver’s evidence, to re-run in your own solver." },
        { word: "Refuted.", body: "A concrete counterexample shows exactly how it breaks.", receive: "You get the counterexample, to replay yourself." },
        { word: "Not demonstrated.", body: "We could not conclude. Said as such, never shown as a pass.", receive: "You get what was attempted and where it stopped." },
      ],
      independent: {
        title: "Two ways to check us, neither needs us.",
        body: "In your browser: the sealed record — hash chain, Ed25519 and post-quantum ML-DSA-65 signatures — checked with no server and no account. On your machine: the proof itself, re-run in your own solver from the obligation we ship. Where an artifact cannot be shared, the result says so.",
      },
      foot: "Others sell trust. We sell the right not to trust us.",
    },
    research: {
      eyebrow: "PUBLISHED RESEARCH",
      title: "Research-driven. Evidence-based.",
      lead: "Our research spans automated formal verification, software security, legacy-system modernization, post-quantum cryptography and quantum software security. Each paper states its method, its results and its limits.",
      cta: "EXPLORE RESEARCH",
    },
  },
  fr: {
    eyebrow: "UNE TECHNOLOGIE CENTRALE",
    title: "Trois applications. Une seule exigence de preuve.",
    pillars: [
      {
        num: "01",
        name: "Agents IA et actions critiques",
        claim: "Si ce n’est pas autorisé, pas d’exécution. Si ça l’est, ça s’exécute — avec une preuve vérifiable.",
        body: "Ironproof vérifie chaque action critique contre votre politique avant qu’elle s’exécute, qu’elle vienne d’un agent IA, d’un script, d’une API ou d’une personne. Les actions non autorisées sont bloquées, et chaque décision est scellée par une preuve cryptographique que n’importe qui vérifie hors ligne, sans avoir à nous faire confiance.",
        href: "#problem",
        cta: "COMMENT FONCTIONNE LA BARRIÈRE",
        evidence: "Aujourd’hui : chaque décision est scellée et vérifiable dans votre navigateur, sans serveur et sans compte.",
      },
      {
        num: "02",
        name: "Sécurité du logiciel C",
        claim: "Ne vous contentez pas de trouver les failles. Prouvez que le correctif les ferme.",
        body: "Notre technologie de vérification analyse du logiciel C pour repérer les violations de sécurité, vérifier mathématiquement des propriétés définies et évaluer si un correctif règle vraiment la faille d’origine. Chaque verdict peut être rejoué par un tiers, sans avoir à nous faire confiance.",
        evidence: "Aujourd’hui : un tiers, sans notre contexte, a rejoué 4 archives et retrouvé les mêmes 8 verdicts sur 8 (12 octobre 2026).",
      },
      {
        num: "03",
        name: "Modernisation COBOL",
        claim: "Modernisez le code. Préservez le comportement.",
        body: "Une modernisation peut glisser des changements subtils dans une logique d’affaires critique. Ironproof compare le programme d’origine et le programme modernisé pour prouver des propriétés d’équivalence définies ou repérer les écarts de comportement, avec des hypothèses et des limites de vérification explicites.",
        evidence: "Aujourd’hui : pas encore de rejeu par un tiers. Nous le publierons quand il existera.",
      },
    ],
    method: {
      eyebrow: "CE QUE VOUS RECEVEZ",
      title: "Trois verdicts. Chacun part avec sa preuve.",
      lead: "Jamais un simple crochet vert. Chaque résultat est l’un des trois, et chacun vient avec ce qu’il faut pour le revérifier.",
      body: "L’IA lit le code ou la politique et formule les obligations. Des solveurs formels tranchent. Des contrôles indépendants — un deuxième solveur, des fautes volontaires, un rejeu par quelqu’un d’autre — mettent la décision elle-même à l’épreuve.",
      verdicts: [
        { word: "Prouvé.", body: "La propriété tient dans le modèle déclaré et sous ses hypothèses.", receive: "Vous recevez l’obligation et les éléments du solveur, à rejouer dans votre propre solveur." },
        { word: "Réfuté.", body: "Un contre-exemple concret montre exactement comment elle casse.", receive: "Vous recevez le contre-exemple, à rejouer vous-même." },
        { word: "Non démontré.", body: "Nous n’avons pas pu conclure. Dit comme tel, jamais affiché comme un succès.", receive: "Vous recevez ce qui a été tenté et où ça s’est arrêté." },
      ],
      independent: {
        title: "Deux façons de nous vérifier, aucune n’a besoin de nous.",
        body: "Dans votre navigateur : la trace scellée — chaîne d’empreintes, signatures Ed25519 et post-quantique ML-DSA-65 — vérifiée sans serveur et sans compte. Sur votre machine : la preuve elle-même, rejouée dans votre propre solveur à partir de l’obligation fournie. Quand un élément ne peut pas être partagé, le résultat le dit.",
      },
      foot: "Les autres vendent la confiance. Nous, on vend le droit de ne pas nous faire confiance.",
    },
    research: {
      eyebrow: "RECHERCHE PUBLIÉE",
      title: "Portée par la recherche. Fondée sur la preuve.",
      lead: "Nos travaux couvrent la vérification formelle automatisée, la sécurité logicielle, la modernisation des systèmes patrimoniaux, la cryptographie post-quantique et la sécurité du logiciel quantique. Chaque papier expose sa méthode, ses résultats et ses limites.",
      cta: "VOIR LA RECHERCHE",
    },
  },
};
