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
 * One engine (Dom, 2026-10-16, after the positioning research): authorization
 * of critical actions is sold today; C stays on the page as the same engine in
 * research -- no "product", no purchase button. Never "universal engine".
 *
 * 2026-10-19 (Dom, "PARFAIT LETS GO"): the translation check leads the use
 * cases (card 0, shown in full); the gate in front of critical actions comes
 * second, first of the "same engine" cards. The pillars keep their numbers:
 * the application pages read them by index (application-copy.ts APP_PILLAR).
 *
 * Legacy modernization is sold as a SERVICE since 2026-10-17 (Dom: "GO"): the
 * model of each program is built one program at a time (an AI drafts it, a
 * solver and IBM's COBOL compiler judge it), so the offer says "done by our
 * team", never a tool a client runs alone. 2026-10-17 (Dom): the copy no
 * longer says who writes the model; the CICS evidence line keeps "a model we
 * write ourselves" because it states that the model is ours, not IBM's.
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
  /** Four things the engine does, each with a run anyone can re-check (Dom, 2026-10-16:
   *  « nous c'est exactement ça mais tu rajoutes AI agents against a policy »). Every
   *  figure is copied from the results already published on this site. */
  useCases: {
    eyebrow: string;
    title: string;
    cards: readonly { name: string; body: string; ranOn: string; href: string; cta: string }[];
    /** The cards after the first: the same engine, sold as a mandate, not as a product (review, Dom go 2026-10-17). */
    alsoTitle: string;
    /** One line per mandate, what the client walks away with. */
    alsoLines: readonly string[];
    alsoLead: string;
    alsoCta: string;
    alsoHref: string;
    /** How the gate plugs in, for the CTO's first question. */
    plugsInLabel: string;
    plugsIn: string;
    foot: string;
  };
  /** Three buyer benefits, after the use cases (Dom, 2026-10-16: « improve time to market doit être sur le site »).
   *  No figure here: each benefit is a consequence of what the cards already show. */
  whyUs: { eyebrow: string; title: string; items: readonly { title: string; body: string }[] };
  /** Why Ironproof exists (Dom, 2026-10-16). Label changed 2026-10-17 (Dom): « Our North Star » was Code Metal's own word. */
  northStar: { eyebrow: string; title: string; paragraphs: readonly string[]; lead: string; body: string; close: string };
};

