"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale, SiteContent } from "@/content";
import { IconClose, IconMenu } from "./icons";
import { IronProofLogo } from "./ironproof-logo";

type SiteHeaderProps = {
  content: SiteContent["header"];
  locale: Locale;
};

export function SiteHeader({ content, locale }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const otherLocaleHref = locale === "en" ? "/fr" : "/en";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="flex items-center gap-2.5">
          <IronProofLogo className="h-7 w-auto md:h-9" />
          <span className="track-logo iron-text text-base font-semibold md:text-lg">
            IRONPROOF
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {content.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Plain <a>, not next/link: switching locale means crossing to a
            different param value of the [locale] segment that also renders
            the root <html> layout. Client-side soft navigation between two
            such instances renders Next's not-found boundary despite the
            server returning a valid 200 (reproduced consistently in prod
            builds). A full page load always resolves correctly.
          */}
          <a
            href={otherLocaleHref}
            className="hidden rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-foreground lg:inline-flex"
          >
            {content.langSwitchLabel}
          </a>

          <Link
            href="#contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {content.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {content.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-sm text-muted last:border-b-0 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={otherLocaleHref}
              onClick={() => setOpen(false)}
              className="py-3.5 text-sm text-muted hover:text-foreground"
            >
              {content.langSwitchLabel}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
