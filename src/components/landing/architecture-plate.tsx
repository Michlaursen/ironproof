import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * ArchitecturePlate — the whole system as an engineering sheet, drawn in HTML
 * (Dom, 2026-10-15: « c plus que sa notre architecture, met sa serieux, montre
 * le niveau »). Seven layers, top to bottom, on one gold decision path; the
 * engineering agent's operating system as a rail on the side; each declared
 * limit pinned in the margin of the layer it belongs to.
 *
 * Every sentence is lifted from the audited copy of this same page
 * (neuro-symbolic-copy.tsx, read against ironproof on 2026-10-12) or from the
 * former architecture-en/fr.webp. Nothing here is new as a claim: if a step
 * changes there, it changes here.
 */

type Item = { t: string; d: string };
type Note = { k: string; t: string };
type Layer = { code: string; k: string; t: string; d: string; note?: Note };

type ArchCopy = {
  sheet: string;
  title: string;
  sub: string;
  motto: string;
  block: [string, string][];
  pathLabel: string;
  layers: Layer[];
  inputs: Item[];
  untrusted: string;
  proposes: string[];
  forms: [string, string];
  formsNote: string;
  engine: string;
  neuralK: string;
  neuralT: string;
  neuralD: string;
  symbolicK: string;
  symbolicT: string;
  candidate: string;
  counterexample: string;
  solvers: Item[];
  recheck: Item;
  verdicts: Item[];
  lean: Item;
  outcomes: Item[];
  noModel: string;
  sealKeys: string;
  sealWhat: string;
  verifyOut: string;
  rail: { k: string; t: string; items: string[] };
};

