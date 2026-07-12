import Link from "next/link";
import { DemoRequestForm } from "./demo-request-form";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            In a world of AI uncertainty
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            IronProof gives institutions something rare: evidence.
          </h2>
          <p className="mt-6 text-lg text-muted">
            IronProof is not selling trust. IronProof is selling proof.
          </p>

          <div className="mt-10">
            <DemoRequestForm />
          </div>

          <p className="mt-6 text-sm text-muted">
            Looking to become a design partner instead? Email us at{" "}
            <Link
              href="mailto:hello@ironproof.ai"
              className="text-accent hover:underline"
            >
              hello@ironproof.ai
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
