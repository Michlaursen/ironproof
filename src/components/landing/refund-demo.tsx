"use client";

import { useMemo, useState } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money, NBSP } from "./i18n";

/*
 * TRY IT — "Prove a Refund Decision". A tiny example policy evaluated live.
 * Same three rules as the reference landing; the verdict is derived purely
 * from the inputs, so identical inputs always yield the identical result.
 */

const MAX_REFUND = 1000;
const MONTHLY_LIMIT = 2500;
const APPROVAL_ABOVE = 1000;

const T: L<{
  eyebrow: string;
  title: string;
  lead: string;
  presetSafe: string;
  presetBlocked: string;
  policyLabel: string;
  maxRefund: string;
  monthlyLimit: string;
  approvalAbove: string;
  refundRequested: string;
  monthlyTotal: string;
  approvalObtained: string;
  resultLabel: string;
  allowed: string;
  blocked: string;
  allowedWhy: string;
  blockedWhy: string;
  deterministic: string;
  /** The three ways this policy can be broken, written out for a reader. */
  overMax: (refund: string, max: string) => string;
  overMonthly: (total: string, limit: string) => string;
  needsApproval: (above: string) => string;
}> = {
  en: {
    eyebrow: "TRY IT",
    title: "Prove a Refund Decision",
    lead: "A tiny example policy. Try a preset — or move the sliders — and Ironproof proves whether the action is inside the rules, or shows the exact rule it breaks.",
    presetSafe: "✓ SAFE CASE",
    presetBlocked: "✕ BLOCKED CASE",
    policyLabel: "EXAMPLE POLICY",
    maxRefund: "Maximum refund",
    monthlyLimit: "Monthly customer limit",
    approvalAbove: "Human approval above",
    refundRequested: "Refund requested",
    monthlyTotal: "Current monthly total",
    approvalObtained: "Human approval obtained",
    resultLabel: "PROOF RESULT",
    allowed: "REFUND ALLOWED",
    blocked: "REFUND BLOCKED",
    allowedWhy: "No reachable policy violation.",
    blockedWhy: "Not allowed — a policy rule is violated. Here is the counterexample:",
    deterministic: "Deterministic verdict — same inputs always yield the same result.",
    overMax: (r, m) => `refund ${r} > max ${m}`,
    overMonthly: (t, l) => `monthly total ${t} > limit ${l}`,
    needsApproval: (a) => `amount > ${a} requires human approval`,
  },
  fr: {
    eyebrow: "ESSAYEZ",
    title: "Prouvez une décision de remboursement",
    lead: "Une petite politique d’exemple. Choisissez un préréglage — ou déplacez les curseurs — et Ironproof prouve que l’action respecte les règles, ou affiche la règle exacte qu’elle enfreint.",
    presetSafe: "✓ CAS AUTORISÉ",
    presetBlocked: "✕ CAS BLOQUÉ",
    policyLabel: "POLITIQUE D’EXEMPLE",
    maxRefund: "Remboursement maximum",
    monthlyLimit: "Limite mensuelle par client",
    approvalAbove: "Approbation humaine au-delà de",
    refundRequested: "Remboursement demandé",
    monthlyTotal: "Cumul mensuel actuel",
    approvalObtained: "Approbation humaine obtenue",
    resultLabel: "RÉSULTAT DE LA PREUVE",
    allowed: "REMBOURSEMENT AUTORISÉ",
    blocked: "REMBOURSEMENT BLOQUÉ",
    allowedWhy: "Aucune violation de politique atteignable.",
    blockedWhy: `Refusé — une règle de la politique est enfreinte. Voici le contre-exemple${NBSP}:`,
    deterministic: "Verdict déterministe — les mêmes entrées donnent toujours le même résultat.",
    overMax: (r, m) => `remboursement ${r} > maximum ${m}`,
    overMonthly: (t, l) => `cumul mensuel ${t} > limite ${l}`,
    needsApproval: (a) => `montant > ${a} exige une approbation humaine`,
  },
};

/**
 * The single rule evaluator, shared by both languages.
 *
 * The ORDER of the three tests is the policy, not the wording — so it lives
 * here once and each locale only supplies how to say the result. Writing the
 * evaluator twice, once per language, is how the French and the English
 * verdict drift apart on a Tuesday.
 */
