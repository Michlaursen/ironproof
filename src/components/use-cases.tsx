import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type UseCasesProps = { content: SiteContent["useCases"] };

export function UseCases({ content }: UseCasesProps) {
  return (
    <section id="use-cases" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((useCase, i) => (
            <Reveal
              key={useCase}
              delay={i * 0.05}
              className="rounded-lg border border-border bg-surface-2 p-5 text-sm text-foreground"
            >
              {useCase}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
