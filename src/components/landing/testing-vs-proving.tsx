import { TestingDots, ProvingDots } from "./compare-dots";

/*
 * Testing vs. Proving — moved off the homepage on 2026-09-10.
 *
 * The block is technically the strongest thing we had, and that was the
 * problem: it stalled the commercial path between "why is it different" and
 * "prove it". It belongs where the reader has already asked for the method,
 * so it now lives on /proof, between the artifact explorer and the public
 * record: here is a sealed artifact, here is what "proven" actually means,
 * here is the record behind the engine.
 *
 * Content is unchanged from the homepage version — this was a move, not a
 * rewrite.
 */
export function TestingVsProving() {
  return (
    <section id="compare" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-16 text-center">
          <p className="track-mid mb-4 text-xs text-neutral-400">THE MECHANISM</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
            Testing vs. Proving
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            Testing and formal verification answer different questions.
          </p>
        </div>
        <div className="fade-up grid gap-6 md:grid-cols-2">
          <div className="card-premium p-10">
            <p className="track-mid mb-6 text-xs text-neutral-400">TESTING</p>
            <p className="mb-6 font-serif text-2xl leading-snug text-neutral-100">
              Did the executions we tried behave correctly?
            </p>
            <TestingDots />
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 text-neutral-400">
                <span className="mt-0.5 text-neutral-500">&#9675;</span> Checks the cases
                someone thought of
              </li>
              <li className="flex gap-3 text-neutral-400">
                <span className="mt-0.5 text-neutral-500">&#9675;</span> &quot;Passed&quot;
                means <em>probably</em> fine
              </li>
            </ul>
            <div className="my-6 h-px w-full bg-white/5" />
            <div className="flex items-baseline justify-between">
              <span className="track-mid text-xs text-neutral-500">CONFIDENCE</span>
              <span className="font-serif text-2xl text-neutral-300">Partial</span>
            </div>
          </div>
          <div className="card-premium p-10" style={{ borderColor: "rgba(220,225,255,0.18)" }}>
            <p className="track-mid mb-6 text-xs text-neutral-300">PROVING</p>
            <p className="mb-6 font-serif text-2xl leading-snug text-neutral-100">
              Can the defined property be violated anywhere in the modeled state space?
            </p>
            <ProvingDots />
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 text-neutral-300">
                <span className="icon-metal mt-0.5">&#10003;</span> Reasons exhaustively over
                the formally defined state space
              </li>
              <li className="flex gap-3 text-neutral-300">
                <span className="icon-metal mt-0.5">&#10003;</span> If the formal model admits a
                violation, Ironproof produces a counterexample
              </li>
              <li className="flex gap-3 text-neutral-300">
                <span className="icon-metal mt-0.5">&#10003;</span> &quot;Proven&quot; means the
                defined property cannot be violated within the formal model
              </li>
            </ul>
            <div className="my-6 h-px w-full bg-white/5" />
            <div className="flex items-baseline justify-between">
              <span className="track-mid text-xs text-neutral-500">CONFIDENCE</span>
              <span className="metal-text font-serif text-2xl">
                Mathematical guarantee within the model
              </span>
            </div>
          </div>
        </div>
        <p className="fade-up mt-10 text-center text-lg font-light text-neutral-300">
          Ironproof does not replace testing. It proves properties that testing cannot
          exhaustively cover.
        </p>
      </div>
    </section>
  );
}
