import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { ProofSeal } from "@/components/landing/proof-seal";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { VerifyArtifact } from "@/components/landing/verify-artifact";
import { type L, pick } from "@/components/landing/i18n";

const T: L<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  specPre: string;
  specLink: string;
  specPost: string;
}> = {
  en: {
    metaTitle: "Verify a sealed proof — Ironproof",
    metaDescription:
      "Paste a sealed Ironproof dossier and verify it entirely in your own browser: SHA3-512 chain, Ed25519 and ML-DSA-65 signatures, in pure JavaScript. No server call, no account, nothing sent to us. Two deliberately tampered dossiers are provided so you can watch a forgery be rejected.",
    eyebrow: "VERIFY IT YOURSELF",
    h1: "Do not trust us. Check.",
    lead: "The verification below runs entirely in this tab. The SHA3-512 chain, the Ed25519 signature and the post-quantum ML-DSA-65 signature are all checked in pure JavaScript, with no request to any server and no account with anyone. Two of the sample dossiers have been tampered with on purpose, so you can watch a forgery be rejected rather than take our word that it would be.",
    specPre: "The exact bytes a dossier commits to are published in the ",
    specLink: "wire specification",
    specPost:
      ", so an independent verifier can be written in any language, by anyone, without our code.",
  },
  fr: {
    metaTitle: "Vérifier une preuve scellée — Ironproof",
    metaDescription:
      "Collez un dossier Ironproof scellé et vérifiez-le entièrement dans votre propre navigateur\u00a0: chaîne SHA3-512, signatures Ed25519 et ML-DSA-65, en JavaScript pur. Aucun appel serveur, aucun compte, rien ne nous est envoyé. Deux dossiers volontairement altérés sont fournis pour que vous voyiez un faux se faire rejeter.",
    eyebrow: "VÉRIFIEZ VOUS-MÊME",
    h1: "Ne nous croyez pas. Vérifiez.",
    lead: "La vérification ci-dessous tourne entièrement dans cet onglet. La chaîne SHA3-512, la signature Ed25519 et la signature post-quantique ML-DSA-65 sont toutes contrôlées en JavaScript pur, sans une seule requête vers un serveur et sans compte chez qui que ce soit. Deux des dossiers d’exemple ont été altérés exprès\u202f: vous voyez un faux se faire rejeter au lieu de nous croire sur parole.",
    specPre: "Les octets exacts sur lesquels un dossier s’engage sont publiés dans la ",
    specLink: "spécification du format",
    specPost:
      ", donc un vérificateur indépendant peut être écrit dans n’importe quel langage, par n’importe qui, sans notre code.",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/verify" : `/${locale}/verify`;
  const { metaTitle: title, metaDescription: description } = pick(T, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path}`,
      languages: { en: "/verify", fr: "/fr/verify", "x-default": "/verify" },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function VerifyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(T, locale);

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="verify" />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-32 md:px-14">
          {/* The seal is what both of these pages are about, so it anchors the
            * empty half instead of decorating it. Behind the text on narrow
            * screens, beside it once there is room. */}
          <div className="pointer-events-none absolute right-0 top-24 hidden opacity-40 lg:right-14 lg:block xl:opacity-55">
            <ProofSeal size={300} locale={locale} />
          </div>
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <div className="hairline-gold mt-8 h-px w-full max-w-md" />
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">
            {t.lead}
          </p>
          <p className="mt-4 max-w-2xl text-sm font-light text-neutral-400">
            {t.specPre}
            <a href="/sceal/SPEC_CANON.md" className="link-seal">
              {t.specLink}
            </a>
            {t.specPost}
          </p>
        </section>
        <VerifyArtifact locale={locale} />
      </main>
    </div>
  );
}
