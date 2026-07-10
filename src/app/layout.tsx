import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "IronProof — Provable security for AI and critical software",
  description:
    "IronProof is the proof layer for high-trust organizations deploying AI agents, AI-generated code, and modernized software. We verify what systems are allowed to do, prove whether violations are possible, and seal the result as portable evidence.",
  openGraph: {
    title: "IronProof — Provable security for AI and critical software",
    description:
      "From AI risk to machine-checkable proof. IronProof verifies critical code and AI actions before trust is given.",
    type: "website",
  },
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
        <div className="bg-grid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