export const PLATFORM_COPY: L<PlatformCopy> = {
  en: {
    eyebrow: "ONE ENGINE",
    title: "One engine. Two offers today. C, in research.",
    beats: { risk: "THE RISK", does: "WHAT IRONPROOF DOES", today: "TODAY" },
    pillars: [
      {
        num: "01",
        name: "Critical actions",
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
      },
      {
        num: "03",
        name: "Code verification",
        status: "AVAILABLE NOW · DONE BY OUR TEAM",
        available: true,
        claim: "Someone else translated your code. We check it computes what the old code did, and you can re-run the check without us.",
        risk: "A translation can compile, pass its tests and still return a different number, on one input or under one compiler setting.",
        href: "/modernization",
        cta: "SEE HOW WE CHECK IT",
        body: "Your integrator or your AI tool did the translation: COBOL to Java or Python, Python or MATLAB to C. We don’t translate, so we have no stake in saying it is right. We model exactly what the original computes and confront the new code with it: proven where the model covers it, the exact input where they differ, or not covered with the reason.",
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
    whyUs: {
      eyebrow: "WHY IRONPROOF",
      title: "Faster to production. Easier to audit. Harder to break.",
      items: [
        {
          title: "Improve time to market",
          body: "Put migrations, AI agents and policy changes into production sooner. The checks run automatically, and the evidence is produced as you go, not assembled after the fact for the audit.",
        },
        {
          title: "Pass the audit with evidence",
          body: "Give your auditor and your regulator a sealed record of every answer and every decision that they can re-check themselves, instead of logs and screenshots.",
        },
        {
          title: "Catch what tests miss",
          body: "Get the exact input where the new code behaves differently, or the sequence of actions that breaks your rule, before production does. Or the proof that none exists within the stated model.",
        },
      ],
    },
    useCases: {
      eyebrow: "WHAT WE CHECK",
      title: "It starts with the code that was rewritten.",
      alsoTitle: "Same engine, three more questions.",
      alsoLead: "The engine behind code verification also guards critical actions, and takes on two hard questions as a mandate delivered by our team.",
      alsoLines: [
        "Every payment, access grant and change checked against your rules before it runs: allowed when it complies, blocked when it breaks them, and every decision sealed.",
        "Find the one request your access policy lets through, before an attacker does.",
        "Know whether a patch really closes the flaw, before you ship it.",
      ],
      alsoCta: "TALK TO US",
      alsoHref: "/pilot",
      plugsInLabel: "IN PRACTICE",
      plugsIn: "You give us the original program and its translation. For each module, you get one of the three answers. Each difference comes with the input that shows it, and what you need to replay it on your own compiler.",
      cards: [
        {
          name: "Code verification",
          body: "Your old code was translated into a new language, by an integrator or an AI tool. It compiles and it passes its tests. We check something else: does it still do exactly what the old code did, calculation by calculation? When it does, we show it, within limits stated up front. When it does not, we show you the exact input that gives a different result.",
          ranOn: "A public AI-generated Java translation of AWS CardDemo: an interest calculation that rounds where the COBOL truncates, 0.08 instead of 0.07 per account.",
          href: "/modernization",
          cta: "SEE HOW WE CHECK IT",
        },
        {
          name: "Critical actions",
          body: "For banks putting AI agents into production: keep every payment, access grant and change inside your policy, checked before it runs, and give your auditor a sealed record of each decision instead of a log.",
          ranOn: "A CAD 7.2 million payment from an AI agent, unsigned: blocked at the gate, refusal sealed. In a lab, NERC CIP-010 change rules encoded as a gate: 17 of 17 cases decided as NERC’s text says.",
          href: "/demo",
          cta: "WATCH IT DECIDE",
        },
        {
          name: "Cloud access policies",
          body: "For cloud and security teams: know what your access policies really allow before someone else finds out, with the exact request that gets through when one does.",
          ranOn: "57 IAM policies published by AWS: 160 of 185 guarantees proven under two independent solvers, 11 real findings.",
          href: "/#start",
          cta: "SEE THE RUN",
        },
        {
          name: "Security fixes",
          body: "For teams shipping security fixes: know whether a patch closes the flaw before you release it, within stated bounds, or get the case that reopens it.",
          ranOn: "Real fixes from open-source projects; the checker is being rebuilt.",
          href: "/software-security",
          cta: "SEE THE RESULTS",
        },
      ],
      foot: "Every result ships with what you need to check it without us.",
    },
    northStar: {
      eyebrow: "WHAT WE BELIEVE",
      title: "Ironproof brings proof to what machines rewrite, and to the actions that cannot be undone.",
      paragraphs: [
        "AI now writes code, moves money, and changes critical systems faster than humans can review them.",
        "But speed without assurance is not enough.",
        "Every migration must preserve the behavior that matters. Every critical action must be authorized before execution. Every claim must withstand independent verification.",
      ],
      lead: "Ironproof is building Proof Intelligence.",
      body: "AI proposes, formal methods decide, and each result ships with evidence anyone can check.",
      close: "We prove what holds. We show what breaks.",
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
    title: "Un moteur. Deux offres aujourd’hui. Le C, en recherche.",
    beats: { risk: "LE RISQUE", does: "CE QUE FAIT IRONPROOF", today: "AUJOURD’HUI" },
    pillars: [
      {
        num: "01",
        name: "Actions critiques",
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
      },
      {
        num: "03",
        name: "Vérification de code",
        status: "DISPONIBLE · RÉALISÉ PAR NOTRE ÉQUIPE",
        available: true,
        claim: "Quelqu’un d’autre a traduit votre code. Nous vérifions qu’il calcule ce que calculait l’ancien, et vous refaites la vérification sans nous.",
        risk: "Une traduction peut compiler, passer ses tests et rendre quand même un autre nombre, sur une seule entrée ou sous un seul réglage du compilateur.",
        href: "/fr/modernization",
        cta: "VOIR COMMENT ON VÉRIFIE",
        body: "Votre intégrateur ou votre outil d’IA a fait la traduction : COBOL vers Java ou Python, Python ou MATLAB vers C. Nous ne traduisons pas, donc nous n’avons aucun intérêt à dire qu’elle est bonne. Nous modélisons exactement ce que calcule l’original et y confrontons le nouveau code : prouvé là où le modèle le couvre, l’entrée exacte où ils diffèrent, ou non couvert, avec la raison.",
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
    whyUs: {
      eyebrow: "POURQUOI IRONPROOF",
      title: "Plus vite en production. Plus simple à auditer. Plus dur à briser.",
      items: [
        {
          title: "Accélérer la mise en marché",
          body: "Mettez migrations, agents IA et changements de politique en production plus tôt. Les vérifications roulent automatiquement, et les éléments de preuve se produisent au fur et à mesure, pas rassemblés après coup pour l’audit.",
        },
        {
          title: "Passer l’audit avec des preuves",
          body: "Remettez à votre auditeur et à votre régulateur une trace scellée de chaque réponse et de chaque décision, qu’ils revérifient eux-mêmes, plutôt que des journaux et des captures d’écran.",
        },
        {
          title: "Attraper ce que les tests ratent",
          body: "Obtenez l’entrée précise où le nouveau code se comporte autrement, ou la suite d’actions qui brise votre règle, avant que la production la trouve. Ou la preuve qu’il n’y en a aucune dans le modèle déclaré.",
        },
      ],
    },
    useCases: {
      eyebrow: "CE QU’ON VÉRIFIE",
      title: "Tout commence par le code qui a été réécrit.",
      alsoTitle: "Le même moteur, trois autres questions.",
      alsoLead: "Le même moteur protège aussi vos actions critiques. Et notre équipe le met au travail, en mandat, sur deux questions difficiles.",
      alsoLines: [
        "Chaque paiement, accès ou changement vérifié selon vos règles avant de partir. Conforme, il passe. Sinon, il est bloqué. Chaque décision est scellée.",
        "Trouvez la seule demande que votre politique d’accès laisse passer, avant un attaquant.",
        "Vérifiez qu’un correctif ferme vraiment la faille, avant de le livrer.",
      ],
      alsoCta: "PARLEZ-NOUS",
      alsoHref: "/fr/pilot",
      plugsInLabel: "CONCRÈTEMENT",
      plugsIn: "Vous nous confiez le programme d’origine et sa traduction. Pour chaque module, vous recevez l’une des trois réponses. Chaque écart vient avec l’entrée qui le montre, et de quoi le rejouer sur votre propre compilateur.",
      cards: [
        {
          name: "Vérification de code",
          body: "Votre vieux code a été traduit dans un nouveau langage, par un intégrateur ou par un outil d’IA. Il compile, il passe ses tests. Nous, on vérifie autre chose : est-ce qu’il fait encore exactement ce que faisait l’ancien, calcul par calcul ? Quand c’est le cas, on le démontre, dans les limites annoncées d’avance. Quand ce ne l’est pas, on vous montre l’entrée précise qui donne un résultat différent.",
          ranOn: "Une traduction Java publique de CardDemo (AWS), générée par IA : un calcul d’intérêt qui arrondit là où le COBOL tronque, 0,08 au lieu de 0,07 par compte.",
          href: "/fr/modernization",
          cta: "VOIR COMMENT ON VÉRIFIE",
        },
        {
          name: "Actions critiques",
          body: "Pour les banques qui mettent des agents IA en production : chaque paiement, accès et changement reste dans votre politique, vérifié avant de s’exécuter, et votre auditeur reçoit une trace scellée de chaque décision plutôt qu’un journal.",
          ranOn: "Un paiement de 7,2 M$ CA envoyé par un agent IA, sans signature : bloqué à la barrière, refus scellé. En labo, les règles de changement NERC CIP-010 encodées comme barrière : 17 cas sur 17 tranchés comme le dit le texte de NERC.",
          href: "/fr/demo",
          cta: "LE VOIR DÉCIDER",
        },
        {
          name: "Politiques d’accès cloud",
          body: "Pour les équipes cloud et de sécurité : sachez ce que vos politiques d’accès permettent vraiment avant que quelqu’un d’autre le découvre, avec la demande exacte qui passe quand il y en a une.",
          ranOn: "57 politiques IAM publiées par AWS : 160 garanties prouvées sur 185 avec deux solveurs indépendants, 11 vraies trouvailles.",
          href: "/fr#start",
          cta: "VOIR LE RÉSULTAT",
        },
        {
          name: "Correctifs de sécurité",
          body: "Pour les équipes qui livrent des correctifs de sécurité : sachez si un correctif ferme la faille avant de le publier, dans des bornes déclarées, ou obtenez le cas qui la rouvre.",
          ranOn: "De vrais correctifs de projets open source ; le vérificateur est en reconstruction.",
          href: "/fr/software-security",
          cta: "VOIR LES RÉSULTATS",
        },
      ],
      foot: "Chaque résultat part avec de quoi le vérifier sans nous.",
    },
    northStar: {
      eyebrow: "CE QUE NOUS CROYONS",
      title: "Ironproof apporte la preuve à ce que les machines réécrivent, et aux actions sans retour.",
      paragraphs: [
        "L’IA écrit du code, déplace de l’argent et modifie des systèmes critiques plus vite que des humains ne peuvent les relire.",
        "Mais la vitesse sans garantie ne suffit pas.",
        "Chaque migration doit garder le comportement qui compte. Chaque action critique doit être autorisée avant de partir. Chaque affirmation doit résister à une vérification indépendante.",
      ],
      lead: "Ironproof développe ce que nous appelons Proof Intelligence.",
      body: "L’IA propose, les méthodes formelles tranchent, et chaque résultat part avec des éléments de preuve que n’importe qui peut vérifier.",
      close: "On prouve ce qui tient. On montre ce qui casse.",
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
