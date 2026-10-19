import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { ProofSeal } from "@/components/landing/proof-seal";
import { VerifyArtifact } from "@/components/landing/verify-artifact";
import { type L, pick } from "@/components/landing/i18n";

/*
 * Two recordings. First the film (Dom, 2026-10-12: "quand ça ouvre ça doit
 * être la vidéo") -- the $7.2M transfer through the gate, 137 s, from
 * ironproof/demo/film (commit 3802a08, every voice-over line audited against
 * its proof; the film states its own limits at 1:51). Web encode of
 * ironproof-chain.mp4 (sha256 9b134702f12f7b75…), H.264 CRF 30.
 *
 * Then the two recordings moved here from /proof-intelligence (Dom,
 * 2026-10-19: the demos belong on the demo page): the Proof Intelligence
 * film, cut to 137 s without its "where it applies" scene, and the AGCO
 * deposit-limit demo.
 *
 * Then the terminal demo. That file stays at its original URL
 * (/media/ironproof-demo-a7f3c2.mp4): the link was already sent out, so it
 * must keep working -- the page embeds it, it does not move it.
 */
const FILM = "/media/ironproof-film.h264.mp4";
const FILM_POSTER = "/media/film-poster.jpg";
const VIDEO = "/media/ironproof-demo-a7f3c2.mp4";
const POSTER = "/media/demo-poster.jpg";
const PI_FILM = "/media/proof-intelligence-film.h264.mp4";
const PI_POSTER = "/media/proof-intelligence-film-poster.jpg";
const AGCO = "/media/agco-demo-v6.h264.mp4";
const AGCO_POSTER = "/media/agco-demo-v6-poster.jpg";
// The two receipts the recorded run wrote (ironproof/demo/cdl_receipt*.json,
// the accepted one carries the fingerprint 9e24ffff… shown in the video), and
// the blocked one with a single number edited, 50000 -> 900000.
const RECEIPTS = {
  allowed: "/demo/receipt-allowed.json",
  blocked: "/demo/receipt-blocked.json",
  tampered: "/demo/receipt-blocked-tampered.json",
};

