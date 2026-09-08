/*
 * Charts for the research note "Zero barriers, one reviewer".
 *
 * Every value here is a published figure or one derived from published figures;
 * the geometry is computed from those numbers, never hand-placed. If a number
 * changes, change it once at the top of its component and the drawing follows.
 *
 * Palette note: the site tokens --border (#1c1c20) and --muted (#8b8b92) are
 * correct for page chrome and body copy but disappear when used for data marks
 * — --border sits at 1.43:1 against --background, well under the 3:1 WCAG floor
 * for graphical elements. The four constants below are chart-only and were
 * chosen to clear that floor while staying subordinate to --seal.
 */

import type { Locale } from "@/content";

const SEAL = "var(--seal)";
const FG = "var(--foreground)";
const TXT2 = "#c2c6d0"; // secondary chart text — 11.92:1
const LBL = "#9ea3ae"; // small-caps labels    —  8.06:1
const RING = "#6a6a78"; // empty dot outlines   —  3.83:1
const LINE = "#63636e"; // axes and connectors  —  3.43:1
const BAR2 = "#5c5c69"; // "suspected" bars     —  3.09:1
const BG = "var(--background)";

const MONO = "var(--font-jetbrains), ui-monospace, monospace";
const SANS = "var(--font-inter), Inter, sans-serif";

type L<T> = Record<Locale, T>;
const pick = <T,>(d: L<T>, locale: Locale): T => d[locale] ?? d.en;

function Cap(props: {
  x: number;
  y: number;
  children: string;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  const { x, y, children, size = 12.5, fill = LBL, anchor = "start", weight = 500 } = props;
  return (
    <text
      x={x}
      y={y}
      fontFamily={MONO}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight}
      letterSpacing="0.14em"
    >
      {children}
    </text>
  );
}

function Txt(props: {
  x: number;
  y: number;
  children: string;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  const { x, y, children, size = 15, fill = FG, anchor = "start", weight = 400 } = props;
  return (
    <text x={x} y={y} fontFamily={SANS} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight}>
      {children}
    </text>
  );
}

/* ── 1. Timeline ─────────────────────────────────────────────────────────
   Spacing is sequential, not proportional to elapsed time; the dates carry
   the real interval. Authored at 1030 units so it renders near 1:1 in the
   article column — a wider viewBox would shrink the labels.            */

const TIMELINE: L<{ months: [string, string]; ev: [string, string, string, boolean][] }> = {
  en: {
    months: ["JULY 2026", "SEPTEMBER 2026"],
    ev: [
      ["9–13 JUL", "Inside Hugging Face", "107.8h, ~17,600 actions", true],
      ["16 JUL", "Hugging Face detects", "and discloses", true],
      ["21 JUL", "OpenAI attributes the", "agents as its own", false],
      ["25–28 JUL", "AISI: unsanctioned", "action in 10 of 122 runs", true],
      ["30 JUL – 5 AUG", "Anthropic, then Meta,", "the same failure", false],
      ["4 AUG", "AISI publishes its", "incident report", false],
      ["26 AUG", "OpenAI publishes", "its full report", false],
      ["4–5 SEP", "Wiki incident surfaces.", "State AG inquiries.", true],
    ],
  },
  fr: {
    months: ["JUILLET 2026", "SEPTEMBRE 2026"],
    ev: [
      ["9–13 JUIL", "Chez Hugging Face", "107,8 h, ~17 600 actions", true],
      ["16 JUIL", "Hugging Face détecte", "et divulgue", true],
      ["21 JUIL", "OpenAI attribue les", "agents aux siens", false],
      ["25–28 JUIL", "AISI : action non autorisée", "dans 10 des 122 exécutions", true],
      ["30 JUIL – 5 AOÛT", "Anthropic, puis Meta,", "la même défaillance", false],
      ["4 AOÛT", "L’AISI publie son", "rapport d’incident", false],
      ["26 AOÛT", "OpenAI publie", "son rapport complet", false],
      ["4–5 SEPT", "Le wiki refait surface.", "Enquêtes des procureurs.", true],
    ],
  },
};

