import type { L } from "./i18n";

/*
 * Copy for /provable-ai, in both languages.
 *
 * Kept out of the component for the same reason research-copy.ts is: the page
 * is almost entirely prose, and a 500-line component whose every other line is
 * a sentence cannot be read as a layout any more.
 *
 * The French is a translation of an argument, not of words. Two things were
 * deliberately NOT softened, because the whole page is an exercise in stating
 * limits: "we prove the configuration stays under the limit, not that the limit
 * is the right one", and the six-axis composition paragraph, which distinguishes
 * five results resting on a discovered inductive invariant from one that closes
 * by direct contradiction. If a translation blurs that distinction it has
 * removed the honesty the paragraph exists for.
 */

export type NotItem = { n: string; d: string };
export type LimitItem = { t: string; b: string; roadmap?: boolean };
export type MaturityItem = { t: string; s: string };

export type ProvableAICopy = {
  eyebrow: string;
  h1: string;
  heroLead: React.ReactNode;

  s01: string;
  s01Title: React.ReactNode;
  s01a: React.ReactNode;
  s01b: React.ReactNode;
  s01Quote: string;
  researchTag: string;
  researchTitle: React.ReactNode;
  researchBody: string;

  s02: string;
  s02Title: string;
  s02a: React.ReactNode;
  s02b: React.ReactNode;

  s03: string;
  s03Title: string;
  s03Lead: string;
  layer1: string;
  layer1Title: string;
  layer1Body: string;
  layer2: string;
  layer2Title: string;
  layer2Body: React.ReactNode;
  step1: string;
  step1Title: string;
  step1Body: string;
  step2: string;
  step2Title: string;
  step2Body: string;
  step3: string;
  step3Title: string;
  step3Body: string;

  s04: string;
  s04Title: string;
  s04a: React.ReactNode;
  s04b: React.ReactNode;

  s04bis: string;
  s04bTitle: React.ReactNode;
  s04bA: React.ReactNode;
  s04bB: React.ReactNode;
  s04bQuote: string;

  s05: string;
  s05Title: string;
  s05a: React.ReactNode;
  s05b: React.ReactNode;

  s06: string;
  s06Title: string;
  notItems: readonly NotItem[];

  s07: string;
  s07Title: string;
  limits: readonly LimitItem[];

  s08: string;
  s08Title: string;
  s08Lead: React.ReactNode;
  s08Foot: string;

  s09: string;
  s09Title: string;
  s09Lead: string;
  maturity: readonly MaturityItem[];

  s10: string;
  s10Phrase: string;

  ctaTitle: string;
  ctaLead: string;
  logoTitle: string;
  footer: string;
};

