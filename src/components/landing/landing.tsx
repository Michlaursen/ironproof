import Image from "next/image";
import { IronproofMark } from "@/components/ironproof-mark";
import { CREDITED_STRIP } from "./credibility";
import { HERO_COPY } from "./hero-copy";
import { LandingHeader } from "./landing-header";
import { FadeUpInit } from "./fade-up-init";
import { AgentScenarios } from "./agent-scenarios";
import { ProofPipeline } from "./proof-pipeline";
import { PILOT_COPY } from "./pilot-copy";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, NBSP } from "./i18n";

/*
 * The Ironproof landing.
 *
 * Rebuilt 2026-09-23. The previous page demonstrated one action class — a
 * refund — seven times over, while the headline sold four. The order now
 * follows the reader's questions, not our mechanism:
 *
 *   1. the claim               hero: the two keys and the one sentence
 *   2. what Ironproof is       the checkpoint, allow/block, check-prove-seal
 *   3. see it decide           the gate film, four action classes (interactive)
 *   3b. check it yourself      a real sealed record, verified in the browser
 *   4. why logging in is not   authentication vs authorization
 *      the same as allowed
 *   4. what it is not          the categories it gets confused with
 *   5. where it applies        three domains, with the rules that already exist
 *   6. why now                 dated, sourced regulatory and market events
 *   7. what only a proof does  the gate, the pipeline (the sequence demo is
 *                              gone; the counterexample moved to /proof)
 *   9. start                   a scoped pilot on one action type, with the
 *                              request form (the closing contact block is gone)
 *
 * Anchor ids are load bearing: the header links #how, #initiators, #start and
 * the research page links #decide (#counterexample moved to /proof).
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
    /** Two clauses: the condition (plain) and the consequence (gold italic). */
    headline: string;
    headlineEnd: string;
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

  what: {
    eyebrow: string;
    title: string;
    lead: string;
    allowed: string;
    allowedResult: string;
    blocked: string;
    blockedResult: string;
    pillars: readonly Step[];
  };

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
  closing: { titleA: string; titleB: string; body: string; kicker: string; scope: string };

};

const SRC_E23 =
  "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027";
const SRC_OSFI_TOKENIZED =
  "https://www.osfi-bsif.gc.ca/en/news/statement-tokenized-other-digitally-represented-deposits";
// Opened 2026-09-24. EY's "prove" means documented evidence of governance,
// not a mathematical proof: the item quotes it, it does not stretch it.
const SRC_EY_AGENTIC =
  "https://www.ey.com/en_gr/insights/financial-services/how-governed-intelligence-can-scale-agentic-banking";
// Both opened 2026-09-26 in a real browser. Santander page dated 2 March 2026;
// OSFI bulletin "Date modified: 2026-07-13". Mastercard's own newsroom and
// Gartner refused automated reads, so neither is cited here.
const SRC_SANTANDER_AGENT_PAY =
  "https://www.santander.com/en/press-room/press-releases/2026/03/santander-and-mastercard-complete-europes-first-live-end-to-end-payment-executed-by-an-ai-agent";
const SRC_OSFI_AGENTIC =
  "https://www.osfi-bsif.gc.ca/en/risks/technology-cyber-risk-management/technology-risk-bulletin/generative-agentic-artificial-intelligence-implications-technology-cyber-security-operational";
const SRC_SIX_BANKS =
  "https://www.newswire.ca/news-releases/six-canadian-banks-explore-development-of-a-secure-cad-tokenized-deposit-solution-869071438.html";

