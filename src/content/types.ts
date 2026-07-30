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
    title: string;
    subtitle: string;
    items: { org: string; body: string; cta: string; href: string }[];
    summary: string;
    linkLabel: string;
    linkHref: string;
  };
  lab: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    previewLabel: string;
    policyLabel: string;
    policy: string[];
    transactionLabel: string;
    transaction: string[];
    safeLabel: string;
    safeVerdict: string;
    safeBody: string;
    failLabel: string;
    failVerdict: string;
    failBody: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    body: string[];
    layers: { name: string; role: string }[];
    /* Same shape as a layer on purpose — it reads as the fifth item in the
       row, which is the argument the section is making. */
    conclusion: { name: string; role: string };
  };
  solution: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { step: string; title: string; body: string }[];
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    capabilities: { title: string; body: string }[];
    finalLine: string;
  };
  artifact: {
    eyebrow: string;
    title: string;
    blocks: { num: string; title: string; body: string }[];
    finalLine: string;
  };
  comparison: {
    eyebrow: string;
    title: string;
    /* For the four existing controls, `secondary` is what they do NOT
       establish. On the IronProof row it is what the artifact additionally
       preserves — same slot, opposite polarity, which is the point. */
    rows: {
      name: string;
      primary: string;
      secondary: string;
      isUs?: boolean;
    }[];
  };
  sovereignty: {
    eyebrow: string;
    title: string;
    description: string;
    features: { title: string; body: string }[];
  };
  corpus: {
    eyebrow: string;
    title: string;
    description: string;
    points: { title: string; body: string }[];
    papers: {
      eyebrow: string;
      items: { id: string; title: string; href: string }[];
    };
  };
  sector: {
    eyebrow: string;
    title: string;
    description: string;
    buyersLabel: string;
    buyers: string;
    engagementLabel: string;
    engagement: string;
    quote: string;
    quoteSource: string;
    quoteHref: string;
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
