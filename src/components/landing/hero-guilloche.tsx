/*
 * Guilloche behind the hero title (Dom, 2026-11-11: a security feel, drawn
 * rather than photographed). Guilloche is the engraving on banknotes and
 * passports: many fine curves, each shifted a little, that are hard to copy
 * by hand. Same promise as the seal under every result.
 *
 * Third pass (Dom, same evening): back to the three rings of the first one,
 * without the hairlines and the tick bezel; keep the steel and gold; make it
 * less flat. Each ring is lit like struck metal: the band is blurred into a
 * height map, a light from the top left puts a highlight on it, and a soft
 * shadow lifts it off the paper.
 *
 * One closed curve per ring; the copies are that path rotated, because
 * rotating r = R + a·sin(kθ) by δ equals shifting its phase.
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
  copies: number;
  metal: Metal;
  width: number;
};

// The three rings of the first version, outer to inner.
const RINGS: readonly Ring[] = [
  {
    id: "g-outer",
    radius: 600,
    amplitude: 44,
    lobes: 22,
    copies: 22,
    metal: "steel",
    width: 0.8,
  },
  {
    id: "g-mid",
    radius: 430,
    amplitude: 34,
    lobes: 16,
    copies: 20,
    metal: "steel",
    width: 0.75,
  },
  {
    id: "g-inner",
    radius: 270,
    amplitude: 26,
    lobes: 12,
    copies: 18,
    metal: "gold",
    width: 0.75,
  },
];

const STEPS = 720;
const HALF = 700;

/** Polar curve r(θ) = R + a·sin(kθ) + (a/3)·cos(3kθ): the second harmonic gives the woven look. */
function ringPath(ring: Ring): string {
  const { radius, amplitude, lobes } = ring;
  const points: string[] = [];
  for (let i = 0; i < STEPS; i += 1) {
    const t = (2 * Math.PI * i) / STEPS;
    const r =
      radius +
      amplitude * Math.sin(lobes * t) +
      (amplitude / 3) * Math.cos(3 * lobes * t);
    points.push(
      `${(r * Math.cos(t)).toFixed(1)} ${(r * Math.sin(t)).toFixed(1)}`,
    );
  }
  return `M${points.join("L")}Z`;
}

function RingCopies({ ring }: { ring: Ring }) {
  // Copies spread across one lobe, so the curves cross into a mesh.
  const step = 360 / (ring.lobes * ring.copies);
  return (
    <g
      fill="none"
      stroke={`url(#g-${ring.metal})`}
      strokeWidth={ring.width}
      filter="url(#g-relief)"
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

/**
 * Metal as light across a surface, in small steps: a stop close to the paper
 * erases stretches of lines along a straight edge (seen 2026-11-11), so the
 * brightest stop stays well darker than the paper.
 */
function Defs() {
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
        <stop offset="0" stopColor="#3f434a" />
        <stop offset="0.25" stopColor="#6f757e" />
        <stop offset="0.45" stopColor="#9aa0a8" />
        <stop offset="0.6" stopColor="#5f656e" />
        <stop offset="0.8" stopColor="#8a9098" />
        <stop offset="1" stopColor="#3f434a" />
      </linearGradient>
      <linearGradient
        id="g-gold"
        gradientUnits="userSpaceOnUse"
        x1={-HALF}
        y1={-HALF}
        x2={HALF}
        y2={HALF}
      >
        <stop offset="0" stopColor="#6a4c16" />
        <stop offset="0.25" stopColor="#9c772c" />
        <stop offset="0.45" stopColor="#c9a24f" />
        <stop offset="0.6" stopColor="#8a6624" />
        <stop offset="0.8" stopColor="#b58e3e" />
        <stop offset="1" stopColor="#6a4c16" />
      </linearGradient>
      {/* Struck metal: the band's own shape, blurred, is the height; a light from
       * the top left lights it; a soft shadow below lifts it off the paper. */}
      <filter
        id="g-relief"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="height" />
        <feSpecularLighting
          in="height"
          surfaceScale="5"
          specularConstant="1.1"
          specularExponent="18"
          lightingColor="#ffffff"
          result="shine"
        >
          <feDistantLight azimuth="225" elevation="42" />
        </feSpecularLighting>
        <feComposite
          in="shine"
          in2="SourceAlpha"
          operator="in"
          result="shineOnLines"
        />
        <feComposite
          in="SourceGraphic"
          in2="shineOnLines"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.85"
          k4="0"
          result="lit"
        />
        <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="soft" />
        <feOffset in="soft" dx="0" dy="9" result="drop" />
        <feFlood floodColor="#24262a" floodOpacity="0.22" />
        <feComposite in2="drop" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="lit" />
        </feMerge>
      </filter>
    </defs>
  );
}

export function HeroGuilloche() {
  return (
    <div className="hero-guilloche" aria-hidden="true">
      <svg
        viewBox={`${-HALF} ${-HALF} ${2 * HALF} ${2 * HALF}`}
        className="hero-guilloche-layer"
      >
        <Defs />
        {RINGS.map((ring) => (
          <RingCopies key={ring.id} ring={ring} />
        ))}
      </svg>
    </div>
  );
}
