/*
 * The path of one case through Ironproof, drawn left to right: the steps
 * before the split, two independent checks side by side, the verdict, the
 * seal. Shared by the home page (the whole platform) and /modernization (one
 * COBOL program), so the two drawings cannot drift apart.
 *
 * A gold point runs each branch (SMIL, no script) and is hidden for visitors
 * who ask for reduced motion. Gold is kept for the seal, as everywhere else.
 */

export type FlowLabel = [string, string];

export type FlowCopy = {
  caption: string;
  /** The steps before the split, in order (two or three read best). */
  lead: readonly FlowLabel[];
  top: FlowLabel;
  bottom: FlowLabel;
  /** Optional engines drawn as small boxes inside each check (Dom, 2026-10-19:
   *  « rajoute un autre carré à l'intérieur »). Name and a two-word role. */
  topInset?: readonly FlowLabel[];
  bottomInset?: readonly FlowLabel[];
  verdict: FlowLabel;
  seal: FlowLabel;
};

const H = 64;
const GAP = 34;
const LEAD_W = 196;
const CHECK_W = 240;
const VERDICT_W = 230;
const SEAL_W = 180;
// Row centres: the main line, the upper check, the lower check.
const MID = 140;
const TOP_Y = 38;
const BOTTOM_Y = 178;

// Inset boxes inside a check: one row under the label.
const INSET_H = 46;
const INSET_PAD = 16;
const INSET_GAP = 10;

/* The site's three materials (globals.css: .hero-card-iron, .hero-card-gold,
 * the white paper): paper for the steps, iron for the two checks, gold for the
 * engines and the seal (Dom, 2026-10-19: « enhance a cool design »). */
const INK = "#24262a";
const PAPER_LINE = "rgba(36, 38, 42, 0.28)";
const GOLD = "#c9a24a";
const GOLD_SOFT = "#e3c47c";

type Tone = "paper" | "iron" | "gold";

