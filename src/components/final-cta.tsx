import Link from "next/link";
import type { Locale, SiteContent } from "@/content";
import { DemoRequestForm } from "./demo-request-form";
import { IconArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

type FinalCtaProps = {
  content: SiteContent["finalCta"];
  locale: Locale;
};

export function FinalCta({ content, locale }: FinalCtaProps) {
  return (
    <section id="contact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {content.description}
          </p>

          {/*
            The form's submit button is the primary call to action, so the
            secondary one sits above it rather than beside it — two buttons on
            one line would read as a choice between equals.
          */}
          <div className="mt-8">
            <Link
              href="#artifact"
              className="group inline-flex items-center gap-1.5 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              {content.ctaSecondary}
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
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
