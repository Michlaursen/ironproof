/*
 * Copy for the research note "What our proofs do not prove".
 *
 * English only. No French is written yet; when it is, it goes through the same
 * native Quebec French review as the first note (rule #78) before it is served.
 *
 * Every claim about a result restates a sentence already published on the
 * home page (landing.tsx: trio, not, domains.run) or on the COBOL page
 * (platform-copy.ts). The note adds the limits; it adds no new figure. If a
 * published result changes, this note changes in the same pull request.
 *
 * No competitor is named, on purpose: the note enters through the reader's
 * problem (what does a verification verdict actually guarantee?), not ours.
 *
 * Inline syntax is the one <Rich> parses in research-zero-barriers.tsx:
 * **bold**, *italic*, [label](/href). Nothing else.
 */

import type { ResearchCopy } from "@/components/landing/research-copy";

export const LIMITS_COPY: ResearchCopy = {
  meta: {
    title: "What our proofs do not prove — Ironproof Research",
    description:
      "A verification verdict is only as strong as the question it was asked. For each thing Ironproof checks: what we guarantee, what holds only within bounds, and what is still open.",
  },
  eyebrow: "RESEARCH NOTE",
  h1: "What our proofs do not prove",
  standfirst:
    "A verification verdict is only as strong as the question it was asked. Here is what ours guarantee, what holds only within bounds, and what is still open.",
  byline: "Ironproof Research · 16 October 2026",
  note: "Every result cited here is one already published on this site; this note adds its limits, not new figures.",
  lede: "“Proven” is the most dangerous word in our field. It is true of a model, under a property, within a scope — and it travels alone, without any of the three.",
  sections: [
    {
      blocks: [
        {
          t: "p",
          text: "Our line is *we prove what can be proven, and say so when we cannot*. A line under a headline is a promise. This note is the part where we keep it: for each thing Ironproof checks, the exact edge of what the result means.",
        },
        {
          t: "p",
          text: "It is written for the person who has to sign off on a verification result — a risk committee, an auditor, an engineer inheriting a migration — and who needs to know what they are signing.",
        },
      ],
    },
    {
      num: "01",
      h: "Three verdicts, never two",
      blocks: [
        {
          t: "p",
          text: "A pass/fail system has a hidden third state. When a tool cannot decide, it has to put the case somewhere, and “pass” is usually where it lands. That is how a check that never ran becomes a green light.",
        },
        {
          t: "p",
          text: "Every Ironproof result is one of three, always stated *within the declared model*:",
        },
        {
          t: "ol",
          items: [
            "**Proven.** The property holds in every case the model allows. Not the cases we tried: every case.",
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
      num: "02",
      h: "Five places a proof is weaker than its word",
      blocks: [
        {
          t: "p",
          text: "None of these is specific to us. They hold for any formal verification result, from anyone. We list them because they are the questions to ask of ours.",
        },
        { t: "h3", text: "1. The model is not the system" },
        {
          t: "p",
          text: "A solver reasons about a model: a precise description of the policy, the program or the translation. A proof says nothing about behaviour the model leaves out. That is why every verdict we return is stated within the model you define, and why the model ships with the result.",
        },
        { t: "h3", text: "2. The encoding is not the text" },
        {
          t: "p",
          text: "Your policy is written in words. The solver needs logic. Turning one into the other is a step no solver can check, because the solver only ever sees the logic. If the encoding misreads a clause, the proof is a proof of the misreading.",
        },
        {
          t: "p",
          text: "We test this step in our labs by encoding a policy blind: one side writes the rules without seeing the test cases, another writes the cases from the policy text without seeing the rules, and every disagreement is examined. That measures the step on the policies we tried. **It is not attached to every result we seal, and it is not a proof.**",
        },
        { t: "h3", text: "3. A bound is a bound" },
        {
          t: "p",
          text: "Some checks explore a program only up to a stated limit: so many loop iterations, so much input. Within the bound, the answer is exhaustive. Beyond it, the check says nothing. A bounded result that is reported without its bound is a different, larger claim than the one that was checked.",
        },
        { t: "h3", text: "4. The original program has more than one meaning" },
        {
          t: "p",
          text: "To show a translation preserves behaviour, you need the behaviour of the original. For COBOL, that depends on the compiler and its options: the same source can store an overflowing number differently under different settings. An equivalence result holds for the semantics our model implements, not for every way the original could have been compiled.",
        },
        { t: "h3", text: "5. A seal proves integrity, not truth" },
        {
          t: "p",
          text: "Every result we return is sealed with Ed25519 and the post-quantum ML-DSA-65 signature. Change one figure and the seal breaks. What the seal shows is that the record is intact and which keys signed it. **It does not show that what the record says is true.** That is what the proof, and the limits above, are for.",
        },
      ],
    },
    {
      num: "03",
      h: "Application by application",
      blocks: [
        {
          t: "p",
          text: "The same engine answers three questions. Here is the edge of each, in the terms of what is already published.",
        },
        { t: "h3", text: "May this action run?" },
        {
          t: "note",
          head: "WHAT WE GUARANTEE",
          text: [
            "On the production gate, no language model decides: the same request, in the same state, under the same policy always gets the same answer. A blocked action never runs, and every decision, allowed, blocked or refused, is sealed.",
            "About the policy itself, we prove what it permits. On 57 example IAM policies published by AWS, 160 of 185 guarantees, written before the solver ran, were proven under two independent solvers (Z3 and cvc5).",
          ],
        },
        {
          t: "note",
          head: "WHAT HOLDS ONLY UNDER CONDITIONS",
          text: [
            "A proof about the policy is a proof about the policy as encoded (place 2 above). A rule the engine cannot model is reported as not exercised, never as proven.",
          ],
        },
        {
          t: "note",
          head: "WHAT IS STILL OPEN",
          text: [
            "Whether the encoding says what your written policy means is reviewed by people and tested in our labs. It is not yet measured on every policy we seal.",
          ],
        },
        { t: "h3", text: "Does this C fix really close the hole?" },
        {
          t: "note",
          head: "WHAT WE GUARANTEE",
          text: [
            "Less than the word “proof” suggests, and we say so on the home page. On 20 fixes drawn at random from projects such as curl, libssh2 and Suricata, for 13 the test our AI wrote failed before the fix, passed after it, and rejected two decoys.",
          ],
        },
        {
          t: "note",
          head: "WHAT HOLDS ONLY UNDER CONDITIONS",
          text: [
            "All of it is within stated CBMC bounds (place 3 above), and all of it rests on a generated test. For 3 fixes, the test could not tell a plausible wrong fix from the real one, which says nothing against the real fix. 4 were not analyzed.",
          ],
        },
        {
          t: "note",
          head: "WHAT IS STILL OPEN",
          text: [
            "A complete proof that a fix closes a flaw. Today this is a bounded check of a generated test, not a complete proof, and earlier passes are not presented as more than that.",
          ],
        },
        { t: "h3", text: "Does the migrated COBOL do what the old one did?" },
        {
          t: "note",
          head: "WHAT WE GUARANTEE",
          text: [
            "Ironproof translates COBOL into Python, then checks that both give the same results, or shows the exact input where they differ. The method is published: [arXiv:2610.11073](https://arxiv.org/abs/2610.11073).",
          ],
        },
        {
          t: "note",
          head: "WHAT HOLDS ONLY UNDER CONDITIONS",
          text: [
            "Equivalence holds under our model of the old system, with the compiler semantics that model implements (place 4 above). What the model does not cover is marked as not covered, never as passed.",
          ],
        },
        {
          t: "note",
          head: "WHAT IS STILL OPEN",
          text: [
            "No outside party has yet re-run our COBOL results. Until someone does, the evidence is re-checkable, but it has not been re-checked.",
          ],
        },
      ],
    },
    {
      num: "04",
      h: "What “without trusting us” covers",
      blocks: [
        {
          t: "p",
          text: "Your auditor can check the seal in a browser and re-run the proof in their own solver, from the obligations we ship. Our word is not part of that check.",
        },
        {
          t: "p",
          text: "What that check cannot tell them is whether the obligations were the right ones to prove. That is places 1, 2 and 4 again: the model, the encoding, the meaning of the original. Re-running a proof confirms the mathematics. **Choosing what to prove is still a judgement, and it is ours until someone reviews it.**",
        },
      ],
    },
    {
      num: "05",
      h: "Four questions to ask of any verification result",
      blocks: [
        {
          t: "p",
          text: "Ours included. If a result cannot answer these, it is a verdict, not evidence.",
        },
        {
          t: "ol",
          items: [
            "**What was the model?** What behaviour of the real system does it leave out?",
            "**What were the bounds?** Is the result exhaustive, or exhaustive up to a limit — and which limit?",
            "**Who wrote the property, and when?** Before the solver ran, or after the result was known?",
            "**What happens when it cannot conclude?** Is there a third verdict, or does “unknown” become “pass”?",
          ],
        },
        {
          t: "pull",
          text: "We prove what can be proven, and say so when we cannot. This page is the “say so”.",
        },
      ],
    },
  ],
  related: {
    head: "RELATED",
    items: [
      ["/proof", "How we prove", "Testing versus proving, and a proof you can open"],
      ["/provable-ai", "Provable AI", "What a proof adds to an AI system, and what it does not"],
      ["/modernization", "Code translation", "Python to C, Python to Rust, COBOL to Python, checked for the same results"],
      ["/verify", "Verify a seal", "Check a sealed result in your browser"],
    ],
  },
  sources: {
    head: "SOURCES",
    items: [
      [
        "/",
        "Ironproof home page — “Already run”",
        "The three published runs restated in section 3: cloud authorization (2026-09-30), energy (2026-10-09), open-source C (2026-10-12).",
      ],
      [
        "https://arxiv.org/abs/2610.11073",
        "IRONPROOF: COBOL-to-Python Transpilation with SMT-Based Equivalence Checking (arXiv:2610.11073)",
        "The published method behind the COBOL results.",
      ],
    ],
    foot: "This note introduces no figure that is not already published. When a published result changes, this note changes with it.",
  },
};
