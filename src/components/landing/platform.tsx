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
