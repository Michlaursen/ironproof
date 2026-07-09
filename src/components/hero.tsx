import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--surface)_0%,_var(--background)_60%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            Verifiable security infrastructure
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Provable security for AI and critical software.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted text-balance">
            IronProof is the proof layer for high-trust organizations
            deploying AI agents, AI-generated code, and modernized software.
            We verify what systems are allowed to do, prove whether
            violations are possible, and seal the result as portable
            evidence.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Request a demo
            </Link>
            <Link
              href="#solution"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              See how it works
            </Link>
          </div>

          <p className="mt-12 text-sm text-muted">
            IronProof moves organizations from{" "}
            <span className="text-foreground">&ldquo;probably secure&rdquo;</span>{" "}
            to <span className="text-foreground">&ldquo;provably secure.&rdquo;</span>
          </p>
        </div>

        <ProofArtifactCard />
      </div>
    </section>
  );
}

function ProofArtifactCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Proof Artifact
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-seal/10 px-2.5 py-1 font-mono text-[11px] font-medium text-seal">
          <span className="h-1.5 w-1.5 rounded-full bg-seal" />
          VERIFIED
        </span>
      </div>

      <dl className="mt-4 space-y-3 font-mono text-xs">
        <Row label="Scope" value="defined input space" />
        <Row label="Rule set" value="policy-v3.2" />
        <Row label="Result" value="no violation found" accent />
        <Row label="Sealing" value="post-quantum signature" />
        <Row label="Verifier" value="offline / public key" />
      </dl>

      <div className="mt-5 rounded-md border border-border bg-surface-2 p-3">
        <p className="font-mono text-[10px] leading-relaxed text-muted break-all">
          8f4a1c9e2b7d0f31 5e6a9c2d1b8f4e07
          <br />
          a3c5e8f1d4b7906c 2f8e1a4c7b9d3e05
        </p>
      </div>

      <p className="mt-4 text-[11px] text-muted">
        Independently verifiable, even offline — without trusting the
        original system.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "text-accent" : "text-foreground"}>{value}</dd>
    </div>
  );
}
