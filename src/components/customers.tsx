import { Reveal } from "./reveal";
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
        <Reveal>
          <SectionHeading
            eyebrow="Built for"
            title="High-trust institutions where &ldquo;trust me&rdquo; is not enough."
          />
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {SEGMENTS.map((segment, i) => (
            <Reveal
              key={segment}
              delay={i * 0.04}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted"
            >
              {segment}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
