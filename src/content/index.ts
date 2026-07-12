import { en } from "./en";
import { fr } from "./fr";
import type { SiteContent } from "./types";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, SiteContent> = { en, fr };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type { SiteContent };
