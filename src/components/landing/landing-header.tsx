"use client";

import { useState } from "react";
import { IronProofLogo } from "@/components/ironproof-logo";
import { IconMenu, IconClose } from "@/components/icons";

const LINKS: { href: string; label: string }[] = [
  { href: "#platform", label: "PLATFORM" },
  { href: "#speed", label: "SPEED" },
  { href: "#compare", label: "VS TESTING" },
  { href: "#try", label: "TRY IT" },
  { href: "#verify", label: "VERIFY" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="edge-b sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-md">
      <div className="relative z-20 flex items-center gap-8 px-6 py-6 md:px-14">
        <a href="#top" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <IronProofLogo width={26} height={35} />
          <span className="track-logo iron-text text-base font-semibold">IRONPROOF</span>
        </a>

        {/* Desktop nav */}
        <nav className="track-mid hidden flex-1 items-center justify-between pl-10 text-xs md:flex lg:pl-24">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="metal-text rounded-sm transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
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
                onClick={() => setOpen(false)}
                className="track-mid metal-text border-b border-white/5 py-4 text-sm"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
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
