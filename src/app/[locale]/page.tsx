import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { Landing } from "@/components/landing/landing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // The landing carries its own copy dictionaries (components/landing/i18n.ts),
  // one per component, read through `pick`. src/content/{en,fr}.ts still serves
  // the metadata in layout.tsx; it no longer feeds this page's body.
  return <Landing locale={locale} />;
}
