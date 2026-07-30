import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type SolutionProps = { content: SiteContent["solution"] };

export function Solution({ content }: SolutionProps) {
  return (
    <section id="solution" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <Reveal
              key={step.step}
              delay={i * 0.06}
              className="flex flex-col rounded-lg border border-border bg-surface p-6"
            >
              <span className="font-mono text-xs text-accent">{step.step}</span>
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
