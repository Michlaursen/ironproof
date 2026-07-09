export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold text-foreground">
              IRON<span className="text-accent">PROOF</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              IronProof builds verifiable security infrastructure for AI and
              critical software. Our platform helps high-trust organizations
              prove whether AI agents, AI-generated code, and modernized
              systems comply with defined security and governance rules.
            </p>
            <p className="mt-3 font-mono text-xs text-seal">
              Sécurité vérifiable pour l&rsquo;IA et les logiciels.
            </p>
          </div>

          <div className="text-sm text-muted">
            <p>
              <a
                href="mailto:hello@ironproof.ai"
                className="hover:text-foreground"
              >
                hello@ironproof.ai
              </a>
            </p>
            <p className="mt-1">Canada</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} IronProof. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
