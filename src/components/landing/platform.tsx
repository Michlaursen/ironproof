import Image from "next/image";
import { defaultLocale, type Locale } from "@/content";
import { pick } from "./i18n";
import { PLATFORM_COPY } from "./platform-copy";
import { PAPERS } from "./credibility";

/*
 * Right below the hero (mockup 2026-10-15): what you receive first -- the
 * three verdicts and how to check them -- then the three applications. Copy and the reading behind each claim live
 * in platform-copy.ts. The agent pillar points down to the sections that
 * already show the gate (#problem onward).
 */
/* One image per application, same order as the pillars. */
const APP_IMAGES = ["/media/ill-gate-arch.jpg", "/media/ill-c-chip.jpg", "/media/ill-legacy-reel.jpg"] as const;

export function Platform({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(PLATFORM_COPY, locale);
  const m = t.method;
  const rs = t.research;
  const r = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <>
      <section id="method" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up max-w-4xl">
            <p className="seal-label track-mid mb-5 text-xs">{m.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{m.title}</h2>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{m.lead}</p>
            <p className="mt-5 max-w-3xl text-base font-light leading-relaxed text-neutral-400 md:text-lg">{m.body}</p>
          </div>
          {/* Three verdicts, three cards, each with its own mark (Dom, 2026-10-15):
            * a full disc for proven, a broken line for refuted, an open dashed
            * ring for not demonstrated. */}
          <ul className="fade-up verdict-grid mt-14">
            {m.verdicts.map((v, i) => (
              <li key={v.word} className={`verdict-card verdict-${["proven", "refuted", "open"][i]}`}>
                <span className="verdict-mark" aria-hidden="true" />
                <p className="verdict-word font-serif">{v.word}</p>
                <p className="verdict-body">{v.body}</p>
                <p className="verdict-receive">{v.receive}</p>
              </li>
            ))}
          </ul>
          {/* Two checks, two panels: the seal in the browser, the proof in a solver. */}
          <div className="fade-up checks mt-16">
            <p className="checks-title font-serif">{m.independent.title}</p>
            <div className="checks-split">
              <div className="checks-panel checks-browser">
                <p className="checks-where track-mid">{m.independent.browser.where}</p>
                <p className="checks-what font-serif">{m.independent.browser.what}</p>
                <p className="checks-body">{m.independent.browser.body}</p>
                <p className="checks-proves track-mid">{m.independent.browser.proves}</p>
              </div>
              <div className="checks-panel checks-solver">
                <p className="checks-where track-mid">{m.independent.solver.where}</p>
                <p className="checks-what font-serif">{m.independent.solver.what}</p>
                <p className="checks-body">{m.independent.solver.body}</p>
                <p className="checks-proves track-mid">{m.independent.solver.proves}</p>
              </div>
            </div>
            <p className="checks-note">{m.independent.note}</p>
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
                </div>
                <div className="chapter-text fade-up">
                  <div className="chapter-head">
                    <span className="chapter-num font-serif">{p.num}</span>
                    <span className="chapter-name track-mid">{p.name.toUpperCase()}</span>
                  </div>
                  <h3 className="chapter-claim font-serif">{p.claim}</h3>
                  <p className="chapter-body">{p.body}</p>
                  <p className="chapter-evidence">{p.evidence}</p>
                  {p.href && p.cta ? (
                    <a href={p.href} className="chapter-cta track-mid">
                      {p.cta} <span aria-hidden="true">&darr;</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The same PAPERS list as /research: one source, never re-typed. */}
      <section id="papers" className="papers-band relative z-10 px-6 py-28 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up max-w-4xl">
            <p className="seal-label track-mid mb-5 text-xs">{rs.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{rs.title}</h2>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{rs.lead}</p>
          </div>
          {/* An editorial index, not cards (Dom, 2026-10-15: "BIN PLUS PREMIUM").
            * The field is read from the paper's own title. */}
          <ol className="fade-up papers-index mt-16">
            {PAPERS.map((paper, i) => (
              <li key={paper.id}>
                <a href={paper.href} target="_blank" rel="noopener noreferrer" className="paper-row">
                  <span className="paper-row-num font-serif">{String(i + 1).padStart(2, "0")}</span>
                  <span className="paper-row-main">
                    <span className="paper-row-field track-mid">{rs.fields[i] ?? ""}</span>
                    <span className="paper-row-title font-serif">{paper.title}</span>
                  </span>
                  <span className="paper-row-side">
                    <span className="paper-row-id">{paper.id}</span>
                    <span className="paper-row-read track-mid">
                      {rs.read} <span aria-hidden="true">&#8599;</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href={`${r}/research`}
            className="track-mid mt-10 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
          >
            {rs.cta} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
}
