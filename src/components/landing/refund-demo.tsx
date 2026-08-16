"use client";

import { useMemo, useState } from "react";

/*
 * TRY IT — "Prove a Refund Decision". A tiny example policy evaluated live.
 * Same three rules as the reference landing; the verdict is derived purely
 * from the inputs, so identical inputs always yield the identical result.
 */

const MAX_REFUND = 1000;
const MONTHLY_LIMIT = 2500;
const APPROVAL_ABOVE = 1000;

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function violation(refund: number, monthly: number, approved: boolean): string | null {
  if (refund > MAX_REFUND) return "refund " + fmt(refund) + " > max " + fmt(MAX_REFUND);
  if (monthly + refund > MONTHLY_LIMIT)
    return "monthly total " + fmt(monthly + refund) + " > limit " + fmt(MONTHLY_LIMIT);
  if (refund > APPROVAL_ABOVE && !approved)
    return "amount > " + fmt(APPROVAL_ABOVE) + " requires human approval";
  return null;
}

const OkIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c8ffd8"
    strokeWidth="1.4"
    style={{ filter: "drop-shadow(0 0 8px rgba(150,255,180,0.35))" }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12 l3 3 l5 -6" />
  </svg>
);

const NoIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffb4b4"
    strokeWidth="1.4"
    style={{ filter: "drop-shadow(0 0 8px rgba(255,150,150,0.4))" }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9 l6 6 M15 9 l-6 6" />
  </svg>
);

export function RefundDemo() {
  const [refund, setRefund] = useState(640);
  const [monthly, setMonthly] = useState(1820);
  const [approved, setApproved] = useState(false);
  const [tick, setTick] = useState(0);

  const violated = useMemo(
    () => violation(refund, monthly, approved),
    [refund, monthly, approved],
  );

  function bump<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setTick((t) => t + 1);
    };
  }

  const setSafe = () => {
    setRefund(640);
    setMonthly(1820);
    setApproved(false);
    setTick((t) => t + 1);
  };
  const setBlocked = () => {
    setRefund(1300);
    setMonthly(1820);
    setApproved(false);
    setTick((t) => t + 1);
  };

  return (
    <section id="try" className="relative z-10 border-y border-neutral-900 px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-10 text-center">
          <p className="track-mid mb-4 text-xs text-neutral-400">TRY IT</p>
          <h2 className="metal-shine font-serif text-4xl font-medium md:text-6xl">
            Prove a Refund Decision
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            A tiny example policy. Try a preset — or move the sliders — and IronProof proves
            whether the action is inside the rules, or shows the exact rule it breaks.
          </p>
        </div>

        <div className="fade-up mb-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={setSafe}
            className={`preset-btn chip-metal px-6 py-3 text-xs track-mid text-neutral-200 transition hover:text-white${violated ? "" : " active"}`}
          >
            ✓ SAFE CASE
          </button>
          <button
            type="button"
            onClick={setBlocked}
            className={`preset-btn chip-metal px-6 py-3 text-xs track-mid text-neutral-200 transition hover:text-white${violated ? " active" : ""}`}
          >
            ✕ BLOCKED CASE
          </button>
        </div>

        <div className="fade-up grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="card-premium space-y-7 p-8">
            <div>
              <p className="track-mid mb-4 text-xs text-neutral-300">EXAMPLE POLICY</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="icon-metal">◆</span>
                  <span className="text-neutral-400">Maximum refund</span>
                  <span className="metal-text ml-auto font-mono">$1,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-metal">◆</span>
                  <span className="text-neutral-400">Monthly customer limit</span>
                  <span className="metal-text ml-auto font-mono">$2,500</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-metal">◆</span>
                  <span className="text-neutral-400">Human approval above</span>
                  <span className="metal-text ml-auto font-mono">$1,000</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <label htmlFor="refund" className="text-neutral-400">
                    Refund requested
                  </label>
                  <span className="metal-text font-mono">{fmt(refund)}</span>
                </div>
                <input
                  id="refund"
                  type="range"
                  min={0}
                  max={1500}
                  value={refund}
                  step={10}
                  aria-label="Refund requested"
                  onChange={(e) => bump(setRefund)(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <label htmlFor="monthly" className="text-neutral-400">
                    Current monthly total
                  </label>
                  <span className="metal-text font-mono">{fmt(monthly)}</span>
                </div>
                <input
                  id="monthly"
                  type="range"
                  min={0}
                  max={2500}
                  value={monthly}
                  step={10}
                  aria-label="Monthly total"
                  onChange={(e) => bump(setMonthly)(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400">
                <input
                  id="approved"
                  type="checkbox"
                  checked={approved}
                  onChange={(e) => bump(setApproved)(e.target.checked)}
                  className="h-4 w-4 accent-white"
                />{" "}
                Human approval obtained
              </label>
            </div>
          </div>

          {/* Verdict */}
          <div className="card-premium flex flex-col p-8">
            <p className="track-mid mb-4 text-xs text-neutral-300">PROOF RESULT</p>
            <div
              key={tick}
              className="verdict-pop flex flex-1 flex-col items-center justify-center py-8 text-center"
            >
              <div className="mb-5">{violated ? NoIcon : OkIcon}</div>
              <h3
                className={
                  violated
                    ? "mb-3 font-serif text-3xl text-neutral-100 md:text-4xl"
                    : "metal-text mb-3 font-serif text-3xl md:text-4xl"
                }
              >
                {violated ? "REFUND BLOCKED" : "REFUND ALLOWED"}
              </h3>
              <p className="max-w-xs font-light text-neutral-300">
                {violated
                  ? "Not allowed — a policy rule is violated. Here is the counterexample:"
                  : "No reachable policy violation."}
              </p>
              {violated ? (
                <div className="chip-metal mt-5 max-w-full break-words px-4 py-3 font-mono text-xs text-neutral-300">
                  ✕ {violated}
                </div>
              ) : null}
            </div>
            <p className="mt-2 text-center text-xs text-neutral-400">
              Deterministic verdict — same inputs always yield the same result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
