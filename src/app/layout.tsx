import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ironproof.ai"),
  title: "IronProof — Provable security for AI and critical software",
  description:
    "IronProof is the proof layer for high-trust organizations deploying AI agents, AI-generated code, and modernized software. We verify what systems are allowed to do, prove whether violations are possible, and seal the result as portable evidence.",
  openGraph: {
    title: "IronProof — Provable security for AI and critical software",
    description:
      "From AI risk to machine-checkable proof. IronProof verifies critical code and AI actions before trust is given.",
    type: "website",
    url: "https://ironproof.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "IronProof — Provable security for AI and critical software",
    description:
      "From AI risk to machine-checkable proof. IronProof verifies critical code and AI actions before trust is given.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ironproof.ai/#organization",
      name: "IronProof",
      url: "https://ironproof.ai",
      logo: "https://ironproof.ai/icon.png",
      description:
        "IronProof is a Canadian cybersecurity and AI assurance company building verifiable security infrastructure for AI agents, AI-generated code, and critical software.",
      slogan:
        'IronProof moves organizations from "probably secure" to "provably secure."',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