export function TimelineChart({ locale, label }: { locale: Locale; label: string }) {
  const { months, ev } = pick(TIMELINE, locale);
  const W = 1030;
  const H = 340;
  const x0 = 115;
  const x1 = 915;
  const y = 180;
  const pitch = (x1 - x0) / (ev.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={label}>
      <Cap x={30} y={42} size={12}>
        {months[0]}
      </Cap>
      <Cap x={1000} y={42} size={12} anchor="end">
        {months[1]}
      </Cap>
      <line x1={30} y1={y} x2={1000} y2={y} stroke={LINE} strokeWidth={1.5} />
      {ev.map(([date, l1, l2, hot], i) => {
        const x = x0 + i * pitch;
        const col = hot ? SEAL : FG;
        const up = i % 2 === 0;
        const ty = up ? y - 50 : y + 50;
        const base = up ? ty - 44 : ty + 20;
        return (
          <g key={date}>
            <line x1={x} y1={y} x2={x} y2={ty} stroke={LINE} strokeWidth={1.5} />
            <circle cx={x} cy={y} r={hot ? 7 : 5.5} fill={BG} stroke={col} strokeWidth={2} />
            {hot && <circle cx={x} cy={y} r={2.6} fill={col} />}
            <Cap x={x} y={base} size={12.5} fill={col} anchor="middle" weight={600}>
              {date}
            </Cap>
            <Txt x={x} y={base + 23} fill={hot ? FG : TXT2} anchor="middle">
              {l1}
            </Txt>
            <Txt x={x} y={base + 43} fill={hot ? FG : TXT2} anchor="middle">
              {l2}
            </Txt>
          </g>
        );
      })}
    </svg>
  );
}

/* ── 2. Unit chart: 122 runs, 10 off-script ──────────────────────────────
   AISI ran the task 122 times. 19 unsanctioned actions fell in 10 runs; 2 of
   those actions came from a single GPT-5.6 Sol run, so 9 affected runs belong
   to Mythos 5. Dot placement is illustrative — the counts are exact.     */

const RUNS: L<{ header: string; legend: [string, string, string] }> = {
  en: {
    header: "122 RUNS OF ONE TASK, SEVEN MODELS",
    legend: ["9 runs — Mythos 5", "1 run — GPT-5.6 Sol", "112 runs — as intended"],
  },
  fr: {
    header: "122 EXÉCUTIONS D’UNE TÂCHE, SEPT MODÈLES",
    legend: ["9 exécutions — Mythos 5", "1 exécution — GPT-5.6 Sol", "112 exécutions — conformes"],
  },
};

export function RunsChart({ locale, label }: { locale: Locale; label: string }) {
  const { header, legend } = pick(RUNS, locale);
  const TOTAL = 122;
  const MYTHOS = 9;
  const SOL = 1;
  const cols = 22;
  const gap = 34.5;
  const r = 8.5;
  const ox = 70;
  const oy = 76;
  const ly = oy + 5 * gap + 62;

  return (
    <svg viewBox="0 0 1000 355" className="block h-auto w-full" role="img" aria-label={label}>
      <Cap x={ox} y={36}>
        {header}
      </Cap>
      {Array.from({ length: TOTAL }, (_, i) => {
        const fill = i < MYTHOS ? SEAL : i < MYTHOS + SOL ? FG : "#15151a";
        const stroke = i < MYTHOS ? SEAL : i < MYTHOS + SOL ? FG : RING;
        return (
          <circle
            key={i}
            cx={ox + (i % cols) * gap}
            cy={oy + Math.floor(i / cols) * gap}
            r={r}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.8}
          />
        );
      })}
      {([
        [ox + 7, SEAL, SEAL, legend[0], FG],
        [ox + 400, FG, FG, legend[1], FG],
        [ox + 670, "#15151a", RING, legend[2], TXT2],
      ] as const).map(([lx, fill, stroke, text, tc]) => (
        <g key={text}>
          <circle cx={lx} cy={ly - 5} r={7.5} fill={fill} stroke={stroke} strokeWidth={1.8} />
          <Txt x={lx + 18} y={ly} fill={tc}>
            {text}
          </Txt>
        </g>
      ))}
    </svg>
  );
}

/* ── 3. Per-model spread ─────────────────────────────────────────────────
   9/43 = 20.9% against 1/35 = 2.9%. Read with the configuration caveat in
   section 5: the two were not necessarily under identical safeguards.   */

const SPREAD: L<{ header: string; foot: string; rows: [string, string][] }> = {
  en: {
    header: "SHARE OF ITS OWN RUNS THAT WENT OFF-SCRIPT",
    foot: "Same task. Same harness. Same week. A 7.3× spread.",
    rows: [
      ["Mythos 5 (Anthropic)", "9 OF 43 RUNS"],
      ["GPT-5.6 Sol (OpenAI)", "1 OF 35 RUNS"],
      ["Other five models", "0 OF 44 RUNS"],
    ],
  },
  fr: {
    header: "PART DE SES PROPRES EXÉCUTIONS SORTIES DU CADRE",
    foot: "Même tâche. Même harnais. Même semaine. Un écart de 7,3×.",
    rows: [
      ["Mythos 5 (Anthropic)", "9 DES 43 EXÉCUTIONS"],
      ["GPT-5.6 Sol (OpenAI)", "1 DES 35 EXÉCUTIONS"],
      ["Cinq autres modèles", "0 DES 44 EXÉCUTIONS"],
    ],
  },
};

