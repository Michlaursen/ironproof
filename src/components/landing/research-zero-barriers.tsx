import { Fragment } from "react";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { defaultLocale, type Locale } from "@/content";
import { RESEARCH_COPY, type Block, type FigId } from "@/components/landing/research-copy";
import {
  TimelineChart,
  RunsChart,
  SpreadChart,
  DetectionChart,
  SectorChart,
} from "@/components/landing/research-charts";

/* Minimal inline renderer for the copy syntax: **bold**, *italic*, [label](/href).
   Deliberately tiny — the copy stays readable to a translator, and there is no
   markdown dependency to keep in step. */
function Rich({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="text-foreground">
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              className="text-foreground underline decoration-seal/45 underline-offset-4 transition hover:decoration-seal"
            >
              {link[1]}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Snum({ children }: { children: string }) {
  return <p className="track-mid mb-4 text-xs text-neutral-500">{children}</p>;
}

function Figure({ id, locale, cap, alt }: { id: FigId; locale: Locale; cap: string; alt: string }) {
  const chart =
    id === "timeline" ? (
      <TimelineChart locale={locale} label={alt} />
    ) : id === "runs" ? (
      <RunsChart locale={locale} label={alt} />
    ) : id === "spread" ? (
      <SpreadChart locale={locale} label={alt} />
    ) : id === "detection" ? (
      <DetectionChart locale={locale} label={alt} />
    ) : (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card-premium p-6">
          <SectorChart locale={locale} sector="finance" label={alt} />
        </div>
        <div className="card-premium p-6">
          <SectorChart locale={locale} sector="health" label={alt} />
        </div>
      </div>
    );

  /* Charts carry their labels inside the SVG, so legibility is a function of
     rendered width: inside the max-w-4xl prose column they land at ~808px,
     which drops 12.5px label text to 9.4px on screen. Two things fix that —
     the figure breaks out wider than the prose from lg up, and below that it
     scrolls horizontally against a min-width rather than shrinking the type. */
  return (
    <figure className="fade-up my-14 lg:-mx-16 xl:-mx-32">
      {id === "sectors" ? (
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">{chart}</div>
        </div>
      ) : (
        <div className="card-premium overflow-x-auto p-6 md:p-8">
          <div className="min-w-[1000px]">{chart}</div>
        </div>
      )}
      <figcaption className="track-mid edge-t mt-5 pt-4 text-[11px] leading-relaxed text-neutral-500">
        {cap}
      </figcaption>
    </figure>
  );
}

function Blocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="mb-5 max-w-2xl font-light leading-relaxed text-neutral-300">
                <Rich>{b.text}</Rich>
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="mb-4 mt-12 font-serif text-2xl font-normal text-foreground">
                {b.text}
              </h3>
            );
          case "pull":
            return (
              <blockquote key={i} className="card-premium my-10 max-w-2xl p-8">
                <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">{b.text}</p>
              </blockquote>
            );
          case "flag":
            return (
              <aside key={i} className="my-10 max-w-2xl rounded-md border border-seal/20 bg-surface-2 p-6">
                <p className="track-mid mb-2 text-[11px] text-seal">{b.head}</p>
                <p className="font-light leading-relaxed text-neutral-300">
                  <Rich>{b.text}</Rich>
                </p>
              </aside>
            );
          case "note":
            return (
              <aside key={i} className="card-premium my-10 max-w-2xl p-8">
                <p className="track-mid mb-3 text-[11px] text-seal">{b.head}</p>
                {b.text.map((t, j) => (
                  <p
                    key={j}
                    className="mb-4 font-light leading-relaxed text-neutral-300 last:mb-0"
                  >
                    <Rich>{t}</Rich>
                  </p>
                ))}
              </aside>
            );
          case "stats":
            return (
              <div key={i} className="my-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                {b.items.map(([n, l]) => (
                  <div key={n} className="bg-surface p-6">
                    <p className="mb-3 font-mono text-3xl leading-none text-seal">{n}</p>
                    <p className="text-sm leading-snug text-neutral-400">{l}</p>
                  </div>
                ))}
              </div>
            );
          case "ol":
            return (
              <ol key={i} className="my-8 max-w-2xl space-y-6">
                {b.items.map((t, j) => (
                  <li key={j} className="relative pl-11">
                    <span className="absolute left-0 top-1 font-mono text-xs text-seal">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span className="font-light leading-relaxed text-neutral-300">
                      <Rich>{t}</Rich>
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "fig":
            return <Figure key={i} id={b.id} locale={locale} cap={b.cap} alt={b.alt} />;
        }
      })}
    </>
  );
}

