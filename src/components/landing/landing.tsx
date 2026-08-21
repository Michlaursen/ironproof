import { IronProofLogo } from "@/components/ironproof-logo";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { ProofArtifact } from "./proof-artifact";
import { FadeUpInit } from "./fade-up-init";
import { TestingDots, ProvingDots } from "./compare-dots";
import { RefundDemo } from "./refund-demo";
import { VerifyArtifact } from "./verify-artifact";
import { CtaForm } from "./cta-form";

/*
 * The IronProof landing — ported from the reference page (ironproof-landing-local).
 * English copy inline for now; French / i18n to be reconnected with Miguel.
 */

export function Landing() {
  return (
    <div className="flex flex-1 flex-col">
      {/* NAV */}
      <LandingHeader />

      <main className="flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 flex min-h-[86vh] items-center px-6 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
            <div className="order-2 flex flex-col items-center md:order-1">
              <IronProofLogo
                width={210}
                height={280}
                className="drop-shadow-2xl"
                title="IronProof monogram"
              />
              <span className="track-logo iron-text mt-6 text-2xl font-semibold md:text-4xl">
                IRONPROOF
              </span>
            </div>
            <div className="fade-up order-1 md:order-2">
              <p className="track-wide mb-6 text-xs text-neutral-400 md:text-sm">
                PROVABLE AUTHORIZATION FOR AI AGENTS
              </p>
              <h1 className="mb-6 font-serif font-medium leading-[0.98] sm:leading-[0.95]">
                <span className="metal-shine block text-4xl sm:text-5xl md:text-7xl">
                  If it isn&apos;t authorized, it never executes.
                </span>
                <span className="mt-6 block text-xl font-light text-neutral-300 sm:text-2xl md:text-3xl">
                  Deterministic authorization. Independently verifiable proof.
                </span>
              </h1>
              <p className="mb-6 max-w-xl text-lg font-light leading-snug text-neutral-300 md:text-xl">
                IronProof verifies high-impact agent actions against{" "}
                <span className="metal-text">formally defined policy</span> before execution — and
                produces independently verifiable evidence of every decision.
              </p>
              <div className="hairline mb-6 h-px w-full max-w-md" />
              <p className="mb-10 max-w-lg text-base font-light text-neutral-300">
                We start where a wrong action moves money: refunds, payments, disbursements
                and beneficiary changes in financial services.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#try"
                  className="track-mid bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  SEE A LIVE DECISION
                </a>
                <a
                  href="#how"
                  className="chip-metal track-mid px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
                >
                  HOW IT WORKS
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
                <span className="track-mid">INDEPENDENTLY VERIFIABLE</span>
                <span className="text-neutral-700">·</span>
                <span className="track-mid">POST-QUANTUM SEALED</span>
                <span className="text-neutral-700">·</span>
                <span className="track-mid">RUNS AIR-GAPPED</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF ARTIFACTS — allowed + blocked, side by side, just above the credited-by strip */}
        <section className="relative z-10 px-6 pb-12 pt-2 md:px-14">
          <div className="fade-up mx-auto grid max-w-3xl justify-items-center gap-6 sm:grid-cols-2">
            <ProofArtifact kind="allowed" />
            <ProofArtifact kind="blocked" />
          </div>
        </section>

        {/* CREDITED-BY STRIP */}
        <section className="relative z-10 edge-t px-6 py-8 md:px-14">
          <div className="fade-up mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="track-mid text-xs text-neutral-500">SECURITY RESEARCH PUBLICLY CREDITED BY</span>
            {["IBM", "GnuPG", "Mozilla", "Red Hat", "wolfSSL", "VideoLAN", "DCMTK"].map((o) => (
              <span key={o} className="metal-text text-sm font-medium">
                {o}
              </span>
            ))}
          </div>
        </section>

        {/* PLATFORM */}
        <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">THE PLATFORM</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              Turn policy into an enforceable
              <br />
              authorization boundary.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-premium fade-up p-10">
              <div className="metal-text mb-4 font-serif text-4xl">01</div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Policy Into Mathematics</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Your written authorization policy is compiled into mathematics by a deterministic
                compiler — the same one the runtime uses.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <div className="metal-text mb-4 font-serif text-4xl">02</div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Prove the Boundary</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                The solver reasons exhaustively over the modeled state space — not a sample of it —
                and exhibits a counterexample when the boundary can be crossed.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <div className="metal-text mb-4 font-serif text-4xl">03</div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Enforce Before Execution</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                An execution grant is issued only when the requested action satisfies the authorized
                boundary. Nothing executes without spending it.
              </p>
            </div>
          </div>
        </section>

        {/* WHERE WE START */}
        <section id="start" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 text-center">
            <p className="track-mid mb-4 text-xs text-neutral-400">WHERE WE START</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              When the agent can move money,
              <br />
              authorization becomes infrastructure.
            </h2>
            <p className="track-mid mx-auto mt-6 text-xs text-neutral-400">
              WHAT THE AGENT ASKED FOR &mdash; AND WHAT HAPPENED
            </p>
            <div className="fade-up mx-auto mt-8 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
              {[
                {
                  ask: "Refund $640 to a payee already on file",
                  v: "ALLOW",
                  why: "Under the $1,000 daily cap. Two approvers on record.",
                },
                {
                  ask: "Pay $12,000 to a payee added four hours ago",
                  v: "BLOCK",
                  why: "That payee is not in the authorized set.",
                },
                {
                  ask: "Change the beneficiary on a live account",
                  v: "BLOCK",
                  why: "Policy requires two approvers. One signed.",
                },
              ].map((r) => (
                <div key={r.ask} className="card-premium flex flex-col p-6">
                  <p className="track-mid mb-3 text-[10px] text-neutral-500">THE AGENT ASKS</p>
                  <p className="mb-5 font-serif text-xl leading-snug text-neutral-100">{r.ask}</p>
                  <div className="mt-auto border-t border-white/5 pt-4">
                    <span
                      className={
                        r.v === "ALLOW"
                          ? "track-mid rounded-[4px] border border-emerald-400/30 px-2.5 py-1 text-[10px] text-emerald-300"
                          : "track-mid rounded-[4px] border border-red-400/30 px-2.5 py-1 text-[10px] text-red-300"
                      }
                    >
                      {r.v}
                    </span>
                    <p className="mt-3 text-sm font-light leading-relaxed text-neutral-400">
                      {r.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 text-xs text-neutral-500">
              Illustrative decisions under a sample policy.
            </p>
          </div>
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20 a6 6 0 0 1 12 0 M16 6 a3 3 0 0 1 0 5 M21 20 a5 5 0 0 0 -5 -5" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Primary buyers</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Technology risk, operational risk and compliance teams.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <path d="M4 4 h16 v6 H4 Z" />
                <path d="M4 14 h10 M4 18 h7" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Initial engagement</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Select one workflow, define the transaction boundary and produce an independently
                verifiable proof artifact.
              </p>
            </div>
          </div>
          <div className="card-premium fade-up relative overflow-hidden p-10 md:p-14">
            <span className="metal-text absolute left-6 top-2 select-none font-serif text-8xl opacity-20">
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="font-serif text-2xl italic leading-snug text-neutral-200 md:text-3xl">
                They do not use it to replace human judgment or to fully automate critical decisions
                given the significant financial, legal and reputational consequences.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="hairline h-px w-10" />
                <a
                  href="https://www.bankofcanada.ca/publications/financial-system-survey/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="track-mid inline-flex items-center gap-2 text-xs text-neutral-400 transition hover:text-white"
                >
                  BANK OF CANADA — FINANCIAL SYSTEM SURVEY, MAY 2026
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M7 17 L17 7 M9 7 h8 v8" />
                  </svg>
                </a>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* SPEED */}
        <section id="speed" className="relative z-10 edge-t px-6 py-28 md:px-14">
          <div className="mx-auto max-w-6xl">
            <div className="fade-up mb-16 text-center">
              <p className="track-mid mb-4 text-xs text-neutral-400">AT MACHINE SPEED</p>
              <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
                Formal verification in the
                <br />
                software delivery loop.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
                IronProof automates proof obligations and re-verification so formally defined
                properties can be checked continuously as systems change.
              </p>
            </div>
            <div className="fade-up grid items-stretch gap-6 md:grid-cols-2">
              <div className="card-premium p-10">
                <p className="track-mid mb-6 text-xs text-neutral-400">
                  BEFORE — TRADITIONAL FORMAL VERIFICATION
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-xl text-neutral-400">✕</span>
                    <div>
                      <p className="text-neutral-300">Timeline</p>
                      <p className="font-serif text-3xl text-neutral-300">Weeks to months</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-neutral-400">✕</span>
                    <p className="font-light text-neutral-300">
                      Hand-written proofs by scarce specialists
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-neutral-400">✕</span>
                    <p className="font-light text-neutral-300">
                      Re-done manually every time the code changes
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-premium p-10" style={{ borderColor: "rgba(220,225,255,0.18)" }}>
                <p className="track-mid mb-6 text-xs text-neutral-300">
                  WITH IRONPROOF — AUTOMATED
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="icon-metal text-xl">✓</span>
                    <div>
                      <p className="text-neutral-200">Timeline</p>
                      <p className="metal-text font-serif text-3xl">Machine speed</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-start gap-4">
                    <span className="icon-metal mt-0.5">✓</span>
                    <p className="font-light text-neutral-300">Proofs generated automatically</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="icon-metal mt-0.5">✓</span>
                    <p className="font-light text-neutral-300">
                      Re-proven on every commit, continuously
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="icon-metal mt-0.5">✓</span>
                    <p className="font-light text-neutral-300">
                      Available to any team building critical systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="fade-up mt-6 text-center text-xs text-neutral-400">
              Formal guarantees. Without the traditional proof cycle.
            </p>
          </div>
        </section>

        {/* TESTING VS PROVING */}
        <section id="compare" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
          <div className="mx-auto max-w-6xl">
            <div className="fade-up mb-16 text-center">
              <p className="track-mid mb-4 text-xs text-neutral-400">THE DIFFERENCE</p>
              <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
                Testing vs. Proving
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
                Testing and formal verification answer different questions.
              </p>
            </div>
            <div className="fade-up grid gap-6 md:grid-cols-2">
              <div className="card-premium relative p-10">
                <div className="mb-6 flex items-center gap-3">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8a8a90" strokeWidth="1.4" aria-hidden="true">
                    <path d="M9 3 v6 l-5 9 a2 2 0 0 0 2 3 h12 a2 2 0 0 0 2 -3 l-5 -9 V3" />
                    <path d="M8 3 h8" />
                  </svg>
                  <h3 className="font-serif text-3xl text-neutral-400">Testing</h3>
                </div>
                <p className="track-mid mb-3 text-xs text-neutral-400">TESTING ASKS</p>
                <p className="mb-4 font-light leading-snug text-neutral-300">
                  Did the system behave correctly on the executions we tested?
                </p>
                <TestingDots />
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3 text-neutral-300">
                    <span className="mt-0.5 text-neutral-400">○</span> Checks the cases someone
                    thought of
                  </li>
                  <li className="flex gap-3 text-neutral-300">
                    <span className="mt-0.5 text-neutral-400">○</span> &quot;Passed&quot; means{" "}
                    <span className="italic">probably</span> fine
                  </li>
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="track-mid text-xs text-neutral-400">CONFIDENCE</span>
                  <span className="font-serif text-2xl text-neutral-400">Partial</span>
                </div>
              </div>
              <div className="card-premium relative p-10" style={{ borderColor: "rgba(220,225,255,0.18)" }}>
                <div className="mb-6 flex items-center gap-3">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal" aria-hidden="true">
                    <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
                    <path d="M9 12 l2 2 l4 -4" />
                  </svg>
                  <h3 className="metal-text font-serif text-3xl">Proving</h3>
                </div>
                <p className="track-mid mb-3 text-xs text-neutral-300">PROVING ASKS</p>
                <p className="mb-4 font-light leading-snug text-neutral-200">
                  Can the defined property be violated anywhere in the modeled state space?
                </p>
                <ProvingDots />
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3 text-neutral-300">
                    <span className="icon-metal mt-0.5">✓</span> Reasons exhaustively over the
                    formally defined state space
                  </li>
                  <li className="flex gap-3 text-neutral-300">
                    <span className="icon-metal mt-0.5">✓</span> If the formal model admits a
                    violation, IronProof produces a counterexample
                  </li>
                  <li className="flex gap-3 text-neutral-300">
                    <span className="icon-metal mt-0.5">✓</span> &quot;Proven&quot; means{" "}
                    <span className="metal-text">mathematically</span> fine
                  </li>
                  <li className="flex gap-3 text-neutral-300">
                    <span className="icon-metal mt-0.5">✓</span> Exhaustive within the proven model
                    and property
                  </li>
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="track-mid text-xs text-neutral-300">CONFIDENCE</span>
                  <span className="metal-text text-right font-serif text-lg">
                    Mathematical guarantee within the model
                  </span>
                </div>
              </div>
            </div>
            <p className="fade-up mx-auto mt-10 max-w-2xl text-center text-lg font-light text-neutral-300">
              IronProof doesn&apos;t replace testing. It answers the question testing cannot
              exhaustively answer.
            </p>
          </div>
        </section>

        {/* TRY IT */}
        <RefundDemo />

        {/* HOW IT WORKS */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="track-mid mb-4 text-xs text-neutral-400">HOW IT WORKS</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              How IronProof Authorizes
              <br />
              an AI Action
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
              Your written policy is compiled into mathematics — by the same deterministic compiler
              the runtime uses. The proof runs against that model, not a checklist.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="num-badge font-serif text-3xl">01</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal ml-auto">
                  <path d="M4 6 h16 M4 12 h10 M4 18 h7" />
                </svg>
              </div>
              <h3 className="metal-text mb-2 font-serif text-xl">Define</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">
                Record the policy version, agent authority, transaction state and requested action.
              </p>
            </div>
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="num-badge font-serif text-3xl">02</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal ml-auto">
                  <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
                  <path d="M9 12 l2 2 l4 -4" />
                </svg>
              </div>
              <h3 className="metal-text mb-2 font-serif text-xl">Prove</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">
                The policy is certified across its entire action space beforehand — so the runtime
                verdict is instant and deterministic, with no solver in the path. A machine-checked
                theorem proves this fast path decides exactly like the full formal model — for every
                policy and action covered by the formal semantics.
              </p>
            </div>
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="num-badge font-serif text-3xl">03</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal ml-auto">
                  <rect x="5" y="11" width="14" height="9" rx="1" />
                  <path d="M8 11 V8 a4 4 0 0 1 8 0 v3" />
                </svg>
              </div>
              <h3 className="metal-text mb-2 font-serif text-xl">Enforce</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">
                An execution grant is issued only when the requested action satisfies the
                authorized boundary. It is single-use and bound to that exact decision.
              </p>
            </div>
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="num-badge font-serif text-3xl">04</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal ml-auto">
                  <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
                  <path d="M12 8 v4 M12 15 h.01" />
                </svg>
              </div>
              <h3 className="metal-text mb-2 font-serif text-xl">Preserve Evidence</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">
                Preserve the decision, justification and proof result in an independently verifiable
                artifact.
              </p>
            </div>
          </div>
        </section>

        {/* THE AGENT DOES NOT CONTROL AUTHORIZATION */}
        <section className="relative z-10 edge-t px-6 py-32 md:px-14">
          <div className="fade-up mx-auto max-w-3xl text-center">
            <div className="chip-metal inline-flex items-center gap-3 px-7 py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="icon-metal">
                <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
                <path d="M9 12 l2 2 l4 -4" />
              </svg>
              <span className="track-mid metal-text text-xs">
                THE AGENT DOES NOT CONTROL AUTHORIZATION
              </span>
            </div>
            <p className="mx-auto mt-6 max-w-xl font-light leading-relaxed text-neutral-300">
              Prompts can influence what an agent requests. They cannot change what the agent is
              allowed to do.
            </p>
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
              IronProof can run locally or air-gapped, so policies, system context and decision
              evidence remain under the institution&apos;s control.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <rect x="3" y="4" width="18" height="12" rx="1" />
                <path d="M8 20 h8 M12 16 v4" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Local &amp; air-gapped</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                The proof core can operate fully air-gapped — no network access required.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <path d="M9 12 l2 2 l4 -4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Independent verification</h3>
              <p className="font-light leading-relaxed text-neutral-300">
                Your auditor re-checks the artifact with a second, independently written verifier —
                offline, no IronProof dashboard.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
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
              Published research &middot; Assigned CVEs &middot; Public upstream acknowledgements
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
              {["IBM", "GnuPG", "Mozilla", "Red Hat", "wolfSSL", "VideoLAN", "DCMTK"].map((o) => (
                <span key={o} className="chip-metal track-mid px-3 py-1 text-xs text-neutral-300">
                  {o}
                </span>
              ))}
            </div>
            <a
              href="/proof"
              className="chip-metal track-mid mt-10 inline-block px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
            >
              VIEW TECHNICAL RECORD
            </a>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-40 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={111} height={148} title="IronProof monogram" />
              <ProofSeal size={148} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-4xl font-medium md:text-6xl">
              Before your agent acts, know it&apos;s authorized.
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">
              Choose one money-moving workflow. IronProof will formalize its authorization
              boundary and show exactly what can — and cannot — execute.
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