const T: L<Copy> = {
  en: {
    hero: {
      ...HERO_COPY.en,
      body: (
        <>
          Ironproof checks every critical action before it executes — a payment, an access grant, a
          deletion, a deployment. If it&rsquo;s authorized, it runs. If it isn&rsquo;t, Ironproof{" "}
          <span className="metal-text">blocks it</span>{" "}&mdash; and seals a record anyone can
          verify independently.
        </>
      ),
      boundary:
        "Any action you can’t afford to get wrong, whoever starts it: a person, a script or an AI agent. What your policy allows goes through. What it doesn’t is stopped before it runs, with a sealed record anyone can verify.",
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

    what: {
      eyebrow: "WHAT IRONPROOF IS",
      title: "A checkpoint between your automation and the actions it can’t undo.",
      lead: "AI agents, APIs and scripts can already move money, grant access, delete records and ship changes on their own. Ironproof sits in front of those actions and checks each one against your rules before it runs.",
      allowed: "Allowed",
      allowedResult: "it runs.",
      blocked: "Not allowed",
      blockedResult: "it never runs.",
      pillars: [
        {
          title: "Checked before, not logged after",
          body: "Every action waits at the gate until it clears your policy. No language model decides: the same request under the same policy always gets the same answer.",
        },
        {
          title: "Proven, not tested",
          body: "We don’t test your rules, we prove them. You leave with the exact case that breaks them, or the proof that no such case exists.",
        },
        {
          title: "Sealed, so anyone can check",
          body: "Every decision, allowed or blocked, is sealed. Your auditor re-checks it on their own machine, without us.",
        },
      ],
    },

    authz: {
      eyebrow: "WHY A LOGIN IS NOT ENOUGH",
      title: (
        <>
          Logged in is not the same as <span className="metal-shine">allowed</span>.
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
      actionsLabel: "THE ACTIONS",
      rulesLabel: "THE RULES ALREADY WRITTEN",
      items: [
        {
          name: "Banking & payments",
          actions: ["Wires, refunds and transfers", "Payee changes and daily limits", "Real-time payments"],
          rules: "OSFI E-23 · OSFI B-13 · RPAA · AML programs",
        },
        {
          name: "Mortgage & lending",
          actions: ["Approvals outside underwriting limits", "Funding and disbursement", "Changes to payout details"],
          rules: "OSFI B-20 · PCMLTFA (mortgage sector, since Oct 2024)",
        },
        {
          name: "Insurance",
          actions: ["Automated claim approvals", "Underwriting decisions", "Payouts"],
          rules: "OSFI E-23 · AMF guideline on AI",
        },
        {
          name: "Online gaming",
          actions: ["Deposit and betting limits", "Payouts", "Self-exclusion holds"],
          rules: "AGCO Registrar’s Standards (Ontario)",
        },
        {
          name: "Government & defence",
          actions: ["Updates to official records", "Approvals and spending", "Access to sensitive systems"],
          rules: "TBS guidance on agentic AI · ITSG-33",
        },
        {
          name: "Healthcare",
          actions: ["Access to patient records", "Changes to orders and prescriptions", "Data exports"],
          rules: "PHIPA · Law 25 · PIPEDA",
        },
        {
          name: "Energy & critical infrastructure",
          actions: ["Setpoint and configuration changes", "Remote operations on control systems", "Production deployments"],
          rules: "IEC 62443 · NERC CIP",
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
      title: "Systems are starting to act on their own.",
      lead: "Agents, scripts and automated pipelines now move money, change access and ship code without a person in the loop. Regulators and banks have put dates on it. Each item links to its source.",
      items: [
        {
          date: "Mar 2, 2026",
          what: "Santander and Mastercard complete Europe’s first live end-to-end payment executed by an AI agent, inside a regulated bank’s payment infrastructure.",
          source: "Santander, press release",
          href: SRC_SANTANDER_AGENT_PAY,
        },
        {
          date: "Jul 13, 2026",
          what: "OSFI publishes its bulletin on generative and agentic AI: agents that reason, plan, decide and take actions without human intervention call for least privilege and audit trails on every AI-initiated activity.",
          source: "OSFI, bulletin on generative and agentic AI",
          href: SRC_OSFI_AGENTIC,
        },
        {
          date: "Sep 1, 2026",
          what: "EY: 52% of banks have piloted agentic AI, only 16% have fully deployed use cases. “A bank cannot simply say an AI system is governed. It must be able to prove it.”",
          source: "EY, How governed intelligence can scale agentic banking",
          href: SRC_EY_AGENTIC,
        },
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
      foot: "When a system can act on its own, the decision has to be made before the action runs, not read in a log afterwards.",
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
          Findings by <span className="metal-text">Dominik Blain</span>{" "}and Cobalt, credited on the
          projects&rsquo; own repositories &mdash; published research, assigned CVEs and public
          upstream acknowledgements.
        </>
      ),
      cta: "VIEW TECHNICAL RECORD",
    },

    pilot: PILOT_COPY.en,

    closing: {
      titleA: "Probably safe is not",
      titleB: "provably impossible.",
      body: "Agents now move money, grant access and change production on their own. We show you exactly where your policy breaks, or prove that it can’t. Then every action is checked before it executes: what’s authorized runs, sealed; what isn’t never executes.",
      kicker: "Check every action. Run what’s proven. Stop the rest.",
      // The fine print under "provably impossible": what the proof covers, and
      // the one condition it rests on (the action can only run through the gate).
      scope:
        "Proven for the actions and the policy you define, where the action can only execute through the gate. The certificate states that boundary.",
    },

    cta: {
      title: "Put one critical action behind the boundary.",
      lead: "Choose a payment, access grant, deletion, or deployment. Ironproof will define the authorization boundary, prove it, enforce it at runtime, and produce an independently verifiable record.",
    },

  },

  fr: {
    hero: {
      ...HERO_COPY.fr,
      body: (
        <>
          Ironproof vérifie chaque action critique avant qu’elle s’exécute — un paiement, un accès,
          une suppression, un déploiement. Si elle est autorisée, elle passe. Sinon, Ironproof{" "}
          <span className="metal-text">la bloque</span>{" "}&mdash; et scelle une trace que
          n’importe qui peut vérifier de façon indépendante.
        </>
      ),
      boundary:
        "Toute action que vous ne pouvez pas vous permettre de rater, peu importe qui la lance : une personne, un script ou un agent IA. Ce que votre politique autorise passe. Le reste est arrêté avant de s’exécuter, avec une trace scellée que n’importe qui peut vérifier.",
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

    what: {
      eyebrow: "CE QU’EST IRONPROOF",
      title: "Un point de contrôle entre votre automatisation et les actions qu’on ne peut pas défaire.",
      lead: "Les agents IA, les API et les scripts peuvent déjà déplacer de l’argent, donner des accès, effacer des données et déployer du code, seuls. Ironproof se place devant ces actions et vérifie chacune contre vos règles avant qu’elle s’exécute.",
      allowed: "Autorisée",
      allowedResult: "exécution.",
      blocked: "Non autorisée",
      blockedResult: "pas d’exécution.",
      pillars: [
        {
          title: "Vérifié avant, pas journalisé après",
          body: "Chaque action attend à la barrière tant qu’elle ne respecte pas votre politique. Aucun modèle de langage ne décide : la même demande, sous la même politique, reçoit toujours la même réponse.",
        },
        {
          title: "Prouvé, pas testé",
          body: "On ne teste pas vos règles, on les prouve. Vous ressortez avec le cas exact qui les brise, ou la preuve qu’il n’en existe aucun.",
        },
        {
          title: "Scellé, vérifiable par tous",
          body: "Chaque décision, autorisée ou bloquée, est scellée. Votre auditeur la revérifie sur sa propre machine, sans nous.",
        },
      ],
    },

    authz: {
      eyebrow: "POURQUOI LA CONNEXION NE SUFFIT PAS",
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
      title: "Ni un tableau de bord, ni un garde-fou.",
      items: [
        {
          label: "Pas de la surveillance",
          body: "L’observabilité dit ce qui s’est passé. Ironproof décide avant : action bloquée, pas d’exécution.",
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
      actionsLabel: "LES ACTIONS",
      rulesLabel: "LES RÈGLES DÉJÀ ÉCRITES",
      items: [
        {
          name: "Banque et paiements",
          actions: ["Virements, remboursements et transferts", "Changements de bénéficiaire et limites quotidiennes", "Paiements en temps réel"],
          rules: "BSIF E-23 · BSIF B-13 · LAPD · programmes LBA",
        },
        {
          name: "Hypothécaire et prêt",
          actions: ["Approbations hors des limites de souscription", "Déboursement des fonds", "Changements aux coordonnées de versement"],
          rules: "BSIF B-20 · LRPCFAT (secteur hypothécaire, depuis oct. 2024)",
        },
        {
          name: "Assurance",
          actions: ["Approbations automatisées de réclamations", "Décisions de souscription", "Versements"],
          rules: "BSIF E-23 · ligne directrice de l’AMF sur l’IA",
        },
        {
          name: "Jeu en ligne",
          actions: ["Limites de dépôt et de mise", "Versements de gains", "Autoexclusion"],
          rules: "Normes du registrateur de la CAJO (Ontario)",
        },
        {
          name: "Gouvernement et défense",
          actions: ["Mises à jour de dossiers officiels", "Approbations et dépenses", "Accès aux systèmes sensibles"],
          rules: "Orientation du SCT sur l’IA agentique · ITSG-33",
        },
        {
          name: "Santé",
          actions: ["Accès aux dossiers patients", "Changements d’ordonnances", "Exportations de données"],
          rules: "LPRPS · Loi 25 · LPRPDE",
        },
        {
          name: "Énergie et infrastructures critiques",
          actions: ["Changements de consignes et de configuration", "Opérations à distance sur les systèmes de contrôle", "Déploiements en production"],
          rules: "IEC 62443 · NERC CIP",
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
      title: "Les systèmes commencent à agir seuls.",
      lead: "Des agents, des scripts et des chaînes automatisées déplacent déjà de l’argent, modifient des accès et déploient du code sans personne dans la boucle. Les régulateurs et les banques y ont mis des dates. Chaque élément renvoie à sa source.",
      items: [
        {
          date: "2 mars 2026",
          what: "Santander et Mastercard réalisent le premier paiement de bout en bout exécuté par un agent IA en Europe, sur l’infrastructure de paiement réelle d’une banque réglementée.",
          source: "Santander, communiqué",
          href: SRC_SANTANDER_AGENT_PAY,
        },
        {
          date: "13 juil. 2026",
          what: "Le BSIF publie son bulletin sur l’IA générative et agentique : des agents qui raisonnent, planifient, décident et agissent sans intervention humaine exigent le moindre privilège et une piste d’audit pour chaque activité lancée par l’IA.",
          source: "BSIF, bulletin sur l’IA générative et agentique",
          href: SRC_OSFI_AGENTIC,
        },
        {
          date: "1er sept. 2026",
          what: "EY : 52 % des banques ont piloté l’IA agentique, 16 % seulement ont des cas d’usage pleinement déployés. « Une banque ne peut pas simplement dire qu’un système d’IA est gouverné. Elle doit pouvoir le prouver. » (notre traduction)",
          source: "EY, How governed intelligence can scale agentic banking",
          href: SRC_EY_AGENTIC,
        },
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
      foot: "Quand un système peut agir seul, la décision doit se prendre avant que l’action parte, pas se lire dans un journal après coup.",
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
          Découvertes par <span className="metal-text">Dominik Blain</span>{" "}et Cobalt, créditées
          sur les dépôts des projets eux-mêmes &mdash; recherche publiée, CVE assignées et
          remerciements publics en amont.
        </>
      ),
      cta: "VOIR LE DOSSIER TECHNIQUE",
    },

    pilot: PILOT_COPY.fr,

    closing: {
      titleA: "Probablement sûr, ce n’est pas",
      titleB: "prouvé impossible.",
      body: "Les agents déplacent déjà de l’argent, donnent des accès et modifient la production, seuls. On vous montre exactement où votre politique casse, ou on prouve qu’elle ne peut pas casser. Ensuite, chaque action est vérifiée avant de s’exécuter : ce qui est autorisé passe, scellé ; pour le reste, pas d’exécution.",
      kicker: "Chaque action vérifiée. Ce qui est prouvé s’exécute. Le reste, jamais.",
      scope:
        "Prouvé pour les actions et la politique que vous définissez, là où l’action ne peut s’exécuter qu’en passant par la barrière. Le certificat énonce cette frontière.",
    },

    cta: {
      title: "Mettez une action critique derrière la frontière.",
      lead: "Choisissez un paiement, un octroi d’accès, une suppression ou un déploiement. Ironproof définira la frontière d’autorisation, la prouvera, l’appliquera à l’exécution et produira une trace vérifiable de façon indépendante.",
    },

  },
};

/* A decorative photograph from the steel-and-gold series. The copy around it
 * carries the meaning, so the image is hidden from assistive tech. */
function PhotoPlate({ src, wide = false, position }: { src: string; wide?: boolean; position?: string }) {
  if (!src) return null;
  return (
    <div className={`photo-plate fade-up${wide ? " photo-plate-wide" : ""}`} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        loading="eager"
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}

export function Landing({ locale = defaultLocale }: { locale?: Locale }) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const t = pick(T, locale);

  return (
    <div className="flex flex-1 flex-col">
      {/* NAV */}
      <LandingHeader locale={locale} />

      <main className="flex-1">
        {/* 1. HERO — the product, in one sentence, before any mechanism */}
        <section id="top" className="hero-agent relative z-10 flex items-center overflow-hidden px-6 md:px-14">
          {/* Dual control: two people, two keys, one lamp (Dom, 2026-09-26). A bank
            * reads it before any caption: nothing irreversible runs on one say-so.
            * Documentary light, not a render, because the buyer is a risk
            * committee. Full-bleed and melted into the page on every edge. */}
          <div className="hero-agent-photo" aria-hidden="true">
            <Image
              src="/media/hero-keys.jpg"
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="hero-agent-scrim" aria-hidden="true" />
          {/* Phone: the head gets its own portrait crop, above the copy, instead
            * of the desktop frame squeezed behind the text. */}
          <div className="hero-agent-mobile md:hidden" aria-hidden="true">
            <Image
              src="/media/hero-keys-m.jpg"
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center md:grid-cols-2">
            <div className="fade-up min-w-0">
              {/* Three things, nothing else: what we are, the sentence, two doors.
                * The explanation that used to sit here now opens the next screen. */}
              {/* The full lockup opens the statement: a young name is learned by
                * seeing it large once, even with the header 200 px above (Dom, 2026-09-26). */}
              <div className="mb-8 flex items-center gap-5">
                <IronproofMark height={112} preload className="h-16 w-auto md:h-24" />
                <span className="track-logo iron-brushed text-2xl font-semibold max-[380px]:text-lg max-[380px]:tracking-[0.3em] md:text-4xl">IRONPROOF</span>
              </div>
              <p className="seal-label track-wide mb-7 text-[11px] md:text-xs">{t.hero.eyebrow}</p>
              {/* Set like a statement, not a poster: serif, sentence case, the
                * consequence in the same gold as the lamp between the two keys. */}
              <h1 className="hero-serif mb-8 font-serif font-normal text-neutral-100">
                {t.hero.headline}
                <br />
                <em className="text-seal">{t.hero.headlineEnd}</em>
              </h1>
              <p className="mb-10 max-w-md text-sm font-light leading-relaxed text-neutral-400 md:text-base">
                {/* The initiator list lives on the gate itself (AI AGENT, API, SCRIPT,
                  * PERSON plates) and in #initiators; the hero keeps the claim only. */}
                <span className="text-neutral-200">{t.hero.boundary}</span>
              </p>
              {/* One primary action (the site-wide CTA) and one quiet way in.
                * "Verify a real decision" left the first screen: the vault has
                * its own section further down. */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={`${r}/pilot`}
                  className="track-mid inline-flex items-center gap-3 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  {t.hero.ctaPilot} <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href="#decide"
                  className="track-mid inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
                >
                  {t.hero.ctaDecide} <span aria-hidden="true">&darr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT IRONPROOF IS — the product in plain words, before any mechanism */}
        <section id="what" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="fade-up max-w-4xl">
              <p className="seal-label track-mid mb-5 text-xs">{t.what.eyebrow}</p>
              <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">
                {t.what.title}
              </h2>
              <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
                {t.what.lead}
              </p>
            </div>
            <div className="fade-up mt-14 grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 sm:grid-cols-2">
              <p className="flex items-baseline gap-4 bg-ink px-7 py-7 font-serif text-2xl text-neutral-100 md:text-4xl">
                <span className="text-seal">{t.what.allowed}</span>
                <span className="text-neutral-500" aria-hidden="true">&rarr;</span>
                <span>{t.what.allowedResult}</span>
              </p>
              <p className="flex items-baseline gap-4 bg-ink px-7 py-7 font-serif text-2xl text-neutral-100 md:text-4xl">
                <span className="text-[#ffb4b4]">{t.what.blocked}</span>
                <span className="text-neutral-500" aria-hidden="true">&rarr;</span>
                <span>{t.what.blockedResult}</span>
              </p>
            </div>
            <ol className="fade-up mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
              {t.what.pillars.map((p, i) => (
                <li key={p.title} className="border-t border-white/10 pt-6">
                  <span className="num-badge font-serif text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-serif text-2xl text-neutral-100">{p.title}</h3>
                  <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. WATCH IT DECIDE — four action classes, one gate */}
        <AgentScenarios locale={locale} verifyHref={`${r}/verify`} />

        {/* CREDITED-BY STRIP */}
        <section className="relative z-10 edge-t px-6 py-8 md:px-14">
          <div className="fade-up mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="track-mid text-xs text-neutral-500">{t.creditedBy}</span>
            {/* Each name opens the public commit, bug or release note that credits us. */}
            {CREDITED_STRIP.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="metal-text border-b border-transparent text-sm font-medium transition hover:border-white/40"
              >
                {c.name}
              </a>
            ))}
          </div>
        </section>

        {/* 6. WHY NOW — dated, each with its source */}
        <section id="now" className="relative z-10 isolate overflow-hidden edge-t px-6 py-28 md:px-14">
          {/* The financial district at night behind the whole section, traffic
            * flowing between the towers like payments that no longer wait for a
            * person (Dom, 2026-09-26). Darkened so the dated cards stay the subject. */}
          <div className="breath-photo breath-photo-deep" aria-hidden="true">
            <Image src="/media/district-night.jpg" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="mx-auto max-w-7xl">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.now.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.now.title}</h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.now.lead}</p>
          </div>
          <ol className="fade-up grid gap-6 md:grid-cols-2">
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
          </div>
        </section>

        {/* 7. WHAT ONLY A PROOF DOES — the whole policy, not rule by rule */}
        <section id="why" className="relative z-10 isolate overflow-hidden edge-t px-6 py-28 md:px-14 md:py-32">
          <div className="breath-photo" aria-hidden="true">
            {/* Hundreds of boxes that hold, one standing open: the exact sequence that
              * breaks the policy, found among all the ones that do not (Dom, 2026-09-26). */}
            <Image src="/media/vault-grid.jpg" alt="" fill loading="eager" sizes="100vw" className="object-cover" />
          </div>
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

        {/* PROVE -> ENFORCE -> SEAL -> VERIFY */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
            <div className="max-w-3xl">
              <p className="seal-label track-mid mb-4 text-xs">{t.how.eyebrow}</p>
              <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
                {t.how.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.how.lead}</p>
              <p className="mt-4 max-w-2xl text-lg font-light text-neutral-400">{t.how.compiler}</p>
            </div>
            {/* The one image here: the decision struck into steel, with logo 09
              * (Dom, 2026-09-26). */}
            <PhotoPlate src="/media/seal-press-logo09.jpg" wide position="50% 55%" />
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


        {/* CLOSING — a closed vault door with a gold ring in a black marble hall
          * (Dom, 2026-09-26: closed says "impossible" better than open), full-bleed behind
          * a glass card. Documentary like the hero (Dom, 2026-09-26). Both halves
          * of the act in the body: what is proven runs, the rest never executes. */}
        <section className="closing-trio relative z-10 edge-t">
          <div className="closing-band closing-band-photo">
            <div className="closing-photo" aria-hidden="true">
              <Image src="/media/closing-vault-marble.jpg" alt="" fill loading="eager" sizes="100vw" className="closing-photo-desk object-cover" />
              <Image src="/media/closing-vault-marble-mobile.jpg" alt="" fill loading="eager" sizes="100vw" className="closing-photo-mob object-cover" />
            </div>
            <div className="closing-card fade-up">
              <p className="seal-label track-mid mb-5 text-[11px]">{t.closing.kicker}</p>
              <h2 className="font-serif text-4xl font-medium leading-[1.05] text-neutral-100 md:text-5xl">
                {t.closing.titleA}
                <br />
                <span className="text-seal">{t.closing.titleB}</span>
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-neutral-300">{t.closing.body}</p>
              <p className="mt-4 text-xs font-light leading-relaxed text-neutral-500">{t.closing.scope}</p>
              <a
                href={`${r}/pilot`}
                className="track-mid mt-8 inline-flex items-center gap-3 rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
              >
                {t.hero.ctaPilot} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

      </main>


      <FadeUpInit />
    </div>
  );
}

/* The counterexample's closing breath, moved with it to /proof: a green that
 * can never turn red is worth nothing, and the coverage is declared. */
export function CounterexampleBreath({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  return (
      <section className="relative z-10 isolate overflow-hidden px-6 py-28 md:px-14 md:py-32">
        {/* One missing link and the chain parts: the removed clause, as an object. */}
        <div className="breath-photo" aria-hidden="true">
          <Image src="/media/broken-chain.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
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
  );
}
