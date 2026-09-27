"use client";

import { useMemo, useState, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, count, NBSP } from "./i18n";
import { decide, type Decision, type Verdict } from "@/lib/govgate";
import {
  amountAttack,
  ceilingOf,
  NO_TAMPERING,
  RELABEL_KIND,
  splitAttack,
  windowAttack,
  type WindowKnobs,
} from "@/lib/lab-scenarios";

/*
 * THE LAB — try to get past the gate.
 *
 * Every verdict here is `decide(policy, action)` on the SEALED golden-path
 * policy, run in this tab. The copy never states a verdict; it only explains
 * the one the evaluator returned. Where an attack gets through, the page says
 * so and says why — a lab where every attack fails is a demo, and a reader
 * who knows the field knows which attacks cannot fail.
 */

type Copy = {
  verdictName: Record<Verdict, string>;
  reaches: string;
  stopped: string;
  why: string;
  sent: string;
  quoted: string;

  a1Eyebrow: string;
  a1Title: string;
  a1Lead: (ceiling: string) => ReactNode;
  amount: string;
  signed: string;
  a1Leak: ReactNode;

  a2Eyebrow: string;
  a2Title: string;
  a2Lead: string;
  total: string;
  parts: string;
  payment: (i: number) => string;
  moved: (sum: string, ceiling: string) => ReactNode;
  a2Leak: ReactNode;
  a2Held: string;

  a3Eyebrow: string;
  a3Title: string;
  a3Lead: string;
  sentGroup: string;
  declaredGroup: string;
  knob: Record<keyof WindowKnobs, string>;
  a3Leak: ReactNode;
  a3Caught: string;

  a4Eyebrow: string;
  a4Title: string;
  a4Lead: string;
  a4Cta: string;
};

