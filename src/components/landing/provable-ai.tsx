import { IronProofLogo } from "@/components/ironproof-logo";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { FadeUpInit } from "./fade-up-init";
import { CtaForm } from "./cta-form";
import { IconEyeOff, IconVerify, IconSeal, IconRule, IconGlobe } from "@/components/icons";
import { defaultLocale, type Locale } from "@/content";

/*
 * "What is Provable AI?" — the category page reached from the nav.
 * English copy inline (phase 1, same as the landing); the /fr route resolves
 * to the same component until the i18n content is reconnected with Miguel.
 * Every claim is mapped to the real state: capabilities marked BUILT exist
 * today — including the public offline verifier (PR #10, merged) and the
 * publicly anchored root of trust (attested across two independent names,
 * 2026-08-18). No traction claims, no latency numbers, never "we prove all
 * vulnerabilities".
 */

function Pill({ kind }: { kind: "built" | "coming" | "roadmap" }) {
  const label = kind === "built" ? "BUILT" : kind === "coming" ? "COMING" : "ROADMAP";
  const tone =
    kind === "built"
      ? "text-seal border-seal/40 bg-seal/10"
      : "text-neutral-400 border-white/12 bg-white/5";
  return (
    <span
      className={`track-mid ml-3 inline-block rounded-full border px-2.5 py-0.5 align-middle text-[0.6rem] ${tone}`}
    >
      {label}
    </span>
  );
}

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="track-mid mb-4 text-xs text-neutral-500">{children}</p>;
}

