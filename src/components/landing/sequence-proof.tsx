/*
 * The centre of the page: two requests that are each valid, and a sequence
 * that is not.
 *
 * Every rule written as "per day", "cumulative", "in total" or "within a
 * window" has this shape, and a system that checks one request at a time
 * cannot see it. That is the whole argument for reasoning over sequences
 * rather than sampling cases — shown, not asserted.
 *
 * Every number on screen derives from these four constants. Nothing is
 * written twice, so the figures and the verdict cannot drift apart.
 */

import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money } from "./i18n";

const CAP = 1000;
const FIRST = 600;
const SECOND = 600;
/** Track width in dollars, so the cap line sits inside the bar and the
 *  overflow has somewhere to go. */
const SCALE = 1500;

const RUNNING = FIRST + SECOND;

function pct(n: number): string {
  return ((n / SCALE) * 100).toFixed(2) + "%";
}


type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  policyLabel: string;
  rule: (cap: string) => string;
  req1: string;
  req2: string;
  ask1: (amount: string) => string;
  ask2: (amount: string) => string;
  checkSingle: string;
  checkDay: string;
  after1: string;
  after2: string;
  blindLabel: string;
  dailyCap: string;
  arithmetic: (a: string, b: string, total: string) => string;
  shapes: readonly [string, string, string, string];
  /** The conjunction before the last item of `shapes`. */
  shapeOr: string;
  shapeTail: string;
  foot: string;
  allow: string;
  block: string;
};

const T: L<Copy> = {
  en: {
    eyebrow: "THE CASE NOTHING ELSE CATCHES",
    titleA: "Every action is allowed.",
    titleB: "The sequence is not.",
    lead: "Two identical requests, two minutes apart. Checked one at a time, both pass. Ironproof decides on the sequence, so the second one never executes.",
    policyLabel: "POLICY IN FORCE",
    rule: (cap) => `No single refund over ${cap}, and no more than ${cap} to one payee per day.`,
    req1: "REQUEST 1",
    req2: "REQUEST 2",
    ask1: (a) => `Refund ${a} to payee ACME-4471`,
    ask2: (a) => `Refund ${a} to the same payee`,
    checkSingle: "Single refund within the limit",
    checkDay: "Day total after this refund",
    after1: "It executes. The decision is sealed.",
    after2: "Identical to the first request. It never executes — and the refusal is sealed too.",
    blindLabel: "WHAT ONE-AT-A-TIME CHECKING CANNOT SEE",
    dailyCap: "DAILY CAP",
    arithmetic: (a, b, total) =>
      `${a} then ${b} is ${total}. Neither request breaks the per-refund limit; together they break the daily one. Any rule written as `,
    shapes: ["per day", "cumulative", "in total", "within a window"],
    shapeOr: " or ",
    shapeTail:
      " has this shape — and a check that sees one request at a time is structurally blind to it.",
    foot: "Illustrative policy and figures. The mechanism is the point: the decision is taken on the sequence, before execution.",
    allow: "ALLOW",
    block: "BLOCK",
  },
  fr: {
    eyebrow: "LE CAS QUE RIEN D’AUTRE N’ATTRAPE",
    titleA: "Chaque action est autorisée.",
    titleB: "La séquence ne l’est pas.",
    lead: "Deux demandes identiques, à deux minutes d’intervalle. Vérifiées une à une, les deux passent. Ironproof décide sur la séquence\u00a0: la deuxième ne s’exécute jamais.",
    policyLabel: "POLITIQUE EN VIGUEUR",
    rule: (cap) =>
      `Aucun remboursement unique au-dessus de ${cap}, et pas plus de ${cap} par bénéficiaire et par jour.`,
    req1: "DEMANDE 1",
    req2: "DEMANDE 2",
    ask1: (a) => `Rembourser ${a} au bénéficiaire ACME-4471`,
    ask2: (a) => `Rembourser ${a} au même bénéficiaire`,
    checkSingle: "Remboursement unique dans la limite",
    checkDay: "Total du jour après ce remboursement",
    after1: "Elle s’exécute. La décision est scellée.",
    after2:
      "Identique à la première demande. Elle ne s’exécute jamais — et le refus est scellé lui aussi.",
    blindLabel: "CE QU’UNE VÉRIFICATION UNE À UNE NE PEUT PAS VOIR",
    dailyCap: "PLAFOND QUOTIDIEN",
    arithmetic: (a, b, total) =>
      `${a} puis ${b} font ${total}. Aucune des deux demandes ne dépasse la limite par remboursement\u202f; ensemble, elles dépassent celle du jour. Toute règle écrite avec `,
    shapes: ["par jour", "cumulatif", "au total", "sur une fenêtre"],
    shapeOr: " ou ",
    shapeTail:
      " a cette forme — et une vérification qui voit une demande à la fois y est structurellement aveugle.",
    foot: "Politique et chiffres illustratifs. C’est le mécanisme qui compte\u00a0: la décision se prend sur la séquence, avant l’exécution.",
    allow: "AUTORISÉ",
    block: "BLOQUÉ",
  },
};

const OK = "#c8ffd8";
const NO = "#ffb4b4";

