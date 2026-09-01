"use client";

import { useState } from "react";
import { IronProofLogo } from "@/components/ironproof-logo";
import { IconMenu, IconClose } from "@/components/icons";
import { defaultLocale, type Locale } from "@/content";

type Variant = "home" | "sub";
type Active = "proof" | "provable-ai";

// English keeps the short URLs ("/proof"), which next.config rewrites to
// "/en/proof". Any other locale is addressed explicitly, so a visitor reading
// /fr does not silently land on the English page.
function routePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

// In-page anchors stay in-page on home ("#how") and resolve to that locale's
// home route from a sub-page ("/#how", "/fr#how"). The sub-page variant matters:
// a bare "#how" on /proof points at an id that page does not have.
function links(variant: Variant, locale: Locale): { href: string; label: string; page?: Active }[] {
  const r = routePrefix(locale);
  const p = variant === "sub" ? r || "/" : "";
  return [
    { href: `${p}#how`, label: "HOW IT WORKS" },
    { href: `${p}#start`, label: "AI AGENTS" },
    { href: `${r}/proof`, label: "PROOF", page: "proof" },
    { href: `${p}#verify`, label: "EVIDENCE" },
    { href: `${r}/provable-ai`, label: "PROVABLE AI", page: "provable-ai" },
  ];
}

export function LandingHeader({
  variant = "home",
  locale = defaultLocale,
  active,
}: {
  variant?: Variant;
  locale?: Locale;
  active?: Active;
}) {
  const [open, setOpen] = useState(false);
  const LINKS = links(variant, locale);
  const r = routePrefix(locale);
  const logoHref = variant === "sub" ? r || "/" : "#top";
  const contactHref = variant === "sub" ? `${r || "/"}#contact` : "#contact";
  // Derived from the page that rendered the header, never from the variant:
  // every sub-page is not the Provable AI page.
  const isActive = (page?: Active) => active !== undefined && page === active;

  return (
    <header className="edge-b sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-md">
      <div className="relative z-20 flex items-center gap-8 px-6 py-6 md:px-14">
        <a href={logoHref} className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <IronProofLogo width={26} height={35} />
          <span className="track-logo iron-text text-base font-semibold">IRONPROOF</span>
        </a>

        {/* Desktop nav */}
        <nav className="track-mid hidden flex-1 items-center justify-between gap-x-6 pl-6 text-xs xl:flex 2xl:gap-x-8 2xl:pl-16">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.page) ? "page" : undefined}
              className={`whitespace-nowrap rounded-sm transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 ${
                isActive(l.page) ? "metal-shine" : "metal-text"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={contactHref}
            className="track-mid whitespace-nowrap shrink-0 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-5 py-2.5 font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            REQUEST ACCESS
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="chip-metal ml-auto flex h-10 w-10 shrink-0 items-center justify-center text-neutral-100 transition hover:text-white xl:hidden"
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
                  isActive(l.page) ? "metal-shine" : "metal-text"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              className="track-mid mt-5 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-5 py-3.5 text-center font-semibold text-ink shadow-lg shadow-white/10"
            >
              REQUEST ACCESS
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
