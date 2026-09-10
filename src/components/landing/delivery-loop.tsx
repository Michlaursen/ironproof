/*
 * The delivery loop — cadence, not duration.
 *
 * The claim in this section is about HOW OFTEN a system is re-proven, not how
 * many seconds a proof takes. Drawing bars "to scale" would invent a ratio we
 * have never measured, so this draws the thing the copy actually says: the
 * same series of commits, checked once a cycle above and on every commit below.
 *
 * The gap is the point. Between manual cycles there is no fresh proof.
 */

const COMMITS = 16;
/* Where a hand-written proof cycle lands. Illustrative of the cadence the copy
 * describes ("weeks to months", "re-done manually every time the code changes")
 * — not a measurement of any particular engagement. */
const MANUAL_CYCLES = [0, 15] as const;

function CommitAxis() {
  return (
    <div className="flex items-center justify-between" aria-hidden="true">
      {Array.from({ length: COMMITS }, (_, i) => (
        <span
          key={i}
          className="h-3 w-px shrink-0"
          style={{ background: "rgba(228,233,255,0.22)" }}
        />
      ))}
    </div>
  );
}

export function DeliveryLoop() {
  return (
    <div className="card-premium fade-up px-6 py-8 sm:px-10 sm:py-10">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="track-mid text-xs text-neutral-400">THE SAME SERIES OF COMMITS</p>
        <p className="text-xs font-light text-neutral-500">time &rarr;</p>
      </div>

      <CommitAxis />

      {/* LANE 1 — traditional formal verification */}
      <div className="mt-7">
        <div className="mb-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="track-mid text-[10px] text-neutral-500">TRADITIONAL</p>
          <p className="font-serif text-lg text-neutral-300">Weeks to months per cycle</p>
        </div>
        <div className="relative flex items-center justify-between">
          {/* the span with no fresh proof */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 h-7 rounded-sm"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(255,180,180,0.07) 0 6px, transparent 6px 12px)",
              border: "1px solid rgba(255,180,180,0.16)",
            }}
          />
          {Array.from({ length: COMMITS }, (_, i) => {
            const proven = MANUAL_CYCLES.includes(i as (typeof MANUAL_CYCLES)[number]);
            return (
              <span
                key={i}
                className="relative z-10 flex h-7 w-3 shrink-0 items-center justify-center"
              >
                {proven ? (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c8ffd8"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    <path d="M5 13 l4 4 l10 -11" />
                  </svg>
                ) : null}
              </span>
            );
          })}
        </div>
        <p className="mt-2.5 text-xs font-light text-neutral-400">
          Proven at the cycle, then re-done by hand. In between, nothing re-checks the change.
        </p>
      </div>

      <div className="hairline my-8 h-px w-full" />

      {/* LANE 2 — Ironproof */}
      <div>
        <div className="mb-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="track-mid text-[10px] text-neutral-300">WITH IRONPROOF</p>
          <p className="metal-text font-serif text-lg">Re-proven on every commit</p>
        </div>
        <div className="relative flex items-center justify-between">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 h-7 rounded-sm"
            style={{
              background: "rgba(200,255,216,0.05)",
              border: "1px solid rgba(200,255,216,0.18)",
            }}
          />
          {Array.from({ length: COMMITS }, (_, i) => (
            <span
              key={i}
              className="relative z-10 flex h-7 w-3 shrink-0 items-center justify-center"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8ffd8"
                strokeWidth="2.4"
                style={{ filter: "drop-shadow(0 0 5px rgba(150,255,180,0.35))" }}
                aria-hidden="true"
              >
                <path d="M5 13 l4 4 l10 -11" />
              </svg>
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-xs font-light text-neutral-400">
          Proof obligations are re-discharged automatically as the system changes.
        </p>
      </div>
    </div>
  );
}
