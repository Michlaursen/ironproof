import type { Locale } from "@/content";

/*
 * Under « How it works » (Dom, 2026-11-11, after reading Code Metal's home: « peu
 * importe le code, COBOL, Java, whatever », then « dit AI agents before execution »).
 * It replaces the Z3 theorem scene (theorem-scene.tsx, kept in git history).
 *
 * What it says, and why « decided », not « proven »: every case gets one of three
 * answers (holds, breaks with the exact case, not decided); proof is one of them. The
 * line where Ironproof differs from a code-translation vendor is on the right: the
 * answer is sealed, and it covers commands as well as code.
 *
 * Drawn in HTML, CSS and a small SVG, no image, no script. Metal and gold on the paper,
 * like the rings at the top of the page (Dom, 2026-11-11: « quelque chose de beau, pas du
 * noir laid comme avant »): the gate is an engraved steel medallion ringed in gold, the
 * seal a gold medallion, the inputs steel plates, the wires gold.
 *
 * FRERES-EXAMINES: theorem-scene.tsx (the screen this replaces), flow-diagram.tsx
 * (the method diagram on /proof-intelligence, same three outcomes).
 */

type Copy = {
  title: string;
  lead: string;
  inputsLabel: string;
  inputs: readonly string[];
  gate: string;
  gateSub: string;
  outcomes: readonly {
    word: string;
    note: string;
    tone: "ok" | "red" | "grey";
  }[];
  sealed: string;
  sealedSub: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    title: "Any code. Any command. Decided before it runs.",
    lead: "COBOL, Java, C, Python, access policies, AI agents before execution. One of three answers, and every answer is sealed.",
    inputsLabel: "WHAT COMES IN",
    inputs: ["COBOL", "Java", "C", "Python", "Access policies", "AI agents"],
    gate: "ONE GATE",
    gateSub: "before it runs",
    outcomes: [
      { word: "Holds", note: "proven within the stated model", tone: "ok" },
      { word: "Breaks", note: "the exact case that shows it", tone: "red" },
      { word: "Not decided", note: "said as such, never a pass", tone: "grey" },
    ],
    sealed: "SEALED",
    sealedSub: "re-check it without us",
  },
  fr: {
    title: "Tout code. Toute commande. Tranché avant l’exécution.",
    lead: "COBOL, Java, C, Python, politiques d’accès, agents IA avant l’exécution. Une réponse sur trois, et chaque réponse est scellée.",
    inputsLabel: "CE QUI ENTRE",
    inputs: ["COBOL", "Java", "C", "Python", "Politiques d’accès", "Agents IA"],
    gate: "UNE BARRIÈRE",
    gateSub: "avant l’exécution",
    outcomes: [
      { word: "Tient", note: "prouvé dans le modèle déclaré", tone: "ok" },
      { word: "Casse", note: "le cas exact qui le montre", tone: "red" },
      {
        word: "Non tranché",
        note: "dit tel quel, jamais un succès",
        tone: "grey",
      },
    ],
    sealed: "SCELLÉ",
    sealedSub: "revérifiable sans nous",
  },
};

const TONE: Record<Copy["outcomes"][number]["tone"], string> = {
  ok: "text-[#2f6b4f]",
  red: "text-[#9b3b30]",
  grey: "text-[#5b5f66]",
};

/** A small guilloche rosette, the same curve family as the hero rings. */
function rosettePath(radius: number, amplitude: number, lobes: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 360; i += 1) {
    const a = (2 * Math.PI * i) / 360;
    const r =
      radius +
      amplitude * Math.sin(lobes * a) +
      (amplitude / 3) * Math.cos(3 * lobes * a);
    pts.push(`${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Engraving({ id, tone }: { id: string; tone: "steel" | "gold" }) {
  const stroke = tone === "gold" ? "#6e521c" : "#5b5f66";
  return (
    <svg
      viewBox="-60 -60 120 120"
      className="any-gate-engraving"
      aria-hidden="true"
    >
      <g fill="none" stroke={stroke} strokeWidth={0.35} opacity={0.55}>
        <path id={id} d={rosettePath(44, 6, 14)} />
        {Array.from({ length: 11 }, (_, i) => (
          <use
            key={i}
            href={`#${id}`}
            transform={`rotate(${(((i + 1) * 360) / (14 * 12)).toFixed(3)})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function AnyCodeGate({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <div className="any-gate fade-up mt-20">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="font-serif text-4xl font-normal leading-[1.08] text-[#24262a] md:text-5xl">
          {t.title}
        </h3>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5b5f66] md:text-lg">
          {t.lead}
        </p>
      </div>
      <div className="any-gate-flow mt-14">
        <div className="any-gate-col">
          <p className="track-mid any-gate-label">{t.inputsLabel}</p>
          <ul className="any-gate-inputs">
            {t.inputs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <span className="any-gate-wire" aria-hidden="true" />
        <div className="any-gate-medal any-gate-medal-steel">
          <Engraving id="ag-steel" tone="steel" />
          <span className="track-mid any-gate-gate-word">{t.gate}</span>
          <span className="any-gate-gate-sub">{t.gateSub}</span>
        </div>
        <span className="any-gate-wire" aria-hidden="true" />
        <ul className="any-gate-outcomes">
          {t.outcomes.map((o) => (
            <li key={o.word}>
              <span className={`font-serif text-2xl ${TONE[o.tone]}`}>
                {o.word}
              </span>
              <span className="any-gate-note">{o.note}</span>
            </li>
          ))}
        </ul>
        <span className="any-gate-wire" aria-hidden="true" />
        <div className="any-gate-medal any-gate-medal-gold">
          <Engraving id="ag-gold" tone="gold" />
          <span className="track-mid any-gate-gate-word">{t.sealed}</span>
          <span className="any-gate-gate-sub">{t.sealedSub}</span>
        </div>
      </div>
    </div>
  );
}
