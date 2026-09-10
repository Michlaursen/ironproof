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
 * Everything named Z3, ML-DSA, air-gapped or post-quantum therefore lives
 * below the fold of the argument, not inside the pitch. Anchor ids are load
 * bearing: the header links #how, #initiators, #start and #verify, and the
 * research page links #limits.
 *
 * English copy inline for now; French / i18n to be reconnected with Miguel.
 */

const CRITICAL_ACTIONS = [
  {
    kind: "PAYMENT",
    ask: "Refund $640 to a payee already on file",
    v: "ALLOW",
    why: "Under the $1,000 daily cap. Two approvers on record.",
  },
  {
    kind: "CUMULATIVE LIMIT",
    ask: "Refund $600 to a payee already refunded $600 today",
    v: "BLOCK",
    why: "Each refund is under the $1,000 cap. Together they are not — and the limit is written per day.",
  },
  {
    kind: "PRIVILEGE ESCALATION",
    ask: "Grant an admin role to a service account",
    v: "BLOCK",
    why: "Privileged grants require an open change ticket and two approvers. Neither is present.",
  },
  {
    kind: "DELETION",
    ask: "Delete 40,000 customer records flagged inactive",
    v: "BLOCK",
    why: "Bulk deletion above 1,000 rows requires a retention-hold check. None recorded.",
  },
  {
    kind: "DEPLOYMENT",
    ask: "Push a configuration change to the payment rail",
    v: "BLOCK",
    why: "The change window is closed and the rollback plan is unsigned.",
  },
  {
    kind: "IRREVERSIBLE",
    ask: "Wire $250,000 to a beneficiary added last month",
    v: "ALLOW",
    why: "Past the cooling-off period, dual authorization on record. A wire cannot be recalled — which is exactly why it is decided before it is sent.",
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
                THE DETERMINISTIC AUTHORIZATION LAYER FOR CRITICAL ACTIONS
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

        {/* TRY IT */}
        <RefundDemo />

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
          </div>
        </section>

        {/* ── from here down: the mechanism, then the evidence ── */}

        {/* PROVE -> ENFORCE -> SEAL -> VERIFY */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">HOW IT WORKS</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              Prove. Enforce. Seal. Verify.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              Your written policy is compiled into mathematics by a deterministic compiler &mdash;
              the same one the runtime uses.
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

        {/* WHAT IS PROVEN AND WHAT IS NOT */}
        <section id="limits" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">THE MODEL, NAMED</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              What is proven &mdash;
              <br />
              and what is not.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              A certificate that does not name its own boundary is a decoration.
            </p>
          </div>
          {/* One panel with a line down the middle — the section naming its own
              boundary, drawn as a boundary. */}
          <div className="card-premium fade-up relative grid gap-10 p-8 sm:p-12 md:grid-cols-2 md:gap-14">
            <span
              aria-hidden="true"
              className="absolute left-8 right-8 top-1/2 hidden h-px md:left-1/2 md:right-auto md:top-12 md:bottom-12 md:h-auto md:w-px md:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(228,233,255,0.28), transparent)",
              }}
            />
            <div>
              <p className="track-mid mb-5 text-xs text-neutral-300">INSIDE THE MODEL</p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3 text-neutral-300">
                  <span className="icon-metal mt-0.5">&#10003;</span> The defined property cannot be
                  violated anywhere in the modeled action space &mdash; for a sequence of any length,
                  not for a sample of cases.
                </li>
                <li className="flex gap-3 text-neutral-300">
                  <span className="icon-metal mt-0.5">&#10003;</span> The policy the prover reads and
                  the policy the runtime enforces come from one compiler; a differential check fails
                  the build if they diverge.
                </li>
                <li className="flex gap-3 text-neutral-300">
                  <span className="icon-metal mt-0.5">&#10003;</span> Each certificate states how many
                  clauses were encoded, and names the ones that were not.
                </li>
              </ul>
            </div>
            <div>
              <p className="track-mid mb-5 text-xs text-neutral-500">OUTSIDE THE MODEL</p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3 text-neutral-400">
                  <span className="mt-0.5 text-neutral-500">&#9675;</span> Clauses that require human
                  judgment are not encoded, and the certificate says so rather than counting them as
                  covered.
                </li>
                <li className="flex gap-3 text-neutral-400">
                  <span className="mt-0.5 text-neutral-500">&#9675;</span> The thresholds are your
                  institution&apos;s chosen numbers. We prove the configuration stays inside them, not
                  that they are the right numbers.
                </li>
                <li className="flex gap-3 text-neutral-400">
                  <span className="mt-0.5 text-neutral-500">&#9675;</span> The cryptographic base is
                  NIST standards &mdash; SHA3-512, Ed25519, ML-DSA-65 (FIPS 204) &mdash; not
                  cryptography of our own.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* VERIFY */}
        <VerifyArtifact />

        {/* SOVEREIGNTY */}
        <section id="sovereignty" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">SOVEREIGNTY</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              Built for environments that
              <br />
              cannot export data or trust
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              Ironproof can run locally or air-gapped, so policies, system context and decision
              evidence remain under the institution&apos;s control.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-seal mb-5">
                <rect x="3" y="4" width="18" height="12" rx="1" />
                <path d="M8 20 h8 M12 16 v4" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Local &amp; air-gapped</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                The proof core can operate fully air-gapped — no network access required.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-seal mb-5">
                <path d="M9 12 l2 2 l4 -4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Independent verification</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Your auditor re-checks the artifact with a second, independently written verifier —
                offline, no Ironproof dashboard.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-seal mb-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7 v5 l3 3" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Durable evidence</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Classical + post-quantum signature (Ed25519 + ML-DSA-65, FIPS 204), timestamp
                bounded from both sides — a seal cannot move backwards in time.
              </p>
            </div>
          </div>
        </section>

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

        {/* WHO IT IS FOR, AND HOW IT STARTS */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20 a6 6 0 0 1 12 0 M16 6 a3 3 0 0 1 0 5 M21 20 a5 5 0 0 0 -5 -5" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Who owns the policy</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Risk, security and compliance teams in regulated environments &mdash; the people who
                already have the rules on paper and no way to prove they hold at execution.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <path d="M4 4 h16 v6 H4 Z" />
                <path d="M4 14 h10 M4 18 h7" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Initial engagement</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Select one critical action, define its authorization boundary and produce an
                independently verifiable proof artifact.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-40 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={111} height={148} title="Ironproof monogram" />
              <ProofSeal size={148} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-4xl font-medium md:text-6xl">
              Before it executes, know it&apos;s authorized.
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">
              Choose one critical action &mdash; a payment, an access grant, a deletion, a
              deployment. Ironproof will formalize its authorization boundary and show exactly what
              can &mdash; and cannot &mdash; execute.
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
