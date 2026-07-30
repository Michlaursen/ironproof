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
    summary:
      "3 assigned CVEs · 28 coordinated disclosures · 4 security preprints",
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
    title: "IronProof turns a verdict into an artifact.",
    description:
      "You define what must never happen. IronProof searches the entire defined input space for a state that breaks it. If one exists, you get the counterexample. If none does, you get sealed evidence that keeps its meaning long after the engagement ends.",
    steps: [
      {
        step: "01",
        title: "Encode the boundary",
        body: "The security, compliance and governance rules an AI action, a code path or a cryptographic implementation must never cross — written once, compiled deterministically.",
      },
      {
        step: "02",
        title: "Prove it, don’t sample it",
        body: "A solver looks for any reachable state that violates the rule across the whole defined scope. Not fuzzing, not testing, not a confidence score: an exhaustive search over the space you declared.",
      },
      {
        step: "03",
        title: "Seal the evidence",
        body: "A counterexample when a violation exists. When none does, an artifact hashed SHA3-512 and dual-signed Ed25519 + ML-DSA-65 — portable, offline-checkable, post-quantum.",
      },
    ],
    diagram: {
      rulesTitle: "Boundary",
      rulesSubtitle: "Security, compliance & governance rules",
      verificationTitle: "Proof",
      verificationSubtitle: "Exhaustive over the defined input space",
      counterexampleLabel: "Violation reachable",
      counterexampleValue: "Counterexample",
      proofArtifactLabel: "No violation exists",
      proofArtifactValue: "Sealed artifact",
    },
    quoteIntro1: "Most security tools say: ",
    quote1: "“We looked at the system and it seems safe.”",
    quoteIntro2: "IronProof says: ",
    quote2:
      "“Here are the rules. Here is the proof that no state in this scope breaks them. Here is a sealed artifact you can re-check in ten years without us.”",
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
    eyebrow: "Walk through the artifact",
    title: "Every field in the artifact does a job.",
    description:
      "Open a sealed IronProof artifact and pull it apart. There are eight parts, and each one is there because an engineer, an auditor or a regulator reading it has a decision to make. A report tells you what we concluded. An artifact lets you check it.",
    stats: [
      {
        stat: "8",
        label: "Annotated fields",
        note: "Each one deliberately different from what a report gives you.",
      },
      {
        stat: "2",
        label: "Signatures per entry",
        note: "Ed25519 and ML-DSA-65, and both must verify or the entry fails. SHA3-512 is the third primitive in the seal, but it hashes — it does not sign.",
      },
      {
        stat: "0",
        label: "Vendor access required",
        note: "The public keys ship inside the artifact. Verification is offline.",
      },
    ],
    fileLabel: "verdict_dossier.json — merchant refund policy v3.2",
    fileMeta: "sceal_dossier_version 1.1 · dual-signed · chained",
    parts: [
      {
        num: "01",
        field: "target · policy_owner",
        anchor: "Who wrote the rule",
        claim: "The customer owns the policy. We only prove it.",
        body: "The artifact records, in its own body, that the rule being proven was written by the customer and not by us. A verification company that authors the rules it then grades itself against is marking its own homework, and the artifact makes that impossible to hide.",
        statusQuo:
          "The vendor defines the property and the pass criteria, so a green result partly measures the vendor’s own choices.",
        code: [
          { key: "target", value: "\"Acme Store — refund / credit / discount policy v3.2\"" },
          {
            key: "policy_owner",
            value: "\"merchant (customer-authored, not written by Ironproof)\"",
            tone: "ok",
          },
        ],
      },
      {
        num: "02",
        field: "theorem",
        anchor: "The obligation, in solver form",
        claim: "The actual theorem, not a paraphrase of it.",
        body: "Two obligations, both discharged: the base case says the system starts inside the invariant, the inductive step says no single action can leave it. Together they cover every reachable sequence — not a sample of them. The formula is in the artifact, so you can re-run it rather than believe our summary of it.",
        statusQuo:
          "Reports describe the property in English. The prose and the formula that was actually checked can drift apart, and nobody finds out.",
        code: [
          { key: "theorem", value: "\"INIT => INV ; INV & step => INV'\"" },
          { key: "discharge", value: "\"both UNSAT under spec-compiled gate\"", tone: "ok" },
        ],
      },
      {
        num: "03",
        field: "meaning",
        anchor: "Plain language, beside the maths",
        claim: "The sentence a risk officer can read, next to the formula it came from.",
        body: "The artifact carries a plain-language reading of the theorem — not instead of the formula, beside it. The engineer checks the maths; the risk committee reads the sentence; both are looking at the same sealed object, so they cannot be told different stories.",
        statusQuo:
          "You get one or the other: prose nobody can check, or a formula nobody reads. The gap between them is where overclaims live.",
        code: [
          {
            key: "meaning",
            value:
              "\"no sequence of refund/credit/discount actions the agent can take exceeds the merchant’s limits\"",
          },
        ],
      },
      {
        num: "04",
        field: "solver_in_proof",
        anchor: "Named solver, pinned version",
        claim: "Which prover, which version — recorded in the evidence.",
        body: "A proof is only as reproducible as the tool that produced it. The artifact names the solver and pins its version, so the run can be repeated years later on the same tooling, and so a solver bug disclosed tomorrow can be mapped to every artifact it touched.",
        statusQuo:
          "A green checkmark with no solver, no version and no obligation. Nothing to reproduce, nothing to recall.",
        code: [
          { key: "solver_in_proof", value: "\"z3 4.16.0\"", tone: "ok" },
          { key: "artifact_sha3_512", value: "\"ca5628f661854813be35…\"", tone: "muted" },
        ],
      },
      {
        num: "05",
        field: "independent_engine_count",
        anchor: "Corroboration by independent engines",
        claim: "More than one engine had to agree.",
        body: "The verdict is corroborated by independent reasoning engines, and the count travels with the artifact. One tool’s opinion is a data point; agreement between engines that fail differently is evidence. When they disagree, the artifact says so rather than picking the convenient answer.",
        statusQuo:
          "A single tool’s output, presented as fact. Its blind spots become your blind spots, silently.",
        code: [
          { key: "corroborating_engines", value: "[ … ]" },
          { key: "independent_engine_count", value: "2", tone: "ok" },
        ],
      },
      {
        num: "06",
        field: "content_hash · prev_hash · entry_hash",
        anchor: "Append-only chain",
        claim: "Editing the past breaks the chain, loudly.",
        body: "Every entry hashes its own content, carries the hash of the one before it, and seals both. Change a value after the fact and the chain no longer closes — verification fails with a content-hash mismatch instead of quietly accepting the new version. Tamper detection is a property of the format, not a promise in a contract.",
        statusQuo:
          "A PDF that can be re-exported, or a dashboard row that can be updated in place with no trace.",
        code: [
          { key: "content_hash", value: "\"8a42d3e9bff6c0037bc7…\"", tone: "muted" },
          { key: "prev_hash", value: "\"000000000000000000…\"", tone: "muted" },
          { key: "entry_hash", value: "\"e2bc96d69a59406606f0…\"", tone: "muted" },
        ],
      },
      {
        num: "07",
        field: "signature_scheme · public_keys",
        anchor: "Dual signature, post-quantum",
        claim: "Both signatures must verify. The keys ship with the artifact.",
        body: "Each entry is signed classically with Ed25519 and post-quantum with ML-DSA-65 under FIPS 204, in a mode where both must verify or the entry is rejected. The public keys are inside the file, so checking it needs no account, no network and no cooperation from us — including after we are gone.",
        statusQuo:
          "Verification means logging into the vendor’s dashboard, or trusting a PDF signature that expires with its certificate authority.",
        code: [
          { key: "classical", value: "\"Ed25519\"" },
          { key: "post_quantum", value: "\"ML-DSA-65\"", tone: "ok" },
          { key: "mode", value: "\"dual (both must verify)\"", tone: "ok" },
        ],
      },
      {
        num: "08",
        field: "claim (when a check did not run)",
        anchor: "A skip never reads as a pass",
        claim: "When we could not check something, the artifact says so in the same field that would have said “verified”.",
        body: "If the prover or the checker is absent, the artifact does not fall silent and it does not go green. It records the gap in the same place a success would have been written. This is the failure mode that matters most in our field — a green summary sitting on top of something that never ran — and we designed the format so it cannot happen quietly.",
        statusQuo:
          "A check that did not run is indistinguishable from a check that found nothing. Both render as green.",
        code: [
          {
            key: "claim",
            value:
              "\"NOT RUN — prover and/or checker absent. This is a gap, not a pass.\"",
            tone: "warn",
          },
          { key: "obligations_checked", value: "0", tone: "warn" },
        ],
      },
    ],
    tableTitle: "Side by side",
    tableColumns: {
      row: "In the deliverable",
      us: "IronProof artifact",
      them: "Typical report or dashboard",
    },
    tableRows: [
      { row: "Names who authored the policy", us: "yes", them: "no" },
      { row: "Ships the checked formula, not a paraphrase", us: "yes", them: "no" },
      { row: "Plain-language reading beside the formula", us: "yes", them: "sometimes" },
      { row: "Names the solver and pins its version", us: "yes", them: "no" },
      { row: "Records corroboration by independent engines", us: "yes", them: "no" },
      { row: "Tampering breaks verification", us: "yes", them: "no" },
      { row: "Post-quantum signature (FIPS 204)", us: "yes", them: "no" },
      { row: "Verifiable offline, without the vendor", us: "yes", them: "no" },
      { row: "A skipped check cannot render as a pass", us: "yes", them: "no" },
      { row: "Still meaningful after the vendor is gone", us: "yes", them: "no" },
    ],
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
