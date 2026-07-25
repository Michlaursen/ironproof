import Link from "next/link";
import type { SiteContent } from "@/content";
import { IconArrowUpRight, IconSeal } from "./icons";
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
                <div className="flex items-center justify-between border-b border-[#d9dde1] px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6570]">
                    {content.previewLabel}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#0a7d3c]/10 px-2 py-1 font-mono text-[10px] font-semibold text-[#0a7d3c]">
                    <IconSeal className="h-3 w-3" />
                    {content.previewStatus}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-sm font-semibold">{content.previewTitle}</h3>
                  <div className="mt-4 rounded-md bg-[#f0f2f4] p-4 font-mono text-[11px] leading-relaxed text-[#39424c]">
                    <span className="text-[#5b6570]">
                      {content.obligationLabel}
                    </span>
                    <br />
                    assert inv(pending, disbursed, approvals)
                    <br />
                    check-sat
                  </div>

                  <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                    <div className="rounded-md border border-[#d9dde1] p-3">
                      <dt className="text-[#5b6570]">{content.verdictLabel}</dt>
                      <dd className="mt-1 font-mono font-semibold text-[#0a7d3c]">
                        {content.verdict}
                      </dd>
                    </div>
                    <div className="rounded-md border border-[#d9dde1] p-3">
                      <dt className="text-[#5b6570]">{content.evidenceLabel}</dt>
                      <dd className="mt-1 font-mono text-[10px] leading-relaxed">
                        {content.evidence}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-[11px] leading-relaxed text-[#5b6570]">
                    {content.obligation}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
