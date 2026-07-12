import type { SiteContent } from "@/content";
import { IconBolt, IconEyeOff, IconGap } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = [IconBolt, IconEyeOff, IconGap];

type ProblemProps = { content: SiteContent["problem"] };

export function Problem({ content }: ProblemProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {content.points.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={point.title}
                delay={i * 0.08}
                className="rounded-lg border border-border bg-surface-2 p-6"
              >
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {point.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