const COPY: L<ArchCopy> = {
  en: {
    sheet: "SHEET IP-ARCH-01",
    title: "System architecture",
    sub: "From a proposed action to a proof you hold. One engine, the same path on every surface.",
    motto: "Prove · Enforce · Seal · Verify",
    block: [
      ["Drawing", "IP-ARCH-01"],
      ["Edition", "2026-10"],
      ["Sheet", "1 / 1"],
      ["Scale", "Not to scale"],
    ],
    pathLabel: "Decision path",
    layers: [
      { code: "L1", k: "Input", t: "What enters", d: "Three surfaces, one engine." },
      {
        code: "L2",
        k: "Propose",
        t: "The model proposes",
        d: "The neural side: language, ambiguity, breadth.",
        note: { k: "Limit · the model", t: "We don’t make the model safe. We make sure it cannot get what the rule forbids." },
      },
      {
        code: "L3",
        k: "Compile",
        t: "Your rule becomes logic",
        d: "Compiled once. One compiler, so proof and runtime cannot quietly disagree.",
        note: { k: "Limit · specification", t: "A proof is only as good as the rule. Whether it says what you meant is human work — we do it with you." },
      },
      {
        code: "L4",
        k: "Prove",
        t: "The engine decides",
        d: "Every case in the class, not a sample.",
        note: { k: "Limit · scope", t: "Proven within a stated class. Outside it, the proof says nothing — and the dossier states the boundary." },
      },
      { code: "L5", k: "Enforce", t: "Every action, at run time", d: "Checked against the same compiled rule, before it executes." },
      { code: "L6", k: "Seal", t: "Post-quantum record", d: "Hash-chained. Any later edit is detectable.", note: { k: "What a seal shows", t: "The record was not changed, and which keys signed it — integrity, not truth." } },
      { code: "L7", k: "Verify", t: "Offline, without us", d: "Your auditor re-checks the sealed record with an independent verifier." },
    ],
    inputs: [
      { t: "Agent action", d: "+ its policy · Actions" },
      { t: "COBOL program", d: "Migration · arXiv 2610.11073" },
      { t: "C vulnerability", d: "Fix · Cobalt" },
    ],
    untrusted: "Untrusted · never decides",
    proposes: ["the action", "a translation", "a fix", "a first draft of the rule"],
    forms: ["Solver form", "Runtime form"],
    formsNote: "same source",
    engine: "Neuro-symbolic verification engine",
    neuralK: "Neural",
    neuralT: "Candidate",
    neuralD: "A translation, a fix, an encoding of the policy. Never decides.",
    symbolicK: "Symbolic",
    symbolicT: "Solver",
    candidate: "candidate",
    counterexample: "counterexample",
    solvers: [
      { t: "Z3", d: "SMT solver" },
      { t: "Spacer", d: "inductive invariants" },
      { t: "CBMC", d: "for C" },
      { t: "cvc5", d: "second solver" },
    ],
    recheck: { t: "Re-check", d: "The invariant is re-checked in a fresh solver before the kernel seals its verdict. Finding a proof and checking it are kept apart." },
    verdicts: [
      { t: "Proven", d: "no case can break the rule" },
      { t: "Refuted", d: "here is the exact case" },
      { t: "Not demonstrated", d: "never counted as a pass" },
    ],
    lean: { t: "Lean 4", d: "Deciding by evaluation and deciding by the solver give the same answer, for every policy and every action — a theorem checked in Lean 4." },
    outcomes: [
      { t: "PROCEED", d: "runs" },
      { t: "BLOCK", d: "does not run" },
      { t: "REFUSE", d: "does not run" },
    ],
    noModel: "No language model votes on this path.",
    sealKeys: "Ed25519 + ML-DSA-65 · FIPS 204",
    sealWhat: "Every gate decision, allowed or blocked · every proof verdict",
    verifyOut: "Verification dossier",
    rail: {
      k: "Cognitive operating system",
      t: "Governs the engineering agent",
      items: ["Persistent memory", "Rules learned from its own errors", "No report without command and output"],
    },
  },
  fr: {
    sheet: "PLANCHE IP-ARCH-01",
    title: "Architecture du système",
    sub: "D’une action proposée à une preuve que vous détenez. Un moteur, le même chemin sur chaque surface.",
    motto: "Prouver · Appliquer · Sceller · Vérifier",
    block: [
      ["Dessin", "IP-ARCH-01"],
      ["Édition", "2026-10"],
      ["Planche", "1 / 1"],
      ["Échelle", "Sans échelle"],
    ],
    pathLabel: "Chemin de décision",
    layers: [
      { code: "C1", k: "Entrée", t: "Ce qui entre", d: "Trois surfaces, un seul moteur." },
      {
        code: "C2",
        k: "Proposer",
        t: "Le modèle propose",
        d: "Le côté neuronal : le langage, l’ambiguïté, l’étendue.",
        note: { k: "Limite · le modèle", t: "Nous ne rendons pas le modèle sûr. Nous faisons en sorte qu’il n’obtienne pas ce que la règle interdit." },
      },
      {
        code: "C3",
        k: "Compiler",
        t: "Votre règle devient logique",
        d: "Compilée une fois. Un seul compilateur : la preuve et l’exécution ne peuvent pas diverger en silence.",
        note: { k: "Limite · spécification", t: "Une preuve vaut ce que vaut la règle. Qu’elle dise ce que vous vouliez dire est un travail humain — nous le faisons avec vous." },
      },
      {
        code: "C4",
        k: "Prouver",
        t: "Le moteur tranche",
        d: "Tous les cas de la classe, pas un échantillon.",
        note: { k: "Limite · portée", t: "Prouvé dans une classe déclarée. Hors de cette classe, la preuve ne dit rien — et le dossier en trace la frontière." },
      },
      { code: "C5", k: "Appliquer", t: "Chaque action, à l’exécution", d: "Vérifiée contre la même règle compilée, avant qu’elle s’exécute." },
      { code: "C6", k: "Sceller", t: "Registre post-quantique", d: "Chaîné par empreintes. Toute modification ultérieure se détecte.", note: { k: "Ce que montre un sceau", t: "Que la trace n’a pas changé, et quelles clés l’ont signée — l’intégrité, pas la vérité." } },
      { code: "C7", k: "Vérifier", t: "Hors ligne, sans nous", d: "Votre auditeur revérifie la trace scellée avec un vérificateur indépendant." },
    ],
    inputs: [
      { t: "Action d’agent", d: "+ sa politique · Actions" },
      { t: "Programme COBOL", d: "Migration · arXiv 2610.11073" },
      { t: "Faille C", d: "Correctif · Cobalt" },
    ],
    untrusted: "Non fiable · ne décide jamais",
    proposes: ["l’action", "une traduction", "un correctif", "une première version de la règle"],
    forms: ["Forme du solveur", "Forme d’exécution"],
    formsNote: "même source",
    engine: "Moteur de vérification neuro-symbolique",
    neuralK: "Neuronal",
    neuralT: "Candidat",
    neuralD: "Une traduction, un correctif, un encodage de la politique. Ne décide jamais.",
    symbolicK: "Symbolique",
    symbolicT: "Solveur",
    candidate: "candidat",
    counterexample: "contre-exemple",
    solvers: [
      { t: "Z3", d: "solveur SMT" },
      { t: "Spacer", d: "invariants inductifs" },
      { t: "CBMC", d: "pour le C" },
      { t: "cvc5", d: "second solveur" },
    ],
    recheck: { t: "Revérification", d: "L’invariant est revérifié dans un solveur neuf avant que le noyau scelle son verdict. Trouver une preuve et la vérifier restent séparés." },
    verdicts: [
      { t: "Prouvé", d: "aucun cas ne peut briser la règle" },
      { t: "Réfuté", d: "voici le cas exact" },
      { t: "Non démontré", d: "jamais compté comme un succès" },
    ],
    lean: { t: "Lean 4", d: "Décider par évaluation et décider par le solveur donnent la même réponse, pour toute politique et toute action — un théorème vérifié en Lean 4." },
    outcomes: [
      { t: "PROCEED", d: "s’exécute" },
      { t: "BLOCK", d: "ne s’exécute pas" },
      { t: "REFUSE", d: "ne s’exécute pas" },
    ],
    noModel: "Aucun modèle de langage ne vote sur ce chemin.",
    sealKeys: "Ed25519 + ML-DSA-65 · FIPS 204",
    sealWhat: "Chaque décision de la barrière, permise ou bloquée · chaque verdict de preuve",
    verifyOut: "Dossier de vérification",
    rail: {
      k: "Système d’exploitation cognitif",
      t: "Gouverne l’agent d’ingénierie",
      items: ["Mémoire persistante", "Règles apprises de ses propres erreurs", "Aucun rapport sans commande et sortie"],
    },
  },
};

