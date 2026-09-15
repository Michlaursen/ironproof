"use client";

import { Fragment, useState } from "react";
import { IronProofLogo } from "@/components/ironproof-logo";
import { IconMenu, IconClose } from "@/components/icons";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

type Variant = "home" | "sub";

/**
 * Which page is rendering this header.
 *
 * One prop, two jobs: it highlights the current entry in the nav, and it tells
 * the language switch which page to cross to. Those used to be the same idea
 * split across two props, which is a mirror waiting to disagree.
 */
type Page = "home" | "proof" | "provable-ai" | "verify" | "research";

/**
 * Each page's path WITHOUT a locale prefix. The single source for both link
 * builders below, so the nav and the language switch cannot point at different
 * URLs for the same page.
 */
const PATHS: Record<Page, string> = {
  home: "",
  proof: "/proof",
  "provable-ai": "/provable-ai",
  verify: "/verify",
  research: "/research/zero-barriers-one-reviewer",
};

// English keeps the short URLs ("/proof"), which next.config rewrites to
// "/en/proof". Any other locale is addressed explicitly, so a visitor reading
// /fr does not silently land on the English page.
function routePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** The same page, in the other language. */
function otherLocaleHref(page: Page, locale: Locale): string {
  const target: Locale = locale === "fr" ? "en" : "fr";
  return `${routePrefix(target)}${PATHS[page]}` || "/";
}

const NAV: L<{
  how: string;
  initiators: string;
  actions: string;
  verify: string;
  proof: string;
  provableAi: string;
  cta: string;
  openMenu: string;
  closeMenu: string;
  /** Label of the language switch: the language it takes you TO. */
  switchLabel: string;
  /** Announced by a screen reader, written in the language it leads to. */
  switchAria: string;
  /** BCP-47 tag of the destination, for `hreflang` and `lang`. */
  switchLang: string;
}> = {
  en: {
    how: "HOW IT WORKS",
    initiators: "ANY INITIATOR",
    actions: "CRITICAL ACTIONS",
    verify: "VERIFY",
    proof: "PROOF",
    provableAi: "PROVABLE AI",
    cta: "REQUEST ACCESS",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // On the English page the switch leads to French, so it says so in French.
    switchLabel: "FR",
    switchAria: "Voir cette page en français",
    switchLang: "fr",
  },
  fr: {
    how: "FONCTIONNEMENT",
    initiators: "TOUT DEMANDEUR",
    actions: "ACTIONS CRITIQUES",
    verify: "VÉRIFIER",
    proof: "PREUVE",
    provableAi: "IA PROUVABLE",
    cta: "DEMANDER UN ACCÈS",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLabel: "EN",
    switchAria: "View this page in English",
    switchLang: "en",
  },
};

// In-page anchors stay in-page on home ("#how") and resolve to that locale's
// home route from a sub-page ("/#how", "/fr#how"). The sub-page variant matters:
// a bare "#how" on /proof points at an id that page does not have.
/** `leaves` marks an entry that goes to another page rather than down this one. */
function links(
  variant: Variant,
  locale: Locale,
): { href: string; label: string; page?: Page; leaves?: boolean }[] {
  const r = routePrefix(locale);
  const p = variant === "sub" ? r || "/" : "";
  const t = pick(NAV, locale);
  // Two kinds of destination, and the reader cannot tell them apart from the
  // label alone: the first three move down this page, the last three leave it.
  // They used to alternate, so the row read as six equivalent things. Grouped
  // — anchors, then pages — the separator can say which is which.
  return [
    { href: `${p}#how`, label: t.how },
    { href: `${p}#initiators`, label: t.initiators },
    { href: `${p}#start`, label: t.actions },
    { href: `${r}${PATHS.verify}`, label: t.verify, page: "verify", leaves: true },
    { href: `${r}${PATHS.proof}`, label: t.proof, page: "proof", leaves: true },
    {
      href: `${r}${PATHS["provable-ai"]}`,
      label: t.provableAi,
      page: "provable-ai",
      leaves: true,
    },
  ];
}

/*
 * `page` is REQUIRED on a sub-page and defaulted on home.
 *
 * Deliberate: a sub-page that forgets to say which page it is would send every
 * French visitor to the home page instead of the page they were reading, and it
 * would do it silently. TypeScript refuses the build instead.
 */
type HeaderProps =
  | { variant?: "home"; locale?: Locale; page?: "home" }
  | { variant: "sub"; locale?: Locale; page: Page };

