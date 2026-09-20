import { TestingDots, ProvingDots } from "./compare-dots";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * Testing vs. Proving — moved off the homepage on 2026-09-10.
 *
 * The block is technically the strongest thing we had, and that was the
 * problem: it stalled the commercial path between "why is it different" and
 * "prove it". It belongs where the reader has already asked for the method,
 * so it now lives on /proof, between the artifact explorer and the public
 * record: here is a sealed artifact, here is what "proven" actually means,
 * here is the record behind the engine.
 */

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  testing: string;
  testingQ: string;
  testingPoints: readonly React.ReactNode[];
  proving: string;
  provingQ: string;
  provingPoints: readonly React.ReactNode[];
  confidence: string;
  partial: string;
  guarantee: string;
  foot: string;
};

const T: L<Copy> = {
  en: {
    eyebrow: "THE MECHANISM",
    title: "Testing vs. Proving",
    lead: "Testing and formal verification answer different questions.",
    testing: "TESTING",
    testingQ: "Did the executions we tried behave correctly?",
    testingPoints: [
      "Checks the cases someone thought of",
      <>
        &quot;Passed&quot; means <em>probably</em> fine
      </>,
    ],
    proving: "PROVING",
    provingQ: "Can the defined property be violated anywhere in the modeled state space?",
    provingPoints: [
      "Reasons exhaustively over the formally defined state space",
      "If the formal model admits a violation, Ironproof produces a counterexample",
      <>
        &quot;Proven&quot; means the defined property cannot be violated within the formal model
      </>,
    ],
    confidence: "CONFIDENCE",
    partial: "Partial",
    guarantee: "Mathematical guarantee within the model",
    foot: "Ironproof does not replace testing. It proves properties that testing cannot exhaustively cover.",
  },
  fr: {
    eyebrow: "LE MÉCANISME",
    title: "Tester ou prouver",
    lead: "Le test et la vérification formelle ne répondent pas à la même question.",
    testing: "TESTER",
    testingQ: "Les exécutions que nous avons essayées se sont-elles bien comportées ?",
    testingPoints: [
      "Vérifie les cas auxquels quelqu’un a pensé",
      <>
        «&#8239;Réussi&#8239;» veut dire <em>probablement</em> correct
      </>,
    ],
    proving: "PROUVER",
    provingQ:
      "La propriété définie peut-elle être violée quelque part dans l’espace d’états modélisé ?",
    provingPoints: [
      "Raisonne exhaustivement sur l’espace d’états défini formellement",
      "Si le modèle formel admet une violation, Ironproof produit un contre-exemple",
      <>
        «&#8239;Prouvé&#8239;» veut dire que la propriété définie ne peut pas être violée à
        l’intérieur du modèle formel
      </>,
    ],
    confidence: "CONFIANCE",
    partial: "Partielle",
    guarantee: "Garantie mathématique à l’intérieur du modèle",
    foot: "Ironproof ne remplace pas le test. Il prouve des propriétés que le test ne peut pas couvrir exhaustivement.",
  },
};

export function TestingVsProving({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  return (
    <section id="compare" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-16 text-center">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
        </div>
        <div className="fade-up grid gap-6 md:grid-cols-2">
          <div className="card-premium p-10">
            <p className="track-mid mb-6 text-xs text-neutral-400">{t.testing}</p>
            <p className="mb-6 font-serif text-2xl leading-snug text-neutral-100">{t.testingQ}</p>
            <TestingDots />
            <ul className="space-y-3 text-sm">
              {t.testingPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-neutral-400">
                  <span className="mt-0.5 text-neutral-500">&#9675;</span>{" "}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="my-6 h-px w-full bg-white/5" />
            <div className="flex items-baseline justify-between">
              <span className="track-mid text-xs text-neutral-500">{t.confidence}</span>
              <span className="font-serif text-2xl text-neutral-300">{t.partial}</span>
            </div>
          </div>
          <div className="card-premium p-10" style={{ borderColor: "rgba(220,225,255,0.18)" }}>
            <p className="track-mid mb-6 text-xs text-neutral-300">{t.proving}</p>
            <p className="mb-6 font-serif text-2xl leading-snug text-neutral-100">{t.provingQ}</p>
            <ProvingDots />
            <ul className="space-y-3 text-sm">
              {t.provingPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-neutral-300">
                  <span className="icon-metal mt-0.5">&#10003;</span>{" "}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="my-6 h-px w-full bg-white/5" />
            <div className="flex items-baseline justify-between gap-6">
              <span className="track-mid shrink-0 text-xs text-neutral-500">{t.confidence}</span>
              <span className="metal-text font-serif text-2xl leading-snug text-right">
                {t.guarantee}
              </span>
            </div>
          </div>
        </div>
        <p className="fade-up mt-10 text-center text-lg font-light text-neutral-300">{t.foot}</p>
      </div>
    </section>
  );
}
