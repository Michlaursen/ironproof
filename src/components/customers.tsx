import { SectionHeading } from "./section-heading";

const SEGMENTS = [
  "Banks",
  "Insurance companies",
  "Government agencies",
  "Critical infrastructure operators",
  "Telecoms",
  "Healthcare administration platforms",
  "Modernization partners",
  "Enterprise SaaS deploying AI agents",
  "Cybersecurity & compliance teams",
];

export function Customers() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Built for"
          title="High-trust institutions where &ldquo;trust me&rdquo; is not enough."
        />

        <div className="mt-12 flex flex-wrap gap-3">
          {SEGMENTS.map((segment) => (
            <span
              key={segment}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted"
            >
              {segment}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
