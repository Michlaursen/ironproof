import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { ProofExplorer } from "@/components/landing/proof-explorer";
import { Credibility } from "@/components/landing/credibility";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/proof" : `/${locale}/proof`;
  const title = "The technical record — Ironproof";
  const description =
    "Inspect a sealed proof artifact field by field, and the public record behind the engine: published research, assigned CVEs and upstream acknowledgements credited by IBM, GnuPG, Mozilla, Red Hat, wolfSSL, VideoLAN and DCMTK.";

  return {
    title,
    description,
    alternates: { canonical: `https://ironproof.ai${path}` },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function ProofPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} active="proof" />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-32 md:px-14">
          <p className="track-mid mb-4 text-xs text-neutral-400">THE TECHNICAL RECORD</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            Read the proof, not the promise.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
            The artifact below is the same one a decision produces. Every field is inspectable, and
            the record underneath it is hosted by other people — we cannot write it, retract it or
            edit it.
          </p>
        </section>
        <ProofExplorer />
        <Credibility />
      </main>
    </div>
  );
}
