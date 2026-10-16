import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * ArchitecturePlate — the whole system as an engineering sheet, drawn in HTML
 * (Dom, 2026-10-15: « c plus que sa notre architecture, met sa serieux, montre
 * le niveau »). Seven layers, top to bottom, on one gold decision path; the
 * engineering agent's operating system as a rail on the side; each declared
 * limit pinned in the margin of the layer it belongs to.
 *
 * Every claim comes from the audited copy of this same page
 * (neuro-symbolic-copy.tsx, read against ironproof on 2026-10-12) or from the
 * former architecture-en/fr.webp, rewritten as full sentences (Dom, 2026-10-15:
 * « pk c ecrit bizarre »). Nothing here is new as a claim: if a step changes
 * there, it changes here.
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
  proposesLead: string;
  source: string;
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
    sub: "How a proposed action becomes a proof you can hold. One engine, the same path for every kind of request.",
    motto: "Prove · Enforce · Seal · Verify",
    block: [
      ["Drawing", "IP-ARCH-01"],
      ["Edition", "2026-10"],
      ["Sheet", "1 / 1"],
      ["Scale", "Not to scale"],
    ],
    pathLabel: "Decision path",
    layers: [
      { code: "L1", k: "Input", t: "What comes in", d: "Three kinds of request, one engine." },
      {
        code: "L2",
        k: "Propose",
        t: "A model makes a proposal",
        d: "The neural part understands language, vague requests and context.",
        note: { k: "Limit · the model", t: "We don’t make the model safe. We make sure it never gets what the rule forbids." },
      },
      {
        code: "L3",
        k: "Compile",
        t: "The rule is compiled",
        d: "Your policy is compiled once. The solver and the runtime read the same version, so they cannot quietly disagree.",
        note: { k: "Limit · specification", t: "A proof is only as good as the rule. Making sure it says what you meant is human work — we do it with you." },
      },
      {
        code: "L4",
        k: "Prove",
        t: "The engine decides",
        d: "It examines every possible case, not a sample.",
        note: { k: "Limit · scope", t: "A proof holds within a stated class of cases. Outside it, the proof says nothing — and the dossier draws that boundary." },
      },
      { code: "L5", k: "Enforce", t: "Every action is checked", d: "Before it runs, each action is checked against the same compiled rule." },
      {
        code: "L6",
        k: "Seal",
        t: "Everything is sealed",
        d: "Each decision is chained to the one before it, so any later change shows.",
        note: { k: "What a seal shows", t: "That the record was not changed, and which keys signed it — integrity, not truth." },
      },
      { code: "L7", k: "Verify", t: "Checkable without us", d: "Your auditor re-checks the sealed record offline, with an independent verifier." },
    ],
    inputs: [
      { t: "An agent action", d: "with the policy that governs it" },
      { t: "A COBOL program", d: "to migrate to Python (arXiv 2610.11073)" },
      { t: "A flaw in C code", d: "to fix" },
    ],
    untrusted: "Not trusted · never decides",
    proposesLead: "What it may propose:",
    proposes: ["the action", "a translation", "a fix", "a first draft of the rule"],
    source: "Your policy",
    forms: ["Version for the solver", "Version for the runtime"],
    formsNote: "same source",
    engine: "Neuro-symbolic verification engine",
    neuralK: "Neural",
    neuralT: "The proposal",
    neuralD: "A translation, a fix or an encoding of the policy. It never decides.",
    symbolicK: "Symbolic",
    symbolicT: "The solver",
    candidate: "proposal",
    counterexample: "counterexample",
    solvers: [
      { t: "Z3", d: "the main solver" },
      { t: "Spacer", d: "finds inductive invariants" },
      { t: "CBMC", d: "for C code" },
      { t: "cvc5", d: "a second solver" },
    ],
    recheck: {
      t: "Cross-check",
      d: "The invariant is checked again in a fresh solver before the kernel seals its verdict. Finding a proof and checking it are kept apart.",
    },
    verdicts: [
      { t: "Proven", d: "no case can break the rule." },
      { t: "Refuted", d: "here is the exact case that breaks it." },
      { t: "Not demonstrated", d: "never counted as a pass." },
    ],
    lean: {
      t: "Lean 4",
      d: "Deciding by evaluating the rule gives the same answer as deciding with the solver, for every policy and every action. That is a theorem checked in Lean 4.",
    },
    outcomes: [
      { t: "PROCEED", d: "the action runs" },
      { t: "BLOCK", d: "it does not run" },
      { t: "REFUSE", d: "it does not run" },
    ],
    noModel: "No language model votes on this path.",
    sealKeys: "Ed25519 + ML-DSA-65 · FIPS 204",
    sealWhat: "Every gate decision, allowed or blocked, and every proof verdict.",
    verifyOut: "Verification dossier",
    rail: {
      k: "Cognitive operating system",
      t: "Governs the engineering agent",
      items: ["Persistent memory", "Rules learned from its own errors", "No report without the command and its output"],
    },
  },
  fr: {
    sheet: "PLANCHE IP-ARCH-01",
    title: "Architecture du système",
    sub: "Comment une action proposée devient une preuve que vous détenez. Un seul moteur, le même chemin pour chaque type de demande.",
    motto: "Prouver · Appliquer · Sceller · Vérifier",
    block: [
      ["Dessin", "IP-ARCH-01"],
      ["Édition", "2026-10"],
      ["Planche", "1 / 1"],
      ["Échelle", "Sans échelle"],
    ],
    pathLabel: "Chemin de décision",
    layers: [
      { code: "C1", k: "Entrée", t: "Ce qui arrive", d: "Trois types de demandes, un seul moteur." },
      {
        code: "C2",
        k: "Proposer",
        t: "Un modèle fait une proposition",
        d: "La partie neuronale comprend le langage, les demandes floues et le contexte.",
        note: { k: "Limite · le modèle", t: "Nous ne rendons pas le modèle sûr. Nous faisons en sorte qu’il n’obtienne jamais ce que la règle interdit." },
      },
      {
        code: "C3",
        k: "Compiler",
        t: "La règle est compilée",
        d: "Votre politique est compilée une seule fois. Le solveur et l’exécution lisent la même version : ils ne peuvent pas diverger en silence.",
        note: { k: "Limite · spécification", t: "Une preuve vaut ce que vaut la règle. S’assurer qu’elle dit ce que vous vouliez dire est un travail humain — nous le faisons avec vous." },
      },
      {
        code: "C4",
        k: "Prouver",
        t: "Le moteur tranche",
        d: "Il examine tous les cas possibles, pas un échantillon.",
        note: { k: "Limite · portée", t: "Une preuve vaut pour une classe de cas déclarée. Hors de cette classe, elle ne dit rien — et le dossier en trace la frontière." },
      },
      { code: "C5", k: "Appliquer", t: "Chaque action est contrôlée", d: "Avant de s’exécuter, chaque action est vérifiée contre la même règle compilée." },
      {
        code: "C6",
        k: "Sceller",
        t: "Tout est scellé",
        d: "Chaque décision est enchaînée à la précédente : toute modification ultérieure se voit.",
        note: { k: "Ce que montre un sceau", t: "Que la trace n’a pas changé, et quelles clés l’ont signée — l’intégrité, pas la vérité." },
      },
      { code: "C7", k: "Vérifier", t: "Vérifiable sans nous", d: "Votre auditeur revérifie la trace scellée hors ligne, avec un vérificateur indépendant." },
    ],
    inputs: [
      { t: "Une action d’agent", d: "avec la politique qui l’encadre" },
      { t: "Un programme COBOL", d: "à migrer vers Python (arXiv 2610.11073)" },
      { t: "Une faille dans du code C", d: "à corriger" },
    ],
    untrusted: "Non fiable · ne décide jamais",
    proposesLead: "Ce qu’il peut proposer :",
    proposes: ["l’action", "une traduction", "un correctif", "une première version de la règle"],
    source: "Votre politique",
    forms: ["Version pour le solveur", "Version pour l’exécution"],
    formsNote: "même source",
    engine: "Moteur de vérification neuro-symbolique",
    neuralK: "Neuronal",
    neuralT: "La proposition",
    neuralD: "Une traduction, un correctif ou un encodage de la politique. Il ne décide jamais.",
    symbolicK: "Symbolique",
    symbolicT: "Le solveur",
    candidate: "proposition",
    counterexample: "contre-exemple",
    solvers: [
      { t: "Z3", d: "le solveur principal" },
      { t: "Spacer", d: "trouve les invariants inductifs" },
      { t: "CBMC", d: "pour le code C" },
      { t: "cvc5", d: "un second solveur" },
    ],
    recheck: {
      t: "Contre-vérification",
      d: "L’invariant est vérifié une seconde fois dans un solveur neuf, avant que le noyau scelle son verdict. Trouver une preuve et la vérifier restent séparés.",
    },
    verdicts: [
      { t: "Prouvé", d: "aucun cas ne peut briser la règle." },
      { t: "Réfuté", d: "voici le cas exact qui la brise." },
      { t: "Non démontré", d: "jamais compté comme un succès." },
    ],
    lean: {
      t: "Lean 4",
      d: "Décider en évaluant la règle donne la même réponse que décider avec le solveur, pour toute politique et toute action. C’est un théorème vérifié en Lean 4.",
    },
    outcomes: [
      { t: "PROCEED", d: "l’action s’exécute" },
      { t: "BLOCK", d: "elle ne s’exécute pas" },
      { t: "REFUSE", d: "elle ne s’exécute pas" },
    ],
    noModel: "Aucun modèle de langage ne vote sur ce chemin.",
    sealKeys: "Ed25519 + ML-DSA-65 · FIPS 204",
    sealWhat: "Chaque décision de la barrière, permise ou bloquée, et chaque verdict de preuve.",
    verifyOut: "Dossier de vérification",
    rail: {
      k: "Système d’exploitation cognitif",
      t: "Encadre l’agent d’ingénierie",
      items: ["Mémoire persistante", "Règles apprises de ses propres erreurs", "Aucun rapport sans la commande et sa sortie"],
    },
  },
};

