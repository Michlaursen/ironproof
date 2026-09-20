/*
 * PUBLIC TECHNICAL RECORD — external credibility band + published research.
 * Data lifted verbatim from the site content (attributions + corpus in en.ts):
 * real upstream commits/patches that credit the work, plus the arXiv preprints.
 * Every card is an external link (new tab).
 */

import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * TRANSLATION RULE FOR THIS FILE, and it is not cosmetic.
 *
 * The quoted strings inside `body` are what the upstream commit ACTUALLY says
 * -- "Thanks to Dominik Blain of Cobalt AI for reporting." A reader clicks
 * through and finds those words. Translating a quotation would mean the page
 * shows something the linked page does not contain, on the one section whose
 * entire point is that it is checkable. So the quotes stay English in both
 * languages; only the sentence AROUND them moves. Same for the arXiv titles:
 * they are the published titles, and a translated title does not find the paper.
 */

const RECORD: { org: string; body: L<string>; cta: L<string>; href: string }[] = [
  {
    org: "IBM",
    body: {
      en: "The sarama fix commit reads: “Thanks to Dominik Blain of Cobalt AI for reporting.”",
      fr: "Le commit de correctif sarama dit\u202f: “Thanks to Dominik Blain of Cobalt AI for reporting.”",
    },
    cta: { en: "View commit", fr: "Voir le commit" },
    href: "https://github.com/IBM/sarama/commit/b01879002b37abe3b44a957615d982847a44da94",
  },
  {
    org: "GnuPG",
    body: {
      en: "Two libksba commits carry “Reported-by: Dominik Blain”, shipped in release 1.7.0.",
      fr: "Deux commits libksba portent “Reported-by: Dominik Blain”, livrés en version 1.7.0.",
    },
    cta: { en: "View commit", fr: "Voir le commit" },
    href: "https://github.com/gpg/libksba/commit/c44cc98460ea42e393214dc6e23ff746196baefd",
  },
  {
    org: "Mozilla",
    body: {
      en: "Reported by Dominik Blain — recorded and resolved in Mozilla’s public bug tracker (NSS, CWE-195).",
      fr: "Signalé par Dominik Blain — consigné et résolu dans le suivi de bogues public de Mozilla (NSS, CWE-195).",
    },
    cta: { en: "View bug record", fr: "Voir la fiche" },
    href: "https://bugzilla.mozilla.org/show_bug.cgi?id=2027434",
  },
  {
    org: "Red Hat · OpenELA",
    body: {
      en: "Public libyang patches credit Dominik Blain and Cobalt AI for reporting two memory-corruption issues.",
      fr: "Des correctifs libyang publics créditent Dominik Blain et Cobalt AI pour le signalement de deux corruptions mémoire.",
    },
    cta: { en: "View patch record", fr: "Voir le correctif" },
    href: "https://github.com/openela-main/libyang",
  },
  {
    org: "wolfSSL",
    body: {
      en: "Security fixes credited to Dominik Blain in the wolfSSL 5.9.2 release notes.",
      fr: "Correctifs de sécurité crédités à Dominik Blain dans les notes de version wolfSSL 5.9.2.",
    },
    cta: { en: "View release notes", fr: "Voir les notes de version" },
    href: "https://github.com/wolfSSL/wolfssl/blob/master/README.md",
  },
  {
    org: "VideoLAN · VLC",
    body: {
      en: "A vulnerability fix carrying Dominik Blain’s name is preserved in VLC’s public source tree.",
      fr: "Un correctif de vulnérabilité portant le nom de Dominik Blain est conservé dans l’arbre source public de VLC.",
    },
    cta: { en: "View patch", fr: "Voir le correctif" },
    // Pinned SHA (not blob/master): VLC upstreamed upnp and dropped the local patch,
    // so master 404s. 30d1805 is the last commit where the file exists (verified 200).
    href: "https://github.com/videolan/vlc/blob/30d180596d6884d3d03bd03515b483933bd02cd6/contrib/src/upnp/0006-uri.c-Dominik-Blain-s-fix-for-vulnerability.patch",
  },
  {
    org: "OFFIS · DCMTK",
    body: {
      en: "Three commits thank Dominik Blain for the report.",
      fr: "Trois commits remercient Dominik Blain pour le signalement.",
    },
    cta: { en: "View commit", fr: "Voir le commit" },
    href: "https://github.com/DCMTK/dcmtk/commit/63b0bae751f62ed1b384141fa0fd032c98af57aa",
  },
  {
    org: "pupnp · CVE-2026-41682",
    body: {
      en: 
        "The pupnp advisory credits the COBALT static analyzer and Dominik Blain for the finding. CWE-195, signed-to-unsigned conversion in parse_uri().",
      fr: 
        "L’avis pupnp crédite l’analyseur statique COBALT et Dominik Blain pour la découverte. CWE-195, conversion signé-vers-non-signé dans parse_uri().",
    },
    cta: { en: "View advisory", fr: "Voir l’avis" },
    href: "https://github.com/pupnp/pupnp/security/advisories/GHSA-q522-6w45-4j58",
  },
  {
    org: "libmodbus",
    body: {
      en: "The fix commit credits Dominik Blain and Cobalt formal verification as the reporter.",
      fr: "Le commit de correctif crédite Dominik Blain et la vérification formelle Cobalt comme rapporteur.",
    },
    cta: { en: "View commit", fr: "Voir le commit" },
    href: "https://github.com/stephane/libmodbus/commit/d6941168d13cfa1db1bec40ef5bf04470c351175",
  },
];

