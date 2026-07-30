import type { SiteContent } from "@/content";
import { IconCircuit, IconLock, IconRule, IconVerify } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = [IconCircuit, IconVerify, IconRule, IconLock];

type ProductsProps = { content: SiteContent["products"] };

export function Products({ content }: ProductsProps) {
  return (
    <section id="products" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {content.items.map((product, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={product.name}
                delay={i * 0.08}
                className="flex flex-col rounded-lg border border-border bg-surface-2 p-8"
              >
                <Icon className="h-6 w-6 text-accent" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
