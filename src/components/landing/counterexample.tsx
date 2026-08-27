import lab from "@/data/agent-refunds-lab.json";

/*
 * WHAT A COUNTEREXAMPLE LOOKS LIKE.
 *
 * Every value rendered here is read out of `src/data/agent-refunds-lab.json`,
 * which is written by `ontology/capture_agent_refunds.py` in the engine repo.
 * Nothing on this panel is typed by hand -- the verdicts, the escape sequence,
 * the amounts and the gate decisions all come from an actual run. If the
 * engine's answer changes, this section changes with it or it fails to build.
 */

type Scalar = string | number | boolean;
/* The capture emits one params object per action shape, so TypeScript widens
   the union with optional keys -- accept undefined and drop it when rendering. */
type Params = Readonly<Record<string, Scalar | undefined>>;

type Bind = { constraint: string; where: string[] };
type Encoded = { id: string; text: string; binds: Bind[] };
type NotEncoded = { id: string; text: string; why_not: string };
type Step = {
  n: number;
  action: string;
  params: Params;
  state_after: Readonly<Record<string, Scalar>>;
};
type GateRow = {
  action: string;
  params: Params;
  allowed: boolean;
  failed_preconditions: string[];
  refunded_after: number;
};

const coverage = lab.coverage as {
  clauses_total: number;
  clauses_encoded: number;
  clauses_not_encoded: number;
  encoded: Encoded[];
  not_encoded: NotEncoded[];
};
const bmc = lab.bmc as {
  horizon: number;
  steps: Step[];
  violated_invariants: string[];
  method: string;
};
const gatesAsWritten = lab.gates_correct as {
  steps: GateRow[];
  refunded_total: number;
  refund_authority: number;
  blocked_at: string | null;
};
const gatesHoled = lab.gates_broken as {
  steps: GateRow[];
  refunded_total: number;
  refund_authority: number;
  blocked_at: string | null;
};

const AUTHORITY = gatesHoled.refund_authority;

/* The schema keeps its prose ASCII (it is source, and an apostrophe in the
   wrong quote breaks a parser). Typography belongs to the rendering, not to
   the data -- so the double hyphen becomes an em dash here, and only here. */
function prose(text: string): string {
  return text.replace(/ -- /g, " \u2014 ");
}

function money(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function call(action: string, params: Params): string {
  const args = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => k + "=" + String(v))
    .join(", ");
  return action + "(" + args + ")";
}

function refundedAfter(step: Step): number {
  return Number(step.state_after.refunded_total);
}

/* The escape is only interesting because each amount clears the per-refund
   gate on its own. Read that off the trace instead of asserting it. */
const refundAmounts = bmc.steps
  .filter((s) => s.action === "refund")
  .map((s) => Number(s.params.amount));
const escapeTotal = bmc.steps.length ? refundedAfter(bmc.steps[bmc.steps.length - 1]) : 0;
const overshoot = escapeTotal - AUTHORITY;
const eachWithinAuthority = refundAmounts.every((a) => a <= AUTHORITY);

