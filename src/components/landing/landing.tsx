import { IronProofLogo } from "@/components/ironproof-logo";
import { FadeUpInit } from "./fade-up-init";
import { TestingDots, ProvingDots } from "./compare-dots";
import { RefundDemo } from "./refund-demo";
import { ProofExplorer } from "./proof-explorer";
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
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-14">
        <a href="#top" className="flex items-center gap-3">
          <IronProofLogo width={26} height={35} />
          <span className="track-logo metal-text text-sm font-medium">IRONPROOF</span>
        </a>
        <nav className="track-mid hidden items-center gap-5 text-xs text-neutral-500 md:flex">
          <a href="#platform" className="transition hover:text-neutral-200">PLATFORM</a>
          <a href="#speed" className="transition hover:text-neutral-200">SPEED</a>
          <a href="#compare" className="transition hover:text-neutral-200">VS TESTING</a>
          <a href="#try" className="transition hover:text-neutral-200">TRY IT</a>
          <a href="#verify" className="transition hover:text-neutral-200">VERIFY</a>
          <a
            href="#contact"
            className="chip-metal px-5 py-2.5 text-neutral-200 transition hover:text-white"
          >
            REQUEST ACCESS
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 flex min-h-[86vh] items-center px-6 md:px-14">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
            <div className="order-2 flex flex-col items-center md:order-1">
              <IronProofLogo width={210} height={280} className="drop-shadow-2xl" />
              <span className="track-logo metal-shine mt-6 text-lg font-medium md:text-xl">
                IRONPROOF
              </span>
            </div>
            <div className="fade-up order-1 md:order-2">
              <p className="track-wide mb-6 text-xs text-neutral-500 md:text-sm">IRONPROOF</p>
              <h1 className="metal-shine mb-6 font-serif text-5xl font-medium leading-[0.95] md:text-7xl">
                Prove what&apos;s allowed.
                <br />
                Block everything else.
              </h1>
              <p className="mb-6 max-w-xl text-lg font-light leading-snug text-neutral-300 md:text-xl">
                IronProof verifies every critical action{" "}
                <span className="metal-text">mathematically</span> — and blocks anything unproven
                before it ever runs.
              </p>
              <div className="hairline mb-6 h-px w-full max-w-md" />
              <p className="mb-10 max-w-lg text-base font-light text-neutral-500">
                Automated formal verification for critical software — starting where a wrong action
                moves money: AI agents issuing refunds, payments and disbursements in Canadian
                financial services.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#try"
                  className="track-mid bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  TRY A PROOF
                </a>
                <a
                  href="#platform"
                  className="chip-metal track-mid px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
                >
                  EXPLORE PLATFORM
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM */}
        <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
          <div className="fade-up mb-20 text-center">
            <p className="track-mid mb-4 text-xs text-neutral-600">THE PLATFORM</p>
            <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
              Mathematically Proven.
              <br />
              Not Merely Tested.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-premium fade-up p-10">
              <div className="metal-shine mb-4 font-serif text-4xl">01</div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Rules Into Math</h3>
              <p className="font-light leading-relaxed text-neutral-500">
                Turn critical policies, specifications and contracts into formal constraints — then
                prove whether the modeled system can violate them.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <div className="metal-shine mb-4 font-serif text-4xl">02</div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Exhaustive, Not Sampled</h3>
              <p className="font-light leading-relaxed text-neutral-500">
                Testing checks a handful of cases. IronProof reasons exhaustively over the formally
                defined state space.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <div className="metal-shine mb-4 font-serif text-4xl">03</div>
              <h3 className="metal-text mb-3 font-serif text-2xl">Infrastructure Grade</h3>
              <p className="mb-4 font-light leading-relaxed text-neutral-500">
                Built for critical systems where failure is not an option.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AEROSPACE", "FINANCE", "DEFENSE", "SMART CONTRACTS"].map((t) => (
                  <span key={t} className="chip-metal track-mid px-3 py-1 text-[10px] text-neutral-300">
                    {t}
                  </span>
                ))}
                <span className="chip-metal track-mid px-3 py-1 text-[10px] text-white">
                  HEALTHCARE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SPEED */}
        <section id="speed" className="relative z-10 border-y border-neutral-900 px-6 py-28 md:px-14">
          <div className="mx-auto max-w-6xl">
            <div className="fade-up mb-16 text-center">
              <p className="track-mid mb-4 text-xs text-neutral-600">AT MACHINE SPEED</p>
              <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
                Formal Proof Used to
                <br />
                Take Months. Not Anymore.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-500">
                Classic formal verification meant PhDs writing proofs by hand for months. IronProof
                runs the same rigor automatically — at machine speed, on every change.
              </p>
            </div>
            <div className="fade-up grid items-stretch gap-6 md:grid-cols-2">
              <div className="card-premium p-10">
                <p className="track-mid mb-6 text-[10px] text-neutral-600">
                  BEFORE — TRADITIONAL FORMAL VERIFICATION
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-xl text-neutral-600">✕</span>
                    <div>
                      <p className="text-neutral-300">Timeline</p>
                      <p className="font-serif text-3xl text-neutral-500">Weeks to months</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-neutral-600">✕</span>
                    <p className="font-light text-neutral-500">
                      Hand-written proofs by scarce specialists
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-neutral-600">✕</span>
                    <p className="font-light text-neutral-500">
                      Re-done manually every time the code changes
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-premium p-10" style={{ borderColor: "rgba(220,225,255,0.18)" }}>
                <p className="track-mid mb-6 text-[10px] text-neutral-500">
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
            <p className="fade-up mt-6 text-center text-xs text-neutral-600">
              Formal guarantees. Without the traditional proof cycle.
            </p>
          </div>
        </section>

        {/* TESTING VS PROVING */}
        <section id="compare" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
          <div className="mx-auto max-w-6xl">
            <div className="fade-up mb-16 text-center">
              <p className="track-mid mb-4 text-xs text-neutral-600">THE DIFFERENCE</p>
              <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
                Testing vs. Proving
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-500">
                Testing samples a few cases and hopes the rest hold. Proving reasons over every
                case — so nothing is left to chance.
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
                <p className="track-mid mb-4 text-[10px] text-neutral-600">SAMPLES A FEW CASES</p>
                <TestingDots />
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3 text-neutral-500">
                    <span className="mt-0.5 text-neutral-600">○</span> Checks the cases someone
                    thought of
                  </li>
                  <li className="flex gap-3 text-neutral-500">
                    <span className="mt-0.5 text-neutral-600">○</span> Edge cases slip through
                    unnoticed
                  </li>
                  <li className="flex gap-3 text-neutral-500">
                    <span className="mt-0.5 text-neutral-600">○</span> &quot;Passed&quot; means{" "}
                    <span className="italic">probably</span> fine
                  </li>
                  <li className="flex gap-3 text-neutral-500">
                    <span className="mt-0.5 text-neutral-600">○</span> Coverage stops where
                    imagination stops
                  </li>
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="track-mid text-xs text-neutral-600">CONFIDENCE</span>
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
                <p className="track-mid mb-4 text-[10px] text-neutral-500">REASONS OVER EVERY CASE</p>
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
                  <span className="track-mid text-xs text-neutral-500">CONFIDENCE</span>
                  <span className="metal-text text-right font-serif text-lg">
                    Mathematical guarantee within the model
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRY IT */}
        <RefundDemo />

        {/* HOW IT WORKS */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
          <div className="fade-up mb-16 text-center">
            <p className="track-mid mb-4 text-xs text-neutral-600">HOW IT WORKS</p>
            <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
              How IronProof Authorizes
              <br />
              an AI Action
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-500">
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
              <h3 className="metal-text mb-2 font-serif text-xl">Capture context</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-500">
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
              <h3 className="metal-text mb-2 font-serif text-xl">Prove the boundary</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-500">
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
              <h3 className="metal-text mb-2 font-serif text-xl">Allow or block</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-500">
                A single-use execution grant is issued only when the action is proven inside the
                boundary — anything unproven is blocked.
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
              <h3 className="metal-text mb-2 font-serif text-xl">Seal the evidence</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-500">
                Preserve the decision, justification and proof result in an independently verifiable
                artifact.
              </p>
            </div>
          </div>
        </section>

        {/* THE MODEL DOES NOT CONTROL AUTHORIZATION */}
        <section className="relative z-10 border-t border-neutral-900 px-6 py-24 md:px-14">
          <div className="fade-up mx-auto max-w-3xl text-center">
            <div className="chip-metal inline-flex items-center gap-3 px-7 py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="icon-metal">
                <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
                <path d="M9 12 l2 2 l4 -4" />
              </svg>
              <span className="track-mid metal-text text-xs">
                THE MODEL DOES NOT CONTROL AUTHORIZATION
              </span>
            </div>
            <p className="mx-auto mt-6 max-w-xl font-light leading-relaxed text-neutral-500">
              Prompts can influence what an agent requests. They cannot change what the agent is
              allowed to do.
            </p>
          </div>
        </section>

        {/* PROOF EXPLORER */}
        <ProofExplorer />

        {/* VERIFY */}
        <VerifyArtifact />

        {/* WHERE WE START */}
        <section id="start" className="relative z-10 mx-auto max-w-7xl border-t border-neutral-900 px-6 py-28 md:px-14">
          <div className="fade-up mb-16 text-center">
            <p className="track-mid mb-4 text-xs text-neutral-600">WHERE WE START</p>
            <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
              Money-moving workflows in
              <br />
              Canadian financial services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-500">
              We start with back-office AI agents that issue refunds, payments, disbursements or
              beneficiary changes under defined limits and approval rules.
            </p>
          </div>
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20 a6 6 0 0 1 12 0 M16 6 a3 3 0 0 1 0 5 M21 20 a5 5 0 0 0 -5 -5" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Primary buyers</h3>
              <p className="font-light leading-relaxed text-neutral-500">
                Technology risk, operational risk and compliance teams.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <path d="M4 4 h16 v6 H4 Z" />
                <path d="M4 14 h10 M4 18 h7" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Initial engagement</h3>
              <p className="font-light leading-relaxed text-neutral-500">
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

        {/* SOVEREIGNTY */}
        <section id="sovereignty" className="relative z-10 mx-auto max-w-7xl border-t border-neutral-900 px-6 py-28 md:px-14">
          <div className="fade-up mb-16 text-center">
            <p className="track-mid mb-4 text-xs text-neutral-600">SOVEREIGNTY</p>
            <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
              Built for environments that
              <br />
              cannot export data or trust
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-500">
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
              <h3 className="metal-text mb-3 font-serif text-2xl">Local deployment</h3>
              <p className="font-light leading-relaxed text-neutral-500">
                The proof core can operate without network access.
              </p>
            </div>
            <div className="card-premium fade-up p-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="icon-metal mb-5">
                <path d="M9 12 l2 2 l4 -4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <h3 className="metal-text mb-3 font-serif text-2xl">Independent verification</h3>
              <p className="font-light leading-relaxed text-neutral-500">
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
              <p className="font-light leading-relaxed text-neutral-500">
                Classical + post-quantum signature (Ed25519 + ML-DSA-65, FIPS 204), timestamp
                bounded from both sides — a seal cannot move backwards in time.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 border-t border-neutral-900 px-6 py-32 md:px-14">
          <div className="fade-up mx-auto max-w-3xl text-center">
            <IronProofLogo width={54} height={72} className="mx-auto mb-10" title="IronProof mark" />
            <h2 className="metal-shine mb-6 font-serif text-4xl font-medium md:text-6xl">
              Prove your infrastructure.
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">
              Request access to IronProof and turn policy into enforceable, independently verifiable
              guarantees.
            </p>
            <CtaForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-neutral-900 px-6 py-10 md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-neutral-600 md:flex-row">
          <span className="track-logo metal-text">IRONPROOF</span>
          <span className="font-light">
            Automated formal verification for critical software and infrastructure.
          </span>
        </div>
      </footer>

      <FadeUpInit />
    </div>
  );
}
