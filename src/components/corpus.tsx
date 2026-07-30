import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type CorpusProps = { content: SiteContent["corpus"] };

export function Corpus({ content }: CorpusProps) {
  return (
    <section id="corpus" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.points.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.06}
              className="flex flex-col rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 rounded-lg border border-border bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {content.papers.eyebrow}
          </p>

          <ul className="mt-5 divide-y divide-border border-t border-border">
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
