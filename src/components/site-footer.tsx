import type { SiteContent } from "@/content";

type SiteFooterProps = { content: SiteContent["footer"] };

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold text-foreground">
              IRON<span className="text-accent">PROOF</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              {content.description}
            </p>
            <p className="mt-3 font-mono text-xs text-seal">
              {content.tagline}
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
            <p className="mt-1">{content.country}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {content.copyright}
        </div>
      </div>
    </footer>
  );
}
