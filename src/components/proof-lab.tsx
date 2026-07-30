import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

const LAB_URL = "https://lab.ironproof.ai";

type ProofLabProps = {
  content: SiteContent["lab"];
};

export function ProofLab({ content }: ProofLabProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal>
          <Link
            href={LAB_URL}
            target="_blank"
            rel="noreferrer"
            className="group grid overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-accent/70 lg:grid-cols-[0.82fr_1.18fr]"
          >
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {content.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                {content.description}
              </p>
              <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground">
                {content.cta}
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="relative min-h-80 border-t border-border bg-[#f6f7f8] p-5 text-[#14171a] sm:p-8 lg:border-t-0 lg:border-l">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,23,26,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,23,26,0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-lg border border-[#d9dde1] bg-white shadow-xl shadow-black/10">
                <div className="border-b border-[#d9dde1] px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6570]">
                    {content.previewLabel}
                  </span>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  <Block label={content.policyLabel} items={content.policy} />
                  <Block
                    label={content.transactionLabel}
                    items={content.transaction}
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Outcome
                      label={content.safeLabel}
                      verdict={content.safeVerdict}
                      body={content.safeBody}
                      tone="allow"
                    />
                    <Outcome
                      label={content.failLabel}
                      verdict={content.failVerdict}
                      body={content.failBody}
                      tone="block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Block({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5b6570]">
        {label}
      </p>
      <ul className="mt-2 rounded-md bg-[#f0f2f4] p-3 font-mono text-[11px] leading-relaxed text-[#39424c]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span aria-hidden="true" className="text-[#98a2ae]">
              ·
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
  Both outcomes are shown side by side on purpose: the section's claim is that
  the engine either authorizes or names the blocking condition, so showing only
  the green state would demonstrate half of it.
*/
function Outcome({
  label,
  verdict,
  body,
  tone,
}: {
  label: string;
  verdict: string;
  body: string;
  tone: "allow" | "block";
}) {
  const allow = tone === "allow";
  const color = allow ? "#0a7d3c" : "#b42318";

  return (
    <div
      className="rounded-md border p-3"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}0d` }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#5b6570]">
        {label}
      </p>
      <p
        className="mt-1.5 font-mono text-[11px] font-semibold"
        style={{ color }}
      >
        {verdict}
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-[#39424c]">
        {body}
      </p>
    </div>
  );
}
