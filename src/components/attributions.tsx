import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type AttributionsProps = { content: SiteContent["attributions"] };

export function Attributions({ content }: AttributionsProps) {
  return (
    <section
      id="evidence"
      className="scroll-mt-20 border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.08}>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-lg border border-border bg-surface-2 p-7 transition-colors hover:border-accent/70"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.org}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                      {item.where}
                    </p>
                  </div>
                  <IconArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>

                <blockquote className="mt-5 border-l-2 border-seal/60 pl-4">
                  <p className="font-mono text-[12px] leading-relaxed break-words text-foreground">
                    {item.quote}
                  </p>
                </blockquote>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                  {item.context}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent">
                  {item.linkLabel}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="font-mono text-xs leading-relaxed text-muted">
            {content.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
