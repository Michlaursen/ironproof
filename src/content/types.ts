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
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    taglinePre: string;
    taglineQuote1: string;
    taglineMid: string;
    taglineQuote2: string;
    proofCard: {
      label: string;
      status: string;
      rows: { label: string; value: string }[];
      footnote: string;
    };
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
    items: {
      name: string;
      tag: string;
      description: string;
      items: string[];
    }[];
  };
  sovereignty: {
    eyebrow: string;
    title: string;
    description: string;
    tagline: string;
    features: { title: string; body: string }[];
  };
  useCases: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  customers: {
    eyebrow: string;
    title: string;
    segments: string[];
  };
  proofPoints: {
    eyebrow: string;
    title: string;
    items: { stat: string; label: string }[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    subhead: string;
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
