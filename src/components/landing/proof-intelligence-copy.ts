/*
 * Copy for /proof-intelligence: the page that defines the term the hero
 * carries (Dom, 2026-10-16 and 2026-10-17). Whoever writes the definition
 * owns the category, so the definition lives on one page, in one sentence.
 *
 * English only, like the research notes: the French goes through the same
 * native Quebec French review (rule #78) before it is served.
 *
 * No new figure and no new claim. Every sentence restates one already on the
 * site: the North Star (platform-copy.ts), the three verdicts and the limits
 * (research-limits-copy.ts), the seal keys (architecture-plate.tsx), the
 * status of each application (site-nav, /modernization, /software-security).
 * No competitor is named, and nothing says "nobody else does this".
 *
 * Inline syntax is the one <Rich> parses in research-zero-barriers.tsx:
 * **bold**, *italic*, [label](/href). Nothing else.
 */

import type { ResearchCopy } from "@/components/landing/research-copy";

export const PI_DEFINITION =
  "Proof Intelligence is AI that proposes, formal methods that decide, and evidence anyone can check without trusting the vendor.";

export const PI_COPY: ResearchCopy = {
  meta: {
    title: "What is Proof Intelligence? — Ironproof",
    description: `${PI_DEFINITION} Every result is proven, refuted with the case that breaks it, or reported as not demonstrated.`,
  },
  eyebrow: "DEFINITION",
  h1: "Proof Intelligence",
  standfirst: PI_DEFINITION,
  byline: "Ironproof Research · 17 October 2026",
  note: "This page defines a term. Every result it points to is already published on this site; it adds no new figure.",
  lede: "Don’t trust the verdict. Verify the evidence.",
  sections: [
    {
      blocks: [
        {
          t: "p",
          text: "AI now writes code, moves money, and changes critical systems faster than humans can review them. But speed without assurance is not enough.",
        },
        {
          t: "p",
          text: "Every migration must preserve the behavior that matters. Every critical action must be authorized before execution. Every claim must withstand independent verification. Proof Intelligence is the name for doing all three with a machine-checked answer instead of a confident one.",
        },
      ],
    },
    {
      num: "01",
      h: "Three parts, one chain",
      blocks: [
        {
          t: "ol",
          items: [
            "**AI proposes.** A model turns a written policy, a program or a question into a precise statement a machine can decide. It is fast, and it can be wrong, so it never has the last word.",
            "**Formal methods decide.** Solvers and model checkers (Z3, cvc5, CBMC) settle the statement over every case the model allows, not the cases someone thought to try.",
            "**Evidence leaves with you.** The decision, its justification and the proof result are sealed (Ed25519 + ML-DSA-65) into an artifact your own auditor can re-check offline, without an Ironproof dashboard.",
          ],
        },
        {
          t: "pull",
          text: "AI proposes. Formal methods decide. The evidence travels.",
        },
      ],
    },
    {
      num: "02",
      h: "Three verdicts, never two",
      blocks: [
        {
          t: "p",
          text: "A pass/fail system has a hidden third state. When a tool cannot decide, “pass” is usually where the case lands. Every Proof Intelligence result is one of three, always stated *within the declared model*:",
        },
        {
          t: "ol",
          items: [
            "**Proven.** The property holds in every case the model allows.",
            "**Refuted.** The property fails, and the result carries the exact case that breaks it, so you can replay it yourself.",
            "**Not demonstrated.** We could not conclude, or the rule could not be modelled. It is reported as such, never folded into proven.",
          ],
        },
        {
          t: "pull",
          text: "A result that cannot say “I don’t know” cannot be trusted when it says “yes”.",
        },
      ],
    },
    {
      num: "03",
      h: "What it is not",
      blocks: [
        {
          t: "ol",
          items: [
            "**Not a confidence score.** A probability that an answer is right is not a proof that it is.",
            "**Not AI checking AI.** The model proposes; a solver decides, and the solver’s result is what gets sealed.",
            "**Not a dashboard you have to trust.** The evidence verifies offline, without us.",
            "**Not a proof about the world.** A proof holds for the declared model and its assumptions. [Here is exactly where ours stop](/research/what-our-proofs-do-not-prove).",
          ],
        },
      ],
    },
    {
      num: "04",
      h: "Where Ironproof applies it today",
      blocks: [
        {
          t: "ol",
          items: [
            "**Code verification.** Someone else translated your code (COBOL to Java or Python, Python or MATLAB to C); we check it still does what the original did, or show the exact input where it differs. Available now as a service. [Send us a translation](/modernization).",
            "**Critical actions.** Authorization before execution for actions that cannot be undone — moving money, granting access, deleting records, changing production — whether an AI agent, a script, an API call or a person initiates them: allowed when they comply, blocked when they break the rule. [See it decide](/#decide).",
            "**Software security.** Proving that a fix to C code closes the flaw it targets. In research. [What we have run](/software-security).",
          ],
        },
        {
          t: "pull",
          text: "We prove what holds. We show what breaks.",
        },
        {
          t: "p",
          text: "Others sell trust. We sell the right not to trust us.",
        },
      ],
    },
  ],
  related: {
    head: "RELATED",
    items: [
      ["/research/what-our-proofs-do-not-prove", "What our proofs do not prove", "The limits of every verdict, stated in public"],
      ["/demo", "Watch the demos", "The Proof Intelligence film and the AGCO deposit-limit demo"],
      ["/proof", "How we prove", "Testing versus proving, and a proof you can open"],
      ["/demo/python-to-c", "Python to C, proven", "A translation checked by a solver, step by step"],
      ["/verify", "Verify a seal", "Check a sealed result in your browser"],
    ],
  },
  sources: {
    head: "SOURCES",
    items: [
      [
        "/research/what-our-proofs-do-not-prove",
        "Ironproof Research — What our proofs do not prove (16 October 2026)",
        "The three verdicts and the five places a proof is weaker than its word, restated in sections 2 and 3.",
      ],
      [
        "https://arxiv.org/abs/2610.11073",
        "IRONPROOF: COBOL-to-Python Transpilation with SMT-Based Equivalence Checking (arXiv:2610.11073)",
        "The published method behind the modernization results.",
      ],
    ],
    foot: "This page introduces no figure that is not already published. When the definition changes, it changes here first.",
  },
};
