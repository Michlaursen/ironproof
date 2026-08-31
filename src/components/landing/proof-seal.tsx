/*
 * ProofSeal — the signature motif. A circular chrome seal: a slowly rotating
 * ring of the actual primitives (Ed25519 + ML-DSA-65, FIPS 204) around a
 * shield-check. Makes the page *feel* like verification, not just say it.
 */

type ProofSealProps = {
  size?: number;
  className?: string;
};

export function ProofSeal({ size = 140, className }: ProofSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Ironproof seal — Ed25519 and ML-DSA-65, FIPS 204"
    >
      <defs>
        <path id="sealRing" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0" fill="none" />
      </defs>

      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(220,225,255,0.12)" strokeWidth="1" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(220,225,255,0.30)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(220,225,255,0.16)" strokeWidth="1" />

      <g className="seal-spin" style={{ transformOrigin: "100px 100px" }}>
        <text
          className="font-mono"
          style={{ fontSize: "10.5px", letterSpacing: "3.5px", fill: "#d8dbe4" }}
        >
          <textPath href="#sealRing" startOffset="0">
            SEALED · ED25519 · ML-DSA-65 · FIPS 204 ·&nbsp;
          </textPath>
        </text>
      </g>

      <g
        transform="translate(100,100)"
        stroke="#e8ebf5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ filter: "drop-shadow(0 0 6px rgba(200,210,255,0.4))" }}
      >
        <path d="M0,-30 L24,-20 V4 C24,22 13,32 0,37 C-13,32 -24,22 -24,4 V-20 Z" />
        <path d="M-11,3 l7,7 l15,-16" />
      </g>
    </svg>
  );
}
