import type { L } from "./i18n";

/*
 * Copy for /neuro-symbolic, in both languages.
 *
 * The page answers two questions a visitor brings from the nav: what
 * "neuro-symbolic" means, and what an automated formal verification engine is.
 * Every sentence about Ironproof was read against the code before it was
 * written (ironproof, 2026-10-12):
 *   - the client path (inquest/governed_executor.py) calls no language model;
 *   - in the Tribunal, a language-model intent judge is ADVISORY since
 *     2026-09-29 -- asked, recorded, never counted (inquest/tribunal.py,
 *     _judge_intent);
 *   - the decision by evaluation is licensed by a Lean theorem,
 *     proceed_iff_all_clauses_hold (lean/Ironproof/Fidelity.lean).
 * If one of those changes, this page changes with it.
 *
 * Deliberately NOT claimed: that a certificate reports an "undecided" verdict
 * to the customer. The three answers are described as what a solver can
 * return, not as a field of our artifact.
 */

export type Card = { k: string; t: string; b: string };
export type Step = { n: string; t: string; b: string };
export type Term = { t: string; d: string };

export type NeuroSymbolicCopy = {
  eyebrow: string;
  h1: React.ReactNode;
  heroLead: React.ReactNode;

  archTag: string;
  archSrc: string;
  archAlt: string;
  archCaption: string;

  s01: string;
  s01Title: string;
  s01Lead: string;
  neural: Card;
  symbolic: Card;
  neuralGood: string;
  neuralBad: string;
  symbolicGood: string;
  symbolicBad: string;
  strengthLabel: string;
  weaknessLabel: string;

  s02: string;
  s02Title: React.ReactNode;
  s02a: React.ReactNode;
  s02b: React.ReactNode;
  s02Quote: string;

  s03: string;
  s03Title: string;
  s03a: React.ReactNode;
  s03b: React.ReactNode;
  answers: readonly Card[];

  s04: string;
  s04Title: string;
  s04Lead: string;
  steps: readonly Step[];

  s05: string;
  s05Title: React.ReactNode;
  s05a: React.ReactNode;
  s05b: React.ReactNode;

  s06: string;
  s06Title: string;
  limits: readonly Card[];

  s07: string;
  s07Title: string;
  glossary: readonly Term[];

  provableTag: string;
  provableTitle: string;
  provableBody: string;

  s08Phrase: string;

  ctaTitle: string;
  ctaLead: string;
  logoTitle: string;
};

