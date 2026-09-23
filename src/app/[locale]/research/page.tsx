import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { RESEARCH_COPY } from "@/components/landing/research-copy";

/*
 * The research index. Before it existed, trimming the note's URL back to
 * /research returned a 404 — the one move a reviewer makes to see what else
 * we have published.
 *
 * English only, the same posture as the notes it lists: their French is
 * written but not native-reviewed (rule #78), so /fr/research serves this
 * English page with an English canonical and no fr hreflang.
 *
 * Titles and descriptions are read from each note's own copy, never
 * re-typed here, so the index cannot disagree with the note it points at.
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
    "Dated research notes from Ironproof. Every figure traces to a cited primary source, and each note states what it does not show.",
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
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-32 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">RESEARCH</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            Research notes
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
            {META.description}
          </p>
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-14">
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
      </main>
    </div>
  );
}
