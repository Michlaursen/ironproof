import lab from "@/data/agent-refunds-lab.json";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money as fmtMoney, count, NBSP } from "./i18n";

/*
 * WHAT A COUNTEREXAMPLE LOOKS LIKE.
 *
 * Every value rendered here is read out of `src/data/agent-refunds-lab.json`,
 * which is written by `ontology/capture_agent_refunds.py` in the engine repo.
 * Nothing on this panel is typed by hand -- the verdicts, the escape sequence,
 * the amounts and the gate decisions all come from an actual run. If the
 * engine's answer changes, this section changes with it or it fails to build.
 *
 * TRANSLATION AND THE DATA -- the one thing to understand before editing.
 *
 * The JSON is the source of record and it is English. FR_CLAUSES below is a
 * RENDERING overlay keyed by clause id, never a second copy of the data: it
 * supplies wording only, and `frClause` falls back to the JSON text when an id
 * is missing. That fallback is the point. If the engine adds, renumbers or
 * rewrites a clause, the French page shows that clause IN ENGLISH -- visible,
 * on the page, in front of whoever looks next. The alternative (dropping it, or
 * keeping a full French copy of the clause list) would let the two lists drift
 * apart silently, which is the failure this file exists to demonstrate.
 */

type Scalar = string | number | boolean;
/* The capture emits one params object per action shape, so TypeScript widens
   the union with optional keys -- accept undefined and drop it when rendering. */
type Params = Readonly<Record<string, Scalar | undefined>>;

type Bind = { constraint: string; where: string[] };
type Encoded = { id: string; text: string; binds: Bind[] };
type NotEncoded = { id: string; text: string; why_not: string };
type Step = {
  n: number;
  action: string;
  params: Params;
  state_after: Readonly<Record<string, Scalar>>;
};
const coverage = lab.coverage as {
  clauses_total: number;
  clauses_encoded: number;
  clauses_not_encoded: number;
  encoded: Encoded[];
  not_encoded: NotEncoded[];
};
const bmc = lab.bmc as {
  horizon: number;
  steps: Step[];
  violated_invariants: string[];
  method: string;
};
const AUTHORITY = (lab.gates_correct as { refund_authority: number }).refund_authority;

/** French wording for the clause ids the capture emits today. Keys that the
 *  JSON no longer contains are simply unused; ids the JSON gains and this map
 *  lacks render in English (see the note at the top of the file). */
const FR_CLAUSES: Readonly<Record<string, string>> = {
  "2.1": "Un agent n’émet un remboursement que sur un billet ouvert.",
  "2.2":
    "Un agent n’émet un remboursement qu’après vérification de l’identité du client, et un billet n’est jamais résolu pour un client non vérifié.",
  "2.3": "Un montant de remboursement est strictement positif.",
  "3.1": "Aucun remboursement unique ne dépasse l’autorité de remboursement de l’agent.",
  "3.2":
    "Le total remboursé sur un billet ne dépasse jamais l’autorité de remboursement de l’agent -- une séquence de remboursements individuellement autorisés ne peut pas la franchir.",
  "4.1": "Les remboursements sont retournés sur le moyen de paiement d’origine.",
  "4.2": "Un remboursement est émis dans les cinq jours ouvrables suivant la demande.",
  "4.3": "L’agent qui émet un remboursement n’est jamais celui qui l’approuve.",
};

/** French wording for why a clause is out of the model, same rules as above. */
const FR_WHY_NOT: Readonly<Record<string, string>> = {
  "4.1":
    "le modèle porte un montant, pas un objet de paiement ; représenter le moyen de paiement exige une instance symbolique par paiement, et revendiquer une couverture ici couvrirait la clause sur laquelle se joue une contestation de paiement",
  "4.2":
    `un délai${NBSP}: ce modèle ne porte pas d’horloge, rien en lui ne distingue cinq jours d’un instant`,
  "4.3":
    "le modèle compte les escalades, il ne porte pas l’identité des acteurs -- la séparation des tâches est une propriété de contrôle d’accès, hors de cet objet",
};

/** The engine's two verdict words, said in the reader's language. The raw
 *  token (`unsat`) is still printed verbatim further down, so nothing here
 *  hides what the solver actually returned. */
const FR_VERDICT: Readonly<Record<string, string>> = {
  SAFE: "SÛRE",
  UNSAFE: "NON SÛRE",
};

/* The schema keeps its prose ASCII (it is source, and an apostrophe in the
   wrong quote breaks a parser). Typography belongs to the rendering, not to
   the data -- so the double hyphen becomes an em dash here, and only here. */
function prose(text: string): string {
  return text.replace(/ -- /g, " — ");
}

function clause(id: string, english: string, locale: Locale): string {
  return prose(locale === "fr" ? (FR_CLAUSES[id] ?? english) : english);
}

function whyNot(id: string, english: string, locale: Locale): string {
  return prose(locale === "fr" ? (FR_WHY_NOT[id] ?? english) : english);
}

function verdict(token: string, locale: Locale): string {
  return locale === "fr" ? (FR_VERDICT[token] ?? token) : token;
}

