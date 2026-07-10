import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const PROOF_POINTS = [
  { stat: "3", label: "CVEs assigned" },
  { stat: "0", label: "False positives proven" },
  { stat: "100%", label: "Mathematical verification over defined input space" },
  { stat: "PQ", label: "Post-quantum sealed proof artifacts" },
  { stat: "0", label: "Vendor access required for offline verification" },
  { stat: "CA", label: "Sovereign Canadian deployment posture" },
];

export function ProofPoints() {
  return (
    <section id="proof-points" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Proof, not promises"
            title="Evidence you can independently verify."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROOF_POINTS.map((point, i) => (
            <Reveal
              key={point.label}
              delay={i * 0.06}
              className="rounded-lg border border-border bg-surface-2 p-6"
            >
              <p className="font-mono text-3xl font-semibold text-accent">
                {point.stat}
              </p>
              <p className="mt-2 text-sm text-muted">{point.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
