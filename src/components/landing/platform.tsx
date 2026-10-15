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
/* One fine-line technical drawing per application (Dom, 2026-10-15). Shapes
 * only, no text: 01 an action graph where three paths pass the gate and one is
 * stopped at it; 02 a state graph with the counterexample path; 03 two program
 * flows converging on one equivalent result. */
function AppFigure({ num }: { num: string }) {
  if (num === "01") {
    return (
      <svg className="app-fig" viewBox="0 0 240 90" aria-hidden="true">
        {[18, 38, 58, 78].map((y) => (
          <circle key={y} cx="14" cy={y} r="3.2" className="fig-node" />
        ))}
        <path d="M18 18 C70 18 90 40 120 42 M18 38 C70 38 90 44 120 44 M18 58 C70 58 90 48 120 46" className="fig-pass" />
        <path d="M18 78 C60 78 92 72 112 66" className="fig-stop" />
        <path d="M108 62 l8 8 M116 62 l-8 8" className="fig-x" />
        <rect x="120" y="24" width="6" height="42" className="fig-gate" />
        <path d="M126 45 C160 45 190 45 222 45" className="fig-pass" />
        <circle cx="226" cy="45" r="4.5" className="fig-goal" />
      </svg>
    );
  }
  if (num === "02") {
    const nodes: Array<[number, number]> = [[20, 45], [70, 22], [70, 68], [125, 12], [125, 38], [125, 62], [180, 30], [180, 75], [225, 75]];
    return (
      <svg className="app-fig" viewBox="0 0 240 90" aria-hidden="true">
        <path d="M20 45 L70 22 M20 45 L70 68 M70 22 L125 12 M70 22 L125 38 M70 68 L125 62 M125 38 L180 30" className="fig-edge" />
        <path d="M20 45 L70 68 L125 62 L180 75 L225 75" className="fig-cex" />
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" className="fig-node" />
        ))}
        <path d="M220 70 l10 10 M230 70 l-10 10" className="fig-x" />
      </svg>
    );
  }
  return (
    <svg className="app-fig" viewBox="0 0 240 90" aria-hidden="true">
      <path d="M14 20 L60 20 L90 30 L130 30 L170 42 L206 45" className="fig-edge" />
      <path d="M14 70 L52 70 L84 62 L124 62 L168 50 L206 45" className="fig-edge" />
      {[[14, 20], [60, 20], [90, 30], [130, 30], [170, 42], [14, 70], [52, 70], [84, 62], [124, 62], [168, 50]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className="fig-node" />
      ))}
      <circle cx="214" cy="45" r="8" className="fig-goal-ring" />
      <path d="M209 42.5 h10 M209 47.5 h10" className="fig-eq" />
    </svg>
  );
}

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
          {/* Three panels, larger and separate (Dom, 2026-10-15): the number as
            * the entry, the claim as the headline, today's evidence set apart. */}
          <ol className="fade-up apps-grid mt-14">
            {t.pillars.map((p) => (
              <li key={p.num} id={`app-${p.num}`} className="app-panel scroll-mt-24">
                <div className="app-head">
                  <span className="app-num font-serif">{p.num}</span>
                  <p className="app-name track-mid">{p.name.toUpperCase()}</p>
                </div>
                <AppFigure num={p.num} />
                <h3 className="app-claim font-serif">{p.claim}</h3>
                <p className="app-body">{p.body}</p>
                <p className="app-evidence">{p.evidence}</p>
                {p.href && p.cta ? (
                  <a href={p.href} className="app-cta track-mid">
                    {p.cta} <span aria-hidden="true">&darr;</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The same PAPERS list as /research: one source, never re-typed. */}
      <section id="papers" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up max-w-4xl">
            <p className="seal-label track-mid mb-5 text-xs">{rs.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{rs.title}</h2>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{rs.lead}</p>
          </div>
          <div className="fade-up mt-14 space-y-3">
            {PAPERS.map((paper) => (
              <a
                key={paper.id}
                href={paper.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium group flex flex-col gap-2 p-5 transition sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="metal-text shrink-0 font-mono text-xs">{paper.id}</span>
                <span className="flex-1 text-sm font-light leading-snug text-neutral-300">{paper.title}</span>
              </a>
            ))}
          </div>
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
