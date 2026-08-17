"use client";

import { useState } from "react";

/*
 * PROOF EXPLORER — a real CVE (net-snmp asn1.c, CWE-190) walked through four
 * tabs: the code, the Z3 proof the bypass exists (SAT), the witness bytes, and
 * the re-proof the fix closes it (UNSAT). Code blocks are kept as exact
 * monospace strings; prose keeps the reference landing's wording verbatim.
 */

type TabKey = "code" | "proof" | "poc" | "reprove";

const TABS: { key: TabKey; label: string }[] = [
  { key: "code", label: "1 · CODE" },
  { key: "proof", label: "2 · PROOF" },
  { key: "poc", label: "3 · POC" },
  { key: "reprove", label: "4 · RE-PROVE" },
];

const CODE_SRC = `u_long subidentifier = 0;
while (*bufp & 0x80) {                  /* continuation bit set          */
    subidentifier = (subidentifier << 7)
                  + (*bufp++ & ~0x80);  /* accumulate 7 bits — NO guard   */
    length--;
}
subidentifier = (subidentifier << 7) + (*bufp++ & ~0x80);

if (subidentifier > (u_long) MAX_SUBID) /* check runs AFTER the wrap      */
    return NULL;`;

const PROOF_SRC = `sub[0] = 0
for i in 0..9:  sub[i+1] = (sub[i] << 7) + byte[i]      (mod 2^64)
assert  ULE(sub[10], 0xFFFFFFFF)             # does a bypass exist?

input      = 82 80 80 80 80 80 80 80 80 00   (10-byte over-long BER)
true value = 2 x 128^9 = 2^64  >>  MAX_SUBID

Z3  ->  SAT      a bypassing input EXISTS — the bug is real`;

const POC_SRC = `OID subidentifier = 82 80 80 80 80 80 80 80 80 00

  iter  1:  sub = 0x0000000000000002
  iter  9:  sub = 0x0200000000000000
  iter 10:  sub = 0x0000000000000000   <- wrapped to zero (mod 2^64)

  MAX_SUBID check:  0 > 0xFFFFFFFF  ->  false  ->  BYPASSED`;

const REPROVE_SRC = `# guard the accumulation (reject over-long encodings /
# check the top bits before each shift), then re-run:

for a bounded (<= 4-byte, RFC-limit) encoding:
    assert  UGT(sub, 0xFFFFFFFFFFFFFFFF)      # can it overflow 64-bit?

Z3  ->  UNSAT    no input overflows — bounded, provably`;

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
          <p className="track-mid mb-4 text-xs text-neutral-400">PROOF EXPLORER · NS-001</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
            A Real CVE — Proven, Then Closed
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            An actual integer-overflow flaw in <span className="metal-text">net-snmp</span> (asn1.c,
            CWE-190). Walk the real cycle: the code, the Z3 proof that a bypass exists, the exact
            bytes that trigger it, and the re-proof that the fix closes it for every input.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-neutral-400">
            <span className="metal-text">The same proof engine</span> certifies your money-moving
            policies before an agent can act — this is that engine, shown on a public bug.
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
                <p className="track-mid mb-4 text-xs text-neutral-300">
                  net-snmp · snmplib/asn1.c · asn_parse_objid() &nbsp;—&nbsp; CWE-190 + CWE-20
                </p>
                <CodeBlock src={CODE_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-300">
                  The 64-bit <span className="font-mono text-neutral-300">u_long</span> silently
                  wraps (mod 2<sup>64</sup>) while it accumulates. The bound is then compared against
                  the <span className="metal-text">wrapped</span> value — not the true one.
                </p>
              </div>
            ) : null}

            {tab === "proof" ? (
              <div>
                <p className="track-mid mb-4 text-xs text-neutral-300">
                  OBLIGATION NS-001-P1 · Z3 · BitVec 64 · the BUG
                </p>
                <CodeBlock src={PROOF_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-300">
                  Gate rule <span className="text-neutral-300">R2</span>: this BUG obligation (SAT)
                  is paired with a FIX obligation that must return UNSAT (tab 4) — a verdict that
                  cannot be red would mean nothing in green.
                </p>
              </div>
            ) : null}

            {tab === "poc" ? (
              <div>
                <p className="track-mid mb-4 text-xs text-neutral-300">
                  WITNESS · the exact bytes that trigger it
                </p>
                <CodeBlock src={POC_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-300">
                  A remote SNMP GET/SET/GETNEXT carrying this crafted OID makes{" "}
                  <span className="font-mono text-neutral-300">asn_parse_objid()</span> accept the
                  subidentifier as <span className="font-mono text-neutral-300">0</span> while its
                  true value is 2<sup>64</sup> — OID confusion, ACL bypass, wrong MIB traversal.
                </p>
              </div>
            ) : null}

            {tab === "reprove" ? (
              <div>
                <p className="track-mid mb-4 text-xs text-neutral-300">
                  OBLIGATION NS-001-P4 · Z3 · BitVec 64 · the FIX
                </p>
                <CodeBlock src={REPROVE_SRC} />
                <p className="mt-5 text-sm font-light text-neutral-300">
                  With the guard, <span className="text-neutral-300">
                    &quot;some input bypasses the check&quot;
                  </span>{" "}
                  is UNSAT for <span className="metal-text">all</span> inputs. Green only because red
                  was reachable — and is now closed. Cross-checked independently in{" "}
                  <span className="text-neutral-300">Lean</span> (kernel + bv_decide).
                </p>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/5 p-6 md:p-8">
            <p className="track-mid mb-3 text-xs text-neutral-300">
              WHAT THIS PROVES — AND WHAT IT DOES NOT (declared, gate rule R3)
            </p>
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div className="flex gap-3">
                <span className="icon-metal mt-0.5">✓</span>
                <p className="font-light text-neutral-400">
                  <span className="text-neutral-200">Proven —</span> the 64-bit accumulation model
                  admits a bypassing input (SAT); the guarded model admits none (UNSAT); both
                  re-provable in Lean, an independent kernel.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 text-neutral-400">○</span>
                <p className="font-light text-neutral-300">
                  <span className="text-neutral-300">Not proven here —</span> reachability of{" "}
                  <span className="font-mono">asn_parse_objid()</span> from a given network path, and
                  full fidelity of this model to every line of net-snmp source. A proof is only as
                  strong as the model — which is why we name it.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="fade-up mt-4 text-center text-xs text-neutral-400">
          Faithful to the Z3 obligations in the IronProof proof set (NS-001).
        </p>
      </div>
    </section>
  );
}
