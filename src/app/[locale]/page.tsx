import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Attributions } from "@/components/attributions";
import { ProofLab } from "@/components/proof-lab";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { ArtifactWalkthrough } from "@/components/artifact-walkthrough";
import { Products } from "@/components/products";
import { Comparison } from "@/components/comparison";
import { Sovereignty } from "@/components/sovereignty";
import { Corpus } from "@/components/corpus";
import { Sector } from "@/components/sector";
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
        <Attributions content={content.attributions} />
        <ProofLab content={content.lab} />
        <Problem content={content.problem} />
        <Solution content={content.solution} />
        <ArtifactWalkthrough content={content.artifact} />
        <Products content={content.products} />
        <Comparison content={content.comparison} />
        <Sovereignty content={content.sovereignty} />
        <Corpus content={content.corpus} />
        <Sector content={content.sector} />
        <FinalCta content={content.finalCta} locale={locale} />
      </main>
      <SiteFooter content={content.footer} />
    </div>
  );
}
