import type { L } from "./i18n";

/*
 * The hero's three lines, in one place. The landing, the Open Graph card
 * (what LinkedIn shows when the link is shared) and the JSON-LD slogan all
 * read this object. Before, the card and the slogan read an older headline
 * from src/content and kept selling "what an AI agent cannot do" after the
 * page had moved to any action, any initiator.
 */
export type HeroCopy = {
  eyebrow: string;
  /** Two clauses: the condition (plain) and the consequence (gold italic). */
  headline: string;
  headlineEnd: string;
};

export const HERO_COPY: L<HeroCopy> = {
  en: {
    eyebrow: "THE AUTHORIZATION LAYER FOR CRITICAL ACTIONS",
    headline: "If it isn’t authorized,",
    headlineEnd: "it never executes.",
  },
  fr: {
    eyebrow: "LA COUCHE D’AUTORISATION POUR LES ACTIONS CRITIQUES",
    headline: "Si ce n’est pas autorisé,",
    headlineEnd: "il n’y a pas d’exécution.",
  },
};