/*
 * `locale` selects the copy; `navLocale` selects the header links. They differ
 * while French is written but unreviewed: /fr serves the English note, and the
 * header still needs to point at /fr for the rest of the site.
 */
export function ResearchZeroBarriers({
  locale = defaultLocale,
  navLocale,
}: {
  locale?: Locale;
  navLocale?: Locale;
}) {
  const c = RESEARCH_COPY[locale] ?? RESEARCH_COPY.en;

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={navLocale ?? locale} />

      <main className="flex-1">
        {/* HERO */}
        <section id="top" className="relative z-10 px-6 pb-10 pt-24 md:px-14 md:pt-28">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-4xl">
            <p className="track-wide mb-6 text-xs text-neutral-400 md:text-sm">{c.eyebrow}</p>
            <h1 className="metal-shine mb-8 font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-6xl">
              {c.h1}
            </h1>
            <p className="max-w-2xl text-lg font-light leading-snug text-neutral-300 md:text-xl">
              {c.standfirst}
            </p>
            <div className="edge-t mt-10 flex max-w-2xl flex-col gap-2 pt-5">
              <p className="track-mid text-[11px] text-neutral-400">{c.byline}</p>
              <p className="text-sm font-light leading-relaxed text-neutral-500">{c.note}</p>
            </div>
          </div>
        </section>

        {/* LEDE */}
        <section className="relative z-10 mx-auto max-w-4xl px-6 pb-4 pt-10 md:px-14">
          <div className="fade-up">
            <p className="max-w-2xl font-serif text-2xl leading-snug text-foreground md:text-3xl">
              {c.lede}
            </p>
          </div>
        </section>

        {/* BODY */}
        {c.sections.map((s, i) => (
          <section
            key={i}
            id={s.num ? `s${i}` : undefined}
            className={`relative z-10 mx-auto max-w-4xl px-6 py-16 md:px-14 ${i > 0 ? "edge-t" : ""}`}
          >
            <div className="fade-up">
              {s.num && <Snum>{s.num}</Snum>}
              {s.h && (
                <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{s.h}</h2>
              )}
              <Blocks blocks={s.blocks} locale={locale} />
            </div>
          </section>
        ))}

        {/* RELATED */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-16 md:px-14">
          <div className="fade-up">
            <Snum>{c.related.head}</Snum>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {c.related.items.map(([href, title, sub]) => (
                <li key={href}>
                  <a href={href} className="group block py-1">
                    <span className="block text-base text-foreground transition group-hover:text-seal">
                      {title}
                    </span>
                    <span className="block text-sm text-neutral-500">{sub}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOURCES */}
        <section className="relative z-10 edge-t mx-auto max-w-4xl px-6 py-16 pb-28 md:px-14">
          <div className="fade-up">
            <Snum>{c.sources.head}</Snum>
            <ul className="max-w-3xl space-y-5">
              {c.sources.items.map(([href, title, note]) => (
                <li key={href} className="text-sm leading-relaxed">
                  <a
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-neutral-300 underline decoration-seal/45 underline-offset-4 transition hover:decoration-seal"
                  >
                    {title}
                  </a>
                  <span className="mt-1 block text-neutral-500">{note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl text-sm text-neutral-500">{c.sources.foot}</p>
          </div>
        </section>
      </main>

      {/* Every block above carries .fade-up, which is opacity:0 until this adds
          .in — without it the whole note renders blank. */}
      <FadeUpInit />
    </div>
  );
}
