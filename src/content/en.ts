import type { SiteContent } from "./types";

export const en: SiteContent = {
  meta: {
    title: "IronProof | Verifiable Authorization for Irreversible AI Actions",
    description:
      "IronProof proves what an AI agent may and may not do before it acts — money movements, record deletions, data leaving, code shipped to production — producing evidence that risk, compliance and audit teams verify independently.",
    // Open Graph and the X/Twitter card read this. Kept identical to the meta
    // description on purpose: same positioning everywhere, nothing invented.
    ogDescription:
      "IronProof proves what an AI agent may and may not do before it acts — money movements, record deletions, data leaving, code shipped to production — producing evidence that risk, compliance and audit teams verify independently.",
  },
  header: {
    nav: [
      { href: "#evidence", label: "Evidence" },
      { href: "#artifact", label: "The artifact" },
      { href: "#products", label: "Product" },
      { href: "#comparison", label: "Compare" },
      { href: "#corpus", label: "Research" },
      { href: "https://ironproof-lab.vercel.app", label: "Proof Lab" },
    ],
    cta: "Evaluate a workflow",
    langSwitchLabel: "FR",
  },
  hero: {
    eyebrow: "Verifiable authorization for irreversible AI actions",
    headline: "Prove what an AI agent cannot do — before it acts.",
    body: [
      "Some actions cannot be undone. IronProof verifies that an agent stays inside the policy you wrote before it executes — refunds, payments and beneficiary changes today, and the same check for records deleted, data leaving or code shipped to production.",
      "For every decision, it records the policy applied, the agent’s authority under that policy, the transaction state, and a verifiable justification for why the action was allowed or denied.",
      "The resulting evidence can be verified independently by risk, compliance and audit teams — without relying on an IronProof dashboard.",
    ],
    ctaPrimary: "Evaluate the workflow that worries you",
    ctaSecondary: "Inspect a sample certificate",
    trustLine: [
      "Customer-controlled policy",
      "Pre-execution verification",
      "Sovereign and air-gapped deployment available",
    ],
    proofCard: {
      label: "Proof Artifact",
      status: "SEALED",
      rows: [
        { label: "Decision", value: "REFUND ALLOWED", accent: true },
        { label: "Policy", value: "Merchant Refund Policy · v3.2" },
        { label: "Agent authority", value: "Refunds ≤ $1,000 · active" },
        {
          label: "Transaction state",
          value: "$640 requested · $1,820 monthly total",
        },
        {
          label: "Boundary check",
          value: "within per-action and cumulative limits",
        },
        {
          label: "Justification",
          value: "policy satisfied · authority valid · approval not required",
        },
        {
          label: "Proof verdict",
          value: "UNSAT · no reachable violation",
          accent: true,
        },
        { label: "Seal", value: "Ed25519 + ML-DSA-65" },
        { label: "Verifier", value: "offline · independent implementation" },
      ],
      footnote:
        "The policy, authority, transaction state and proof verdict are sealed together. The wire format is published, so the artifact can be checked by a verifier we did not write — offline, with no account and no IronProof code.",
    },
  },
  attributions: {
    title: "Public technical record",
    subtitle: "Evidence you can inspect outside our website.",
    items: [
      {
        org: "IBM",
        body: "Names Cobalt AI in the sarama commit that carries the fix.",
        cta: "View commit",
        href: "https://github.com/IBM/sarama/commit/b01879002b37abe3b44a957615d982847a44da94",
      },
      {
        org: "GnuPG",
        body: "Two libksba commits credit our report, shipped in release 1.7.0.",
        cta: "View commit",
        href: "https://github.com/gpg/libksba/commit/c44cc98460ea42e393214dc6e23ff746196baefd",
      },
      {
        org: "Mozilla",
        body: "Our report is recorded and resolved in Mozilla’s public bug tracker.",
        cta: "View bug record",
        href: "https://bugzilla.mozilla.org/show_bug.cgi?id=2027434",
      },
      {
        org: "Red Hat · OpenELA",
        body: "Public libyang patches credit Dominik Blain and Cobalt AI for reporting two memory-corruption issues.",
        cta: "View patch record",
        href: "https://github.com/openela-main/libyang",
      },
      {
        org: "wolfSSL",
        body: "Security fixes publicly credited in the wolfSSL 5.9.2 release notes.",
        cta: "View release notes",
        href: "https://github.com/wolfSSL/wolfssl/blob/master/README.md",
      },
      {
        org: "VideoLAN · VLC",
        body: "A vulnerability fix carrying Dominik Blain’s name is preserved in VLC’s public source tree.",
        cta: "View patch",
        href: "https://github.com/videolan/vlc/blob/master/contrib/src/upnp/0006-uri.c-Dominik-Blain-s-fix-for-vulnerability.patch",
      },
      {
        org: "OFFIS · DCMTK",
        body: "Three commits thank Dominik Blain for the report.",
        cta: "View commit",
        href: "https://github.com/DCMTK/dcmtk/commit/63b0bae751f62ed1b384141fa0fd032c98af57aa",
      },
      {
        org: "libmodbus",
        body: "The fix commit names Qreativelab formal verification as the reporter.",
        cta: "View commit",
        href: "https://github.com/stephane/libmodbus/commit/d6941168d13cfa1db1bec40ef5bf04470c351175",
      },
    ],
    summary:
      "8 organizations credit us publicly · 3 assigned CVEs · 28 coordinated disclosures · 4 security preprints",
    linkLabel: "Review the full technical record",
    linkHref: "#corpus",
  },
  lab: {
    eyebrow: "Proof Laboratory",
    title: "Test the transaction boundary yourself.",
    description:
      "Change the refund amount, monthly total or approval status. The proof engine will either authorize the action or produce the exact condition that blocks it.",
    cta: "Open the Proof Lab",
    previewLabel: "LIVE INSTRUMENT",
    policyLabel: "Example policy",
    policy: [
      "Maximum refund: $1,000",
      "Monthly customer limit: $2,500",
      "Human approval required above $1,000",
    ],
    transactionLabel: "Default transaction",
    transaction: [
      "Refund requested: $640",
      "Current monthly total: $1,820",
      "Approval: not required",
    ],
    safeLabel: "Safe result",
    safeVerdict: "REFUND ALLOWED",
    safeBody: "No reachable policy violation.",
    failLabel: "Failure result",
    failVerdict: "REFUND BLOCKED",
    failBody: "Show the exact violated rule and counterexample.",
  },
  problem: {
    eyebrow: "The gap",
    title: "What existing controls still cannot prove",
    body: [
      "Identity confirms which agent is acting. Permissions define its general access. Guardrails shape its behavior. Logs record what happened.",
      "None of them, alone, proves that a specific financial action was authorized under the exact policy, authority and transaction state in force at decision time.",
      "IronProof fills that gap before execution and preserves the authorization basis as independently verifiable evidence.",
    ],
    layers: [
      { name: "Identity", role: "Who is acting" },
      { name: "Permissions", role: "What it can access" },
      { name: "Guardrails", role: "How it should behave" },
      { name: "Logs", role: "What happened" },
    ],
    conclusion: {
      name: "IronProof",
      role: "Why this action was allowed or denied",
    },
  },
  solution: {
    eyebrow: "How it works",
    title: "How IronProof authorizes an AI action",
    description:
      "Your written policy is compiled into mathematics — by the same deterministic compiler the runtime uses. The proof runs against that model, not against a checklist.",
    steps: [
      {
        step: "01",
        title: "Capture the decision context",
        body: "Record the policy version, agent authority, transaction state and requested action.",
      },
      {
        step: "02",
        title: "Prove the boundary",
        body: "Determine whether the action can violate any customer-defined rule or cumulative limit. The decision is deterministic — the same inputs always yield the same verdict, with no solver in the execution path and no timeout branch. The solver runs earlier and elsewhere: it certifies the policy across its entire action space, so a policy that admits nothing is caught before it ever runs.",
      },
      {
        step: "03",
        title: "Allow or block execution",
        body: "Issue a single-use execution grant only when the action is proven inside the boundary. The grant is bound to that exact action and to the policy in force; nothing executes without spending it.",
      },
      {
        step: "04",
        title: "Seal the evidence",
        body: "Preserve the decision, justification and proof result in an independently verifiable artifact.",
      },
    ],
  },
  products: {
    eyebrow: "Product",
    title: "The authorization layer for AI agents that act",
    description:
      "IronProof Actions evaluates each irreversible action before execution against the policy, authority and state in force. Money is where we start; the check does not depend on it.",
    capabilities: [
      {
        title: "Decision-time context",
        body: "Captures the policy version — customer-authored, not written by us — the agent’s authority under it, the requested action and the cumulative state it lands in.",
      },
      {
        title: "Formal boundary check",
        body: "Proves whether the action remains inside the customer-defined transaction boundary — and that no sequence of actions the agent can take escapes it, not only the request in front of it.",
      },
      {
        title: "Single-use execution grant",
        body: "Only a proven action receives a grant, bound to that exact decision and to the policy in force. Nothing executes without spending it.",
      },
      {
        title: "Verifiable evidence",
        body: "Preserves why the action was allowed or denied in a sealed artifact your own auditor can check offline.",
      },
    ],
    finalLine:
      "Start with one workflow — the one nobody wants to be wrong about.",
  },
  artifact: {
    eyebrow: "The artifact",
    title: "What the proof artifact preserves",
    blocks: [
      {
        num: "01",
        title: "Policy and authority",
        body: "The exact policy version and the agent’s authority under it.",
      },
      {
        num: "02",
        title: "Transaction state",
        body: "The requested action, cumulative limits, approvals and relevant context.",
      },
      {
        num: "03",
        title: "Decision and justification",
        body: "Why the action was allowed or denied, with the proof result or counterexample.",
      },
      {
        num: "04",
        title: "Seal and verification",
        body: "The artifact is tamper-evident. Because the wire format is published, an independent implementation can re-check every hash and signature — no IronProof code involved.",
      },
    ],
    finalLine:
      "A report gives you a conclusion. The artifact preserves the authorization basis behind it.",
  },
  comparison: {
    eyebrow: "Compare",
    title: "What each control proves",
    rows: [
      {
        name: "Identity and access management",
        primary: "Proves who the agent is and what systems it may access.",
        secondary: "Does not prove that this specific transaction is authorized.",
      },
      {
        name: "Guardrails",
        primary: "Shape model behavior and block known unsafe patterns.",
        secondary: "Do not establish the complete authorization basis for a financial action.",
      },
      {
        name: "Logs and observability",
        primary: "Record what happened after or during execution.",
        secondary: "Do not prove the action was valid before execution.",
      },
      {
        name: "Audit reports",
        primary: "Provide an expert conclusion at a point in time.",
        secondary: "Usually do not preserve a replayable decision-time proof.",
      },
      {
        name: "IronProof",
        primary: "Proves whether the specific action is inside the policy, authority and transaction state in force before execution.",
        secondary: "Preserves the authorization basis as independently verifiable evidence.",
        isUs: true,
      },
    ],
  },
  sovereignty: {
    eyebrow: "Sovereignty",
    title: "Built for environments that cannot export data or trust",
    description:
      "IronProof can run locally or air-gapped, so transaction policies, system context and decision evidence remain under the institution’s control.",
    features: [
      {
        title: "Local deployment",
        body: "The proof core can operate without network access.",
      },
      {
        title: "Independent verification",
        body: "The customer’s auditor can re-check the artifact with a second, independently written verifier — offline, without an IronProof dashboard.",
      },
      {
        title: "Durable evidence",
        body: "Every artifact carries both a classical and a post-quantum signature (Ed25519 + ML-DSA-65, FIPS 204), and its timestamp is bounded from both sides — a seal cannot be moved backwards in time.",
      },
    ],
  },
  corpus: {
    eyebrow: "Research",
    title: "Why the proof can be challenged",
    description:
      "A verification company should expose the parts most likely to fail: the model, the translation, the verifier and the assumptions.",
    points: [
      {
        title: "Machine-checked translation",
        body: "Lean 4 checks that the runtime policy compiler and solver encoding represent the same decision logic.",
      },
      {
        title: "Reproducible verification",
        body: "The verification suite can be rerun end to end, including successful proofs and failure cases.",
      },
      {
        title: "Published methods",
        body: "Four security preprints disclose the methods, datasets, limitations and failure cases.",
      },
    ],
    papers: {
      eyebrow: "Published research",
      items: [
        {
          id: "arXiv:2604.05292",
          title:
            "Broken by Default: A Formal Verification Study of Security Vulnerabilities in AI-Generated Code",
          href: "https://arxiv.org/abs/2604.05292",
        },
        {
          id: "arXiv:2604.06712",
          title:
            "Broken Quantum: A Systematic Formal Verification Study of Security Vulnerabilities Across the Open-Source Quantum Computing Simulator Ecosystem",
          href: "https://arxiv.org/abs/2604.06712",
        },
        {
          id: "arXiv:2604.12172",
          title:
            "COBALT-TLA: A Neuro-Symbolic Verification Loop for Cross-Chain Bridge Vulnerability Discovery",
          href: "https://arxiv.org/abs/2604.12172",
        },
        {
          id: "arXiv:2604.20496",
          title:
            "Mythos and the Unverified Cage: Z3-Based Pre-Deployment Verification for Frontier-Model Sandbox Infrastructure",
          href: "https://arxiv.org/abs/2604.20496",
        },
      ],
    },
  },
  sector: {
    eyebrow: "Where we start",
    title: "Money-moving workflows in Canadian financial services",
    description:
      "We start with back-office AI agents that issue refunds, payments, disbursements or beneficiary changes under defined limits and approval rules.",
    buyersLabel: "Primary buyers",
    buyers: "Technology risk, operational risk and compliance teams.",
    engagementLabel: "Initial engagement",
    engagement:
      "Select one workflow, define the transaction boundary and produce an independently verifiable proof artifact.",
    quote:
      "They do not use it to replace human judgment or to fully automate critical decisions given the significant financial, legal and reputational consequences.",
    quoteSource: "Bank of Canada — Financial System Survey, May 2026",
    quoteHref:
      "https://www.bankofcanada.ca/2026/05/financial-system-survey-highlights-2026/",
  },
  finalCta: {
    title: "Start with one money-moving workflow",
    description:
      "Choose a refund, payment, disbursement or beneficiary-change workflow. We define the transaction boundary, test it for violations and deliver a proof artifact your team can verify independently.",
    ctaSecondary: "Inspect a sample certificate",
    designPartnerPre: "Looking to become a design partner instead? Email us at ",
    designPartnerEmail: "hello@ironproof.ai",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Work email",
      company: "Company",
      message: "Which workflow do you want to evaluate?",
      submit: "Evaluate a workflow",
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
      "Verifiable authorization and decision evidence for money-moving AI workflows.",
    closing: "IronProof gives institutions something rare: evidence.",
    country: "Canada",
    copyright: "IronProof. All rights reserved.",
  },
};
