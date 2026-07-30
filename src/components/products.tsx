import type { SiteContent } from "@/content";
import { IconCircuit, IconEvidence, IconRule, IconVerify } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = [IconRule, IconVerify, IconCircuit, IconEvidence];

type ProductsProps = { content: SiteContent["products"] };

export function Products({ content }: ProductsProps) {
  return (
    <section
      id="products"
      className="scroll-mt-20 border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/*
          Two columns rather than the four-across rows used by the neighbouring
          sections — this one is a single product, not a list of four peers,
          and reading as another row of four would say the opposite.
        */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
            <p className="mt-8 border-l-2 border-accent/60 pl-5 text-sm leading-relaxed text-foreground">
              {content.finalLine}
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.capabilities.map((capability, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal
                  key={capability.title}
                  delay={i * 0.06}
                  className="flex flex-col rounded-lg border border-border bg-surface-2 p-6"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {capability.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {capability.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
