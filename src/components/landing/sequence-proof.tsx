/*
 * The centre of the page: two requests that are each valid, and a sequence
 * that is not.
 *
 * Every rule written as "per day", "cumulative", "in total" or "within a
 * window" has this shape, and a system that checks one request at a time
 * cannot see it. That is the whole argument for reasoning over sequences
 * rather than sampling cases — shown, not asserted.
 *
 * Every number on screen derives from these four constants. Nothing is
 * written twice, so the figures and the verdict cannot drift apart.
 */

const CAP = 1000;
const FIRST = 600;
const SECOND = 600;
/** Track width in dollars, so the cap line sits inside the bar and the
 *  overflow has somewhere to go. */
const SCALE = 1500;

const RUNNING = FIRST + SECOND;

function usd(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function pct(n: number): string {
  return ((n / SCALE) * 100).toFixed(2) + "%";
}

const OK = "#c8ffd8";
const NO = "#ffb4b4";

function Tick({ ok }: { ok: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={ok ? OK : NO}
      strokeWidth="2.2"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      {ok ? <path d="M5 13 l4 4 l10 -11" /> : <path d="M6 6 l12 12 M18 6 l-12 12" />}
    </svg>
  );
}

function Check({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <li className="flex gap-2.5">
      <Tick ok={ok} />
      <span className="text-sm font-light leading-relaxed text-neutral-300">
        {label} <span className="whitespace-nowrap font-mono text-xs text-neutral-400">{value}</span>
      </span>
    </li>
  );
}

function Verdict({ allow }: { allow: boolean }) {
  return (
    <span className={`verdict-tag ${allow ? "verdict-allow" : "verdict-block"}`}>
      {allow ? "ALLOW" : "BLOCK"}
    </span>
  );
}

export function SequenceProof() {
  return (
    <section
      id="sequence"
      className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14"
    >
      <div className="fade-up mb-14 max-w-3xl">
        <p className="track-mid mb-4 text-xs text-neutral-400">THE CASE NOTHING ELSE CATCHES</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          Every action is allowed.
          <br />
          The sequence is not.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
          Two identical requests, two minutes apart. Checked one at a time, both pass. Ironproof
          decides on the sequence, so the second one never executes.
        </p>
      </div>

      <div className="card-premium fade-up p-7 sm:p-10 md:p-12">
        {/* the rule in force */}
        <p className="track-mid mb-3 text-[10px] text-neutral-500">POLICY IN FORCE</p>
        <p className="font-serif text-xl leading-snug text-neutral-100 sm:text-2xl">
          No single refund over {usd(CAP)}, and no more than {usd(CAP)} to one payee per day.
        </p>

        <div className="hairline my-9 h-px w-full" />

        {/* the two requests */}
        <ol className="grid gap-8 md:grid-cols-2 md:gap-12">
          <li>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="track-mid text-[10px] text-neutral-500">REQUEST 1 &middot; 09:14</span>
              <Verdict allow />
            </div>
            <p className="mb-4 font-serif text-2xl text-neutral-100">
              Refund {usd(FIRST)} to payee ACME-4471
            </p>
            <ul className="space-y-2.5">
              <Check
                label="Single refund within the limit"
                value={`${usd(FIRST)} ≤ ${usd(CAP)}`}
                ok
              />
              <Check
                label="Day total after this refund"
                value={`${usd(FIRST)} ≤ ${usd(CAP)}`}
                ok
              />
            </ul>
            <p className="mt-5 text-sm font-light text-neutral-400">
              It executes. The decision is sealed.
            </p>
          </li>

          <li>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="track-mid text-[10px] text-neutral-500">REQUEST 2 &middot; 09:16</span>
              <Verdict allow={false} />
            </div>
            <p className="mb-4 font-serif text-2xl text-neutral-100">
              Refund {usd(SECOND)} to the same payee
            </p>
            <ul className="space-y-2.5">
              <Check
                label="Single refund within the limit"
                value={`${usd(SECOND)} ≤ ${usd(CAP)}`}
                ok
              />
              <Check
                label="Day total after this refund"
                value={`${usd(RUNNING)} > ${usd(CAP)}`}
                ok={false}
              />
            </ul>
            <p className="mt-5 text-sm font-light text-neutral-400">
              Identical to the first request. It never executes &mdash; and the refusal is sealed
              too.
            </p>
          </li>
        </ol>

        <div className="hairline my-9 h-px w-full" />

        {/* the running total, drawn */}
        <p className="track-mid mb-4 text-[10px] text-neutral-500">
          WHAT ONE-AT-A-TIME CHECKING CANNOT SEE
        </p>
        <div className="relative h-12 w-full overflow-hidden rounded-[4px] border border-white/5 bg-black/40">
          {/* request 1 */}
          <span
            className="absolute inset-y-0 left-0"
            style={{
              width: pct(FIRST),
              background: "linear-gradient(180deg, rgba(200,255,216,0.30), rgba(200,255,216,0.12))",
              borderRight: "1px solid rgba(200,255,216,0.45)",
            }}
          />
          {/* request 2, the part that crosses */}
          <span
            className="absolute inset-y-0"
            style={{
              left: pct(FIRST),
              width: pct(SECOND),
              background:
                "repeating-linear-gradient(45deg, rgba(255,180,180,0.20) 0 6px, rgba(255,180,180,0.07) 6px 12px)",
              borderRight: "1px solid rgba(255,180,180,0.45)",
            }}
          />
          {/* the cap */}
          <span
            className="absolute inset-y-0 w-px"
            style={{ left: pct(CAP), background: "rgba(232,235,245,0.9)", boxShadow: "0 0 10px rgba(200,210,255,0.6)" }}
            aria-hidden="true"
          />
        </div>
        <div className="relative mt-2 h-5 w-full text-[10px]">
          <span className="absolute left-0 text-neutral-500">{usd(0)}</span>
          <span
            className="track-mid absolute -translate-x-1/2 whitespace-nowrap text-neutral-300"
            style={{ left: pct(CAP) }}
          >
            {usd(CAP)} DAILY CAP
          </span>
        </div>
        <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-neutral-400">
          {usd(FIRST)} then {usd(SECOND)} is {usd(RUNNING)}. Neither request breaks the per-refund
          limit; together they break the daily one. Any rule written as{" "}
          <span className="text-neutral-200">per day</span>,{" "}
          <span className="text-neutral-200">cumulative</span>,{" "}
          <span className="text-neutral-200">in total</span> or{" "}
          <span className="text-neutral-200">within a window</span>{" "}
          has this shape &mdash; and a
          check that sees one request at a time is structurally blind to it.
        </p>
      </div>

      <p className="fade-up mt-6 text-xs text-neutral-500">
        Illustrative policy and figures. The mechanism is the point: the decision is taken on the
        sequence, before execution.
      </p>
    </section>
  );
}
