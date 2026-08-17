import { ProofSeal } from "./proof-seal";

/*
 * A sealed proof-artifact card for the hero — ALLOWED (green) or BLOCKED (red).
 * The BLOCKED detail is a real counterexample under the same example policy as
 * the TRY IT demo (max refund $1,000).
 */

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

export function ProofArtifact({ kind }: { kind: "allowed" | "blocked" }) {
  const allowed = kind === "allowed";
  return (
    <div className="proof-scan card-premium relative w-full max-w-sm px-8 py-7">
      <div className="relative flex items-center justify-between">
        <span className="track-mid text-xs text-neutral-400">PROOF ARTIFACT</span>
        <span className="font-mono text-xs text-neutral-400">finance/refund@v3</span>
      </div>

      <div className="relative mt-6 flex flex-col items-center text-center">
        {allowed ? OkIcon : NoIcon}
        <h3
          className={
            allowed
              ? "metal-text mt-3 font-serif text-3xl"
              : "mt-3 font-serif text-3xl text-neutral-100"
          }
        >
          {allowed ? "ALLOWED" : "BLOCKED"}
        </h3>
        <p className="mt-2 text-sm text-neutral-300">
          {allowed
            ? "$640 refund — no reachable policy violation"
            : "$1,300 refund — exceeds the $1,000 limit"}
        </p>
      </div>

      <div className="hairline relative my-5 h-px w-full" />

      <div className="relative flex items-center gap-3">
        <ProofSeal size={42} />
        <div className="text-left">
          <p className="track-mid text-xs text-neutral-400">SEALED</p>
          <p className="font-mono text-xs text-neutral-300">Ed25519 + ML-DSA-65 · FIPS 204</p>
        </div>
      </div>
    </div>
  );
}
