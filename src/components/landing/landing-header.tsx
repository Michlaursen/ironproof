"use client";

import { useState } from "react";
import { IronproofMark } from "@/components/ironproof-mark";
import { IconMenu, IconClose } from "@/components/icons";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { siteNav, type NavItem } from "./site-nav";

/**
 * Which page is rendering this header.
 *
 * One prop, two jobs: it highlights the current entry in the nav, and it tells
 * the language switch which page to cross to. Those used to be the same idea
 * split across two props, which is a mirror waiting to disagree.
 */
type Page = "home" | "proof" | "provable-ai" | "verify" | "evidence" | "lab" | "pilot" | "act-money" | "act-access" | "act-records" | "act-deploy" | "research" | "research-index";

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
  evidence: "/evidence",
  lab: "/lab",
  pilot: "/pilot",
  "act-money": "/actions/money",
  "act-access": "/actions/access",
  "act-records": "/actions/records",
  "act-deploy": "/actions/deploy",
  research: "/research/zero-barriers-one-reviewer",
  "research-index": "/research",
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
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // On the English page the switch leads to French, so it says so in French.
    switchLabel: "FR",
    switchAria: "Voir cette page en français",
    switchLang: "fr",
  },
  fr: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLabel: "EN",
    switchAria: "View this page in English",
    switchLang: "en",
  },
};

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
  const [menu, setMenu] = useState<null | "product" | "proof">(null);
  const nav = siteNav(locale);
  const t = pick(NAV, locale);
  const r = routePrefix(locale);
  const logoHref = variant === "sub" ? r || "/" : "#top";
  // Every "Start a pilot" lands on the one page that explains it (2026-09-26).
  const contactHref = `${r}${PATHS.pilot}`;
  const isActive = (p?: string) => p !== undefined && p === page;
  const groupActive = (items: NavItem[]) => items.some((it) => isActive(it.page));

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
      <div className="relative z-20 flex items-center gap-4 px-6 py-6 sm:gap-8 md:px-14">
        {/* Phone, home only: no mark up here. The full IRONPROOF lockup sits in
          * the hero one screen below, and a lone mark above read as clutter
          * (Dom, 2026-09-28; same rule as the stacked #69). Every other page
          * keeps it: there it is also the way home. */}
        <a
          href={logoHref}
          className={`flex shrink-0 items-center gap-3 ${variant === "home" ? "max-md:hidden" : ""}`}
          onClick={() => setOpen(false)}
        >
          <IronproofMark height={40} preload />
          {/* Phone: the hero already carries the full lockup one screen below, so the
            * header keeps the mark alone (Dom, 2026-09-26). sr-only, not hidden: the
            * link still needs its name. */}
          <span className="track-logo iron-brushed text-base font-semibold max-md:sr-only">IRONPROOF</span>
        </a>

        {/* Desktop nav: two groups that open on hover, click or keyboard focus,
          * then the one page that is not part of a group. Escape closes. */}
        <nav
          className={`${trackNav} hidden flex-1 items-center justify-end gap-x-9 text-[11px] xl:flex 2xl:text-xs`}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenu(null);
          }}
        >
          {nav.groups.map((g) => (
            <div
              key={g.id}
              className="relative"
              onMouseEnter={() => setMenu(g.id)}
              onMouseLeave={() => setMenu(null)}
            >
              <button
                type="button"
                aria-expanded={menu === g.id}
                aria-haspopup="true"
                onClick={() => setMenu((m) => (m === g.id ? null : g.id))}
                className={`flex items-center gap-1.5 whitespace-nowrap py-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 ${
                  groupActive(g.items) ? "metal-shine" : "metal-text"
                }`}
              >
                {g.label}
                <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true" className={`transition ${menu === g.id ? "rotate-180" : ""}`}>
                  <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              {menu === g.id ? (
                <div className="absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3">
                  <ul className="min-w-[15.5rem] rounded-[6px] border border-white/10 bg-[#0b0b0d]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-md">
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <a
                          href={it.href}
                          aria-current={isActive(it.page) ? "page" : undefined}
                          onClick={() => setMenu(null)}
                          className={`block rounded-[4px] px-3.5 py-2.5 font-sans text-[13px] normal-case tracking-normal transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none ${
                            isActive(it.page) ? "text-white" : "text-neutral-300"
                          }`}
                        >
                          {it.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
          <a
            href={nav.provableAi.href}
            aria-current={isActive(nav.provableAi.page) ? "page" : undefined}
            className={`whitespace-nowrap py-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 ${
              isActive(nav.provableAi.page) ? "metal-shine" : "metal-text"
            }`}
          >
            {nav.provableAi.label}
          </a>

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
            {nav.pilot.label}
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
            {nav.groups.map((g) => (
              <div key={g.id} className="border-b border-white/10 py-4">
                <p className="seal-label track-mid mb-2 text-[11px]">{g.label}</p>
                {g.items.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    aria-current={isActive(it.page) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-[15px] ${isActive(it.page) ? "text-white" : "text-neutral-300"}`}
                  >
                    {it.label}
                  </a>
                ))}
              </div>
            ))}
            <a
              href={nav.provableAi.href}
              onClick={() => setOpen(false)}
              className={`track-mid border-b border-white/10 py-5 text-sm ${isActive(nav.provableAi.page) ? "metal-shine" : "metal-text"}`}
            >
              {nav.provableAi.label}
            </a>
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              className="track-mid mt-5 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-5 py-3.5 text-center font-semibold text-ink shadow-lg shadow-white/10"
            >
              {nav.pilot.label}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
