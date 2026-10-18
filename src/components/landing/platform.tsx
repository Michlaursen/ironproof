import Image from "next/image";
import { defaultLocale, type Locale } from "@/content";
import { pick } from "./i18n";
import { PLATFORM_COPY } from "./platform-copy";

/*
 * Right below the hero (mockup 2026-10-15): what you receive first -- the
 * three verdicts and how to check them -- then the three applications. Copy and the reading behind each claim live
 * in platform-copy.ts. The agent pillar points down to the sections that
 * already show the gate (#problem onward).
 */
/* One image per application, same order as the pillars. */
// One family with the trio (Dom, 2026-10-15): marble, iron and gold, one object each.
const APP_IMAGES = ["/media/app-gate.jpg", "/media/app-c-chip.jpg", "/media/app-legacy-reel.jpg"] as const;

export function Platform({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(PLATFORM_COPY, locale);

  return (
    <>
      <section id="applications" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up max-w-4xl">
            <p className="seal-label track-mid mb-5 text-xs">{t.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{t.title}</h2>
          </div>
          {/* Three chapters, editorial (Dom, 2026-10-15: "bien plus premium"): one
            * large image per application in the marble, iron and gold family,
            * the text set like a catalogue page, no boxes; alternating sides. */}
          <ol className="apps-chapters mt-20">
            {t.pillars.map((p, i) => (
              <li key={p.num} id={`app-${p.num}`} className={`chapter scroll-mt-24 ${i % 2 === 1 ? "chapter-flip" : ""}`}>
                <div className="chapter-media fade-up">
                  <Image src={APP_IMAGES[i] ?? APP_IMAGES[0]} alt="" fill sizes="(min-width: 900px) 46vw, 100vw" className="object-cover" />
                  <span className="plate-brackets" aria-hidden="true" />
                </div>
                <div className="chapter-text fade-up">
                  <p className={`chapter-status track-mid ${p.available ? "chapter-status-live" : ""}`}>{p.status}</p>
                  <div className="chapter-head">
                    <span className="chapter-num font-serif">{p.num}</span>
                    <span className="chapter-name track-mid">{p.name.toUpperCase()}</span>
                  </div>
                  <h3 className="chapter-claim font-serif">{p.claim}</h3>
                  <dl className="chapter-beats">
                    <div className="chapter-beat">
                      <dt className="track-mid">{t.beats.risk}</dt>
                      <dd>{p.risk}</dd>
                    </div>
                    <div className="chapter-beat">
                      <dt className="track-mid">{t.beats.does}</dt>
                      <dd>{p.body}</dd>
                    </div>
                    {p.evidence ? (
                      <div className="chapter-beat chapter-beat-today">
                        <dt className="track-mid">{t.beats.today}</dt>
                        <dd>{p.evidence}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {p.href && p.cta ? (
                    <a href={p.href} className="chapter-cta track-mid">
                      {p.cta} <span aria-hidden="true">{p.href.startsWith("#") ? "\u2193" : "\u2192"}</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

/* Why Ironproof exists and the company line, read right after the hero
 * (Dom, 2026-10-16: « doit être au début, faut que ça hit »). */
export function NorthStar({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(PLATFORM_COPY, locale);
  const m = t.method;

  return (
    <>
      {/* Why Ironproof exists, read just before the company line (Dom, 2026-10-16). */}
      <section id="north-star" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up max-w-4xl">
            <p className="seal-label track-mid mb-5 text-xs">{t.northStar.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{t.northStar.title}</h2>
            {t.northStar.paragraphs.map((para) => (
              <p key={para} className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
                {para}
              </p>
            ))}
            <p className="mt-10 font-serif text-2xl font-medium md:text-3xl">{t.northStar.lead}</p>
            <p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{t.northStar.body}</p>
            <p className="metal-text mt-10 font-serif text-3xl font-medium md:text-4xl">{t.northStar.close}</p>
          </div>
        </div>
      </section>

      {/* The company line as a manifesto: one iron band, the two clauses, a gold hairline. */}
      <section className="manifesto relative z-10">
        <div className="manifesto-inner">
          <span className="manifesto-rule" aria-hidden="true" />
          <p className="manifesto-a font-serif">{m.foot.a}</p>
          <p className="manifesto-b font-serif">{m.foot.b}</p>
          <span className="manifesto-rule" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}

/* Four things the engine does, right after the North Star, each with the run
 * that backs it and a link to check it (Dom, 2026-10-16). */
export function UseCases({ locale = defaultLocale }: { locale?: Locale }) {
  const u = pick(PLATFORM_COPY, locale).useCases;

  return (
    <section id="use-cases" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up max-w-4xl">
          <p className="seal-label track-mid mb-5 text-xs">{u.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{u.title}</h2>
        </div>
        {/* One product in front; the other three are the same engine, on mandate (review, Dom go 2026-10-17). */}
        {u.cards.slice(0, 1).map((c) => (
          <div key={c.name} className="fade-up mt-16 border-t border-white/10 pt-6">
            <h3 className="font-serif text-3xl text-neutral-100 md:text-4xl">{c.name}</h3>
            <p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{c.body}</p>
            <a
              href={c.href}
              className="track-mid mt-6 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
            >
              {c.cta} <span aria-hidden="true">&rarr;</span>
            </a>
            <div className="mt-10 max-w-3xl">
              <p className="seal-label track-mid mb-3 text-xs">{u.plugsInLabel}</p>
              <p className="text-base font-light leading-relaxed text-neutral-400">{u.plugsIn}</p>
            </div>
          </div>
        ))}
        {/* The three mandates as cards with what the client walks away with (Dom 2026-10-17: « met le plus impactant, c trop facile pass by »). */}
        <div className="fade-up mt-20 border-t border-white/10 pt-10">
          <h3 className="metal-text font-serif text-3xl font-medium leading-tight md:text-5xl">{u.alsoTitle}</h3>
          <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-neutral-400 md:text-lg">{u.alsoLead}</p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {u.cards.slice(1).map((c, i) => (
              <li key={c.name}>
                <a
                  href={c.href}
                  className="group flex h-full flex-col rounded-[6px] border border-white/10 bg-ink/60 p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  style={{ borderTop: "2px solid #c9a24a" }}
                >
                  <span className="num-badge font-serif text-2xl">{String(i + 2).padStart(2, "0")}</span>
                  <span className="mt-3 font-serif text-2xl text-neutral-100">{c.name}</span>
                  <span className="mt-3 flex-1 text-base font-light leading-relaxed text-neutral-300">{u.alsoLines[i]}</span>
                  <span className="track-mid mt-6 inline-flex items-center gap-2 text-xs text-neutral-200 transition group-hover:text-white">
                    {c.cta} <span aria-hidden="true" className="transition group-hover:translate-x-1">&rarr;</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href={u.alsoHref}
            className="track-mid mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
          >
            {u.alsoCta} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* Three buyer benefits, right after the use cases (Dom, 2026-10-16). */
export function WhyIronproof({ locale = defaultLocale }: { locale?: Locale }) {
  const w = pick(PLATFORM_COPY, locale).whyUs;

  return (
    <section id="why-ironproof" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up max-w-4xl">
          <p className="seal-label track-mid mb-5 text-xs">{w.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{w.title}</h2>
        </div>
        <ol className="fade-up mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {w.items.map((it, i) => (
            <li key={it.title} className="border-t border-white/10 pt-6">
              <span className="num-badge font-serif text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl text-neutral-100">{it.title}</h3>
              <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

