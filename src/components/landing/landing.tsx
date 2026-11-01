import Image from "next/image";
import { CREDITED_STRIP, PUBLISHED_CVES } from "./credibility";
import { SealLive } from "./seal-live";
import { HERO_COPY, HERO_ENGINE_COPY } from "./hero-copy";
import { LandingHeader } from "./landing-header";
import { FadeUpInit } from "./fade-up-init";
import { AgentScenarios } from "./agent-scenarios";
import { ProofPipeline } from "./proof-pipeline";
import { PILOT_COPY } from "./pilot-copy";
import { NorthStar, UseCases, WhyIronproof } from "./platform";
import { PlatformHow } from "./platform-how";
import { RewriteCheck } from "./rewrite-check";
import { JourneyRail } from "./journey-rail";
import { firstSealedEntryHash } from "@/lib/evidence";
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
/** One tile of the proven / sealed / verifiable trio. */
type TrioItem = { tag: string; title: string; body: string; img: string };
/** A case Ironproof has actually run, with its date and its number. */
/** figure + figureLabel: the headline number of the run, set large above the
 *  text (Dom, 2026-10-16: "les numbers pas buried"). Each figure is the first
 *  number of its own result line, never a new claim. */
type RunCase = { name: string; figure: string; figureLabel: string; what: string; result: string; date: string };

