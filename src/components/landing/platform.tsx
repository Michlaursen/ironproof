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
          <ul className="fade-up mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {m.verdicts.map((v) => (
              <li key={v.word} className="border-t border-white/10 pt-6">
                <p className="font-serif text-3xl text-neutral-100">{v.word}</p>
                <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{v.body}</p>
                <p className="mt-4 text-sm font-light leading-relaxed text-neutral-200">{v.receive}</p>
              </li>
            ))}
          </ul>
          <div className="fade-up card-premium mt-14 max-w-3xl p-8">
            <p className="font-serif text-2xl text-neutral-100 md:text-3xl">{m.independent.title}</p>
            <p className="mt-4 text-base font-light leading-relaxed text-neutral-300">{m.independent.body}</p>
          </div>
          {/* The company line, alone and at hero scale: the second clause in the
            * same brushed steel as the hero's consequence (Dom, 2026-10-15). */}
          <p className="fade-up hero-serif mx-auto mt-28 max-w-5xl text-center font-serif font-normal text-neutral-100 md:mt-36">
            {m.foot.a}
            <br />
            <em className="iron-brushed not-italic font-semibold">{m.foot.b}</em>
          </p>
        </div>
      </section>

      <section id="applications" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up max-w-4xl">
            <p className="seal-label track-mid mb-5 text-xs">{t.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{t.title}</h2>
          </div>
          {/* The ruled box sits inside the fade-up wrapper, not on it: `.fade-up > li`
            * cascades each card 18 px down, which shows the box's grey fill. */}
          <div className="fade-up mt-14">
          <ol className="grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 md:grid-cols-3">
            {t.pillars.map((p) => (
              <li key={p.num} className="flex flex-col bg-ink px-7 py-9 md:px-8">
                <span className="num-badge font-serif text-2xl">{p.num}</span>
                <p className="track-mid mt-4 text-xs text-neutral-300">{p.name.toUpperCase()}</p>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-neutral-100">{p.claim}</h3>
                <p className="mt-4 flex-1 text-base font-light leading-relaxed text-neutral-400">{p.body}</p>
                <p className="mt-6 border-t border-white/10 pt-4 text-sm font-light leading-relaxed text-neutral-300">{p.evidence}</p>
                {p.href && p.cta ? (
                  <a
                    href={p.href}
                    className="track-mid mt-8 inline-flex items-center gap-2 self-start border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
                  >
                    {p.cta} <span aria-hidden="true">&darr;</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
          </div>
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
