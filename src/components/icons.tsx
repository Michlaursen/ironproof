type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconBolt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function IconEyeOff({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c5 0 9 4 10 7a12.4 12.4 0 0 1-3.2 4.2M6.6 6.6C4.4 8.1 2.8 10.3 2 12c1 3 5 7 10 7 1.4 0 2.7-.3 3.9-.8" />
      <path d="M9.9 10a3 3 0 0 0 4.1 4.1" />
    </svg>
  );
}

export function IconGap({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6h6M14 6h6M4 18h6M14 18h6" />
      <path d="M9 3v6M15 15v6" />
    </svg>
  );
}

export function IconRule({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconVerify({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function IconEvidence({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2l7 3.2v5.4c0 5-3 8.6-7 11.4-4-2.8-7-6.4-7-11.4V5.2L12 2Z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  );
}

export function IconSeal({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 8.7 2.2 2.2L15 7.5" />
      <path d="M9 14.5 7.5 22l4.5-2.2L16.5 22 15 14.5" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconCircuit({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 6h6a2 2 0 0 1 2 2v0M6 8v8a2 2 0 0 0 2 2h8" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
