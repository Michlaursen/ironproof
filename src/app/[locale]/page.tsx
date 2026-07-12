import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { Products } from "@/components/products";
import { Sovereignty } from "@/components/sovereignty";
import { UseCases } from "@/components/use-cases";
import { Customers } from "@/components/customers";
import { ProofPoints } from "@/components/proof-points";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader locale={locale} content={content.header} />
      <main className="flex-1">
        <Hero content={content.hero} />
        <Problem content={content.problem} />
        <Solution content={content.solution} />
        <Products content={content.products} />
        <Sovereignty content={content.sovereignty} />
        <UseCases content={content.useCases} />
        <Customers content={content.customers} />
        <ProofPoints content={content.proofPoints} />
        <FinalCta content={content.finalCta} locale={locale} />
      </main>
      <SiteFooter content={content.footer} />
    </div>
  );
}
