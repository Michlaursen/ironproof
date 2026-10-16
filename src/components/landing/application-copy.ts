import type { L } from "./i18n";

/*
 * The two application pages that had no door of their own (Dom, 2026-10-15:
 * "go" on the review that a COBOL or C buyer could not find their page).
 *
 * Nothing here restates a claim. The claim, the risk, what Ironproof does and
 * what runs today are READ from the pillars in platform-copy.ts, and the three
 * verdicts from its method block: one source, so the landing and these pages
 * cannot drift apart. This file only holds section labels and the routing.
 */

export type AppId = "software-security" | "modernization";

/** Index of each page's pillar in PLATFORM_COPY.pillars (01 is the gate). */
export const APP_PILLAR: Record<AppId, number> = {
  "software-security": 1,
  modernization: 2,
};

/** Papers from PAPERS shown on a page, by arXiv id; empty when none is about it. */
export const APP_PAPERS: Record<AppId, readonly string[]> = {
  "software-security": [],
  modernization: ["arXiv:2610.11073"],
};

export type AppLabels = {
  s01: string;
  s02: string;
  s03: string;
  s04: string;
  papers: string;
  read: string;
  backHome: string;
  ctaTitle: string;
  ctaLead: string;
};

export const APP_LABELS: L<AppLabels> = {
  en: {
    s01: "01 — THE RISK",
    s02: "02 — WHAT IRONPROOF DOES",
    s03: "03 — WHAT YOU RECEIVE",
    s04: "04 — TODAY",
    papers: "PUBLISHED RESEARCH",
    read: "READ ON ARXIV",
    backHome: "ALL THREE APPLICATIONS",
    ctaTitle: "Bring one case. Leave with the evidence.",
    ctaLead: "Tell us what you need checked. We answer with what we can prove, and what we cannot.",
  },
  fr: {
    s01: "01 — LE RISQUE",
    s02: "02 — CE QUE FAIT IRONPROOF",
    s03: "03 — CE QUE VOUS RECEVEZ",
    s04: "04 — AUJOURD’HUI",
    papers: "RECHERCHE PUBLIÉE",
    read: "LIRE SUR ARXIV",
    backHome: "LES TROIS APPLICATIONS",
    ctaTitle: "Apportez un cas. Repartez avec la preuve.",
    ctaLead: "Dites-nous ce qu’il faut vérifier. Nous répondons avec ce que nous pouvons prouver, et ce que nous ne pouvons pas.",
  },
};
