import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { getContent, isLocale, locales } from "@/content";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const content = getContent(locale);
  const path = locale === "en" ? "/" : `/${locale}`;

  return {
    metadataBase: new URL("https://ironproof.ai"),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: path,
      languages: {
        en: "/",
        fr: "/fr",
        "x-default": "/",
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.ogDescription,
      type: "website",
      url: `https://ironproof.ai${path}`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.ogDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  // The hero's four-part tagline was replaced by a single headline; the
  // structured-data slogan now reads from that rather than reassembling copy
  // that no longer exists.
  const slogan = content.hero.headline;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ironproof.ai/#organization",
        name: "IronProof",
        url: "https://ironproof.ai",
        logo: "https://ironproof.ai/icon.png",
        description: content.meta.description,
        slogan,
        email: "hello@ironproof.ai",
        areaServed: "Global",
        knowsAbout: [
          "AI governance",
          "Formal verification",
          "AI agent security",
          "Software supply chain security",
          "Post-quantum cryptography",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://ironproof.ai/#website",
        name: "IronProof",
        url: "https://ironproof.ai",
        publisher: { "@id": "https://ironproof.ai/#organization" },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="bg-grid" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