export function Counterexample() {
  return (
    <section
      id="counterexample"
      className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14"
    >
      <div className="fade-up mb-16 max-w-3xl">
        <p className="track-mid mb-4 text-xs text-neutral-400">
          WHAT A COUNTEREXAMPLE LOOKS LIKE
        </p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          We proved this refund policy.
          <br />
          Then we removed one line.
        </h2>
        <p className="mt-6 text-lg font-light text-neutral-300">
          A support agent that issues refunds, with the policy written the way its owner
          wrote it. Every verdict, every step and every amount below is read out of an
          engine run — none of it is typed by hand.
        </p>
      </div>

      {/* 1 — THE POLICY, IN THE OWNER'S WORDS */}
      <div className="fade-up card-premium mb-6 p-8 md:p-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="track-mid text-xs text-neutral-300">01 · THE POLICY, IN THEIR WORDS</p>
          <p className="text-xs text-neutral-400">
            {coverage.clauses_encoded} of {coverage.clauses_total} clauses turned into math
          </p>
        </div>
        <ul className="space-y-3">
          {coverage.encoded.map((c) => (
            <li key={c.id} className="flex gap-4 text-neutral-200">
              <span className="mt-0.5 font-mono text-xs text-neutral-500">{c.id}</span>
              <span className="font-light leading-snug">{prose(c.text)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="track-mid mb-4 text-xs text-neutral-400">
            {coverage.clauses_not_encoded} CLAUSES THIS MODEL DOES NOT COVER
          </p>
          <ul className="space-y-3">
            {coverage.not_encoded.map((c) => (
              <li key={c.id} className="flex gap-4 text-sm text-neutral-400">
                <span className="mt-0.5 font-mono text-xs text-neutral-600">{c.id}</span>
                <span className="font-light leading-snug">
                  {prose(c.text)}{" "}
                  <span className="text-neutral-500">— {prose(c.why_not)}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-light text-neutral-400">
            A certificate names what it does not cover. A coverage figure you cannot see the
            gaps in is a decoration.
          </p>
        </div>
      </div>

      {/* 2 — REMOVE ONE LINE */}
      <div className="fade-up mb-6 grid gap-6 md:grid-cols-2">
        <div className="card-premium p-8 md:p-10">
          <p className="track-mid mb-6 text-xs text-neutral-300">02 · AS WRITTEN</p>
          <p className="metal-text font-serif text-4xl">{lab.proof_correct.verdict}</p>
          <p className="mt-3 font-light leading-snug text-neutral-300">
            No sequence of allowed steps reaches a forbidden state — for a sequence of any
            length, not for the cases someone thought to try.
          </p>
          <p className="mt-6 font-mono text-xs text-neutral-500">
            {lab.proof_correct.verdict_token} · re-run in a fresh process:{" "}
            {String(lab.proof_correct.reproduced)} · {lab.solver}
          </p>
        </div>
        <div className="card-premium p-8 md:p-10" style={{ borderColor: "rgba(255,180,180,0.18)" }}>
          <p className="track-mid mb-6 text-xs text-neutral-300">
            03 · ONE CLAUSE REMOVED
          </p>
          <p className="font-serif text-4xl text-[#ffb4b4]">{lab.proof_broken.verdict}</p>
          <p className="mt-3 font-light leading-snug text-neutral-300">
            The refund gate still checks the current refund. It no longer checks the total.
          </p>
          <p className="track-mid mt-6 text-xs text-neutral-500">CLAUSE REMOVED</p>
          <p className="mt-2 break-all font-mono text-xs text-neutral-400">
            {lab.removed_clause}
          </p>
        </div>
      </div>

      {/* 4 — THE ESCAPE THE ENGINE BUILT */}
      <div className="fade-up card-premium mb-6 p-8 md:p-10">
        <p className="track-mid mb-6 text-xs text-neutral-300">
          04 · THE SEQUENCE THE ENGINE FOUND
        </p>
        <div className="-mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[30rem] text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="track-mid pb-3 text-xs font-normal text-neutral-500">#</th>
                <th className="track-mid pb-3 text-xs font-normal text-neutral-500">
                  ACTION
                </th>
                <th className="track-mid pb-3 text-right text-xs font-normal text-neutral-500">
                  REFUNDED SO FAR
                </th>
              </tr>
            </thead>
            <tbody>
              {bmc.steps.map((s) => {
                const total = refundedAfter(s);
                const over = total > AUTHORITY;
                return (
                  <tr key={s.n} className="border-b border-white/5 last:border-0">
                    <td className="py-3 font-mono text-xs text-neutral-500">{s.n}</td>
                    <td className="py-3 pr-3 font-mono text-xs text-neutral-200 md:text-[13px]">
                      {call(s.action, s.params)}
                    </td>
                    <td
                      className={
                        "py-3 text-right font-mono text-xs md:text-[13px] " +
                        (over ? "text-[#ffb4b4]" : "text-neutral-400")
                      }
                    >
                      {money(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-6 font-light leading-snug text-neutral-200">
          {eachWithinAuthority ? (
            <>
              Every refund is inside the agent&apos;s {money(AUTHORITY)} authority. Each one
              clears its own gate. Together they are {money(escapeTotal)} —{" "}
              {money(overshoot)} over.
            </>
          ) : (
            <>
              The total reaches {money(escapeTotal)} against a {money(AUTHORITY)} authority.
            </>
          )}
        </p>
        <p className="mt-3 text-sm font-light text-neutral-400">
          Violated: <span className="font-mono text-neutral-300">
            {bmc.violated_invariants.join(", ")}
          </span>{" "}
          · shortest escape at {bmc.horizon} steps · the solver chose the actions and the
          amounts, not us. Nobody writes a {money(overshoot)} overshoot by hand.
        </p>
      </div>

      {/* 5 — PUT THE LINE BACK */}
      <p className="fade-up mb-6 max-w-3xl font-light leading-snug text-neutral-300">
        Now the same policy at the gate, on an ordinary ticket rather than the solver&apos;s
        minimal pair: two {money(Number(gatesHoled.steps.filter((r) => r.action === "refund")[0]?.params.amount ?? 0))} refunds
        a support agent would really make.
      </p>
      <div className="fade-up grid gap-6 md:grid-cols-2">
        <div className="card-premium p-8 md:p-10">
          <p className="track-mid mb-6 text-xs text-neutral-300">05 · THE FIX, AT THE GATE</p>
          <ul className="space-y-3">
            {gatesAsWritten.steps.map((r, i) => (
              <li key={i} className="flex items-baseline gap-3 text-sm">
                <span className={r.allowed ? "icon-metal" : "text-[#ffb4b4]"}>
                  {r.allowed ? "✓" : "✕"}
                </span>
                <span className="break-all font-mono text-xs text-neutral-300 md:text-[13px]">
                  {call(r.action, r.params)}
                </span>
              </li>
            ))}
          </ul>
          {gatesAsWritten.blocked_at ? (
            <p className="mt-6 font-light leading-snug text-neutral-200">
              The second refund never executes. The gate names the clause that stopped it:{" "}
              <span className="break-all font-mono text-xs text-neutral-300">
                {gatesAsWritten.steps.find((r) => !r.allowed)?.failed_preconditions.join(", ")}
              </span>
            </p>
          ) : null}
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            <span className="track-mid text-xs text-neutral-300">REFUNDED</span>
            <span className="metal-text font-serif text-2xl">
              {money(gatesAsWritten.refunded_total)}
            </span>
          </div>
        </div>
        <div className="card-premium p-8 md:p-10" style={{ borderColor: "rgba(255,180,180,0.18)" }}>
          <p className="track-mid mb-6 text-xs text-neutral-300">
            06 · THE SAME GESTURES, LINE REMOVED
          </p>
          <ul className="space-y-3">
            {gatesHoled.steps.map((r, i) => (
              <li key={i} className="flex items-baseline gap-3 text-sm">
                <span className={r.allowed ? "text-neutral-500" : "icon-metal"}>
                  {r.allowed ? "✓" : "✕"}
                </span>
                <span className="break-all font-mono text-xs text-neutral-300 md:text-[13px]">
                  {call(r.action, r.params)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-light leading-snug text-neutral-300">
            Nothing is blocked. Every gate said yes, one action at a time.
          </p>
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            <span className="track-mid text-xs text-neutral-300">REFUNDED</span>
            <span className="font-serif text-2xl text-[#ffb4b4]">
              {money(gatesHoled.refunded_total)}
            </span>
          </div>
        </div>
      </div>

      <p className="fade-up mx-auto mt-10 max-w-3xl text-center text-lg font-light text-neutral-300">
        Take the clause out and the proof collapses. That is what makes the certificate
        load-bearing rather than decorative: a green that can never turn red is worth
        nothing.
      </p>
    </section>
  );
}
