/*
 * Prove -> Enforce -> Seal -> Verify, on one continuous rail.
 *
 * It was four disconnected cards: the arrows lived in the heading and were
 * absent from the picture. The rail carries the eye through the chain, and
 * the segment between Seal and Verify is gold — that is the artifact
 * travelling, from where it is minted to where it is re-checked.
 *
 * One layout: the rail runs down the left on mobile and across the top on md+.
 */

import type { ReactNode } from "react";

type Step = {
  n: string;
  title: string;
  body: string;
  icon: ReactNode;
  /** Gold from here on — the sealed artifact exists past this point. */
  sealed?: boolean;
};

const STEPS: readonly Step[] = [
  {
    n: "01",
    title: "Prove",
    body: "Before deployment, Ironproof establishes that the defined policy holds across the modeled action space.",
    icon: (
      <>
        <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
        <path d="M9 12 l2 2 l4 -4" />
      </>
    ),
  },
  {
    n: "02",
    title: "Enforce",
    body: "At runtime, every requested action is checked deterministically before execution.",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="1" />
        <path d="M8 11 V8 a4 4 0 0 1 8 0 v3" />
      </>
    ),
  },
  {
    n: "03",
    title: "Seal",
    body: "Each decision is sealed at execution time — SHA3-512 digest, dual Ed25519 + ML-DSA-65 signature — binding the action, the policy version and the verdict into one artifact.",
    sealed: true,
    icon: (
      <>
        <path d="M12 3 l7.8 4.5 v9 L12 21 l-7.8 -4.5 v-9 Z" />
        <path d="M9 12 h6" />
      </>
    ),
  },
  {
    n: "04",
    title: "Verify",
    body: "The certificate is re-checked against its sealed inputs: the same verdict must come back, or the seal is broken.",
    sealed: true,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12 l2 2 l4 -4" />
      </>
    ),
  },
] as const;

const CHROME = "rgba(228,233,255,0.30)";
const GOLD = "rgba(201,162,75,0.65)";

export function ProofPipeline() {
  return (
    <ol className="flex flex-col md:flex-row">
      {STEPS.map((s, i) => {
        const last = i === STEPS.length - 1;
        // The rail segment leaving this node. It turns gold once the artifact
        // exists, so the eye follows the seal from where it is minted (03) to
        // where it is re-checked (04).
        const segment = STEPS[i + 1]?.sealed === true && s.sealed === true ? GOLD : CHROME;
        return (
          <li key={s.n} className="flex gap-5 md:min-w-0 md:flex-1 md:flex-col md:gap-0">
            {/* rail column (mobile) / rail row (md+) */}
            <div className="flex flex-col items-center md:w-full md:flex-row">
              <span
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={
                  s.sealed
                    ? {
                        background:
                          "linear-gradient(180deg, rgba(201,162,75,0.22), rgba(201,162,75,0.04))",
                        border: "1px solid rgba(201,162,75,0.45)",
                        boxShadow: "inset 0 1px 0 rgba(255,235,190,0.25)",
                      }
                    : {
                        // .chip-metal would win the cascade and force a 5px radius,
                        // so the chrome disc carries its own metal here.
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                      }
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className={s.sealed ? "" : "icon-metal"}
                  style={
                    s.sealed
                      ? {
                          color: "#e6c884",
                          filter: "drop-shadow(0 0 6px rgba(201,162,75,0.45))",
                        }
                      : undefined
                  }
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </span>
              {/* connector — vertical on mobile, horizontal on md+ */}
              <span
                aria-hidden="true"
                className={
                  last
                    ? "hidden"
                    : "w-px flex-1 md:h-px md:w-auto md:min-w-0 md:flex-1"
                }
                style={{ background: segment }}
              />
            </div>

            <div className="min-w-0 pb-12 md:pb-0 md:pr-8 md:pt-7">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="num-badge font-serif text-2xl">{s.n}</span>
                <h3
                  className={
                    s.sealed ? "font-serif text-2xl" : "metal-text font-serif text-2xl"
                  }
                  style={s.sealed ? { color: "#e8d5a8" } : undefined}
                >
                  {s.title}
                </h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-neutral-300">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
