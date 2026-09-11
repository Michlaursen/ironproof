import { IronProofLogo } from "@/components/ironproof-logo";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { ProofArtifact } from "./proof-artifact";
import { FadeUpInit } from "./fade-up-init";
import { RefundDemo } from "./refund-demo";
import { Counterexample } from "./counterexample";
import { VerifyArtifact } from "./verify-artifact";
import { GateDiagram } from "./gate-diagram";
import { ProofPipeline } from "./proof-pipeline";
import { SequenceProof } from "./sequence-proof";
import { DeployGate } from "./deploy-gate";
import { CtaForm } from "./cta-form";
import { defaultLocale, type Locale } from "@/content";

/*
 * The Ironproof landing.
 *
 * Ordered so the visitor meets the product before the mechanism:
 *   authorization  = the product      (what is bought)
 *   formal methods = the mechanism    (how the boundary is established)
 *   cryptography   = the evidence     (what is kept, and re-checked)
 *
 * Everything named Z3, ML-DSA or post-quantum therefore lives below the fold
 * of the argument, not inside the pitch. Anchor ids are load
 * bearing: the header links #how, #initiators, #start and #verify, and the
 * research page links #counterexample.
 *
 * English copy inline for now; French / i18n to be reconnected with Miguel.
 */

const CRITICAL_ACTIONS = [
  {
    kind: "PAYMENT",
    ask: "Refund $640 to a payee already on file",
    v: "ALLOW",
    why: "Below the $1,000 daily cap. Two authorized approvers are on record.",
  },
  {
    kind: "CUMULATIVE LIMIT",
    ask: "Refund $600 to a payee who already received $600 today",
    v: "BLOCK",
    why: "The refund is individually within the limit. The combined total would reach $1,200 — so the second refund never executes.",
  },
  {
    kind: "PRIVILEGE ESCALATION",
    ask: "Grant admin access to a service account",
    v: "BLOCK",
    why: "Privileged access requires an open change ticket and two authorized approvers. Neither is present.",
  },
  {
    kind: "DELETION",
    ask: "Delete 40,000 inactive customer records",
    v: "BLOCK",
    why: "Bulk deletion above 1,000 records requires a verified retention-hold check. None is recorded.",
  },
  {
    kind: "DEPLOYMENT",
    ask: "Push a configuration change to the payment rail",
    v: "BLOCK",
    why: "The approved change window is closed, and the rollback plan is unsigned.",
  },
  {
    kind: "IRREVERSIBLE ACTION",
    ask: "Wire $250,000 to a beneficiary added last month",
    v: "ALLOW",
    why: "The cooling-off period has elapsed and dual authorization is on record. Because the wire cannot be recalled, authorization is decided before it is sent.",
  },
] as const;

const LAYERS = [
  {
    tag: "THE PRODUCT",
    title: "Authorization",
    body: "A boundary a critical action cannot cross. That is what you deploy, and what the policy owner signs off on.",
  },
  {
    tag: "THE MECHANISM",
    title: "Formal verification",
    body: "How the boundary is established rather than hoped for: the property is checked across the modeled action space, for a sequence of any length — not for a sample of cases.",
  },
  {
    tag: "THE EVIDENCE",
    title: "Cryptographic proof",
    body: "What outlives the decision. Every allow and every block leaves a sealed artifact your auditor re-checks on their own machine.",
  },
] as const;