function hash(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

function Node({
  id,
  x,
  y,
  w,
  label,
  tone = "paper",
  h = H,
  inset,
  num,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  label: FlowLabel;
  tone?: Tone;
  h?: number;
  inset?: readonly FlowLabel[];
  num?: string;
}) {
  const n = inset?.length ?? 0;
  const cw = n > 0 ? (w - 2 * INSET_PAD - (n - 1) * INSET_GAP) / n : 0;
  const fill = tone === "iron" ? `url(#${id}-iron)` : tone === "gold" ? `url(#${id}-gold)` : `url(#${id}-paper)`;
  const stroke = tone === "iron" ? "rgba(255,255,255,0.08)" : tone === "gold" ? "rgba(107,84,32,0.55)" : PAPER_LINE;
  const kicker = tone === "iron" ? "#f1efe9" : INK;
  const sub = tone === "iron" ? "#b9b6af" : tone === "gold" ? "#3a3220" : "#55575c";
  return (
    <g>
      {num ? (
        <text x={x} y={y - 10} fill={GOLD} fontSize={11} letterSpacing={2} fontFamily="var(--font-mono, monospace)">
          {num}
        </text>
      ) : null}
      <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth={1} filter={`url(#${id}-shadow)`} />
      {tone === "iron" ? <rect x={x} y={y} width={3} height={h} rx={1.5} fill={GOLD} /> : null}
      <text x={x + 18} y={y + 27} fill={kicker} fontSize={14} fontWeight={600} letterSpacing={2.4} fontFamily="var(--font-mono, monospace)">
        {label[0]}
      </text>
      <text x={x + 18} y={y + 48} fill={sub} fontSize={13.5}>
        {label[1]}
      </text>
      {inset?.map((c, i) => {
        const cx = x + INSET_PAD + i * (cw + INSET_GAP);
        const cy = y + H - 2;
        return (
          <g key={c[0]}>
            <rect x={cx} y={cy} width={cw} height={INSET_H} rx={4} fill="rgba(201,162,74,0.10)" stroke={GOLD} strokeOpacity={0.7} strokeWidth={1} />
            <circle cx={cx + 12} cy={cy + 15} r={2.6} fill={GOLD_SOFT} />
            <text x={cx + 21} y={cy + 19} fill={GOLD_SOFT} fontSize={12} fontWeight={600} letterSpacing={1.4} fontFamily="var(--font-mono, monospace)">
              {c[0]}
            </text>
            <text x={cx + 12} y={cy + 36} fill="#cfcac0" fontSize={10.5}>
              {c[1]}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* The engineering system around the method, drawn as an architecture, not a
 * list (Dom, 2026-10-19: « démontre-le en architecture, rends ça cool et
 * innovant »): the foundation constrains every step from above, memory feeds
 * the case on the way in, controls stand at the way out, and learning closes
 * the loop: every refusal becomes a rule that memory hands to the next case. */
export type OsGroup = { label: string; items: readonly FlowLabel[] };
export type FlowRail = {
  k: string;
  t: string;
  foundation: OsGroup;
  memory: OsGroup;
  learning: OsGroup;
  control: OsGroup;
  /** Arrow labels: constraint, way out, refusal, new rule, recall, loop. */
  arrows: { constrains: string; out: string; refusal: string; rule: string; recall: string; loop: string };
};

const OS_PAD = 18;
const OS_TITLE = 38;
const OS_FOUND_Y = 52;
const OS_FOUND_H = 54;
const OS_FOUND_LABEL = 136;
const OS_GAP = 10;
const OS_COL_GAP = 66;
const OS_ITEM_H = 42;
const OS_ITEM_GAP = 8;

function OsItem({ x, y, w, it, tone }: { x: number; y: number; w: number; it: FlowLabel; tone: "paper" | "iron" }) {
  const iron = tone === "iron";
  return (
    <g>
      <rect x={x} y={y} width={w} height={OS_ITEM_H} rx={5} fill={iron ? "#23252a" : "rgba(255,255,255,0.75)"} stroke={iron ? "rgba(255,255,255,0.08)" : "rgba(201,162,74,0.55)"} />
      <rect x={x} y={y} width={3} height={OS_ITEM_H} rx={1.5} fill={GOLD} />
      <text x={x + 14} y={y + 18} fill={iron ? GOLD_SOFT : INK} fontSize={11.5} fontWeight={600} letterSpacing={1.5} fontFamily="var(--font-mono, monospace)">
        {it[0]}
      </text>
      <text x={x + 14} y={y + 33} fill={iron ? "#c9c4b8" : "#55575c"} fontSize={10.5}>
        {it[1]}
      </text>
    </g>
  );
}

export function FlowDiagram({ f, rail }: { f: FlowCopy; rail?: FlowRail }) {
  if (f.lead.length === 0) return null;
  const id = `fd${hash(f.caption)}`;

  const insets = Boolean(f.topInset?.length || f.bottomInset?.length);
  const checkW = insets ? 380 : CHECK_W;
  const checkH = insets ? H + INSET_H + 14 : H;
  const topY = insets ? 30 : TOP_Y;
  const bottomY = insets ? topY + checkH + 40 : BOTTOM_Y;
  const mid = insets ? (topY + checkH / 2 + bottomY + checkH / 2) / 2 : MID;
  const height = insets ? bottomY + checkH + 16 : 276;
  const leadX = f.lead.map((_, i) => 10 + i * (LEAD_W + GAP));
  const leadEnd = leadX[leadX.length - 1] + LEAD_W;
  const branch = leadEnd + 22;
  const checkX = branch + 22;
  const join = checkX + checkW + 22;
  const verdictX = join + GAP;
  const sealX = verdictX + VERDICT_W + GAP;
  const end = sealX + SEAL_W;
  const width = end + 14;
  const topMid = topY + checkH / 2;
  const bottomMid = bottomY + checkH / 2;

  const links = leadX.slice(1).map((x) => `M${x - GAP} ${mid} H${x}`).join(" ");
  const wires = [
    links,
    `M${leadEnd} ${mid} H${branch} V${topMid} H${checkX} M${branch} ${mid} V${bottomMid} H${checkX}`,
    `M${checkX + checkW} ${topMid} H${join} V${bottomMid} H${checkX + checkW} M${join} ${mid} H${verdictX}`,
    `M${verdictX + VERDICT_W} ${mid} H${sealX}`,
  ].join(" ");
  const nums = (i: number) => String(i + 1).padStart(2, "0");
  // With a rail: title, foundation strip, the method, then three columns
  // (memory, learning, control) joined by the loop.
  const ox = rail ? OS_PAD : 0;
  const oy = rail ? OS_FOUND_Y + OS_FOUND_H + 40 : 0;
  const fullW = width + 2 * ox;
  const colsY = oy + height + 64;
  const colW = (fullW - 2 * OS_PAD - 2 * OS_COL_GAP) / 3;
  const colX = [OS_PAD, OS_PAD + colW + OS_COL_GAP, OS_PAD + 2 * (colW + OS_COL_GAP)];
  const maxItems = rail ? Math.max(rail.memory.items.length, rail.learning.items.length, rail.control.items.length) : 0;
  const colH = 22 + maxItems * (OS_ITEM_H + OS_ITEM_GAP);
  const fullH = rail ? colsY + colH + 26 : height;
  const foundN = rail ? rail.foundation.items.length : 0;
  const foundW = rail ? (fullW - 2 * OS_PAD - OS_FOUND_LABEL - foundN * OS_GAP) / Math.max(foundN, 1) : 0;
  const midCols = colsY + 22 + (colH - 22) / 2;
  const caseX = ox + leadX[0] + LEAD_W / 2;
  const sealCx = ox + sealX + SEAL_W / 2;
  const nodeBottom = oy + mid + H / 2;
  const k = f.lead.length;

  return (
    <figure className="fade-up mt-14">
      <div className="card-premium overflow-x-auto p-6 md:p-8">
        <svg viewBox={`0 0 ${fullW} ${fullH}`} className="w-full min-w-[900px]" role="img" aria-label={f.caption}>
          <defs>
            <linearGradient id={`${id}-iron`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2c2e33" />
              <stop offset="100%" stopColor="#1b1d20" />
            </linearGradient>
            <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0d58e" />
              <stop offset="55%" stopColor="#d2ad5a" />
              <stop offset="100%" stopColor="#a8843a" />
            </linearGradient>
            <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdfcfa" />
              <stop offset="100%" stopColor="#efede8" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-10%" y="-20%" width="120%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#14161a" floodOpacity="0.18" />
            </filter>
            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <style>{`.${id}-dash{stroke-dasharray:3 9;animation:${id}-run 1.6s linear infinite}@keyframes ${id}-run{to{stroke-dashoffset:-24}}@media (prefers-reduced-motion: reduce){.${id}-pulse{display:none}.${id}-dash{animation:none}}`}</style>
          {rail ? (
            <g>
              <defs>
                <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill={GOLD} />
                </marker>
              </defs>
              <rect x={1} y={1} width={fullW - 2} height={fullH - 2} rx={12} fill="none" stroke={GOLD} strokeOpacity={0.5} strokeDasharray="2 6" strokeWidth={1.2} />
              {/* Title band */}
              <rect x={1} y={1} width={fullW - 2} height={OS_TITLE} rx={12} fill={`url(#${id}-iron)`} />
              <circle cx={OS_PAD + 6} cy={OS_TITLE / 2 + 1} r={3.5} fill={GOLD_SOFT} />
              <text x={OS_PAD + 18} y={OS_TITLE / 2 + 5.5} fill="#f1efe9" fontSize={13} fontWeight={600} letterSpacing={2.6} fontFamily="var(--font-mono, monospace)">
                {rail.k.toUpperCase()}
              </text>
              <text x={fullW - OS_PAD} y={OS_TITLE / 2 + 5.5} textAnchor="end" fill="#b9b6af" fontSize={12.5}>
                {rail.t}
              </text>
              {/* Foundation: one beam across the top that constrains every step */}
              <rect x={OS_PAD} y={OS_FOUND_Y} width={fullW - 2 * OS_PAD} height={OS_FOUND_H} rx={6} fill={`url(#${id}-iron)`} filter={`url(#${id}-shadow)`} />
              <text x={OS_PAD + 16} y={OS_FOUND_Y + OS_FOUND_H / 2 + 4.5} fill={GOLD_SOFT} fontSize={12} fontWeight={600} letterSpacing={2.4} fontFamily="var(--font-mono, monospace)">
                {rail.foundation.label}
              </text>
              {rail.foundation.items.map((it, i) => {
                const x = OS_PAD + OS_FOUND_LABEL + i * (foundW + OS_GAP);
                return (
                  <g key={it[0]}>
                    <rect x={x} y={OS_FOUND_Y + 7} width={foundW} height={OS_FOUND_H - 14} rx={4} fill="rgba(201,162,74,0.10)" stroke={GOLD} strokeOpacity={0.55} />
                    <text x={x + 12} y={OS_FOUND_Y + 25} fill={GOLD_SOFT} fontSize={11} fontWeight={600} letterSpacing={1.4} fontFamily="var(--font-mono, monospace)">
                      {it[0]}
                    </text>
                    <text x={x + 12} y={OS_FOUND_Y + 39} fill="#cfcac0" fontSize={10}>
                      {it[1]}
                    </text>
                  </g>
                );
              })}
              {/* Constraint arrows from the beam onto the method */}
              {[0.18, 0.5, 0.82].map((r) => (
                <path key={r} d={`M${fullW * r} ${OS_FOUND_Y + OS_FOUND_H + 4} V${oy - 10}`} stroke={GOLD} strokeOpacity={0.7} strokeWidth={1.2} strokeDasharray="3 4" markerEnd={`url(#${id}-arrow)`} />
              ))}
              <text x={fullW * 0.5 + 10} y={oy - 16} fill="#8a8780" fontSize={10.5} fontStyle="italic">
                {rail.arrows.constrains}
              </text>
              {/* The three columns */}
              {(
                [
                  [rail.memory, "paper"],
                  [rail.learning, "iron"],
                  [rail.control, "paper"],
                ] as const
              ).map(([g, tone], c) => (
                <g key={g.label}>
                  <text x={colX[c]} y={colsY + 12} fill={GOLD} fontSize={12} fontWeight={600} letterSpacing={2.4} fontFamily="var(--font-mono, monospace)">
                    {g.label}
                  </text>
                  {g.items.map((it, i) => (
                    <OsItem key={it[0]} x={colX[c]} y={colsY + 22 + i * (OS_ITEM_H + OS_ITEM_GAP)} w={colW} it={it} tone={tone} />
                  ))}
                </g>
              ))}
              {/* The loop: seal -> control -> learning -> memory -> case */}
              <g fill="none" stroke={GOLD} strokeWidth={1.5} strokeOpacity={0.85}>
                <path d={`M${sealCx} ${nodeBottom + 4} V${colsY - 4}`} className={`${id}-dash`} markerEnd={`url(#${id}-arrow)`} />
                <path d={`M${colX[2] - 6} ${midCols} H${colX[1] + colW + 6}`} className={`${id}-dash`} markerEnd={`url(#${id}-arrow)`} />
                <path d={`M${colX[1] - 6} ${midCols} H${colX[0] + colW + 6}`} className={`${id}-dash`} markerEnd={`url(#${id}-arrow)`} />
                <path d={`M${caseX} ${colsY - 4} V${nodeBottom + 4}`} className={`${id}-dash`} markerEnd={`url(#${id}-arrow)`} />
              </g>
              <g fill="#6f6c66" fontSize={10.5} fontStyle="italic">
                <text x={sealCx + 8} y={(nodeBottom + colsY) / 2 + 4}>{rail.arrows.out}</text>
                <text x={colX[2] - OS_COL_GAP / 2} y={midCols - 10} textAnchor="middle">{rail.arrows.refusal}</text>
                <text x={colX[1] - OS_COL_GAP / 2} y={midCols - 10} textAnchor="middle">{rail.arrows.rule}</text>
                <text x={caseX + 8} y={(nodeBottom + colsY) / 2 + 4}>{rail.arrows.recall}</text>
              </g>
              <text x={fullW / 2} y={fullH - 10} textAnchor="middle" fill={GOLD} fontSize={11} letterSpacing={2} fontFamily="var(--font-mono, monospace)">
                {rail.arrows.loop}
              </text>
            </g>
          ) : null}
          <g transform={`translate(${ox} ${oy})`}>
          <path d={wires} fill="none" stroke={PAPER_LINE} strokeWidth={1.2} />
          <path d={wires} fill="none" stroke={GOLD} strokeOpacity={0.75} strokeWidth={1.4} className={`${id}-dash`} />
          {f.lead.map((l, i) => (
            <Node key={l[0]} id={id} x={leadX[i]} y={mid - H / 2} w={LEAD_W} label={l} num={nums(i)} />
          ))}
          <Node id={id} x={checkX} y={topY} w={checkW} h={checkH} label={f.top} tone="iron" inset={f.topInset} num={`${nums(k)}A`} />
          <Node id={id} x={checkX} y={bottomY} w={checkW} h={checkH} label={f.bottom} tone="iron" inset={f.bottomInset} num={`${nums(k)}B`} />
          <Node id={id} x={verdictX} y={mid - H / 2} w={VERDICT_W} label={f.verdict} num={nums(k + 1)} />
          <Node id={id} x={sealX} y={mid - H / 2} w={SEAL_W} label={f.seal} tone="gold" num={nums(k + 2)} />
          <g className={`${id}-pulse`} filter={`url(#${id}-glow)`}>
            <circle r={4.5} fill={GOLD_SOFT}>
              <animateMotion dur="6s" repeatCount="indefinite" path={`M10 ${mid} H${branch} V${topMid} H${join} V${mid} H${end}`} />
            </circle>
            <circle r={4.5} fill={GOLD_SOFT}>
              <animateMotion dur="6s" repeatCount="indefinite" path={`M10 ${mid} H${branch} V${bottomMid} H${join} V${mid} H${end}`} />
            </circle>
          </g>
          </g>
        </svg>
      </div>
      <figcaption className="track-mid edge-t mt-5 pt-4 text-xs leading-relaxed text-neutral-500">{f.caption}</figcaption>
    </figure>
  );
}
