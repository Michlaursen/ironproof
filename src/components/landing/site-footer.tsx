import { IronproofMark } from "@/components/ironproof-mark";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { siteNav } from "./site-nav";

/*
 * One footer for every page, rendered by the [locale] layout. Its columns are
 * siteNav() -- the same groups as the header -- so a page reachable from the
 * top is reachable from the bottom. The tagline and the LinkedIn link moved
 * here verbatim from the home page's old footer.
 */

const T: L<{ tagline: string; company: string; contact: string }> = {
  en: {
    tagline: "Deterministic authorization. Independently verifiable proof.",
    company: "COMPANY",
    contact: "Contact",
  },
  fr: {
    tagline: "Autorisation déterministe. Preuve vérifiable de façon indépendante.",
    company: "ENTREPRISE",
    contact: "Contact",
  },
};

const linkCls = "text-sm font-light text-neutral-300 transition hover:text-white";

export function SiteFooter({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  const nav = siteNav(locale);
  return (
    <footer className="relative z-10 edge-t px-6 pb-12 pt-16 md:px-14">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href={locale === defaultLocale ? "/" : `/${locale}`} className="inline-flex items-center gap-3">
            <IronproofMark height={30} />
            <span className="track-logo iron-brushed text-sm font-semibold">IRONPROOF</span>
          </a>
          <p className="mt-5 max-w-xs text-sm font-light text-neutral-400">{t.tagline}</p>
        </div>
        {nav.groups.map((g) => (
          <div key={g.id}>
            <p className="seal-label track-mid mb-4 text-[11px]">{g.label}</p>
            <ul className="space-y-2.5">
              {g.items.map((it) => (
                <li key={it.href}>
                  <a href={it.href} className={linkCls}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="seal-label track-mid mb-4 text-[11px]">{t.company}</p>
          <ul className="space-y-2.5">
            {nav.company.map((it) => (
              <li key={it.href}>
                <a href={it.href} className={linkCls}>
                  {it.label}
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:hello@ironproof.ai" className={linkCls}>
                {t.contact}
              </a>
            </li>
            <li>
              {/* The company page, so a buyer can check there are people behind
                * the site without searching (URL given by Dom, 2026-09-26). */}
              <a href="https://www.linkedin.com/company/ironproof/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                LinkedIn <span aria-hidden="true">&#8599;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
