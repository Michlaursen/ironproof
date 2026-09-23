import { IronProofLogo } from "@/components/ironproof-logo";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { ProofArtifact } from "./proof-artifact";
import { FadeUpInit } from "./fade-up-init";
import { AgentScenarios } from "./agent-scenarios";
import { Counterexample } from "./counterexample";
import { VerifyArtifact } from "./verify-artifact";
import { GateDiagram } from "./gate-diagram";
import { ProofPipeline } from "./proof-pipeline";
import { SequenceProof } from "./sequence-proof";
import { DeployGate } from "./deploy-gate";
import { CtaForm } from "./cta-form";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, NBSP } from "./i18n";

/*
 * The Ironproof landing.
 *
 * Rebuilt 2026-09-23. The previous page demonstrated one action class — a
 * refund — seven times over, while the headline sold four. The order now
 * follows the reader's questions, not our mechanism:
 *
 *   1. what it does            hero, then the two sealed artifacts
 *   2. why logging in is not   authentication vs authorization
 *      the same as allowed
 *   3. see it decide           four action classes, one gate (interactive)
 *   4. what it is not          the categories it gets confused with
 *   5. where it applies        three domains, with the rules that already exist
 *   6. why now                 dated, sourced regulatory and market events
 *   7. what only a proof does  the sequence, the gate, the pipeline
 *   8. check it yourself       a real sealed record, verified in the browser
 *   9. start                   a scoped pilot on one action type
 *
 * Anchor ids are load bearing: the header links #how, #initiators, #start and
 * the research page links #decide and #counterexample.
 *
 * Every dated claim in WHY NOW carries its source link. A date on this page
 * without a source is the exact failure the product exists to prevent.
 */

type Contrast = { label: string; body: string };
type NotItem = { label: string; body: string };
type Domain = { name: string; actions: readonly string[]; rules: string };
type Dated = { date: string; what: string; source: string; href: string };
type Step = { title: string; body: string };

type Copy = {
  hero: {
    eyebrow: string;
    headline: string;
    body: React.ReactNode;
    boundary: string;
    initiators: string;
    authorized: string;
    unauthorized: string;
    executes: string;
    refused: string;
    ctaDecide: string;
    ctaVerify: string;
    ctaPilot: string;
    logoTitle: string;
  };

  takeaway: React.ReactNode;
  blockIsNotSilence: string;

  authz: {
    eyebrow: string;
    title: React.ReactNode;
    lead: string;
    authn: Contrast;
    authz: Contrast;
    foot: string;
  };

  creditedBy: string;

  not: { eyebrow: string; title: string; items: readonly NotItem[]; foot: string };

  domains: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    actionsLabel: string;
    rulesLabel: string;
    items: readonly Domain[];
  };

  breathFrameworks: React.ReactNode;

  now: { eyebrow: string; title: string; lead: string; items: readonly Dated[]; foot: string };

  gate: { eyebrow: string; title: string; lead: string; foot: string };

  breathCounterexample: React.ReactNode;
  breathCoverage: React.ReactNode;

  why: {
    eyebrow: string;
    title: React.ReactNode;
    lead: string;
    testVsProof: React.ReactNode;
    scope: string;
  };

  how: {
    eyebrow: string;
    title: string;
    lead: string;
    compiler: string;
    recordPre: string;
    recordLink: string;
  };

  engine: { eyebrow: string; title: string; lead: React.ReactNode; cta: string };

  pilot: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: readonly Step[];
    fitLabel: string;
    fit: readonly string[];
    cta: string;
  };

  cta: { title: string; lead: string };

  footer: string;
};

const SRC_E23 =
  "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027";
const SRC_OSFI_TOKENIZED =
  "https://www.osfi-bsif.gc.ca/en/news/statement-tokenized-other-digitally-represented-deposits";
const SRC_SIX_BANKS =
  "https://www.newswire.ca/news-releases/six-canadian-banks-explore-development-of-a-secure-cad-tokenized-deposit-solution-869071438.html";

