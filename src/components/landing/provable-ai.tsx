import { IronProofLogo } from "@/components/ironproof-logo";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { FadeUpInit } from "./fade-up-init";
import { CtaForm } from "./cta-form";
import { IconEyeOff, IconVerify, IconSeal, IconRule, IconGlobe } from "@/components/icons";
import { defaultLocale, type Locale } from "@/content";
import { pick } from "./i18n";
import { PROVABLE_AI_COPY } from "./provable-ai-copy";

/*
 * "What is Provable AI?" — the category page reached from the nav.
 *
 * Copy lives in provable-ai-copy.tsx, both languages, read through `pick`.
 * Every claim is mapped to the real state: capabilities marked BUILT exist
 * today — including the public offline verifier (PR #10, merged) and the
 * publicly anchored root of trust (attested across two independent names,
 * 2026-08-18). No traction claims, no latency numbers, never "we prove all
 * vulnerabilities".
 */

function Pill({ kind, locale }: { kind: "built" | "coming" | "roadmap"; locale: Locale }) {
  const LABELS: Record<Locale, Record<"built" | "coming" | "roadmap", string>> = {
    en: { built: "BUILT", coming: "COMING", roadmap: "ROADMAP" },
    fr: { built: "CONSTRUIT", coming: "À VENIR", roadmap: "FEUILLE DE ROUTE" },
  };
  const label = (LABELS[locale] ?? LABELS.en)[kind];
  const tone =
    kind === "built"
      ? "text-seal border-seal/40 bg-seal/10"
      : "text-neutral-400 border-white/12 bg-white/5";
  return (
    <span
      className={`track-mid ml-3 inline-block rounded-full border px-2.5 py-0.5 align-middle text-[0.6rem] ${tone}`}
    >
      {label}
    </span>
  );
}

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="track-mid mb-4 text-xs text-neutral-500">{children}</p>;
}

