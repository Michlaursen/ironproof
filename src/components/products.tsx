import { IconCircuit, IconRule, IconVerify } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const PRODUCTS = [
  {
    icon: IconCircuit,
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
    icon: IconVerify,
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
    icon: IconRule,
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
    <section id="products" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Product"
            title="One proof engine. Multiple high-trust use cases."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal
              key={product.name}
              delay={i * 0.08}
              className="flex flex-col rounded-lg border border-border bg-surface-2 p-8"
            >
              <product.icon className="h-6 w-6 text-accent" />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-accent">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
