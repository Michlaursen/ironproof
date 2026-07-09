import { SectionHeading } from "./section-heading";

const PRODUCTS = [
  {
    name: "IronProof Cobalt",
    tag: "Software modernization",
    description:
      "Verifies migrated, refactored, or AI-generated code and produces proof artifacts when the code meets defined properties.",
    items: [
      "Legacy modernization",
      "AI-generated code review",
      "Regulated software changes",
      "High-risk refactoring",
      "Security-sensitive code paths",
    ],
  },
  {
    name: "IronProof VERDICT",
    tag: "AI agent governance",
    description:
      "Verifies high-risk AI agent actions before execution, checks them against governance rules, and creates sealed evidence of what was allowed, denied, or proven safe.",
    items: [
      "AI agents in regulated workflows",
      "Approvals, refunds, credits, transfers",
      "Policy enforcement",
      "Audit trails",
      "Enterprise AI governance",
    ],
  },
  {
    name: "IronProof Core",
    tag: "Proof infrastructure",
    description:
      "The underlying proof engine. Transforms policies, constraints, code behavior, and action rules into machine-checkable verification logic.",
    items: [
      "Policy-to-machine-checkable controls",
      "Formal verification engine",
      "Powers Cobalt and VERDICT",
      "Sealed, portable proof artifacts",
      "Offline, independently verifiable",
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Product"
          title="One proof engine. Multiple high-trust use cases."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="flex flex-col rounded-lg border border-border bg-surface-2 p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {product.tag}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {product.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {product.description}
              </p>

              <ul className="mt-6 space-y-2 border-t border-border pt-6">
                {product.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
