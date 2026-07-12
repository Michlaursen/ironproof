import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconSeal } from "./icons";
import { Reveal } from "./reveal";

type HeroProps = { content: SiteContent["hero"] };

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--surface)_0%,_var(--background)_60%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal y={12}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted text-balance">
            {content.subhead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href="#solution"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              {content.ctaSecondary}
            </Link>
          </div>

          <p className="mt-12 text-sm text-muted">
            {content.taglinePre}
            <span className="text-foreground">{content.taglineQuote1}</span>
            {content.taglineMid}
            <span className="text-foreground">{content.taglineQuote2}</span>
          </p>
        </Reveal>

        <Reveal delay={0.15} y={12}>
          <ProofArtifactCard content={content.proofCard} />
        </Reveal>
      </div>
    </section>
  );
}

function ProofArtifactCard({
  content,
}: {
  content: SiteContent["hero"]["proofCard"];
}) {
  return (
    <div className="proof-scan relative mx-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {content.label}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-seal/10 px-2.5 py-1 font-mono text-[11px] font-medium text-seal">
          <IconSeal className="h-3 w-3" />
          {content.status}
        </span>
      </div>

      <dl className="mt-4 space-y-3 font-mono text-xs">
        {content.rows.map((row, i) => (
          <Row key={row.label} label={row.label} value={row.value} accent={i === 2} />
        ))}
      </dl>

      <div className="mt-5 rounded-md border border-border bg-surface-2 p-3">
        <p className="font-mono text-[10px] leading-relaxed text-muted break-all">
          8f4a1c9e2b7d0f31 5e6a9c2d1b8f4e07
          <br />
          a3c5e8f1d4b7906c 2f8e1a4c7b9d3e05
        </p>
      </div>

      <p className="mt-4 text-[11px] text-muted">{content.footnote}</p>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "text-accent" : "text-foreground"}>{value}</dd>
    </div>
  );
}
