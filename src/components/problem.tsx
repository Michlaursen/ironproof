import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ProblemProps = { content: SiteContent["problem"] };

export function Problem({ content }: ProblemProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeading eyebrow={content.eyebrow} title={content.title} />
          </Reveal>

          <Reveal delay={0.08} className="max-w-2xl space-y-4">
            {content.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          The four existing controls render identically to each other, and the
          Ironproof row repeats their exact shape in accent. The claim of the
          section is that it is the missing item in the same list, not a
          different kind of thing — so it is drawn as the fifth entry.
        */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.layers.map((layer, i) => (
            <Reveal
              key={layer.name}
              delay={i * 0.05}
              className="rounded-lg border border-border bg-surface-2 px-5 py-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
                {layer.name}
              </p>
              <p className="mt-1.5 text-sm text-muted">{layer.role}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.2}
          className="mt-3 rounded-lg border border-accent/40 bg-accent/[0.07] px-5 py-4"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            {content.conclusion.name}
          </p>
          <p className="mt-1.5 text-sm text-foreground">
            {content.conclusion.role}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