export function LandingHeader(props: HeaderProps) {
  const { variant = "home", locale = defaultLocale } = props;
  const page: Page = props.page ?? "home";
  const [open, setOpen] = useState(false);
  const LINKS = links(variant, locale);
  const t = pick(NAV, locale);
  const r = routePrefix(locale);
  const logoHref = variant === "sub" ? r || "/" : "#top";
  const contactHref = variant === "sub" ? `${r || "/"}#contact` : "#contact";
  const isActive = (p?: Page) => p !== undefined && p === page;

  const switchHref = otherLocaleHref(page, locale);
  // See .track-nav-fr in globals.css: the French labels need a tighter tier.
  const trackNav = locale === "fr" ? "track-nav-fr" : "track-nav";

  /*
   * Plain <a>, never next/link: switching locale crosses to a different param
   * value of the [locale] segment, which also renders the root <html> layout.
   * Client-side soft navigation between two such instances renders Next's
   * not-found boundary despite the server returning a valid 200 (reproduced
   * consistently in prod builds). A full page load always resolves correctly.
   *
   * The href alone is complete and correct — it is what a crawler follows and
   * what works with JavaScript off. The handler only ADDS the current hash, so
   * a reader deep in the page lands at the same place in the other language.
   * It is read at click time, never during render: reading location during
   * render is what makes a prerendered page hydrate against a different URL.
   */
  function keepHash(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const hash = window.location.hash;
    if (!hash) return;
    e.preventDefault();
    window.location.assign(switchHref + hash);
  }

  const switchClasses =
    "whitespace-nowrap rounded-[5px] border border-white/15 px-2.5 py-1.5 transition hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60";

  return (
    <header className="edge-b sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-md">
      <div className="relative z-20 flex items-center gap-8 px-6 py-6 md:px-14">
        <a href={logoHref} className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <IronProofLogo width={26} height={35} />
          <span className="track-logo iron-text text-base font-semibold">IRONPROOF</span>
        </a>

        {/* Desktop nav */}
        <nav className={`${trackNav} hidden flex-1 items-center justify-between gap-x-3 text-[11px] xl:flex 2xl:gap-x-[18px] 2xl:pl-4 2xl:text-xs`}>
          {LINKS.map((l, i) => (
            <Fragment key={l.href}>
              {l.leaves && !LINKS[i - 1]?.leaves ? (
                <span className="nav-divider" aria-hidden="true" />
              ) : null}
              <a
                href={l.href}
                aria-current={isActive(l.page) ? "page" : undefined}
                className={`whitespace-nowrap rounded-sm transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 ${
                  isActive(l.page) ? "metal-shine" : "metal-text"
                }`}
              >
                {l.label}
              </a>
            </Fragment>
          ))}

          {/* No divider before it: the switch carries its own border box, and
              at the xl tier the French labels need every pixel back. */}
          <a
            href={switchHref}
            onClick={keepHash}
            hrefLang={t.switchLang}
            lang={t.switchLang}
            aria-label={t.switchAria}
            className={`metal-text ${switchClasses}`}
          >
            {t.switchLabel}
          </a>

          <a
            href={contactHref}
            className={`${trackNav} whitespace-nowrap shrink-0 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-4 py-2.5 font-semibold 2xl:px-5 text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60`}
          >
            {t.cta}
          </a>
        </nav>

        {/* Mobile: the language switch stays OUT of the collapsed menu. It is
            one tap, it is how a French reader escapes an English page, and
            burying it behind a hamburger is how it stops being found. */}
        <a
          href={switchHref}
          onClick={keepHash}
          hrefLang={t.switchLang}
          lang={t.switchLang}
          aria-label={t.switchAria}
          className={`metal-text ${trackNav} ml-auto text-[11px] xl:hidden ${switchClasses}`}
        >
          {t.switchLabel}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          className="chip-metal ml-3 flex h-10 w-10 shrink-0 items-center justify-center text-neutral-100 transition hover:text-white xl:hidden"
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <nav className="edge-t relative z-20 bg-black/80 px-6 pb-6 pt-2 backdrop-blur xl:hidden">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive(l.page) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`track-mid border-b border-white/5 py-4 text-sm ${
                  l.leaves && !LINKS[LINKS.indexOf(l) - 1]?.leaves ? "mt-2 border-t border-white/10 pt-6" : ""
                } ${isActive(l.page) ? "metal-shine" : "metal-text"}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              className="track-mid mt-5 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-5 py-3.5 text-center font-semibold text-ink shadow-lg shadow-white/10"
            >
              {t.cta}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
