import type { L } from "./i18n";

/*
 * The hero's three lines, in one place. The landing, the Open Graph card
 * (what LinkedIn shows when the link is shared) and the JSON-LD slogan all
 * read this object. Before, the card and the slogan read an older headline
 * from src/content and kept selling "what an AI agent cannot do" after the
 * page had moved to any action, any initiator.
 *
 * Repositioned 2026-10-13 (Dom): one technology, three applications (AI
 * agents and critical actions, C software security, legacy modernization).
 * "If it isn't authorized, it never executes" now opens the first of the
 * three pillars instead of the page (platform-copy.ts).
 */
export type HeroCopy = {
  eyebrow: string;
  /** Two clauses: the condition (plain) and the consequence (gold italic). */
  headline: string;
  headlineEnd: string;
};

export const HERO_COPY: L<HeroCopy> = {
  en: {
    eyebrow: "NEURO-SYMBOLIC AI × AUTOMATED FORMAL VERIFICATION",
    headline: "Critical systems deserve",
    headlineEnd: "more than testing.",
  },
  fr: {
    eyebrow: "IA NEURO-SYMBOLIQUE × VÉRIFICATION FORMELLE AUTOMATISÉE",
    headline: "Les systèmes critiques méritent",
    headlineEnd: "plus que des tests.",
  },
};
