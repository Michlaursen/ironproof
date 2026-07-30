import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type SectorProps = { content: SiteContent["sector"] };

export function Sector({ content }: SectorProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="rounded-lg border border-border bg-surface-2 p-7">
              <blockquote className="border-l-2 border-accent/70 pl-5">
                <p className="text-base leading-relaxed text-balance text-foreground">
                  “{content.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-4 pl-5">
                <Link
                  href={content.quoteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
                >
                  {content.quoteSource}
                  <IconArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </figcaption>

              <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted">
                {content.afterQuote}
              </p>
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-14 border-t border-border pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {content.alsoLabel}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {content.also.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
