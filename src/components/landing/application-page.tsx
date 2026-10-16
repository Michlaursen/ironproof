import { IronproofMark } from "@/components/ironproof-mark";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { FadeUpInit } from "./fade-up-init";
import { CtaForm } from "./cta-form";
import { defaultLocale, type Locale } from "@/content";
import { pick } from "./i18n";
import { PLATFORM_COPY } from "./platform-copy";
import { PAPERS } from "./credibility";
import { APP_LABELS, APP_PAPERS, APP_PILLAR, type AppId } from "./application-copy";

/*
 * One page per application that had none: /software-security and
 * /modernization. Same frame as /zero-trust (header, numbered sections, CTA).
 * Every sentence comes from the landing's pillar or method block; see the
 * comment at the top of application-copy.ts.
 */

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

export function ApplicationPage({ app, locale = defaultLocale }: { app: AppId; locale?: Locale }) {
  const copy = pick(PLATFORM_COPY, locale);
  const pillar = copy.pillars[APP_PILLAR[app]];
  const t = pick(APP_LABELS, locale);
  const papers = PAPERS.filter((p) => APP_PAPERS[app].includes(p.id));
  const home = locale === defaultLocale ? "/" : `/${locale}`;

  if (!pillar) return null;

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page={app} />

      <main className="blueprint flex-1">
        <section id="top" className="relative z-10 px-6 pb-20 pt-24 md:px-14 md:pt-28">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-4xl">
            <p className="seal-label track-wide mb-6 text-xs md:text-sm">
              {pillar.name.toUpperCase()}
            </p>
            <p className="chapter-status track-mid mb-6">{pillar.status}</p>
            <h1 className="metal-text mb-8 font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
              {pillar.claim}
            </h1>
            <div className="hairline mt-10 h-px w-full max-w-md" />
          </div>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s01}</Snum>
            <p className="max-w-2xl font-serif text-2xl leading-snug text-foreground md:text-3xl">{pillar.risk}</p>
          </div>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s02}</Snum>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{pillar.body}</p>
          </div>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
          <div className="fade-up mb-10 max-w-3xl">
            <Snum>{t.s03}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{copy.method.title}</h2>
            <p className="font-light leading-relaxed text-neutral-300">{copy.method.lead}</p>
          </div>
          <ul className="fade-up verdict-grid">
            {copy.method.verdicts.map((v, i) => (
              <li key={v.word} className={`verdict-card verdict-${["proven", "refuted", "open"][i]}`}>
                <span className="verdict-mark" aria-hidden="true" />
                <p className="verdict-word font-serif">{v.word}</p>
                <p className="verdict-body">{v.body}</p>
                <p className="verdict-receive">{v.receive}</p>
              </li>
            ))}
          </ul>
        </section>

        {pillar.evidence ? (
          <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
            <div className="fade-up card-premium border-l-2 border-l-seal/50 p-8">
              <Snum>{t.s04}</Snum>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-neutral-200">{pillar.evidence}</p>
            </div>
          </section>
        ) : null}

        {papers.length > 0 ? (
          <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
            <div className="fade-up">
              <Snum>{t.papers}</Snum>
              {/* Same card as the research list in credibility.tsx: the papers-index
                * rows are drawn for the dark band and vanish on this page. */}
              <div className="mt-6 flex flex-col gap-3">
                {papers.map((paper) => (
                  <a
                    key={paper.id}
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-premium group flex flex-wrap items-center gap-4 p-5 transition"
                  >
                    <span className="metal-text shrink-0 font-mono text-xs">{paper.id}</span>
                    <span className="flex-1 text-sm font-light leading-snug text-neutral-300">{paper.title}</span>
                    <span className="track-mid shrink-0 text-xs text-seal">
                      {t.read} <span aria-hidden="true">&#8599;</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="manifesto relative z-10">
          <div className="manifesto-inner">
            <span className="manifesto-rule" aria-hidden="true" />
            <p className="manifesto-a font-serif">{copy.method.foot.a}</p>
            <p className="manifesto-b font-serif">{copy.method.foot.b}</p>
            <span className="manifesto-rule" aria-hidden="true" />
          </div>
        </section>

        <section id="contact" className="relative z-10 edge-t px-6 py-32 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronproofMark height={128} title="Ironproof" />
              <ProofSeal size={128} locale={locale} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-3xl font-medium md:text-5xl">{t.ctaTitle}</h2>
            <p className="mb-10 text-lg font-light text-neutral-400">{t.ctaLead}</p>
            <CtaForm locale={locale} />
            <a
              href={`${home}#applications`}
              className="track-mid mt-12 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-neutral-300 transition hover:border-seal hover:text-white"
            >
              <span aria-hidden="true">&larr;</span> {t.backHome}
            </a>
          </div>
        </section>
      </main>

      <FadeUpInit />
    </div>
  );
}
