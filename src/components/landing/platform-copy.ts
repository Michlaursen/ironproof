import type { L } from "./i18n";

/*
 * The landing's opening below the hero: one technology, three applications,
 * then the method (repositioned 2026-10-13 on Dom's text).
 *
 * Every claim was read against the code or a phrase already ratified on the
 * site before it was written here:
 *   - pillar 1 keeps the ratified tagline with BOTH sides (block AND allow,
 *     2026-09-14), any initiator (2026-09-03), and "without trusting us"
 *     (2026-10-12, provable-ai-copy.tsx). Blocked decisions are sealed too:
 *     ironproof/inquest/governed_executor.py:323 requires the ledger.
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
};

export type Verdict = { word: string; body: string };

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
    eyebrow: "ONE TECHNOLOGY",
    title: "Three critical applications.",
    pillars: [
      {
        num: "01",
        name: "AI agents & critical actions",
        claim: "If it isn’t authorized, it never executes. If it is, it executes — with verifiable evidence.",
        body: "Ironproof checks every critical action against your policy before it runs, whether an AI agent, a script, an API or a person started it. Unauthorized actions are blocked, and every decision is sealed with cryptographic evidence anyone can verify offline, without trusting us.",
        href: "#problem",
        cta: "HOW THE GATE WORKS",
      },
      {
        num: "02",
        name: "Software security & formal verification",
        claim: "Don’t just find vulnerabilities. Prove what holds.",
        body: "Our verification technology analyzes C software to identify security violations, mathematically verify defined properties, and assess whether a fix addresses the underlying vulnerability.",
      },
      {
        num: "03",
        name: "Legacy-system modernization",
        claim: "Modernize the code. Preserve the behavior.",
        body: "Modernization can introduce subtle changes to critical business logic. Ironproof compares legacy and modernized programs to prove defined equivalence properties or identify behavioral differences, with explicit assumptions and verification boundaries.",
      },
    ],
    method: {
      eyebrow: "THE METHOD",
      title: "AI proposes. Mathematics verifies.",
      lead: "Our neuro-symbolic approach combines the flexibility of AI with the rigor of formal methods.",
      body: "AI helps understand complex code and generate verification obligations. Formal solvers determine whether those properties hold within the defined model, produce a counterexample when they fail, or report when a conclusion cannot be established.",
      verdicts: [
        { word: "Proven.", body: "The property holds within the stated model and its assumptions." },
        { word: "Refuted.", body: "A concrete counterexample shows exactly how it breaks." },
        { word: "Not yet demonstrated.", body: "Said as such, never shown as a pass." },
      ],
      independent: {
        title: "Independent proof, without trusting us.",
        body: "A result ships with what it rests on: the policy or the program, the model, the stated assumptions and the solver’s evidence. Anyone can re-check it offline. Where an artifact cannot be shared, the result says so.",
      },
      foot: "No unsupported guarantees. No assumptions hidden behind a green checkmark.",
    },
    research: {
      eyebrow: "PUBLISHED RESEARCH",
      title: "Research-driven. Evidence-based.",
      lead: "Our research spans automated formal verification, software security, legacy-system modernization, post-quantum cryptography and quantum software security. Each paper states its method, its results and its limits.",
      cta: "EXPLORE RESEARCH",
    },
  },
  fr: {
    eyebrow: "UNE SEULE TECHNOLOGIE",
    title: "Trois applications critiques.",
    pillars: [
      {
        num: "01",
        name: "Agents IA et actions critiques",
        claim: "Si ce n’est pas autorisé, pas d’exécution. Si ça l’est, ça s’exécute — avec une preuve vérifiable.",
        body: "Ironproof vérifie chaque action critique contre votre politique avant qu’elle s’exécute, qu’elle vienne d’un agent IA, d’un script, d’une API ou d’une personne. Les actions non autorisées sont bloquées, et chaque décision est scellée par une preuve cryptographique que n’importe qui vérifie hors ligne, sans avoir à nous faire confiance.",
        href: "#problem",
        cta: "COMMENT FONCTIONNE LA BARRIÈRE",
      },
      {
        num: "02",
        name: "Sécurité logicielle et vérification formelle",
        claim: "Ne vous contentez pas de trouver les failles. Prouvez ce qui tient.",
        body: "Notre technologie de vérification analyse du logiciel C pour repérer les violations de sécurité, vérifier mathématiquement des propriétés définies et évaluer si un correctif règle vraiment la faille d’origine.",
      },
      {
        num: "03",
        name: "Modernisation des systèmes patrimoniaux",
        claim: "Modernisez le code. Préservez le comportement.",
        body: "Une modernisation peut glisser des changements subtils dans une logique d’affaires critique. Ironproof compare le programme d’origine et le programme modernisé pour prouver des propriétés d’équivalence définies ou repérer les écarts de comportement, avec des hypothèses et des limites de vérification explicites.",
      },
    ],
    method: {
      eyebrow: "LA MÉTHODE",
      title: "L’IA propose. Les mathématiques vérifient.",
      lead: "Notre approche neuro-symbolique allie la souplesse de l’IA à la rigueur des méthodes formelles.",
      body: "L’IA aide à comprendre du code complexe et à formuler les obligations de vérification. Des solveurs formels déterminent si ces propriétés tiennent dans le modèle défini, produisent un contre-exemple quand elles échouent, ou signalent qu’une conclusion ne peut pas être établie.",
      verdicts: [
        { word: "Prouvé.", body: "La propriété tient dans le modèle déclaré et sous ses hypothèses." },
        { word: "Réfuté.", body: "Un contre-exemple concret montre exactement comment elle casse." },
        { word: "Pas encore démontré.", body: "Dit comme tel, jamais affiché comme un succès." },
      ],
      independent: {
        title: "Une preuve indépendante, sans avoir à nous faire confiance.",
        body: "Un résultat part avec ce sur quoi il repose : la politique ou le programme, le modèle, les hypothèses déclarées et les éléments du solveur. N’importe qui peut le revérifier hors ligne. Quand un élément ne peut pas être partagé, le résultat le dit.",
      },
      foot: "Aucune garantie sans appui. Aucune hypothèse cachée derrière un crochet vert.",
    },
    research: {
      eyebrow: "RECHERCHE PUBLIÉE",
      title: "Portée par la recherche. Fondée sur la preuve.",
      lead: "Nos travaux couvrent la vérification formelle automatisée, la sécurité logicielle, la modernisation des systèmes patrimoniaux, la cryptographie post-quantique et la sécurité du logiciel quantique. Chaque papier expose sa méthode, ses résultats et ses limites.",
      cta: "VOIR LA RECHERCHE",
    },
  },
};
