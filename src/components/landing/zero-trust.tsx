import { IronproofMark } from "@/components/ironproof-mark";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { FadeUpInit } from "./fade-up-init";
import { CtaForm } from "./cta-form";
import { defaultLocale, type Locale } from "@/content";
import { pick } from "./i18n";
import { ZERO_TRUST_COPY } from "./zero-trust-copy";

/*
 * "Zero Trust" — the explainer reached from the nav.
 *
 * Same frame as /neuro-symbolic (header, numbered sections, CTA); the site
 * footer comes from the [locale] layout. Copy lives in zero-trust-copy.tsx,
 * and the comment at its top lists the NIST sections and the site files each
 * claim was read against.
 */

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

function Quote({ text, source }: { text: string; source: string }) {
  return (
    <figure className="card-premium my-8 max-w-2xl p-8">
      <blockquote className="font-serif text-lg leading-snug text-foreground md:text-xl">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="track-mid mt-4 text-xs text-neutral-500">{source}</figcaption>
    </figure>
  );
}

export function ZeroTrust({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(ZERO_TRUST_COPY, locale);
  const verifyHref = locale === defaultLocale ? "/verify" : `/${locale}/verify`;

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page="zero-trust" />

      <main className="blueprint flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 px-6 pb-20 pt-24 md:px-14 md:pt-28">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-4xl">
            <p className="seal-label track-wide mb-6 text-xs md:text-sm">{t.eyebrow}</p>
            <h1 className="metal-text mb-8 font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
              {t.h1}
            </h1>
            <p className="max-w-2xl text-lg font-light leading-snug text-neutral-300 md:text-xl">
              {t.heroLead}
            </p>
            <div className="hairline mt-10 h-px w-full max-w-md" />
          </div>
        </section>

        {/* 01 — what Zero Trust is */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s01}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s01Title}</h2>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s01a}</p>
            <Quote text={t.s01Quote} source={t.s01Source} />
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s01b}</p>
          </div>
        </section>

        {/* 02 — the risk NIST names */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s02}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s02Title}</h2>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s02Lead}</p>
            <Quote text={t.s02Quote} source={t.s02Source} />
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s02b}</p>
          </div>
        </section>

        {/* 03 — what Ironproof adds */}
        <section className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <Snum>{t.s03}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s03Title}</h2>
            <p className="font-light leading-relaxed text-neutral-300">{t.s03Lead}</p>
          </div>
          <div className="fade-up overflow-hidden rounded-md border border-white/10">
            <div className="hidden grid-cols-2 border-b border-white/10 bg-surface-2 md:grid">
              <div className="track-mid p-5 text-xs text-neutral-400">{t.colZt}</div>
              <div className="track-mid border-l border-white/10 p-5 text-xs text-seal">{t.colIp}</div>
            </div>
            <ul className="divide-y divide-white/10">
              {t.rows.map((row) => (
                <li key={row.zt} className="grid md:grid-cols-2">
                  <div className="p-5">
                    <span className="track-mid mb-1 block text-[0.65rem] text-neutral-500 md:hidden">{t.colZt}</span>
                    <span className="font-light leading-relaxed text-neutral-400">{row.zt}</span>
                  </div>
                  <div className="p-5 md:border-l md:border-white/10">
                    <span className="track-mid mb-1 block text-[0.65rem] text-seal md:hidden">{t.colIp}</span>
                    <span className="font-light leading-relaxed text-neutral-200">{row.ip}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 04 — what Ironproof is not */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>{t.s04}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s04Title}</h2>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s04Lead}</p>
          </div>
          <div className="flex flex-col gap-5">
            {t.limits.map((l) => (
              <div key={l.k} className="card-premium fade-up border-l-2 border-l-seal/50 p-8">
                <div className="track-mid mb-2 text-xs text-neutral-500">{l.k}</div>
                <h3 className="metal-text mb-2 font-serif text-xl">{l.t}</h3>
                <p className="font-light leading-relaxed text-neutral-300">{l.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 — Zero Trust, applied to us */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up flex flex-col items-start gap-10 md:flex-row md:items-center">
            <div className="flex-1">
              <Snum>{t.s05}</Snum>
              <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s05Title}</h2>
              <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s05a}</p>
              <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s05b}</p>
            </div>
            <div className="shrink-0 self-center">
              <ProofSeal size={150} locale={locale} />
            </div>
          </div>

          <a
            href={verifyHref}
            className="group fade-up mt-12 block max-w-2xl rounded-md border border-seal/20 bg-surface-2 p-6 transition hover:border-seal/40"
          >
            <span className="track-mid mb-2 block text-xs text-seal">{t.verifyTag}</span>
            <span className="mb-2 block font-serif text-xl leading-snug text-foreground md:text-2xl">
              {t.verifyTitle} <span aria-hidden="true">&rarr;</span>
            </span>
            <span className="block text-sm font-light leading-relaxed text-neutral-400">{t.verifyBody}</span>
          </a>
        </section>

        {/* 06 — closing phrase */}
        <section className="relative z-10 edge-t px-6 py-28 text-center md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-3xl">
            <p className="metal-shine mx-auto max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              {t.s06Phrase}
            </p>
            <p className="track-wide mt-8 text-xs text-seal">{t.eyebrow}</p>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-32 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronproofMark height={128} title={t.logoTitle} />
              <ProofSeal size={128} locale={locale} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-3xl font-medium md:text-5xl">{t.ctaTitle}</h2>
            <p className="mb-10 text-lg font-light text-neutral-400">{t.ctaLead}</p>
            <CtaForm locale={locale} />
          </div>
        </section>
      </main>

      <FadeUpInit />
    </div>
  );
}
