import { defaultLocale, type Locale } from "@/content";
import { ACTION_COPY, ACTION_IDS } from "./action-types";
import { type L, pick } from "./i18n";

/*
 * The site map, once. The desktop dropdowns, the mobile menu and the footer
 * all read this, so a page cannot be reachable from one and missing from the
 * other two -- which is what happened when /evidence, /lab, /pilot and the
 * action pages shipped while the header still listed the six links of the
 * old one-page site.
 *
 * Action-type labels come from action-types.ts, the same strings as the home
 * page's tabs and the pages' own eyebrows.
 */

export type NavItem = { href: string; label: string; page?: string };
export type NavGroup = { id: "product" | "proof"; label: string; items: NavItem[] };

const LABELS: L<{
  product: string;
  proof: string;
  how: string;
  demo: string;
  demoItem: string;
  lab: string;
  evidence: string;
  verify: string;
  record: string;
  research: string;
  provableAi: string;
  pilot: string;
  provableAiItem: string;
  pilotItem: string;
}> = {
  en: {
    product: "PRODUCT",
    proof: "PROOF",
    how: "How it works",
    demo: "DEMO",
    demoItem: "Demo",
    lab: "The lab",
    evidence: "Evidence pack",
    verify: "Verify a proof",
    record: "Technical record",
    research: "Research",
    provableAi: "PROVABLE AI",
    pilot: "START A PILOT",
    provableAiItem: "Provable AI",
    pilotItem: "Start a pilot",
  },
  fr: {
    product: "PRODUIT",
    proof: "PREUVE",
    how: "Fonctionnement",
    demo: "DÉMO",
    demoItem: "Démo",
    lab: "Le labo",
    evidence: "Dossier de preuve",
    verify: "Vérifier une preuve",
    record: "Dossier technique",
    research: "Recherche",
    provableAi: "IA PROUVABLE",
    pilot: "DÉMARRER UN PILOTE",
    provableAiItem: "IA prouvable",
    pilotItem: "Démarrer un pilote",
  },
};

function cap(s: string): string {
  const lower = s.toLocaleLowerCase("fr");
  return lower.charAt(0).toLocaleUpperCase("fr") + lower.slice(1);
}

export function siteNav(locale: Locale = defaultLocale) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const t = pick(LABELS, locale);
  const actions = pick(ACTION_COPY, locale);
  const groups: NavGroup[] = [
    {
      id: "product",
      label: t.product,
      items: [
        { href: `${r || "/"}#how`, label: t.how },
        ...ACTION_IDS.map((id) => ({
          href: `${r}/actions/${id}`,
          label: cap(actions[id].tab),
          page: `act-${id}`,
        })),
        { href: `${r}/lab`, label: t.lab, page: "lab" },
      ],
    },
    {
      id: "proof",
      label: t.proof,
      items: [
        { href: `${r}/evidence`, label: t.evidence, page: "evidence" },
        { href: `${r}/verify`, label: t.verify, page: "verify" },
        { href: `${r}/proof`, label: t.record, page: "proof" },
        { href: `${r}/research`, label: t.research, page: "research-index" },
      ],
    },
  ];
  return {
    groups,
    /** Top level, right after PRODUCT (Dom, 2026-09-30): the demo is the first thing to open. */
    demo: { href: `${r}/demo`, label: t.demo, page: "demo" } as NavItem,
    provableAi: { href: `${r}/provable-ai`, label: t.provableAi, page: "provable-ai" } as NavItem,
    pilot: { href: `${r}/pilot`, label: t.pilot, page: "pilot" } as NavItem,
    /** The same two pages, in sentence case, for lists (footer). */
    company: [
      { href: `${r}/demo`, label: t.demoItem, page: "demo" },
      { href: `${r}/pilot`, label: t.pilotItem, page: "pilot" },
      { href: `${r}/provable-ai`, label: t.provableAiItem, page: "provable-ai" },
    ] as NavItem[],
  };
}
