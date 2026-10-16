import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * ArchitecturePlate — the whole system as an engraved plate, drawn in HTML
 * instead of a dark screenshot (Dom, 2026-10-15: « une design bcp mieux qui
 * match notre nouveau site »). Same content, word for word, as the former
 * architecture-en/fr.webp: paper plate for the frame, an iron inset with gold
 * type for the engine (like the gate demo readout), the three verdicts in the
 * three metals of the site. Real text: sharp at any size, read by screen
 * readers, translated with the page.
 */

type Item = { t: string; d: string };
type Out = { k: string; t: string; d: string };

type ArchCopy = {
  fig: string;
  title: string;
  motto: string;
  refs: [string, string][];
  inputs: Item[];
  os: string;
  osRole: string;
  pillars: Item[];
  engine: string;
  neuralK: string;
  neuralT: string;
  neuralD: string;
  symbolicK: string;
  symbolicT: string;
  symbolicD: string;
  candidate: string;
  counterexample: string;
  verdicts: Item[];
  outputs: Out[];
};

const COPY: L<ArchCopy> = {
  en: {
    fig: "FIG. 01",
    title: "Architecture",
    motto: "Prove · Enforce · Seal · Verify",
    refs: [
      ["COBOL → Python", "arXiv 2610.11073"],
      ["Cobalt", "C vulnerabilities"],
    ],
    inputs: [
      { t: "Agent action", d: "+ policy" },
      { t: "COBOL program", d: "migration" },
      { t: "C vulnerability", d: "fix" },
    ],
    os: "Cognitive operating system",
    osRole: "Governs the engineering agent",
    pillars: [
      { t: "Persistent memory", d: "decisions, orders, measurements" },
      { t: "Learned rules", d: "from the agent's own past errors" },
      { t: "Claim checks", d: "no report without command and output" },
    ],
    engine: "Neuro-symbolic verification engine",
    neuralK: "Neural",
    neuralT: "Model proposes",
    neuralD: "translation, fix, encoding of the policy — never decides",
    symbolicK: "Symbolic",
    symbolicT: "Solver decides",
    symbolicD: "Z3 · Spacer for loops · CBMC for C · cvc5 as second solver",
    candidate: "Candidate",
    counterexample: "Counterexample",
    verdicts: [
      { t: "Proven", d: "within the stated model" },
      { t: "Refuted", d: "the counterexample" },
      { t: "Not demonstrated", d: "with the reason" },
    ],
    outputs: [
      { k: "Enforce", t: "Proceed, block or refuse", d: "before the action executes" },
      { k: "Seal", t: "Post-quantum signature", d: "on every gate decision — integrity, not truth" },
      { k: "Verify", t: "Anyone, offline", d: "without having to trust us" },
    ],
  },
  fr: {
    fig: "FIG. 01",
    title: "Architecture",
    motto: "Prouver · Appliquer · Sceller · Vérifier",
    refs: [
      ["COBOL → Python", "arXiv 2610.11073"],
      ["Cobalt", "Failles C"],
    ],
    inputs: [
      { t: "Action d’agent", d: "+ politique" },
      { t: "Programme COBOL", d: "migration" },
      { t: "Faille C", d: "correctif" },
    ],
    os: "Système d’exploitation cognitif",
    osRole: "Gouverne l’agent d’ingénierie",
    pillars: [
      { t: "Mémoire persistante", d: "décisions, ordres, mesures" },
      { t: "Règles apprises", d: "des erreurs passées de l’agent" },
      { t: "Contrôle des affirmations", d: "aucun rapport sans commande et sortie" },
    ],
    engine: "Moteur de vérification neuro-symbolique",
    neuralK: "Neuronal",
    neuralT: "Le modèle propose",
    neuralD: "traduction, correctif, encodage de la politique — ne décide jamais",
    symbolicK: "Symbolique",
    symbolicT: "Le solveur décide",
    symbolicD: "Z3 · Spacer pour les boucles · CBMC pour le C · cvc5 en second solveur",
    candidate: "Candidat",
    counterexample: "Contre-exemple",
    verdicts: [
      { t: "Prouvé", d: "dans le modèle déclaré" },
      { t: "Réfuté", d: "le contre-exemple" },
      { t: "Non démontré", d: "avec la raison" },
    ],
    outputs: [
      { k: "Appliquer", t: "Passe, bloque ou refuse", d: "avant que l’action s’exécute" },
      { k: "Sceller", t: "Signature post-quantique", d: "sur chaque décision — l’intégrité, pas la vérité" },
      { k: "Vérifier", t: "N’importe qui, hors ligne", d: "sans avoir à nous faire confiance" },
    ],
  },
};

