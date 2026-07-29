import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ProofPointsProps = { content: SiteContent["proofPoints"] };

export function ProofPoints({ content }: ProofPointsProps) {
  return (
    <section id="proof-points" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((point, i) => (
            <Reveal
              key={point.label}
              delay={i * 0.06}
              className="rounded-lg border border-border bg-surface-2 p-6"
            >
              <p className="font-mono text-3xl font-semibold text-accent">
                {point.stat}
              </p>
              <p className="mt-2 text-sm text-muted">{point.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-lg border border-border bg-surface-2 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {content.papers.eyebrow}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {content.papers.note}
          </p>

          <ul className="mt-6 divide-y divide-border border-t border-border">
            {content.papers.items.map((paper) => (
              <li key={paper.id}>
                <Link
                  href={paper.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-start sm:gap-4"
                >
                  <span className="shrink-0 font-mono text-xs text-accent sm:text-sm">
                    {paper.id}
                  </span>
                  <span className="flex-1 text-sm leading-relaxed text-muted transition-colors group-hover:text-foreground">
                    {paper.title}
                  </span>
                  <IconArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
