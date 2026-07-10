import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const USE_CASES = [
  "AI agent governance",
  "AI-generated code assurance",
  "Legacy modernization proof audits",
  "Regulated workflow verification",
  "Critical software security",
  "Policy-to-machine-checkable controls",
  "Post-quantum sealed audit evidence",
  "Public sector and dual-use assurance",
];

export function UseCases() {
  return (
    <section id="use-cases" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow="Use cases" title="Where proof matters most." />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((useCase, i) => (
            <Reveal
              key={useCase}
              delay={i * 0.05}
              className="rounded-lg border border-border bg-surface-2 p-5 text-sm text-foreground"
            >
              {useCase}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
