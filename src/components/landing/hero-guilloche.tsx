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
 * Fourth pass, « or vivant » (Dom, 2026-11-11: « y manque un peu de punch »,
 * then « ouais go » on option 5): same three rings, darker steel and richer
 * gold, lines a quarter thicker, stronger light and shadow, a soft gold halo
 * under the gold ring, and warm light on the paper behind the title
 * (globals.css, .hero-centre::before). Nothing added to the drawing itself.
 *
 * Fifth pass (Dom, 2026-11-11 ~23 h: « les couleurs sont un peu fuckall »): the gold
 * of the drawing is brought back to the site's own gold (#a8843a, text gold #7a5c22)
 * instead of a bright yellow beside it, the halo is quieter, and the steel moves from
 * a cold blue grey to the site's iron and graphite (#24262a, #5b5f66). Same rings.
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
    width: 1,
  },
  {
    id: "g-mid",
    radius: 430,
    amplitude: 34,
    lobes: 16,
    copies: 20,
    metal: "steel",
    width: 0.94,
  },
  {
    id: "g-inner",
    radius: 270,
    amplitude: 26,
    lobes: 12,
    copies: 18,
    metal: "gold",
    width: 0.94,
  },
];

const STEPS = 720;
/** Radius of the gold ring, where its halo sits. */
const GOLD_HALO_RADIUS = 270;
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
        <stop offset="0" stopColor="#24262a" />
        <stop offset="0.25" stopColor="#4b4e54" />
        <stop offset="0.45" stopColor="#85878b" />
        <stop offset="0.6" stopColor="#3a3c40" />
        <stop offset="0.8" stopColor="#5b5f66" />
        <stop offset="1" stopColor="#24262a" />
      </linearGradient>
      <linearGradient
        id="g-gold"
        gradientUnits="userSpaceOnUse"
        x1={-HALF}
        y1={-HALF}
        x2={HALF}
        y2={HALF}
      >
        <stop offset="0" stopColor="#4a3510" />
        <stop offset="0.25" stopColor="#7a5c22" />
        <stop offset="0.45" stopColor="#a8843a" />
        <stop offset="0.6" stopColor="#6b4f1c" />
        <stop offset="0.8" stopColor="#957433" />
        <stop offset="1" stopColor="#4a3510" />
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
          surfaceScale="9"
          specularConstant="1.5"
          specularExponent="22"
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
          k3="1.15"
          k4="0"
          result="lit"
        />
        <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="soft" />
        <feOffset in="soft" dx="0" dy="12" result="drop" />
        <feFlood floodColor="#24262a" floodOpacity="0.32" />
        <feComposite in2="drop" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="lit" />
        </feMerge>
      </filter>
      {/* The gold halo: a wide gold band, blurred, under the gold ring. */}
      <filter id="g-bloom" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="14" />
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
        <circle
          r={GOLD_HALO_RADIUS}
          fill="none"
          stroke="#a8843a"
          strokeWidth="60"
          opacity="0.16"
          filter="url(#g-bloom)"
        />
        {RINGS.map((ring) => (
          <RingCopies key={ring.id} ring={ring} />
        ))}
      </svg>
    </div>
  );
}
