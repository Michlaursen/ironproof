/*
 * Bilingual copy for the ported landing (static sections only — the interactive
 * demos stay English for phase 1). English is the reference; the French is
 * Quebec French and MUST be reviewed by a native reader before going live
 * (rule #78 "professeur": zero faults, full accents — not yet validator-checked).
 */

export type Locale = "en" | "fr";

type LandingCopy = {
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    lead: string; // contains {math} placeholder for the emphasized word
    leadMath: string;
    sub: string;
    tryProof: string;
    explore: string;
    artifactLabel: string;
    verdict: string;
    verdictDetail: string;
    sealed: string;
  };
  creditedBy: string;
  platform: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    cards: { n: string; title: string; body: string }[];
    gradeBody: string;
    sectors: string[];
    sectorLast: string;
  };
  cta: {
    h2: string;
    sub: string;
  };
  footer: string;
};

export const LANDING_COPY: Record<Locale, LandingCopy> = {
  en: {
    hero: {
      eyebrow: "PROVABLE SECURITY INFRASTRUCTURE",
      h1a: "Prove what's allowed.",
      h1b: "Block everything else.",
      lead: "IronProof verifies every critical action {math} — and blocks anything unproven before it ever runs.",
      leadMath: "mathematically",
      sub: "Automated formal verification for critical software — starting where a wrong action moves money: AI agents issuing refunds, payments and disbursements in Canadian financial services.",
      tryProof: "TRY A PROOF",
      explore: "EXPLORE PLATFORM",
      artifactLabel: "PROOF ARTIFACT",
      verdict: "ALLOWED",
      verdictDetail: "$640 refund — no reachable policy violation",
      sealed: "SEALED",
    },
    creditedBy: "PUBLICLY CREDITED BY",
    platform: {
      eyebrow: "THE PLATFORM",
      h2a: "Mathematically Proven.",
      h2b: "Not Merely Tested.",
      cards: [
        {
          n: "01",
          title: "Rules Into Math",
          body: "Turn critical policies, specifications and contracts into formal constraints — then prove whether the modeled system can violate them.",
        },
        {
          n: "02",
          title: "Exhaustive, Not Sampled",
          body: "Testing checks a handful of cases. IronProof reasons exhaustively over the formally defined state space.",
        },
        {
          n: "03",
          title: "Infrastructure Grade",
          body: "Built for critical systems where failure is not an option.",
        },
      ],
      gradeBody: "Built for critical systems where failure is not an option.",
      sectors: ["AEROSPACE", "DEFENSE", "RAIL", "FINANCE"],
      sectorLast: "HEALTHCARE",
    },
    cta: {
      h2: "Prove your infrastructure.",
      sub: "Request access to IronProof and turn policy into enforceable, independently verifiable guarantees.",
    },
    footer: "Automated formal verification for critical software and infrastructure.",
  },
  fr: {
    hero: {
      eyebrow: "INFRASTRUCTURE DE SÉCURITÉ PROUVABLE",
      h1a: "Prouvez ce qui est permis.",
      h1b: "Bloquez tout le reste.",
      lead: "IronProof vérifie chaque action critique {math} — et bloque tout ce qui n'est pas prouvé avant même son exécution.",
      leadMath: "mathématiquement",
      sub: "Vérification formelle automatisée pour les logiciels critiques — à commencer là où une action erronée déplace de l'argent : des agents IA qui émettent remboursements, paiements et versements dans les services financiers canadiens.",
      tryProof: "ESSAYER UNE PREUVE",
      explore: "EXPLORER LA PLATEFORME",
      artifactLabel: "ARTEFACT DE PREUVE",
      verdict: "AUTORISÉ",
      verdictDetail: "Remboursement de 640 $ — aucune violation de politique atteignable",
      sealed: "SCELLÉ",
    },
    creditedBy: "CRÉDITÉ PUBLIQUEMENT PAR",
    platform: {
      eyebrow: "LA PLATEFORME",
      h2a: "Prouvé mathématiquement.",
      h2b: "Pas seulement testé.",
      cards: [
        {
          n: "01",
          title: "Les règles en mathématiques",
          body: "Transformez politiques, spécifications et contrats critiques en contraintes formelles — puis prouvez si le système modélisé peut les violer.",
        },
        {
          n: "02",
          title: "Exhaustif, pas échantillonné",
          body: "Les tests vérifient une poignée de cas. IronProof raisonne exhaustivement sur l'espace d'états défini formellement.",
        },
        {
          n: "03",
          title: "Qualité infrastructure",
          body: "Conçu pour les systèmes critiques où l'échec n'est pas une option.",
        },
      ],
      gradeBody: "Conçu pour les systèmes critiques où l'échec n'est pas une option.",
      sectors: ["AÉROSPATIALE", "DÉFENSE", "FERROVIAIRE", "FINANCE"],
      sectorLast: "SANTÉ",
    },
    cta: {
      h2: "Prouvez votre infrastructure.",
      sub: "Demandez l'accès à IronProof et transformez vos politiques en garanties applicables et vérifiables de façon indépendante.",
    },
    footer: "Vérification formelle automatisée pour les logiciels et infrastructures critiques.",
  },
};
