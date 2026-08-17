"use client";

import { useState } from "react";

/*
 * PROOF EXPLORER — a real, ASSIGNED CVE (libyang CVE-2026-44673, CWE-190 -> CWE-122)
 * walked through four tabs: the code, the Z3 proof an undersizing input exists (SAT),
 * the exact witness, and the re-proof that a 64-bit fix closes it (UNSAT).
 * Faithful to the hardened Cobalt proof (cobalt-ai/cobalt_libyang_lyb001_finding.py):
 * BUG obligation SAT + two FIX obligations UNSAT, non-vacuous. Not overclaimed (R3).
 */

type TabKey = "code" | "proof" | "poc" | "reprove";

const TABS: { key: TabKey; label: string }[] = [
  { key: "code", label: "1 · CODE" },
  { key: "proof", label: "2 · PROOF" },
  { key: "poc", label: "3 · POC" },
  { key: "reprove", label: "4 · RE-PROVE" },
];

const CODE_SRC = `// libyang · src/parser_lyb.c · lyb_read_string()
// str_len is a 32-bit length read straight from the LYB blob — attacker-controlled.

L288  *str = malloc(str_len + 1);       /* (str_len + 1) wraps to 0 in uint32      */
L293  lyb_read(*str, str_len * 8, in);  /* str_len * 8 also wraps — no 64-bit guard */
L296  (*str)[str_len] = '\\0';           /* write at [str_len] — far out of bounds   */`;

const PROOF_SRC = `str_len : BitVec 32              # attacker-controlled length field

# BUG obligation LYB-b1 — can the buffer be smaller than the data?
alloc = str_len + 1             # 32-bit, exactly as written
assert  ULT(alloc, str_len)     # does an undersizing input exist?

witness   str_len = 0xFFFFFFFF   ->   alloc = 0x00000000   (wrapped)

Z3  ->  SAT      an undersizing input EXISTS — the overflow is real`;

const POC_SRC = `LYB blob · string length field (4 bytes, little-endian)

  str_len = FF FF FF FF   =   0xFFFFFFFF

  L288  malloc(0xFFFFFFFF + 1)  ->  malloc(0)   (wrapped)  ->  ~0-byte buffer
  L296  buf[0xFFFFFFFF] = 0                                 ->  heap write ~4 GB out of bounds

  reached in-memory (LY_IN_MEMORY) via lyd_parse_data() — NETCONF / sysrepo`;

const REPROVE_SRC = `# fix: widen to 64-bit before the arithmetic, then re-run for ALL str_len:
#   malloc((uint64_t)str_len + 1)   ·   lyb_read(*str, (uint64_t)str_len * 8, in)

for every 32-bit str_len:
    assert  ULE( (uint64_t)str_len + 1, str_len )   # can it still undersize?

Z3  ->  UNSAT    no input undersizes — bounded, provably, over all 2^32 lengths`;

function CodeBlock({ src }: { src: string }) {
  return (
    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-neutral-300 md:text-[13px]">
      {src}
    </pre>
  );
}

