import { IronproofMark } from "@/components/ironproof-mark";
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
 * Second pass (Dom, 2026-11-11: « met moi ça plus sharp, top quality, couleur métallique…
 * c'est genre 10x moins qualité que le site »): the flow sits on one brushed-steel
 * instrument plate with a gold hairline frame and four screws; the inputs are gunmetal
 * tags; both medallions are turned metal (conic light) under a gold bezel; the three
 * answers carry enamel lamps; the gold wires carry a slow glint; the seal bears the
 * Ironproof mark with its words engraved round the rim.
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

const LAMP: Record<Copy["outcomes"][number]["tone"], string> = {
  ok: "any-gate-lamp-ok",
  red: "any-gate-lamp-red",
  grey: "any-gate-lamp-grey",
};

const WORD: Record<Copy["outcomes"][number]["tone"], string> = {
  ok: "text-[#2f6b4f]",
  red: "text-[#9b3b30]",
  grey: "text-[#4e5259]",
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
  const stroke = tone === "gold" ? "#5e4413" : "#3f434a";
  return (
    <svg viewBox="-60 -60 120 120" className="any-gate-engraving" aria-hidden="true">
      <g fill="none" stroke={stroke} strokeWidth={0.3} opacity={0.6}>
        <path id={id} d={rosettePath(46, 5, 18)} />
        {Array.from({ length: 15 }, (_, i) => (
          <use
            key={i}
            href={`#${id}`}
            transform={`rotate(${(((i + 1) * 360) / (18 * 16)).toFixed(3)})`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Circumference of the rim path (r = 49 in the 120-unit box): the text is stretched to it exactly. */
const RIM_LENGTH = 2 * Math.PI * 49 - 1;

/** The seal's words engraved round the rim. */
function RimText({ id, text }: { id: string; text: string }) {
  return (
    <svg viewBox="-60 -60 120 120" className="any-gate-rim" aria-hidden="true">
      <defs>
        <path id={id} d="M0,-49 A49,49 0 1,1 -0.01,-49" />
      </defs>
      <text className="any-gate-rim-text">
        <textPath href={`#${id}`} startOffset="0" textLength={RIM_LENGTH} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

function Wire() {
  return <span className="any-gate-wire" aria-hidden="true" />;
}

export function AnyCodeGate({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const rim = `${t.sealed} · ${t.sealedSub.toUpperCase()} · ${t.sealed} · ${t.sealedSub.toUpperCase()} · `;
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
      <div className="any-gate-plate mt-14">
        <span className="any-gate-screw any-gate-screw-tl" aria-hidden="true" />
        <span className="any-gate-screw any-gate-screw-tr" aria-hidden="true" />
        <span className="any-gate-screw any-gate-screw-bl" aria-hidden="true" />
        <span className="any-gate-screw any-gate-screw-br" aria-hidden="true" />
        <div className="any-gate-flow">
          <div className="any-gate-col">
            <p className="track-mid any-gate-label">{t.inputsLabel}</p>
            <ul className="any-gate-inputs">
              {t.inputs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <Wire />
          <div className="any-gate-medal any-gate-medal-steel">
            <div className="any-gate-face">
              <Engraving id="ag-steel" tone="steel" />
              <span className="track-mid any-gate-gate-word">{t.gate}</span>
              <span className="any-gate-gate-sub">{t.gateSub}</span>
            </div>
          </div>
          <Wire />
          <ul className="any-gate-outcomes">
            {t.outcomes.map((o) => (
              <li key={o.word}>
                <span className={`any-gate-lamp ${LAMP[o.tone]}`} aria-hidden="true" />
                <span className={`font-serif text-2xl ${WORD[o.tone]}`}>{o.word}</span>
                <span className="any-gate-note">{o.note}</span>
              </li>
            ))}
          </ul>
          <Wire />
          <div className="any-gate-medal any-gate-medal-gold">
            <div className="any-gate-face">
              <Engraving id="ag-gold" tone="gold" />
              <RimText id="ag-rim" text={rim} />
              <IronproofMark height={60} className="any-gate-mark" />
            </div>
            <span className="sr-only">
              {t.sealed}: {t.sealedSub}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
