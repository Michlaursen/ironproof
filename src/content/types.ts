export type SiteContent = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  header: {
    nav: { href: string; label: string }[];
    cta: string;
    langSwitchLabel: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    body: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    /* Split into items only so the line wraps cleanly on narrow columns —
       rendered inline with · separators, the visible text is one line. */
    trustLine: string[];
    proofCard: {
      label: string;
      status: string;
      /* accent marks the two rows a reader should land on first: the decision
         itself and the solver verdict behind it. */
      rows: { label: string; value: string; accent?: boolean }[];
      footnote: string;
    };
  };
  attributions: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      org: string;
      where: string;
      quote: string;
      context: string;
      href: string;
      linkLabel: string;
    }[];
    cveLabel: string;
    cveNote: string;
    cves: {
      id: string;
      href?: string;
      product: string;
      kind: string;
      severity: string;
      body: string;
      status: string;
    }[];
    footnote: string;
  };
  lab: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    previewLabel: string;
    previewTitle: string;
    previewStatus: string;
    obligationLabel: string;
    obligation: string;
    verdictLabel: string;
    verdict: string;
    evidenceLabel: string;
    evidence: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    description: string;
    points: { title: string; body: string }[];
  };
  solution: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { step: string; title: string; body: string }[];
    diagram: {
      rulesTitle: string;
      rulesSubtitle: string;
      verificationTitle: string;
      verificationSubtitle: string;
      counterexampleLabel: string;
      counterexampleValue: string;
      proofArtifactLabel: string;
      proofArtifactValue: string;
    };
    quoteIntro1: string;
    quote1: string;
    quoteIntro2: string;
    quote2: string;
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      name: string;
      tag: string;
      description: string;
      items: string[];
    }[];
  };
  artifact: {
    eyebrow: string;
    title: string;
    description: string;
    stats: { stat: string; label: string; note: string }[];
    fileLabel: string;
    fileMeta: string;
    parts: {
      num: string;
      field: string;
      anchor: string;
      claim: string;
      body: string;
      statusQuo: string;
      code: { key: string; value: string; tone?: "ok" | "warn" | "muted" }[];
    }[];
    tableTitle: string;
    tableColumns: { row: string; us: string; them: string };
    tableRows: { row: string; us: string; them: string }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    description: string;
    columns: {
      vendor: string;
      strength: string;
      location: string;
      survives: string;
    };
    rows: {
      vendor: string;
      strength: string;
      location: string;
      survives: string;
      isUs?: boolean;
    }[];
    footnote: string;
  };
  sovereignty: {
    eyebrow: string;
    title: string;
    description: string;
    tagline: string;
    features: { title: string; body: string }[];
  };
  corpus: {
    eyebrow: string;
    title: string;
    description: string;
    record: { stat: string; label: string; note: string }[];
    papers: {
      eyebrow: string;
      note: string;
      items: { id: string; title: string; href: string }[];
    };
  };
  sector: {
    eyebrow: string;
    title: string;
    description: string;
    quote: string;
    quoteSource: string;
    quoteHref: string;
    afterQuote: string;
    alsoLabel: string;
    also: string[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    subhead: string;
    offerLabel: string;
    offerName: string;
    offerBody: string;
    designPartnerPre: string;
    designPartnerEmail: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorPre: string;
      errorLinkLabel: string;
      errorPost: string;
    };
  };
  footer: {
    description: string;
    tagline: string;
    country: string;
    copyright: string;
  };
};
