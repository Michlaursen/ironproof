import Link from "next/link";
import type { Locale, SiteContent } from "@/content";
import { DemoRequestForm } from "./demo-request-form";
import { Reveal } from "./reveal";

type FinalCtaProps = {
  content: SiteContent["finalCta"];
  locale: Locale;
};

export function FinalCta({ content, locale }: FinalCtaProps) {
  return (
    <section id="contact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg text-muted">{content.subhead}</p>

          <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-border bg-surface p-6 text-left sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              {content.offerLabel}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              {content.offerName}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {content.offerBody}
            </p>
          </div>

          <div className="mt-10">
            <DemoRequestForm content={content.form} locale={locale} />
          </div>

          <p className="mt-6 text-sm text-muted">
            {content.designPartnerPre}
            <Link
              href={`mailto:${content.designPartnerEmail}`}
              className="text-accent hover:underline"
            >
              {content.designPartnerEmail}
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
