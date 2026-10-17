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

function Node({ x, y, w, label, gold }: { x: number; y: number; w: number; label: FlowLabel; gold?: boolean }) {
  return (
    <g className={gold ? "text-seal" : "text-neutral-500"}>
      <rect x={x} y={y} width={w} height={H} rx={3} fill="var(--surface, transparent)" stroke="currentColor" strokeWidth={gold ? 1.5 : 1} />
      <text x={x + 16} y={y + 27} fill="currentColor" fontSize={15} letterSpacing={2.2} fontFamily="var(--font-mono, monospace)">
        {label[0]}
      </text>
      <text x={x + 16} y={y + 48} fill="currentColor" fontSize={14} opacity={0.9}>
        {label[1]}
      </text>
    </g>
  );
}

export function FlowDiagram({ f }: { f: FlowCopy }) {
  if (f.lead.length === 0) return null;

  const leadX = f.lead.map((_, i) => 10 + i * (LEAD_W + GAP));
  const leadEnd = leadX[leadX.length - 1] + LEAD_W;
  const branch = leadEnd + 20;
  const checkX = branch + 20;
  const join = checkX + CHECK_W + 20;
  const verdictX = join + GAP;
  const sealX = verdictX + VERDICT_W + GAP;
  const end = sealX + SEAL_W;
  const width = end + 10;
  const topMid = TOP_Y + H / 2;
  const bottomMid = BOTTOM_Y + H / 2;

  const links = leadX.slice(1).map((x) => `M${x - GAP} ${MID} H${x}`).join(" ");

  return (
    <figure className="fade-up mt-14">
      <div className="card-premium overflow-x-auto p-6 md:p-8">
        <svg viewBox={`0 0 ${width} 268`} className="w-full min-w-[900px]" role="img" aria-label={f.caption}>
          <style>{`@media (prefers-reduced-motion: reduce){.flow-pulse{display:none}}`}</style>
          <g className="text-neutral-400" stroke="currentColor" fill="none" strokeWidth={1}>
            <path d={links} />
            <path d={`M${leadEnd} ${MID} H${branch} V${topMid} H${checkX} M${branch} ${MID} V${bottomMid} H${checkX}`} />
            <path d={`M${checkX + CHECK_W} ${topMid} H${join} V${bottomMid} H${checkX + CHECK_W} M${join} ${MID} H${verdictX}`} />
            <path d={`M${verdictX + VERDICT_W} ${MID} H${sealX}`} />
          </g>
          {f.lead.map((l, i) => (
            <Node key={l[0]} x={leadX[i]} y={MID - H / 2} w={LEAD_W} label={l} />
          ))}
          <Node x={checkX} y={TOP_Y} w={CHECK_W} label={f.top} />
          <Node x={checkX} y={BOTTOM_Y} w={CHECK_W} label={f.bottom} />
          <Node x={verdictX} y={MID - H / 2} w={VERDICT_W} label={f.verdict} />
          <Node x={sealX} y={MID - H / 2} w={SEAL_W} label={f.seal} gold />
          <g className="flow-pulse text-seal">
            <circle r={4.5} fill="currentColor">
              <animateMotion dur="6s" repeatCount="indefinite" path={`M10 ${MID} H${branch} V${topMid} H${join} V${MID} H${end}`} />
            </circle>
            <circle r={4.5} fill="currentColor">
              <animateMotion dur="6s" repeatCount="indefinite" path={`M10 ${MID} H${branch} V${bottomMid} H${join} V${MID} H${end}`} />
            </circle>
          </g>
        </svg>
      </div>
      <figcaption className="track-mid edge-t mt-5 pt-4 text-xs leading-relaxed text-neutral-500">{f.caption}</figcaption>
    </figure>
  );
}