export function SpreadChart({ locale, label }: { locale: Locale; label: string }) {
  const { header, foot, rows } = pick(SPREAD, locale);
  const values = [20.93, 2.86, 0];
  const colours = [SEAL, FG, RING];
  const x0 = 330;
  const x1 = 870;
  const max = 22;
  const y = 84;
  const bh = 34;
  const gap = 70;
  const dec = locale === "fr" ? "," : ".";

  return (
    <svg viewBox="0 0 1000 320" className="block h-auto w-full" role="img" aria-label={label}>
      <Cap x={70} y={38}>
        {header}
      </Cap>
      {rows.map(([name, sub], i) => {
        const yy = y + i * gap;
        const v = values[i];
        const w = ((x1 - x0) * v) / max;
        return (
          <g key={name}>
            <Txt x={70} y={yy + 15} size={16}>
              {name}
            </Txt>
            <Cap x={70} y={yy + 35} size={12} weight={400}>
              {sub}
            </Cap>
            <line x1={x0} y1={yy + bh / 2} x2={x1} y2={yy + bh / 2} stroke={LINE} strokeWidth={1} />
            {v > 0 ? (
              <>
                <rect x={x0} y={yy} width={w} height={bh} fill={colours[i]} rx={2} />
                <text
                  x={x0 + w + 16}
                  y={yy + bh / 2 + 7}
                  fontFamily={MONO}
                  fontSize={20}
                  fill={colours[i]}
                  fontWeight={500}
                >
                  {v.toFixed(1).replace(".", dec)}%
                </text>
              </>
            ) : (
              <text x={x0 + 16} y={yy + bh / 2 + 7} fontFamily={MONO} fontSize={20} fill={TXT2}>
                0%
              </text>
            )}
          </g>
        );
      })}
      <line x1={x0} y1={y - 16} x2={x0} y2={y + 2 * gap + bh + 12} stroke={LINE} strokeWidth={1} />
      <Txt x={70} y={y + 2 * gap + bh + 48} fill={TXT2}>
        {foot}
      </Txt>
    </svg>
  );
}

/* ── 4. Detection window vs time to full compromise ──────────────────────
   The load-bearing chart. AISI's behaviour ran ~72h before anyone noticed;
   the Hugging Face agent needed 13h to go from a foothold to cluster-admin.
   Different incidents — see the comparability caveat in section 5.      */

const DETECTION: L<{ header: string; bracket: string; rows: [string, string, string][] }> = {
  en: {
    header: "HOURS",
    bracket: "5.5× wider than the whole attack",
    rows: [
      ["Detection window", "AISI — BEHAVIOUR RAN UNNOTICED", "~72 h"],
      ["Time to full compromise", "HUGGING FACE — FOOTHOLD TO CLUSTER-ADMIN", "13 h"],
      ["Containment", "AISI — ONCE THE ALERT FIRED", "~1 h"],
    ],
  },
  fr: {
    header: "HEURES",
    bracket: "5,5× plus large que l’attaque entière",
    rows: [
      ["Fenêtre de détection", "AISI — COMPORTEMENT PASSÉ INAPERÇU", "~72 h"],
      ["Temps de compromission totale", "HUGGING FACE — ACCÈS INITIAL À ADMIN CLUSTER", "13 h"],
      ["Confinement", "AISI — UNE FOIS L’ALERTE DÉCLENCHÉE", "~1 h"],
    ],
  },
};

