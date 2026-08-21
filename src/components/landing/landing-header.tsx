"use client";

import { useState } from "react";
import { IronProofLogo } from "@/components/ironproof-logo";
import { IconMenu, IconClose } from "@/components/icons";

type Variant = "home" | "sub";

// In-page anchors resolve to the home route from a sub-page ("/#platform") and
// stay in-page on home ("#platform"). "/provable-ai" is always an absolute route.
function links(variant: Variant): { href: string; label: string }[] {
  const p = variant === "sub" ? "/" : "";
  return [
    { href: `${p}#how`, label: "HOW IT WORKS" },
    { href: `${p}#start`, label: "AI AGENTS" },
    { href: `${p}#platform`, label: "PROOF" },
    { href: `${p}#verify`, label: "EVIDENCE" },
    { href: "/provable-ai", label: "PROVABLE AI" },
  ];
}

export function LandingHeader({ variant = "home" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const LINKS = links(variant);
  const logoHref = variant === "sub" ? "/" : "#top";
  const contactHref = variant === "sub" ? "/#contact" : "#contact";
  const isActive = (href: string) => variant === "sub" && href === "/provable-ai";

  return (
    <header className="edge-b sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-md">
      <div className="relative z-20 flex items-center gap-8 px-6 py-6 md:px-14">
        <a href={logoHref} className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <IronProofLogo width={26} height={35} />
          <span className="track-logo iron-text text-base font-semibold">IRONPROOF</span>
        </a>

        {/* Desktop nav */}
        <nav className="track-mid hidden flex-1 items-center justify-between pl-10 text-xs md:flex lg:pl-24">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-sm transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 ${
                isActive(l.href) ? "metal-shine" : "metal-text"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={contactHref}
            className="track-mid shrink-0 bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-5 py-2.5 font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
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
          className="chip-metal ml-auto flex h-10 w-10 shrink-0 items-center justify-center text-neutral-100 transition hover:text-white md:hidden"
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <nav className="edge-t relative z-20 bg-black/80 px-6 pb-6 pt-2 backdrop-blur md:hidden">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`track-mid border-b border-white/5 py-4 text-sm ${
                  isActive(l.href) ? "metal-shine" : "metal-text"
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
