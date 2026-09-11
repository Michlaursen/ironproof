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
const AUTHORITY = (lab.gates_correct as { refund_authority: number }).refund_authority;

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
          A support agent that issues refunds, under the policy its owner wrote. Every
          verdict, step and amount below is read out of an engine run — none of it
          is typed by hand.
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
            A coverage figure you cannot see the gaps in is a decoration. And the authority
            is your number, not ours &mdash; we prove the agent stays inside it, not that it
            is the right one.
          </p>
        </div>
      </div>

      {/* 2 — ONE CARD: the two verdicts, then the escape Z3 built.
           Was three panels (02 AS WRITTEN / 03 ONE CLAUSE REMOVED /
           04 THE SEQUENCE). They are one beat, so they are one card. */}
      <div className="fade-up card-premium p-8 md:p-10">
        <p className="track-mid mb-8 text-xs text-neutral-300">02 · REMOVE ONE LINE</p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="track-mid mb-3 text-[10px] text-neutral-500">AS WRITTEN</p>
            <p className="metal-text font-serif text-4xl">{lab.proof_correct.verdict}</p>
            <p className="mt-2 text-sm font-light leading-snug text-neutral-400">
              No sequence of allowed steps reaches a forbidden state &mdash; at any length,
              not for the cases someone thought to try.
            </p>
          </div>
          <div className="border-t border-white/5 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <p className="track-mid mb-3 text-[10px] text-neutral-500">
              WITHOUT{" "}
              <span className="font-mono text-neutral-400">{lab.removed_clause}</span>
            </p>
            <p className="font-serif text-4xl text-[#ffb4b4]">{lab.proof_broken.verdict}</p>
            <p className="mt-2 text-sm font-light leading-snug text-neutral-400">
              The gate still checks the refund in front of it. It no longer checks the total.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8">
          <p className="track-mid mb-5 text-[10px] text-neutral-500">
            THE WAY OUT Z3 FOUND &mdash; {bmc.horizon} STEPS
          </p>
          <div className="-mx-2 overflow-x-auto px-2">
            <table className="w-full min-w-[26rem] text-left">
              <tbody>
                {bmc.steps.map((s) => {
                  const total = refundedAfter(s);
                  const over = total > AUTHORITY;
                  return (
                    <tr key={s.n} className="border-b border-white/5 last:border-0">
                      <td className="w-6 py-2.5 font-mono text-xs text-neutral-600">{s.n}</td>
                      <td className="py-2.5 pr-3 font-mono text-xs text-neutral-200 md:text-[13px]">
                        {call(s.action, s.params)}
                      </td>
                      <td
                        className={
                          "py-2.5 text-right font-mono text-xs md:text-[13px] " +
                          (over ? "text-[#ffb4b4]" : "text-neutral-500")
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
                Each refund is inside the {money(AUTHORITY)} authority and clears its own gate.
                Together they are {money(escapeTotal)} &mdash;{" "}
                <span className="text-[#ffb4b4]">{money(overshoot)} over</span>.
              </>
            ) : (
              <>
                The total reaches {money(escapeTotal)} against a {money(AUTHORITY)} authority.
              </>
            )}
          </p>
          <p className="mt-3 text-sm font-light text-neutral-500">
            Z3 chose the actions and the amounts, not us &mdash; nobody writes a{" "}
            {money(overshoot)} overshoot by hand. Violated:{" "}
            <span className="font-mono text-neutral-400">
              {bmc.violated_invariants.join(", ")}
            </span>{" "}
            · {lab.proof_correct.verdict_token} · re-run in a fresh process:{" "}
            {String(lab.proof_correct.reproduced)} · {lab.solver}
          </p>
        </div>
      </div>

    </section>
  );
}
