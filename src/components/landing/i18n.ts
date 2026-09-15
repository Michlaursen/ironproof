import type { Locale } from "@/content";

/*
 * The one place the landing decides what a locale means.
 *
 * Every landing component carries its copy as a `L<T>` dictionary and reads it
 * through `pick`. Two properties matter and neither is decoration:
 *
 *   1. `pick` falls back to English when a locale key is missing, so a partial
 *      translation renders English text rather than `undefined`. A missing
 *      string is then VISIBLE on the page instead of silently blank.
 *   2. The number formatting below never calls `Intl`. Node and the browser do
 *      not always agree on which space `toLocaleString` puts between groups,
 *      and a server/client disagreement on a rendered string is a hydration
 *      mismatch. Grouping by hand is deterministic on both sides.
 */

export type L<T> = Record<Locale, T>;

export const pick = <T,>(d: L<T>, locale: Locale): T => d[locale] ?? d.en;

/** Narrow no-break space (U+202F) — the French group and currency separator. */
const NNBSP = " ";
/** No-break space (U+00A0) — before a colon, which must not start a line. */
export const NBSP = " ";

function group(n: number, sep: string): string {
  const s = Math.trunc(Math.abs(n)).toString();
  let out = "";
  for (let i = 0; i < s.length; i += 1) {
    if (i > 0 && (s.length - i) % 3 === 0) out += sep;
    out += s[i];
  }
  return (n < 0 ? "−" : "") + out;
}

/**
 * An amount in US dollars, written the way each language writes it.
 *
 * English puts the sign first and groups with a comma ("$1,000"). French puts
 * the sign last and groups with a narrow no-break space ("1 000 $") — the
 * no-break part is load bearing: a plain space lets a line wrap between the
 * number and its currency, which is a typographic error in French.
 */
export function money(n: number, locale: Locale): string {
  return locale === "fr"
    ? group(n, NNBSP) + NNBSP + "$"
    : "$" + group(n, ",");
}

/** A plain integer, grouped for the locale. */
export function count(n: number, locale: Locale): string {
  return group(n, locale === "fr" ? NNBSP : ",");
}
