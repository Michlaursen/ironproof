import Image from "next/image";
import type { SiteContent } from "@/content";

type SiteFooterProps = { content: SiteContent["footer"] };

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/ironproof-wordmark-white-transparent.png"
              alt="Ironproof"
              width={1600}
              height={320}
              className="h-5 w-auto"
            />
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              {content.description}
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

        {/*
          Given its own row above the copyright so it reads as the page signing
          off, not as another line of footer boilerplate.
        */}
        <p className="mt-12 border-t border-border pt-8 text-lg font-medium text-balance text-foreground sm:text-xl">
          {content.closing}
        </p>

        <div className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} {content.copyright}
        </div>
      </div>
    </footer>
  );
}