export function DetectionChart({ locale, label }: { locale: Locale; label: string }) {
  const { header, bracket, rows } = pick(DETECTION, locale);
  const hours = [72, 13, 1];
  const colours = [SEAL, FG, TXT2];
  const x0 = 490;
  const x1 = 950;
  const max = 72;
  const y = 92;
  const bh = 38;
  const gap = 76;
  const span = x1 - x0;
  const w13 = (span * 13) / max;
  const by = y + 2 * gap + bh + 34;

  return (
    <svg viewBox="0 0 1000 350" className="block h-auto w-full" role="img" aria-label={label}>
      <Cap x={70} y={38}>
        {header}
      </Cap>
      {rows.map(([name, sub, val], i) => {
        const yy = y + i * gap;
        const w = Math.max((span * hours[i]) / max, 3);
        return (
          <g key={name}>
            <Txt x={70} y={yy + 16} size={16}>
              {name}
            </Txt>
            <Cap x={70} y={yy + 36} size={11.5} weight={400}>
              {sub}
            </Cap>
            <rect x={x0} y={yy} width={w} height={bh} fill={colours[i]} rx={2} />
            <text
              x={x0 + w + 16}
              y={yy + bh / 2 + 7}
              fontFamily={MONO}
              fontSize={21}
              fill={colours[i]}
              fontWeight={500}
            >
              {val}
            </text>
          </g>
        );
      })}
      {[w13, span].map((wx) => (
        <line
          key={wx}
          x1={x0 + wx}
          y1={y + bh + 10}
          x2={x0 + wx}
          y2={by}
          stroke={LINE}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      ))}
      <line x1={x0 + w13} y1={by} x2={x0 + span} y2={by} stroke={SEAL} strokeWidth={1.5} />
      <Txt x={x0 + (w13 + span) / 2} y={by + 26} size={15.5} fill={SEAL} anchor="middle" weight={500}>
        {bracket}
      </Txt>
    </svg>
  );
}

/* ── 5. Sector pair: the audit gap ───────────────────────────────────────
   Both sectors land at ~54% total incidence. Financial services confirms far
   less of what it suspects — 5.84 suspicions per confirmation against 1.08. */

const SECTOR: L<{ total: string; confirmed: string; suspected: string; ratio: string; names: [string, string] }> = {
  en: {
    total: "% TOTAL INCIDENCE",
    confirmed: "CONFIRMED",
    suspected: "SUSPECTED",
    ratio: "suspicions per confirmation",
    names: ["Financial services", "Healthcare"],
  },
  fr: {
    total: "% D’INCIDENCE TOTALE",
    confirmed: "CONFIRMÉ",
    suspected: "SOUPÇONNÉ",
    ratio: "soupçons par confirmation",
    names: ["Services financiers", "Santé"],
  },
};

export function SectorChart({
  locale,
  sector,
  label,
}: {
  locale: Locale;
  sector: "finance" | "health";
  label: string;
}) {
  const t = pick(SECTOR, locale);
  const isFin = sector === "finance";
  const confirmed = isFin ? 8.0 : 26.2;
  const suspected = isFin ? 46.7 : 28.2;
  const ratio = isFin ? "5.84" : "1.08";
  const name = isFin ? t.names[0] : t.names[1];
  const dec = locale === "fr" ? "," : ".";
  const num = (n: number) => n.toFixed(1).replace(".", dec);

  const x0 = 30;
  const x1 = 450;
  const y = 108;
  const bh = 32;
  const max = 50;

  return (
    <svg viewBox="0 0 480 330" className="block h-auto w-full" role="img" aria-label={label}>
      <Txt x={x0} y={38} size={18} weight={500}>
        {name}
      </Txt>
      <Cap x={x0} y={62} size={12.5}>
        {`${num(confirmed + suspected)}${t.total}`}
      </Cap>
      {([
        [t.confirmed, confirmed, SEAL],
        [t.suspected, suspected, BAR2],
      ] as const).map(([lab, v, c], j) => {
        const yy = y + j * 62;
        const w = Math.max(((x1 - x0) * v) / max, 3);
        const inside = w > 72;
        return (
          <g key={lab}>
            <Cap x={x0} y={yy - 9} size={12} weight={400}>
              {lab}
            </Cap>
            <rect x={x0} y={yy} width={w} height={bh} fill={c} rx={2} />
            <text
              x={inside ? x0 + w - 14 : x0 + w + 14}
              y={yy + bh / 2 + 6}
              fontFamily={MONO}
              fontSize={16}
              fill={inside && j === 0 ? BG : FG}
              textAnchor={inside ? "end" : "start"}
              fontWeight={500}
            >
              {`${num(v)}%`}
            </text>
          </g>
        );
      })}
      <line x1={x0} y1={y + 130} x2={x1} y2={y + 130} stroke={LINE} />
      <text x={x0} y={y + 166} fontFamily={MONO} fontSize={31} fill={SEAL} fontWeight={500}>
        {ratio.replace(".", dec)}
      </text>
      <Txt x={x0} y={y + 190} size={14.5} fill={TXT2}>
        {t.ratio}
      </Txt>
    </svg>
  );
}
