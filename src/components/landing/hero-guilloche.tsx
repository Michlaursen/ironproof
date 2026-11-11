/*
 * Guilloche behind the hero title (Dom, 2026-11-11: a security feel, drawn
 * rather than photographed; then « enhance the density and quality, metallic
 * grey and gold, more premium »). Guilloche is the engraving on banknotes and
 * passports: many fine curves, each shifted a little, that are hard to copy
 * by hand. Same promise as the seal under every result.
 *
 * One closed curve per ring; the copies are that path rotated, because
 * rotating r = R + a·sin(kθ) by δ equals shifting its phase. A handful of
 * paths and <use> copies keep the page light (no image, no script, no canvas).
 * The metal is a stroke gradient: dark, bright, dark, like light running
 * across brushed steel or gold leaf.
 *
 * FRERES-EXAMINES: hero-photo.tsx (photograph, what Dom asked to move away
 * from), hero-rings-video.tsx (three.js rings, a script), proof-seal.tsx (the
 * seal drawn in SVG). None draws a guilloche; this file is the only one.
 */

type Metal = "steel" | "gold";

type Ring = {
  id: string;
  radius: number;
  amplitude: number;
  /** Integer, so the curve closes on itself. */
  lobes: number;
  /** Second harmonic: how woven the band looks (0 = plain wave). */
  weave: number;
  copies: number;
  metal: Metal;
  opacity: number;
  width: number;
};

// Outer to inner. The steel rings frame; the gold ring sits closest to the words.
const STEEL_RINGS: readonly Ring[] = [
  {
    id: "g-s1",
    radius: 652,
    amplitude: 30,
    lobes: 36,
    weave: 0.3,
    copies: 30,
    metal: "steel",
    opacity: 0.55,
    width: 0.45,
  },
  {
    id: "g-s2",
    radius: 556,
    amplitude: 40,
    lobes: 28,
    weave: 0.45,
    copies: 32,
    metal: "steel",
    opacity: 0.6,
    width: 0.45,
  },
  {
    id: "g-s3",
    radius: 446,
    amplitude: 30,
    lobes: 22,
    weave: 0.33,
    copies: 28,
    metal: "steel",
    opacity: 0.55,
    width: 0.4,
  },
];
const GOLD_RINGS: readonly Ring[] = [
  {
    id: "g-g1",
    radius: 336,
    amplitude: 28,
    lobes: 18,
    weave: 0.4,
    copies: 30,
    metal: "gold",
    opacity: 0.85,
    width: 0.45,
  },
  {
    id: "g-g2",
    radius: 266,
    amplitude: 14,
    lobes: 30,
    weave: 0.25,
    copies: 20,
    metal: "gold",
    opacity: 0.6,
    width: 0.35,
  },
];

/** Hairlines between the bands, like the rules of an engraved bezel. */
const STEEL_HAIRLINES = [702, 698, 604, 600, 502, 498, 392] as const;
const GOLD_HAIRLINES = [386, 382, 298, 294, 236] as const;

const STEPS = 900;
const HALF = 720;

/** Polar curve r(θ) = R + a·sin(kθ) + w·a·cos(3kθ). */
function ringPath(ring: Ring): string {
  const { radius, amplitude, lobes, weave } = ring;
  const points: string[] = [];
  for (let i = 0; i < STEPS; i += 1) {
    const t = (2 * Math.PI * i) / STEPS;
    const r =
      radius +
      amplitude * Math.sin(lobes * t) +
      weave * amplitude * Math.cos(3 * lobes * t);
    points.push(
      `${(r * Math.cos(t)).toFixed(1)} ${(r * Math.sin(t)).toFixed(1)}`,
    );
  }
  return `M${points.join("L")}Z`;
}

/** Tick marks on the outermost rule, one every 3 degrees, longer every 30. */
function bezelTicks(): string {
  const parts: string[] = [];
  for (let deg = 0; deg < 360; deg += 3) {
    const t = (deg * Math.PI) / 180;
    const outer = 712;
    const inner = deg % 30 === 0 ? 690 : 704;
    parts.push(
      `M${(outer * Math.cos(t)).toFixed(1)} ${(outer * Math.sin(t)).toFixed(1)}L${(inner * Math.cos(t)).toFixed(1)} ${(inner * Math.sin(t)).toFixed(1)}`,
    );
  }
  return parts.join("");
}

