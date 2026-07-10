import Link from "next/link";
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:hello@ironproof.ai"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Request a demo
            </Link>
            <Link
              href="mailto:hello@ironproof.ai"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Become a design partner
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
