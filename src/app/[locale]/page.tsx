import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { Landing } from "@/components/landing/landing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // TODO(i18n): the ported slides carry English copy inline. Reconnect the
  // fr.ts / en.ts content system with Miguel so /fr renders French.
  return <Landing />;
}