export function ProvableAI({ locale = defaultLocale }: { locale?: Locale }) {
  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} active="provable-ai" />

      <main className="flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 px-6 pb-16 pt-24 md:px-14 md:pt-28">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-4xl">
            <p className="track-wide mb-6 text-xs text-neutral-400 md:text-sm">PROVABLE AI</p>
            <h1 className="metal-shine mb-8 font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
              What is Provable AI?
            </h1>
            <p className="max-w-2xl text-lg font-light leading-snug text-neutral-300 md:text-xl">
              A category name for what regulated AI has been missing: the ability to prove —{" "}
              <span className="metal-text">mathematically and cryptographically</span> — that an AI
              agent could not have crossed the line you drew, and to hand you an{" "}
              <span className="metal-text">artifact you verify yourself</span>, without trusting the
              vendor who produced it.
            </p>
            <div className="hairline mt-10 h-px w-full max-w-md" />
          </div>
        </section>

        {/* 01 — the question */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>01 — The question nobody could answer</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              Can you prove your agent <span className="metal-shine">couldn&apos;t</span>?
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
              Ask a monitoring vendor whether an AI agent stayed inside its rules and the honest
              answer is a version of <span className="text-foreground">we watched, and nothing
              looked wrong</span>. Guardrails, red-teaming, evals, an LLM grading another LLM — these
              observe, sample, and describe. They tell you what was probably fine under the
              conditions you happened to test.
            </p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">
              None of them prove. A proof is not a narrative about behavior and not a statistical
              pattern around it. It is a formal guarantee that a specified thing{" "}
              <span className="text-foreground">cannot happen</span> — over every case in a class,
              not the cases you sampled.
            </p>
            <blockquote className="card-premium mt-10 max-w-2xl p-8">
              <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
                Detection tells you nothing looked wrong. A proof tells you the wrong thing is
                impossible.
              </p>
            </blockquote>
          </div>
        </section>

        {/* 02 — the reframe */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>02 — The reframe</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              Not &ldquo;probably safe.&rdquo; Provably impossible — and you leave with the proof.
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
              A model that judges a model is <span className="text-foreground">promptable</span>: it
              can be talked out of its verdict, because it is itself a probabilistic system. A
              solver is not. When we prove a rule holds, we are not scoring a trajectory — we are
              showing that no execution in that class violates the rule, for an unbounded number of
              steps.
            </p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">
              The second half is the part the market does not offer today. Formal verification
              exists — but it lives <span className="text-foreground">inside</span> a cloud you
              cannot audit, or it arrives as a <span className="text-foreground">consulting
              report</span>. Either way you do not walk away holding the proof. We hand you the
              artifact, and an independent verifier re-checks it offline.
            </p>
          </div>
        </section>

        {/* 03 — what provable means */}
        <section id="platform" className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <Snum>03 — What &ldquo;provable&rdquo; means, precisely</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              Two layers on every surface.
            </h2>
            <p className="mt-6 font-light leading-relaxed text-neutral-300">
              Provable AI is not a vibe. On each surface we run — agent actions, code, cryptography —
              there are two distinct layers, and only one of them is the moat.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <IconEyeOff className="icon-metal h-6 w-6" />
                <span className="track-mid text-xs text-neutral-400">LAYER 1 · DETECTION</span>
              </div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Broad. Probabilistic.</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Flags what looks wrong across everything. Useful, and everyone in the field does some
                version of it. It can miss, and it can be argued with.
              </p>
            </div>
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <IconVerify className="icon-metal h-6 w-6" />
                <span className="track-mid text-xs text-seal">LAYER 2 · PROOF</span>
              </div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Narrow. Absolute.</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                On the provable class, <span className="text-foreground">UNSAT</span> — no case
                violates the rule. Not &ldquo;we didn&apos;t find one.&rdquo; None exists, and the
                artifact says so in a form anyone can re-check.
              </p>
            </div>
          </div>

          {/* pipeline */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="card-premium fade-up p-8">
              <IconRule className="icon-metal mb-5 h-6 w-6" />
              <div className="track-mid mb-2 text-xs text-neutral-500">01 · PROVE</div>
              <h3 className="metal-text mb-2 font-serif text-xl">Z3 / Spacer</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                The solver synthesizes the inductive invariant itself and proves the rule holds over
                every trajectory.
              </p>
            </div>
            <div className="card-premium fade-up p-8">
              <IconSeal className="icon-metal mb-5 h-6 w-6" />
              <div className="track-mid mb-2 text-xs text-neutral-500">02 · SEAL</div>
              <h3 className="metal-text mb-2 font-serif text-xl">Post-quantum</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                SHA3-512 hash chain, signed Ed25519 + ML-DSA-65 (FIPS 204). Tamper is detectable.
              </p>
            </div>
            <div className="card-premium fade-up p-8">
              <IconGlobe className="icon-metal mb-5 h-6 w-6" />
              <div className="track-mid mb-2 text-xs text-neutral-500">03 · VERIFY</div>
              <h3 className="metal-text mb-2 font-serif text-xl">Offline</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                An independent verifier re-checks the sealed artifact without ever contacting us.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — how the proof is built */}
        <section id="speed" className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>04 — How the proof is built</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              We don&apos;t ask you to trust the discovery.
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
              A solver that <span className="text-foreground">finds</span> an invariant is
              convenient but not evidence — you would be trusting the search. So before anything is
              sealed, we re-extract the inductive invariant and discharge its verification conditions
              as <span className="text-foreground">UNSAT in a fresh solver</span>, derived from the
              proof obligation itself. Discovery and re-check are separated on purpose.
            </p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">
              The policy the prover reads and the policy the runtime enforces come from{" "}
              <span className="text-foreground">one compiler</span>, not two hand-copied encodings —
              a differential check fails the build if they ever diverge. Two artifacts that must
              agree, with something that breaks when they don&apos;t.
            </p>
          </div>
        </section>

        {/* 04b — honest surface */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 md:px-14">
          <div className="fade-up">
            <Snum>04b — The honest surface</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              What we <span className="metal-shine">do</span> ask you to trust, named.
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
              The cryptographic base is <span className="text-foreground">NIST standards</span> —
              SHA3-512, Ed25519, ML-DSA-65 (FIPS 204) — not cryptography of our own. Those
              assumptions are negligible in the security parameter.
            </p>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
              The rest we name rather than hide: the solver&apos;s UNSAT decision (mitigated by the
              independent re-check above), that the model faithfully encodes the policy (held by the
              single-compiler discipline), and that the declared threshold is{" "}
              <span className="text-foreground">your firm&apos;s chosen number</span> — we prove the
              configuration stays under the limit, not that the limit is the right one.
            </p>
            <blockquote className="card-premium mt-8 max-w-2xl p-8">
              <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
                A limitation you state is an asset. The same limitation left unspoken is the thing
                that detonates in review.
              </p>
            </blockquote>
          </div>
        </section>

        {/* 05 — the artifact */}
        <section id="verify" className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up flex flex-col items-start gap-10 md:flex-row md:items-center">
            <div className="flex-1">
              <Snum>05 — The artifact</Snum>
              <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
                A sealed certificate you can carry out the door.
              </h2>
              <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
                Each governed decision emits a self-contained record binding{" "}
                <span className="text-foreground">identity, scope, authority, the decision, the
                proof, and the resulting state change</span>. Records accumulate into an append-only,
                hash-chained stream — editing one entry breaks every entry after it.
              </p>
              <p className="max-w-2xl font-light leading-relaxed text-neutral-300">
                The seal carries a time witness, and it is honest about how strong that witness is:
                it reports one of <span className="text-foreground">bounded</span>, one-sided,
                self-declared, or none — so &ldquo;consistent with the rules at that time&rdquo; is
                backed, never assumed. If the network is down, the seal degrades honestly instead of
                faking a timestamp.
              </p>
            </div>
            <div className="shrink-0 self-center">
              <ProofSeal size={150} />
            </div>
          </div>
        </section>

        {/* 06 — what it isn't */}
        <section id="compare" className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <Snum>06 — What it isn&apos;t</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              Provable AI is not a rebrand.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
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
            ].map((x) => (
              <div key={x.n} className="card-premium fade-up p-8">
                <h3 className="metal-text mb-3 font-serif text-xl">{x.n}</h3>
                <p className="font-light leading-relaxed text-neutral-300">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 — what it does not solve */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>07 — What it does not solve</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              Sharp primitive, sharp edges.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {[
              {
                t: "Valid under policy is not good policy",
                b: "We prove the agent stayed inside the boundary the policy fixed. We say nothing about whether that boundary was well chosen. A policy that authorizes harm yields a valid proof of harmful-but-authorized execution.",
                pill: null as null | "roadmap",
              },
              {
                t: "A proof cannot confer authority",
                b: "We prove the action stayed inside the policy in force, and that the policy is not operable until a designated quorum dual-signs its exact fingerprint — weaken a guard after sign-off and the schema stops being enforceable. What we cannot establish sits upstream of any code: that the people holding those keys were entitled to hold them, that their mandate is still current and in scope, or that whoever refuses to sign is protected when they do. A gate can be made unbypassable. The right to open it comes from somewhere else.",
                pill: null,
              },
              {
                t: "Authorized is not safe",
                b: "A fully authorized action can still be the wrong action in the world. We govern the trajectory, not the wisdom of the capabilities you granted.",
                pill: null,
              },
              {
                t: "In-process hostile code is physics",
                b: "Arbitrary hostile code sharing the runtime can call an effect directly. That is true for everyone in this category — we name it in the code rather than paper over it.",
                pill: null,
              },
              {
                t: "Composition has a frontier — and it moved",
                b: "Six axes of structuring are proven closed over every sequence rather than a large sample: amount, time — at arbitrary window width — number of accounts — at unbounded fan-out width — combined action types, money routed through intermediary entities at arbitrary hop depth, and velocity, proven with all four amount controls in force, because the burst is the case they all approve. Five rest on an inductive invariant the solver had to discover; the fixed-window result closes by direct contradiction instead. We say which is which rather than let one word cover both.",
                pill: null,
              },
              {
                t: "A proof cannot source what you cannot see",
                b: "The layering proof closes the route on one condition: that value can be attributed to its origin. Whether that attribution is obtainable across institutions is a question for data and for law, not for a solver — a different question, with a different owner. Concurrent origins sharing an intermediary, a blended pool attributed pro rata, and rate measured per entity across accounts stay open. Behavioural anomaly — “unusual for this customer” — is not a threshold property at all, and nothing here addresses it.",
                pill: "roadmap" as const,
              },
            ].map((l) => (
              <div
                key={l.t}
                className="card-premium fade-up border-l-2 border-l-seal/50 p-8"
              >
                <h3 className="metal-text mb-2 font-serif text-xl">
                  {l.t}
                  {l.pill ? <Pill kind="roadmap" /> : null}
                </h3>
                <p className="font-light leading-relaxed text-neutral-300">{l.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 08 — regulatory */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>08 — Regulatory mapping</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              Answer examiner questions from the artifact.
            </h2>
            <p className="mb-8 max-w-2xl font-light leading-relaxed text-neutral-300">
              The proof-and-seal structure maps onto current supervisory expectations for agentic AI
              — the enforceable, machine-checkable subset, not a marketing translation. A firm
              answers &ldquo;show me it couldn&apos;t&rdquo; from the sealed record instead of from a
              narrative.
            </p>
            <div className="flex flex-wrap gap-3">
              {["OSFI E-23", "AMF (Québec)", "CRI FS AI RMF", "AIUC-1", "FINRA / SEC context"].map(
                (r) => (
                  <span
                    key={r}
                    className="chip-metal track-mid px-4 py-2 font-mono text-xs text-neutral-200"
                  >
                    {r}
                  </span>
                ),
              )}
            </div>
            <p className="mt-6 max-w-2xl text-sm text-neutral-500">
              Wedge: regulated Canadian financial services. Mapping is scoped to the
              machine-enforceable control objectives, not a claim of full-framework coverage.
            </p>
          </div>
        </section>

        {/* 09 — role / maturity */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>09 — Ironproof&apos;s role</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              One engine. Several surfaces. Honest about each.
            </h2>
            <p className="mt-6 max-w-2xl font-light leading-relaxed text-neutral-300">
              One solver-and-seal engine drives every surface. We state maturity per surface rather
              than blur them together.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                t: "Proof on agent actions",
                s: "the boundary an agent can't cross — the mainline engine",
                p: "built" as const,
              },
              {
                t: "Post-quantum seal",
                s: "SHA3-512 + Ed25519 + ML-DSA-65, hash-chained on every governed decision",
                p: "built" as const,
              },
              {
                t: "Proof on code",
                s: "real bugs, runnable PoC, sealed reproduction — a credibility wedge, not the headline",
                p: "built" as const,
              },
              {
                t: "Public offline verifier + canonical spec",
                s: "the “verify it yourself” endpoint — a sealed dossier checks byte-for-byte with no network and no Ironproof code",
                p: "built" as const,
              },
              {
                t: "Publicly anchored root of trust",
                s: "the signing root is published at two independent names you can look up yourself — substituting it means changing both",
                p: "built" as const,
              },
            ].map((m) => (
              <div
                key={m.t}
                className="card-premium fade-up flex items-center justify-between gap-6 p-6"
              >
                <div>
                  <div className="metal-text font-serif text-lg">{m.t}</div>
                  <div className="text-sm font-light text-neutral-400">{m.s}</div>
                </div>
                <Pill kind={m.p} />
              </div>
            ))}
          </div>
        </section>

        {/* 10 — closing phrase */}
        <section className="relative z-10 edge-t px-6 py-28 text-center md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-3xl">
            <Snum>10 — The phrase, one more time</Snum>
            <p className="metal-shine mx-auto max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              We prove what can be proven, seal it post-quantum, and anyone verifies it offline —
              without trusting us.
            </p>
            <p className="track-wide mt-8 text-xs text-seal">PROVABLE AI</p>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-32 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={96} height={128} title="IronProof monogram" />
              <ProofSeal size={128} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-3xl font-medium md:text-5xl">
              Prove your infrastructure.
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">
              Request access and turn policy into enforceable, independently verifiable guarantees.
            </p>
            <CtaForm />
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
          <span className="font-light">
            Automated formal verification for critical software and infrastructure.
          </span>
        </div>
      </footer>

      <FadeUpInit />
    </div>
  );
}
