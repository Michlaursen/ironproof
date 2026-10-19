import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * The site map, once. The desktop dropdowns, the mobile menu and the footer
 * all read this, so a page cannot be reachable from one and missing from the
 * other two -- which is what happened when /evidence, /lab, /pilot and the
 * action pages shipped while the header still listed the six links of the
 * old one-page site.
 *
 * Since 2026-10-19 (Dom) the action types no longer sit in the menu: each
 * tab of the home page's #decide section opens its own page.
 */

export type NavItem = { href: string; label: string; page?: string };
export type NavGroup = { id: "technology" | "solutions" | "evidence"; label: string; items: NavItem[] };

/*
 * Restructured 2026-10-15 (Dom): TECHNOLOGY, SOLUTIONS, EVIDENCE, then
 * RESEARCH and START A PILOT. One core technology, three applications; the
 * application links land on the matching pillar of the home page (#app-01..03).
 * 2026-10-16 (Dom): one product sold (agents and critical actions, under
 * SOLUTIONS); C and COBOL moved under TECHNOLOGY as the same engine in research.
 * 2026-10-17 (Dom, "GO"): legacy modernization sold as a service, so it moves
 * back under SOLUTIONS; C stays under TECHNOLOGY, in research.
 */
const LABELS: L<{
  technology: string;
  solutions: string;
  evidence: string;
  how: string;
  proofIntelligence: string;
  neuroSymbolic: string;
  provableAi: string;
  zeroTrust: string;
  agents: string;
  cobol: string;
  demo: string;
  pythonToC: string;
  dossier: string;
  verify: string;
  record: string;
  lab: string;
  research: string;
  researchItem: string;
  pilot: string;
  pilotItem: string;
}> = {
  en: {
    technology: "TECHNOLOGY",
    solutions: "PRODUCTS",
    evidence: "EVIDENCE",
    how: "How it works",
    proofIntelligence: "What is Proof Intelligence",
    neuroSymbolic: "Neuro-symbolic",
    provableAi: "Provable AI",
    zeroTrust: "Zero Trust",
    agents: "Critical actions",
    cobol: "Code verification",
    demo: "Demo",
    pythonToC: "Python to C, proven",
    dossier: "Verification dossier",
    verify: "Check a sealed record",
    record: "Technical record",
    lab: "The lab",
    research: "RESEARCH",
    researchItem: "Research",
    pilot: "START A PILOT",
    pilotItem: "Start a pilot",
  },
  fr: {
    technology: "TECHNOLOGIE",
    solutions: "PRODUITS",
    evidence: "PREUVES",
    how: "Fonctionnement",
    proofIntelligence: "Proof Intelligence",
    neuroSymbolic: "Neuro-symbolique",
    provableAi: "IA prouvable",
    zeroTrust: "Zero Trust",
    agents: "Actions critiques",
    cobol: "Vérification de code",
    demo: "Démo",
    pythonToC: "Python vers C, prouvé",
    dossier: "Dossier de vérification",
    verify: "Vérifier une trace scellée",
    record: "Registre technique",
    lab: "Le labo",
    research: "RECHERCHE",
    researchItem: "Recherche",
    pilot: "DÉMARRER UN PILOTE",
    pilotItem: "Démarrer un pilote",
  },
};

export function siteNav(locale: Locale = defaultLocale) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const home = r || "/";
  const t = pick(LABELS, locale);
  const groups: NavGroup[] = [
    {
      id: "technology",
      label: t.technology,
      items: [
        { href: `${r}/proof-intelligence`, label: t.proofIntelligence, page: "proof-intelligence" },
        // The general method (platform-how.tsx), not the gate pipeline at #how (Dom, 2026-10-19: code first).
        { href: `${home}#how-platform`, label: t.how },
        { href: `${r}/neuro-symbolic`, label: t.neuroSymbolic, page: "neuro-symbolic" },
        { href: `${r}/provable-ai`, label: t.provableAi, page: "provable-ai" },
        { href: `${r}/zero-trust`, label: t.zeroTrust, page: "zero-trust" },
      ],
    },
    {
      id: "solutions",
      label: t.solutions,
      // PRODUCTS, two entries (Dom, 2026-10-19, "go"): code first, critical
      // actions second. The four action pages stay one click away: each tab of
      // the #decide section links to its own page (agent-scenarios.tsx).
      items: [
        { href: `${r}/modernization`, label: t.cobol, page: "modernization" },
        { href: `${home}#decide`, label: t.agents },
      ],
    },
    {
      id: "evidence",
      label: t.evidence,
      items: [
        { href: `${r}/demo`, label: t.demo, page: "demo" },
        { href: `${r}/demo/python-to-c`, label: t.pythonToC, page: "demo-python-c" },
        { href: `${r}/evidence`, label: t.dossier, page: "evidence" },
        { href: `${r}/verify`, label: t.verify, page: "verify" },
        { href: `${r}/proof`, label: t.record, page: "proof" },
        { href: `${r}/lab`, label: t.lab, page: "lab" },
      ],
    },
  ];
  /*
   * RESEARCH is one link, not a dropdown (Dom, 2026-10-18): a click lands on
   * the research page with the papers on top. The C entry left the menu.
   */
  return {
    groups,
    research: { href: `${r}/research`, label: t.research, page: "research-index" } as NavItem,
    pilot: { href: `${r}/pilot`, label: t.pilot, page: "pilot" } as NavItem,
    /** Sentence case, for lists (footer). */
    company: [
      { href: `${r}/research`, label: t.researchItem, page: "research-index" },
      { href: `${r}/pilot`, label: t.pilotItem, page: "pilot" },
    ] as NavItem[],
  };
}
