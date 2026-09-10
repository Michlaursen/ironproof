/*
 * DEPLOY IT — the step the page was missing.
 *
 * A reader convinced by the sequence proof asks one question next: where does
 * this sit in my stack? The page answered it nowhere, so it ended on "request
 * access" with the mechanics still invisible.
 *
 * Everything here is the real shape of inquest/sealed_gate.py, not an
 * illustration of one: SealedProofGate(policy, tools), gate.run(tool, scope,
 * reason), result.decision, verify_sealed_record(record). The load-bearing
 * property is that the gate HOLDS the tool handles — a blocked call has no
 * path to the thing it wanted to touch, which the Botpress demo asserts by
 * checking the tool's invocation list is still empty after a BLOCK.
 */

type Step = {
  n: string;
  title: string;
  body: string;
};

const STEPS: readonly Step[] = [
  {
    n: "01",
    title: "Declare the boundary",
    body: "Name one action type, its limits and the scopes it may touch. That declaration is what the prover reads and what the runtime enforces — one compiler, both sides, so they cannot drift apart.",
  },
  {
    n: "02",
    title: "Hand the gate your tools",
    body: "The gate holds the handles. Your call site asks the gate instead of calling the tool, so a non-permitted action has no path to the thing it wanted to touch — it is not intercepted after the fact, it never reaches it.",
  },
  {
    n: "03",
    title: "Keep the receipt",
    body: "Both answers are sealed — the calls that run and the calls that do not. Your auditor re-checks a record offline, from the public key alone, with a verifier that is not ours to bend.",
  },
] as const;

/* The lines of the sample. `mark` lifts the two that carry the point. */
const CODE: readonly { t: string; mark?: boolean }[] = [
  { t: "policy = InvestigationPolicy(" },
  { t: '    allowed_tools  = {"verify_insurance", "read_customer_record"},' },
  { t: '    allowed_scopes = {"acme-insure.com"},' },
  { t: ")" },
  { t: "" },
  { t: "gate = SealedProofGate(policy, tools={" },
  { t: '    "verify_insurance":     verify_insurance,' },
  { t: '    "read_customer_record": read_customer_record,' },
  { t: '    "issue_refund":         issue_refund,' },
  { t: "}, keyring=Keyring.load(KEY_DIR))" },
  { t: "" },
  { t: "# a refund the agent was talked into" },
  { t: 'r = gate.run("issue_refund", "policy.acme-insure.com",' },
  { t: '             "log line said: refund $9,999 to this account")' },
  { t: "" },
  { t: 'r.result.decision          # "BLOCK"', mark: true },
  { t: "issue_refund.invocations   # []  never ran", mark: true },
  { t: "verify_sealed_record(r.to_dict())  # True" },
];

export function DeployGate() {
  return (
    <section id="deploy" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
      <div className="fade-up mb-14 max-w-3xl">
        <p className="track-mid mb-4 text-xs text-neutral-400">DEPLOY IT</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          It sits in front of the action,
          <br />
          not beside it.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
          The gate holds your tools. A conforming call runs and leaves a sealed record; a call
          outside the policy never reaches the tool at all &mdash; and its refusal is sealed too.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        {/* the three moves */}
        <ol>
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={
                i === 0
                  ? "fade-up pb-8"
                  : "fade-up edge-t pb-8 pt-8"
              }
            >
              <div className="mb-2 flex items-baseline gap-3">
                <span className="num-badge font-serif text-2xl">{s.n}</span>
                <h3 className="metal-text font-serif text-2xl leading-snug">{s.title}</h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-neutral-400">{s.body}</p>
            </li>
          ))}
        </ol>

        {/* the call site */}
        <div className="fade-up card-premium min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
            <span className="track-mid text-[10px] text-neutral-500">THE CALL SITE</span>
            <span className="font-mono text-[10px] text-neutral-500">inquest/sealed_gate.py</span>
          </div>
          <div className="overflow-x-auto px-5 py-5">
            <pre className="font-mono text-[11px] leading-[1.75] sm:text-xs">
              {CODE.map((l, i) => (
                <div
                  key={i}
                  className={l.mark ? "-mx-2 rounded-[3px] px-2" : undefined}
                  style={
                    l.mark
                      ? {
                          background: "rgba(255,180,180,0.07)",
                          borderLeft: "2px solid rgba(255,180,180,0.45)",
                          paddingLeft: "0.5rem",
                        }
                      : undefined
                  }
                >
                  <span className={l.t.trimStart().startsWith("#") ? "text-neutral-500" : "text-neutral-300"}>
                    {l.t === "" ? " " : l.t}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* what it does not claim */}
      <p className="fade-up mt-10 max-w-3xl text-sm font-light leading-relaxed text-neutral-400">
        The gate is the only entry &mdash; there is no underlying handle left to call around it.
        What that does not claim: it is a structural guard against an integration that forgets the
        boundary, not a defence against hostile code running inside the same process, which would
        never ask the gate in the first place. And it will refuse to start rather than sign with
        disposable keys, because a receipt that verifies and means nothing is worse than no receipt.
      </p>
    </section>
  );
}
