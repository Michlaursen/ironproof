import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { RESEARCH_COPY } from "@/components/landing/research-copy";
import { COVERAGE, PAPERS } from "@/components/landing/credibility";
import { EngineState } from "@/components/landing/engine-state";

/*
 * The research index. Before it existed, trimming the note's URL back to
 * /research returned a 404 — the one move a reviewer makes to see what else
 * we have published.
 *
 * English only, the same posture as the notes it lists: their French is
 * written but not native-reviewed (rule #78), so /fr/research serves this
 * English page with an English canonical and no fr hreflang.
 *
 * Titles and descriptions are read from each note's own copy, and the
 * papers from the same PAPERS list the home page renders — never re-typed
 * here, so the index cannot disagree with what it points at.
 */
const NOTES = [
  {
    slug: "/research/zero-barriers-one-reviewer",
    date: "2026-09-08",
    author: "Miguel Laursen",
    copy: RESEARCH_COPY.en,
  },
] as const;

const META = {
  title: "Research — Ironproof",
  description:
    "Research notes and published papers from Ironproof. Every figure traces to a cited source, and each note states what it does not show.",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: META.title,
    description: META.description,
    alternates: {
      canonical: "/research",
      languages: { en: "/research", "x-default": "/research" },
    },
    openGraph: {
      title: META.title,
      description: META.description,
      type: "website",
      url: "https://ironproof.ai/research",
      locale: "en_US",
    },
  };
}

export default async function ResearchIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="research-index" />
      <main className="blueprint">
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-32 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">RESEARCH</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            Research
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
            {META.description}
          </p>
        </section>
        <EngineState locale={locale} />
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 md:px-14">
          <ul className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
            {NOTES.map((n) => (
              <li key={n.slug}>
                <a href={n.slug} className="group block py-8">
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    <time dateTime={n.date}>{n.date}</time> · {n.author}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-100 group-hover:underline group-hover:underline-offset-4 md:text-3xl">
                    {n.copy.h1}
                  </h2>
                  <p className="mt-3 font-light text-neutral-400">{n.copy.meta.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 md:px-14">
          <h2 className="seal-label track-mid mb-4 text-xs">PUBLISHED PAPERS · ARXIV</h2>
          <ul className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
            {PAPERS.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-6"
                >
                  <p className="text-xs uppercase tracking-widest text-neutral-500">{p.id}</p>
                  <p className="mt-2 font-serif text-xl font-medium text-neutral-100 group-hover:underline group-hover:underline-offset-4">
                    {p.title}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-14">
          <h2 className="seal-label track-mid mb-6 text-xs">INDEPENDENT COVERAGE</h2>
          <div className="max-w-4xl space-y-6">
            {COVERAGE.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium group block p-7 sm:p-10 md:p-12"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className="metal-text font-serif text-2xl font-medium md:text-3xl">{c.outlet}</p>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {c.country} · <time dateTime={c.date}>{c.date}</time> · Editorial
                  </p>
                </div>
                <figure className="mt-8 border-l-2 border-[#a8843a] pl-4 sm:pl-6 md:mt-10 md:pl-8">
                  <blockquote className="font-serif text-xl font-medium leading-snug text-neutral-100 sm:text-2xl md:text-[2.1rem] md:leading-[1.25]">
                    {c.quoteEn}
                  </blockquote>
                  <p lang="de" className="mt-4 text-sm font-light italic leading-relaxed text-neutral-500">
                    “{c.quote}”
                  </p>
                  <figcaption className="mt-3 text-xs uppercase tracking-widest text-neutral-500">
                    Translated from the {c.language} · on {c.paper}
                  </figcaption>
                </figure>
                <div className="mt-8 flex flex-col gap-5 border-t border-[rgba(36,38,42,0.12)] pt-6 sm:flex-row sm:items-end sm:justify-between md:mt-10">
                  <div className="min-w-0 sm:flex-1">
                    <p lang="de" className="font-serif text-lg text-neutral-200">{c.title}</p>
                    <p className="mt-1 text-sm font-light text-neutral-500">{c.gloss}</p>
                  </div>
                  <span className="track-mid inline-flex shrink-0 items-center gap-2 text-xs text-[#7a5c22]">
                    READ THE ARTICLE
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