export function Landing({ locale = defaultLocale }: { locale?: Locale }) {
  const r = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <div className="flex flex-1 flex-col">
      {/* NAV */}
      <LandingHeader locale={locale} />

      <main className="flex-1">
        {/* HERO — the product, in one sentence, before any mechanism */}
        <section id="top" className="relative z-10 flex min-h-[86vh] items-center px-6 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <IronProofLogo
                width={210}
                height={280}
                className="h-[200px] w-[150px] drop-shadow-2xl md:h-[280px] md:w-[210px]"
                title="Ironproof monogram"
              />
              <span className="track-logo iron-text mt-4 text-2xl font-semibold md:mt-6 md:text-4xl">
                IRONPROOF
              </span>
            </div>
            <div className="fade-up">
              <p className="track-wide mb-6 text-xs text-neutral-400 md:text-sm">
                THE AUTHORIZATION LAYER FOR CRITICAL ACTIONS
              </p>
              <h1 className="mb-6 font-serif font-medium leading-[0.98] sm:leading-[0.95]">
                <span className="metal-shine block text-4xl sm:text-5xl md:text-7xl">
                  If it isn&apos;t authorized, it never executes.
                </span>
              </h1>
              <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-neutral-400 sm:text-lg sm:leading-snug sm:text-neutral-300 md:text-xl">
                Ironproof checks every critical action before it executes. If it&apos;s authorized,
                it runs. If it isn&apos;t, Ironproof{" "}
                <span className="metal-text">blocks it</span>{" "}&mdash; and creates evidence
                anyone can verify.
              </p>
              <div className="mb-6 max-w-xl">
                <p className="text-base font-medium text-neutral-200 md:text-lg">
                  One boundary. Any initiator.
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-neutral-400">
                  AI agent. API. Script. Person.
                </p>
                <p className="track-mid mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-300 sm:text-sm">
                  <span className="whitespace-nowrap">AUTHORIZED &rarr; EXECUTES</span>
                  <span className="whitespace-nowrap">
                    UNAUTHORIZED &rarr; <span className="metal-text">BLOCKED</span>
                  </span>
                </p>
              </div>
              <div className="hairline mb-10 h-px w-full max-w-md" />
              <div className="flex flex-wrap gap-4">
                {/* Both used to land on more prose — a section title is not a
                  * reward for a click. These two go to the only places on the
                  * page where the reader DOES something: move a limit and watch
                  * the verdict flip, then check a real seal in their own tab. */}
                <a
                  href="#try"
                  className="track-mid bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  BLOCK ONE YOURSELF
                </a>
                <a
                  href="#verify"
                  className="chip-metal track-mid px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
                >
                  CHECK A REAL SEAL
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* THE TEN-SECOND TAKEAWAY — then the two artifacts that prove the sentence */}
        <section id="evidence" className="relative z-10 edge-t px-6 py-16 md:px-14 md:py-20">
          <p className="fade-up mx-auto max-w-4xl text-center font-serif text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl md:text-4xl">
            Ironproof stops unauthorized critical actions from executing
            <span className="text-neutral-500"> &mdash; </span>
            <span className="metal-text">and cryptographically seals every decision,</span>{" "}
            allow or block.
          </p>
          <div className="fade-up mx-auto mt-12 grid max-w-3xl justify-items-center gap-6 sm:grid-cols-2">
            <ProofArtifact kind="allowed" />
            <ProofArtifact kind="blocked" />
          </div>
          <p className="fade-up mx-auto mt-10 max-w-2xl text-center text-sm font-light leading-relaxed text-neutral-400 md:text-base">
            A block is not a silence. It is an artifact stating what was requested, which policy was
            in force, and why the action did not run.
          </p>
        </section>

        {/* TRY IT — the reader blocks one themselves, right after seeing the two
            sealed artifacts the sentence above promises. Kept high on the page:
            the strongest demonstration should not wait behind the argument. */}
        <RefundDemo />

        {/* CREDITED-BY STRIP */}
        <section className="relative z-10 edge-t px-6 py-8 md:px-14">
          <div className="fade-up mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="track-mid text-xs text-neutral-500">
              SECURITY RESEARCH BY IRONPROOF &mdash; CREDITED BY
            </span>
            {["IBM", "GnuPG", "Mozilla", "Red Hat", "wolfSSL", "VideoLAN", "DCMTK"].map((o) => (
              <span key={o} className="metal-text text-sm font-medium">
                {o}
              </span>
            ))}
          </div>
        </section>

        {/* WHICH ACTIONS — the concrete problem, before any mechanism */}
        <section id="start" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">WHICH ACTIONS</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              Move money. Grant access.
              <br />
              Delete records. Ship a change.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              The actions that cannot be taken back once they run. For those, authorization stops
              being a setting and becomes infrastructure.
            </p>
          </div>

          <p className="track-mid fade-up mb-6 text-xs text-neutral-400">
            WHAT WAS REQUESTED &mdash; AND WHAT HAPPENED
          </p>
          <div className="fade-up grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {CRITICAL_ACTIONS.map((c) => (
              <div
                key={c.ask}
                className={`card-premium flex flex-col p-6 ${
                  c.v === "ALLOW" ? "card-allow" : "card-block"
                }`}
              >
                <p className="track-mid mb-3 text-[10px] text-neutral-500">{c.kind}</p>
                <p className="mb-5 font-serif text-xl leading-snug text-neutral-100">{c.ask}</p>
                <div className="mt-auto border-t border-white/5 pt-4">
                  <span
                    className={`verdict-tag ${
                      c.v === "ALLOW" ? "verdict-allow" : "verdict-block"
                    }`}
                  >
                    {c.v}
                  </span>
                  <p className="mt-3 text-sm font-light leading-relaxed text-neutral-400">{c.why}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fade-up mt-6 text-xs text-neutral-500">
            Illustrative decisions under a sample policy.
          </p>

          <div className="card-premium card-iron fade-up mt-12 p-10 md:p-12">
            <p className="track-mid mb-6 text-xs text-neutral-400">
              WHERE THE POLICY ALREADY EXISTS ON PAPER
            </p>
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { where: "Financial services", rules: "OSFI E-23 · SOX · AML programs" },
                { where: "Healthcare", rules: "HIPAA · PHIPA · device software" },
                { where: "Government", rules: "Directive on Automated Decision-Making" },
                { where: "Critical infrastructure", rules: "IEC 62443 · change control" },
                { where: "Software delivery", rules: "SOC 2 change management · release gates" },
                { where: "Data platforms", rules: "Retention holds · privacy law (Law 25, PIPEDA)" },
              ].map((i) => (
                <div key={i.where}>
                  <p className="metal-text font-serif text-xl">{i.where}</p>
                  <p className="mt-1 text-sm font-light text-neutral-400">{i.rules}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BREATH — the frameworks exist; this is what Ironproof does with them */}
        <section className="relative z-10 px-6 py-32 md:px-14 md:py-40">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="breath-mark" aria-hidden="true" />
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-400 sm:text-3xl md:text-4xl">
              These frameworks already say what must never happen. Ironproof turns that sentence
              into{" "}
              <span className="metal-text">a boundary the system cannot cross</span>, and into
              evidence the regulator can re-check.
            </p>
          </div>
        </section>

        {/* THE SEQUENCE — the centre of the argument */}
        <SequenceProof />

        {/* ONE GATE, ANY INITIATOR */}
        <section id="initiators" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">ONE GATE, ANY INITIATOR</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              The gate does not ask who is asking.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              It asks whether the action is inside the policy in force. The same check applies to
              every path that can reach a critical system &mdash; which is why this is not an
              AI problem with an AI answer.
            </p>
          </div>
          <GateDiagram />
          <p className="fade-up mt-10 max-w-2xl text-sm font-light text-neutral-400">
            Every authorization records the requesting actor, the policy version and the action.
            Nothing executes without spending a single-use grant bound to that exact decision.
          </p>
        </section>

        {/* PRODUCT / MECHANISM / EVIDENCE */}
        <section id="layers" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">HOW THE PIECES SIT</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              You buy authorization.
              <br />
              The rest is how it holds.
            </h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {LAYERS.map((l, i) => (
              <li key={l.title} className="card-premium fade-up p-8 md:p-10">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="num-badge font-serif text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="track-mid text-[10px] text-neutral-500">{l.tag}</p>
                </div>
                <h3 className="metal-text mb-3 font-serif text-2xl">{l.title}</h3>
                <p className="text-sm font-light leading-relaxed text-neutral-300">{l.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WHAT A COUNTEREXAMPLE LOOKS LIKE */}
        <Counterexample />

        {/* BREATH — what the counterexample was for */}
        <section className="relative z-10 px-6 py-32 md:px-14 md:py-40">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="breath-mark" aria-hidden="true" />
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-400 sm:text-3xl md:text-4xl">
              Take the clause out and the proof collapses. That is what makes the certificate
              load-bearing rather than decorative:{" "}
              <span className="metal-text">a green that can never turn red is worth nothing</span>.
            </p>
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl md:text-4xl">
              Ironproof does not claim coverage it has not modeled.{" "}
              <span className="metal-text">
                Every certificate states what was proven &mdash; and what was not.
              </span>
            </p>
          </div>
        </section>

        {/* ── from here down: the mechanism, then the evidence ── */}

        {/* WHY THIS IS DIFFERENT — the commercial form of "testing vs proving".
          * The full two-column comparison moved to /proof on 2026-09-10 because
          * it stalled the page between "why is this different" and "prove it";
          * nothing replaced it here. This is the replacement: same idea, two
          * sentences, zero solver vocabulary. The reader who wants the mechanism
          * gets it in the very next section. Scope is deliberately stated once,
          * at the end, rather than hedged into every sentence — diluting the
          * caveat everywhere is the mirror error of overclaiming. */}
        <section id="why" className="relative z-10 px-6 py-32 md:px-14 md:py-40">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="track-mid mb-8 text-xs text-neutral-400">WHY THIS IS DIFFERENT</p>
            <h2 className="font-serif text-3xl font-medium leading-snug text-neutral-100 sm:text-4xl md:text-5xl">
              We don&apos;t test your system{" "}
              <span className="text-neutral-500">&mdash;</span>{" "}
              <span className="metal-shine">we prove it</span>.
            </h2>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
              You walk away with one of two things: the exact case that breaks it, or the proof
              that no such case exists. Either way, you re-run that proof yourself &mdash; in your
              own tools, without trusting us.
            </p>
            <div className="hairline my-10 h-px w-full max-w-md" />
            <p className="font-serif text-xl font-medium leading-snug text-neutral-400 sm:text-2xl md:text-3xl">
              A test tells you what it tried.{" "}
              <span className="metal-text">A proof tells you what&apos;s impossible.</span>
            </p>
            <p className="mt-10 max-w-xl text-sm font-light leading-relaxed text-neutral-400">
              Proven within the boundary you define. The certificate states that boundary.
            </p>
          </div>
        </section>


        {/* PROVE -> ENFORCE -> SEAL -> VERIFY */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">HOW IT WORKS</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              Prove. Enforce. Seal. Verify.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              Ironproof mathematically checks that no reachable sequence of actions can cross
              the defined authorization boundary.
            </p>
            <p className="mt-4 max-w-2xl text-lg font-light text-neutral-400">
              Your written policy is compiled into mathematics by a deterministic compiler &mdash;
              the same one the runtime uses. A differential check fails the build if the two
              ever diverge.
            </p>
          </div>
          <div className="fade-up">
            <ProofPipeline />
          </div>
          <p className="fade-up mt-8 text-sm font-light text-neutral-400">
            The theorem that ties the runtime fast path to the full formal model, and the
            equivalence checks behind it, are in the{" "}
            <a
              href={`${r}/proof`}
              className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition hover:text-white"
            >
              technical record
            </a>
            .
          </p>
        </section>

        {/* VERIFY */}
        <VerifyArtifact />

        {/* PUBLIC TECHNICAL RECORD */}
        <section className="relative z-10 edge-t px-6 py-20 md:px-14">
          <div className="fade-up mx-auto max-w-4xl text-center">
            <p className="track-mid mb-4 text-xs text-neutral-400">THE SAME ENGINE</p>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              Same proof engine. Proven on real vulnerabilities.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
              Findings by <span className="metal-text">Dominik Blain</span>{" "}
              and Cobalt, credited
              on the projects&apos; own repositories &mdash; published research, assigned CVEs and
              public upstream acknowledgements.
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
              VIEW TECHNICAL RECORD
            </a>
          </div>
        </section>

        {/* DEPLOY IT — where it sits in the stack */}
        <DeployGate />

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-40 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={111} height={148} title="Ironproof monogram" />
              <ProofSeal size={148} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-4xl font-medium md:text-6xl">
              Put one critical action behind the boundary.
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">
              Choose a payment, access grant, deletion, or deployment. Ironproof will define the
              authorization boundary, prove it, enforce it at runtime, and produce an
              independently verifiable record.
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
            Deterministic authorization. Independently verifiable proof.
          </span>
        </div>
      </footer>

      <FadeUpInit />
    </div>
  );
}
