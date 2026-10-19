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
const GAP = 30;
const LEAD_W = 170;
const CHECK_W = 240;
const VERDICT_W = 230;
const SEAL_W = 175;
// Row centres: the main line, the upper check, the lower check.
const MID = 132;
const TOP_Y = 30;
const BOTTOM_Y = 170;

// Inset boxes inside a check: one row under the label.
const INSET_H = 44;
const INSET_PAD = 16;
const INSET_GAP = 8;

function Node({
  x,
  y,
  w,
  label,
  gold,
  h = H,
  inset,
}: {
  x: number;
  y: number;
  w: number;
  label: FlowLabel;
  gold?: boolean;
  h?: number;
  inset?: readonly FlowLabel[];
}) {
  const n = inset?.length ?? 0;
  const cw = n > 0 ? (w - 2 * INSET_PAD - (n - 1) * INSET_GAP) / n : 0;
  return (
    <g className={gold ? "text-seal" : "text-neutral-500"}>
      <rect x={x} y={y} width={w} height={h} rx={3} fill="var(--surface, transparent)" stroke="currentColor" strokeWidth={gold ? 1.5 : 1} />
      <text x={x + 16} y={y + 27} fill="currentColor" fontSize={15} letterSpacing={2.2} fontFamily="var(--font-mono, monospace)">
        {label[0]}
      </text>
      <text x={x + 16} y={y + 48} fill="currentColor" fontSize={14} opacity={0.9}>
        {label[1]}
      </text>
      {inset?.map((c, i) => {
        const cx = x + INSET_PAD + i * (cw + INSET_GAP);
        const cy = y + H - 2;
        return (
          <g key={c[0]} className="text-seal">
            <rect x={cx} y={cy} width={cw} height={INSET_H} rx={2} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.85} />
            <text x={cx + 9} y={cy + 18} fill="currentColor" fontSize={12} letterSpacing={1.2} fontFamily="var(--font-mono, monospace)">
              {c[0]}
            </text>
            <text x={cx + 9} y={cy + 34} fill="currentColor" fontSize={10} opacity={0.85}>
              {c[1]}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function FlowDiagram({ f }: { f: FlowCopy }) {
  if (f.lead.length === 0) return null;

  const insets = Boolean(f.topInset?.length || f.bottomInset?.length);
  const checkW = insets ? 372 : CHECK_W;
  const checkH = insets ? H + INSET_H + 12 : H;
  const topY = insets ? 10 : TOP_Y;
  const bottomY = insets ? topY + checkH + 30 : BOTTOM_Y;
  const mid = insets ? (topY + checkH / 2 + bottomY + checkH / 2) / 2 : MID;
  const height = insets ? bottomY + checkH + 10 : 268;
  const leadX = f.lead.map((_, i) => 10 + i * (LEAD_W + GAP));
  const leadEnd = leadX[leadX.length - 1] + LEAD_W;
  const branch = leadEnd + 20;
  const checkX = branch + 20;
  const join = checkX + checkW + 20;
  const verdictX = join + GAP;
  const sealX = verdictX + VERDICT_W + GAP;
  const end = sealX + SEAL_W;
  const width = end + 10;
  const topMid = topY + checkH / 2;
  const bottomMid = bottomY + checkH / 2;

  const links = leadX.slice(1).map((x) => `M${x - GAP} ${mid} H${x}`).join(" ");

  return (
    <figure className="fade-up mt-14">
      <div className="card-premium overflow-x-auto p-6 md:p-8">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[900px]" role="img" aria-label={f.caption}>
          <style>{`@media (prefers-reduced-motion: reduce){.flow-pulse{display:none}}`}</style>
          <g className="text-neutral-400" stroke="currentColor" fill="none" strokeWidth={1}>
            <path d={links} />
            <path d={`M${leadEnd} ${mid} H${branch} V${topMid} H${checkX} M${branch} ${mid} V${bottomMid} H${checkX}`} />
            <path d={`M${checkX + checkW} ${topMid} H${join} V${bottomMid} H${checkX + checkW} M${join} ${mid} H${verdictX}`} />
            <path d={`M${verdictX + VERDICT_W} ${mid} H${sealX}`} />
          </g>
          {f.lead.map((l, i) => (
            <Node key={l[0]} x={leadX[i]} y={mid - H / 2} w={LEAD_W} label={l} />
          ))}
          <Node x={checkX} y={topY} w={checkW} h={checkH} label={f.top} inset={f.topInset} />
          <Node x={checkX} y={bottomY} w={checkW} h={checkH} label={f.bottom} inset={f.bottomInset} />
          <Node x={verdictX} y={mid - H / 2} w={VERDICT_W} label={f.verdict} />
          <Node x={sealX} y={mid - H / 2} w={SEAL_W} label={f.seal} gold />
          <g className="flow-pulse text-seal">
            <circle r={4.5} fill="currentColor">
              <animateMotion dur="6s" repeatCount="indefinite" path={`M10 ${mid} H${branch} V${topMid} H${join} V${mid} H${end}`} />
            </circle>
            <circle r={4.5} fill="currentColor">
              <animateMotion dur="6s" repeatCount="indefinite" path={`M10 ${mid} H${branch} V${bottomMid} H${join} V${mid} H${end}`} />
            </circle>
          </g>
        </svg>
      </div>
      <figcaption className="track-mid edge-t mt-5 pt-4 text-xs leading-relaxed text-neutral-500">{f.caption}</figcaption>
    </figure>
  );
}