const VERDICT_CLASS = ["arch-v-proven", "arch-v-refuted", "arch-v-open"];

function LayerHead({ layer }: { layer: Layer }) {
  return (
    <div className="arch-lh">
      <p className="arch-mono arch-lh-code">{layer.code}</p>
      <p className="arch-mono arch-lh-k">{layer.k}</p>
      <p className="arch-lh-t font-serif">{layer.t}</p>
      <p className="arch-lh-d">{layer.d}</p>
    </div>
  );
}

function LayerNote({ note }: { note?: Note }) {
  if (!note) return <div className="arch-ln arch-ln-empty" aria-hidden="true" />;
  return (
    <aside className="arch-ln">
      <p className="arch-mono arch-ln-k">{note.k}</p>
      <p className="arch-ln-t">{note.t}</p>
    </aside>
  );
}

export function ArchitecturePlate({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);
  const [l1, l2, l3, l4, l5, l6, l7] = t.layers;

  return (
    <div className="arch-sheet">
      <header className="arch-top">
        <div>
          <p className="arch-mono arch-gold">{t.sheet}</p>
          <h2 className="arch-title font-serif">{t.title}</h2>
          <p className="arch-sub">{t.sub}</p>
        </div>
        <p className="arch-mono arch-gold arch-motto">{t.motto}</p>
      </header>

      <div className="arch-grid">
        {/* Engineering agent rail: spans propose → prove */}
        <div className="arch-rail-os">
          <p className="arch-mono arch-rail-k">{t.rail.k}</p>
          <p className="arch-rail-t font-serif">{t.rail.t}</p>
          <ul>
            {t.rail.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>

        {/* L1 — input */}
        <LayerHead layer={l1} />
        <div className="arch-body arch-first">
          <ol className="arch-inputs">
            {t.inputs.map((it, i) => (
              <li key={it.t}>
                <span className="arch-mono arch-gold">0{i + 1}</span>
                <span className="arch-in-t font-serif">{it.t}</span>
                <span className="arch-mono arch-in-d">{it.d}</span>
              </li>
            ))}
          </ol>
        </div>
        <LayerNote note={l1.note} />

        {/* L2 — propose */}
        <LayerHead layer={l2} />
        <div className="arch-body">
          <div className="arch-propose">
            <p className="arch-mono arch-untrusted">{t.untrusted}</p>
            <ul>
              {t.proposes.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <LayerNote note={l2.note} />

        {/* L3 — compile */}
        <LayerHead layer={l3} />
        <div className="arch-body">
          <div className="arch-compile">
            <span className="arch-compile-src font-serif">{l3.t}</span>
            <span className="arch-fork" aria-hidden="true" />
            <div className="arch-forms">
              <span className="arch-mono">{t.forms[0]}</span>
              <span className="arch-mono arch-forms-eq">= {t.formsNote} =</span>
              <span className="arch-mono">{t.forms[1]}</span>
            </div>
          </div>
        </div>
        <LayerNote note={l3.note} />

        {/* L4 — prove: the iron inset */}
        <LayerHead layer={l4} />
        <div className="arch-body">
          <div className="arch-engine">
            <p className="arch-mono arch-engine-tag">{t.engine}</p>
            <div className="arch-loop">
              <div className="arch-cell">
                <p className="arch-mono arch-cell-k">{t.neuralK}</p>
                <p className="arch-cell-t font-serif">{t.neuralT}</p>
                <p className="arch-cell-d">{t.neuralD}</p>
              </div>
              <div className="arch-exchange" aria-hidden="true">
                <span className="arch-mono">{t.candidate}</span>
                <span className="arch-wire arch-wire-fwd"><i /></span>
                <span className="arch-wire arch-wire-back"><i /></span>
                <span className="arch-mono">{t.counterexample}</span>
              </div>
              <div className="arch-cell arch-cell-gold">
                <p className="arch-mono arch-cell-k">{t.symbolicK}</p>
                <p className="arch-cell-t font-serif">{t.symbolicT}</p>
                <ul className="arch-solvers">
                  {t.solvers.map((s) => (
                    <li key={s.t}>
                      <b>{s.t}</b>
                      <span>{s.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="arch-recheck">
              <p className="arch-mono">{t.recheck.t}</p>
              <p>{t.recheck.d}</p>
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
        </div>
        <LayerNote note={l4.note} />

        {/* L5 — enforce */}
        <LayerHead layer={l5} />
        <div className="arch-body">
          <div className="arch-enforce">
            <div className="arch-lean">
              <p className="arch-mono arch-gold">{t.lean.t}</p>
              <p>{t.lean.d}</p>
            </div>
            <ul className="arch-outcomes">
              {t.outcomes.map((o, i) => (
                <li key={o.t} className={i === 0 ? "arch-oc-go" : "arch-oc-stop"}>
                  <span className="arch-mono">{o.t}</span>
                  <span>{o.d}</span>
                </li>
              ))}
            </ul>
            <p className="arch-mono arch-nomodel">{t.noModel}</p>
          </div>
        </div>
        <LayerNote note={l5.note} />

        {/* L6 — seal */}
        <LayerHead layer={l6} />
        <div className="arch-body">
          <div className="arch-seal">
            <div className="arch-chain" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n} />
              ))}
            </div>
            <p className="arch-seal-keys font-serif">{t.sealKeys}</p>
            <p className="arch-seal-what">{t.sealWhat}</p>
          </div>
        </div>
        <LayerNote note={l6.note} />

        {/* L7 — verify */}
        <LayerHead layer={l7} />
        <div className="arch-body arch-last">
          <div className="arch-verify">
            <span className="arch-verify-mark" aria-hidden="true" />
            <span className="arch-verify-t font-serif">{t.verifyOut}</span>
          </div>
        </div>
        <LayerNote note={l7.note} />

        <p className="arch-mono arch-path-label" aria-hidden="true">{t.pathLabel}</p>
      </div>

      {/* Title block, bottom right, like any engineering drawing */}
      <footer className="arch-block">
        {t.block.map(([k, v]) => (
          <div key={k}>
            <p className="arch-mono">{k}</p>
            <p className="arch-block-v">{v}</p>
          </div>
        ))}
      </footer>
    </div>
  );
}
