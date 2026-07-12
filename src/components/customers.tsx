import type { SiteContent } from "@/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type CustomersProps = { content: SiteContent["customers"] };

export function Customers({ content }: CustomersProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {content.segments.map((segment, i) => (
            <Reveal
              key={segment}
              delay={i * 0.04}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted"
            >
              {segment}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