export function ProofExplorer() {
  const [tab, setTab] = useState<TabKey>("code");

  return (
    <section id="explorer" className="relative z-10 edge-t px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-12 text-center">
          <p className="track-mid mb-4 text-xs text-neutral-400">PROOF EXPLORER · CVE-2026-44673</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
            We Mathematically Prove
            <br />
            a Critical Vulnerability
          </h2>
          <p className="metal-text mx-auto mt-5 font-serif text-2xl md:text-3xl">
            Proven, then closed. Here&apos;s the proof.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            A real, assigned vulnerability in <span className="metal-text">libyang</span>{" "}
            (CVE-2026-44673, CVSS 7.5) — the YANG library behind NETCONF and sysrepo network config.
            An attacker-controlled length field overflows 32-bit arithmetic, so the parser allocates
            a near-empty buffer and then writes far past it — a heap overflow. Watch the full cycle:
            the code, the proof an undersizing input exists, the exact input that triggers it, and the
            re-proof that a 64-bit fix closes it for every possible length.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-neutral-400">
            <span className="metal-text">The same proof engine</span> certifies your money-moving
            policies before an agent can act — this is that engine, shown here on a real, assigned CVE.
          </p>
        </div>

        <div className="fade-up card-premium overflow-hidden">
          <div className="flex flex-wrap gap-2 border-b border-white/5 p-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`preset-btn chip-metal px-5 py-2.5 text-xs track-mid text-neutral-200 transition hover:text-white${tab === t.key ? " active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-black/40 p-6 md:p-8">
            {tab === "code" ? (
              <div>
                <p className="track-mid mb-4 text-[10px] text-neutral-400">
                  libyang · src/parser_lyb.c · lyb_read_string() &nbsp;—&nbsp; CWE-190 -&gt; CWE-122
                </p>
                <CodeBlock src={CODE_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-400">
                  <span className="font-mono text-neutral-300">str_len</span> comes straight from the
                  LYB blob, unchecked. With <span className="metal-text">str_len = 0xFFFFFFFF</span>,{" "}
                  <span className="font-mono text-neutral-300">(str_len + 1)</span> wraps to 0: the
                  parser allocates almost nothing, then writes str_len bytes into it — integer
                  overflow to heap overflow (CWE-190 → CWE-122).
                </p>
              </div>
            ) : null}

            {tab === "proof" ? (
              <div>
                <p className="track-mid mb-4 text-[10px] text-neutral-400">
                  OBLIGATION LYB-b1 · Z3 · BitVec 32 · the BUG
                </p>
                <CodeBlock src={PROOF_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-400">
                  Gate rule <span className="text-neutral-300">R2</span>: this BUG obligation (SAT) is
                  paired with FIX obligations that must return UNSAT (tab 4). A verdict that cannot be
                  red would mean nothing in green.
                </p>
              </div>
            ) : null}

            {tab === "poc" ? (
              <div>
                <p className="track-mid mb-4 text-[10px] text-neutral-400">
                  WITNESS · the exact input that triggers it
                </p>
                <CodeBlock src={POC_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-400">
                  A crafted LYB blob makes{" "}
                  <span className="font-mono text-neutral-300">lyb_read_string()</span> allocate a
                  near-empty buffer, then write about 4 GB past it — heap corruption (DoS; RCE
                  potential if the heap is groomable). Reported to CESNET, the libyang maintainer;
                  assigned <span className="metal-text">CVE-2026-44673</span>.
                </p>
              </div>
            ) : null}

            {tab === "reprove" ? (
              <div>
                <p className="track-mid mb-4 text-[10px] text-neutral-400">
                  OBLIGATIONS LYB-f1 / LYB-f2 · Z3 · the FIX
                </p>
                <CodeBlock src={REPROVE_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-400">
                  With 64-bit arithmetic, <span className="text-neutral-300">
                    &quot;some length undersizes the buffer&quot;
                  </span>{" "}
                  is UNSAT for <span className="metal-text">every</span> input. Green only because red
                  was reachable — and the fix obligations are non-vacuous: revert to 32-bit and the
                  counterexample returns.
                </p>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/5 p-6 md:p-8">
            <p className="track-mid mb-3 text-[10px] text-neutral-400">
              WHAT THIS PROVES — AND WHAT IT DOES NOT (declared, gate rule R3)
            </p>
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div className="flex gap-3">
                <span className="icon-metal mt-0.5">✓</span>
                <p className="font-light text-neutral-400">
                  <span className="text-neutral-200">Proven —</span> the 32-bit model admits an
                  undersizing input (SAT); the 64-bit-widened model admits none (UNSAT); both fix
                  obligations are non-vacuous — reverting the fix re-exhibits the counterexample.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 text-neutral-500">○</span>
                <p className="font-light text-neutral-400">
                  <span className="text-neutral-300">Not proven here —</span> reachability of{" "}
                  <span className="font-mono">lyb_read_string()</span> from a given network path, and
                  that this exact fix is the upstream libyang patch. It is a sufficient,
                  proven-correct fix — not necessarily the one deployed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="fade-up mt-4 text-center text-xs text-neutral-400">
          Faithful to the Cobalt proof set (LYB-001) — reported to CESNET / libyang.{" "}
          <a
            href="https://www.cve.org/CVERecord?id=CVE-2026-44673"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-text underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
          >
            View the published CVE-2026-44673 →
          </a>
        </p>
      </div>
    </section>
  );
}
