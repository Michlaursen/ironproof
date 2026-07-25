import type { SiteContent } from "./types";

export const en: SiteContent = {
  meta: {
    title: "IronProof — Provable security for AI and critical software",
    description:
      "IronProof is the proof layer for high-trust organizations deploying AI agents, AI-generated code, and modernized software. We verify what systems are allowed to do, prove whether violations are possible, and seal the result as portable evidence.",
    ogDescription:
      "From AI risk to machine-checkable proof. IronProof verifies critical code and AI actions before trust is given.",
  },
  header: {
    nav: [
      { href: "#products", label: "Product" },
      { href: "#use-cases", label: "Use Cases" },
      { href: "#sovereignty", label: "Sovereignty" },
      { href: "#proof-points", label: "Proof" },
      { href: "https://lab.ironproof.ai", label: "Proof Lab" },
    ],
    cta: "Request a demo",
    langSwitchLabel: "FR",
  },
  hero: {
    eyebrow: "Verifiable security infrastructure",
    headline: "Provable security for AI and critical software.",
    subhead:
      "IronProof is the proof layer for high-trust organizations deploying AI agents, AI-generated code, and modernized software. We verify what systems are allowed to do, prove whether violations are possible, and seal the result as portable evidence.",
    ctaPrimary: "Request a demo",
    ctaSecondary: "See how it works",
    taglinePre: "IronProof moves organizations from ",
    taglineQuote1: "“probably secure”",
    taglineMid: " to ",
    taglineQuote2: "“provably secure.”",
    proofCard: {
      label: "Proof Artifact",
      status: "VERIFIED",
      rows: [
        { label: "Scope", value: "defined input space" },
        { label: "Rule set", value: "policy-v3.2" },
        { label: "Result", value: "no violation found" },
        { label: "Sealing", value: "post-quantum signature" },
        { label: "Verifier", value: "offline / public key" },
      ],
      footnote:
        "Independently verifiable, even offline — without trusting the original system.",
    },
  },
  lab: {
    eyebrow: "Proof Laboratory",
    title: "Don’t take our word for it. Inspect the proof.",
    description:
      "Enter the IronProof Lab to explore real proof obligations, challenge the policies, inspect counterexamples, and reproduce the evidence yourself.",
    cta: "Enter the Proof Lab",
    previewLabel: "LIVE INSTRUMENT",
    previewTitle: "AI agent action through the proof gate",
    previewStatus: "PROVEN SAFE",
    obligationLabel: "Proof obligation",
    obligation: "No reachable state can disburse more than the approved amount.",
    verdictLabel: "Solver verdict",
    verdict: "unsat",
    evidenceLabel: "Evidence",
    evidence: "sealed · reproducible · independently verifiable",
  },
  problem: {
    eyebrow: "The problem",
    title: "AI is acting faster than organizations can verify.",
    description:
      "AI agents now touch workflows involving approvals, refunds, permissions, customer records, code changes, and regulated decisions. Traditional audits, logs, and policy documents cannot prove whether a system can violate a rule before it acts.",
    points: [
      {
        title: "AI is becoming operational",
        body: "AI agents now approve, refund, credit, discount, transfer, modify records, change permissions, trigger workflows, and write code — not just answer questions.",
      },
      {
        title: "Logs and policies are not enough",
        body: "Most governance tools observe, log, score, or review after the fact. They do not prove whether a system can violate a rule before it acts.",
      },
      {
        title: "Modernization widens the gap",
        body: "Organizations are accepting AI-generated code into production faster than they can verify it. Software is moving faster than trust can be checked.",
      },
    ],
  },
  solution: {
    eyebrow: "The solution",
    title: "IronProof turns trust into evidence.",
    description:
      "When something fails, IronProof produces a counterexample showing the risk. When something passes, it issues a signed proof artifact that can be verified later — independently, and offline.",
    steps: [
      {
        step: "01",
        title: "Define the rules",
        body: "Encode the security, compliance, and governance rules an AI system or piece of software must never violate.",
      },
      {
        step: "02",
        title: "Verify the behavior",
        body: "IronProof checks whether the software or AI action can violate those rules — mathematically, over the defined input space.",
      },
      {
        step: "03",
        title: "Receive the evidence",
        body: "A counterexample when a violation is possible. A signed proof artifact, certificate, or receipt when it isn't.",
      },
    ],
    diagram: {
      rulesTitle: "Rules",
      rulesSubtitle: "Security, compliance & governance constraints",
      verificationTitle: "Verification",
      verificationSubtitle: "Checked over the defined input space",
      counterexampleLabel: "Violation possible",
      counterexampleValue: "Counterexample",
      proofArtifactLabel: "No violation found",
      proofArtifactValue: "Sealed proof artifact",
    },
    quoteIntro1: "Most cybersecurity tools say: ",
    quote1: "“We looked at the system and it seems safe.”",
    quoteIntro2: "IronProof says: ",
    quote2:
      "“Here are the rules. Here is the proof that the system cannot break them within this scope. And here is a sealed receipt you can verify later.”",
  },
  products: {
    eyebrow: "Product",
    title: "One proof engine. Multiple high-trust use cases.",
    items: [
      {
        name: "IronProof Cobalt",
        tag: "Software modernization",
        description:
          "Verifies migrated, refactored, or AI-generated code and produces proof artifacts when the code meets defined properties.",
        items: [
          "Legacy modernization",
          "AI-generated code review",
          "Regulated software changes",
          "High-risk refactoring",
          "Security-sensitive code paths",
        ],
      },
      {
        name: "IronProof VERDICT",
        tag: "AI agent governance",
        description:
          "Verifies high-risk AI agent actions before execution, checks them against governance rules, and creates sealed evidence of what was allowed, denied, or proven safe.",
        items: [
          "AI agents in regulated workflows",
          "Approvals, refunds, credits, transfers",
          "Policy enforcement",
          "Audit trails",
          "Enterprise AI governance",
        ],
      },
      {
        name: "IronProof Core",
        tag: "Proof infrastructure",
        description:
          "The underlying proof engine. Transforms policies, constraints, code behavior, and action rules into machine-checkable verification logic.",
        items: [
          "Policy-to-machine-checkable controls",
          "Formal verification engine",
          "Powers Cobalt and VERDICT",
          "Sealed, portable proof artifacts",
          "Offline, independently verifiable",
        ],
      },
    ],
  },
  sovereignty: {
    eyebrow: "Sovereignty",
    title: "Built for sovereign and air-gapped environments.",
    description:
      "IronProof is designed for institutions that cannot send sensitive systems, code, data, or decisions into uncontrolled environments. Proof artifacts can be sealed and independently verified without relying on the original system.",
    tagline: "Sécurité vérifiable pour l’IA et les logiciels.",
    features: [
      {
        title: "Post-quantum sealing",
        body: "Proof artifacts are sealed using post-quantum cryptographic principles — future-resistant evidence.",
      },
      {
        title: "Offline verification",
        body: "A verifier can check the proof artifact later using public keys only, without access to the original system.",
      },
      {
        title: "Sovereign deployment",
        body: "Sovereign, local, private, and compatible with air-gapped or high-control environments.",
      },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "Where proof matters most.",
    items: [
      "AI agent governance",
      "AI-generated code assurance",
      "Legacy modernization proof audits",
      "Regulated workflow verification",
      "Critical software security",
      "Policy-to-machine-checkable controls",
      "Post-quantum sealed audit evidence",
      "Public sector and dual-use assurance",
    ],
  },
  customers: {
    eyebrow: "Built for",
    title: "High-trust institutions where “trust me” is not enough.",
    segments: [
      "Banks",
      "Insurance companies",
      "Government agencies",
      "Critical infrastructure operators",
      "Telecoms",
      "Healthcare administration platforms",
      "Modernization partners",
      "Enterprise SaaS deploying AI agents",
      "Cybersecurity & compliance teams",
    ],
  },
  proofPoints: {
    eyebrow: "Proof, not promises",
    title: "Evidence you can independently verify.",
    items: [
      { stat: "3", label: "CVEs assigned" },
      { stat: "0", label: "False positives proven" },
      { stat: "100%", label: "Mathematical verification over defined input space" },
      { stat: "PQ", label: "Post-quantum sealed proof artifacts" },
      { stat: "0", label: "Vendor access required for offline verification" },
      { stat: "CA", label: "Sovereign Canadian deployment posture" },
    ],
  },
  finalCta: {
    eyebrow: "In a world of AI uncertainty",
    title: "IronProof gives institutions something rare: evidence.",
    subhead: "IronProof is not selling trust. IronProof is selling proof.",
    designPartnerPre: "Looking to become a design partner instead? Email us at ",
    designPartnerEmail: "hello@ironproof.ai",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Work email",
      company: "Company",
      message: "What are you looking to verify?",
      submit: "Request a demo",
      submitting: "Sending…",
      successTitle: "Request received.",
      successBody: "We’ll be in touch shortly.",
      errorPre: "Something went wrong — please email ",
      errorLinkLabel: "hello@ironproof.ai",
      errorPost: " directly.",
    },
  },
  footer: {
    description:
      "IronProof builds verifiable security infrastructure for AI and critical software. Our platform helps high-trust organizations prove whether AI agents, AI-generated code, and modernized systems comply with defined security and governance rules.",
    tagline: "Sécurité vérifiable pour l’IA et les logiciels.",
    country: "Canada",
    copyright: "IronProof. All rights reserved.",
  },
};
