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
 *   - pillar 2's replay line (8 of 8 verdicts, 2026-10-12) was removed on
 *     Dom's word (2026-10-15): the C judge is being rebuilt, the line read as
 *     a caveat more than as evidence.
 *   - pillar 2 says C, not C/C++: every fix measured so far is C
 *     (cobalt-ai bench/lot20_2026-10-11, 20 fixes drawn at random).
 *   - pillar 3 says "defined equivalence properties" with explicit
 *     assumptions: results are proven under a stated model, never more.
 *   - the three verdicts are Dom's words (2026-10-13); the neuro-symbolic
 *     page says the same three states as holds / breaks / not covered.
 *
 * One product, one engine (Dom, 2026-10-16, after the positioning research):
 * authorization of critical actions is the one thing sold today; C and COBOL
 * stay on the page, with the same photographs, as the same engine in
 * research -- no "product", no purchase button. Never "universal engine".
 */

export type Pillar = {
  num: string;
  name: string;
  /** Where this application stands: sold today, or the same engine in research (Dom, 2026-10-16). */
  status: string;
  /** True for the one thing sold today. */
  available?: boolean;
  claim: string;
  /** The story in three beats (Dom, 2026-10-15: « écris l'histoire, comprenable »):
   *  what goes wrong without us, what Ironproof does, what runs today. */
  risk: string;
  body: string;
  href?: string;
  cta?: string;
  /** What a reader can re-check today for this application, said plainly, including "not yet". */
  /** Optional: a pillar with nothing measured today to show carries no line. */
  evidence?: string;
};

export type Verdict = { word: string; body: string; receive: string };

export type PlatformCopy = {
  eyebrow: string;
  title: string;
  /** Labels of the three beats of each chapter. */
  beats: { risk: string; does: string; today: string };
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
    eyebrow: "ONE ENGINE",
    title: "One product today. The same engine, in research.",
    beats: { risk: "THE RISK", does: "WHAT IRONPROOF DOES", today: "TODAY" },
    pillars: [
      {
        num: "01",
        name: "AI agents & critical actions",
        status: "AVAILABLE NOW · PILOTS OPEN",
        available: true,
        claim: "Your agent can move money. It should never move it wrong.",
        risk: "An AI agent, a script or a person with valid credentials asks to pay, delete, grant access or ship a change. Logged in is not the same as allowed.",
        body: "Every request routed through Ironproof is checked against your rules before it runs. Allowed, it runs. Not allowed, it never does. Either way, the decision is sealed.",
        href: "/pilot",
        cta: "START A PILOT",
        evidence: "Open a sealed decision and check it yourself, in your browser, with no server and no account.",
      },
      {
        num: "02",
        name: "C software security",
        status: "SAME ENGINE · IN RESEARCH",
        claim: "A patch says the bug is fixed. We check that it is.",
        risk: "Scanners find the hole and a developer writes the fix. Nobody shows that the fix actually closes it.",
        href: "/software-security",
        cta: "READ THE RESEARCH",
        body: "Ironproof writes a test that triggers the bug, runs it before and after the fix, and tells you whether the fix closes it, within stated bounds. Each result ships as a dossier you can re-run.",
        evidence: "20 real fixes drawn at random from projects such as curl and libssh2: 13 closed, 3 where our test was fooled, 4 not analyzed (October 12, 2026).",
      },
      {
        num: "03",
        name: "Legacy modernization",
        status: "SAME ENGINE · IN RESEARCH",
        claim: "Leave COBOL behind. Check that the results stay the same.",
        risk: "A translated program can compile, pass its tests and still compute a different amount on the one input nobody tried.",
        href: "/modernization",
        cta: "READ THE RESEARCH",
        body: "Ironproof translates COBOL into Python, then checks that both give the same results, or shows the exact input where they differ. What our model of the old system does not cover is marked as not covered, never as passed.",
        evidence: "IBM’s GenApp sample insurance programs, checked under a CICS model we write ourselves. No outside party has replayed it yet.",
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
    eyebrow: "UN SEUL MOTEUR",
    title: "Un produit aujourd’hui. Le même moteur, en recherche.",
    beats: { risk: "LE RISQUE", does: "CE QUE FAIT IRONPROOF", today: "AUJOURD’HUI" },
    pillars: [
      {
        num: "01",
        name: "Agents IA et actions critiques",
        status: "DISPONIBLE · PILOTES OUVERTS",
        available: true,
        claim: "Votre agent peut déplacer de l’argent. Il ne doit jamais le déplacer de travers.",
        risk: "Un agent IA, un script ou une personne avec des accès valides demande de payer, d’effacer, d’ouvrir un accès ou de déployer. Être connecté, ce n’est pas être autorisé.",
        body: "Chaque demande qui passe par Ironproof est vérifiée contre vos règles avant de s’exécuter. Permise, elle s’exécute. Interdite, elle ne s’exécute jamais. Dans les deux cas, la décision est scellée.",
        href: "/fr/pilot",
        cta: "DÉMARRER UN PILOTE",
        evidence: "Ouvrez une décision scellée et vérifiez-la vous-même, dans votre navigateur, sans serveur ni compte.",
      },
      {
        num: "02",
        name: "Sécurité du logiciel C",
        status: "MÊME MOTEUR · EN RECHERCHE",
        claim: "Un correctif dit que la faille est fermée. Nous vérifions qu’elle l’est.",
        risk: "Les scanneurs trouvent la faille et un développeur écrit le correctif. Personne ne montre que le correctif la ferme vraiment.",
        href: "/fr/software-security",
        cta: "LIRE LA RECHERCHE",
        body: "Ironproof écrit un test qui déclenche la faille, le roule avant et après le correctif, et vous dit si le correctif la ferme, dans des bornes déclarées. Chaque résultat part avec un dossier que vous pouvez rejouer.",
        evidence: "20 vrais correctifs tirés au hasard dans des projets comme curl et libssh2 : 13 fermés, 3 où notre test s’est fait tromper, 4 non analysés (12 octobre 2026).",
      },
      {
        num: "03",
        name: "Modernisation des systèmes hérités",
        status: "MÊME MOTEUR · EN RECHERCHE",
        claim: "Quittez le COBOL. Vérifiez que les résultats restent les mêmes.",
        risk: "Un programme traduit peut compiler, passer ses tests et calculer quand même un autre montant sur la seule entrée que personne n’a essayée.",
        href: "/fr/modernization",
        cta: "LIRE LA RECHERCHE",
        body: "Ironproof traduit le COBOL en Python, puis vérifie que les deux donnent les mêmes résultats, ou montre l’entrée exacte où ils diffèrent. Ce que notre modèle de l’ancien système ne couvre pas est déclaré non couvert, jamais réussi.",
        evidence: "Les programmes d’assurance GenApp d’IBM, vérifiés sous un modèle CICS que nous écrivons nous-mêmes. Aucun tiers ne l’a encore rejoué.",
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
