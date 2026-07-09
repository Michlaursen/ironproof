import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    step: "01",
    title: "Define the rules",
    body: "Encode the security, compliance, and governance rules an AI system or piece of software must never violate.",
  },
  {
    step: "02",
    title: "Verify the behavior",
    body: "IronProof checks whether the software or AI action can violate those rules — mathematically, over the defined input space.",
  },
  {
    step: "03",
    title: "Receive the evidence",
    body: "A counterexample when a violation is possible. A signed proof artifact, certificate, or receipt when it isn't.",
  },
];

export function Solution() {
  return (
    <section id="solution" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="The solution"
          title="IronProof turns trust into evidence."
          description="When something fails, IronProof produces a counterexample showing the risk. When something passes, it issues a signed proof artifact that can be verified later — independently, and offline."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="relative pl-6">
              <span className="absolute left-0 top-1 font-mono text-xs text-accent">
                {s.step}
              </span>
              <div className="border-l border-border pl-6">
                <h3 className="text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-surface p-8">
          <p className="text-lg text-foreground text-balance">
            Most cybersecurity tools say:{" "}
            <span className="text-muted">
              &ldquo;We looked at the system and it seems safe.&rdquo;
            </span>
          </p>
          <p className="mt-3 text-lg text-foreground text-balance">
            IronProof says:{" "}
            <span className="text-accent">
              &ldquo;Here are the rules. Here is the proof that the system
              cannot break them within this scope. And here is a sealed
              receipt you can verify later.&rdquo;
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