function call(action: string, params: Params): string {
  const args = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => k + "=" + String(v))
    .join(", ");
  return action + "(" + args + ")";
}

function refundedAfter(step: Step): number {
  return Number(step.state_after.refunded_total);
}

/* The escape is only interesting because each amount clears the per-refund
   gate on its own. Read that off the trace instead of asserting it. */
const refundAmounts = bmc.steps
  .filter((s) => s.action === "refund")
  .map((s) => Number(s.params.amount));
const escapeTotal = bmc.steps.length ? refundedAfter(bmc.steps[bmc.steps.length - 1]) : 0;
const overshoot = escapeTotal - AUTHORITY;
const eachWithinAuthority = refundAmounts.every((a) => a <= AUTHORITY);

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  policyLabel: string;
  encodedCount: (n: string, total: string) => string;
  notCoveredLabel: (n: string) => string;
  coverageNote: string;
  removeLabel: string;
  asWritten: string;
  asWrittenWhy: string;
  without: string;
  withoutWhy: string;
  wayOut: (steps: string) => string;
  eachInside: (authority: string, total: string, over: string) => React.ReactNode;
  totalReaches: (total: string, authority: string) => string;
  provenance: (over: string) => string;
  violatedLabel: string;
  rerun: string;
};

const T: L<Copy> = {
  en: {
    eyebrow: "WHAT A COUNTEREXAMPLE LOOKS LIKE",
    titleA: "We proved this refund policy.",
    titleB: "Then we removed one line.",
    lead: "A support agent that issues refunds, under the policy its owner wrote. Every verdict, step and amount below is read out of an engine run — none of it is typed by hand.",
    policyLabel: "01 · THE POLICY, IN THEIR WORDS",
    encodedCount: (n, total) => `${n} of ${total} clauses turned into math`,
    notCoveredLabel: (n) => `${n} CLAUSES THIS MODEL DOES NOT COVER`,
    coverageNote:
      "A coverage figure you cannot see the gaps in is a decoration. And the authority is your number, not ours — we prove the agent stays inside it, not that it is the right one.",
    removeLabel: "02 · REMOVE ONE LINE",
    asWritten: "AS WRITTEN",
    asWrittenWhy:
      "No sequence of allowed steps reaches a forbidden state — at any length, not for the cases someone thought to try.",
    without: "WITHOUT",
    withoutWhy:
      "The gate still checks the refund in front of it. It no longer checks the total.",
    wayOut: (steps) => `THE WAY OUT Z3 FOUND — ${steps} STEPS`,
    eachInside: (authority, total, over) => (
      <>
        Each refund is inside the {authority} authority and clears its own gate. Together they are{" "}
        {total} — <span className="text-[#ffb4b4]">{over} over</span>.
      </>
    ),
    totalReaches: (total, authority) =>
      `The total reaches ${total} against a ${authority} authority.`,
    provenance: (over) =>
      `Z3 chose the actions and the amounts, not us — nobody writes a ${over} overshoot by hand.`,
    violatedLabel: "Violated:",
    rerun: "re-run in a fresh process:",
  },
  fr: {
    eyebrow: "À QUOI RESSEMBLE UN CONTRE-EXEMPLE",
    titleA: "Nous avons prouvé cette politique de remboursement.",
    titleB: "Puis nous avons retiré une ligne.",
    lead: "Un agent de soutien qui émet des remboursements, sous la politique écrite par son responsable. Chaque verdict, chaque étape et chaque montant ci-dessous est lu dans une exécution réelle du moteur — rien n’est saisi à la main.",
    policyLabel: "01 · LA POLITIQUE, DANS LEURS MOTS",
    encodedCount: (n, total) => `${n} clauses sur ${total} traduites en mathématiques`,
    notCoveredLabel: (n) => `${n} CLAUSES QUE CE MODÈLE NE COUVRE PAS`,
    coverageNote: `Un taux de couverture dont on ne voit pas les trous est une décoration. Et l’autorité, c’est votre chiffre, pas le nôtre — nous prouvons que l’agent la respecte, pas qu’elle est la bonne.`,
    removeLabel: "02 · RETIRER UNE LIGNE",
    asWritten: "TELLE QU’ÉCRITE",
    asWrittenWhy: `Aucune séquence d’étapes autorisées n’atteint un état interdit — à n’importe quelle longueur, pas seulement pour les cas auxquels quelqu’un a pensé.`,
    without: "SANS",
    withoutWhy: `La barrière vérifie toujours le remboursement qu’elle a devant elle. Elle ne vérifie plus le total.`,
    wayOut: (steps) => `LA SORTIE QUE Z3 A TROUVÉE — ${steps} ÉTAPES`,
    eachInside: (authority, total, over) => (
      <>
        Chaque remboursement est à l’intérieur de l’autorité de {authority} et franchit sa propre
        barrière. Ensemble, ils font {total} — <span className="text-[#ffb4b4]">{over} de trop</span>
        .
      </>
    ),
    totalReaches: (total, authority) =>
      `Le total atteint ${total} contre une autorité de ${authority}.`,
    provenance: (over) =>
      `C’est Z3 qui a choisi les actions et les montants, pas nous — personne n’écrit un dépassement de ${over} à la main.`,
    violatedLabel: `Violé${NBSP}:`,
    rerun: `rejoué dans un processus neuf${NBSP}:`,
  },
};

