import Link from "next/link";

const NAV_LINKS = [
  { href: "#products", label: "Product" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#sovereignty", label: "Sovereignty" },
  { href: "#proof-points", label: "Proof" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="font-mono text-base font-semibold tracking-tight text-foreground"
        >
          IRON<span className="text-accent">PROOF</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Request a demo
        </Link>
      </div>
    </header>
  );
}
