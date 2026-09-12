"use client";

import { useState } from "react";

/*
 * VERIFY A PROOF — the REAL thing. Paste (or load) a sealed Sceal dossier and
 * it is verified entirely in your browser: Ed25519 + ML-DSA-65 (FIPS 204)
 * signatures and the SHA3-512 chain, in pure JavaScript, no server, no Ironproof
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
  // Six states, not two. `both` is the only one that refutes backdating: an
  // upper bound alone proves the bytes are no NEWER than the timestamp and says
  // nothing about a date written inside the document that is older than the
  // truth. So the state is RENDERED, never implied by the word "anchored".
  time?: {
    state: "both" | "upper" | "lower" | "none" | "unbounded" | "direction-unrecorded";
    before: number;
    after: number;
    unspecified: number;
    down: number;
  };
  toolchain?: { liboqs?: string; liboqsPython?: string; canonicalForm?: string } | null;
};

const DEMOS = {
  verified: "/sceal/demo-verified.json",
  tampered: "/sceal/demo-tampered-content.json",
} as const;

/** What the seal proves about WHEN, stated at the strength it actually has.
 *
 * A signature proves the bytes did not move; it proves nothing about the date,
 * because `collected_at` is a clock the sealer owns. An anchor binds the chain
 * head to witnesses the sealer does not own. Which DIRECTION those witnesses
 * bound is the whole question and it is printed, because "anchored" on its own
 * is the word a reader takes for "the date is proven".
 */
function TemporalLine({ time }: { time?: VerifyResult["time"] }) {
  if (!time || time.state === "none") {
    return (
      <p className="mt-3 text-sm font-light text-neutral-400">
        <span className="text-neutral-300">No temporal anchor.</span> The seal proves the bytes,
        not the date — nothing here refutes a document written later and dated earlier.
      </p>
    );
  }
  if (time.state === "both") {
    return (
      <p className="mt-3 text-sm font-light text-neutral-300">
        <span className="text-neutral-100">Anchored in time, from both sides.</span>{" "}
        {time.before} RFC 3161 timestamp{time.before === 1 ? "" : "s"} place it{" "}
        <span className="text-neutral-200">before</span> an instant, and {time.after} public
        beacon{time.after === 1 ? "" : "s"} place it{" "}
        <span className="text-neutral-200">after</span> one — a value nobody could predict
        earlier. Two sides close the interval; an upper bound alone would not.
      </p>
    );
  }
  const side =
    time.state === "upper"
      ? "an upper bound only — it proves the bytes are no newer than the timestamp, and does not refute a date written inside the document that is older than the truth."
      : time.state === "lower"
        ? "a lower bound only — it proves the bytes are no older than that beacon round, with nothing capping the other side."
        : time.state === "unbounded"
          ? "witnesses that were all unreachable when this was sealed, so no bound was recorded. The absence is the signal, not an error."
          : "witnesses whose direction was not recorded, so no bound can be claimed from them.";
  return (
    <p className="mt-3 text-sm font-light text-neutral-400">
      <span className="text-neutral-300">Anchored, partially:</span> {side}
    </p>
  );
}

export function VerifyArtifact() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [busy, setBusy] = useState(false);
  // A dossier loaded from the sealed sample reads in gold, like every other
  // sealed artifact on the site. The tampered one does not: its seal is broken,
  // so gold there would promise exactly what the demo goes on to refute.
  const [sealed, setSealed] = useState(false);

  async function load(which: keyof typeof DEMOS) {
    try {
      const res = await fetch(DEMOS[which]);
      const text = await res.text();
      setInput(text);
      setSealed(which === "verified");
      setResult(null);
    } catch {
      setSealed(false);
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
            Load a real sealed dossier and verify it right here — Ed25519 + ML-DSA-65 signatures,
            the SHA3-512 chain, and the temporal anchor that pins <em>when</em>, entirely in your
            browser. Then load a tampered one and watch it get rejected. No dashboard, no server,
            no trust required.
          </p>
        </div>

        <div className="fade-up card-premium relative overflow-hidden p-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="artifactInput" className="seal-label track-mid text-xs">
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
              setSealed(false);
              if (result) setResult(null);
            }}
            placeholder="paste a sealed Sceal dossier (JSON) — or use the buttons above"
            className={`w-full resize-none rounded-[5px] border bg-black/50 px-4 py-3 font-mono text-xs placeholder-neutral-600 transition focus:outline-none ${
              sealed
                ? "border-seal/35 text-seal focus:border-seal/60"
                : "border-white/10 text-neutral-200 focus:border-white/30"
            }`}
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
                  <p className="seal-word mb-2 font-serif text-2xl">✓ VERIFIED</p>
                  <p className="text-sm font-light text-neutral-300">
                    Both signatures check out — <span className="text-neutral-200">Ed25519</span> and{" "}
                    <span className="text-neutral-200">ML-DSA-65</span> (dual: both must pass) — over
                    a SHA3-512 chain of {result.nEntries ?? 0} sealed entries. Nothing was altered.
                  </p>
                  <TemporalLine time={result.time} />
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
            no server and no Ironproof code. The wire format is published, so anyone can write a
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
