import { IronproofMark } from "@/components/ironproof-mark";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { FadeUpInit } from "./fade-up-init";
import { CtaForm } from "./cta-form";
import { IconCircuit, IconRule } from "@/components/icons";
import { defaultLocale, type Locale } from "@/content";
import { pick } from "./i18n";
import { NEURO_SYMBOLIC_COPY } from "./neuro-symbolic-copy";

/*
 * "Neuro-symbolic" — the explainer reached from the nav.
 *
 * Same frame as /provable-ai (header, numbered sections, CTA); the site footer
 * comes from the [locale] layout. Copy lives in neuro-symbolic-copy.tsx, and
 * the comment at its top lists which file each claim about Ironproof was read
 * against.
 */

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

export function NeuroSymbolic({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(NEURO_SYMBOLIC_COPY, locale);
  const provableHref = locale === defaultLocale ? "/provable-ai" : `/${locale}/provable-ai`;

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page="neuro-symbolic" />

      <main className="flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 px-6 pb-16 pt-24 md:px-14 md:pt-28">
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

        {/* 01 — two kinds of intelligence */}
        <section className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <Snum>{t.s01}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s01Title}</h2>
            <p className="mt-6 font-light leading-relaxed text-neutral-300">{t.s01Lead}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { c: t.neural, good: t.neuralGood, bad: t.neuralBad, Icon: IconCircuit, tone: "text-neutral-400" },
              { c: t.symbolic, good: t.symbolicGood, bad: t.symbolicBad, Icon: IconRule, tone: "text-seal" },
            ].map(({ c, good, bad, Icon, tone }) => (
              <div key={c.k} className="card-premium fade-up flex flex-col p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="icon-metal h-6 w-6" />
                  <span className={`track-mid text-xs ${tone}`}>{c.k}</span>
                </div>
                <h3 className="metal-text mb-3 font-serif text-2xl">{c.t}</h3>
                <p className="mb-6 font-light leading-relaxed text-neutral-300">{c.b}</p>
                <dl className="mt-auto grid gap-3 border-t border-white/10 pt-5 text-sm">
                  <div>
                    <dt className="track-mid mb-1 text-[0.65rem] text-neutral-500">{t.strengthLabel}</dt>
                    <dd className="font-light text-neutral-200">{good}</dd>
                  </div>
                  <div>
                    <dt className="track-mid mb-1 text-[0.65rem] text-neutral-500">{t.weaknessLabel}</dt>
                    <dd className="font-light text-neutral-400">{bad}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* 02 — the combination */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s02}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s02Title}</h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s02a}</p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s02b}</p>
            <blockquote className="card-premium mt-10 max-w-2xl p-8">
              <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">{t.s02Quote}</p>
            </blockquote>
          </div>
        </section>

        {/* 03 — the engine */}
        <section className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <Snum>{t.s03}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.s03Title}</h2>
            <p className="mb-5 font-light leading-relaxed text-neutral-300">{t.s03a}</p>
            <p className="font-light leading-relaxed text-neutral-300">{t.s03b}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t.answers.map((a, i) => (
              <div key={a.k} className="card-premium fade-up p-8">
                <div className={`track-mid mb-3 text-xs ${i === 0 ? "text-seal" : "text-neutral-400"}`}>{a.k}</div>
                <h3 className="metal-text mb-2 font-serif text-xl">{a.t}</h3>
                <p className="font-light leading-relaxed text-neutral-300">{a.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — the pipeline */}
        <section className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <Snum>{t.s04}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s04Title}</h2>
            <p className="mt-6 font-light leading-relaxed text-neutral-300">{t.s04Lead}</p>
          </div>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.steps.map((s, i) => (
              <li
                key={s.n}
                className={`card-premium fade-up p-8 ${i === 0 ? "border-l-2 border-l-white/30" : "border-l-2 border-l-seal/50"}`}
              >
                <div className="track-mid mb-2 text-xs text-neutral-500">{s.n}</div>
                <h3 className="metal-text mb-2 font-serif text-xl">{s.t}</h3>
                <p className="font-light leading-relaxed text-neutral-300">{s.b}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 05 — where the model sits */}
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
        </section>

        {/* 06 — limits */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>{t.s06}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s06Title}</h2>
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

        {/* 07 — glossary */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>{t.s07}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s07Title}</h2>
          </div>
          <dl className="fade-up divide-y divide-white/10 border-y border-white/10">
            {t.glossary.map((g) => (
              <div key={g.t} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className="metal-text font-serif text-lg">{g.t}</dt>
                <dd className="font-light leading-relaxed text-neutral-300">{g.d}</dd>
              </div>
            ))}
          </dl>

          <a
            href={provableHref}
            className="group fade-up mt-12 block max-w-2xl rounded-md border border-seal/20 bg-surface-2 p-6 transition hover:border-seal/40"
          >
            <span className="track-mid mb-2 block text-xs text-seal">{t.provableTag}</span>
            <span className="mb-2 block font-serif text-xl leading-snug text-foreground md:text-2xl">
              {t.provableTitle} <span aria-hidden="true">&rarr;</span>
            </span>
            <span className="block text-sm font-light leading-relaxed text-neutral-400">{t.provableBody}</span>
          </a>
        </section>

        {/* 08 — closing phrase */}
        <section className="relative z-10 edge-t px-6 py-28 text-center md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-3xl">
            <p className="metal-shine mx-auto max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              {t.s08Phrase}
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
