/*
 * Guilloche behind the hero title (Dom, 2026-11-11: a security feel, drawn
 * rather than photographed). Guilloche is the engraving on banknotes and
 * passports: many fine curves, each shifted a little, that are hard to copy
 * by hand. Same promise as the seal under every result.
 *
 * One closed curve per ring; the copies are that path rotated, because
 * rotating r = R + a·sin(kθ) by δ equals shifting its phase. Three paths and
 * <use> copies keep the page light (no image, no script, no canvas).
 *
 * FRERES-EXAMINES: hero-photo.tsx (photograph, what Dom asked to move away
 * from), hero-rings-video.tsx (three.js rings, a script), proof-seal.tsx (the
 * seal drawn in SVG). None draws a guilloche; this file is the only one.
 */

type Ring = {
  id: string;
  radius: number;
  amplitude: number;
  lobes: number;
  copies: number;
  tone: "iron" | "gold";
  opacity: number;
  width: number;
};

// Outer to inner. Lobe counts are integers so each curve closes on itself.
const IRON_RINGS: readonly Ring[] = [
  { id: "g-outer", radius: 600, amplitude: 44, lobes: 22, copies: 18, tone: "iron", opacity: 0.09, width: 0.7 },
  { id: "g-mid", radius: 430, amplitude: 34, lobes: 16, copies: 16, tone: "iron", opacity: 0.13, width: 0.6 },
];
const GOLD_RING: Ring = { id: "g-inner", radius: 270, amplitude: 26, lobes: 12, copies: 14, tone: "gold", opacity: 0.5, width: 0.6 };

const STEPS = 720;
const HALF = 700;

/** Polar curve r(θ) = R + a·sin(kθ) + (a/3)·cos(3kθ): the second harmonic gives the woven look. */
function ringPath(ring: Ring): string {
  const { radius, amplitude, lobes } = ring;
  const points: string[] = [];
  for (let i = 0; i < STEPS; i += 1) {
    const t = (2 * Math.PI * i) / STEPS;
    const r = radius + amplitude * Math.sin(lobes * t) + (amplitude / 3) * Math.cos(3 * lobes * t);
    points.push(`${(r * Math.cos(t)).toFixed(1)} ${(r * Math.sin(t)).toFixed(1)}`);
  }
  return `M${points.join("L")}Z`;
}

function RingCopies({ ring }: { ring: Ring }) {
  // Copies spread across one lobe, so the curves cross into a mesh.
  const step = 360 / (ring.lobes * ring.copies);
  const stroke = ring.tone === "gold" ? "var(--gold)" : "var(--iron)";
  return (
    <g fill="none" stroke={stroke} strokeWidth={ring.width} opacity={ring.opacity} vectorEffect="non-scaling-stroke">
      <path id={ring.id} d={ringPath(ring)} />
      {Array.from({ length: ring.copies - 1 }, (_, i) => (
        <use key={i} href={`#${ring.id}`} transform={`rotate(${((i + 1) * step).toFixed(3)})`} />
      ))}
    </g>
  );
}

export function HeroGuilloche() {
  const box = `${-HALF} ${-HALF} ${2 * HALF} ${2 * HALF}`;
  return (
    <div className="hero-guilloche" aria-hidden="true">
      <svg viewBox={box} className="hero-guilloche-layer">
        {IRON_RINGS.map((ring) => (
          <RingCopies key={ring.id} ring={ring} />
        ))}
      </svg>
      {/* The gold ring turns very slowly on its own layer; still for reduced motion. */}
      <svg viewBox={box} className="hero-guilloche-layer hero-guilloche-turn">
        <RingCopies ring={GOLD_RING} />
      </svg>
    </div>
  );
}
