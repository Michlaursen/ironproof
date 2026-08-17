"use client";

import { useState, type ReactNode } from "react";

/*
 * VERIFY A PROOF — paste an artifact, IronProof re-checks its structure in the
 * browser. Ported from the reference landing: structural validation only; the
 * full Ed25519 + ML-DSA-65 check runs offline against the published wire format.
 */

const SAMPLE = `{
  "policy": "finance/refund@v3",
  "verdict": "allowed",
  "timestamp": "2025-05-14T09:31:00Z",
  "ed25519": "3f9a1c7d4e2b8a55c0d1e6f7a9b3c2d4c71d",
  "mldsa": "8e2b40af1c3d5e7f9a0b2c4d6e8f0a1b40af"
}`;

type Artifact = {
  policy?: unknown;
  verdict?: unknown;
  ed25519?: unknown;
  mldsa?: unknown;
};

function Row({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <span>
        {good ? (
          <span className="icon-metal">✓</span>
        ) : (
          <span style={{ color: "#ffb4b4" }}>✕</span>
        )}
      </span>
      <span className="text-neutral-300">{label}</span>
      <span className="ml-auto break-all text-neutral-300">{value}</span>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="chip-metal space-y-3 p-5">{children}</div>;
}

export function VerifyArtifact() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReactNode>(null);

  function verify(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setResult(
        <Shell>
          <p className="text-sm text-neutral-400">
            Paste an artifact or click <span className="metal-text">Load sample</span> to try it.
          </p>
        </Shell>,
      );
      return;
    }

    let data: Artifact;
    try {
      data = JSON.parse(trimmed) as Artifact;
    } catch {
      setResult(
        <div className="chip-metal p-5" style={{ borderColor: "rgba(255,150,150,0.3)" }}>
          <p className="mb-1 font-serif text-lg text-neutral-200">✕ INVALID ARTIFACT</p>
          <p className="text-sm text-neutral-300">
            Not valid JSON — could not parse the artifact structure.
          </p>
        </div>,
      );
      return;
    }

    const hasPolicy = typeof data.policy === "string" && data.policy.length > 0;
    const hasVerdict = data.verdict === "allowed" || data.verdict === "blocked";
    const hasEd = typeof data.ed25519 === "string" && data.ed25519.length >= 8;
    const hasMl = typeof data.mldsa === "string" && data.mldsa.length >= 8;
    const allGood = hasPolicy && hasVerdict && hasEd && hasMl;

    setResult(
      <Shell>
        <p className={`mb-2 font-serif text-2xl ${allGood ? "metal-text" : "text-neutral-200"}`}>
          {allGood ? "✓ STRUCTURE VALID" : "⚠ INCOMPLETE ARTIFACT"}
        </p>
        <Row label="policy" value={hasPolicy ? String(data.policy) : "missing"} good={hasPolicy} />
        <Row
          label="verdict"
          value={hasVerdict ? String(data.verdict) : "missing/invalid"}
          good={hasVerdict}
        />
        <Row
          label="ed25519"
          value={hasEd ? String(data.ed25519).slice(0, 10) + "…" : "missing"}
          good={hasEd}
        />
        <Row
          label="ml-dsa-65"
          value={hasMl ? String(data.mldsa).slice(0, 10) + "…" : "missing"}
          good={hasMl}
        />
        <p className="border-t border-white/5 pt-2 text-xs text-neutral-400">
          {allGood
            ? "Structure matches the published wire format. Run the offline verifier to confirm signatures cryptographically."
            : "Some required fields are missing — this artifact would be rejected."}
        </p>
      </Shell>,
    );
  }

  return (
    <section id="verify" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
      <div className="mx-auto max-w-4xl">
        <div className="fade-up mb-12 text-center">
          <p className="track-mid mb-4 text-xs text-neutral-400">VERIFY A PROOF</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
            Check an Artifact Yourself
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            Paste a proof artifact — IronProof re-checks its structure and signatures. No dashboard,
            no trust required.
          </p>
        </div>

        <div className="fade-up card-premium relative overflow-hidden p-8">
          <label htmlFor="artifactInput" className="track-mid mb-3 block text-xs text-neutral-300">
            PROOF ARTIFACT
          </label>
          <textarea
            id="artifactInput"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              'paste artifact JSON, e.g. {"policy":"finance/refund","verdict":"allowed","ed25519":"3f9a…c71d","mldsa":"8e2b…40af"}'
            }
            className="w-full resize-none rounded-sm border border-white/10 bg-black/50 px-4 py-3 font-mono text-xs text-neutral-200 placeholder-neutral-600 transition focus:border-white/30 focus:outline-none"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => verify(input)}
              className="track-mid bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-7 py-3 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
            >
              VERIFY ARTIFACT
            </button>
            <button
              type="button"
              onClick={() => {
                setInput(SAMPLE);
                verify(SAMPLE);
              }}
              className="chip-metal track-mid px-7 py-3 text-xs text-neutral-200 transition hover:text-white"
            >
              LOAD SAMPLE
            </button>
          </div>
          {result ? <div className="seal-pop mt-6">{result}</div> : null}
          <p className="mt-5 text-xs text-neutral-400">
            This demo checks artifact structure in your browser. Full cryptographic verification
            (Ed25519 + ML-DSA-65) runs offline against the published wire format — no IronProof code
            required.
          </p>
        </div>
      </div>
    </section>
  );
}
