import type { SiteContent } from "@/content";
import { IconLock, IconSeal, IconVerify } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = [IconLock, IconVerify, IconSeal];

type SovereigntyProps = { content: SiteContent["sovereignty"] };

export function Sovereignty({ content }: SovereigntyProps) {
  return (
    <section id="sovereignty" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
          </Reveal>

          <div className="space-y-4">
            {content.features.map((feature, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal
                  key={feature.title}
                  delay={i * 0.08}
                  className="flex items-start gap-4 rounded-lg border border-border bg-surface p-6"
                >
                  <Icon className="h-6 w-6 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {feature.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
