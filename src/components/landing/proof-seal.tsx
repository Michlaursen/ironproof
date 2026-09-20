import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * ProofSeal — the signature motif. A circular seal: a slowly rotating ring of
 * the actual primitives (Ed25519 + ML-DSA-65, FIPS 204) around a shield-check.
 * Makes the page *feel* like verification, not just say it.
 *
 * Struck in gold since 2026-09-20. It was chrome, which put the brand's one
 * warm metal everywhere EXCEPT the object the brand is named for. The ring of
 * primitives and the shield are gold; one inner circle stays chrome, so the
 * iron the seal is set into is still visible behind it — the whole identity is
 * iron and gold, and a seal with no iron under it is just an ornament.
 */

type ProofSealProps = {
  size?: number;
  className?: string;
  locale?: Locale;
};

const LABEL: L<string> = {
  en: "Ironproof seal \u2014 Ed25519 and ML-DSA-65, FIPS 204",
  fr: "Sceau Ironproof \u2014 Ed25519 et ML-DSA-65, FIPS 204",
};

export function ProofSeal({ size = 140, className, locale = defaultLocale }: ProofSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={pick(LABEL, locale)}
    >
      <defs>
        <path id="sealRing" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0" fill="none" />
      </defs>

      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(201,162,75,0.30)" strokeWidth="1" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(201,162,75,0.62)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(220,225,255,0.16)" strokeWidth="1" />

      <g className="seal-spin" style={{ transformOrigin: "100px 100px" }}>
        <text
          className="font-mono"
          style={{
            fontSize: "10.5px",
            letterSpacing: "3.5px",
            fill: "#e6c987",
            filter: "drop-shadow(0 0 6px rgba(201,162,75,0.45))",
          }}
        >
          <textPath href="#sealRing" startOffset="0">
            SEALED · ED25519 · ML-DSA-65 · FIPS 204 ·&nbsp;
          </textPath>
        </text>
      </g>

      <g
        transform="translate(100,100)"
        stroke="#eccb85"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ filter: "drop-shadow(0 0 8px rgba(201,162,75,0.55))" }}
      >
        <path d="M0,-30 L24,-20 V4 C24,22 13,32 0,37 C-13,32 -24,22 -24,4 V-20 Z" />
        <path d="M-11,3 l7,7 l15,-16" />
      </g>
    </svg>
  );
}
