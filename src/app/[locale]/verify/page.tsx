import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { VerifyArtifact } from "@/components/landing/verify-artifact";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/verify" : `/${locale}/verify`;
  const title = "Verify a sealed proof — Ironproof";
  const description =
    "Paste a sealed Ironproof dossier and verify it entirely in your own browser: SHA3-512 chain, Ed25519 and ML-DSA-65 signatures, in pure JavaScript. No server call, no account, nothing sent to us. Two deliberately tampered dossiers are provided so you can watch a forgery be rejected.";

  return {
    title,
    description,
    alternates: { canonical: `https://ironproof.ai${path}` },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function VerifyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-32 md:px-14">
          <p className="track-mid mb-4 text-xs text-neutral-400">VERIFY IT YOURSELF</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            Do not trust us. Check.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
            The verification below runs entirely in this tab. The SHA3-512 chain, the Ed25519
            signature and the post-quantum ML-DSA-65 signature are all checked in pure JavaScript,
            with no request to any server and no account with anyone. Two of the sample dossiers have
            been tampered with on purpose, so you can watch a forgery be rejected rather than take
            our word that it would be.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-light text-neutral-400">
            The exact bytes a dossier commits to are published in the{" "}
            <a href="/sceal/SPEC_CANON.md" className="underline underline-offset-4">
              wire specification
            </a>
            , so an independent verifier can be written in any language, by anyone, without our code.
          </p>
        </section>
        <VerifyArtifact />
      </main>
    </div>
  );
}