const T: L<Copy> = {
  en: {
    hero: {
      eyebrow: "PRE-EXECUTION AUTHORIZATION FOR AI AGENTS AND AUTOMATION",
      headline: "If it isn't authorized, it never executes.",
      body: (
        <>
          Ironproof checks every critical action before it executes — a payment, an access grant, a
          deletion, a deployment. If it&rsquo;s authorized, it runs. If it isn&rsquo;t, Ironproof{" "}
          <span className="metal-text">blocks it</span>{" "}&mdash; and seals a record anyone can
          verify independently.
        </>
      ),
      boundary: "One boundary. Any initiator.",
      initiators: "AI agent. API. Script. Person.",
      authorized: "AUTHORIZED",
      unauthorized: "UNAUTHORIZED",
      executes: "EXECUTES",
      refused: "BLOCKED",
      ctaDecide: "WATCH IT DECIDE",
      ctaVerify: "VERIFY A REAL DECISION",
      ctaPilot: "START A PILOT",
      logoTitle: "Ironproof monogram",
    },

    takeaway: (
      <>
        Ironproof stops unauthorized critical actions from executing
        <span className="text-neutral-500"> &mdash; </span>
        <span className="metal-text">and cryptographically seals every decision,</span> allow or
        block.
      </>
    ),
    blockIsNotSilence:
      "A block is not a silence. It is an artifact stating what was requested, which policy was in force, and why the action did not run.",

    authz: {
      eyebrow: "THE GAP",
      title: (
        <>
          Logged in is not <span className="metal-shine">allowed</span>.
        </>
      ),
      lead: "Your agent already has credentials. That settles who it is — not whether this specific action, right now, is inside your policy.",
      authn: {
        label: "AUTHENTICATION — ALREADY SOLVED",
        body: "Who is asking? Keys, tokens, SSO, service accounts. An agent running in production has already passed it.",
      },
      authz: {
        label: "AUTHORIZATION — WHERE IRONPROOF SITS",
        body: "Should this action execute? Amount, cumulative totals, approvals, time windows, holds — checked before the action runs, every time.",
      },
      foot: "An agent with valid credentials and a bad plan is still a valid session. The only place to stop it is before execution.",
    },

    creditedBy: "SECURITY RESEARCH BY IRONPROOF — CREDITED BY",

    not: {
      eyebrow: "WHAT IRONPROOF IS NOT",
      title: "Not another dashboard.",
      items: [
        {
          label: "Not monitoring",
          body: "Observability tells you what happened. Ironproof decides before it happens — a blocked action never runs.",
        },
        {
          label: "Not an AI guardrail",
          body: "No language model sits in the decision path. The same request under the same policy always gets the same verdict.",
        },
        {
          label: "Not a penetration test",
          body: "A test samples cases. Ironproof proves a property across every modeled sequence — or returns the one that breaks it.",
        },
        {
          label: "Not a platform replacement",
          body: "Ironproof does not hold funds or custody keys. It runs in your environment, in front of the systems you already operate.",
        },
      ],
      foot: "What Ironproof is: a deterministic gate before execution, a proof about the policy, and a sealed record of every decision.",
    },

    domains: {
      eyebrow: "WHERE IT APPLIES",
      titleA: "Move money. Grant access.",
      titleB: "Delete records. Ship a change.",
      lead: "The actions that cannot be taken back once they run. For those, authorization stops being a setting and becomes infrastructure.",
      actionsLabel: "ACTIONS GOVERNED",
      rulesLabel: "WHERE THE POLICY ALREADY EXISTS",
      items: [
        {
          name: "Financial services",
          actions: [
            "Wires, refunds and internal transfers",
            "Per-type and combined daily limits",
            "Beneficiary changes and cooling-off periods",
            "Programmable payment conditions",
          ],
          rules: "OSFI E-23 · OSFI B-13 · AML programs · SOX",
        },
        {
          name: "Identity & access",
          actions: [
            "Role and privilege grants",
            "Service-account permissions",
            "Time-boxed and emergency access",
            "Separation of duties",
          ],
          rules: "SOC 2 access controls · ISO 27001 · OSFI B-13",
        },
        {
          name: "Data & operations",
          actions: [
            "Bulk deletion and retention holds",
            "Production deployments and change windows",
            "Configuration changes on critical systems",
            "Exports of customer data",
          ],
          rules: "Law 25 · PIPEDA · SOC 2 change management · IEC 62443",
        },
      ],
    },

    breathFrameworks: (
      <>
        These frameworks already say what must never happen. Ironproof turns that sentence into{" "}
        <span className="metal-text">a boundary the system cannot cross</span>, and into evidence
        the regulator can re-check.
      </>
    ),

    now: {
      eyebrow: "WHY NOW",
      title: "Code is starting to move money on its own.",
      lead: "Canadian regulators and banks have put dates on it. Each item links to its source.",
      items: [
        {
          date: "Sep 10, 2026",
          what: "OSFI states that tokenized deposits are not legally distinct from traditional deposits. The existing rules apply to them.",
          source: "OSFI, statement on tokenized deposits",
          href: SRC_OSFI_TOKENIZED,
        },
        {
          date: "Sep 22, 2026",
          what: "Six Canadian banks announce they are exploring a CAD tokenized deposit solution, aiming for faster, more efficient and programmable payments.",
          source: "Joint release, Newswire",
          href: SRC_SIX_BANKS,
        },
        {
          date: "May 1, 2027",
          what: "OSFI Guideline E-23 on model risk management takes effect. Its definition of a model explicitly includes AI/ML methods.",
          source: "OSFI, Guideline E-23",
          href: SRC_E23,
        },
      ],
      foot: "When a payment can release itself on a condition, someone has to verify the condition before it executes.",
    },

    gate: {
      eyebrow: "ONE GATE, ANY INITIATOR",
      title: "The gate does not ask who is asking.",
      lead: "It asks whether the action is inside the policy in force. The same check applies to every path that can reach a critical system — which is why this is not an AI problem with an AI answer.",
      foot: "Every authorization records the requesting actor, the policy version and the action. Nothing executes without spending a single-use grant bound to that exact decision.",
    },

    breathCounterexample: (
      <>
        Take the clause out and the proof collapses. That is what makes the certificate
        load-bearing rather than decorative:{" "}
        <span className="metal-text">a green that can never turn red is worth nothing</span>.
      </>
    ),
    breathCoverage: (
      <>
        Ironproof does not claim coverage it has not modeled.{" "}
        <span className="metal-text">
          Every certificate states what was proven &mdash; and what was not.
        </span>
      </>
    ),

    why: {
      eyebrow: "WHAT ONLY A PROOF DOES",
      title: (
        <>
          Rules checked one by one <span className="text-neutral-500">&mdash;</span>{" "}
          <span className="metal-shine">or the whole policy proven</span>.
        </>
      ),
      lead: "A gate that checks each rule against each request can pass every rule while a sequence of compliant actions still breaks what the policy was meant to prevent. Ironproof checks the policy as a whole: it returns the exact sequence that breaks it, or the proof that none exists.",
      testVsProof: (
        <>
          A test tells you what it tried.{" "}
          <span className="metal-text">A proof tells you what&rsquo;s impossible.</span>
        </>
      ),
      scope: "Proven within the boundary you define. The certificate states that boundary.",
    },

    how: {
      eyebrow: "HOW IT WORKS",
      title: "Prove. Enforce. Seal. Verify.",
      lead: "Ironproof mathematically checks that no reachable sequence of actions can cross the defined authorization boundary.",
      compiler:
        "Your written policy is compiled into mathematics by a deterministic compiler — the same one the runtime uses. A differential check fails the build if the two ever diverge.",
      recordPre:
        "The theorem that ties the runtime fast path to the full formal model, and the equivalence checks behind it, are in the ",
      recordLink: "technical record",
    },

    engine: {
      eyebrow: "THE SAME ENGINE",
      title: "Same proof engine. Proven on real vulnerabilities.",
      lead: (
        <>
          Findings by <span className="metal-text">Dominik Blain</span> and Cobalt, credited on the
          projects&rsquo; own repositories &mdash; published research, assigned CVEs and public
          upstream acknowledgements.
        </>
      ),
      cta: "VIEW TECHNICAL RECORD",
    },

    pilot: {
      eyebrow: "DESIGN PARTNER PILOT",
      title: "Start with one action type.",
      lead: "A fixed-scope pilot on a single action your automation already performs. You keep the certificate, the gate and the sealed records.",
      steps: [
        {
          title: "Pick the action",
          body: "One action type your agents or scripts already run — a transfer, an access grant, a deletion, a deployment — and the rules that govern it today.",
        },
        {
          title: "Prove the policy",
          body: "We encode the rules, search for sequences that pass every rule yet break the intent, and prove the corrected policy holds.",
        },
        {
          title: "Enforce and seal",
          body: "The gate runs in your environment, in front of the action. Every decision, allow or block, is sealed.",
        },
        {
          title: "Verify without us",
          body: "Your risk team or auditor re-checks the certificate and the records on their own machine.",
        },
      ],
      fitLabel: "A GOOD FIT IF",
      fit: [
        "An agent, API or script can already execute the action without a person clicking approve",
        "The rules exist on paper — limits, approvals, windows, holds",
        "Someone will be asked to show that those rules actually held",
      ],
      cta: "APPLY FOR A PILOT",
    },

    cta: {
      title: "Put one critical action behind the boundary.",
      lead: "Choose a payment, access grant, deletion, or deployment. Ironproof will define the authorization boundary, prove it, enforce it at runtime, and produce an independently verifiable record.",
    },

    footer: "Deterministic authorization. Independently verifiable proof.",
  },

  fr: {
    hero: {
      eyebrow: "AUTORISATION AVANT EXÉCUTION POUR LES AGENTS IA ET L’AUTOMATISATION",
      headline: "Si ce n’est pas autorisé, il n’y a pas d’exécution.",
      body: (
        <>
          Ironproof vérifie chaque action critique avant qu’elle s’exécute — un paiement, un accès,
          une suppression, un déploiement. Si elle est autorisée, elle passe. Sinon, Ironproof{" "}
          <span className="metal-text">la bloque</span>{" "}&mdash; et scelle une trace que
          n’importe qui peut vérifier de façon indépendante.
        </>
      ),
      boundary: "Une seule frontière. Peu importe qui demande.",
      initiators: "Agent IA. API. Script. Humain.",
      authorized: "AUTORISÉE",
      unauthorized: "NON AUTORISÉE",
      executes: "S’EXÉCUTE",
      refused: "BLOQUÉE",
      ctaDecide: "VOYEZ-LE DÉCIDER",
      ctaVerify: "VÉRIFIEZ UNE VRAIE DÉCISION",
      ctaPilot: "DÉMARRER UN PILOTE",
      logoTitle: "Monogramme Ironproof",
    },

    takeaway: (
      <>
        Ironproof empêche les actions critiques non autorisées de s’exécuter
        <span className="text-neutral-500"> &mdash; </span>
        <span className="metal-text">et scelle cryptographiquement chaque décision,</span> qu’elle
        passe ou qu’elle bloque.
      </>
    ),
    blockIsNotSilence: `Un blocage n’est pas un silence. C’est un artefact qui dit ce qui a été demandé, quelle politique s’appliquait, et pourquoi l’action ne s’est pas exécutée.`,

    authz: {
      eyebrow: "L’ÉCART",
      title: (
        <>
          Connecté ne veut pas dire <span className="metal-shine">autorisé</span>.
        </>
      ),
      lead: "Votre agent a déjà des identifiants. Ça règle qui il est — pas si cette action précise, maintenant, respecte votre politique.",
      authn: {
        label: "AUTHENTIFICATION — DÉJÀ RÉGLÉE",
        body: "Qui demande ? Clés, jetons, SSO, comptes de service. Un agent en production l’a déjà passé.",
      },
      authz: {
        label: "AUTORISATION — LÀ OÙ SE PLACE IRONPROOF",
        body: "Cette action doit-elle s’exécuter ? Montant, cumuls, approbations, fenêtres de temps, gels — vérifiés avant l’exécution, chaque fois.",
      },
      foot: "Un agent aux identifiants valides et au mauvais plan reste une session valide. Le seul endroit pour l’arrêter, c’est avant l’exécution.",
    },

    creditedBy: "RECHERCHE EN SÉCURITÉ PAR IRONPROOF — CRÉDITÉE PAR",

    not: {
      eyebrow: "CE QU’IRONPROOF N’EST PAS",
      title: "Pas un tableau de bord de plus.",
      items: [
        {
          label: "Pas de la surveillance",
          body: "L’observabilité dit ce qui s’est passé. Ironproof décide avant — une action bloquée ne s’exécute jamais.",
        },
        {
          label: "Pas un garde-fou d’IA",
          body: "Aucun modèle de langage dans le chemin de décision. La même demande sous la même politique reçoit toujours le même verdict.",
        },
        {
          label: "Pas un test d’intrusion",
          body: "Un test échantillonne des cas. Ironproof prouve une propriété sur toute séquence modélisée — ou rend celle qui la casse.",
        },
        {
          label: "Pas un remplacement de plateforme",
          body: "Ironproof ne détient pas de fonds et ne garde pas de clés. Il tourne dans votre environnement, devant les systèmes que vous opérez déjà.",
        },
      ],
      foot: "Ce qu’Ironproof est : une barrière déterministe avant l’exécution, une preuve sur la politique, et une trace scellée de chaque décision.",
    },

    domains: {
      eyebrow: "OÙ ÇA S’APPLIQUE",
      titleA: "Déplacer de l’argent. Donner un accès.",
      titleB: "Supprimer des dossiers. Livrer un changement.",
      lead: "Les actions qu’on ne peut plus reprendre une fois exécutées. Pour celles-là, l’autorisation cesse d’être un réglage et devient une infrastructure.",
      actionsLabel: "ACTIONS GOUVERNÉES",
      rulesLabel: "OÙ LA POLITIQUE EXISTE DÉJÀ",
      items: [
        {
          name: "Services financiers",
          actions: [
            "Virements, remboursements et transferts internes",
            "Limites par type et limites quotidiennes combinées",
            "Changements de bénéficiaire et délais de carence",
            "Conditions de paiement programmables",
          ],
          rules: "BSIF E-23 · BSIF B-13 · programmes LBA · SOX",
        },
        {
          name: "Identité et accès",
          actions: [
            "Octroi de rôles et de privilèges",
            "Permissions des comptes de service",
            "Accès limités dans le temps et d’urgence",
            "Séparation des tâches",
          ],
          rules: "Contrôles d’accès SOC 2 · ISO 27001 · BSIF B-13",
        },
        {
          name: "Données et opérations",
          actions: [
            "Suppressions en lot et gels de conservation",
            "Déploiements en production et fenêtres de changement",
            "Changements de configuration sur les systèmes critiques",
            "Exportations de données clients",
          ],
          rules: "Loi 25 · LPRPDE · gestion du changement SOC 2 · IEC 62443",
        },
      ],
    },

    breathFrameworks: (
      <>
        Ces cadres disent déjà ce qui ne doit jamais arriver. Ironproof transforme cette phrase en{" "}
        <span className="metal-text">une frontière que le système ne peut pas franchir</span>, et en
        une preuve que le régulateur peut revérifier.
      </>
    ),

    now: {
      eyebrow: "POURQUOI MAINTENANT",
      title: "Le code commence à déplacer l’argent tout seul.",
      lead: "Les régulateurs et les banques du Canada y ont mis des dates. Chaque élément renvoie à sa source.",
      items: [
        {
          date: "10 sept. 2026",
          what: "Le BSIF affirme que les dépôts tokenisés ne sont pas juridiquement distincts des dépôts traditionnels. Les règles existantes s’y appliquent.",
          source: "BSIF, énoncé sur les dépôts tokenisés",
          href: SRC_OSFI_TOKENIZED,
        },
        {
          date: "22 sept. 2026",
          what: "Six banques canadiennes annoncent explorer une solution de dépôts tokenisés en dollars canadiens, pour des paiements plus rapides, plus efficaces et programmables.",
          source: "Communiqué conjoint, Newswire",
          href: SRC_SIX_BANKS,
        },
        {
          date: "1er mai 2027",
          what: "La ligne directrice E-23 du BSIF sur la gestion du risque de modèle entre en vigueur. Sa définition d’un modèle inclut explicitement les méthodes d’IA et d’apprentissage automatique.",
          source: "BSIF, ligne directrice E-23",
          href: SRC_E23,
        },
      ],
      foot: "Quand un paiement peut se libérer tout seul sur une condition, quelqu’un doit vérifier la condition avant l’exécution.",
    },

    gate: {
      eyebrow: "UNE SEULE BARRIÈRE, PEU IMPORTE QUI DEMANDE",
      title: "La barrière ne demande pas qui demande.",
      lead: "Elle demande si l’action est à l’intérieur de la politique en vigueur. La même vérification s’applique à tous les chemins qui mènent à un système critique — c’est pourquoi ce n’est pas un problème d’IA qui appelle une réponse d’IA.",
      foot: "Chaque autorisation consigne l’acteur qui demande, la version de la politique et l’action. Rien ne s’exécute sans dépenser un jeton à usage unique lié à cette décision exacte.",
    },

    breathCounterexample: (
      <>
        Retirez la clause et la preuve s’effondre. C’est ce qui rend le certificat porteur plutôt
        que décoratif{NBSP}:{" "}
        <span className="metal-text">un vert qui ne peut jamais virer au rouge ne vaut rien</span>.
      </>
    ),
    breathCoverage: (
      <>
        Ironproof ne revendique pas une couverture qu’il n’a pas modélisée.{" "}
        <span className="metal-text">
          Chaque certificat dit ce qui a été prouvé &mdash; et ce qui ne l’a pas été.
        </span>
      </>
    ),

    why: {
      eyebrow: "CE QUE SEULE UNE PREUVE FAIT",
      title: (
        <>
          Des règles vérifiées une à une <span className="text-neutral-500">&mdash;</span>{" "}
          <span className="metal-shine">ou la politique entière prouvée</span>.
        </>
      ),
      lead: `Une barrière qui vérifie chaque règle contre chaque demande peut toutes les laisser passer alors qu’une suite d’actions conformes brise ce que la politique devait empêcher. Ironproof vérifie la politique comme un tout${NBSP}: il rend la séquence exacte qui la casse, ou la preuve qu’aucune n’existe.`,
      testVsProof: (
        <>
          Un test vous dit ce qu’il a essayé.{" "}
          <span className="metal-text">Une preuve vous dit ce qui est impossible.</span>
        </>
      ),
      scope: "Prouvé à l’intérieur de la frontière que vous définissez. Le certificat énonce cette frontière.",
    },

    how: {
      eyebrow: "COMMENT ÇA MARCHE",
      title: "Prouver. Appliquer. Sceller. Vérifier.",
      lead: "Ironproof vérifie mathématiquement qu’aucune séquence d’actions atteignable ne peut franchir la frontière d’autorisation définie.",
      compiler:
        "Votre politique écrite est compilée en mathématiques par un compilateur déterministe — le même que celui qu’utilise le runtime. Un contrôle différentiel fait échouer la compilation si les deux divergent.",
      recordPre:
        "Le théorème qui relie le chemin rapide du runtime au modèle formel complet, et les contrôles d’équivalence derrière lui, sont dans le ",
      recordLink: "dossier technique",
    },

    engine: {
      eyebrow: "LE MÊME MOTEUR",
      title: "Le même moteur de preuve. Éprouvé sur de vraies vulnérabilités.",
      lead: (
        <>
          Découvertes par <span className="metal-text">Dominik Blain</span> et Cobalt, créditées
          sur les dépôts des projets eux-mêmes &mdash; recherche publiée, CVE assignées et
          remerciements publics en amont.
        </>
      ),
      cta: "VOIR LE DOSSIER TECHNIQUE",
    },

    pilot: {
      eyebrow: "PILOTE PARTENAIRE DE CONCEPTION",
      title: "Commencez par un seul type d’action.",
      lead: "Un pilote à périmètre fixe sur une seule action que votre automatisation exécute déjà. Vous gardez le certificat, la barrière et les traces scellées.",
      steps: [
        {
          title: "Choisir l’action",
          body: "Un type d’action que vos agents ou scripts exécutent déjà — un transfert, un accès, une suppression, un déploiement — et les règles qui l’encadrent aujourd’hui.",
        },
        {
          title: "Prouver la politique",
          body: "Nous encodons les règles, cherchons les séquences qui passent chaque règle mais trahissent l’intention, et prouvons que la politique corrigée tient.",
        },
        {
          title: "Appliquer et sceller",
          body: "La barrière tourne dans votre environnement, devant l’action. Chaque décision, autorisée ou bloquée, est scellée.",
        },
        {
          title: "Vérifier sans nous",
          body: "Votre équipe de risque ou votre auditeur revérifie le certificat et les traces sur sa propre machine.",
        },
      ],
      fitLabel: "UN BON CANDIDAT SI",
      fit: [
        "Un agent, une API ou un script peut déjà exécuter l’action sans qu’une personne clique sur approuver",
        "Les règles existent sur papier — limites, approbations, fenêtres, gels",
        "Quelqu’un devra montrer que ces règles ont réellement tenu",
      ],
      cta: "POSTULER POUR UN PILOTE",
    },

    cta: {
      title: "Mettez une action critique derrière la frontière.",
      lead: "Choisissez un paiement, un octroi d’accès, une suppression ou un déploiement. Ironproof définira la frontière d’autorisation, la prouvera, l’appliquera à l’exécution et produira une trace vérifiable de façon indépendante.",
    },

    footer: "Autorisation déterministe. Preuve vérifiable de façon indépendante.",
  },
};