const T: L<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  filmLabel: string;
  filmNote: string;
  piEyebrow: string;
  piLabel: string;
  piNote: string;
  agcoEyebrow: string;
  agcoLabel: string;
  agcoNote: string;
  termEyebrow: string;
  termTitle: string;
  termLead: string;
  steps: string[];
  limits: string;
  videoLabel: string;
  verifyCta: string;
  sealEyebrow: string;
  sealTitle: string;
  sealLead: string;
  sealNote: string;
  dlAllowed: string;
  dlBlocked: string;
}> = {
  en: {
    metaTitle: "Demo — Ironproof",
    metaDescription:
      "An AI agent wants to send CAD 7.2 million. Proven: no unsigned payment above CAD 5 million can be approved. The payment arrives unsigned, is blocked at the gate, and the refusal is sealed. Then the same engine in the terminal: a $50,000 transfer allowed, then blocked.",
    eyebrow: "DEMO",
    h1: "CAD 7.2 million. Should it go?",
    lead: "An AI agent wants to send CAD 7.2 million. The bank’s rule says no payment above CAD 5 million leaves without a second signature. Proven: without that signature, no single payment above the ceiling can be approved. Refuted: that the rule caps every payment; a signed one of any size passes. This payment arrives unsigned, and it is blocked at the gate.",
    filmLabel: "Film: a CAD 7.2 million payment by an AI agent, blocked at the gate",
    filmNote:
      "Animated film, 2 min 17 s, in English. The rule and its proof are real; the scene is an illustration. Near the end, the film says what this does not guard.",
    piEyebrow: "PROOF INTELLIGENCE",
    piLabel: "Film: Proof Intelligence, in under three minutes",
    piNote:
      "2 minutes 17 seconds, with sound. The payments in the film illustrate a payment policy; they are not a client case. The standards shown are the ones each sector already works under; naming a sector does not mean it uses Ironproof today.",
    agcoEyebrow: "AGCO DEMO",
    agcoLabel: "Demo: does a player’s deposit limit hold? Ontario Registrar’s Standards 2.23 and 2.24",
    agcoNote:
      "3 minutes 43 seconds, with sound; the mathematics section is on-screen text. The rule is quoted from the AGCO Registrar’s Standards for Internet Gaming, 2.23 and 2.24. Systems A, B and C and the twelve implementations are illustrative: of the eight that break, seven are common mistakes written on purpose and one comes from an open-source project. All are replayed through the same checker; no operator’s system was examined. Results hold within the bounds shown in the film: up to 8 events over 75 days. The 2023 penalty shown is quoted from an AGCO news release of November 9, 2023.",
    termEyebrow: "IN THE TERMINAL",
    termTitle: "One transfer. Allowed, then blocked.",
    termLead: "A $50,000 transfer clears the bank’s policy and is sealed. Then the account is frozen: the same transfer is blocked, the money never moves, and the refusal is sealed too.",
    steps: [
      "The bank’s rules become formal constraints.",
      "The transfer is checked against them before it executes.",
      "Every decision is sealed — Ed25519 + ML-DSA-65 — and re-checked offline.",
      "One edited number in the receipt, and both checks turn red.",
    ],
    limits:
      "Recorded in the terminal on the real engine, 75 seconds. A sample bank policy, not a customer deployment.",
    videoLabel: "Terminal demo: a transfer allowed, then blocked, each decision sealed",
    verifyCta: "More on verifying a sealed record →",
    sealEyebrow: "THE SEAL",
    sealTitle: "Check the refusal yourself.",
    sealLead:
      "This is the sealed receipt of the blocked transfer from the video. Verify it here, in your browser, without us. Then load the copy where one number was changed: $50,000 became $900,000. The seal breaks.",
    sealNote:
      "Checked in this tab: both signatures (Ed25519 + ML-DSA-65) and the content hash. The receipts are signed with a demo key, not a customer key.",
    dlAllowed: "Download the allowed receipt (JSON)",
    dlBlocked: "Download the blocked receipt (JSON)",
  },
  fr: {
    metaTitle: "Démo — Ironproof",
    metaDescription:
      "Un agent IA veut envoyer 7,2 millions $ CA. Prouvé : aucun paiement non signé de plus de 5 millions $ CA ne peut être approuvé. Le paiement arrive sans signature, il est bloqué à la barrière, et le refus est scellé. Puis le même moteur dans le terminal : un virement de 50 000 $ autorisé, puis bloqué.",
    eyebrow: "DÉMO",
    h1: "7,2\u00a0millions\u00a0$\u00a0CA. Doit-il partir\u00a0?",
    lead: "Un agent IA veut envoyer 7,2 millions $ CA. La règle de la banque dit qu’aucun paiement de plus de 5 millions $ CA ne part sans une deuxième signature. Prouvé : sans cette signature, aucun paiement unique au-dessus du plafond ne peut être approuvé. Réfuté : que la règle plafonne tout paiement ; un paiement signé de n’importe quel montant passe. Ce paiement arrive sans signature, et il est bloqué à la barrière.",
    filmLabel: "Film : un paiement de 7,2 millions $ CA par un agent IA, bloqué à la barrière",
    filmNote:
      "Film d’animation, 2 min 17 s, en anglais. La règle et sa preuve sont réelles ; la scène est une illustration. Vers la fin, le film dit ce que cela ne protège pas.",
    piEyebrow: "PROOF INTELLIGENCE",
    piLabel: "Film : Proof Intelligence, en moins de trois minutes",
    piNote:
      "2 minutes 17 secondes, avec son, en anglais. Les paiements du film illustrent une politique de paiement ; ce n’est pas un cas client. Les normes montrées sont celles sous lesquelles chaque secteur travaille déjà ; nommer un secteur ne veut pas dire qu’il utilise Ironproof aujourd’hui.",
    agcoEyebrow: "DÉMO AGCO",
    agcoLabel: "Démo : la limite de dépôt d’un joueur tient-elle\u00a0? Normes du registrateur de l’Ontario 2.23 et 2.24",
    agcoNote:
      "3 minutes 43 secondes, avec son, en anglais ; la partie mathématique est en texte à l’écran. La règle est citée des normes du registrateur de l’AGCO pour les jeux en ligne, 2.23 et 2.24. Les systèmes A, B et C et les douze implémentations sont illustratifs : des huit qui cassent, sept sont des erreurs courantes écrites exprès et une vient d’un projet libre. Toutes passent par le même vérificateur ; aucun système d’exploitant n’a été examiné. Les résultats tiennent dans les bornes montrées dans le film : jusqu’à 8 événements sur 75 jours. La pénalité de 2023 montrée est citée d’un communiqué de l’AGCO du 9 novembre 2023.",
    termEyebrow: "DANS LE TERMINAL",
    termTitle: "Un virement. Autorisé, puis bloqué.",
    termLead: "Un virement de 50 000 $ respecte la politique de la banque et il est scellé. Puis le compte est gelé : le même virement est bloqué, l’argent ne bouge jamais, et le refus est scellé lui aussi.",
    steps: [
      "Les règles de la banque deviennent des contraintes formelles.",
      "Le virement est vérifié contre elles avant de s’exécuter.",
      "Chaque décision est scellée — Ed25519 + ML-DSA-65 — et revérifiée hors ligne.",
      "Un seul chiffre modifié dans le reçu, et les deux contrôles passent au rouge.",
    ],
    limits:
      "Enregistrée dans le terminal sur le vrai moteur, 75 secondes, en anglais. Une politique bancaire d’exemple, pas un déploiement client.",
    videoLabel: "Démo terminal : un virement autorisé, puis bloqué, chaque décision scellée",
    verifyCta: "En savoir plus sur la vérification d’une trace scellée →",
    sealEyebrow: "LE SCEAU",
    sealTitle: "Vérifiez le refus vous-même.",
    sealLead:
      "Voici le reçu scellé du virement bloqué dans la vidéo. Vérifiez-le ici, dans votre navigateur, sans nous. Puis chargez la copie où un seul chiffre a changé\u00a0: 50\u00a0000\u00a0$ est devenu 900\u00a0000\u00a0$. Le sceau casse.",
    sealNote:
      "Vérifié dans cet onglet\u00a0: les deux signatures (Ed25519 + ML-DSA-65) et l’empreinte du contenu. Les reçus sont signés avec une clé de démonstration, pas une clé client.",
    dlAllowed: "Télécharger le reçu autorisé (JSON)",
    dlBlocked: "Télécharger le reçu bloqué (JSON)",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/demo" : `/${locale}/demo`;
  const { metaTitle: title, metaDescription: description } = pick(T, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path}`,
      languages: { en: "/demo", fr: "/fr/demo", "x-default": "/demo" },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(T, locale);
  const verifyHref = locale === "en" ? "/verify" : `/${locale}/verify`;

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="demo" />
      <main className="blueprint">
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-32 md:px-14">
          <div className="pointer-events-none absolute right-6 top-24 hidden opacity-40 lg:block xl:opacity-55">
            <ProofSeal size={240} locale={locale} />
          </div>
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
        </section>
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 md:px-14">
          {/* The film opens the page. Controls on and no autoplay: a recording
            * to watch, not a background loop like the home page's gate. */}
          <figure className="overflow-hidden rounded-[6px] border border-white/10">
            <video
              className="block h-auto w-full"
              width={1920}
              height={1080}
              poster={FILM_POSTER}
              controls
              playsInline
              preload="metadata"
              aria-label={t.filmLabel}
            >
              <source src={FILM} type="video/mp4" />
            </video>
          </figure>
          <p className="mt-6 max-w-2xl text-sm text-neutral-500">{t.filmNote}</p>
        </section>
        {[
          { eyebrow: t.piEyebrow, src: PI_FILM, poster: PI_POSTER, label: t.piLabel, note: t.piNote },
          { eyebrow: t.agcoEyebrow, src: AGCO, poster: AGCO_POSTER, label: t.agcoLabel, note: t.agcoNote },
        ].map((v) => (
          <section key={v.src} className="relative z-10 edge-t mx-auto max-w-5xl px-6 pb-24 pt-24 md:px-14">
            <p className="seal-label track-mid mb-6 text-xs">{v.eyebrow}</p>
            <figure className="fade-up overflow-hidden rounded-[6px] border border-white/10">
              <video
                className="block h-auto w-full"
                width={1920}
                height={1080}
                poster={v.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={v.label}
              >
                <source src={v.src} type="video/mp4" />
              </video>
            </figure>
            <p className="mt-6 max-w-2xl text-sm text-neutral-500">{v.note}</p>
          </section>
        ))}
        <section className="relative z-10 edge-t mx-auto max-w-5xl px-6 pb-24 pt-24 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">{t.termEyebrow}</p>
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">{t.termTitle}</h2>
          <p className="mb-10 mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.termLead}</p>
          <figure className="fade-up overflow-hidden rounded-[6px] border border-white/10">
            <video
              className="block h-auto w-full"
              width={1540}
              height={1036}
              poster={POSTER}
              controls
              playsInline
              preload="metadata"
              aria-label={t.videoLabel}
            >
              <source src={VIDEO} type="video/mp4" />
            </video>
          </figure>
          <ol className="mt-10 grid gap-4 text-neutral-300 sm:grid-cols-2">
            {t.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="seal-label text-xs leading-7">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-light">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm text-neutral-500">{t.limits}</p>
        </section>
        <section className="relative z-10 edge-t pt-24 pb-24">
          <div className="mx-auto max-w-5xl px-6 md:px-14">
            <p className="seal-label track-mid mb-4 text-xs">{t.sealEyebrow}</p>
            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">{t.sealTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.sealLead}</p>
            <p className="mt-3 max-w-2xl text-sm font-light text-neutral-500">{t.sealNote}</p>
          </div>
          <div className="mt-10">
            <VerifyArtifact
              locale={locale}
              heading={false}
              id="seal"
              demos={{ verified: RECEIPTS.blocked, tampered: RECEIPTS.tampered }}
            />
          </div>
          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-1 px-6 text-sm md:px-14">
            <a href={RECEIPTS.blocked} download className="inline-flex min-h-11 items-center text-neutral-300 underline-offset-4 hover:underline">
              {t.dlBlocked}
            </a>
            <a href={RECEIPTS.allowed} download className="inline-flex min-h-11 items-center text-neutral-300 underline-offset-4 hover:underline">
              {t.dlAllowed}
            </a>
            <Link href={verifyHref} className="inline-flex min-h-11 items-center text-neutral-200 underline-offset-4 hover:underline">
              {t.verifyCta}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