function Tick({ ok }: { ok: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={ok ? OK : NO}
      strokeWidth="2.2"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      {ok ? <path d="M5 13 l4 4 l10 -11" /> : <path d="M6 6 l12 12 M18 6 l-12 12" />}
    </svg>
  );
}

function Check({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <li className="flex gap-2.5">
      <Tick ok={ok} />
      <span className="text-sm font-light leading-relaxed text-neutral-300">
        {label} <span className="whitespace-nowrap font-mono text-xs text-neutral-400">{value}</span>
      </span>
    </li>
  );
}

function Verdict({ allow, t }: { allow: boolean; t: Copy }) {
  return (
    <span className={`verdict-tag ${allow ? "verdict-allow" : "verdict-block"}`}>
      {allow ? t.allow : t.block}
    </span>
  );
}

export function SequenceProof({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  const usd = (n: number) => money(n, locale);
  return (
    <section
      id="sequence"
      className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14"
    >
      <div className="fade-up mb-14 max-w-3xl">
        <p className="track-mid mb-4 text-xs text-neutral-400">{t.eyebrow}</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
          {t.titleA}
          <br />
          {t.titleB}
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
      </div>

      <div className="card-premium fade-up p-7 sm:p-10 md:p-12">
        {/* the rule in force */}
        <p className="track-mid mb-3 text-[10px] text-neutral-500">{t.policyLabel}</p>
        <p className="font-serif text-xl leading-snug text-neutral-100 sm:text-2xl">
          {t.rule(usd(CAP))}
        </p>

        <div className="hairline my-9 h-px w-full" />

        {/* the two requests */}
        <ol className="grid gap-8 md:grid-cols-2 md:gap-12">
          <li>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="track-mid text-[10px] text-neutral-500">{t.req1} &middot; 09:14</span>
              <Verdict allow t={t} />
            </div>
            <p className="mb-4 font-serif text-2xl text-neutral-100">
              {t.ask1(usd(FIRST))}
            </p>
            <ul className="space-y-2.5">
              <Check
                label={t.checkSingle}
                value={`${usd(FIRST)} ≤ ${usd(CAP)}`}
                ok
              />
              <Check
                label={t.checkDay}
                value={`${usd(FIRST)} ≤ ${usd(CAP)}`}
                ok
              />
            </ul>
            <p className="mt-5 text-sm font-light text-neutral-400">{t.after1}</p>
          </li>

          <li>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="track-mid text-[10px] text-neutral-500">{t.req2} &middot; 09:16</span>
              <Verdict allow={false} t={t} />
            </div>
            <p className="mb-4 font-serif text-2xl text-neutral-100">
              {t.ask2(usd(SECOND))}
            </p>
            <ul className="space-y-2.5">
              <Check
                label={t.checkSingle}
                value={`${usd(SECOND)} ≤ ${usd(CAP)}`}
                ok
              />
              <Check
                label={t.checkDay}
                value={`${usd(RUNNING)} > ${usd(CAP)}`}
                ok={false}
              />
            </ul>
            <p className="mt-5 text-sm font-light text-neutral-400">{t.after2}</p>
          </li>
        </ol>

        <div className="hairline my-9 h-px w-full" />

        {/* the running total, drawn */}
        <p className="track-mid mb-4 text-[10px] text-neutral-500">{t.blindLabel}</p>
        <div className="relative h-12 w-full overflow-hidden rounded-[4px] border border-white/5 bg-black/40">
          {/* request 1 */}
          <span
            className="absolute inset-y-0 left-0"
            style={{
              width: pct(FIRST),
              background: "linear-gradient(180deg, rgba(200,255,216,0.30), rgba(200,255,216,0.12))",
              borderRight: "1px solid rgba(200,255,216,0.45)",
            }}
          />
          {/* request 2, the part that crosses */}
          <span
            className="absolute inset-y-0"
            style={{
              left: pct(FIRST),
              width: pct(SECOND),
              background:
                "repeating-linear-gradient(45deg, rgba(255,180,180,0.20) 0 6px, rgba(255,180,180,0.07) 6px 12px)",
              borderRight: "1px solid rgba(255,180,180,0.45)",
            }}
          />
          {/* the cap */}
          <span
            className="absolute inset-y-0 w-px"
            style={{ left: pct(CAP), background: "rgba(232,235,245,0.9)", boxShadow: "0 0 10px rgba(200,210,255,0.6)" }}
            aria-hidden="true"
          />
        </div>
        <div className="relative mt-2 h-5 w-full text-[10px]">
          <span className="absolute left-0 text-neutral-500">{usd(0)}</span>
          <span
            className="track-mid absolute -translate-x-1/2 whitespace-nowrap text-neutral-300"
            style={{ left: pct(CAP) }}
          >
            {usd(CAP)} {t.dailyCap}
          </span>
        </div>
        <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-neutral-400">
          {t.arithmetic(usd(FIRST), usd(SECOND), usd(RUNNING))}
          {t.shapes.map((w, i) => (
            <span key={w}>
              <span className="text-neutral-200">{w}</span>
              {i < t.shapes.length - 2 ? ", " : i === t.shapes.length - 2 ? t.shapeOr : ""}
            </span>
          ))}
          {t.shapeTail}
        </p>
      </div>

      <p className="fade-up mt-6 text-xs text-neutral-500">{t.foot}</p>
    </section>
  );
}