export function Counterexample({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  const money = (n: number) => fmtMoney(n, locale);
  const n = (v: number) => count(v, locale);

  return (
    <section
      id="counterexample"
      className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14"
    >
      <div className="fade-up mb-16 max-w-3xl">
        <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          {t.titleA}
          <br />
          {t.titleB}
        </h2>
        <p className="mt-6 text-lg font-light text-neutral-300">{t.lead}</p>
      </div>

      {/* 1 — THE POLICY, IN THE OWNER'S WORDS */}
      <div className="fade-up card-premium mb-6 p-8 md:p-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="track-mid text-xs text-neutral-300">{t.policyLabel}</p>
          <p className="text-xs text-neutral-400">
            {t.encodedCount(n(coverage.clauses_encoded), n(coverage.clauses_total))}
          </p>
        </div>
        <ul className="space-y-3">
          {coverage.encoded.map((c) => (
            <li key={c.id} className="flex gap-4 text-neutral-200">
              <span className="mt-0.5 font-mono text-xs text-neutral-500">{c.id}</span>
              <span className="font-light leading-snug">{clause(c.id, c.text, locale)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="seal-label track-mid mb-4 text-xs">
            {t.notCoveredLabel(n(coverage.clauses_not_encoded))}
          </p>
          <ul className="space-y-3">
            {coverage.not_encoded.map((c) => (
              <li key={c.id} className="flex gap-4 text-sm text-neutral-400">
                <span className="mt-0.5 font-mono text-xs text-neutral-600">{c.id}</span>
                <span className="font-light leading-snug">
                  {clause(c.id, c.text, locale)}{" "}
                  <span className="text-neutral-500">— {whyNot(c.id, c.why_not, locale)}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-light text-neutral-400">{t.coverageNote}</p>
        </div>
      </div>

      {/* 2 — ONE CARD: the two verdicts, then the escape Z3 built.
           Was three panels (02 AS WRITTEN / 03 ONE CLAUSE REMOVED /
           04 THE SEQUENCE). They are one beat, so they are one card. */}
      <div className="fade-up card-premium p-8 md:p-10">
        <p className="track-mid mb-8 text-xs text-neutral-300">{t.removeLabel}</p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="track-mid mb-3 text-[10px] text-neutral-500">{t.asWritten}</p>
            <p className="metal-text font-serif text-4xl">
              {verdict(lab.proof_correct.verdict, locale)}
            </p>
            <p className="mt-2 text-sm font-light leading-snug text-neutral-400">
              {t.asWrittenWhy}
            </p>
          </div>
          <div className="border-t border-white/5 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <p className="track-mid mb-3 text-[10px] text-neutral-500">
              {t.without}{" "}
              <span className="font-mono text-neutral-400">{lab.removed_clause}</span>
            </p>
            <p className="font-serif text-4xl text-[#ffb4b4]">
              {verdict(lab.proof_broken.verdict, locale)}
            </p>
            <p className="mt-2 text-sm font-light leading-snug text-neutral-400">{t.withoutWhy}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8">
          <p className="track-mid mb-5 text-[10px] text-neutral-500">
            {t.wayOut(n(bmc.horizon))}
          </p>
          <div className="-mx-2 overflow-x-auto px-2">
            <table className="w-full min-w-[26rem] text-left">
              <tbody>
                {bmc.steps.map((s) => {
                  const total = refundedAfter(s);
                  const over = total > AUTHORITY;
                  return (
                    <tr key={s.n} className="border-b border-white/5 last:border-0">
                      <td className="w-6 py-2.5 font-mono text-xs text-neutral-600">{s.n}</td>
                      <td className="py-2.5 pr-3 font-mono text-xs text-neutral-200 md:text-[13px]">
                        {call(s.action, s.params)}
                      </td>
                      <td
                        className={
                          "py-2.5 text-right font-mono text-xs md:text-[13px] " +
                          (over ? "text-[#ffb4b4]" : "text-neutral-500")
                        }
                      >
                        {money(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-6 font-light leading-snug text-neutral-200">
            {eachWithinAuthority
              ? t.eachInside(money(AUTHORITY), money(escapeTotal), money(overshoot))
              : t.totalReaches(money(escapeTotal), money(AUTHORITY))}
          </p>
          <p className="mt-3 text-sm font-light text-neutral-500">
            {t.provenance(money(overshoot))} {t.violatedLabel}{" "}
            <span className="font-mono text-neutral-400">
              {bmc.violated_invariants.join(", ")}
            </span>{" "}
            · {lab.proof_correct.verdict_token} · {t.rerun}{" "}
            {String(lab.proof_correct.reproduced)} · {lab.solver}
          </p>
        </div>
      </div>
    </section>
  );
}