const T: L<Copy> = {
  en: {
    verdictName: { PROCEED: "PROCEED", BLOCK: "BLOCK", REFUSE: "REFUSE" },
    reaches: "Reaches the payment tool.",
    stopped: "Stopped before the payment tool.",
    why: "WHY",
    sent: "The action sent to the gate",
    quoted: "The gate’s own words, not translated.",

    a1Eyebrow: "ATTACK 1 · GO BIG",
    a1Title: "Move as much as you can in one payment.",
    a1Lead: (c) => (
      <>
        The rule caps a single payment at <span className="text-neutral-100">{c}</span> unless a
        second person signs. Push the amount, then add the signature.
      </>
    ),
    amount: "Amount",
    signed: "Second signature",
    a1Leak: (
      <>
        <span className="text-neutral-100">It got through, and the gate is right.</span> The rule
        never capped a signed payment, only an unsigned one. The solver said so before anyone tried:
        that is the REFUTED line in the evidence pack. The gate enforces the rule you wrote; it
        cannot enforce the one you meant.
      </>
    ),

    a2Eyebrow: "ATTACK 2 · SPLIT IT",
    a2Title: "Too big for one payment? Send several.",
    a2Lead: "Pick a total and how many unsigned payments to split it into. Each one is decided on its own, as the rule is written.",
    total: "Total to move",
    parts: "Split into",
    payment: (i) => `Payment ${i}`,
    moved: (s, c) => (
      <>
        Reached the tool: <span className="text-neutral-100">{s}</span>, against a ceiling of {c}.
      </>
    ),
    a2Leak: (
      <>
        <span className="text-neutral-100">Every payment followed the rule. Together they broke it.</span>{" "}
        The rule has no total, so no gate reading it one request at a time can refuse this. The
        solver flagged it first (STRUCTURING, in the evidence pack). The fix belongs in the rule:
        a cumulative clause, which the policy grammar can express.
      </>
    ),
    a2Held: "Nothing above the ceiling got through: at least one part is still too big to go unsigned.",

    a3Eyebrow: "ATTACK 3 · HIDE THE HISTORY",
    a3Title: "Four beneficiary changes is one too many. Make one disappear.",
    a3Lead: "The account changed beneficiary four times this year; the rule allows three. The caller sends the rows AND declares which rows the window holds. Tamper with either, or both.",
    sentGroup: "WHAT YOU SEND",
    declaredGroup: "WHAT YOU DECLARE",
    knob: {
      dropSent: "Drop the newest change",
      relabelSent: `Relabel it “${RELABEL_KIND}”`,
      dropDeclared: "Drop it from the declaration",
      relabelDeclared: "Relabel it in the declaration",
      noDeclaration: "Declare nothing at all",
    },
    a3Leak: (
      <>
        <span className="text-neutral-100">You got through by lying twice</span>, in the rows and in
        the declaration, consistently. No gate can see a lie told the same way on both sides: the
        window lives in a system the gate does not read. What it can do is seal the declaration with
        the verdict, so the lie is on the record, signed. That limit is written in the pack, not
        hidden.
      </>
    ),
    a3Caught: "Tampering with one side only is caught: the window no longer reconciles, and the gate refuses rather than guess.",

    a4Eyebrow: "ATTACK 4 · EDIT THE RECORD AFTERWARDS",
    a4Title: "Change the sealed record once the decision is made.",
    a4Lead: "Flip one field in a sealed decision and hand it to an auditor. The evidence pack has the forgery ready, and a verifier that runs in your browser.",
    a4Cta: "TRY THE FORGERY",
  },
  fr: {
    verdictName: { PROCEED: "PROCEED", BLOCK: "BLOCK", REFUSE: "REFUSE" },
    reaches: "Atteint l’outil de paiement.",
    stopped: "Arrêtée avant l’outil de paiement.",
    why: "POURQUOI",
    sent: "L’action envoyée à la barrière",
    quoted: "Les mots de la barrière, non traduits.",

    a1Eyebrow: "ATTAQUE 1 · VISER GROS",
    a1Title: "Faites passer le plus possible en un seul paiement.",
    a1Lead: (c) => (
      <>
        La règle plafonne un paiement à <span className="text-neutral-100">{c}</span>, sauf si une
        deuxième personne signe. Montez le montant, puis ajoutez la signature.
      </>
    ),
    amount: "Montant",
    signed: "Deuxième signature",
    a1Leak: (
      <>
        <span className="text-neutral-100">C’est passé, et la barrière a raison.</span> La règle
        n’a jamais plafonné un paiement signé, seulement un paiement non signé. Le solveur l’a dit
        avant que quiconque essaie{NBSP}: c’est la ligne REFUTED du dossier de preuve. La barrière
        applique la règle écrite{NBSP}; elle ne peut pas appliquer celle qu’on voulait écrire.
      </>
    ),

    a2Eyebrow: "ATTAQUE 2 · FRACTIONNER",
    a2Title: "Trop gros pour un paiement\u202f? Envoyez-en plusieurs.",
    a2Lead: "Choisissez un total et en combien de paiements non signés le fractionner. Chacun est décidé seul, comme la règle est écrite.",
    total: "Total à déplacer",
    parts: "Fractionné en",
    payment: (i) => `Paiement ${i}`,
    moved: (s, c) => (
      <>
        A atteint l’outil{NBSP}: <span className="text-neutral-100">{s}</span>, pour un plafond de {c}.
      </>
    ),
    a2Leak: (
      <>
        <span className="text-neutral-100">Chaque paiement a respecté la règle. Ensemble, ils l’ont enfreinte.</span>{" "}
        La règle n’a pas de total{NBSP}: aucune barrière qui la lit demande par demande ne peut
        refuser ceci. Le solveur l’avait signalé (STRUCTURING, dans le dossier de preuve). Le
        correctif appartient à la règle{NBSP}: une clause cumulative, que la grammaire des
        politiques sait exprimer.
      </>
    ),
    a2Held: "Rien au-dessus du plafond n’est passé : au moins une part est encore trop grosse pour partir sans signature.",

    a3Eyebrow: "ATTAQUE 3 · CACHER L’HISTORIQUE",
    a3Title: "Quatre changements de bénéficiaire, c’est un de trop. Faites-en disparaître un.",
    a3Lead: "Le compte a changé de bénéficiaire quatre fois cette année\u202f; la règle en permet trois. L’appelant envoie les lignes ET déclare lesquelles la fenêtre contient. Trafiquez l’un, l’autre, ou les deux.",
    sentGroup: "CE QUE VOUS ENVOYEZ",
    declaredGroup: "CE QUE VOUS DÉCLAREZ",
    knob: {
      dropSent: "Retirer le changement le plus récent",
      relabelSent: `Le rebaptiser « ${RELABEL_KIND} »`,
      dropDeclared: "Le retirer de la déclaration",
      relabelDeclared: "Le rebaptiser dans la déclaration",
      noDeclaration: "Ne rien déclarer du tout",
    },
    a3Leak: (
      <>
        <span className="text-neutral-100">Ça passe si l’on ment deux fois</span>, dans les
        lignes et dans la déclaration, de façon cohérente. Aucune barrière ne voit un mensonge
        raconté pareil des deux côtés{NBSP}: la fenêtre vit dans un système que la barrière ne lit
        pas. Ce qu’elle peut faire, c’est sceller la déclaration avec le verdict{NBSP}: le mensonge
        est au dossier, signé. Cette limite est écrite dans le dossier, pas cachée.
      </>
    ),
    a3Caught: "Trafiquer un seul côté est attrapé : la fenêtre ne concorde plus, et la barrière refuse au lieu de deviner.",

    a4Eyebrow: "ATTAQUE 4 · MODIFIER LE DOSSIER APRÈS COUP",
    a4Title: "Changez le dossier scellé une fois la décision prise.",
    a4Lead: "Modifiez un champ d’une décision scellée et remettez-la à un auditeur. Le dossier de preuve a le faux prêt, et un vérificateur qui tourne dans votre navigateur.",
    a4Cta: "ESSAYER LE FAUX",
  },
};