const NUMERALS = ["I", "II", "III"];
const VERDICT_CLASS = ["arch-v-proven", "arch-v-refuted", "arch-v-open"];

export function ArchitecturePlate({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);

  return (
    <div className="arch-plate">
      {/* Title block, like the cartouche of an engineering drawing */}
      <header className="arch-head">
        <div>
          <p className="arch-mono arch-gold">{t.fig}</p>
          <p className="arch-title font-serif">{t.title}</p>
        </div>
        <div className="arch-refs">
          <p className="arch-mono arch-gold">{t.motto}</p>
          {t.refs.map(([a, b]) => (
            <p key={a} className="arch-mono">
              <span>{a}</span>
              <span>{b}</span>
            </p>
          ))}
        </div>
      </header>

      {/* Three inputs, converging */}
      <ol className="arch-inputs">
        {t.inputs.map((it, i) => (
          <li key={it.t} className="arch-input">
            <span className="arch-mono arch-gold">{NUMERALS[i]}</span>
            <span className="arch-input-t font-serif">{it.t}</span>
            <span className="arch-mono arch-input-d">{it.d}</span>
          </li>
        ))}
      </ol>
      <div className="arch-converge" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {/* Cognitive operating system: the frame around the engine */}
      <section className="arch-os">
        <p className="arch-legend arch-mono">
          <span>{t.os}</span>
          <span className="arch-legend-r">{t.osRole}</span>
        </p>
        <ul className="arch-pillars">
          {t.pillars.map((p) => (
            <li key={p.t}>
              <p className="arch-pillar-t font-serif">{p.t}</p>
              <p className="arch-pillar-d">{p.d}</p>
            </li>
          ))}
        </ul>

        {/* The engine: an iron inset, gold type */}
        <div className="arch-engine">
          <p className="arch-legend arch-mono arch-engine-legend">
            <span>{t.engine}</span>
          </p>
          <div className="arch-loop">
            <div className="arch-cell">
              <p className="arch-mono arch-cell-k">{t.neuralK}</p>
              <p className="arch-cell-t font-serif">{t.neuralT}</p>
              <p className="arch-cell-d">{t.neuralD}</p>
            </div>
            <div className="arch-exchange" aria-hidden="true">
              <span className="arch-mono">{t.candidate}</span>
              <span className="arch-rail arch-rail-fwd">
                <i />
              </span>
              <span className="arch-rail arch-rail-back">
                <i />
              </span>
              <span className="arch-mono">{t.counterexample}</span>
            </div>
            <div className="arch-cell arch-cell-gold">
              <p className="arch-mono arch-cell-k">{t.symbolicK}</p>
              <p className="arch-cell-t font-serif">{t.symbolicT}</p>
              <p className="arch-cell-d">{t.symbolicD}</p>
            </div>
          </div>
          <ul className="arch-verdicts">
            {t.verdicts.map((v, i) => (
              <li key={v.t} className={VERDICT_CLASS[i]}>
                <span className="arch-vmark" aria-hidden="true" />
                <span className="arch-v-t font-serif">{v.t}</span>
                <span className="arch-v-d">{v.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="arch-drop" aria-hidden="true" />

      {/* Enforce → Seal → Verify */}
      <ol className="arch-outputs">
        {t.outputs.map((o, i) => (
          <li key={o.k} className={i === 1 ? "arch-out arch-out-seal" : "arch-out"}>
            <p className="arch-mono arch-out-k">
              <span className="arch-gold">0{i + 1}</span> {o.k}
            </p>
            <p className="arch-out-t font-serif">{o.t}</p>
            <p className="arch-out-d">{o.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
