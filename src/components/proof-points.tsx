import type { SiteContent } from "@/content";
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
      </div>
    </section>
  );
}
