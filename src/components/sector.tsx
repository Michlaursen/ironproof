import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type SectorProps = { content: SiteContent["sector"] };

export function Sector({ content }: SectorProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {content.buyersLabel}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {content.buyers}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {content.engagementLabel}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {content.engagement}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/*
            The quote stays: it is the one place on the page where the wedge is
            described by someone other than us, and it is sourced. Dom's rewrite
            named the market lists for removal and did not name this.
          */}
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
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