export const NEURO_SYMBOLIC_COPY: L<NeuroSymbolicCopy> = {
  en: {
    eyebrow: "NEURO-SYMBOLIC",
    h1: (
      <>
        The model proposes. <span className="metal-shine">The proof decides.</span>
      </>
    ),
    heroLead: (
      <>
        Neuro-symbolic AI joins two kinds of intelligence: a{" "}
        <span className="metal-text">neural model</span> that reads and writes like a person, and a{" "}
        <span className="metal-text">symbolic engine</span> that reasons like a mathematician. This
        page explains both, what an automated formal verification engine is, and exactly where each
        one sits inside Ironproof.
      </>
    ),

    archTag: "ARCHITECTURE",
    archSrc: "/media/architecture-en.webp",
    archAlt:
      "Ironproof architecture. Three inputs (an agent action with its policy, a COBOL program to migrate, a C vulnerability to fix) enter a cognitive operating system that governs the engineering agent: persistent memory, rules learned from past errors, no report without command and output. Inside it, a neuro-symbolic verification engine: the model proposes, the solver decides, counterexamples flow back. Every result is one of three verdicts: holds, breaks, not covered. Then: enforce before execution, seal with a post-quantum signature, verify offline without trusting us.",
    archCaption:
      "The whole system on one page. The model never has the last word: the solver does, and the seal lets anyone check it afterward.",

    s01: "01 — Two kinds of intelligence",
    s01Title: "One learns from examples. The other follows rules to the end.",
    s01Lead:
      "Each is strong where the other is weak. That is the whole reason to combine them.",
    neural: {
      k: "NEURAL",
      t: "The language model",
      b: "Learns patterns from enormous amounts of text. It understands a messy request, writes code, summarizes a contract, adapts to things it has never seen.",
    },
    symbolic: {
      k: "SYMBOLIC",
      t: "The solver",
      b: "Works on exact rules written in logic. Given a rule and a system, it checks every possible case — not a sample — and gives an answer anyone can re-check.",
    },
    strengthLabel: "Strong at",
    weaknessLabel: "Weak at",
    neuralGood: "Language, ambiguity, speed, breadth.",
    neuralBad:
      "Guarantees. It is probabilistic: it can be confidently wrong, and it can be talked out of its answer.",
    symbolicGood: "Certainty. Its answer holds over every case in the class it was asked about.",
    symbolicBad: "Reading the world. It needs the question already written precisely.",

    s02: "02 — Neuro-symbolic",
    s02Title: (
      <>
        Let the model be creative. <span className="metal-shine">Never let it be the judge.</span>
      </>
    ),
    s02a: (
      <>
        A neuro-symbolic system puts each part where it is reliable. The neural side handles
        language: it proposes an action, a translation, a candidate answer. The symbolic side checks
        it against rules that were fixed in advance, and{" "}
        <span className="text-foreground">only the symbolic side can say yes</span>.
      </>
    ),
    s02b: (
      <>
        The order matters. A model that grades another model is still a model — it can be prompted,
        persuaded, or simply wrong. A solver cannot be argued with: either the rule holds in every
        case, or it hands back the exact case where it breaks.
      </>
    ),
    s02Quote:
      "Intelligence without proof is a guess. Proof without intelligence never leaves the lab. Together, they ship.",

    s03: "03 — The engine",
    s03Title: "What an automated formal verification engine is.",
    s03a: (
      <>
        <span className="text-foreground">Formal verification</span> means proving, with
        mathematics, that a system obeys a rule — for all inputs, not the ones you happened to test.
        For decades it required specialists writing proofs by hand, which is why it stayed in
        aerospace, chips and cryptography.
      </>
    ),
    s03b: (
      <>
        <span className="text-foreground">Automated</span> means the engine does that work itself.
        We use Z3 and its Spacer engine: you give it the rule and the system, and it searches for a
        proof — including the inductive invariant, the property that stays true at every step — or
        for a counterexample. No mathematician in the loop. A solver can return three kinds of
        answer:
      </>
    ),
    answers: [
      {
        k: "PROVEN",
        t: "No case breaks the rule.",
        b: "Not “we didn’t find one.” The solver shows none can exist — the technical word is UNSAT, unsatisfiable.",
      },
      {
        k: "COUNTEREXAMPLE",
        t: "Here is the exact case.",
        b: "The inputs, the state, the step where the rule fails. Concrete enough to replay and fix.",
      },
      {
        k: "UNDECIDED",
        t: "Not settled.",
        b: "Some questions are too hard to close in the time given. Undecided is not a pass, and an honest system never counts it as one.",
      },
    ],

    s04: "04 — How it fits together in Ironproof",
    s04Title: "From a proposed action to a proof you hold.",
    s04Lead:
      "One engine, the same steps on every surface. The model can only ever appear in the first one.",
    steps: [
      {
        n: "01 · PROPOSE",
        t: "An AI agent asks to act",
        b: "A refund, a payment, an access grant, a deployment. The request may come from a model — that is the neural part, and it is where mistakes and manipulation start.",
      },
      {
        n: "02 · COMPILE",
        t: "Your rule becomes logic",
        b: "Your policy is compiled once into the form the solver reads and the form the runtime enforces. One compiler, so the two cannot quietly disagree.",
      },
      {
        n: "03 · PROVE",
        t: "The engine decides",
        b: "The solver proves the rule holds across sequences of actions, or returns the counterexample. At run time every action is checked against that same compiled rule, and nothing executes without a passing decision.",
      },
      {
        n: "04 · RE-CHECK",
        t: "Don’t trust the search",
        b: "The invariant the solver found is re-checked in a fresh solver before anything is sealed. Finding a proof and checking it are kept apart on purpose.",
      },
      {
        n: "05 · SEAL",
        t: "Post-quantum record",
        b: "The decision and its proof are hash-chained and signed with Ed25519 and ML-DSA-65 (FIPS 204). Any later edit is detectable.",
      },
      {
        n: "06 · VERIFY",
        t: "Offline, without us",
        b: "Your auditor re-checks the sealed record with an independent verifier, without ever contacting Ironproof.",
      },
    ],

    s05: "05 — Where the model sits, exactly",
    s05Title: (
      <>
        On the decision path, <span className="metal-shine">no language model votes.</span>
      </>
    ),
    s05a: (
      <>
        The production path that authorizes an agent&apos;s action calls no language model at all.
        In our research tribunal, a model may read the request and give its opinion on intent — that
        opinion is recorded in the sealed record and{" "}
        <span className="text-foreground">never counted</span>. The same request, in the same state,
        under the same policy, gets the same verdict whether the model agreed, disagreed, or was
        unreachable.
      </>
    ),
    s05b: (
      <>
        The decision itself is made by evaluating your rules, and that shortcut is licensed by a
        theorem checked in Lean 4: deciding by evaluation and deciding by the solver give the same
        answer for every policy and every action. The neural side brings understanding. The symbolic
        side keeps the final word.
      </>
    ),

    s06: "06 — What it does not do",
    s06Title: "The limits, stated up front.",
    limits: [
      {
        k: "SPECIFICATION",
        t: "A proof is only as good as the rule.",
        b: "The engine proves your system obeys the rule you wrote. Whether that rule says what you meant is a human question — today it is the hardest part of the work, and we do it with you.",
      },
      {
        k: "SCOPE",
        t: "Proven within a class, not everywhere.",
        b: "Each proof covers a precisely stated class of actions and rules. Outside that class, it says nothing — and the record states the boundary.",
      },
      {
        k: "THE MODEL",
        t: "We don’t make the model safe.",
        b: "A compromised or confused model can still ask for the wrong thing. We make sure it cannot get it unless the rule allows it. Hardening the model itself is separate work.",
      },
    ],

    s07: "07 — Glossary",
    s07Title: "The words, in one line each.",
    glossary: [
      { t: "Neural network", d: "A model that learns patterns from data. Language models are neural networks." },
      { t: "Symbolic reasoning", d: "Computation on explicit rules and logic, where every step can be checked." },
      { t: "Neuro-symbolic", d: "A system that combines both, each where it is reliable." },
      { t: "Formal verification", d: "A mathematical proof that a system obeys a rule for every input." },
      { t: "SMT solver", d: "The engine that decides whether a logical formula can be satisfied. Z3 is one." },
      { t: "UNSAT", d: "“Unsatisfiable”: no case violates the rule. The answer a proof rests on." },
      { t: "Counterexample", d: "A concrete case where the rule breaks." },
      { t: "Inductive invariant", d: "A property true at the start and preserved by every step — so true forever." },
      { t: "Post-quantum seal", d: "A signature designed to stay unforgeable even against future quantum computers." },
    ],

    provableTag: "NEXT — THE CATEGORY",
    provableTitle: "What is Provable AI?",
    provableBody:
      "Why detection is not proof, what a sealed certificate contains, and what it does not cover.",

    s08Phrase: "A model that is never wrong does not exist. A system where its mistakes cannot pass, can.",

    ctaTitle: "See the engine on one of your workflows",
    ctaLead: "Pick one action your agents take. We write the rule with you, prove it, and hand you the record.",
    logoTitle: "Ironproof",
  },

  fr: {
    eyebrow: "NEURO-SYMBOLIQUE",
    h1: (
      <>
        Le modèle propose. <span className="metal-shine">La preuve décide.</span>
      </>
    ),
    heroLead: (
      <>
        L’IA neuro-symbolique réunit deux formes d’intelligence : un{" "}
        <span className="metal-text">modèle neuronal</span> qui lit et écrit comme une personne, et un{" "}
        <span className="metal-text">moteur symbolique</span> qui raisonne comme un mathématicien.
        Cette page explique les deux, ce qu’est un moteur de vérification formelle automatisée, et
        où chacun se trouve exactement dans Ironproof.
      </>
    ),

    archTag: "ARCHITECTURE",
    archSrc: "/media/architecture-fr.webp",
    archAlt:
      "Architecture d’Ironproof. Trois entrées (une action d’agent avec sa politique, un programme COBOL à migrer, une faille C à corriger) entrent dans un système d’exploitation cognitif qui encadre l’agent d’ingénierie : mémoire persistante, règles apprises des erreurs passées, aucun rapport sans commande et sortie. À l’intérieur, un moteur de vérification neuro-symbolique : le modèle propose, le solveur tranche, les contre-exemples reviennent. Chaque résultat est un de trois verdicts : tient, tombe, non couvert. Puis : appliquer avant l’exécution, sceller par une signature post-quantique, vérifier hors ligne sans nous faire confiance.",
    archCaption:
      "Tout le système sur une page. Le modèle n’a jamais le dernier mot : le solveur l’a, et le sceau permet à n’importe qui de le vérifier après coup.",

    s01: "01 — Deux formes d’intelligence",
    s01Title: "L’une apprend par l’exemple. L’autre suit les règles jusqu’au bout.",
    s01Lead:
      "Chacune est forte là où l’autre est faible. C’est toute la raison de les combiner.",
    neural: {
      k: "NEURONAL",
      t: "Le modèle de langage",
      b: "Apprend des motifs à partir d’immenses quantités de texte. Il comprend une demande floue, écrit du code, résume un contrat, s’adapte à ce qu’il n’a jamais vu.",
    },
    symbolic: {
      k: "SYMBOLIQUE",
      t: "Le solveur",
      b: "Travaille sur des règles exactes écrites en logique. Devant une règle et un système, il examine tous les cas possibles — pas un échantillon — et rend une réponse que n’importe qui peut revérifier.",
    },
    strengthLabel: "Fort pour",
    weaknessLabel: "Faible pour",
    neuralGood: "Le langage, l’ambiguïté, la vitesse, l’étendue.",
    neuralBad:
      "Les garanties. Il est probabiliste : il peut se tromper avec assurance, et on peut le faire changer d’avis.",
    symbolicGood: "La certitude. Sa réponse vaut pour tous les cas de la classe examinée.",
    symbolicBad: "Lire le monde. Il lui faut une question déjà écrite avec précision.",

    s02: "02 — Neuro-symbolique",
    s02Title: (
      <>
        Laissez le modèle créer. <span className="metal-shine">Ne le laissez jamais juger.</span>
      </>
    ),
    s02a: (
      <>
        Un système neuro-symbolique place chaque partie là où elle est fiable. Le côté neuronal
        s’occupe du langage : il propose une action, une traduction, une réponse candidate. Le côté
        symbolique la confronte à des règles fixées d’avance, et{" "}
        <span className="text-foreground">seul le côté symbolique peut dire oui</span>.
      </>
    ),
    s02b: (
      <>
        L’ordre compte. Un modèle qui en note un autre reste un modèle — on peut l’influencer, le
        convaincre, ou il peut simplement se tromper. Un solveur ne se laisse pas convaincre : soit la
        règle tient dans tous les cas, soit il rend le cas exact où elle casse.
      </>
    ),
    s02Quote:
      "L’intelligence sans preuve est une supposition. La preuve sans intelligence ne quitte jamais le labo. Ensemble, elles livrent.",

    s03: "03 — Le moteur",
    s03Title: "Ce qu’est un moteur de vérification formelle automatisée.",
    s03a: (
      <>
        La <span className="text-foreground">vérification formelle</span>, c’est prouver par les
        mathématiques qu’un système respecte une règle — pour toutes les entrées, pas seulement celles
        qu’on a testées. Pendant des décennies, il fallait des spécialistes qui écrivaient les preuves
        à la main ; c’est pourquoi elle est restée dans l’aérospatial, les puces et la cryptographie.
      </>
    ),
    s03b: (
      <>
        <span className="text-foreground">Automatisée</span> veut dire que le moteur fait ce travail
        lui-même. Nous utilisons Z3 et son moteur Spacer : on lui donne la règle et le système, et il
        cherche une preuve — y compris l’invariant inductif, la propriété qui reste vraie à chaque
        étape — ou un contre-exemple. Aucun mathématicien dans la boucle. Un solveur peut rendre trois
        sortes de réponse :
      </>
    ),
    answers: [
      {
        k: "PROUVÉ",
        t: "Aucun cas ne viole la règle.",
        b: "Pas « nous n’en avons pas trouvé ». Le solveur montre qu’il ne peut pas en exister — le mot technique est UNSAT, insatisfaisable.",
      },
      {
        k: "CONTRE-EXEMPLE",
        t: "Voici le cas exact.",
        b: "Les entrées, l’état, l’étape où la règle tombe. Assez concret pour le rejouer et corriger.",
      },
      {
        k: "INDÉCIS",
        t: "Pas tranché.",
        b: "Certaines questions sont trop difficiles à fermer dans le temps donné. Indécis n’est pas un succès, et un système honnête ne le compte jamais comme tel.",
      },
    ],

    s04: "04 — Comment tout s’assemble dans Ironproof",
    s04Title: "D’une action proposée à une preuve entre vos mains.",
    s04Lead:
      "Un seul moteur, les mêmes étapes sur chaque surface. Le modèle ne peut apparaître qu’à la première.",
    steps: [
      {
        n: "01 · PROPOSER",
        t: "Un agent IA demande à agir",
        b: "Un remboursement, un paiement, un accès, un déploiement. La demande peut venir d’un modèle — c’est la partie neuronale, et c’est là que naissent les erreurs et les manipulations.",
      },
      {
        n: "02 · COMPILER",
        t: "Votre règle devient logique",
        b: "Votre politique est compilée une seule fois vers la forme que lit le solveur et celle qu’applique l’exécution. Un seul compilateur, pour que les deux ne puissent pas diverger en silence.",
      },
      {
        n: "03 · PROUVER",
        t: "Le moteur tranche",
        b: "Le solveur prouve que la règle tient sur les séquences d’actions, ou rend le contre-exemple. À l’exécution, chaque action est confrontée à cette même règle compilée, et rien ne s’exécute sans décision favorable.",
      },
      {
        n: "04 · REVÉRIFIER",
        t: "Ne pas faire confiance à la recherche",
        b: "L’invariant trouvé par le solveur est revérifié dans un solveur neuf avant tout scellement. Trouver une preuve et la vérifier restent séparés, exprès.",
      },
      {
        n: "05 · SCELLER",
        t: "Registre post-quantique",
        b: "La décision et sa preuve sont chaînées par hachage et signées Ed25519 et ML-DSA-65 (FIPS 204). Toute modification ultérieure se détecte.",
      },
      {
        n: "06 · VÉRIFIER",
        t: "Hors ligne, sans nous",
        b: "Votre auditeur revérifie le registre scellé avec un vérificateur indépendant, sans jamais contacter Ironproof.",
      },
    ],

    s05: "05 — Où se trouve le modèle, exactement",
    s05Title: (
      <>
        Sur le chemin de décision, <span className="metal-shine">aucun modèle de langage ne vote.</span>
      </>
    ),
    s05a: (
      <>
        Le chemin de production qui autorise l’action d’un agent n’appelle aucun modèle de langage.
        Dans notre tribunal de recherche, un modèle peut lire la demande et donner son avis sur
        l’intention — cet avis est consigné dans le registre scellé et{" "}
        <span className="text-foreground">n’est jamais compté</span>. La même demande, dans le même
        état, sous la même politique, reçoit le même verdict, que le modèle soit d’accord, en
        désaccord ou injoignable.
      </>
    ),
    s05b: (
      <>
        La décision elle-même se prend en évaluant vos règles, et ce raccourci est autorisé par un
        théorème vérifié en Lean 4 : décider par évaluation et décider par le solveur donnent la même
        réponse pour toute politique et toute action. Le côté neuronal apporte la compréhension. Le
        côté symbolique garde le dernier mot.
      </>
    ),

    s06: "06 — Ce qu’il ne fait pas",
    s06Title: "Les limites, dites d’entrée de jeu.",
    limits: [
      {
        k: "SPÉCIFICATION",
        t: "Une preuve ne vaut que la règle.",
        b: "Le moteur prouve que votre système respecte la règle écrite. Que cette règle dise ce que vous vouliez dire est une question humaine — c’est aujourd’hui la partie la plus difficile du travail, et nous la faisons avec vous.",
      },
      {
        k: "PORTÉE",
        t: "Prouvé dans une classe, pas partout.",
        b: "Chaque preuve couvre une classe d’actions et de règles énoncée avec précision. Hors de cette classe, elle ne dit rien — et le registre en déclare la frontière.",
      },
      {
        k: "LE MODÈLE",
        t: "Nous ne rendons pas le modèle sûr.",
        b: "Un modèle compromis ou confus peut encore demander la mauvaise chose. Nous faisons en sorte qu’il ne puisse pas l’obtenir si la règle ne le permet pas. Durcir le modèle lui-même est un autre travail.",
      },
    ],

    s07: "07 — Lexique",
    s07Title: "Les mots, en une ligne chacun.",
    glossary: [
      { t: "Réseau neuronal", d: "Un modèle qui apprend des motifs à partir de données. Les modèles de langage en sont." },
      { t: "Raisonnement symbolique", d: "Un calcul sur des règles et une logique explicites, dont chaque étape se vérifie." },
      { t: "Neuro-symbolique", d: "Un système qui combine les deux, chacun là où il est fiable." },
      { t: "Vérification formelle", d: "Une preuve mathématique qu’un système respecte une règle pour toute entrée." },
      { t: "Solveur SMT", d: "Le moteur qui décide si une formule logique peut être satisfaite. Z3 en est un." },
      { t: "UNSAT", d: "« Insatisfaisable » : aucun cas ne viole la règle. La réponse sur laquelle repose une preuve." },
      { t: "Contre-exemple", d: "Un cas concret où la règle tombe." },
      { t: "Invariant inductif", d: "Une propriété vraie au départ et préservée par chaque étape — donc vraie pour toujours." },
      { t: "Sceau post-quantique", d: "Une signature conçue pour rester infalsifiable même face aux futurs ordinateurs quantiques." },
    ],

    provableTag: "ENSUITE — LA CATÉGORIE",
    provableTitle: "Qu’est-ce que l’IA prouvable ?",
    provableBody:
      "Pourquoi détecter n’est pas prouver, ce que contient un certificat scellé, et ce qu’il ne couvre pas.",

    s08Phrase:
      "Un modèle qui ne se trompe jamais n’existe pas. Un système où ses erreurs ne passent pas, oui.",

    ctaTitle: "Voyez le moteur sur l’un de vos processus",
    ctaLead:
      "Choisissez une action que prennent vos agents. Nous écrivons la règle avec vous, nous la prouvons, et nous vous remettons le registre.",
    logoTitle: "Ironproof",
  },
};
