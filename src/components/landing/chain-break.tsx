"use client";

import { useEffect, useRef } from "react";
import lab from "@/data/agent-refunds-lab.json";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money } from "./i18n";

/*
 * EVERY LINK HOLDS. THE CHAIN STILL BREAKS. (Dom, 2026-10-18: "go")
 *
 * The counterexample above, told as a chain. Each link is one step of the
 * sequence Z3 found against the policy with the cumulative clause removed
 * (`lab.bmc.steps`): a BMC trace is, by construction, a path of allowed
 * actions, so every link is a step the per-action gate lets through. The break
 * is the running total crossing the authority, read off the same trace.
 * Nothing here is typed by hand: if the engine's answer changes, the chain
 * changes with it.
 *
 * Motion: the links light one after another when the chain scrolls into view,
 * then the last gap opens. Reduced motion, or no IntersectionObserver: the end
 * state is shown at once, never a hidden chain.
 */

type Step = { n: number; action: string; params: Record<string, unknown>; state_after: Record<string, unknown> };
const steps = (lab.bmc as { steps: Step[] }).steps;
const AUTHORITY = (lab.gates_correct as { refund_authority: number }).refund_authority;
const total = (s: Step) => Number(s.state_after.refunded_total);
const finalTotal = steps.length ? total(steps[steps.length - 1]) : 0;
if (steps.length === 0 || !(finalTotal > AUTHORITY)) {
  // The panel only makes sense if the trace really crosses the authority.
  throw new Error("chain-break: the captured trace does not cross refund_authority");
}

const T: L<{
  eyebrow: string;
  action: (a: string, p: Record<string, unknown>, m: (n: number) => string) => string;
  allowed: string;
  runningTotal: (t: string) => string;
  broken: (t: string, a: string) => string;
  caption: string;
}> = {
  en: {
    eyebrow: "THE SAME TRACE, AS A CHAIN",
    action: (a, p, m) =>
      a === "refund" ? `refund ${m(Number(p.amount))}` : a === "open_ticket" ? "open ticket" : a === "verify_customer" ? "verify customer" : a,
    allowed: "allowed",
    runningTotal: (t) => `total ${t}`,
    broken: (t, a) => `total ${t} > authority ${a}`,
    caption: "Every link holds. The chain still breaks.",
  },
  fr: {
    eyebrow: "LA MÊME TRACE, EN CHAÎNE",
    action: (a, p, m) =>
      a === "refund"
        ? `remboursement ${m(Number(p.amount))}`
        : a === "open_ticket"
          ? "ouvrir le billet"
          : a === "verify_customer"
            ? "vérifier le client"
            : a,
    allowed: "autorisé",
    runningTotal: (t) => `total ${t}`,
    broken: (t, a) => `total ${t} > plafond ${a}`,
    caption: "Chaque maillon tient. La chaîne casse quand même.",
  },
};

export function ChainBreak({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  const m = (n: number) => money(n, locale);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The class is set on the element itself (no React state): it only
    // starts CSS transitions, nothing else on the panel depends on it.
    const start = () => el.classList.add("is-running");
    if (still || typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-4 md:px-14">
      <p className="seal-label track-mid mb-8 text-center text-xs">{t.eyebrow}</p>
      <div ref={ref} className="chain-break" style={{ ["--n" as string]: steps.length }}>
        <ol className="chain-links">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s.n} className={`chain-link${last ? " chain-link-last" : ""}`} style={{ ["--i" as string]: i }}>
                <span className="chain-ring" aria-hidden="true" />
                <span className="chain-act">{t.action(s.action, s.params, m)}</span>
                <span className="chain-ok">✓ {t.allowed}</span>
                <span className="chain-total">{t.runningTotal(m(total(s)))}</span>
              </li>
            );
          })}
        </ol>
        <p className="chain-verdict">
          <span aria-hidden="true">✕</span> {t.broken(m(finalTotal), m(AUTHORITY))}
        </p>
      </div>
      <p className="mt-8 text-center font-serif text-2xl font-medium text-neutral-100 md:text-3xl">{t.caption}</p>
    </section>
  );
}
