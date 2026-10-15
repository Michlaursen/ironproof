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
    independent: {
      title: string;
      body: string;
      /** The same body, split for the two-panel layout (Dom, 2026-10-15). Words unchanged. */
      browser: { where: string; what: string; body: string; proves: string };
      solver: { where: string; what: string; body: string; proves: string };
      note: string;
    };
    /** The company line (Dom, 2026-10-15): set alone, at hero scale. */
    foot: { a: string; b: string };
  };
  research: { eyebrow: string; title: string; lead: string; cta: string; read: string; fields: readonly string[] };
};

export const PLATFORM_COPY: L<PlatformCopy> = {
  en: {
    eyebrow: "ONE CORE TECHNOLOGY",
    title: "Three applications. One standard of evidence.",
    pillars: [
      {
        num: "01",
        name: "AI agents & critical actions",
        claim: "No authorization. No execution. Every decision backed by verifiable evidence.",
        body: "Every critical action routed through Ironproof’s gate, whether an AI agent, a script, an API or a person started it, is checked against your policy before it runs. Unauthorized ones are blocked; each production decision is sealed and can be checked offline.",
        href: "#problem",
        cta: "HOW THE GATE WORKS",
        evidence: "Today: a decision’s sealed record is checked in your browser, with no server and no account. That checks integrity; the decision itself is re-derived from its inputs and the policy.",
      },
      {
        num: "02",
        name: "C software security",
        claim: "Don’t just find vulnerabilities. Check, within stated bounds, that the fix closes them.",
        body: "Checks defined properties of C code within stated bounds, and whether a fix removes the failure our test exhibits. Each result ships as a dossier you can re-run.",
        evidence: "Today: an automated replay, run by an AI agent without our context, reproduced 8 of 8 verdicts from 4 archives (October 12, 2026). No independent third party has validated them, and our C verdict judge is being rebuilt after our own audit.",
      },
      {
        num: "03",
        name: "Legacy modernization",
        claim: "Modernize the code. Check what the translation preserves.",
        body: "Translates COBOL to Python and checks, under a stated model of the COBOL, that both compute the same results, or returns the input where they differ. What the model does not cover is reported as not covered.",
        evidence: "Today: IBM’s GenApp business programs, checked only under a CICS model we write. No third-party replay yet.",
      },
    ],
    method: {
      eyebrow: "WHAT YOU RECEIVE",
      title: "Three verdicts. Each one ships with its verification dossier.",
      lead: "Never a green checkmark. Every result is one of three, and each comes with what was used to reach it.",
      body: "AI reads the code or the policy and proposes what to check. It proves nothing on its own: formal solvers decide. Where the case allows, independent checks — a second solver, deliberate faults, a replay without our context — test the decision itself.",
      verdicts: [
        { word: "Proven.", body: "The property holds within the stated model and its assumptions.", receive: "You get the obligation — SMT-LIB for policy proofs, the harness and its bounds for C — to re-run yourself." },
        { word: "Refuted.", body: "A concrete counterexample shows exactly how it breaks.", receive: "You get the counterexample, to replay yourself." },
        { word: "Not demonstrated.", body: "We could not conclude. Said as such, never shown as a pass.", receive: "You get the reason it stopped, recorded with the result." },
      ],
      independent: {
        title: "Two different checks. Neither needs us.",
        body: "In your browser: the sealed record — hash chain, Ed25519 and post-quantum ML-DSA-65 signatures. It shows that nothing changed after sealing, not that a property is true. On your machine: the policy proofs themselves, re-run in your own solver from the obligations we ship. A seal proves integrity; formal verification establishes what holds within the stated model and assumptions. Where an artifact cannot be shared, the result says so.",
        browser: {
          where: "IN YOUR BROWSER",
          what: "The sealed record",
          body: "Hash chain, Ed25519 and post-quantum ML-DSA-65 signatures. It shows that nothing changed after sealing, not that a property is true.",
          proves: "A seal proves integrity",
        },
        solver: {
          where: "ON YOUR MACHINE",
          what: "Verify the mathematical claim",
          body: "Re-run in your own solver from the obligations we ship.",
          proves: "Formal verification establishes what holds within the stated model and assumptions",
        },
        note: "Where an artifact cannot be shared, the result says so.",
      },
      foot: { a: "Others sell trust.", b: "We sell the right not to trust us." },
    },
    research: {
      eyebrow: "PUBLISHED RESEARCH",
      title: "Research-driven. Evidence-based.",
      lead: "Our research spans automated formal verification, software security, legacy-system modernization, post-quantum cryptography and quantum software security. Each paper states its method and its declared limits.",
      cta: "EXPLORE RESEARCH",
      read: "READ ON ARXIV",
      fields: ["LEGACY MODERNIZATION", "POST-QUANTUM CRYPTOGRAPHY", "QUANTUM SOFTWARE SECURITY", "AI-GENERATED CODE"],
    },
  },
  fr: {
    eyebrow: "UNE TECHNOLOGIE CENTRALE",
    title: "Trois applications. Une seule exigence de preuve.",
    pillars: [
      {
        num: "01",
        name: "Agents IA et actions critiques",
        claim: "Pas d’autorisation. Pas d’exécution. Chaque décision appuyée par une preuve vérifiable.",
        body: "Chaque action critique qui passe par la barrière d’Ironproof, qu’elle vienne d’un agent IA, d’un script, d’une API ou d’une personne, est vérifiée contre votre politique avant de s’exécuter. Les actions non autorisées sont bloquées ; chaque décision de production est scellée et vérifiable hors ligne.",
        href: "#problem",
        cta: "COMMENT FONCTIONNE LA BARRIÈRE",
        evidence: "Aujourd’hui : la trace scellée d’une décision se vérifie dans votre navigateur, sans serveur ni compte. C’est un contrôle d’intégrité ; la décision elle-même se recalcule à partir de ses entrées et de la politique.",
      },
      {
        num: "02",
        name: "Sécurité du logiciel C",
        claim: "Ne vous contentez pas de trouver les failles. Vérifiez, dans des bornes déclarées, que le correctif les ferme.",
        body: "Vérifie des propriétés définies du code C dans des bornes déclarées, et si un correctif supprime l’échec que notre test met en évidence. Chaque résultat part avec un dossier que vous pouvez rejouer.",
        evidence: "Aujourd’hui : un rejeu automatisé, lancé par un agent IA sans notre contexte, a reproduit 8 verdicts sur 8 à partir de 4 archives (12 octobre 2026). Aucun tiers indépendant ne les a validés, et notre juge des verdicts C est en reconstruction après notre propre audit.",
      },
      {
        num: "03",
        name: "Modernisation des systèmes hérités",
        claim: "Modernisez le code. Vérifiez ce que la traduction préserve.",
        body: "Traduit le COBOL en Python et vérifie, sous un modèle déclaré du COBOL, que les deux calculent les mêmes résultats, ou rend l’entrée où ils diffèrent. Ce que le modèle ne couvre pas est déclaré non couvert.",
        evidence: "Aujourd’hui : les programmes métier GenApp d’IBM, vérifiés seulement sous un modèle CICS que nous écrivons. Pas encore de rejeu par un tiers.",
      },
    ],
    method: {
      eyebrow: "CE QUE VOUS RECEVEZ",
      title: "Trois verdicts. Chacun part avec son dossier de vérification.",
      lead: "Jamais un simple crochet vert. Chaque résultat est l’un des trois, et chacun vient avec ce qui a servi à l’obtenir.",
      body: "L’IA lit le code ou la politique et propose quoi vérifier. Elle ne prouve rien seule : des solveurs formels tranchent. Quand le cas le permet, des contrôles indépendants — un deuxième solveur, des fautes volontaires, un rejeu sans notre contexte — mettent la décision elle-même à l’épreuve.",
      verdicts: [
        { word: "Prouvé.", body: "La propriété tient dans le modèle déclaré et sous ses hypothèses.", receive: "Vous recevez l’obligation — SMT-LIB pour les preuves de politique, le harnais et ses bornes pour le C — à rejouer vous-même." },
        { word: "Réfuté.", body: "Un contre-exemple concret montre exactement comment elle casse.", receive: "Vous recevez le contre-exemple, à rejouer vous-même." },
        { word: "Non démontré.", body: "Nous n’avons pas pu conclure. Dit comme tel, jamais affiché comme un succès.", receive: "Vous recevez la raison de l’arrêt, consignée avec le résultat." },
      ],
      independent: {
        title: "Deux vérifications différentes. Aucune n’a besoin de nous.",
        body: "Dans votre navigateur : la trace scellée — chaîne d’empreintes, signatures Ed25519 et post-quantique ML-DSA-65. Elle montre que rien n’a changé après le scellement, pas qu’une propriété est vraie. Sur votre machine : les preuves de politique elles-mêmes, rejouées dans votre propre solveur à partir des obligations fournies. Un sceau prouve l’intégrité ; la vérification formelle établit ce qui tient dans le modèle déclaré et sous ses hypothèses. Quand un élément ne peut pas être partagé, le résultat le dit.",
        browser: {
          where: "DANS VOTRE NAVIGATEUR",
          what: "La trace scellée",
          body: "Chaîne d’empreintes, signatures Ed25519 et post-quantique ML-DSA-65. Elle montre que rien n’a changé après le scellement, pas qu’une propriété est vraie.",
          proves: "Un sceau prouve l’intégrité",
        },
        solver: {
          where: "SUR VOTRE MACHINE",
          what: "Vérifiez l’énoncé mathématique",
          body: "Rejouées dans votre propre solveur à partir des obligations fournies.",
          proves: "La vérification formelle établit ce qui tient dans le modèle déclaré et sous ses hypothèses",
        },
        note: "Quand un élément ne peut pas être partagé, le résultat le dit.",
      },
      foot: { a: "Les autres vendent la confiance.", b: "Nous, on vend le droit de ne pas nous faire confiance." },
    },
    research: {
      eyebrow: "RECHERCHE PUBLIÉE",
      title: "Portée par la recherche. Fondée sur la preuve.",
      lead: "Nos travaux couvrent la vérification formelle automatisée, la sécurité logicielle, la modernisation des systèmes patrimoniaux, la cryptographie post-quantique et la sécurité du logiciel quantique. Chaque papier expose sa méthode et ses limites déclarées.",
      cta: "VOIR LA RECHERCHE",
      read: "LIRE SUR ARXIV",
      fields: ["MODERNISATION DES SYSTÈMES HÉRITÉS", "CRYPTOGRAPHIE POST-QUANTIQUE", "SÉCURITÉ DU LOGICIEL QUANTIQUE", "CODE GÉNÉRÉ PAR IA"],
    },
  },
};
