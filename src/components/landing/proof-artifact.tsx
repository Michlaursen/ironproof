import { ProofSeal } from "./proof-seal";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money } from "./i18n";

/*
 * A sealed proof-artifact card for the hero — ALLOWED (green) or BLOCKED (red).
 * The BLOCKED detail is a real counterexample under the same example policy as
 * the TRY IT demo (max refund $1,000).
 */

const ALLOWED = 640;
const REFUSED = 1300;
const MAX_REFUND = 1000;

const T: L<{
  label: string;
  allowed: string;
  blocked: string;
  allowedWhy: (amount: string) => string;
  blockedWhy: (amount: string, max: string) => string;
  sealed: string;
}> = {
  en: {
    label: "PROOF ARTIFACT",
    allowed: "ALLOWED",
    blocked: "BLOCKED",
    allowedWhy: (a) => `${a} refund — no reachable policy violation`,
    blockedWhy: (a, m) => `${a} refund — exceeds the ${m} limit`,
    sealed: "SEALED",
  },
  fr: {
    label: "ARTEFACT DE PREUVE",
    allowed: "AUTORISÉ",
    blocked: "BLOQUÉ",
    allowedWhy: (a) => `Remboursement de ${a} — aucune violation de politique atteignable`,
    blockedWhy: (a, m) => `Remboursement de ${a} — dépasse la limite de ${m}`,
    sealed: "SCELLÉ",
  },
};

const OkIcon = (
  <svg
    width="48"
    height="48"
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
    width="48"
    height="48"
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

export function ProofArtifact({
  kind,
  locale = defaultLocale,
}: {
  kind: "allowed" | "blocked";
  locale?: Locale;
}) {
  const allowed = kind === "allowed";
  const t = pick(T, locale);
  return (
    <div
      // Iron contour on both, whatever the verdict: these two sit side by side at
      // the top of the page, and a green frame against a red one reads as a
      // status widget. The answer is already carried inside — the icon and the
      // word — so the frame goes back to saying "this is an artifact".
      className="proof-scan card-premium card-iron relative w-full max-w-sm px-8 py-7"
    >
      <div className="relative flex items-center justify-between">
        <span className="track-mid text-xs text-neutral-400">{t.label}</span>
        <span className="font-mono text-xs text-neutral-400">finance/refund@v3</span>
      </div>

      <div className="relative mt-6 flex flex-col items-center text-center">
        {allowed ? OkIcon : NoIcon}
        <h3
          className={`mt-3 font-serif text-3xl ${
            allowed ? "word-allow" : "word-block"
          }`}
        >
          {allowed ? t.allowed : t.blocked}
        </h3>
        <p className="mt-2 text-sm text-neutral-300">
          {allowed
            ? t.allowedWhy(money(ALLOWED, locale))
            : t.blockedWhy(money(REFUSED, locale), money(MAX_REFUND, locale))}
        </p>
      </div>

      <div className="seal-rule relative my-5 h-px w-full" />

      <div className="relative flex items-center gap-3">
        <ProofSeal size={42} locale={locale} />
        <div className="text-left">
          <p className="seal-label track-mid text-xs">{t.sealed}</p>
          <p className="font-mono text-xs text-neutral-300">Ed25519 + ML-DSA-65 · FIPS 204</p>
        </div>
      </div>
    </div>
  );
}
