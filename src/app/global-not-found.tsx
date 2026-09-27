import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import Link from "next/link";
import { IronproofMark } from "@/components/ironproof-mark";
import "./globals.css";

/*
 * The site's 404. global-not-found and not a [locale]/not-found: the root
 * layout lives under the dynamic [locale] segment, so an unmatched URL never
 * reaches a layout that could render a branded page (Next 16 docs, case 2).
 * It bypasses every layout, hence its own fonts and globals.css. Bilingual,
 * because the URL that failed says nothing reliable about the reader's language.
 */

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const ebGaramond = EB_Garamond({ variable: "--font-eb-garamond", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Page not found | Ironproof",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <IronproofMark height={96} className="mb-10 h-20 w-auto md:h-24" />
        <p className="seal-label track-mid mb-6 text-xs">404</p>
        <h1 className="font-serif text-4xl font-normal leading-[1.08] text-neutral-100 md:text-6xl">
          This page does not exist.
          <br />
          <em className="text-seal">Nothing ran here.</em>
        </h1>
        <p className="mt-6 max-w-md text-sm font-light text-neutral-400">
          Cette page n&rsquo;existe pas.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="track-mid inline-flex items-center gap-3 rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink transition hover:from-neutral-100 hover:to-white"
          >
            Back to ironproof.ai <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/fr"
            className="track-mid border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
          >
            Accueil en français
          </Link>
        </div>
      </body>
    </html>
  );
}
