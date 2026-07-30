import type { SiteContent } from "@/content";
import { IconSeal } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ArtifactWalkthroughProps = { content: SiteContent["artifact"] };

const TONE_CLASS: Record<string, string> = {
  ok: "text-[#3ecf8e]",
  warn: "text-seal",
  muted: "text-muted",
};

export function ArtifactWalkthrough({ content }: ArtifactWalkthroughProps) {
  return (
    <section id="artifact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {content.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <p className="font-mono text-3xl font-semibold text-accent">
                {stat.stat}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {stat.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {stat.note}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg border border-border bg-surface-2 px-5 py-3.5">
            <span className="flex items-center gap-2 font-mono text-xs text-foreground">
              <IconSeal className="h-3.5 w-3.5 shrink-0 text-seal" />
              <span className="break-all">{content.fileLabel}</span>
            </span>
            <span className="font-mono text-[11px] text-muted">
              {content.fileMeta}
            </span>
          </div>
        </Reveal>

        <div className="divide-y divide-border rounded-b-lg border border-t-0 border-border">
          {content.parts.map((part, i) => (
            <Reveal key={part.num} delay={Math.min(i, 3) * 0.05}>
              <article className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent">
                      {part.num}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {part.anchor}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-balance text-foreground sm:text-xl">
                    {part.claim}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {part.body}
                  </p>

                  <div className="mt-5 rounded-md border border-border border-l-2 border-l-seal/70 bg-surface p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-seal">
                      Status quo
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {part.statusQuo}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-surface p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {part.field}
                  </p>
                  <dl className="mt-4 space-y-2.5 font-mono text-[11px] leading-relaxed">
                    {part.code.map((line) => (
                      <div key={line.key} className="min-w-0">
                        <dt className="text-muted">{line.key}:</dt>
                        <dd
                          className={`mt-0.5 break-words ${
                            line.tone
                              ? TONE_CLASS[line.tone]
                              : "text-foreground"
                          }`}
                        >
                          {line.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {content.tableTitle}
          </h3>

          <div className="mt-6 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="px-5 py-3.5 font-medium text-muted">
                    {content.tableColumns.row}
                  </th>
                  <th className="px-5 py-3.5 font-medium text-accent">
                    {content.tableColumns.us}
                  </th>
                  <th className="px-5 py-3.5 font-medium text-muted">
                    {content.tableColumns.them}
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.tableRows.map((row) => (
                  <tr key={row.row} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3.5 text-muted">{row.row}</td>
                    <td className="px-5 py-3.5">
                      <Mark value={row.us} highlight />
                    </td>
                    <td className="px-5 py-3.5">
                      <Mark value={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mark({ value, highlight }: { value: string; highlight?: boolean }) {
  const affirmative = value === "yes" || value === "oui";
  const negative = value === "no" || value === "non";

  if (affirmative) {
    return (
      <span
        aria-label={value}
        className={`font-mono text-base ${
          highlight ? "text-accent" : "text-foreground"
        }`}
      >
        ✓
      </span>
    );
  }

  if (negative) {
    return (
      <span aria-label={value} className="font-mono text-base text-muted">
        —
      </span>
    );
  }

  return <span className="text-xs text-muted">{value}</span>;
}
