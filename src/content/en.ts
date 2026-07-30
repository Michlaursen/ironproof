import type { SiteContent } from "./types";

export const en: SiteContent = {
  meta: {
    title: "IronProof | Verifiable Authorization for AI Financial Workflows",
    description:
      "IronProof verifies transaction boundaries before AI agents execute refunds, payments, disbursements or beneficiary changes, producing evidence that risk, compliance and audit teams can verify independently.",
    // Open Graph and the X/Twitter card read this. Kept identical to the meta
    // description on purpose: same positioning everywhere, nothing invented.
    ogDescription:
      "IronProof verifies transaction boundaries before AI agents execute refunds, payments, disbursements or beneficiary changes, producing evidence that risk, compliance and audit teams can verify independently.",
  },
  header: {
    nav: [
      { href: "#evidence", label: "Evidence" },
      { href: "#artifact", label: "The artifact" },
      { href: "#products", label: "Product" },
      { href: "#comparison", label: "Compare" },
      { href: "#corpus", label: "Research" },
      { href: "https://lab.ironproof.ai", label: "Proof Lab" },
    ],
    cta: "Request a demo",
    langSwitchLabel: "FR",
  },
  hero: {
    eyebrow: "Verifiable authorization for AI-driven financial workflows",
    headline: "Prove the transaction boundary before an AI agent moves money.",
    body: [
      "IronProof verifies that refunds, payments, disbursements and beneficiary changes remain inside your customer-authored policy before execution.",
      "For every decision, it records the policy applied, the agent’s authority under that policy, the transaction state, and a verifiable justification for why the action was allowed or denied.",
      "The resulting evidence can be verified independently by risk, compliance and audit teams — without relying on an IronProof dashboard.",
    ],
    ctaPrimary: "Evaluate a money-moving workflow",
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
        { label: "Verifier", value: "offline · trusted public key" },
      ],
      footnote:
        "The policy, authority, transaction state and proof verdict are sealed together. Verify the artifact offline using a trusted public key — without access to an IronProof dashboard.",
    },
  },
  attributions: {
    title: "Public technical record",
    subtitle: "Evidence you can inspect outside our website.",
    items: [
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
        org: "Red Hat · OpenELA",
        body: "Public libyang patches credit Dominik Blain and Cobalt AI for reporting two memory-corruption issues.",
        cta: "View patch record",
        href: "https://github.com/openela-main/libyang",
      },
    ],
    alsoLabel: "Also credited by name",
    also: [
      { org: "GnuPG", href: "https://github.com/gpg/libksba/commit/c44cc98460ea42e393214dc6e23ff746196baefd" },
      { org: "OFFIS · DCMTK", href: "https://github.com/DCMTK/dcmtk/commit/63b0bae751f62ed1b384141fa0fd032c98af57aa" },
      { org: "IBM", href: "https://github.com/IBM/sarama/commit/b01879002b37abe3b44a957615d982847a44da94" },
      { org: "libmodbus", href: "https://github.com/stephane/libmodbus/commit/d6941168d13cfa1db1bec40ef5bf04470c351175" },
      { org: "Mozilla", href: "https://bugzilla.mozilla.org/show_bug.cgi?id=2027434" },
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
        body: "Determine whether the action can violate any customer-defined rule or cumulative limit. The compiled policy becomes constraints and a solver checks all states represented by the defined model and assumptions — unsat means no violating state exists, sat returns the counterexample.",
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
    title: "One proof engine. Four surfaces where it matters.",
    description:
      "The same engine, pointed at four places where being wrong is expensive. Every surface produces the same deliverable: a counterexample, or a sealed artifact.",
    items: [
      {
        name: "IronProof Core",
        tag: "Proof engine",
        description:
          "The ontology engine. Z3 and Spacer over a typed digital twin: it synthesizes the invariant itself, then proves no trajectory escapes it. Most tools check a rule you wrote. Core finds the rule that has to hold.",
        items: [
          "Symbolic invariant synthesis",
          "Encoder fidelity machine-checked in Lean 4",
          "Counterexample on every failure",
          "Post-quantum sealed artifacts",
          "Offline third-party verification",
        ],
      },
      {
        name: "IronProof Actions",
        tag: "AI agent governance",
        description:
          "Judges a high-risk agent action before it executes. The gate is the only entrance — structurally, not by convention: nothing runs without spending a single-use grant minted only on the proven-safe branch.",
        items: [
          "Pre-execution verification, not after-the-fact logs",
          "Approvals, refunds, credits, transfers, limits",
          "Single-use execution grants bound to the policy in force",
          "Sealed record of what was allowed, denied and proven",
          "Runs air-gapped — no network in the proof core",
        ],
      },
      {
        name: "IronProof Cobalt-AI",
        tag: "Code & smart contracts",
        description:
          "Proves properties of code — legacy, refactored, AI-generated or on-chain. The surface behind our published CVEs and the fixes shipped by wolfSSL, VideoLAN and Red Hat.",
        items: [
          "AI-generated code assurance",
          "Legacy modernization proof audits",
          "Smart contracts & cross-chain bridge analysis",
          "Memory-safety classes (CWE-190 / 131 / 195)",
          "Coordinated disclosure, publicly credited",
        ],
      },
      {
        name: "IronProof Cobalt-PQC",
        tag: "Cryptography",
        description:
          "Proves the absence of timing side channels in cryptographic implementations, and audits the post-quantum migration itself — the one deadline nobody can renegotiate.",
        items: [
          "Constant-time verification (IEEE-754 timing)",
          "ML-DSA / FIPS 204 implementations",
          "Post-quantum inventory and CBOM",
          "Harvest-now-decrypt-later exposure",
          "Published research across the ecosystem",
        ],
      },
    ],
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
        body: "The artifact is tamper-evident and can be verified offline using a trusted public key.",
      },
    ],
    finalLine:
      "A report gives you a conclusion. The artifact preserves the authorization basis behind it.",
  },
  comparison: {
    eyebrow: "Honest comparison",
    title: "Where does the proof live once the work is done?",
    description:
      "We are not the only people who can prove software correct, and we will not pretend otherwise. Certora, Imandra, Galois, Trail of Bits and AWS all do serious work — on their home ground, better than we do. The difference is what you are still holding after the engagement ends.",
    columns: {
      vendor: "Vendor",
      strength: "Strongest at",
      location: "Where the proof lives",
      survives: "Survives the vendor?",
    },
    rows: [
      {
        vendor: "Certora",
        strength: "Smart contracts, continuous property checking",
        location: "Their dashboard",
        survives: "No",
      },
      {
        vendor: "Imandra",
        strength: "Algorithm and code logic, neurosymbolic reasoning",
        location: "Their cloud service",
        survives: "No",
      },
      {
        vendor: "Galois",
        strength: "Government-grade high assurance, 25 years of it",
        location: "An engagement report",
        survives: "No",
      },
      {
        vendor: "Trail of Bits",
        strength: "Expert audit at scale, open-source tooling",
        location: "A PDF report",
        survives: "No",
      },
      {
        vendor: "AWS",
        strength: "Provable security inside its own cloud",
        location: "Inside AWS",
        survives: "No",
      },
      {
        vendor: "IronProof",
        strength: "Portable evidence for AI actions, code and cryptography",
        location: "A sealed artifact you hold",
        survives: "Yes — offline, public key, post-quantum",
        isUs: true,
      },
    ],
    footnote:
      "Read this table the right way. On volume of published research, Trail of Bits and Galois are ahead of us by an order of magnitude. On smart-contract coverage, Certora is the incumbent and it is not close. We are not claiming to be better at their job. We are claiming a different deliverable: evidence that does not depend on our continued existence.",
  },
  sovereignty: {
    eyebrow: "Sovereignty & durability",
    title: "Built for institutions that cannot export their systems — or their trust.",
    description:
      "The proof core runs with no network access. Nothing about your systems, your code or your decisions has to leave your control in order to be proven, and nothing has to come back to us in order to be checked.",
    tagline: "Verifiable security for AI and critical software.",
    features: [
      {
        title: "Post-quantum seal",
        body: "Artifacts are hashed SHA3-512 and dual-signed Ed25519 + ML-DSA-65 under FIPS 204. Evidence sealed today stays checkable after a cryptographically relevant quantum computer exists.",
      },
      {
        title: "Offline verification",
        body: "A verifier needs the artifact and a public key. No network, no account, no call home. Tampering shows up as a content-hash mismatch, not as silence.",
      },
      {
        title: "Sovereign & air-gapped deployment",
        body: "Local, private, and compatible with air-gapped environments. Canadian-operated, for institutions that treat data residency and vendor concentration as a risk to be documented.",
      },
    ],
  },
  corpus: {
    eyebrow: "The record",
    title: "Everything we claim is either published or reproducible.",
    description:
      "The strongest thing a verification company can do is make itself falsifiable. Read the methods, run the suite, check the numbers, and disagree with us in public.",
    record: [
      {
        stat: "3",
        label: "CVEs assigned",
        note: "libyang, pupnp and Zephyr RTOS. Two carry public identifiers you can look up: CVE-2026-44673 (CVSS 7.5) and CVE-2026-41682.",
      },
      {
        stat: "28",
        label: "Coordinated disclosures filed",
        note: "Reported through vendor channels, on a 90-day clock.",
      },
      {
        stat: "3",
        label: "Third-party public attributions",
        note: "wolfSSL, VideoLAN and Red Hat / OpenELA credit us by name.",
      },
      {
        stat: "Lean 4",
        label: "Encoder fidelity, kernel-checked",
        note: "The decider and the Z3 encoder are proven equivalent by a machine-checked theorem, generated from the real solver AST rather than transcribed by hand — the same discipline AWS applies to Cedar.",
      },
      {
        stat: "1",
        label: "Command reproduces the suite",
        note: "reproduce.sh --verify re-derives the verification results end to end.",
      },
      {
        stat: "4",
        label: "Preprints on arXiv (cs.CR)",
        note: "Methods, datasets and failure cases published in the open.",
      },
    ],
    papers: {
      eyebrow: "Published research",
      note: "Four preprints on arXiv (cs.CR). Read the methods, check the numbers, disagree with us in public.",
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
    title: "Canadian financial services. Back-office AI agents that move money.",
    description:
      "Accounts payable, refunds, disbursements, beneficiary changes, cumulative limits, payments held for human approval. The buyer is risk, compliance and internal audit — not the development team. We are deliberately starting narrow, because a wedge without named accounts is just a category.",
    quote:
      "They do not use it to replace human judgment or to fully automate critical decisions given the significant financial, legal and reputational consequences.",
    quoteSource: "Bank of Canada — Financial System Survey, May 2026",
    quoteHref:
      "https://www.bankofcanada.ca/2026/05/financial-system-survey-highlights-2026/",
    afterQuote:
      "That is the blocker we remove. Not with a promise — with an artifact the institution’s own auditor re-verifies without calling us. The same survey flags concentration among a small number of third-party AI and cloud providers as a stability risk: portable proof answers that concern better than geography does.",
    alsoLabel: "The engine also runs against",
    also: [
      "Critical infrastructure operators",
      "Government and defence-adjacent programs",
      "Telecommunications",
      "Healthcare administration platforms",
      "Modernization and integration partners",
      "Enterprise SaaS deploying AI agents",
    ],
  },
  finalCta: {
    eyebrow: "In a world of AI uncertainty",
    title: "IronProof gives institutions something rare: evidence.",
    subhead: "IronProof is not selling trust. IronProof is selling proof.",
    offerLabel: "Entry engagement",
    offerName: "Transaction Boundary Certificate",
    offerBody:
      "We take one money-moving workflow, encode the boundary it must never cross, prove no reachable state crosses it, and seal the certificate. Your auditor verifies it offline. Recertification is triggered by your release, not by our calendar.",
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
      "IronProof builds verifiable security infrastructure for AI and critical software. We prove what agents, code and cryptography are allowed to do, and seal the result as post-quantum evidence that a third party re-verifies offline — without trusting us.",
    tagline: "Verifiable security for AI and critical software.",
    country: "Canada",
    copyright: "IronProof. All rights reserved.",
  },
};
