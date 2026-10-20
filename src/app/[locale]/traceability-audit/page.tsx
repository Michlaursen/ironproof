import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { type L, pick } from "@/components/landing/i18n";
import { TRACE_CHECKS, TRACE_NOTE } from "@/components/landing/traceability-copy";

/*
 * /traceability-audit -- the audit as a product of its own, in the PRODUCTS
 * menu (Dom, 2026-10-19: « ça doit être là, dans la section produits »).
 *
 * The audit opens the door; the behavior proof is the next sale, with its own
 * report (Dom, 2026-10-19: two separate reports). So this page sells the
 * audit and points at /modernization for the proof, never the reverse.
 *
 * No price and no "free" here, same rule as /pilot: the price is set with the
 * first buyers. No figure on any third-party translation: this repository is
 * public, and a translator identifiable without its name is still identified.
 */

type Item = { title: string; body: string };

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  checksEyebrow: string;
  checksTitle: string;
  verdictEyebrow: string;
  verdictTitle: string;
  verdicts: readonly Item[];
  forEyebrow: string;
  forTitle: string;
  audiences: readonly Item[];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: readonly Item[];
  faqEyebrow: string;
  faqTitle: string;
  faq: readonly Item[];
  proofPre: string;
  proofLink: string;
};

const COPY: L<Copy> = {
  en: {
    title: "Traceability audit — Ironproof",
    description:
      "A COBOL translation ships with paperwork: cited sources, data mapping, compliance sheets marked as passed. We check every one of those statements against the real code: confirmed, does not hold, or cannot be checked, with the reason.",
    eyebrow: "TRACEABILITY AUDIT",
    h1: "Your translation came with its paperwork. Who checked it?",
    lead: "When an AI tool or an integrator translates COBOL to Java, the code comes with documents: where each piece came from, how each field maps, which checks passed. Your reviewers, your auditor and the people who approve the switch all rely on them. We check whether those documents tell the truth.",
    cta: "Send us a translation",
    checksEyebrow: "WHAT WE CHECK",
    checksTitle: "Every statement in the paperwork, against the real code.",
    verdictEyebrow: "WHAT YOU RECEIVE",
    verdictTitle: "Each statement comes back with one of three answers.",
    verdicts: [
      { title: "Confirmed", body: "The code says what the document says. The report points to the file and the line." },
      { title: "Does not hold", body: "The code says something else: the paragraph is not there, the field has another size, the calculation is missing. Shown side by side." },
      { title: "Cannot be checked", body: "The document does not give enough to check it, or the code it points to was not delivered. Always with the reason, never counted as passed." },
    ],
    forEyebrow: "WHO IT IS FOR",
    forTitle: "Anyone who has to sign on paperwork they did not write.",
    audiences: [
      { title: "Migration integrators", body: "Show your client that your traceability holds, with a report from someone who did not do the translation." },
      { title: "Migration leads at banks and insurers", body: "Approve the switch on documents that have been checked, not on documents you have to take on faith." },
      { title: "Internal audit and IT compliance", body: "Sign a traceability you can actually control: every statement, its answer, and where to look." },
    ],
    stepsEyebrow: "HOW IT STARTS",
    stepsTitle: "One module first. Then the whole application. Then the proof.",
    steps: [
      { title: "A pilot on one module", body: "One program or one module, with its translation and its documents. The report comes back in a few days." },
      { title: "The full application", body: "The same audit on every program of the application, at a fixed price per application." },
      { title: "Then, the behavior proof", body: "Once the paperwork is checked, we look for where the new code no longer does what the old one did. That is a separate report." },
    ],
    faqEyebrow: "QUESTIONS WE HEAR",
    faqTitle: "Fair questions.",
    faq: [
      { title: "“Our tests are enough.”", body: "Your tests check the code. We check what your vendor says about the code. It is not the same thing." },
      { title: "“We trust our vendor.”", body: "Good. Then the audit will confirm it, and you will have it in writing for your auditor." },
      { title: "“We don’t use AI to translate.”", body: "An integrator produces the same documents. The audit works the same way." },
    ],
    proofPre: "Looking for the proof that the new code does the same thing? ",
    proofLink: "See code verification",
  },
  fr: {
    title: "Audit de traçabilité — Ironproof",
    description:
      "Une traduction de COBOL arrive avec des documents : sources citées, correspondance des données, fiches de conformité marquées réussies. On vérifie chacune de ces affirmations contre le vrai code : confirmée, ne tient pas, ou non vérifiable, avec la raison.",
    eyebrow: "AUDIT DE TRAÇABILITÉ",
    h1: "Votre traduction arrive avec ses documents. Qui les a vérifiés ?",
    lead: "Quand une IA ou un intégrateur traduit du COBOL en Java, le code arrive avec des documents : d’où vient chaque morceau, à quoi correspond chaque champ, quels contrôles ont réussi. L’équipe qui révise, l’auditeur qui signe et la direction qui approuve la bascule s’y fient tous. Nous, on vérifie si ces documents disent vrai.",
    cta: "Envoyez-nous une traduction",
    checksEyebrow: "CE QU’ON VÉRIFIE",
    checksTitle: "Chaque affirmation des documents, contre le vrai code.",
    verdictEyebrow: "CE QUE VOUS RECEVEZ",
    verdictTitle: "Chaque affirmation revient avec une de trois réponses.",
    verdicts: [
      { title: "Confirmée", body: "Le code dit ce que le document dit. Le rapport indique le fichier et la ligne." },
      { title: "Ne tient pas", body: "Le code dit autre chose : le paragraphe n’y est pas, le champ n’a pas la bonne taille, le calcul manque. Les deux, côte à côte." },
      { title: "Non vérifiable", body: "Le document n’en dit pas assez pour le vérifier, ou le code qu’il cite n’a pas été livré. Toujours avec la raison, jamais compté comme réussi." },
    ],
    forEyebrow: "POUR QUI",
    forTitle: "Pour ceux qui signent sur des documents qu’ils n’ont pas écrits.",
    audiences: [
      { title: "Les intégrateurs qui migrent du COBOL", body: "Montrez à votre client que votre traçabilité tient, avec le rapport de quelqu’un qui n’a pas fait la traduction." },
      { title: "Les directeurs de migration des banques et assureurs", body: "Approuvez la bascule sur des documents vérifiés, pas sur des documents qu’il faut croire sur parole." },
      { title: "L’audit interne et la conformité TI", body: "Signez une traçabilité que vous pouvez vraiment contrôler : chaque affirmation, sa réponse, et où regarder." },
    ],
    stepsEyebrow: "COMMENT ON COMMENCE",
    stepsTitle: "Un module d’abord. L’application ensuite. Puis la preuve.",
    steps: [
      { title: "Un pilote sur un module", body: "Un programme ou un module, avec sa traduction et ses documents. Le rapport revient en quelques jours." },
      { title: "L’application complète", body: "Le même audit sur tous les programmes de l’application, à prix fixe par application." },
      { title: "Ensuite, la preuve de comportement", body: "Une fois les documents vérifiés, on cherche où le nouveau code ne fait plus ce que faisait l’ancien. C’est un rapport à part." },
    ],
    faqEyebrow: "CE QU’ON NOUS DIT",
    faqTitle: "Bonnes questions.",
    faq: [
      { title: "« Nos tests suffisent. »", body: "Vos tests vérifient le code. Nous, on vérifie ce que le fournisseur affirme sur le code. C’est pas la même chose." },
      { title: "« On fait confiance à notre fournisseur. »", body: "Parfait. L’audit va le confirmer, et vous aurez une preuve écrite pour l’auditeur." },
      { title: "« On n’utilise pas l’IA pour traduire. »", body: "Un intégrateur produit les mêmes documents. L’audit marche pareil." },
    ],
    proofPre: "Vous cherchez la preuve que le nouveau code fait la même chose ? ",
    proofLink: "Voir la vérification de code",
  },
};

