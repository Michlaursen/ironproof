import { SectionHeading } from "./section-heading";

const POINTS = [
  {
    title: "AI is becoming operational",
    body: "AI agents now approve, refund, credit, discount, transfer, modify records, change permissions, trigger workflows, and write code — not just answer questions.",
  },
  {
    title: "Logs and policies are not enough",
    body: "Most governance tools observe, log, score, or review after the fact. They do not prove whether a system can violate a rule before it acts.",
  },
  {
    title: "Modernization widens the gap",
    body: "Organizations are accepting AI-generated code into production faster than they can verify it. Software is moving faster than trust can be checked.",
  },
];

export function Problem() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="The problem"
          title="AI is acting faster than organizations can verify."
          description="AI agents now touch workflows involving approvals, refunds, permissions, customer records, code changes, and regulated decisions. Traditional audits, logs, and policy documents cannot prove whether a system can violate a rule before it acts."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-lg border border-border bg-surface-2 p-6"
            >
              <h3 className="text-base font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