const PAPERS: { id: string; title: string; href: string }[] = [
  {
    id: "arXiv:2604.05292",
    title:
      "Broken by Default: A Formal Verification Study of Security Vulnerabilities in AI-Generated Code",
    href: "https://arxiv.org/abs/2604.05292",
  },
  {
    id: "arXiv:2604.06712",
    title:
      "Broken Quantum: A Systematic Formal Verification Study of Security Vulnerabilities Across the Open-Source Quantum Computing Simulator Ecosystem",
    href: "https://arxiv.org/abs/2604.06712",
  },
  {
    id: "arXiv:2604.12172",
    title: "COBALT-TLA: A Neuro-Symbolic Verification Loop for Cross-Chain Bridge Vulnerability Discovery",
    href: "https://arxiv.org/abs/2604.12172",
  },
  {
    id: "arXiv:2604.20496",
    title:
      "Mythos and the Unverified Cage: Z3-Based Pre-Deployment Verification for Frontier-Model Sandbox Infrastructure",
    href: "https://arxiv.org/abs/2604.20496",
  },
];

function ExternalArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17 L17 7 M9 7 h8 v8" />
    </svg>
  );
}

const T: L<{
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  papers: string;
}> = {
  en: {
    eyebrow: "PUBLIC TECHNICAL RECORD",
    titleA: "Credited in the open,",
    titleB: "by the projects themselves",
    lead: "Evidence you can inspect outside our website — real upstream commits, patches and bug records that name the work.",
    papers: "PUBLISHED RESEARCH",
  },
  fr: {
    eyebrow: "DOSSIER TECHNIQUE PUBLIC",
    titleA: "Crédités au grand jour,",
    titleB: "par les projets eux-mêmes",
    lead: "Des preuves que vous pouvez examiner en dehors de notre site — de vrais commits en amont, des correctifs et des fiches de bogue qui nomment le travail.",
    papers: "RECHERCHE PUBLIÉE",
  },
};

export function Credibility({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  return (
    <section id="record" className="relative z-10 mx-auto max-w-7xl edge-gold px-6 py-28 md:px-14">
      <div className="fade-up mb-16 text-center">
        <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          {t.titleA}
          <br />
          {t.titleB}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {RECORD.map((item) => (
          <a
            key={item.org}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-premium group flex flex-col p-6 transition"
          >
            <h3 className="metal-text mb-2 font-serif text-xl">{item.org}</h3>
            <p className="flex-1 text-sm font-light leading-relaxed text-neutral-300">{pick(item.body, locale)}</p>
            <span className="track-mid mt-5 inline-flex items-center gap-2 text-xs text-neutral-400 transition group-hover:text-[#f6e5b4]">
              {pick(item.cta, locale)}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <ExternalArrow />
              </span>
            </span>
          </a>
        ))}
      </div>

      {/* Published research */}
      <div className="fade-up mt-16">
        <p className="seal-label track-mid mb-6 text-center text-xs">{t.papers}</p>
        <div className="mx-auto max-w-4xl space-y-3">
          {PAPERS.map((paper) => (
            <a
              key={paper.id}
              href={paper.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium group flex items-center gap-4 p-5 transition"
            >
              <span className="metal-text shrink-0 font-mono text-xs">{paper.id}</span>
              <span className="flex-1 text-sm font-light leading-snug text-neutral-300">
                {paper.title}
              </span>
              <span className="icon-metal shrink-0 transition group-hover:text-white">
                <ExternalArrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
