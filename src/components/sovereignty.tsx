import { SectionHeading } from "./section-heading";

const FEATURES = [
  {
    title: "Post-quantum sealing",
    body: "Proof artifacts are sealed using post-quantum cryptographic principles — future-resistant evidence.",
  },
  {
    title: "Offline verification",
    body: "A verifier can check the proof artifact later using public keys only, without access to the original system.",
  },
  {
    title: "Sovereign deployment",
    body: "Sovereign, local, private, and compatible with air-gapped or high-control environments.",
  },
];

export function Sovereignty() {
  return (
    <section id="sovereignty" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Sovereignty"
              title="Built for sovereign and air-gapped environments."
              description="IronProof is designed for institutions that cannot send sensitive systems, code, data, or decisions into uncontrolled environments. Proof artifacts can be sealed and independently verified without relying on the original system."
            />
            <p className="mt-6 font-mono text-sm text-seal">
              Sécurité vérifiable pour l&rsquo;IA et les logiciels.
            </p>
          </div>

          <div className="space-y-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
