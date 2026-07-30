import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ArtifactWalkthroughProps = { content: SiteContent["artifact"] };

export function ArtifactWalkthrough({ content }: ArtifactWalkthroughProps) {
  return (
    <section id="artifact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.blocks.map((block, i) => (
            <Reveal
              key={block.num}
              delay={i * 0.06}
              className="flex flex-col rounded-lg border border-border bg-surface p-6"
            >
              <span className="font-mono text-xs text-accent">{block.num}</span>
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {block.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-t border-border pt-8">
          <p className="max-w-2xl text-base text-balance text-foreground">
            {content.finalLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
