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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <Reveal className="mt-14 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="px-5 py-4 font-medium text-muted">
                  {content.columns.vendor}
                </th>
                <th className="px-5 py-4 font-medium text-muted">
                  {content.columns.strength}
                </th>
                <th className="px-5 py-4 font-medium text-muted">
                  {content.columns.location}
                </th>
                <th className="px-5 py-4 font-medium text-muted">
                  {content.columns.survives}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr
                  key={row.vendor}
                  className={`border-b border-border last:border-b-0 ${
                    row.isUs ? "bg-accent/[0.07]" : ""
                  }`}
                >
                  <td
                    className={`px-5 py-4 font-medium ${
                      row.isUs ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {row.vendor}
                  </td>
                  <td className="px-5 py-4 text-muted">{row.strength}</td>
                  <td
                    className={`px-5 py-4 ${
                      row.isUs ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {row.location}
                  </td>
                  <td
                    className={`px-5 py-4 font-mono text-xs ${
                      row.isUs ? "text-accent" : "text-muted"
                    }`}
                  >
                    {row.survives}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="mt-8 max-w-3xl rounded-lg border border-border border-l-2 border-l-seal/70 bg-surface-2 p-6">
          <p className="text-sm leading-relaxed text-muted">
            {content.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