const link = "underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = locale === "en" ? "/traceability-audit" : `/${locale}/traceability-audit`;
  const { title, description } = pick(COPY, locale);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/traceability-audit", fr: "/fr/traceability-audit", "x-default": "/traceability-audit" },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ironproof.ai${path}`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
    },
    twitter: { title, description },
  };
}

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

function Section({ eyebrow, title, items, numbered = false }: { eyebrow: string; title: string; items: readonly Item[]; numbered?: boolean }) {
  return (
    <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
      <div className="fade-up mb-10 max-w-3xl">
        <Snum>{eyebrow}</Snum>
        <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{title}</h2>
      </div>
      <ul className="fade-up grid gap-8 md:grid-cols-3">
        {items.map((a, i) => (
          <li key={a.title} className="edge-t pt-6">
            {numbered ? <p className="mb-4 font-mono text-xs text-seal">{String(i + 1).padStart(2, "0")}</p> : null}
            <h3 className="mb-3 font-serif text-xl text-foreground">{a.title}</h3>
            <p className="font-light leading-relaxed text-neutral-300">{a.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function TraceabilityAuditPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(COPY, locale);
  const r = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page="traceability-audit" />
      <main className="blueprint flex-1">
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-32 md:px-14">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h1 className="metal-shine max-w-3xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">{t.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
          <p className="mt-8">
            <a href={`${r}/pilot`} className={`${link} text-foreground`}>
              {t.cta} →
            </a>
          </p>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
          <div className="fade-up mb-10 max-w-3xl">
            <Snum>{t.checksEyebrow}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.checksTitle}</h2>
          </div>
          <ul className="fade-up grid gap-8 md:grid-cols-3">
            {pick(TRACE_CHECKS, locale).map((a) => (
              <li key={a.title} className="edge-t pt-6">
                <h3 className="mb-3 font-serif text-xl text-foreground">{a.title}</h3>
                <p className="font-light leading-relaxed text-neutral-300">{a.body}</p>
              </li>
            ))}
          </ul>
          <p className="fade-up mt-10 max-w-3xl text-sm font-light text-neutral-400">{pick(TRACE_NOTE, locale)}</p>
        </section>

        <Section eyebrow={t.verdictEyebrow} title={t.verdictTitle} items={t.verdicts} />
        <Section eyebrow={t.forEyebrow} title={t.forTitle} items={t.audiences} />
        <Section eyebrow={t.stepsEyebrow} title={t.stepsTitle} items={t.steps} numbered />
        <Section eyebrow={t.faqEyebrow} title={t.faqTitle} items={t.faq} />

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-16 md:px-14">
          <p className="max-w-3xl font-light text-neutral-300">
            {t.proofPre}
            <a href={`${r}/modernization`} className={link}>
              {t.proofLink}
            </a>
          </p>
        </section>
      </main>
      <FadeUpInit />
    </div>
  );
}