export function Landing({ locale = defaultLocale }: { locale?: Locale }) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const t = pick(T, locale);

  return (
    <div className="flex flex-1 flex-col">
      {/* NAV */}
      <LandingHeader locale={locale} />

      <main className="flex-1">
        {/* 1. HERO — the product, in one sentence, before any mechanism */}
        <section id="top" className="relative z-10 flex min-h-[86vh] items-center px-6 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <IronProofLogo
                width={210}
                height={280}
                className="h-[200px] w-[150px] drop-shadow-2xl md:h-[280px] md:w-[210px]"
                title={t.hero.logoTitle}
              />
              <span className="track-logo iron-text mt-4 text-2xl font-semibold md:mt-6 md:text-4xl">
                IRONPROOF
              </span>
            </div>
            <div className="fade-up">
              <p className="seal-label track-wide mb-6 text-xs md:text-sm">{t.hero.eyebrow}</p>
              <h1 className="mb-6 font-serif font-medium leading-[0.98] sm:leading-[0.95]">
                <span className="metal-shine block text-4xl sm:text-5xl md:text-7xl">
                  {t.hero.headline}
                </span>
              </h1>
              <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-neutral-400 sm:text-lg sm:leading-snug sm:text-neutral-300 md:text-xl">
                {t.hero.body}
              </p>
              <div className="mb-6 max-w-xl">
                <p className="text-base font-medium text-neutral-200 md:text-lg">
                  {t.hero.boundary}
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-neutral-400">
                  {t.hero.initiators}
                </p>
                <p className="track-mid mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-300 sm:text-sm">
                  <span className="whitespace-nowrap">
                    {t.hero.authorized} &rarr; {t.hero.executes}
                  </span>
                  <span className="whitespace-nowrap">
                    {t.hero.unauthorized} &rarr;{" "}
                    <span className="metal-text">{t.hero.refused}</span>
                  </span>
                </p>
              </div>
              <div className="hairline mb-10 h-px w-full max-w-md" />
              <div className="flex flex-wrap gap-4">
                {/* Three doors, three intents: see it, check it, start. Each lands
                  * where the reader DOES something, never on more prose. */}
                <a
                  href="#decide"
                  className="track-mid bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  {t.hero.ctaDecide}
                </a>
                <a
                  href="#verify"
                  className="chip-metal track-mid px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
                >
                  {t.hero.ctaVerify}
                </a>
                <a
                  href="#pilot"
                  className="track-mid px-2 py-3.5 text-xs text-neutral-400 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                >
                  {t.hero.ctaPilot}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* THE TEN-SECOND TAKEAWAY — then the two artifacts that prove the sentence */}
        <section id="evidence" className="relative z-10 edge-t px-6 py-16 md:px-14 md:py-20">
          <p className="fade-up mx-auto max-w-4xl text-center font-serif text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl md:text-4xl">
            {t.takeaway}
          </p>
          <div className="fade-up mx-auto mt-12 grid max-w-3xl justify-items-center gap-6 sm:grid-cols-2">
            <ProofArtifact kind="allowed" locale={locale} />
            <ProofArtifact kind="blocked" locale={locale} />
          </div>
          <p className="fade-up mx-auto mt-10 max-w-2xl text-center text-sm font-light leading-relaxed text-neutral-400 md:text-base">
            {t.blockIsNotSilence}
          </p>
        </section>

        {/* 2. AUTHENTICATION IS NOT AUTHORIZATION */}
        <section id="gap" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.authz.eyebrow}</p>
            <h2 className="font-serif text-4xl font-medium text-neutral-100 md:text-6xl">
              {t.authz.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.authz.lead}</p>
          </div>
          <div className="fade-up grid gap-6 md:grid-cols-2">
            <div className="card-premium p-8 md:p-10">
              <p className="track-mid mb-4 text-[10px] text-neutral-500">{t.authz.authn.label}</p>
              <p className="text-base font-light leading-relaxed text-neutral-400">
                {t.authz.authn.body}
              </p>
            </div>
            <div className="card-premium card-iron p-8 md:p-10">
              <p className="seal-label track-mid mb-4 text-[10px]">{t.authz.authz.label}</p>
              <p className="text-base font-light leading-relaxed text-neutral-200">
                {t.authz.authz.body}
              </p>
            </div>
          </div>
          <p className="fade-up mt-10 max-w-2xl text-sm font-light text-neutral-400">
            {t.authz.foot}
          </p>
        </section>

        {/* 3. WATCH IT DECIDE — four action classes, one gate */}
        <AgentScenarios locale={locale} verifyHref="#verify" />

        {/* CREDITED-BY STRIP */}
        <section className="relative z-10 edge-t px-6 py-8 md:px-14">
          <div className="fade-up mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="track-mid text-xs text-neutral-500">{t.creditedBy}</span>
            {["IBM", "GnuPG", "Mozilla", "Red Hat", "wolfSSL", "VideoLAN", "DCMTK"].map((o) => (
              <span key={o} className="metal-text text-sm font-medium">
                {o}
              </span>
            ))}
          </div>
        </section>

        {/* 4. WHAT IRONPROOF IS NOT */}
        <section id="not" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.not.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.not.title}</h2>
          </div>
          <div className="fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.not.items.map((n) => (
              <div key={n.label} className="card-premium p-7">
                <p className="mb-3 font-serif text-xl text-neutral-100">
                  <span className="mr-2 font-mono text-sm text-red-300" aria-hidden="true">
                    ✕
                  </span>
                  {n.label}
                </p>
                <p className="text-sm font-light leading-relaxed text-neutral-400">{n.body}</p>
              </div>
            ))}
          </div>
          <p className="fade-up mt-10 max-w-3xl font-serif text-xl leading-snug text-neutral-200 md:text-2xl">
            {t.not.foot}
          </p>
        </section>

        {/* 5. WHERE IT APPLIES — three domains, with the rules that already exist */}
        <section id="start" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.domains.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.domains.titleA}
              <br />
              {t.domains.titleB}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.domains.lead}</p>
          </div>
          <div className="fade-up grid gap-6 lg:grid-cols-3">
            {t.domains.items.map((d, i) => (
              <div key={d.name} className="card-premium flex flex-col p-8 md:p-10">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="num-badge font-serif text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="metal-text font-serif text-2xl">{d.name}</h3>
                </div>
                <p className="track-mid mb-3 text-[10px] text-neutral-500">
                  {t.domains.actionsLabel}
                </p>
                <ul className="space-y-2">
                  {d.actions.map((a) => (
                    <li key={a} className="text-sm font-light leading-relaxed text-neutral-300">
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-white/5 pt-5">
                  <p className="track-mid mb-2 mt-6 text-[10px] text-neutral-500">
                    {t.domains.rulesLabel}
                  </p>
                  <p className="text-sm font-light text-neutral-400">{d.rules}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BREATH — the frameworks exist; this is what Ironproof does with them */}
        <section className="relative z-10 px-6 py-28 md:px-14 md:py-32">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="breath-mark" aria-hidden="true" />
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-400 sm:text-3xl md:text-4xl">
              {t.breathFrameworks}
            </p>
          </div>
        </section>

        {/* 6. WHY NOW — dated, each with its source */}
        <section id="now" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.now.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.now.title}</h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.now.lead}</p>
          </div>
          <ol className="fade-up grid gap-6 md:grid-cols-3">
            {t.now.items.map((d) => (
              <li key={d.date} className="card-premium flex flex-col p-8">
                <p className="seal-label track-mid mb-4 text-xs">{d.date}</p>
                <p className="mb-6 text-base font-light leading-relaxed text-neutral-200">{d.what}</p>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-xs text-neutral-400 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                >
                  {d.source} &#8599;
                </a>
              </li>
            ))}
          </ol>
          <p className="fade-up mt-10 max-w-3xl font-serif text-xl leading-snug text-neutral-200 md:text-2xl">
            {t.now.foot}
          </p>
        </section>

        {/* 7. WHAT ONLY A PROOF DOES — the whole policy, not rule by rule */}
        <section id="why" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="seal-label track-mid mb-8 text-xs">{t.why.eyebrow}</p>
            <h2 className="font-serif text-3xl font-medium leading-snug text-neutral-100 sm:text-4xl md:text-5xl">
              {t.why.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
              {t.why.lead}
            </p>
            <div className="hairline my-10 h-px w-full max-w-md" />
            <p className="font-serif text-xl font-medium leading-snug text-neutral-400 sm:text-2xl md:text-3xl">
              {t.why.testVsProof}
            </p>
            <p className="mt-10 max-w-xl text-sm font-light leading-relaxed text-neutral-400">
              {t.why.scope}
            </p>
          </div>
        </section>

        {/* THE SEQUENCE — the centre of the argument */}
        <SequenceProof locale={locale} />

        {/* ONE GATE, ANY INITIATOR */}
        <section id="initiators" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.gate.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.gate.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.gate.lead}</p>
          </div>
          <GateDiagram locale={locale} />
          <p className="fade-up mt-10 max-w-2xl text-sm font-light text-neutral-400">
            {t.gate.foot}
          </p>
        </section>

        {/* PROVE -> ENFORCE -> SEAL -> VERIFY */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.how.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.how.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.how.lead}</p>
            <p className="mt-4 max-w-2xl text-lg font-light text-neutral-400">{t.how.compiler}</p>
          </div>
          <div className="fade-up">
            <ProofPipeline locale={locale} />
          </div>
          <p className="fade-up mt-8 text-sm font-light text-neutral-400">
            {t.how.recordPre}
            <a
              href={`${r}/proof`}
              className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition hover:text-white"
            >
              {t.how.recordLink}
            </a>
            .
          </p>
        </section>

        {/* WHAT A COUNTEREXAMPLE LOOKS LIKE */}
        <Counterexample locale={locale} />

        {/* BREATH — what the counterexample was for */}
        <section className="relative z-10 px-6 py-28 md:px-14 md:py-32">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="breath-mark" aria-hidden="true" />
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-400 sm:text-3xl md:text-4xl">
              {t.breathCounterexample}
            </p>
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl md:text-4xl">
              {t.breathCoverage}
            </p>
          </div>
        </section>

        {/* 8. VERIFY A REAL DECISION */}
        <VerifyArtifact locale={locale} />

        {/* PUBLIC TECHNICAL RECORD */}
        <section className="relative z-10 edge-t px-6 py-20 md:px-14">
          <div className="fade-up mx-auto max-w-4xl text-center">
            <p className="seal-label track-mid mb-4 text-xs">{t.engine.eyebrow}</p>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              {t.engine.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
              {t.engine.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href="https://github.com/pupnp/pupnp/security/advisories/GHSA-q522-6w45-4j58"
                target="_blank"
                rel="noopener noreferrer"
                className="chip-metal track-mid px-3 py-1 text-xs text-neutral-200 transition hover:text-white"
              >
                CVE-2026-41682
              </a>
            </div>
            <a
              href={`${r}/proof`}
              className="chip-metal track-mid mt-10 inline-block px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
            >
              {t.engine.cta}
            </a>
          </div>
        </section>

        {/* DEPLOY IT — where it sits in the stack */}
        <DeployGate locale={locale} />

        {/* 9. DESIGN PARTNER PILOT — scope, not price */}
        <section id="pilot" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.pilot.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.pilot.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.pilot.lead}</p>
          </div>
          <ol className="fade-up grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.pilot.steps.map((s, i) => (
              <li key={s.title} className="card-premium p-7">
                <span className="num-badge mb-4 block font-serif text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="metal-text mb-3 font-serif text-xl">{s.title}</h3>
                <p className="text-sm font-light leading-relaxed text-neutral-400">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="card-premium card-iron fade-up mt-10 flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="track-mid mb-4 text-[10px] text-neutral-500">{t.pilot.fitLabel}</p>
              <ul className="space-y-2">
                {t.pilot.fit.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-light text-neutral-300">
                    <span className="font-mono text-emerald-300" aria-hidden="true">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="track-mid shrink-0 self-start rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white md:self-center"
            >
              {t.pilot.cta}
            </a>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-40 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={111} height={148} title={t.hero.logoTitle} />
              <ProofSeal size={148} locale={locale} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-4xl font-medium md:text-6xl">
              {t.cta.title}
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">{t.cta.lead}</p>
            <CtaForm locale={locale} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 edge-t px-6 py-12 md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-neutral-400 md:flex-row">
          <div className="flex items-center gap-3">
            <IronProofLogo width={20} height={27} />
            <span className="track-logo iron-text font-semibold">IRONPROOF</span>
          </div>
          <span className="font-light">{t.footer}</span>
        </div>
      </footer>

      <FadeUpInit />
    </div>
  );
}
