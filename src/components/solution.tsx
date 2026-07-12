import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { SolutionDiagram } from "./solution-diagram";

type SolutionProps = { content: SiteContent["solution"] };

export function Solution({ content }: SolutionProps) {
  return (
    <section id="solution" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {content.steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} className="relative pl-6">
              <span className="absolute left-0 top-1 font-mono text-xs text-accent">
                {s.step}
              </span>
              <div className="border-l border-border pl-6">
                <h3 className="text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-lg border border-border bg-surface p-8">
          <SolutionDiagram content={content.diagram} />
        </Reveal>

        <Reveal className="mt-8 rounded-lg border border-border bg-surface p-8">
          <p className="text-lg text-foreground text-balance">
            {content.quoteIntro1}
            <span className="text-muted">{content.quote1}</span>
          </p>
          <p className="mt-3 text-lg text-foreground text-balance">
            {content.quoteIntro2}
            <span className="text-accent">{content.quote2}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