export function ProvableAI({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(PROVABLE_AI_COPY, locale);

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page="provable-ai" />

      <main className="flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 px-6 pb-16 pt-24 md:px-14 md:pt-28">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-4xl">
            <p className="track-wide mb-6 text-xs text-neutral-400 md:text-sm">{t.eyebrow}</p>
            <h1 className="metal-shine mb-8 font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
              {t.h1}
            </h1>
            <p className="max-w-2xl text-lg font-light leading-snug text-neutral-300 md:text-xl">
              {t.heroLead}
            </p>
            <div className="hairline mt-10 h-px w-full max-w-md" />
          </div>
        </section>

        {/* 01 — the question */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s01}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              {t.s01Title}
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s01a}</p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s01b}</p>
            <blockquote className="card-premium mt-10 max-w-2xl p-8">
              <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
                {t.s01Quote}
              </p>
            </blockquote>

            {/* The sentence above is the claim; the research note is the number
                behind it. Highest-value inbound link to /research. */}
            <a
              href={
                locale === "en"
                  ? "/research/zero-barriers-one-reviewer"
                  : `/${locale}/research/zero-barriers-one-reviewer`
              }
              className="group mt-6 block max-w-2xl rounded-md border border-seal/20 bg-surface-2 p-6 transition hover:border-seal/40"
            >
              <span className="track-mid mb-2 block text-[11px] text-seal">{t.researchTag}</span>
              <span className="mb-2 block font-serif text-xl leading-snug text-foreground md:text-2xl">
                {t.researchTitle}
              </span>
              <span className="block text-sm font-light leading-relaxed text-neutral-400">
                {t.researchBody}
              </span>
            </a>
          </div>
        </section>

        {/* 02 — the reframe */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s02}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              {t.s02Title}
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s02a}</p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s02b}</p>
          </div>
        </section>

        {/* 03 — what provable means */}
        <section id="platform" className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <Snum>{t.s03}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s03Title}</h2>
            <p className="mt-6 font-light leading-relaxed text-neutral-300">{t.s03Lead}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <IconEyeOff className="icon-metal h-6 w-6" />
                <span className="track-mid text-xs text-neutral-400">{t.layer1}</span>
              </div>
              <h3 className="metal-text mb-3 font-serif text-2xl">{t.layer1Title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{t.layer1Body}</p>
            </div>
            <div className="card-premium fade-up p-8">
              <div className="mb-4 flex items-center gap-3">
                <IconVerify className="icon-metal h-6 w-6" />
                <span className="track-mid text-xs text-seal">{t.layer2}</span>
              </div>
              <h3 className="metal-text mb-3 font-serif text-2xl">{t.layer2Title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{t.layer2Body}</p>
            </div>
          </div>

          {/* pipeline */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="card-premium fade-up p-8">
              <IconRule className="icon-metal mb-5 h-6 w-6" />
              <div className="track-mid mb-2 text-xs text-neutral-500">{t.step1}</div>
              <h3 className="metal-text mb-2 font-serif text-xl">{t.step1Title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{t.step1Body}</p>
            </div>
            <div className="card-premium fade-up p-8">
              <IconSeal className="icon-metal mb-5 h-6 w-6" />
              <div className="track-mid mb-2 text-xs text-neutral-500">{t.step2}</div>
              <h3 className="metal-text mb-2 font-serif text-xl">{t.step2Title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{t.step2Body}</p>
            </div>
            <div className="card-premium fade-up p-8">
              <IconGlobe className="icon-metal mb-5 h-6 w-6" />
              <div className="track-mid mb-2 text-xs text-neutral-500">{t.step3}</div>
              <h3 className="metal-text mb-2 font-serif text-xl">{t.step3Title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{t.step3Body}</p>
            </div>
          </div>
        </section>

        {/* 04 — how the proof is built */}
        <section id="speed" className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s04}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              {t.s04Title}
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s04a}</p>
            <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s04b}</p>
          </div>
        </section>

        {/* 04b — honest surface */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s04bis}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              {t.s04bTitle}
            </h2>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s04bA}</p>
            <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s04bB}</p>
            <blockquote className="card-premium mt-8 max-w-2xl p-8">
              <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
                {t.s04bQuote}
              </p>
            </blockquote>
          </div>
        </section>

        {/* 05 — the artifact */}
        <section id="verify" className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up flex flex-col items-start gap-10 md:flex-row md:items-center">
            <div className="flex-1">
              <Snum>{t.s05}</Snum>
              <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
                {t.s05Title}
              </h2>
              <p className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s05a}</p>
              <p className="max-w-2xl font-light leading-relaxed text-neutral-300">{t.s05b}</p>
            </div>
            <div className="shrink-0 self-center">
              <ProofSeal size={150} locale={locale} />
            </div>
          </div>
        </section>

        {/* 06 — what it isn't */}
        <section id="compare" className="relative z-10 edge-t mx-auto max-w-7xl px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <Snum>{t.s06}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s06Title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {t.notItems.map((x) => (
              <div key={x.n} className="card-premium fade-up p-8">
                <h3 className="metal-text mb-3 font-serif text-xl">{x.n}</h3>
                <p className="font-light leading-relaxed text-neutral-300">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 — what it does not solve */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>{t.s07}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s07Title}</h2>
          </div>
          <div className="flex flex-col gap-5">
            {t.limits.map((l) => (
              <div key={l.t} className="card-premium fade-up border-l-2 border-l-seal/50 p-8">
                <h3 className="metal-text mb-2 font-serif text-xl">
                  {l.t}
                  {l.roadmap ? <Pill kind="roadmap" locale={locale} /> : null}
                </h3>
                <p className="font-light leading-relaxed text-neutral-300">{l.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 08 — regulatory */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-20 md:px-14">
          <div className="fade-up">
            <Snum>{t.s08}</Snum>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">
              {t.s08Title}
            </h2>
            <p className="mb-8 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s08Lead}</p>
            <div className="flex flex-wrap gap-3">
              {/* Framework names are proper nouns of the regulators themselves —
                  they are not translated, in either direction. */}
              {["OSFI E-23", "AMF (Québec)", "CRI FS AI RMF", "AIUC-1", "FINRA / SEC context"].map(
                (r) => (
                  <span
                    key={r}
                    className="chip-metal track-mid px-4 py-2 font-mono text-xs text-neutral-200"
                  >
                    {r}
                  </span>
                ),
              )}
            </div>
            <p className="mt-6 max-w-2xl text-sm text-neutral-500">{t.s08Foot}</p>
          </div>
        </section>

        {/* 09 — role / maturity */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-24 md:px-14">
          <div className="fade-up mb-10">
            <Snum>{t.s09}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.s09Title}</h2>
            <p className="mt-6 max-w-2xl font-light leading-relaxed text-neutral-300">{t.s09Lead}</p>
          </div>
          <div className="flex flex-col gap-4">
            {t.maturity.map((m) => (
              <div
                key={m.t}
                className="card-premium fade-up flex items-center justify-between gap-6 p-6"
              >
                <div>
                  <div className="metal-text font-serif text-lg">{m.t}</div>
                  <div className="text-sm font-light text-neutral-400">{m.s}</div>
                </div>
                <Pill kind="built" locale={locale} />
              </div>
            ))}
          </div>
        </section>

        {/* 10 — closing phrase */}
        <section className="relative z-10 edge-t px-6 py-28 text-center md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-3xl">
            <Snum>{t.s10}</Snum>
            <p className="metal-shine mx-auto max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              {t.s10Phrase}
            </p>
            <p className="track-wide mt-8 text-xs text-seal">{t.eyebrow}</p>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-32 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={96} height={128} title={t.logoTitle} />
              <ProofSeal size={128} locale={locale} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-3xl font-medium md:text-5xl">
              {t.ctaTitle}
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">{t.ctaLead}</p>
            <CtaForm locale={locale} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 edge-t px-6 py-12 md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-neutral-400 md:flex-row">
          <div className="flex items-center gap-3">
            <IronProofLogo width={20} height={27} />
            <span className="track-logo iron-text font-semibold">IRONPROOF</span>
          </div>
          <span className="font-light">{t.footer}</span>
        </div>
      </footer>

      <FadeUpInit />
    </div>
  );
}
