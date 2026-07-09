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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Solution />
        <Products />
        <Sovereignty />
        <UseCases />
        <Customers />
        <ProofPoints />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
