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
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading title={content.title} description={content.subtitle} />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.07}>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-lg border border-border bg-surface-2 p-6 transition-colors hover:border-accent/70"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {item.org}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent">
                  {item.cta}
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>


        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border pt-8">
          <p className="font-mono text-xs text-muted">{content.summary}</p>
          <Link
            href={content.linkHref}
            className="group inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-80"
          >
            {content.linkLabel}
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
