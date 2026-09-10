/*
 * The authorization boundary, drawn.
 *
 * The site talks about a gate on every second section and never showed one.
 * Four initiators converge on a single blade; two outcomes leave it. The
 * BLOCKED lane stops dead at the blade — that stop is the whole product.
 *
 * One layout, responsive: the connectors are the only pieces that flip
 * orientation (horizontal on md+, a single convergence tick on mobile).
 */

type Initiator = {
  who: string;
  body: string;
};

const INITIATORS: readonly Initiator[] = [
  {
    who: "AI agent",
    body: "Prompts shape the request; they cannot widen what is allowed.",
  },
  {
    who: "Script or scheduled job",
    body: "Runs at 02:00 with nobody watching. The boundary holds without a reviewer.",
  },
  {
    who: "API call",
    body: "Credentials say who it is, not what it may do now.",
  },
  {
    who: "Person",
    body: "The policy that binds the machine binds the hand too.",
  },
] as const;

/** A hairline that runs toward the blade. Horizontal on md+, invisible below. */
function Lead() {
  return (
    <span
      aria-hidden="true"
      className="ml-3 hidden h-px w-10 shrink-0 md:block"
      style={{
        background:
          "linear-gradient(90deg, rgba(228,233,255,0.06), rgba(228,233,255,0.34))",
      }}
    />
  );
}

export function GateDiagram() {
  return (
    <div className="fade-up">
      <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
        {/* INITIATORS — everything that can reach a critical system */}
        <ul className="grid gap-3 sm:grid-cols-2 md:flex md:flex-1 md:flex-col md:gap-4">
          {INITIATORS.map((c) => (
            <li key={c.who} className="flex items-center">
              <div className="chip-metal min-w-0 flex-1 px-5 py-3.5 md:px-6">
                <p className="track-mid mb-1.5 text-[10px] text-neutral-500">INITIATOR</p>
                <p className="metal-text font-serif text-lg leading-tight">{c.who}</p>
                <p className="mt-1.5 text-xs font-light leading-relaxed text-neutral-400">
                  {c.body}
                </p>
              </div>
              <Lead />
            </li>
          ))}
        </ul>

        {/* mobile-only convergence tick */}
        <span
          aria-hidden="true"
          className="-mb-4 mx-auto h-12 w-px md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(228,233,255,0.06), rgba(228,233,255,0.34))",
          }}
        />

        {/* THE BLADE — one gate, whoever is asking */}
        <div className="relative flex shrink-0 items-center justify-center md:mx-1 md:self-stretch">
          <span
            aria-hidden="true"
            className="gate-blade absolute h-[3px] w-full rounded-full md:h-full md:w-[3px]"
            style={{
              background:
                "linear-gradient(var(--gate-dir), transparent, rgba(232,235,245,0.85) 22%, rgba(232,235,245,0.85) 78%, transparent)",
              boxShadow: "0 0 16px rgba(200,210,255,0.35)",
            }}
          />
          <span className="chip-metal relative flex h-14 w-14 rotate-45 items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="icon-metal -rotate-45"
              aria-hidden="true"
            >
              <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
              <path d="M9 12 l2 2 l4 -4" />
            </svg>
          </span>
        </div>

        {/* OUTCOMES — exactly two, and both are sealed */}
        <ul className="grid gap-4 md:flex-1">
          <li className="flex items-center">
            <span
              aria-hidden="true"
              className="mr-3 hidden h-px w-10 shrink-0 md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(200,255,216,0.55), rgba(200,255,216,0.85))",
              }}
            />
            <div className="card-premium min-w-0 flex-1 px-6 py-5">
              <div className="flex items-center gap-3">
                <svg
                  width="22"
                  height="22"
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
                <p className="track-mid text-xs text-neutral-300">INSIDE THE POLICY</p>
              </div>
              <p className="metal-text mt-3 font-serif text-2xl">It executes.</p>
              <p className="mt-1.5 text-xs font-light text-neutral-400">
                And a certificate is sealed at execution time.
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <span
              aria-hidden="true"
              className="mr-3 hidden h-px w-10 shrink-0 md:block"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,180,180,0.55) 0 3px, transparent 3px 6px)",
              }}
            />
            <div className="card-premium min-w-0 flex-1 px-6 py-5">
              <div className="flex items-center gap-3">
                <svg
                  width="22"
                  height="22"
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
                <p className="track-mid text-xs text-neutral-300">OUTSIDE THE POLICY</p>
              </div>
              <p className="mt-3 font-serif text-2xl text-neutral-100">It never runs.</p>
              <p className="mt-1.5 text-xs font-light text-neutral-400">
                The refusal is sealed too &mdash; a blocked action leaves evidence.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
