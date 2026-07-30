import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ComparisonProps = { content: SiteContent["comparison"] };

export function Comparison({ content }: ComparisonProps) {
  return (
    <section
      id="comparison"
      className="scroll-mt-20 border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <div className="mt-12 space-y-2.5">
          {content.rows.map((row, i) => (
            <Reveal
              key={row.name}
              delay={Math.min(i, 4) * 0.05}
              className={`grid gap-x-8 gap-y-2 rounded-lg border px-5 py-5 lg:grid-cols-[15rem_1fr] ${
                row.isUs
                  ? "border-accent/40 bg-accent/[0.07]"
                  : "border-border bg-surface-2"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  row.isUs ? "text-accent" : "text-foreground"
                }`}
              >
                {row.name}
              </p>

              <div className="space-y-1.5">
                <p
                  className={`text-sm leading-relaxed ${
                    row.isUs ? "text-foreground" : "text-muted"
                  }`}
                >
                  {row.primary}
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    row.isUs ? "text-muted" : "text-muted/70"
                  }`}
                >
                  {row.secondary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