export const PROVABLE_AI_COPY: L<ProvableAICopy> = {
  en: {
    eyebrow: "PROVABLE AI",
    h1: "What is Provable AI?",
    heroLead: (
      <>
        A category name for what regulated AI has been missing: the ability to prove —{" "}
        <span className="metal-text">mathematically and cryptographically</span> — that an AI agent
        could not have crossed the line you drew, and to hand you an{" "}
        <span className="metal-text">artifact you verify yourself</span>, without trusting the vendor
        who produced it.
      </>
    ),

    s01: "01 — The question nobody could answer",
    s01Title: (
      <>
        Can you prove your agent <span className="metal-shine">couldn&apos;t</span>?
      </>
    ),
    s01a: (
      <>
        Ask a monitoring vendor whether an AI agent stayed inside its rules and the honest answer is
        a version of{" "}
        <span className="text-foreground">we watched, and nothing looked wrong</span>. Guardrails,
        red-teaming, evals, an LLM grading another LLM — these observe, sample, and describe. They
        tell you what was probably fine under the conditions you happened to test.
      </>
    ),
    s01b: (
      <>
        None of them prove. A proof is not a narrative about behavior and not a statistical pattern
        around it. It is a formal guarantee that a specified thing{" "}
        <span className="text-foreground">cannot happen</span> — over every case in a class, not the
        cases you sampled.
      </>
    ),
    s01Quote:
      "Detection tells you nothing looked wrong. A proof tells you the wrong thing is impossible.",
    researchTag: "RESEARCH — THE NUMBER BEHIND THAT SENTENCE",
    researchTitle: <>The detection window was 5.5&times; longer than the whole attack</>,
    researchBody:
      "Four 2026 agent containment failures, aggregated — with the derived figures, the arithmetic, and the limitations stated in full.",

    s02: "02 — The reframe",
    s02Title: "Not “probably safe.” Provably impossible — and you leave with the proof.",
    s02a: (
      <>
        A model that judges a model is <span className="text-foreground">promptable</span>: it can be
        talked out of its verdict, because it is itself a probabilistic system. A solver is not. When
        we prove a rule holds, we are not scoring a trajectory — we are showing that no execution in
        that class violates the rule, for an unbounded number of steps.
      </>
    ),
    s02b: (
      <>
        The second half is the part the market does not offer today. Formal verification exists — but
        it lives <span className="text-foreground">inside</span> a cloud you cannot audit, or it
        arrives as a <span className="text-foreground">consulting report</span>. Either way you do
        not walk away holding the proof. We hand you the artifact, and an independent verifier
        re-checks it offline.
      </>
    ),

    s03: "03 — What “provable” means, precisely",
    s03Title: "Two layers on every surface.",
    s03Lead:
      "Provable AI is not a vibe. On each surface we run — agent actions, code, cryptography — there are two distinct layers, and only one of them is the moat.",
    layer1: "LAYER 1 · DETECTION",
    layer1Title: "Broad. Probabilistic.",
    layer1Body:
      "Flags what looks wrong across everything. Useful, and everyone in the field does some version of it. It can miss, and it can be argued with.",
    layer2: "LAYER 2 · PROOF",
    layer2Title: "Narrow. Absolute.",
    layer2Body: (
      <>
        On the provable class, <span className="text-foreground">UNSAT</span> — no case violates the
        rule. Not “we didn&apos;t find one.” None exists, and the artifact says so in a form anyone
        can re-check.
      </>
    ),
    step1: "01 · PROVE",
    step1Title: "Z3 / Spacer",
    step1Body:
      "The solver synthesizes the inductive invariant itself and proves the rule holds over every trajectory.",
    step2: "02 · SEAL",
    step2Title: "Post-quantum",
    step2Body:
      "SHA3-512 hash chain, signed Ed25519 + ML-DSA-65 (FIPS 204). Tamper is detectable.",
    step3: "03 · VERIFY",
    step3Title: "Offline",
    step3Body:
      "An independent verifier re-checks the sealed artifact without ever contacting us.",

    s04: "04 — How the proof is built",
    s04Title: "We don't ask you to trust the discovery.",
    s04a: (
      <>
        A solver that <span className="text-foreground">finds</span> an invariant is convenient but
        not evidence — you would be trusting the search. So before anything is sealed, we re-extract
        the inductive invariant and discharge its verification conditions as{" "}
        <span className="text-foreground">UNSAT in a fresh solver</span>, derived from the proof
        obligation itself. Discovery and re-check are separated on purpose.
      </>
    ),
    s04b: (
      <>
        The policy the prover reads and the policy the runtime enforces come from{" "}
        <span className="text-foreground">one compiler</span>, not two hand-copied encodings — a
        differential check fails the build if they ever diverge. Two artifacts that must agree, with
        something that breaks when they don&apos;t.
      </>
    ),

    s04bis: "04b — The honest surface",
    s04bTitle: (
      <>
        What we <span className="metal-shine">do</span> ask you to trust, named.
      </>
    ),
    s04bA: (
      <>
        The cryptographic base is <span className="text-foreground">NIST standards</span> — SHA3-512,
        Ed25519, ML-DSA-65 (FIPS 204) — not cryptography of our own. Those assumptions are negligible
        in the security parameter.
      </>
    ),
    s04bB: (
      <>
        The rest we name rather than hide: the solver&apos;s UNSAT decision (mitigated by the
        independent re-check above), that the model faithfully encodes the policy (held by the
        single-compiler discipline), and that the declared threshold is{" "}
        <span className="text-foreground">your firm&apos;s chosen number</span> — we prove the
        configuration stays under the limit, not that the limit is the right one.
      </>
    ),
    s04bQuote:
      "A limitation you state is an asset. The same limitation left unspoken is the thing that detonates in review.",

    s05: "05 — The artifact",
    s05Title: "A sealed certificate you can carry out the door.",
    s05a: (
      <>
        Each governed decision emits a self-contained record binding{" "}
        <span className="text-foreground">
          identity, scope, authority, the decision, the proof, and the resulting state change
        </span>
        . Records accumulate into an append-only, hash-chained stream — editing one entry breaks
        every entry after it.
      </>
    ),
    s05b: (
      <>
        The seal carries a time witness, and it is honest about how strong that witness is: it
        reports one of <span className="text-foreground">bounded</span>, one-sided, self-declared, or
        none — so “consistent with the rules at that time” is backed, never assumed. If the network
        is down, the seal degrades honestly instead of faking a timestamp.
      </>
    ),

    s06: "06 — What it isn't",
    s06Title: "Provable AI is not a rebrand.",
    notItems: [
      {
        n: "Not monitoring",
        d: "Observability describes execution for debugging. It doesn't authorize, and it doesn't prove. You can have both — they are different things.",
      },
      {
        n: "Not an LLM judge",
        d: "A model grading a model is probabilistic and promptable. A solver's UNSAT can't be talked out of its answer.",
      },
      {
        n: "Not a TEE",
        d: "An enclave attests that code ran intact. It can still take an unauthorized sequence of actions. We attest to the shape of the trajectory itself.",
      },
      {
        n: "Not blockchain",
        d: "No tokens, no public chain, no minting. Cryptographic integrity used where it belongs — inside an enterprise runtime.",
      },
      {
        n: "Not planner safety",
        d: "Prompt injection can compromise the planner. We are confinement: even a compromised planner can't produce a proof-valid execution outside its contract. Upstream hardening is separate and necessary.",
      },
    ],

    s07: "07 — What it does not solve",
    s07Title: "Sharp primitive, sharp edges.",
    limits: [
      {
        t: "Valid under policy is not good policy",
        b: "We prove the agent stayed inside the boundary the policy fixed. We say nothing about whether that boundary was well chosen. A policy that authorizes harm yields a valid proof of harmful-but-authorized execution.",
      },
      {
        t: "A proof cannot confer authority",
        b: "We prove the action stayed inside the policy in force, and that the policy is not operable until a designated quorum dual-signs its exact fingerprint — weaken a guard after sign-off and the schema stops being enforceable. What we cannot establish sits upstream of any code: that the people holding those keys were entitled to hold them, that their mandate is still current and in scope, or that whoever refuses to sign is protected when they do. A gate can be made unbypassable. The right to open it comes from somewhere else.",
      },
      {
        t: "Authorized is not safe",
        b: "A fully authorized action can still be the wrong action in the world. We govern the trajectory, not the wisdom of the capabilities you granted.",
      },
      {
        t: "In-process hostile code is physics",
        b: "Arbitrary hostile code sharing the runtime can call an effect directly. That is true for everyone in this category — we name it in the code rather than paper over it.",
      },
      {
        t: "Composition has a frontier — and it moved",
        b: "Six axes of structuring are proven closed over every sequence rather than a large sample: amount, time — at arbitrary window width — number of accounts — at unbounded fan-out width — combined action types, money routed through intermediary entities at arbitrary hop depth, and velocity, proven with all four amount controls in force, because the burst is the case they all approve. Five rest on an inductive invariant the solver had to discover; the fixed-window result closes by direct contradiction instead. We say which is which rather than let one word cover both.",
      },
      {
        t: "A proof cannot source what you cannot see",
        b: "The layering proof closes the route on one condition: that value can be attributed to its origin. Whether that attribution is obtainable across institutions is a question for data and for law, not for a solver — a different question, with a different owner. Concurrent origins sharing an intermediary, a blended pool attributed pro rata, and rate measured per entity across accounts stay open. Behavioural anomaly — “unusual for this customer” — is not a threshold property at all, and nothing here addresses it.",
        roadmap: true,
      },
    ],

    s08: "08 — Regulatory mapping",
    s08Title: "Answer examiner questions from the artifact.",
    s08Lead: (
      <>
        The proof-and-seal structure maps onto current supervisory expectations for agentic AI — the
        enforceable, machine-checkable subset, not a marketing translation. A firm answers “show me
        it couldn&apos;t” from the sealed record instead of from a narrative.
      </>
    ),
    s08Foot:
      "Wedge: regulated Canadian financial services. Mapping is scoped to the machine-enforceable control objectives, not a claim of full-framework coverage.",

    s09: "09 — Ironproof's role",
    s09Title: "One engine. Several surfaces. Honest about each.",
    s09Lead:
      "One solver-and-seal engine drives every surface. We state maturity per surface rather than blur them together.",
    maturity: [
      {
        t: "Proof on agent actions",
        s: "the boundary an agent can't cross — the mainline engine",
      },
      {
        t: "Post-quantum seal",
        s: "SHA3-512 + Ed25519 + ML-DSA-65, hash-chained on every governed decision",
      },
      {
        t: "Proof on code",
        s: "real bugs, runnable PoC, sealed reproduction — a credibility wedge, not the headline",
      },
      {
        t: "Public offline verifier + canonical spec",
        s: "the “verify it yourself” endpoint — a sealed dossier checks byte-for-byte with no network and no Ironproof code",
      },
      {
        t: "Publicly anchored root of trust",
        s: "the signing root is published at two independent names you can look up yourself — substituting it means changing both",
      },
    ],

    s10: "10 — The phrase, one more time",
    s10Phrase:
      "We prove what can be proven, seal it post-quantum, and anyone verifies it offline — without trusting us.",

    ctaTitle: "Prove your infrastructure.",
    ctaLead:
      "Request access and turn policy into enforceable, independently verifiable guarantees.",
    logoTitle: "Ironproof monogram",
    footer: "Automated formal verification for critical software and infrastructure.",
  },

  fr: {
    eyebrow: "IA PROUVABLE",
    h1: "Qu’est-ce que l’IA prouvable ?",
    heroLead: (
      <>
        Un nom de catégorie pour ce qui manquait à l’IA en milieu réglementé : pouvoir prouver —{" "}
        <span className="metal-text">mathématiquement et cryptographiquement</span> — qu’un agent IA
        n’a pas pu franchir la ligne que vous avez tracée, et vous remettre un{" "}
        <span className="metal-text">artefact que vous vérifiez vous-même</span>, sans faire
        confiance au fournisseur qui l’a produit.
      </>
    ),

    s01: "01 — La question à laquelle personne ne pouvait répondre",
    s01Title: (
      <>
        Pouvez-vous prouver que votre agent <span className="metal-shine">n’a pas pu</span> ?
      </>
    ),
    s01a: (
      <>
        Demandez à un fournisseur de surveillance si un agent IA est resté dans ses règles, et la
        réponse honnête est une variante de{" "}
        <span className="text-foreground">on a regardé, et rien n’avait l’air anormal</span>.
        Garde-fous, red teaming, évaluations, un LLM qui note un autre LLM — tout cela observe,
        échantillonne et décrit. Cela vous dit ce qui était probablement correct dans les conditions
        que vous avez testées.
      </>
    ),
    s01b: (
      <>
        Aucun ne prouve. Une preuve n’est ni un récit sur le comportement, ni un motif statistique
        autour de lui. C’est une garantie formelle qu’une chose précise{" "}
        <span className="text-foreground">ne peut pas se produire</span> — sur tous les cas d’une
        classe, pas sur ceux que vous avez échantillonnés.
      </>
    ),
    s01Quote:
      "La détection vous dit que rien n’avait l’air anormal. Une preuve vous dit que la chose anormale est impossible.",
    researchTag: "RECHERCHE — LE CHIFFRE DERRIÈRE CETTE PHRASE",
    researchTitle: <>La fenêtre de détection a duré 5,5&times; plus longtemps que toute l’attaque</>,
    researchBody:
      "Quatre échecs de confinement d’agents en 2026, agrégés — avec les chiffres dérivés, le calcul et les limites énoncées en entier.",

    s02: "02 — Le recadrage",
    s02Title:
      "Pas « probablement sûr ». Prouvé impossible — et vous repartez avec la preuve.",
    s02a: (
      <>
        Un modèle qui juge un modèle est <span className="text-foreground">influençable</span> : on
        peut lui faire changer de verdict, parce qu’il est lui-même un système probabiliste. Un
        solveur, non. Quand nous prouvons qu’une règle tient, nous ne notons pas une trajectoire —
        nous montrons qu’aucune exécution de cette classe ne viole la règle, pour un nombre d’étapes
        non borné.
      </>
    ),
    s02b: (
      <>
        C’est la seconde moitié que le marché n’offre pas aujourd’hui. La vérification formelle
        existe — mais elle vit <span className="text-foreground">à l’intérieur</span> d’un nuage que
        vous ne pouvez pas auditer, ou elle arrive sous forme de{" "}
        <span className="text-foreground">rapport de consultation</span>. Dans les deux cas, vous ne
        repartez pas avec la preuve en main. Nous vous remettons l’artefact, et un vérificateur
        indépendant le recontrôle hors ligne.
      </>
    ),

    s03: "03 — Ce que « prouvable » veut dire, précisément",
    s03Title: "Deux couches sur chaque surface.",
    s03Lead:
      "L’IA prouvable n’est pas une impression. Sur chaque surface où nous intervenons — actions d’agents, code, cryptographie — il y a deux couches distinctes, et une seule est la vraie barrière.",
    layer1: "COUCHE 1 · DÉTECTION",
    layer1Title: "Large. Probabiliste.",
    layer1Body:
      "Signale ce qui a l’air anormal, partout. Utile, et tout le monde dans le domaine en fait une version. Ça peut rater, et ça se discute.",
    layer2: "COUCHE 2 · PREUVE",
    layer2Title: "Étroite. Absolue.",
    layer2Body: (
      <>
        Sur la classe prouvable, <span className="text-foreground">UNSAT</span> — aucun cas ne viole
        la règle. Pas « on n’en a pas trouvé ». Il n’en existe aucun, et l’artefact le dit
        sous une forme que n’importe qui peut recontrôler.
      </>
    ),
    step1: "01 · PROUVER",
    step1Title: "Z3 / Spacer",
    step1Body:
      "Le solveur synthétise lui-même l’invariant inductif et prouve que la règle tient sur toutes les trajectoires.",
    step2: "02 · SCELLER",
    step2Title: "Post-quantique",
    step2Body:
      "Chaîne d’empreintes SHA3-512, signée Ed25519 + ML-DSA-65 (FIPS 204). Toute altération est détectable.",
    step3: "03 · VÉRIFIER",
    step3Title: "Hors ligne",
    step3Body:
      "Un vérificateur indépendant recontrôle l’artefact scellé sans jamais nous contacter.",

    s04: "04 — Comment la preuve est construite",
    s04Title: "Nous ne vous demandons pas de croire la découverte.",
    s04a: (
      <>
        Un solveur qui <span className="text-foreground">trouve</span> un invariant est commode mais
        n’est pas une preuve — il faudrait croire la recherche. Alors avant tout scellement, nous
        ré-extrayons l’invariant inductif et déchargeons ses conditions de vérification en{" "}
        <span className="text-foreground">UNSAT dans un solveur neuf</span>, dérivées de l’obligation
        de preuve elle-même. La découverte et le recontrôle sont séparés exprès.
      </>
    ),
    s04b: (
      <>
        La politique que le prouveur lit et la politique que le runtime applique viennent d’{" "}
        <span className="text-foreground">un seul compilateur</span>, pas de deux encodages recopiés
        à la main — un contrôle différentiel fait échouer la compilation si les deux divergent.
        Deux artefacts qui doivent s’accorder, avec quelque chose qui casse quand ce n’est pas le
        cas.
      </>
    ),

    s04bis: "04b — La surface honnête",
    s04bTitle: (
      <>
        Ce que nous vous demandons <span className="metal-shine">bel et bien</span> de croire, nommé.
      </>
    ),
    s04bA: (
      <>
        La base cryptographique, ce sont les{" "}
        <span className="text-foreground">standards du NIST</span> — SHA3-512, Ed25519, ML-DSA-65
        (FIPS 204) — pas de la cryptographie maison. Ces hypothèses sont négligeables dans le
        paramètre de sécurité.
      </>
    ),
    s04bB: (
      <>
        Le reste, nous le nommons au lieu de le cacher : la décision UNSAT du solveur (atténuée par le
        recontrôle indépendant ci-dessus), le fait que le modèle encode fidèlement la politique (tenu
        par la discipline du compilateur unique), et le fait que le seuil déclaré est{" "}
        <span className="text-foreground">le chiffre choisi par votre entreprise</span> — nous
        prouvons que la configuration reste sous la limite, pas que la limite est la bonne.
      </>
    ),
    s04bQuote:
      "Une limite que vous énoncez est un atout. La même limite passée sous silence est ce qui explose en revue.",

    s05: "05 — L’artefact",
    s05Title: "Un certificat scellé que vous emportez avec vous.",
    s05a: (
      <>
        Chaque décision gouvernée émet une trace autonome qui lie{" "}
        <span className="text-foreground">
          l’identité, la portée, l’autorité, la décision, la preuve et le changement d’état qui en
          résulte
        </span>
        . Les traces s’accumulent en un flux append-only chaîné par empreintes — modifier une entrée
        casse toutes celles qui suivent.
      </>
    ),
    s05b: (
      <>
        Le sceau porte un témoin temporel, et il est honnête sur la force de ce témoin : il annonce
        l’un de <span className="text-foreground">borné</span>, unilatéral, auto-déclaré ou aucun —
        de sorte que « conforme aux règles à ce moment-là » est étayé, jamais supposé. Si le
        réseau est coupé, le sceau se dégrade honnêtement au lieu de simuler un horodatage.
      </>
    ),

    s06: "06 — Ce que ce n’est pas",
    s06Title: "L’IA prouvable n’est pas un changement d’étiquette.",
    notItems: [
      {
        n: "Pas de la surveillance",
        d: "L’observabilité décrit l’exécution pour déboguer. Elle n’autorise pas, et elle ne prouve pas. Vous pouvez avoir les deux — ce sont des choses différentes.",
      },
      {
        n: "Pas un LLM juge",
        d: "Un modèle qui note un modèle est probabiliste et influençable. On ne fait pas changer d’avis l’UNSAT d’un solveur.",
      },
      {
        n: "Pas une enclave sécurisée",
        d: "Une enclave atteste que le code s’est exécuté intact. Il peut quand même prendre une séquence d’actions non autorisée. Nous attestons de la forme de la trajectoire elle-même.",
      },
      {
        n: "Pas de la chaîne de blocs",
        d: "Aucun jeton, aucune chaîne publique, aucune émission. L’intégrité cryptographique utilisée là où elle a sa place — dans un runtime d’entreprise.",
      },
      {
        n: "Pas la sûreté du planificateur",
        d: "Une injection d’invite peut compromettre le planificateur. Nous sommes le confinement : même compromis, un planificateur ne peut pas produire une exécution valide au regard de la preuve hors de son contrat. Le durcissement en amont est distinct et nécessaire.",
      },
    ],

    s07: "07 — Ce que ça ne règle pas",
    s07Title: "Primitive tranchante, arêtes vives.",
    limits: [
      {
        t: "Valide selon la politique n’est pas une bonne politique",
        b: "Nous prouvons que l’agent est resté à l’intérieur de la frontière fixée par la politique. Nous ne disons rien sur le fait que cette frontière ait été bien choisie. Une politique qui autorise un préjudice produit une preuve valide d’une exécution nuisible mais autorisée.",
      },
      {
        t: "Une preuve ne peut pas conférer l’autorité",
        b: "Nous prouvons que l’action est restée dans la politique en vigueur, et que la politique n’est pas opérante tant qu’un quorum désigné n’a pas doublement signé son empreinte exacte — affaiblissez un garde après la signature et le schéma cesse d’être applicable. Ce que nous ne pouvons pas établir se situe en amont de tout code : que les personnes qui détiennent ces clés avaient le droit de les détenir, que leur mandat est toujours en cours et dans sa portée, ou que celui qui refuse de signer est protégé quand il le fait. On peut rendre une barrière incontournable. Le droit de l’ouvrir vient d’ailleurs.",
      },
      {
        t: "Autorisé n’est pas sûr",
        b: "Une action pleinement autorisée peut rester la mauvaise action dans le monde réel. Nous gouvernons la trajectoire, pas la sagesse des capacités que vous avez accordées.",
      },
      {
        t: "Du code hostile dans le même processus, c’est de la physique",
        b: "Du code hostile arbitraire qui partage le runtime peut appeler un effet directement. C’est vrai pour tout le monde dans cette catégorie — nous le nommons dans le code au lieu de le maquiller.",
      },
      {
        t: "La composition a une frontière — et elle a bougé",
        b: "Six axes de fractionnement sont prouvés fermés sur toutes les séquences plutôt que sur un large échantillon : le montant, le temps — à largeur de fenêtre arbitraire — le nombre de comptes — à largeur d’éclatement non bornée — les types d’action combinés, l’argent acheminé via des entités intermédiaires à profondeur de sauts arbitraire, et la vélocité, prouvée avec les quatre contrôles de montant en vigueur, parce que la rafale est précisément le cas qu’ils approuvent tous. Cinq reposent sur un invariant inductif que le solveur a dû découvrir ; le résultat à fenêtre fixe, lui, se ferme par contradiction directe. Nous disons lequel est lequel plutôt que de laisser un seul mot couvrir les deux.",
      },
      {
        t: "Une preuve ne peut pas sourcer ce que vous ne voyez pas",
        b: "La preuve d’empilement ferme la route à une condition : que la valeur puisse être attribuée à son origine. Que cette attribution soit obtenable d’une institution à l’autre est une question de données et de droit, pas une question de solveur — une autre question, avec un autre responsable. Des origines simultanées partageant un intermédiaire, une réserve mélangée attribuée au prorata, et un rythme mesuré par entité à travers les comptes restent ouverts. L’anomalie comportementale — « inhabituel pour ce client » — n’est pas du tout une propriété de seuil, et rien ici ne la traite.",
        roadmap: true,
      },
    ],

    s08: "08 — Correspondance réglementaire",
    s08Title: "Répondre aux questions de l’examinateur à partir de l’artefact.",
    s08Lead: (
      <>
        La structure preuve-et-sceau correspond aux attentes actuelles de surveillance pour l’IA
        agentique — le sous-ensemble applicable et vérifiable par machine, pas une traduction
        marketing. Une entreprise répond à « montrez-moi qu’il n’a pas pu » à partir de la
        trace scellée plutôt que d’un récit.
      </>
    ),
    s08Foot:
      "Angle d’entrée : les services financiers canadiens réglementés. La correspondance porte sur les objectifs de contrôle applicables par machine, ce n’est pas une revendication de couverture complète des cadres.",

    s09: "09 — Le rôle d’Ironproof",
    s09Title: "Un moteur. Plusieurs surfaces. Honnête sur chacune.",
    s09Lead:
      "Un seul moteur de preuve et de sceau anime toutes les surfaces. Nous énonçons la maturité surface par surface plutôt que de les mélanger.",
    maturity: [
      {
        t: "Preuve sur les actions d’agents",
        s: "la frontière qu’un agent ne peut pas franchir — le moteur principal",
      },
      {
        t: "Sceau post-quantique",
        s: "SHA3-512 + Ed25519 + ML-DSA-65, chaîné par empreintes sur chaque décision gouvernée",
      },
      {
        t: "Preuve sur le code",
        s: "de vrais défauts, un PoC exécutable, une reproduction scellée — un levier de crédibilité, pas le titre",
      },
      {
        t: "Vérificateur hors ligne public + spécification canonique",
        s: "le point d’entrée « vérifiez vous-même » — un dossier scellé se contrôle octet par octet, sans réseau et sans code Ironproof",
      },
      {
        t: "Racine de confiance ancrée publiquement",
        s: "la racine de signature est publiée sous deux noms indépendants que vous pouvez consulter vous-même — la substituer exige de changer les deux",
      },
    ],

    s10: "10 — La phrase, une dernière fois",
    s10Phrase:
      "Nous prouvons ce qui peut être prouvé, nous le scellons en post-quantique, et n’importe qui le vérifie hors ligne — sans avoir à nous croire.",

    ctaTitle: "Prouvez votre infrastructure.",
    ctaLead:
      "Demandez un accès et transformez votre politique en garanties applicables et vérifiables de façon indépendante.",
    logoTitle: "Monogramme Ironproof",
    footer:
      "Vérification formelle automatisée pour les logiciels et les infrastructures critiques.",
  },
};