type Copy = {
  hero: {
    eyebrow: string;
    eyebrowSub: string;
    /** Two clauses: the condition (plain) and the consequence (gold italic). */
    headline: string;
    headlineEnd: string;
    value: string;
    body: React.ReactNode;
    boundary: string;
    initiators: string;
    authorized: string;
    unauthorized: string;
    executes: string;
    refused: string;
    ctaDecide: string;
    ctaSend: string;
    ctaPilot: string;
    ctaTech: string;
    ctaEvidence: string;
    logoTitle: string;
  };

  takeaway: React.ReactNode;
  blockIsNotSilence: string;

  sheet: {
    eyebrow: string;
    title: string;
    sheetLabel: string;
    sheetBody: string;
    doorLabel: string;
    doorBody: string;
    foot: string;
  };

  what: {
    eyebrow: string;
    title: string;
    lead: string;
    refuse: string;
    refuseResult: string;
    evidence: string;
    evidenceResult: string;
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

  /** Three promises, three photographs of one family (Dom, 2026-10-15). */
  trio: { eyebrow: string; title: string; items: readonly TrioItem[]; foot: string };

  not: { eyebrow: string; title: string; items: readonly NotItem[]; foot: string };

  domains: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    actionsLabel: string;
    rulesLabel: string;
    /** Run on real, public material: date and number, never a promise. */
    runEyebrow: string;
    runTitle: string;
    runNote: string;
    /** Callouts drawn on the switch-panel photograph. */
    plateNotes: readonly PlateNote[];
    run: readonly RunCase[];
    appliesEyebrow: string;
    moreLabel: string;
    items: readonly Domain[];
  };

  breathFrameworks: React.ReactNode;

  now: { eyebrow: string; title: string; lead: string; items: readonly Dated[]; foot: string };
  /** The home page's why-now, three lines, no dates (Dom, 2026-10-19). */
  nowShort: { eyebrow: string; lines: readonly string[] };

  gate: { eyebrow: string; title: string; lead: string; foot: string };

  breathCounterexample: React.ReactNode;
  breathCoverage: React.ReactNode;

  why: {
    eyebrow: string;
    title: React.ReactNode;
    lead: string;
    chainCaption: string;
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
    /** Callouts drawn on the seal photograph. */
    plateNotes: readonly PlateNote[];
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
  closing: {
    titleA: string;
    titleB: string;
    body: string;
    kicker: string;
    scope: string;
    /** Callouts on the bust: what each material stands for (Dom, 2026-10-15). */
    notes: readonly PlateNote[];
  };

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

// Defence items (2026-09-30). How each page was read, because a date on this
// page without an opened source is the failure the product exists to prevent:
// - canada.ca pages (strategy briefing, departmental plan): opened in a real
//   browser, quoted text found on the page; canada.ca refused curl.
// - NATO STO: opened in a real browser. It is ONE AUTHOR's symposium paper
//   (R. Searle, STO-MP-IST-210), not a NATO position: the card says "a paper".
//   The page gives "Year: 2026" and an upload date, hence "Feb 2026".
// - CBC: article dated 22 Sep 2026, remarks made the Monday before (21 Sep).
const SRC_DND_DIS =
  "https://www.canada.ca/en/department-national-defence/corporate/reports-publications/proactive-disclosure/2026/nddn-defence-industrial-strategy.html";
const SRC_NATO_AGENTIC =
  "https://www.sto.nato.int/document/a-cryptographic-trust-framework-for-agentic-autonomy-in-defence/";
const SRC_CBC_MOLSTAD = "https://www.cbc.ca/news/business/canada-ai-robots-miliatary-9.7353399";
const SRC_DND_PLAN =
  "https://www.canada.ca/en/department-national-defence/corporate/reports-publications/departmental-plans/departmental-plan-2026-27.html";

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
        "When a machine rewrites your code, Ironproof compares it with the program it replaces. We show the exact input where they no longer do the same thing, and we say what we couldn’t decide.\nWe don’t build what we verify.\nIndependent. Sealed. Verifiable without trusting us.",
      initiators: "AI agent. API. Script. Person.",
      authorized: "AUTHORIZED",
      unauthorized: "UNAUTHORIZED",
      executes: "EXECUTES",
      refused: "BLOCKED",
      ctaDecide: "WATCH IT DECIDE",
      ctaSend: "SEND US A TRANSLATION",
      ctaPilot: "START A PILOT",
      ctaTech: "EXPLORE OUR TECHNOLOGY",
      ctaEvidence: "SEE THE EVIDENCE",
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

    sheet: {
      eyebrow: "THE PROBLEM",
      title: "Critical systems run on verdicts no one can check.",
      sheetLabel: "WHAT YOU GET TODAY: A VERDICT",
      sheetBody:
        "A test says pass. A scanner says safe. A model says compliant. A vendor says trust us. Each one is a verdict. None comes with evidence you can re-check yourself, so in the end you are asked to believe.",
      doorLabel: "WHAT IRONPROOF RETURNS: THE EVIDENCE",
      doorBody:
        "What holds, proven. What breaks, with the exact case that breaks it. What could not be shown, said as such. Every result is sealed and can be checked without us.",
      foot: "Three questions where a verdict costs the most: may this action run? Does this C fix really close the hole? Does the migrated COBOL do what the old one did?",
    },
    what: {
      eyebrow: "WHAT IRONPROOF IS",
      title: "A checkpoint between your automation and the actions it can’t undo.",
      lead: "AI agents, APIs and scripts can already move money, grant access, delete records and ship changes on their own. Ironproof sits in front of those actions and checks each one against your rules before it runs.",
      refuse: "No authorization.",
      refuseResult: "No execution.",
      evidence: "Every decision",
      evidenceResult: "backed by verifiable evidence.",
      pillars: [
        {
          title: "Checked before, not logged after",
          body: "Every action waits at the gate until it clears your policy. On the production gate, no language model decides: the same request, in the same state, under the same policy always gets the same answer.",
        },
        {
          title: "Proven, not just tested",
          body: "We don’t rely on testing alone: we prove what your rules permit. You leave with the exact case that breaks them, or the proof that no such case exists within the model you define.",
        },
        {
          title: "Sealed, so anyone can check",
          body: "Every decision, allowed, blocked or refused, is sealed — an allowed action before it runs. Your auditor re-derives the policy verdict on their own machine, with a verifier written from our specification, without us.",
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

    creditedBy: "ISSUES FOUND BY IRONPROOF’S RESEARCH, FIXED AND CREDITED BY",

    trio: {
      eyebrow: "WHAT YOU GET",
      title: "Proven. Sealed. Checked without us.",
      items: [
        {
          tag: "MATHEMATICALLY PROVEN",
          title: "Certainty, where it can be had.",
          body: "Whatever can be stated precisely, a policy, a C function, a COBOL translation, a solver proves it holds in every case the model allows, or returns the exact case that breaks it. When it cannot conclude, it says so.",
          img: "/media/trio-proven.jpg",
        },
        {
          tag: "POST-QUANTUM SEALED",
          title: "Every decision, set in metal.",
          body: "Every result, a proof, a counterexample or a gate decision, ships in a record sealed with Ed25519 and the post-quantum ML-DSA-65 signature. Change one figure and the seal breaks.",
          img: "/media/trio-sealed.jpg",
        },
        {
          tag: "INDEPENDENTLY VERIFIABLE",
          title: "Measured by anyone. Not by us.",
          body: "Your auditor checks the seal in a browser and re-runs the proof in their own solver, from the obligations we ship. Our word is never part of the check.",
          img: "/media/trio-verifiable.jpg",
        },
      ],
      foot: "We prove what can be proven, and say so when we cannot. A seal proves the record is intact, not that what it says is true.",
    },

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
          body: "No language model sits in the production decision path. The same request, in the same state, under the same policy always gets the same verdict.",
        },
        {
          label: "Not a penetration test",
          body: "A test samples cases. For rules over the history of approved actions, Ironproof proves the bound across every sequence, of any length — or returns the shortest one that breaks it. A rule it cannot model is reported as not exercised, never as proven.",
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
      titleA: "The rules your regulators already require.",
      titleB: "Ironproof checks every action against them.",
      lead: "The actions that cannot be taken back once they run. For those, authorization stops being a setting and becomes infrastructure.",
      actionsLabel: "THE ACTIONS",
      rulesLabel: "THE RULES ALREADY WRITTEN",
      runEyebrow: "ALREADY RUN",
      runTitle: "Verification runs — with the misses left in.",
      runNote: "Labs on published policies and open-source code, not client systems.",
      plateNotes: [
        { x: 47, y: 14, label: "ARMED · CHECKED BEFORE IT RUNS", gold: true },
        { x: 74, y: 82, label: "IRREVERSIBLE ONCE IT RUNS" },
      ],
      run: [
        {
          name: "Cloud authorization",
          figure: "160 / 185",
          figureLabel: "guarantees proven",
          what: "57 example IAM policies published by AWS, 185 guarantees written before the solver ran.",
          result: "Proven: 160 of 185 guarantees, each under two independent solvers (Z3 and cvc5). Refuted: 11 real findings, where a published policy does not do what its page says (8) or what a plain reading expects (3), each confirmed in AWS’s IAM policy simulator. Counterexamples traced to our own model are not counted.",
          date: "2026-09-30",
        },
        {
          name: "Energy",
          figure: "17 / 17",
          figureLabel: "cases decided as NERC’s text says",
          what: "The pre-change parts of the NERC CIP-010-4 R1 change-management requirement, encoded as a gate. A lab, with fictitious assets and identities.",
          result: "17 of 17 cases decided as NERC’s text says, plus 6 of 6 on two rules we added. 12 of 12 deliberate faults caught. Every signature re-verified from the sealed file alone.",
          date: "2026-10-09",
        },
        {
          name: "Open-source C",
          figure: "13 / 20",
          figureLabel: "fixes shown to close the flaw, within stated bounds",
          what: "20 fixes for real vulnerabilities drawn at random, from projects such as curl, libssh2 and Suricata.",
          result: "Within stated CBMC bounds, on a test our AI wrote for each fix. Closed: for 13 fixes, the test failed before the fix, passed after it, and rejected two decoys. Test fooled: for 3, the test could not tell a plausible wrong fix from the real one, which says nothing against the real fix. Not analyzed: 4. A bounded check of a generated test, not a complete proof.",
          date: "2026-10-12",
        },
      ],
      appliesEyebrow: "WHERE IT APPLIES — THE RULES ALREADY WRITTEN",
      moreLabel: "OTHER CRITICAL ACTIONS",
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
          name: "Government",
          actions: ["Updates to official records", "Approvals and spending", "Access to sensitive systems"],
          rules: "TBS guidance on agentic AI · ITSG-33",
        },
        {
          // "Delegated" is the house word (delegated authority). Never rules
          // of engagement, never weapon systems: we do no work on those.
          name: "Defence",
          actions: [
            "Tasks delegated to autonomous systems",
            "Software and configuration updates to fielded systems",
            "Access to controlled information",
          ],
          rules: "DND/CAF AI Strategy · ITSG-33 · Controlled Goods Program",
        },
        {
          name: "Healthcare",
          actions: ["Access to patient records", "Changes to orders and prescriptions", "Data exports"],
          rules: "PHIPA · Law 25 · PIPEDA",
        },
        {
          name: "Energy & critical infrastructure",
          actions: ["Remote setpoint and configuration changes", "Emergency shutdowns and safety-instrumented logic", "Water-treatment dosing and valve commands", "Configuration pushed to a telecom network core"],
          rules: "IEC 62443 · NERC CIP · IEC 61511-1 · Bill C-8, S.C. 2026, c. 9 — Critical Cyber Systems Protection Act (Royal Assent June 2026, not yet in force)",
        },
        // Pharma added 2026-10-13 (Dom), its rules opened at the source that day
        // (URLs in PR #102). Water, process safety and telecom were folded into
        // the row above the same evening: one strong row rather than three thin.
        {
          name: "Pharmaceutical manufacturing",
          actions: ["Electronic batch release", "Changes to master batch records", "Audit-trail changes"],
          rules: "Health Canada GMP Annex 11 (GUI-0050) · FDA 21 CFR Part 11",
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

    nowShort: {
      eyebrow: "WHY NOW",
      lines: [
        "AI translates legacy code faster than anyone can review it.",
        "Translation is getting cheap. Knowing it still behaves the same is not.",
        "The side that carries the risk, the bank, the ministry, the insurer, needs a check that does not come from the translator.",
      ],
    },
    now: {
      eyebrow: "WHY NOW",
      title: "Systems are starting to act on their own.",
      lead: "Agents, scripts and automated pipelines now move money, change access and ship code without a person in the loop. Regulators, banks and defence departments have put dates on it. Each item links to its source.",
      items: [
        {
          date: "Oct 9, 2025",
          what: "The Government of Canada sets its post-quantum migration deadlines: high-priority federal systems by the end of 2031, all remaining systems by the end of 2035.",
          source: "Treasury Board, SPIN on migrating to post-quantum cryptography",
          href: "https://www.canada.ca/en/government/system/digital-government/policies-standards/spin/migrating-government-canada-post-quantum-cryptography.html",
        },
        {
          date: "Dec 3, 2025",
          what: "Canada’s Cyber Centre co-signs joint guidance with CISA and allied agencies on AI in operational technology: integrating AI into “OT environments that manage essential public services” “introduces significant risks”.",
          source: "Canadian Centre for Cyber Security, joint guidance",
          href: "https://cyber.gc.ca/en/news-events/joint-guidance-principles-secure-integration-artificial-intelligence-operational-technology",
        },
        {
          date: "Feb 17, 2026",
          what: "Canada launches its first Defence Industrial Strategy. Its ten priority areas include digital systems, where artificial intelligence sits, and uncrewed and autonomous systems.",
          source: "National Defence, Defence Industrial Strategy briefing",
          href: SRC_DND_DIS,
        },
        {
          date: "Feb 2026",
          what: "A paper in the proceedings of NATO’s Science and Technology Organization: agentic systems “can affect system performance or the physical environment”, and an effective agentic control regime is “essential for the trustworthiness of autonomous military and intelligence AI systems”.",
          source: "NATO STO, symposium paper STO-MP-IST-210",
          href: SRC_NATO_AGENTIC,
        },
        {
          date: "Mar 2, 2026",
          what: "Santander and Mastercard complete Europe’s first live end-to-end payment executed by an AI agent, inside a regulated bank’s payment infrastructure.",
          source: "Santander, press release",
          href: SRC_SANTANDER_AGENT_PAY,
        },
        {
          date: "Jun 15, 2026",
          what: "Bill C-8, “An Act respecting cyber security”, receives Royal Assent. It amends the Telecommunications Act and makes consequential amendments to other Acts.",
          source: "Parliament of Canada, LEGISinfo C-8",
          href: "https://www.parl.ca/legisinfo/en/bill/45-1/c-8",
        },
        {
          date: "Jul 13, 2026",
          what: "OSFI publishes its bulletin on generative and agentic AI: agents that reason, plan, decide and take actions without human intervention call for least privilege and audit trails on every AI-initiated activity.",
          source: "OSFI, bulletin on generative and agentic AI",
          href: SRC_OSFI_AGENTIC,
        },
        {
          date: "Aug 2026",
          what: "FERC issues a letter order approving NERC’s proposed critical infrastructure protection standard CIP-015-2 for the bulk power system.",
          source: "FERC eLibrary, docket RD26-6",
          href: "https://elibrary.ferc.gov/eLibrary/filelist?accession_num=20260810-3047",
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
          date: "Sep 21, 2026",
          what: "Lt.-Gen. Darcy Molstad, commander of Canadian Joint Forces Command, tells industry the military will rapidly buy more autonomous systems: 399 vendors pre-qualified for the Defence Drone Initiative, five days to answer a request for proposals.",
          source: "CBC News",
          href: SRC_CBC_MOLSTAD,
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
        {
          date: "2030",
          what: "National Defence, 2026-27 Departmental Plan: “By 2030, we aim to be a secure, agile, AI-enabled organization.”",
          source: "National Defence, Departmental Plan 2026-27",
          href: SRC_DND_PLAN,
        },
      ],
      foot: "When a system can act on its own, the decision has to be made before the action runs, not read in a log afterwards.",
    },

    gate: {
      eyebrow: "ONE GATE, ANY INITIATOR",
      title: "The gate does not ask who is asking.",
      lead: "It asks whether the action is inside the policy in force. The same check applies to every path that can reach a critical system — which is why this is not an AI problem with an AI answer.",
      foot: "Every authorization records the action, the exact policy version by its digest, and the declared identity of the acting agent. Nothing executes without spending a single-use grant bound to that exact decision — and a spent grant stays spent across restarts.",
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
          Each payment can follow the rule while together they break it.{" "}
          <span className="metal-shine">We find it first.</span>
        </>
      ),
      lead: "A gate that checks each rule against each request can pass every rule while a sequence of compliant actions still breaks what the policy was meant to prevent. Ironproof checks the policy as a whole: it returns the exact sequence that breaks it, or the proof that none exists.",
      chainCaption: "Every link holds. The chain still breaks.",
      testVsProof: (
        <>
          A test tells you what it tried.{" "}
          <span className="metal-text">A proof tells you what&rsquo;s impossible.</span>
        </>
      ),
      scope: "Proven within the boundary you define. The certificate states that boundary.",
    },

    how: {
      eyebrow: "HOW THE GATE WORKS",
      title: "Prove. Enforce. Seal. Verify.",
      lead: "For a rule over the history of approved actions, Ironproof either proves, with an inductive invariant, that no sequence of any length can cross the defined authorization boundary, or returns the shortest sequence that does, replayed through the gate. When neither closes, it says so, and states the bound it searched.",
      compiler:
        "Your written policy is compiled into mathematics by a deterministic compiler — the same one the gate runs. A differential check, run at every start and in CI, refuses a policy the proof reads differently from the gate.",
      recordPre:
        "A policy proved and then broken, and the exact call site where the gate sits in front of the action, are in the ",
      recordLink: "technical record",
      plateNotes: [
        { x: 44, y: 20, label: "SEALED · POST-QUANTUM SIGNATURE", gold: true },
        { x: 6, y: 86, label: "EVERY DECISION · ALLOW OR BLOCK" },
      ],
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
      body: "Agents now move money, grant access and change production on their own. We show you exactly where your policy breaks, or prove that it can’t. Then every action routed through the gate is checked before it executes: what’s authorized runs, sealed; what isn’t never executes. And every result comes with what you need to verify it without us.",
      kicker: "Check what was rewritten. Run what complies. Stop the rest.",
      // The fine print under "provably impossible": what the proof covers, and
      // the one condition it rests on (the action can only run through the gate).
      scope:
        "For a translation: the exact input that differs, replayed; same-behavior answers are suspended. For an action: proven for the actions and the policy you define, where the action can only execute through the gate. Each certificate states its boundary.",
      notes: [
        { x: 57, y: 80, label: "MARBLE · HUMAN INTENT" },
        { x: 79, y: 12, label: "IRON · MACHINE RIGOUR" },
        { x: 82, y: 56, label: "GOLD · THE PROOF", gold: true },
      ],
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
        "Quand une machine réécrit votre code, on le compare au programme qu’il remplace. On vous montre l’entrée précise où les deux ne font plus la même chose, et on vous dit ce qu’on n’a pas pu trancher.\nOn ne bâtit pas ce qu’on vérifie.\nIndépendant. Scellé. Vérifiable sans avoir à nous croire.",
      initiators: "Agent IA. API. Script. Humain.",
      authorized: "AUTORISÉE",
      unauthorized: "NON AUTORISÉE",
      executes: "S’EXÉCUTE",
      refused: "BLOQUÉE",
      ctaDecide: "VOYEZ-LE DÉCIDER",
      ctaSend: "ENVOYEZ-NOUS UNE TRADUCTION",
      ctaPilot: "DÉMARRER UN PILOTE",
      ctaTech: "DÉCOUVRIR NOTRE TECHNOLOGIE",
      ctaEvidence: "VOIR LES PREUVES",
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

    sheet: {
      eyebrow: "LE PROBLÈME",
      title: "Les systèmes critiques tournent sur des verdicts que personne ne peut vérifier.",
      sheetLabel: "CE QU’ON VOUS DONNE AUJOURD’HUI : UN VERDICT",
      sheetBody:
        "Le test dit « réussi ». Le scanner dit « sûr ». Le modèle dit « conforme ». Le fournisseur dit « faites-nous confiance ». Chacun rend un verdict. Aucun ne vient avec une preuve que vous pouvez revérifier vous-même : au bout du compte, on vous demande de croire.",
      doorLabel: "CE QU’IRONPROOF REND : LA PREUVE",
      doorBody:
        "Ce qui tient, prouvé. Ce qui casse, avec le cas exact qui le casse. Ce qui n’a pas pu être démontré, dit comme tel. Chaque résultat est scellé et se vérifie sans nous.",
      foot: "Trois questions où un verdict coûte le plus cher : cette action peut-elle s’exécuter ? Ce correctif C ferme-t-il vraiment la faille ? Le COBOL migré fait-il ce que faisait l’ancien ?",
    },
    what: {
      eyebrow: "CE QU’EST IRONPROOF",
      title: "Un point de contrôle entre votre automatisation et les actions irréversibles.",
      lead: "Les agents IA, les API et les scripts peuvent déjà déplacer de l’argent, donner des accès, effacer des données et déployer du code, seuls. Ironproof se place devant ces actions et vérifie chacune contre vos règles avant qu’elle s’exécute.",
      refuse: "Pas d’autorisation.",
      refuseResult: "Pas d’exécution.",
      evidence: "Chaque décision",
      evidenceResult: "appuyée par une preuve vérifiable.",
      pillars: [
        {
          title: "Vérifié avant, pas journalisé après",
          body: "Chaque action attend à la barrière tant qu’elle ne respecte pas votre politique. Sur la barrière de production, aucun modèle de langage ne décide : la même demande, dans le même état, sous la même politique, reçoit toujours la même réponse.",
        },
        {
          title: "Prouvé, pas seulement testé",
          body: "On ne se fie pas qu’aux tests : on prouve ce que vos règles permettent. Vous ressortez avec le cas exact qui les brise, ou la preuve qu’il n’en existe aucun dans le modèle que vous définissez.",
        },
        {
          title: "Scellé, vérifiable par tous",
          body: "Chaque décision, autorisée, bloquée ou refusée, est scellée — une action autorisée, avant de s’exécuter. Votre auditeur recalcule le verdict de la politique sur sa propre machine, avec un vérificateur écrit à partir de notre spécification, sans nous.",
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

    creditedBy: "DÉFAUTS TROUVÉS PAR LA RECHERCHE D’IRONPROOF, CORRIGÉS ET CRÉDITÉS PAR",

    trio: {
      eyebrow: "CE QUE VOUS OBTENEZ",
      title: "Prouvé. Scellé. Vérifié sans nous.",
      items: [
        {
          tag: "PROUVÉ MATHÉMATIQUEMENT",
          title: "La certitude, là où elle existe.",
          body: "Tout ce qui s’énonce avec précision, une politique, une fonction C, une traduction COBOL, un solveur prouve que ça tient dans tous les cas que le modèle permet, ou rend le cas exact qui le brise. Quand il ne peut pas conclure, il le dit.",
          img: "/media/trio-proven.jpg",
        },
        {
          tag: "SCELLÉ POST-QUANTIQUE",
          title: "Chaque décision, gravée dans le métal.",
          body: "Chaque résultat, une preuve, un contre-exemple ou une décision de la barrière, part dans un registre scellé avec Ed25519 et la signature post-quantique ML-DSA-65. Changez un chiffre et le sceau se brise.",
          img: "/media/trio-sealed.jpg",
        },
        {
          tag: "VÉRIFIABLE DE FAÇON INDÉPENDANTE",
          title: "Mesuré par n’importe qui. Pas par nous.",
          body: "Votre auditeur vérifie le sceau dans un navigateur et rejoue la preuve dans son propre solveur, à partir des obligations que nous livrons. Notre parole ne fait jamais partie du contrôle.",
          img: "/media/trio-verifiable.jpg",
        },
      ],
      foot: "Nous prouvons ce qui peut l’être, et nous le disons quand nous ne le pouvons pas. Un sceau prouve que le registre est intact, pas que son contenu est vrai.",
    },

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
          body: "Aucun modèle de langage dans le chemin de décision de production. La même demande, dans le même état, sous la même politique reçoit toujours le même verdict.",
        },
        {
          label: "Pas un test d’intrusion",
          body: "Un test échantillonne des cas. Pour les règles qui portent sur l’historique des actions autorisées, Ironproof prouve la borne sur toute séquence, de n’importe quelle longueur — ou rend la plus courte qui la casse. Une règle qu’il ne sait pas modéliser est déclarée non exercée, jamais prouvée.",
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
      titleA: "Les règles que vos régulateurs exigent déjà.",
      titleB: "Ironproof y confronte chaque action.",
      lead: "Les actions qu’on ne peut plus reprendre une fois exécutées. Pour celles-là, l’autorisation cesse d’être un réglage et devient une infrastructure.",
      actionsLabel: "LES ACTIONS",
      rulesLabel: "LES RÈGLES DÉJÀ ÉCRITES",
      runEyebrow: "DÉJÀ FAIT",
      runTitle: "Vérifications menées — les échecs compris.",
      runNote: "Des labos sur des politiques publiées et du code open source, pas des systèmes de clients.",
      plateNotes: [
        { x: 47, y: 14, label: "ARMÉ · VÉRIFIÉ AVANT D’AGIR", gold: true },
        { x: 74, y: 82, label: "IRRÉVERSIBLE UNE FOIS EXÉCUTÉ" },
      ],
      run: [
        {
          name: "Autorisation cloud",
          figure: "160 / 185",
          figureLabel: "garanties prouvées",
          what: "57 politiques IAM d’exemple publiées par AWS, 185 garanties écrites avant de lancer le solveur.",
          result: "Prouvé : 160 garanties sur 185, chacune sous deux solveurs indépendants (Z3 et cvc5). Réfuté : 11 vraies trouvailles, où une politique publiée ne fait pas ce que sa page dit (8) ou ce qu’une lecture simple attend (3), chacune confirmée dans le simulateur de politiques IAM d’AWS. Les contre-exemples venus de notre propre modèle ne sont pas comptés.",
          date: "2026-09-30",
        },
        {
          name: "Énergie",
          figure: "17 / 17",
          figureLabel: "cas tranchés comme le dit le texte de NERC",
          what: "Les parties avant changement de l’exigence NERC CIP-010-4 R1, encodées en barrière. Un labo, avec des actifs et des identités fictifs.",
          result: "17 cas sur 17 tranchés comme le dit le texte de NERC, plus 6 sur 6 sur deux règles que nous avons ajoutées. 12 fautes volontaires sur 12 attrapées. Chaque signature revérifiée depuis le dossier scellé seul.",
          date: "2026-10-09",
        },
        {
          name: "C open source",
          figure: "13 / 20",
          figureLabel: "correctifs qui ferment la faille, dans des bornes déclarées",
          what: "20 correctifs de vraies failles tirés au hasard, dans des projets comme curl, libssh2 et Suricata.",
          result: "Dans les bornes CBMC déclarées, sur un test écrit par notre IA pour chaque correctif. Fermé : pour 13 correctifs, le test échouait avant, passait après et rejetait deux leurres. Test trompé : pour 3, le test ne distinguait pas un faux correctif plausible du vrai, ce qui ne dit rien contre le vrai correctif. Non analysé : 4. Une vérification bornée d’un test généré, pas une preuve complète.",
          date: "2026-10-12",
        },
      ],
      appliesEyebrow: "OÙ ÇA S’APPLIQUE — LES RÈGLES DÉJÀ ÉCRITES",
      moreLabel: "AUTRES ACTIONS CRITIQUES",
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
          name: "Gouvernement",
          actions: ["Mises à jour de dossiers officiels", "Approbations et dépenses", "Accès aux systèmes sensibles"],
          rules: "Orientation du SCT sur l’IA agentique · ITSG-33",
        },
        {
          name: "Défense",
          actions: [
            "Tâches déléguées aux systèmes autonomes",
            "Mises à jour logicielles et de configuration des systèmes en service",
            "Accès à l’information contrôlée",
          ],
          rules: "Stratégie d’IA du MDN et des FAC · ITSG-33 · Programme des marchandises contrôlées",
        },
        {
          name: "Santé",
          actions: ["Accès aux dossiers patients", "Changements d’ordonnances", "Exportations de données"],
          rules: "LPRPS · Loi 25 · LPRPDE",
        },
        {
          name: "Énergie et infrastructures critiques",
          actions: ["Changements de consignes et de configuration à distance", "Arrêts d’urgence et logique instrumentée de sécurité", "Dosage chimique et commandes de vannes en traitement de l’eau", "Configuration poussée au cœur d’un réseau de télécommunications"],
          rules: "IEC 62443 · NERC CIP · IEC 61511-1 · Projet de loi C-8, L.C. 2026, ch. 9 — Loi sur la protection des cybersystèmes essentiels (sanction royale juin 2026, pas encore en vigueur)",
        },
        // Pharma ajouté le 2026-10-13 (Dom), règles ouvertes à la source ce jour-là (PR #102).
        // Eau, procédés et télécoms fondus dans la ligne du dessus le même soir.
        {
          name: "Fabrication pharmaceutique",
          actions: ["Libération électronique d’un lot", "Changements aux dossiers maîtres de production", "Modifications de la piste d’audit"],
          rules: "Santé Canada, BPF Annexe 11 (GUI-0050) · FDA 21 CFR Part 11",
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

    nowShort: {
      eyebrow: "POURQUOI MAINTENANT",
      lines: [
        "L’IA traduit le vieux code plus vite que quiconque peut le relire.",
        "Traduire coûte de moins en moins cher. Savoir si le code fait encore la même chose, non.",
        "Celui qui porte le risque, la banque, le ministère, l’assureur, a besoin d’une vérification qui ne vient pas du traducteur.",
      ],
    },
    now: {
      eyebrow: "POURQUOI MAINTENANT",
      title: "Les systèmes commencent à agir seuls.",
      lead: "Des agents, des scripts et des chaînes automatisées déplacent déjà de l’argent, modifient des accès et déploient du code sans personne dans la boucle. Les régulateurs, les banques et les ministères de la défense y ont mis des dates. Chaque élément renvoie à sa source.",
      items: [
        {
          date: "9 oct. 2025",
          what: "Le gouvernement du Canada fixe ses échéances de migration post-quantique : les systèmes fédéraux prioritaires d’ici la fin de 2031, tous les autres d’ici la fin de 2035.",
          source: "Conseil du Trésor, AMOPS sur la migration vers la cryptographie post-quantique",
          href: "https://www.canada.ca/en/government/system/digital-government/policies-standards/spin/migrating-government-canada-post-quantum-cryptography.html",
        },
        {
          date: "3 déc. 2025",
          what: "Le Centre canadien pour la cybersécurité cosigne avec la CISA et des agences alliées une orientation sur l’IA dans les technologies opérationnelles : intégrer l’IA aux environnements qui gèrent des services publics essentiels « introduit des risques importants » (notre traduction).",
          source: "Centre canadien pour la cybersécurité, orientation conjointe",
          href: "https://cyber.gc.ca/en/news-events/joint-guidance-principles-secure-integration-artificial-intelligence-operational-technology",
        },
        {
          date: "17 févr. 2026",
          what: "Le Canada lance sa première Stratégie industrielle de défense. Ses dix domaines prioritaires comprennent les systèmes numériques, où figure l’intelligence artificielle, et les systèmes sans équipage et autonomes.",
          source: "Défense nationale, note sur la Stratégie industrielle de défense",
          href: SRC_DND_DIS,
        },
        {
          date: "Févr. 2026",
          what: "Un article des actes de l’Organisation pour la science et la technologie de l’OTAN : les systèmes agentiques « peuvent agir sur la performance d’un système ou sur l’environnement physique », et un régime de contrôle efficace est « essentiel à la fiabilité des systèmes d’IA militaires et de renseignement autonomes ». (notre traduction)",
          source: "OTAN STO, article de symposium STO-MP-IST-210",
          href: SRC_NATO_AGENTIC,
        },
        {
          date: "2 mars 2026",
          what: "Santander et Mastercard réalisent le premier paiement de bout en bout exécuté par un agent IA en Europe, sur l’infrastructure de paiement réelle d’une banque réglementée.",
          source: "Santander, communiqué",
          href: SRC_SANTANDER_AGENT_PAY,
        },
        {
          date: "15 juin 2026",
          what: "Le projet de loi C-8, « Loi concernant la cybersécurité », reçoit la sanction royale. Il modifie la Loi sur les télécommunications et apporte des modifications corrélatives à d’autres lois.",
          source: "Parlement du Canada, LEGISinfo C-8",
          href: "https://www.parl.ca/legisinfo/en/bill/45-1/c-8",
        },
        {
          date: "13 juil. 2026",
          what: "Le BSIF publie son bulletin sur l’IA générative et agentique : des agents qui raisonnent, planifient, décident et agissent sans intervention humaine exigent le moindre privilège et une piste d’audit pour chaque activité lancée par l’IA.",
          source: "BSIF, bulletin sur l’IA générative et agentique",
          href: SRC_OSFI_AGENTIC,
        },
        {
          date: "Août 2026",
          what: "La FERC approuve par lettre la norme de protection des infrastructures critiques CIP-015-2 proposée par la NERC pour le réseau électrique de grande puissance.",
          source: "FERC eLibrary, dossier RD26-6",
          href: "https://elibrary.ferc.gov/eLibrary/filelist?accession_num=20260810-3047",
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
          date: "21 sept. 2026",
          what: "Le lieutenant-général Darcy Molstad, commandant du Commandement des forces interarmées du Canada, annonce à l’industrie que l’armée achètera rapidement plus de systèmes autonomes : 399 fournisseurs préqualifiés pour l’Initiative liée aux drones de la défense, cinq jours pour répondre à une demande de propositions.",
          source: "CBC News",
          href: SRC_CBC_MOLSTAD,
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
        {
          date: "2030",
          what: "Défense nationale, Plan ministériel 2026-27 : « D’ici 2030, nous visons à être une organisation sécurisée, agile et axée sur l’IA. » (notre traduction)",
          source: "Défense nationale, Plan ministériel 2026-27",
          href: SRC_DND_PLAN,
        },
      ],
      foot: "Quand un système peut agir seul, la décision doit se prendre avant que l’action parte, pas se lire dans un journal après coup.",
    },

    gate: {
      eyebrow: "UNE SEULE BARRIÈRE, PEU IMPORTE QUI DEMANDE",
      title: "La barrière ne demande pas qui demande.",
      lead: "Elle demande si l’action est à l’intérieur de la politique en vigueur. La même vérification s’applique à tous les chemins qui mènent à un système critique — c’est pourquoi ce n’est pas un problème d’IA qui appelle une réponse d’IA.",
      foot: "Chaque autorisation consigne l’action, la version exacte de la politique par son empreinte, et l’identité déclarée de l’agent qui agit. Rien ne s’exécute sans dépenser un jeton à usage unique lié à cette décision exacte — et un jeton dépensé le reste après un redémarrage.",
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
          Chaque paiement peut respecter la règle, et leur total la trahir.{" "}
          <span className="metal-shine">On le trouve avant.</span>
        </>
      ),
      lead: `Une barrière qui vérifie chaque règle contre chaque demande peut toutes les laisser passer alors qu’une suite d’actions conformes brise ce que la politique devait empêcher. Ironproof vérifie la politique comme un tout${NBSP}: il rend la séquence exacte qui la casse, ou la preuve qu’aucune n’existe.`,
      chainCaption: "Chaque maillon tient. La chaîne casse quand même.",
      testVsProof: (
        <>
          Un test vous dit ce qu’il a essayé.{" "}
          <span className="metal-text">Une preuve vous dit ce qui est impossible.</span>
        </>
      ),
      scope: "Prouvé à l’intérieur de la frontière que vous définissez. Le certificat énonce cette frontière.",
    },

    how: {
      eyebrow: "COMMENT FONCTIONNE LA BARRIÈRE",
      title: "Prouver. Appliquer. Sceller. Vérifier.",
      lead: "Pour une règle qui porte sur l’historique des actions autorisées, Ironproof prouve, par un invariant inductif, qu’aucune séquence de n’importe quelle longueur ne peut franchir la frontière d’autorisation définie, ou rend la plus courte séquence qui la franchit, rejouée dans la barrière. Quand ni l’un ni l’autre n’aboutit, il le dit et donne la borne explorée.",
      compiler:
        "Votre politique écrite est compilée en mathématiques par un compilateur déterministe — le même que celui qu’exécute la barrière. Un contrôle différentiel, à chaque démarrage et en intégration continue, refuse une politique que la preuve lirait autrement que la barrière.",
      recordPre:
        "Une politique prouvée puis brisée, et l’endroit exact où la barrière se place devant l’action, sont dans le ",
      recordLink: "registre technique",
      plateNotes: [
        { x: 40, y: 20, label: "SCELLÉ · SIGNATURE POST-QUANTIQUE", gold: true },
        { x: 6, y: 86, label: "CHAQUE DÉCISION · PERMISE OU BLOQUÉE" },
      ],
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
      cta: "VOIR LE REGISTRE TECHNIQUE",
    },

    pilot: PILOT_COPY.fr,

    closing: {
      titleA: "Probablement sûr, ce n’est pas",
      titleB: "prouvé impossible.",
      body: "Les agents déplacent déjà de l’argent, donnent des accès et modifient la production, seuls. On vous montre exactement où votre politique casse, ou on prouve qu’elle ne peut pas casser. Ensuite, chaque action qui passe par la barrière est vérifiée avant de s’exécuter : ce qui est autorisé passe, scellé ; le reste ne s’exécute jamais. Et chaque résultat vient avec ce qu’il faut pour le vérifier sans nous.",
      kicker: "Ce qui est réécrit est vérifié. Ce qui est conforme passe. Le reste, jamais.",
      scope:
        "Pour une traduction : l’entrée précise qui diffère, rejouée ; les réponses « même comportement » sont suspendues. Pour une action : prouvé pour les actions et la politique que vous définissez, à condition que l’action ne puisse passer que par la barrière. Chaque certificat dit où s’arrête sa preuve.",
      notes: [
        { x: 57, y: 80, label: "MARBRE · L’INTENTION HUMAINE" },
        { x: 76, y: 12, label: "FER · LA RIGUEUR DE LA MACHINE" },
        { x: 82, y: 56, label: "OR · LA PREUVE", gold: true },
      ],
    },

    cta: {
      title: "Mettez une action critique derrière la frontière.",
      lead: "Choisissez un paiement, un octroi d’accès, une suppression ou un déploiement. Ironproof définira la frontière d’autorisation, la prouvera, l’appliquera à l’exécution et produira une trace vérifiable de façon indépendante.",
    },

  },
};

/* A decorative photograph from the steel-and-gold series. The copy around it
 * carries the meaning, so the image is hidden from assistive tech. */
/** A callout drawn on a photograph, like a note on an engineering drawing.
 *  x and y are percentages of the plate; the label names what the object
 *  stands for in the product, never a number we have not measured. */
type PlateNote = { x: number; y: number; label: string; gold?: boolean };

function PhotoPlate({
  src,
  wide = false,
  position,
  notes,
  strike = false,
}: {
  src: string;
  wide?: boolean;
  strike?: boolean;
  position?: string;
  notes?: readonly PlateNote[];
}) {
  if (!src) return null;
  return (
    <div className={`photo-plate fade-up${wide ? " photo-plate-wide" : ""}${strike ? " photo-plate-strike" : ""}`} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
      <span className="plate-brackets" />
      {notes?.map((n) => (
        <span
          key={n.label}
          className={`plate-note${n.gold ? " plate-note-gold" : ""}`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}

function SectorRow({ d }: { d: { name: string; actions: readonly string[]; rules: string } }) {
  return (
    <li className="grid gap-3 border-b border-white/10 py-7 last:border-b-0 lg:grid-cols-[16rem_1fr_18rem] lg:items-baseline lg:gap-10">
      <h3 className="font-serif text-2xl text-neutral-100">{d.name}</h3>
      <p className="text-base font-light leading-relaxed text-neutral-300">{d.actions.join(" · ")}</p>
      <p className="font-mono text-xs leading-relaxed text-neutral-400">{d.rules}</p>
    </li>
  );
}

export function Landing({ locale = defaultLocale }: { locale?: Locale }) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const t = pick(T, locale);
  const eng = pick(HERO_ENGINE_COPY, locale);
  const sealHash = firstSealedEntryHash();

  return (
    <div className="flex flex-1 flex-col">
      {/* NAV */}
      <LandingHeader locale={locale} />

      <main className="blueprint flex-1">
        <div className="paper-grain" aria-hidden="true" />
        <JourneyRail steps={eng.steps.map((s) => s.split(" / ")[0] ?? s)} />
        {/* 1. HERO — white, iron and gold (Dom, 2026-10-15). The words on top,
          * the statement left and the explanation right; the one brain of the
          * site under them, full width: white marble for the intuition, iron
          * for the rigour, gold where they meet. */}
        <section id="top" className="hero-white relative z-10 overflow-hidden">
          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-2 md:grid-cols-2 md:gap-16 md:px-14 md:pt-16">
            <div className="fade-up min-w-0">
              {/* The category on its own line, larger, so it hits; where it applies under it (Dom, 2026-10-16). */}
              <p className="hero-white-eyebrow mb-7">
                <span className="track-mid block text-lg font-semibold md:text-2xl">{t.hero.eyebrow}</span>
                <span className="track-wide mt-2 block text-[11px] font-medium md:text-xs">{t.hero.eyebrowSub}</span>
              </p>
              <h1 className="hero-serif hero-white-title font-serif font-normal">
                {t.hero.headline}
                <br />
                <em className="not-italic font-semibold">{t.hero.headlineEnd}</em>
              </h1>
            </div>
            <div className="hero-white-aside fade-up min-w-0 md:pt-14">
              {/* The buyer's risk first, then what Ironproof does, then the boundary.
                * The gold value line moved to "What you get", which already says it;
                * the pilot is the primary action (Dom, 2026-10-16, after the
                * competitive review). */}
              <div className="hero-white-lead mb-9 max-w-lg space-y-4 text-base leading-relaxed md:text-lg">
                {/* Each answer's name in bold, the rest plain (Dom, 2026-10-19: « be more precise »). */}
                {t.hero.boundary.split("\n").map((ligne) => {
                  const cut = ligne.indexOf(":");
                  if (cut < 0) return <p key={ligne}>{ligne}</p>;
                  return (
                    <p key={ligne}>
                      <strong className="font-semibold">{ligne.slice(0, cut)}</strong>
                      {ligne.slice(cut)}
                    </p>
                  );
                })}
              </div>
              <div className="hero-white-actions flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href={`${r}/pilot`} className="hero-white-cta track-mid inline-flex items-center gap-3 rounded-[5px] px-8 py-3.5 text-xs font-semibold">
                  {t.hero.ctaPilot} <span aria-hidden="true">&rarr;</span>
                </a>
                {/* The second action sends a translation (Dom, 2026-10-19: « ouais »); the
                  * sealed decision just below still opens /verify. */}
                <a href={`${r}/modernization`} className="hero-white-link track-mid inline-flex items-center gap-2 border-b pb-1 text-xs">
                  {t.hero.ctaSend} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <SealLive hash={sealHash} locale={locale} verifyHref={`${r}/verify`} />
            </div>
          </div>
          {/* Three columns that never overlap: the language model, the brain, the
            * solver and an example dossier (Dom, 2026-10-15: the language model on
            * iron, the solver on gold, the dossier white, nothing on the brain). */}
          <div className="hero-white-stage">
            <div className="hero-stage-side hero-stage-left">
              <div className="hero-card hero-card-iron">
                <p className="hero-card-kicker track-mid">{eng.neural}</p>
                <p className="hero-card-text">{eng.neuralLine}</p>
              </div>
            </div>
            <div className="hero-white-brain-wrap">
              <div className="hero-white-brain" aria-hidden="true">
                <Image src="/media/hero-entity3.jpg" alt="" fill preload fetchPriority="high" sizes="(min-width: 1024px) 55rem, 100vw" className="object-cover" />
                {/* The robot alive (Dom, 2026-10-16): the gold veins of the brain,
                  * cut from the same picture (hero-entity3-gold.webp, same size,
                  * same framing), laid over it twice -- one breathes, one carries a
                  * light that runs across. Nothing moves with reduced motion. */}
                <Image src="/media/hero-entity3-gold.webp" alt="" fill sizes="(min-width: 1024px) 55rem, 100vw" className="hero-gold-pulse object-cover" />
                <Image src="/media/hero-entity3-gold.webp" alt="" fill sizes="(min-width: 1024px) 55rem, 100vw" className="hero-gold-sheen object-cover" />
              </div>
              {/* Phone only: the three roles drawn on the head (Dom, 2026-10-15:
                * "faut que les gens comprennent"). Lines: neural -> brain,
                * symbolic -> brain, symbolic -> proven. */}
              <div className="hero-map" aria-hidden="true">
                <svg className="hero-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline points="4,18 28,18 38,20" className="hero-map-line-iron" />
                  <polyline points="96,18 72,18 58,18" className="hero-map-line-gold" />
                  {/* The same point of light as on desktop (Dom, 2026-10-16: "je vois pas
                    * l'animation sur le cell"): it runs neural -> brain, then symbolic -> brain. */}
                  <polyline points="4,18 28,18 38,20" className="hero-map-spark hero-map-spark-iron" />
                  <polyline points="96,18 72,18 58,18" className="hero-map-spark hero-map-spark-gold" />
                </svg>
                {/* Dotted route SYMBOLIC -> PROVEN, anchored to the PROVEN label rather than to
                  * the image's percentages, so it never runs into a label at any width (Dom, 2026-10-16). */}
                <span className="hero-map-route" />
                <span className="hero-map-dot hero-map-dot-iron" style={{ left: "38%", top: "20%" }} />
                <span className="hero-map-dot hero-map-dot-gold" style={{ left: "58%", top: "18%" }} />
                <p className="hero-map-tag hero-map-neural"><b>{eng.map.neural}</b>{eng.map.neuralRole}</p>
                <p className="hero-map-tag hero-map-symbolic"><b>{eng.map.symbolic}</b>{eng.map.symbolicRole}</p>
                <p className="hero-map-tag hero-map-proven"><b><span className="hero-dossier-dot" /> {eng.map.proven}</b>{eng.map.provenRole}</p>
              </div>
            </div>
            <div className="hero-stage-side hero-stage-right">
              <div className="hero-card hero-card-gold">
                <p className="hero-card-kicker track-mid">{eng.symbolic}</p>
                <p className="hero-card-text">{eng.symbolicLine}</p>
                {/* The real shape of a proof, not decoration: assert the negation; unsat means it holds. */}
                <pre className="hero-card-smt" aria-hidden="true">{"(assert (not P))\n(check-sat)  ; unsat\n∴ P holds"}</pre>
              </div>
              {/* An example dossier, labelled as one, that opens the real thing:
                * /verify checks sealed dossiers in the visitor's own browser. */}
              <a href={`${r}/verify`} className="hero-dossier">
                <p className="hero-dossier-tag track-mid">{eng.dossierTag}</p>
                <p className="hero-dossier-verdict">
                  <span className="hero-dossier-dot" aria-hidden="true" /> {eng.dossierVerdict}
                </p>
                <p className="hero-dossier-scope">{eng.dossierScope}</p>
                <p className="hero-dossier-seal track-mid">{eng.dossierSeal}</p>
                <p className="hero-dossier-link track-mid">
                  {eng.dossierLink} <span aria-hidden="true">&rarr;</span>
                </p>
              </a>
            </div>
          </div>
          {/* The method in four words, on one hairline. */}
          <ol className="hero-steps track-mid">
            {eng.steps.map((step, i) => (
              <li key={step} className={i === eng.steps.length - 1 ? "hero-step-seal" : undefined}>
                <span className="hero-step-dot" aria-hidden="true" />
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* The check of what a machine rewrote, right under the hero (Dom, 2026-10-19). */}
        <RewriteCheck locale={locale} />

        {/* CREDITED-BY STRIP — right under the hero (Dom, 2026-10-15: « plus au début »):
          * the vendors who credited our research, before any explanation. */}
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
            {/* The CVE numbers themselves, each opening its record on cve.org (Dom, 2026-10-18). */}
            {PUBLISHED_CVES.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-neutral-400 border-b border-transparent transition hover:border-white/40 hover:text-white"
              >
                {c.id} · {c.project}
              </a>
            ))}
          </div>
        </section>

        {/* Order of the page (Dom, 2026-10-16, after the research on pages that hit):
          * the hero, why Ironproof exists and the company line, the gate deciding,
          * where it applies, how it works, the close. Everything else lives on its
          * own page. Design unchanged. */}
        <NorthStar locale={locale} />
        <UseCases locale={locale} />
        <WhyIronproof locale={locale} />
        {/* How the platform works, right under why (Dom, 2026-10-17: the order of Code Metal's home). */}
        <PlatformHow locale={locale} />

        {/* WHY NOW, short: the code story only (Dom, 2026-10-19, review). The dated
          * timeline and the sectors moved with the gate to /critical-actions. */}
        <section id="now" className="relative z-10 mx-auto max-w-6xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.nowShort.eyebrow}</p>
            {t.nowShort.lines.map((line) => (
              <p key={line} className="mt-4 font-serif text-2xl leading-snug text-neutral-200 md:text-3xl">
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* CLOSING — the guardian robot replaced by a closed iron vault door in a
          * marble block, gold wheel (Dom, 2026-10-15: « le robot à la fin match pas
          * le reste »), the same family as the trio and the applications.
          * History: a closed vault door with a gold ring in a black marble hall
          * (Dom, 2026-09-26: closed says "impossible" better than open), full-bleed behind
          * a glass card. Documentary like the hero (Dom, 2026-09-26). Both halves
          * of the act in the body: what is proven runs, the rest never executes. */}
        <section className="closing-trio relative z-10 edge-t">
          <div className="closing-band closing-band-photo">
            <div className="closing-photo" aria-hidden="true">
              <Image src="/media/closing-bust-blueprint.jpg" alt="" fill sizes="100vw" className="closing-photo-desk object-cover" />
              <Image src="/media/closing-bust-blueprint-mobile.jpg" alt="" fill sizes="100vw" className="closing-photo-mob object-cover" />
            </div>
            {/* The material labels (marble, iron, gold) left the page: they explained our look, not the product (review, Dom go 2026-10-17). */}
            <div className="closing-card fade-up">
              <p className="seal-label track-mid mb-5 text-xs">{t.closing.kicker}</p>
              <h2 className="font-serif text-4xl font-medium leading-[1.05] text-neutral-100 md:text-5xl">
                {t.closing.titleA}
                <br />
                <span className="text-seal">{t.closing.titleB}</span>
              </h2>
              <p className="mt-4 text-xs font-light leading-relaxed text-neutral-500">{t.closing.scope}</p>
              <a
                href={`${r}/pilot`}
                className="track-mid mt-8 inline-flex items-center gap-3 rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
              >
                {t.hero.ctaPilot} <span aria-hidden="true">&rarr;</span>
              </a>
              {/* The four steps no longer repeat here: the page already says them (Dom, 2026-10-18). */}
            </div>
          </div>
        </section>

      </main>

      <FadeUpInit />
    </div>
  );
}

/* The gate's sections, moved off the home page to /critical-actions (Dom,
 * 2026-10-19: code first on the home page, the gate as its own product page).
 * Same copy (T), same ids (#decide, #start, #now, #how), same order. */
export function CriticalActionsSections({ locale = defaultLocale }: { locale?: Locale }) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const t = pick(T, locale);
  return (
    <>
        {/* 3. WATCH IT DECIDE — four action classes, one gate. Moved up right
          * under the checkpoint line (Dom, 2026-10-15: too much reading before
          * the gate); the three pillars now follow the video. */}
        <AgentScenarios locale={locale} verifyHref={`${r}/verify`} />

        {/* WHERE IT APPLIES — three domains, with the rules that already exist */}
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
          <div className="mb-14">
            {/* Labels on the photo removed: they were cut off and unreadable (Dom, 2026-10-16). */}
            <PhotoPlate src="/media/critical-switches-white.jpg" position="50% 55%" />
          </div>
          {/* The runs moved into « What it proves » near the top (Dom, 2026-10-16): no number twice. */}
          <p className="fade-up seal-label track-mid mb-6 text-xs">{t.domains.appliesEyebrow}</p>
          {/* Sectors as ruled rows, not cards: sector, its irreversible actions,
            * and the rules that already say what must never happen there. */}
          <div className="fade-up">
            <div className="track-mid hidden grid-cols-[16rem_1fr_18rem] gap-10 pb-4 text-xs text-neutral-500 lg:grid">
              <span />
              <span>{t.domains.actionsLabel}</span>
              <span>{t.domains.rulesLabel}</span>
            </div>
            <ul className="border-t border-white/10">
              {t.domains.items.slice(0, 1).map((d) => (
                <SectorRow key={d.name} d={d} />
              ))}
            </ul>
            {/* Banking and payments in front; the other sectors under their own heading, always open (Dom 2026-10-17: no tab to click). */}
            <p className="track-mid pb-4 pt-10 text-xs text-neutral-400">{t.domains.moreLabel}</p>
            <ul className="border-t border-white/10">
              {t.domains.items.slice(1).map((d) => (
                <SectorRow key={d.name} d={d} />
              ))}
            </ul>
          </div>
        </section>

        {/* WHY NOW — back after all the sectors, the white city in full behind
          * light grey articles (Dom 2026-10-17: « voir un peu les articles mais
          * voir tout le design en arrière »). No dark veil, no frosted glass. */}
        <section id="timeline" className="relative z-10 isolate overflow-hidden edge-t px-6 py-28 md:px-14">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Image src="/media/district-clear.jpg" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="fade-up mb-12 inline-block max-w-3xl rounded-[6px] bg-ink/70 px-6 py-5">
              <p className="seal-label track-mid mb-4 text-xs">{t.now.eyebrow}</p>
              <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.now.title}</h2>
              <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.now.lead}</p>
            </div>
            <ol className="fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.now.items.map((d) => (
                <li key={d.date} className="rounded-[6px] border border-white/10 bg-ink/55 px-5 py-4">
                  <p className="seal-label track-mid text-[11px]">{d.date}</p>
                  <p className="mt-1.5 text-[13px] font-light leading-relaxed text-neutral-200">{d.what}</p>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-xs text-neutral-500 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                  >
                    {d.source} &#8599;
                  </a>
                </li>
              ))}
            </ol>
            <p className="fade-up mt-10 inline-block max-w-3xl rounded-[6px] bg-ink/70 px-6 py-4 font-serif text-xl leading-snug text-neutral-200 md:text-2xl">
              {t.now.foot}
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
              {/* The two long paragraphs left the home page (Dom, 2026-10-16: « clair et percutant »); the four steps carry it. */}
            </div>
            {/* The one image here: the decision struck into steel, with logo 09
              * (Dom, 2026-09-26). */}
            <PhotoPlate src="/media/seal-press-white.jpg" wide strike position="50% 55%" notes={t.how.plateNotes} />
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

    </>
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
          <Image src="/media/broken-chain-white.jpg" alt="" fill sizes="100vw" className="object-cover" />
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