function RingCopies({ ring }: { ring: Ring }) {
  // Copies spread across one lobe, so the curves cross into a mesh.
  const step = 360 / (ring.lobes * ring.copies);
  return (
    <g
      fill="none"
      stroke={`url(#g-${ring.metal})`}
      strokeWidth={ring.width}
      opacity={ring.opacity}
    >
      <path id={ring.id} d={ringPath(ring)} />
      {Array.from({ length: ring.copies - 1 }, (_, i) => (
        <use
          key={i}
          href={`#${ring.id}`}
          transform={`rotate(${((i + 1) * step).toFixed(3)})`}
        />
      ))}
    </g>
  );
}

function Hairlines({
  radii,
  metal,
  opacity,
}: {
  radii: readonly number[];
  metal: Metal;
  opacity: number;
}) {
  return (
    <g
      fill="none"
      stroke={`url(#g-${metal})`}
      strokeWidth={0.6}
      opacity={opacity}
    >
      {radii.map((r) => (
        <circle key={r} r={r} />
      ))}
    </g>
  );
}

/**
 * Metal as light across a surface, in small steps: a stop close to the paper
 * erased whole stretches of lines along a straight edge (seen 2026-11-11), so
 * the brightest stop stays well darker than the paper. One id per metal.
 */
function MetalGradient({ metal }: { metal: Metal }) {
  if (metal === "steel") {
    return (
      <defs>
        <linearGradient
          id="g-steel"
          gradientUnits="userSpaceOnUse"
          x1={-HALF}
          y1={-HALF}
          x2={HALF}
          y2={HALF}
        >
          <stop offset="0.00" stopColor="#50545b" />
          <stop offset="0.11" stopColor="#7c828a" />
          <stop offset="0.22" stopColor="#9fa5ad" />
          <stop offset="0.33" stopColor="#b3b8bf" />
          <stop offset="0.44" stopColor="#9ba1a9" />
          <stop offset="0.56" stopColor="#7a8088" />
          <stop offset="0.67" stopColor="#8f959d" />
          <stop offset="0.78" stopColor="#a9aeb5" />
          <stop offset="0.89" stopColor="#848a92" />
          <stop offset="1.00" stopColor="#50545b" />
        </linearGradient>
      </defs>
    );
  }
  return (
    <defs>
      <linearGradient
        id="g-gold"
        gradientUnits="userSpaceOnUse"
        x1={-HALF}
        y1={HALF}
        x2={HALF}
        y2={-HALF}
      >
        <stop offset="0.00" stopColor="#7a5a1e" />
        <stop offset="0.11" stopColor="#9a7630" />
        <stop offset="0.22" stopColor="#b8913f" />
        <stop offset="0.33" stopColor="#cba65a" />
        <stop offset="0.44" stopColor="#b8913f" />
        <stop offset="0.56" stopColor="#94712c" />
        <stop offset="0.67" stopColor="#a8843a" />
        <stop offset="0.78" stopColor="#c4a052" />
        <stop offset="0.89" stopColor="#a07c34" />
        <stop offset="1.00" stopColor="#7a5a1e" />
      </linearGradient>
    </defs>
  );
}

export function HeroGuilloche() {
  const box = `${-HALF} ${-HALF} ${2 * HALF} ${2 * HALF}`;
  return (
    <div className="hero-guilloche" aria-hidden="true">
      <svg viewBox={box} className="hero-guilloche-layer">
        <MetalGradient metal="steel" />
        <path
          d={bezelTicks()}
          fill="none"
          stroke="url(#g-steel)"
          strokeWidth={0.6}
          opacity={0.55}
        />
        <Hairlines radii={STEEL_HAIRLINES} metal="steel" opacity={0.6} />
        {STEEL_RINGS.map((ring) => (
          <RingCopies key={ring.id} ring={ring} />
        ))}
      </svg>
      {/* The gold turns very slowly on its own layer; still for reduced motion. */}
      <svg viewBox={box} className="hero-guilloche-layer hero-guilloche-turn">
        <MetalGradient metal="gold" />
        <Hairlines radii={GOLD_HAIRLINES} metal="gold" opacity={0.75} />
        {GOLD_RINGS.map((ring) => (
          <RingCopies key={ring.id} ring={ring} />
        ))}
      </svg>
    </div>
  );
}
