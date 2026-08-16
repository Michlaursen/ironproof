/*
 * IronProof chrome monogram — ported from the reference landing.
 * The gradient/filter <defs> and the <g id="ipLogo"> group are emitted ONCE
 * via <IronProofLogoDefs /> (mounted in the root layout). Every logo instance
 * is a lightweight <use href="#ipLogo" />, so the heavy paths and the shared
 * IDs exist a single time in the document.
 */

type IronProofLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  title?: string;
};

/** Hidden SVG holding the shared gradients, glow filter and the logo group. */
export function IronProofLogoDefs() {
  return (
    <svg
      width={0}
      height={0}
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chromeA" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#e8e8ee" />
          <stop offset="0.5" stopColor="#9c9ca4" />
          <stop offset="0.72" stopColor="#e2e2e8" />
          <stop offset="1" stopColor="#6e6e76" />
        </linearGradient>
        <linearGradient id="chromeDark" x1="0" y1="0" x2="1" y2="0.7">
          <stop offset="0" stopColor="#8a8a92" />
          <stop offset="0.5" stopColor="#3c3c40" />
          <stop offset="1" stopColor="#181819" />
        </linearGradient>
        <linearGradient id="chromeHi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#f2f2f6" />
          <stop offset="1" stopColor="#b8b8c0" />
        </linearGradient>
        <linearGradient id="pChrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#d4d4dc" />
          <stop offset="0.7" stopColor="#8e8e96" />
          <stop offset="1" stopColor="#f0f0f4" />
        </linearGradient>
        <linearGradient id="pChromeDark" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a0a0a8" />
          <stop offset="0.5" stopColor="#48484c" />
          <stop offset="1" stopColor="#202022" />
        </linearGradient>
        <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c8d0ff" floodOpacity="0.25" />
        </filter>
        <g id="ipLogo" filter="url(#logoGlow)">
          <path d="M138 40 L150 62 L150 340 L128 372 L118 300 L120 120 Z" fill="url(#chromeA)" />
          <path d="M120 120 L118 300 L128 372 L138 340 L138 40 Z" fill="url(#chromeDark)" opacity="0.92" />
          <path d="M140 60 L145 60 L143 330 L140 330 Z" fill="#ffffff" opacity="0.65" />
          <path d="M120 130 L74 150 L120 185 Z" fill="url(#chromeA)" />
          <path d="M74 150 L120 185 L120 130 Z" fill="url(#chromeDark)" />
          <path d="M151 55 L157 55 L157 355 L154 372 L151 355 Z" fill="#060608" />
          <path d="M158 40 L170 62 L170 120 L178 300 L162 366 L158 340 Z" fill="url(#chromeHi)" />
          <path d="M158 40 L158 340 L162 366 L178 300 L170 120 L170 62 Z" fill="url(#chromeA)" opacity="0.6" />
          <path d="M160 62 L166 62 L172 300 L165 300 Z" fill="#ffffff" opacity="0.55" />
          <path
            fillRule="evenodd"
            fill="url(#pChrome)"
            d="M170 118 L240 152 L240 232 L184 272 L170 254 Z M186 158 L218 173 L218 214 L192 232 L180 224 L180 166 Z"
          />
          <path fill="url(#pChromeDark)" d="M240 152 L240 232 L226 238 L228 178 Z" opacity="0.85" />
          <path fill="url(#chromeHi)" d="M170 118 L240 152 L230 158 L176 136 L170 130 Z" opacity="0.9" />
        </g>
      </defs>
    </svg>
  );
}

/** A single rendered logo mark. Requires <IronProofLogoDefs /> in the tree. */
export function IronProofLogo({
  width = 26,
  height = 35,
  className,
  title = "IronProof",
}: IronProofLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 400"
      className={className}
      role="img"
      aria-label={title}
    >
      <use href="#ipLogo" />
    </svg>
  );
}