/* Visually hidden punctuation: the layout separates a term from its gloss, but
 * copied text, screen readers and search engines only get the characters. */
function Sep({ text = " — " }: { text?: string }) {
  return <span className="arch-sr">{text}</span>;
}

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
                <Sep text=". " />
                <span className="arch-in-t font-serif">{it.t}</span>
                <Sep text=", " />
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
            <p className="arch-propose-lead">{t.proposesLead}</p>
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
            <span className="arch-compile-src font-serif">{t.source}</span>
            <Sep text=" : " />
            <span className="arch-fork" aria-hidden="true" />
            <div className="arch-forms">
              <span className="arch-mono">{t.forms[0]}</span>
              <Sep text=" " />
              <span className="arch-mono arch-forms-eq">= {t.formsNote} =</span>
              <Sep text=" " />
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
                <Sep text=" / " />
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
                      <Sep />
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
                  <Sep text=" : " />
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
                  <Sep />
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

        <p className="arch-mono arch-path-label" aria-hidden="true" data-label={t.pathLabel} />
      </div>

      {/* Title block, bottom right, like any engineering drawing */}
      <footer className="arch-block">
        {t.block.map(([k, v]) => (
          <div key={k}>
            <p className="arch-mono">{k}</p>
            <Sep text=" : " />
            <p className="arch-block-v">{v}</p>
          </div>
        ))}
      </footer>
    </div>
  );
}