function violation(
  refund: number,
  monthly: number,
  approved: boolean,
  locale: Locale,
): string | null {
  const t = pick(T, locale);
  const m = (n: number) => money(n, locale);
  if (refund > MAX_REFUND) return t.overMax(m(refund), m(MAX_REFUND));
  if (monthly + refund > MONTHLY_LIMIT)
    return t.overMonthly(m(monthly + refund), m(MONTHLY_LIMIT));
  if (refund > APPROVAL_ABOVE && !approved) return t.needsApproval(m(APPROVAL_ABOVE));
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

export function RefundDemo({ locale = defaultLocale }: { locale?: Locale }) {
  const [refund, setRefund] = useState(640);
  const [monthly, setMonthly] = useState(1820);
  const [approved, setApproved] = useState(false);
  const [tick, setTick] = useState(0);
  const t = pick(T, locale);

  const violated = useMemo(
    () => violation(refund, monthly, approved, locale),
    [refund, monthly, approved, locale],
  );

  // Generic named V, not T: the copy dictionary above is already called T.
  function bump<V>(setter: (v: V) => void) {
    return (v: V) => {
      setter(v);
      setTick((n) => n + 1);
    };
  }

  const setSafe = () => {
    setRefund(640);
    setMonthly(1820);
    setApproved(false);
    setTick((n) => n + 1);
  };
  const setBlocked = () => {
    setRefund(1300);
    setMonthly(1820);
    setApproved(false);
    setTick((n) => n + 1);
  };

  return (
    <section id="try" className="relative z-10 edge-gold px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-10 text-center">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
        </div>

        <div className="fade-up mb-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={setSafe}
            className={`preset-btn chip-metal px-6 py-3 text-xs track-mid text-neutral-200 transition hover:text-white${violated ? "" : " active"}`}
          >
            {t.presetSafe}
          </button>
          <button
            type="button"
            onClick={setBlocked}
            className={`preset-btn chip-metal px-6 py-3 text-xs track-mid text-neutral-200 transition hover:text-white${violated ? " active" : ""}`}
          >
            {t.presetBlocked}
          </button>
        </div>

        <div className="fade-up grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="card-premium space-y-7 p-8">
            <div>
              <p className="track-mid mb-4 text-xs text-neutral-300">{t.policyLabel}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="icon-metal">◆</span>
                  <span className="text-neutral-400">{t.maxRefund}</span>
                  <span className="metal-text ml-auto font-mono">{money(MAX_REFUND, locale)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-metal">◆</span>
                  <span className="text-neutral-400">{t.monthlyLimit}</span>
                  <span className="metal-text ml-auto font-mono">
                    {money(MONTHLY_LIMIT, locale)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-metal">◆</span>
                  <span className="text-neutral-400">{t.approvalAbove}</span>
                  <span className="metal-text ml-auto font-mono">
                    {money(APPROVAL_ABOVE, locale)}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <label htmlFor="refund" className="text-neutral-400">
                    {t.refundRequested}
                  </label>
                  <span className="metal-text font-mono">{money(refund, locale)}</span>
                </div>
                <input
                  id="refund"
                  type="range"
                  min={0}
                  max={1500}
                  value={refund}
                  step={10}
                  aria-label={t.refundRequested}
                  onChange={(e) => bump(setRefund)(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <label htmlFor="monthly" className="text-neutral-400">
                    {t.monthlyTotal}
                  </label>
                  <span className="metal-text font-mono">{money(monthly, locale)}</span>
                </div>
                <input
                  id="monthly"
                  type="range"
                  min={0}
                  max={2500}
                  value={monthly}
                  step={10}
                  aria-label={t.monthlyTotal}
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
                {t.approvalObtained}
              </label>
            </div>
          </div>

          {/* Verdict */}
          <div
            className={`card-premium flex flex-col p-8 ${
              violated ? "card-block" : "card-allow"
            }`}
          >
            <p className="track-mid mb-4 text-xs text-neutral-300">{t.resultLabel}</p>
            <div
              key={tick}
              className="verdict-pop flex flex-1 flex-col items-center justify-center py-8 text-center"
            >
              <div className="mb-5">{violated ? NoIcon : OkIcon}</div>
              <h3
                className={`mb-3 font-serif text-3xl md:text-4xl ${
                  violated ? "word-block" : "word-allow"
                }`}
              >
                {violated ? t.blocked : t.allowed}
              </h3>
              <p className="max-w-xs font-light text-neutral-300">
                {violated ? t.blockedWhy : t.allowedWhy}
              </p>
              {violated ? (
                <div className="chip-metal mt-5 max-w-full break-words px-4 py-3 font-mono text-xs text-neutral-300">
                  ✕ {violated}
                </div>
              ) : null}
            </div>
            <p className="mt-2 text-center text-xs text-neutral-400">{t.deterministic}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
