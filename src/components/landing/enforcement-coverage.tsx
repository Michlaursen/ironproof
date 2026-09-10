/*
 * Coverage and timing, drawn on the same series of actions.
 *
 * This replaces an earlier "re-proven on every commit" lane, which was a
 * surclaim: our own hardened discipline says "continuous" means
 * enforcement-at-the-boundary, NOT lifecycle assurance
 * (.omg/ETAT_IRONPROOF.md), and recertification is a discrete, priced event
 * triggered by the client's release (.omg/IRONPROOF_FACTS.md). What IS
 * continuous is enforcement: every action, before it executes.
 *
 * So the lanes now compare what they can honestly compare — after-the-fact
 * review of a sample, against a check on every action at the boundary. The
 * gaps in the top lane are the point.
 */

const ACTIONS = 16;
/* Which actions a sampling review happens to look at. Illustrative of the
 * shape of sampling, not a measured rate. */
const SAMPLED = [2, 9] as const;

const OK = "#c8ffd8";

function Tick({ lit }: { lit: boolean }) {
  if (!lit) return null;
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke={OK}
      strokeWidth="2.4"
      style={{ filter: "drop-shadow(0 0 5px rgba(150,255,180,0.35))" }}
      aria-hidden="true"
    >
      <path d="M5 13 l4 4 l10 -11" />
    </svg>
  );
}

function Lane({
  eyebrow,
  title,
  lit,
  note,
  danger,
}: {
  eyebrow: string;
  title: string;
  lit: (i: number) => boolean;
  note: string;
  danger?: boolean;
}) {
  return (
    <div>
      <div className="mb-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className={danger ? "track-mid text-[10px] text-neutral-500" : "track-mid text-[10px] text-neutral-300"}>
          {eyebrow}
        </p>
        {danger ? (
          <p className="font-serif text-lg text-neutral-300">{title}</p>
        ) : (
          <p className="metal-text font-serif text-lg">{title}</p>
        )}
      </div>
      <div className="relative flex items-center justify-between">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 h-7 rounded-sm"
          style={
            danger
              ? {
                  background:
                    "repeating-linear-gradient(45deg, rgba(255,180,180,0.07) 0 6px, transparent 6px 12px)",
                  border: "1px solid rgba(255,180,180,0.16)",
                }
              : {
                  background: "rgba(200,255,216,0.05)",
                  border: "1px solid rgba(200,255,216,0.18)",
                }
          }
        />
        {Array.from({ length: ACTIONS }, (_, i) => (
          <span
            key={i}
            className="relative z-10 flex h-7 w-3 shrink-0 items-center justify-center"
          >
            <Tick lit={lit(i)} />
          </span>
        ))}
      </div>
      <p className="mt-2.5 text-xs font-light text-neutral-400">{note}</p>
    </div>
  );
}

export function EnforcementCoverage() {
  return (
    <div className="card-premium fade-up px-6 py-8 sm:px-10 sm:py-10">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="track-mid text-xs text-neutral-400">
          THE SAME CRITICAL ACTIONS, ONE DAY
        </p>
        <p className="text-xs font-light text-neutral-500">time &rarr;</p>
      </div>

      <div className="flex items-center justify-between" aria-hidden="true">
        {Array.from({ length: ACTIONS }, (_, i) => (
          <span key={i} className="h-3 w-px shrink-0" style={{ background: "rgba(228,233,255,0.22)" }} />
        ))}
      </div>

      <div className="mt-7">
        <Lane
          danger
          eyebrow="REVIEWED AFTERWARDS"
          title="A sample, once the action has run"
          lit={(i) => SAMPLED.includes(i as (typeof SAMPLED)[number])}
          note="Whatever the review does not reach has already executed. Finding it later is a report, not a stop."
        />
      </div>

      <div className="hairline my-8 h-px w-full" />

      <Lane
        eyebrow="WITH IRONPROOF"
        title="Every action, before it executes"
        lit={() => true}
        note="Each request is decided at the authorization boundary, and each decision — allow or block — is sealed."
      />
    </div>
  );
}
