"use client";

import { useState } from "react";

/*
 * VERIFY A PROOF — the REAL thing. Paste (or load) a sealed Sceal dossier and
 * it is verified entirely in your browser: Ed25519 + ML-DSA-65 (FIPS 204)
 * signatures and the SHA3-512 chain, in pure JavaScript, no server, no IronProof
 * code. The verifier is vendored verbatim from ironproof/sceal/verifier-web
 * (src/lib/sceal). Demo dossiers (real, plus deliberately tampered) live in
 * /public/sceal so anyone can watch a forgery get rejected.
 */

type VerifyResult = {
  status: "VERIFIED" | "FAILED" | "CANNOT_VERIFY";
  failures: string[];
  reason?: string;
  nEntries?: number;
  nAnchors?: number;
  toolchain?: { liboqs?: string; liboqsPython?: string; canonicalForm?: string } | null;
};

const DEMOS = {
  verified: "/sceal/demo-verified.json",
  tampered: "/sceal/demo-tampered-content.json",
} as const;

export function VerifyArtifact() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [busy, setBusy] = useState(false);

  async function load(which: keyof typeof DEMOS) {
    try {
      const res = await fetch(DEMOS[which]);
      const text = await res.text();
      setInput(text);
      setResult(null);
    } catch {
      setResult({ status: "CANNOT_VERIFY", reason: "could not load the demo dossier", failures: [] });
    }
  }

  async function verify() {
    if (busy) return;
    setBusy(true);
    setResult(null);
    try {
      const mod = (await import("@/lib/sceal/canon.js")) as {
        report: (text: string) => VerifyResult;
      };
      // let the "verifying" state paint before the CPU-bound ML-DSA check
      await new Promise((r) => setTimeout(r, 30));
      setResult(mod.report(input));
    } catch {
      setResult({ status: "CANNOT_VERIFY", reason: "the verifier failed to run", failures: [] });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="verify" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
      <div className="mx-auto max-w-4xl">
        <div className="fade-up mb-12 text-center">
          <p className="track-mid mb-4 text-xs text-neutral-400">VERIFY A PROOF</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
            Check a Real Proof Yourself
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            Load a real sealed dossier and verify it right here — Ed25519 + ML-DSA-65 signatures and
            the SHA3-512 chain, entirely in your browser. Then load a tampered one and watch it get
            rejected. No dashboard, no server, no trust required.
          </p>
        </div>

        <div className="fade-up card-premium relative overflow-hidden p-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="artifactInput" className="track-mid text-xs text-neutral-400">
              SEALED DOSSIER
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => load("verified")}
                className="chip-metal track-mid px-4 py-2 text-xs text-neutral-200 transition hover:text-white"
              >
                LOAD A REAL PROOF
              </button>
              <button
                type="button"
                onClick={() => load("tampered")}
                className="chip-metal track-mid px-4 py-2 text-xs text-neutral-200 transition hover:text-white"
              >
                LOAD A TAMPERED ONE
              </button>
            </div>
          </div>

          <textarea
            id="artifactInput"
            rows={6}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (result) setResult(null);
            }}
            placeholder="paste a sealed Sceal dossier (JSON) — or use the buttons above"
            className="w-full resize-none rounded-[5px] border border-white/10 bg-black/50 px-4 py-3 font-mono text-xs text-neutral-200 placeholder-neutral-600 transition focus:border-white/30 focus:outline-none"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={verify}
              disabled={busy || input.trim().length === 0}
              className="track-mid rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-7 py-3 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "VERIFYING…" : "VERIFY IN YOUR BROWSER"}
            </button>
          </div>

          {result ? (
            <div className="seal-pop mt-6">
              {result.status === "VERIFIED" ? (
                <div className="chip-metal p-5">
                  <p className="metal-text mb-2 font-serif text-2xl">✓ VERIFIED</p>
                  <p className="text-sm font-light text-neutral-300">
                    Both signatures check out — <span className="text-neutral-200">Ed25519</span> and{" "}
                    <span className="text-neutral-200">ML-DSA-65</span> (dual: both must pass) — over
                    a SHA3-512 chain of {result.nEntries ?? 0} sealed entries. Nothing was altered.
                  </p>
                  {result.toolchain?.liboqs ? (
                    <p className="mt-2 font-mono text-xs text-neutral-500">
                      sealed by liboqs {result.toolchain.liboqs}
                    </p>
                  ) : null}
                </div>
              ) : result.status === "FAILED" ? (
                <div className="chip-metal p-5" style={{ borderColor: "rgba(255,150,150,0.3)" }}>
                  <p className="mb-2 font-serif text-2xl text-neutral-100">✕ REJECTED</p>
                  <p className="mb-3 text-sm font-light text-neutral-300">
                    The dossier does not verify — the proof caught it:
                  </p>
                  <ul className="space-y-1.5">
                    {result.failures.map((f, i) => (
                      <li key={i} className="flex gap-2 font-mono text-xs text-neutral-300">
                        <span style={{ color: "#ffb4b4" }}>✕</span>
                        <span className="break-all">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="chip-metal p-5">
                  <p className="mb-1 font-serif text-lg text-neutral-200">⚠ CANNOT VERIFY</p>
                  <p className="text-sm text-neutral-300">
                    {result.reason ?? "This input is not a sealed dossier."}
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <p className="mt-5 text-xs text-neutral-400">
            Runs entirely in your browser — pure-JavaScript Ed25519 + ML-DSA-65 (FIPS 204) + SHA3-512,
            no server and no IronProof code. The wire format is published, so anyone can write a
            second verifier:{" "}
            <a
              href="/sceal/SPEC_CANON.md"
              target="_blank"
              rel="noopener noreferrer"
              className="metal-text underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
            >
              read the spec →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