// The same palette /evidence uses for the same three words.
const STYLE: Record<Verdict, { color: string; border: string }> = {
  PROCEED: { color: "var(--seal)", border: "rgba(212,175,95,0.35)" },
  BLOCK: { color: "#ffb4b4", border: "rgba(255,150,150,0.3)" },
  REFUSE: { color: "#e5e5e5", border: "rgba(255,255,255,0.22)" },
};

function cad(n: number, locale: Locale): string {
  return locale === "fr" ? `${count(n, locale)} $ CA` : `CAD ${count(n, locale)}`;
}

function Chip({ v, t, big = false }: { v: Verdict; t: Copy; big?: boolean }) {
  return (
    <span
      className={`track-mid rounded-[4px] border ${big ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-[11px]"}`}
      style={{ color: STYLE[v].color, borderColor: STYLE[v].border }}
    >
      {t.verdictName[v]}
    </span>
  );
}

function Result({ d, t, action }: { d: Decision; t: Copy; action: unknown }) {
  const lines = Object.entries(d.reasons);
  return (
    <div className="chip-metal p-5" style={{ borderColor: STYLE[d.decision].border }} aria-live="polite">
      <div className="flex flex-wrap items-center gap-3">
        <Chip v={d.decision} t={t} big />
        <span className="text-sm font-light text-neutral-300">{d.decision === "PROCEED" ? t.reaches : t.stopped}</span>
      </div>
      {lines.length ? (
        <div className="mt-4">
          <p className="seal-label track-mid text-[11px]">{t.why}</p>
          <ul lang="en" className="mt-2 space-y-1.5">
            {lines.map(([id, why]) => (
              <li key={id} className="flex gap-2 font-mono text-xs text-neutral-300">
                <span className="text-neutral-500">{id}</span>
                <span className="break-words">{why}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-neutral-500">{t.quoted}</p>
        </div>
      ) : null}
      <details className="mt-4">
        <summary className="cursor-pointer text-xs text-neutral-500 hover:text-neutral-300">{t.sent}</summary>
        <pre className="mt-2 max-h-56 overflow-auto rounded-[4px] bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-neutral-400">
          {JSON.stringify(action, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function Toggle({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm font-light text-neutral-300">
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--seal)]" />
      {children}
    </label>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-20 md:px-14">
      <p className="seal-label track-mid mb-4 text-xs">{eyebrow}</p>
      <h2 className="metal-text max-w-3xl font-serif text-3xl font-medium leading-tight md:text-5xl">{title}</h2>
      {children}
    </section>
  );
}

export function GateLab({
  policy,
  payment,
  window: windowBase,
  evidenceHref,
  locale = defaultLocale,
}: {
  policy: unknown;
  payment: unknown;
  window: unknown;
  evidenceHref: string;
  locale?: Locale;
}) {
  const t = pick(T, locale);
  const ceiling = useMemo(() => ceilingOf(policy), [policy]);

  // Attack 1
  const [amount, setAmount] = useState(ceiling * 2);
  const [signed, setSigned] = useState(false);
  const a1 = useMemo(() => amountAttack(payment, amount, signed), [payment, amount, signed]);
  const d1 = useMemo(() => decide(policy, a1), [policy, a1]);

  // Attack 2
  const [total, setTotal] = useState(ceiling * 2 + ceiling / 2);
  const [parts, setParts] = useState(1);
  const a2 = useMemo(() => splitAttack(payment, total, parts), [payment, total, parts]);
  const d2 = useMemo(() => a2.map((a) => decide(policy, a)), [policy, a2]);
  const reachedSum = a2.reduce((s, a, i) => s + (d2[i]?.decision === "PROCEED" ? Number(a.amount) : 0), 0);

  // Attack 3
  const [knobs, setKnobs] = useState<WindowKnobs>(NO_TAMPERING);
  const a3 = useMemo(() => windowAttack(windowBase, knobs), [windowBase, knobs]);
  const d3 = useMemo(() => decide(policy, a3), [policy, a3]);
  const lied =
    d3.decision === "PROCEED" && (knobs.dropSent || knobs.relabelSent || knobs.dropDeclared || knobs.relabelDeclared);
  const set = (k: keyof WindowKnobs) => (v: boolean) => setKnobs((p) => ({ ...p, [k]: v }));

  const range = "w-full accent-[var(--seal)]";

  return (
    <>
      <Section eyebrow={t.a1Eyebrow} title={t.a1Title}>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.a1Lead(cad(ceiling, locale))}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <label className="block">
              <span className="flex justify-between text-sm text-neutral-400">
                <span>{t.amount}</span>
                <span className="font-mono text-neutral-100">{cad(amount, locale)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={ceiling * 4}
                step={ceiling / 20}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={`mt-3 ${range}`}
              />
            </label>
            <Toggle on={signed} onChange={setSigned}>{t.signed}</Toggle>
            {d1.decision === "PROCEED" && amount > ceiling ? (
              <p className="border-l-2 border-seal/50 pl-4 text-sm font-light text-neutral-300">{t.a1Leak}</p>
            ) : null}
          </div>
          <Result d={d1} t={t} action={a1} />
        </div>
      </Section>

      <Section eyebrow={t.a2Eyebrow} title={t.a2Title}>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.a2Lead}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <label className="block">
              <span className="flex justify-between text-sm text-neutral-400">
                <span>{t.total}</span>
                <span className="font-mono text-neutral-100">{cad(total, locale)}</span>
              </span>
              <input
                type="range"
                min={ceiling / 2}
                max={ceiling * 6}
                step={ceiling / 10}
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
                className={`mt-3 ${range}`}
              />
            </label>
            <label className="block">
              <span className="flex justify-between text-sm text-neutral-400">
                <span>{t.parts}</span>
                <span className="font-mono text-neutral-100">{parts}</span>
              </span>
              <input type="range" min={1} max={10} step={1} value={parts} onChange={(e) => setParts(Number(e.target.value))} className={`mt-3 ${range}`} />
            </label>
            {/* The running total against the ceiling: the bar is the argument. */}
            <div>
              <div className="relative h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${Math.min(100, (reachedSum / (ceiling * 6)) * 100)}%`, background: reachedSum > ceiling ? "#ffb4b4" : "var(--seal)" }}
                />
                <div className="absolute inset-y-0 w-px bg-white/70" style={{ left: `${(ceiling / (ceiling * 6)) * 100}%` }} />
              </div>
              <p className="mt-2 text-sm font-light text-neutral-400">{t.moved(cad(reachedSum, locale), cad(ceiling, locale))}</p>
            </div>
            {reachedSum > ceiling ? (
              <p className="border-l-2 border-[#ffb4b4]/60 pl-4 text-sm font-light text-neutral-300">{t.a2Leak}</p>
            ) : total > ceiling ? (
              <p className="text-sm font-light text-neutral-400">{t.a2Held}</p>
            ) : null}
          </div>
          <ul className="space-y-2">
            {a2.map((a, i) => {
              const d = d2[i];
              if (!d) return null;
              return (
                <li key={String(a.id)} className="chip-metal flex items-center justify-between gap-3 px-4 py-3" style={{ borderColor: STYLE[d.decision].border }}>
                  <span className="whitespace-nowrap text-sm text-neutral-400">{t.payment(i + 1)}</span>
                  <span className="font-mono text-sm text-neutral-100">{cad(Number(a.amount), locale)}</span>
                  <Chip v={d.decision} t={t} />
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section eyebrow={t.a3Eyebrow} title={t.a3Title}>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.a3Lead}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-6 sm:grid-cols-2">
            <fieldset>
              <legend className="seal-label track-mid mb-2 text-[11px]">{t.sentGroup}</legend>
              <Toggle on={knobs.dropSent} onChange={set("dropSent")}>{t.knob.dropSent}</Toggle>
              <Toggle on={knobs.relabelSent} onChange={set("relabelSent")}>{t.knob.relabelSent}</Toggle>
            </fieldset>
            <fieldset>
              <legend className="seal-label track-mid mb-2 text-[11px]">{t.declaredGroup}</legend>
              <Toggle on={knobs.dropDeclared} onChange={set("dropDeclared")}>{t.knob.dropDeclared}</Toggle>
              <Toggle on={knobs.relabelDeclared} onChange={set("relabelDeclared")}>{t.knob.relabelDeclared}</Toggle>
              <Toggle on={knobs.noDeclaration} onChange={set("noDeclaration")}>{t.knob.noDeclaration}</Toggle>
            </fieldset>
            <div className="sm:col-span-2">
              {lied ? (
                <p className="border-l-2 border-seal/50 pl-4 text-sm font-light text-neutral-300">{t.a3Leak}</p>
              ) : d3.decision === "REFUSE" ? (
                <p className="text-sm font-light text-neutral-400">{t.a3Caught}</p>
              ) : null}
            </div>
          </div>
          <Result d={d3} t={t} action={a3} />
        </div>
      </Section>

      <Section eyebrow={t.a4Eyebrow} title={t.a4Title}>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.a4Lead}</p>
        <a
          href={evidenceHref}
          className="chip-metal track-mid mt-8 inline-block px-7 py-3 text-xs text-neutral-200 transition hover:text-white"
        >
          {t.a4Cta} →
        </a>
      </Section>
    </>
  );
}
