import type { SiteContent } from "./types";

export const fr: SiteContent = {
  meta: {
    title: "IronProof — Sécurité prouvable pour l’IA et les logiciels critiques",
    description:
      "IronProof est la couche de preuve pour les organisations à haut niveau de confiance qui déploient des agents IA, du code généré par l’IA et des logiciels modernisés. Nous vérifions ce que les systèmes sont autorisés à faire, prouvons si des violations sont possibles, et scellons le résultat sous forme de preuve portable.",
    ogDescription:
      "Du risque lié à l’IA à la preuve vérifiable par machine. IronProof vérifie le code critique et les actions de l’IA avant d’accorder la confiance.",
  },
  header: {
    nav: [
      { href: "#products", label: "Produit" },
      { href: "#use-cases", label: "Cas d’usage" },
      { href: "#sovereignty", label: "Souveraineté" },
      { href: "#proof-points", label: "Preuves" },
      { href: "https://ironproof-lab.vercel.app", label: "Laboratoire" },
    ],
    cta: "Demander une démo",
    langSwitchLabel: "EN",
  },
  hero: {
    eyebrow: "Infrastructure de sécurité vérifiable",
    headline: "Une sécurité prouvable pour l’IA et les logiciels critiques.",
    subhead:
      "IronProof est la couche de preuve pour les organisations à haut niveau de confiance qui déploient des agents IA, du code généré par l’IA et des logiciels modernisés. Nous vérifions ce que les systèmes sont autorisés à faire, prouvons si des violations sont possibles, et scellons le résultat sous forme de preuve portable.",
    ctaPrimary: "Demander une démo",
    ctaSecondary: "Voir comment ça fonctionne",
    taglinePre: "IronProof fait passer les organisations de « ",
    taglineQuote1: "probablement sécurisé »",
    taglineMid: " à « ",
    taglineQuote2: "prouvablement sécurisé. »",
    proofCard: {
      label: "Artefact de preuve",
      status: "VÉRIFIÉ",
      rows: [
        { label: "Portée", value: "espace d’entrée défini" },
        { label: "Ensemble de règles", value: "policy-v3.2" },
        { label: "Résultat", value: "aucune violation trouvée" },
        { label: "Scellement", value: "signature post-quantique" },
        { label: "Vérificateur", value: "hors ligne / clé publique" },
      ],
      footnote:
        "Vérifiable de façon indépendante, même hors ligne — sans avoir à faire confiance au système d’origine.",
    },
  },
  lab: {
    eyebrow: "Laboratoire de preuve",
    title: "Ne nous croyez pas sur parole. Inspectez la preuve.",
    description:
      "Entrez dans le laboratoire IronProof pour explorer de véritables obligations de preuve, mettre les politiques à l’épreuve, inspecter les contre-exemples et reproduire vous-même les résultats.",
    cta: "Entrer dans le laboratoire",
    previewLabel: "INSTRUMENT EN DIRECT",
    previewTitle: "Action d’un agent IA au seuil de preuve",
    previewStatus: "SÉCURITÉ PROUVÉE",
    obligationLabel: "Obligation de preuve",
    obligation:
      "Aucun état accessible ne peut débourser plus que le montant approuvé.",
    verdictLabel: "Verdict du solveur",
    verdict: "unsat",
    evidenceLabel: "Preuve",
    evidence: "scellée · reproductible · vérifiable indépendamment",
  },
  problem: {
    eyebrow: "Le problème",
    title: "L’IA agit plus vite que les organisations ne peuvent vérifier.",
    description:
      "Les agents IA touchent désormais des flux de travail impliquant des approbations, des remboursements, des permissions, des dossiers clients, des modifications de code et des décisions réglementées. Les audits traditionnels, les journaux et les documents de politique ne peuvent pas prouver si un système est en mesure d’enfreindre une règle avant d’agir.",
    points: [
      {
        title: "L’IA devient opérationnelle",
        body: "Les agents IA approuvent, remboursent, créditent, accordent des rabais, transfèrent des fonds, modifient des dossiers, changent des permissions, déclenchent des flux de travail et écrivent du code — bien au-delà de simplement répondre à des questions.",
      },
      {
        title: "Les journaux et les politiques ne suffisent pas",
        body: "La plupart des outils de gouvernance observent, journalisent, notent ou révisent après coup. Ils ne prouvent pas si un système peut enfreindre une règle avant d’agir.",
      },
      {
        title: "La modernisation creuse l’écart",
        body: "Les organisations intègrent du code généré par l’IA en production plus vite qu’elles ne peuvent le vérifier. Les logiciels évoluent plus vite que la confiance ne peut être validée.",
      },
    ],
  },
  solution: {
    eyebrow: "La solution",
    title: "IronProof transforme la confiance en preuve.",
    description:
      "Lorsqu’une vérification échoue, IronProof produit un contre-exemple illustrant le risque. Lorsqu’elle réussit, IronProof émet un artefact de preuve signé, vérifiable plus tard — de façon indépendante et hors ligne.",
    steps: [
      {
        step: "01",
        title: "Définir les règles",
        body: "Encoder les règles de sécurité, de conformité et de gouvernance qu’un système d’IA ou un logiciel ne doit jamais enfreindre.",
      },
      {
        step: "02",
        title: "Vérifier le comportement",
        body: "IronProof vérifie si le logiciel ou l’action de l’IA peut enfreindre ces règles — mathématiquement, sur l’espace d’entrée défini.",
      },
      {
        step: "03",
        title: "Recevoir la preuve",
        body: "Un contre-exemple lorsqu’une violation est possible. Un artefact de preuve signé, un certificat ou un reçu lorsqu’elle ne l’est pas.",
      },
    ],
    diagram: {
      rulesTitle: "Règles",
      rulesSubtitle: "Contraintes de sécurité, de conformité et de gouvernance",
      verificationTitle: "Vérification",
      verificationSubtitle: "Vérifiée sur l’espace d’entrée défini",
      counterexampleLabel: "Violation possible",
      counterexampleValue: "Contre-exemple",
      proofArtifactLabel: "Aucune violation trouvée",
      proofArtifactValue: "Artefact de preuve scellé",
    },
    quoteIntro1: "La plupart des outils de cybersécurité disent : ",
    quote1: "« Nous avons examiné le système et il semble sécuritaire. »",
    quoteIntro2: "IronProof dit : ",
    quote2:
      "« Voici les règles. Voici la preuve que le système ne peut pas les enfreindre dans cette portée. Et voici un reçu scellé que vous pouvez vérifier plus tard. »",
  },
  products: {
    eyebrow: "Produit",
    title: "Un seul moteur de preuve. Plusieurs cas d’usage à haut niveau de confiance.",
    items: [
      {
        name: "IronProof Cobalt",
        tag: "Modernisation logicielle",
        description:
          "Vérifie le code migré, refactorisé ou généré par l’IA, et produit des artefacts de preuve lorsque le code respecte les propriétés définies.",
        items: [
          "Modernisation des systèmes hérités",
          "Révision de code généré par l’IA",
          "Modifications logicielles réglementées",
          "Refactorisation à haut risque",
          "Chemins de code sensibles à la sécurité",
        ],
      },
      {
        name: "IronProof VERDICT",
        tag: "Gouvernance des agents IA",
        description:
          "Vérifie les actions à haut risque des agents IA avant leur exécution, les confronte aux règles de gouvernance, et crée une preuve scellée de ce qui a été autorisé, refusé ou jugé sécuritaire.",
        items: [
          "Agents IA dans des flux de travail réglementés",
          "Approbations, remboursements, crédits, transferts",
          "Application des politiques",
          "Pistes de vérification",
          "Gouvernance de l’IA en entreprise",
        ],
      },
      {
        name: "IronProof Core",
        tag: "Infrastructure de preuve",
        description:
          "Le moteur de preuve sous-jacent. Transforme les politiques, contraintes, comportements de code et règles d’action en logique de vérification vérifiable par machine.",
        items: [
          "Politiques converties en contrôles vérifiables par machine",
          "Moteur de vérification formelle",
          "Alimente Cobalt et VERDICT",
          "Artefacts de preuve scellés et portables",
          "Vérifiable hors ligne, de façon indépendante",
        ],
      },
    ],
  },
  sovereignty: {
    eyebrow: "Souveraineté",
    title: "Conçu pour les environnements souverains et isolés (air-gapped).",
    description:
      "IronProof est conçu pour les institutions qui ne peuvent pas envoyer de systèmes sensibles, de code, de données ou de décisions vers des environnements non contrôlés. Les artefacts de preuve peuvent être scellés et vérifiés de façon indépendante, sans dépendre du système d’origine.",
    tagline: "Sécurité vérifiable pour l’IA et les logiciels.",
    features: [
      {
        title: "Scellement post-quantique",
        body: "Les artefacts de preuve sont scellés à l’aide de principes cryptographiques post-quantiques — une preuve résistante à l’avenir.",
      },
      {
        title: "Vérification hors ligne",
        body: "Un vérificateur peut valider l’artefact de preuve plus tard à l’aide de clés publiques seulement, sans accès au système d’origine.",
      },
      {
        title: "Déploiement souverain",
        body: "Souverain, local, privé, et compatible avec des environnements isolés (air-gapped) ou à contrôle élevé.",
      },
    ],
  },
  useCases: {
    eyebrow: "Cas d’usage",
    title: "Là où la preuve compte le plus.",
    items: [
      "Gouvernance des agents IA",
      "Assurance du code généré par l’IA",
      "Audits de preuve pour la modernisation des systèmes hérités",
      "Vérification des flux de travail réglementés",
      "Sécurité des logiciels critiques",
      "Politiques converties en contrôles vérifiables par machine",
      "Preuves d’audit scellées post-quantiques",
      "Assurance pour le secteur public et les usages à double vocation",
    ],
  },
  customers: {
    eyebrow: "Conçu pour",
    title:
      "Les institutions à haut niveau de confiance, là où « faites-moi confiance » ne suffit pas.",
    segments: [
      "Banques",
      "Compagnies d’assurance",
      "Organismes gouvernementaux",
      "Exploitants d’infrastructures critiques",
      "Télécommunications",
      "Plateformes d’administration de la santé",
      "Partenaires de modernisation",
      "Éditeurs SaaS déployant des agents IA",
      "Équipes de cybersécurité et de conformité",
    ],
  },
  proofPoints: {
    eyebrow: "Des preuves, pas des promesses",
    title: "Des preuves que vous pouvez vérifier de façon indépendante.",
    items: [
      { stat: "3", label: "CVE attribués" },
      { stat: "0", label: "Faux positifs prouvés" },
      { stat: "100%", label: "Vérification mathématique sur un espace d’entrée défini" },
      { stat: "PQ", label: "Artefacts de preuve scellés post-quantiques" },
      { stat: "0", label: "Accès fournisseur requis pour la vérification hors ligne" },
      { stat: "CA", label: "Posture de déploiement souverain canadien" },
    ],
  },
  finalCta: {
    eyebrow: "Dans un monde d’incertitude face à l’IA",
    title: "IronProof offre aux institutions quelque chose de rare : la preuve.",
    subhead: "IronProof ne vend pas la confiance. IronProof vend la preuve.",
    designPartnerPre:
      "Vous souhaitez plutôt devenir partenaire de conception? Écrivez-nous à ",
    designPartnerEmail: "hello@ironproof.ai",
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Courriel professionnel",
      company: "Entreprise",
      message: "Qu’aimeriez-vous vérifier?",
      submit: "Demander une démo",
      submitting: "Envoi en cours…",
      successTitle: "Demande reçue.",
      successBody: "Nous communiquerons avec vous sous peu.",
      errorPre: "Une erreur est survenue — veuillez écrire directement à ",
      errorLinkLabel: "hello@ironproof.ai",
      errorPost: ".",
    },
  },
  footer: {
    description:
      "IronProof construit une infrastructure de sécurité vérifiable pour l’IA et les logiciels critiques. Notre plateforme aide les organisations à haut niveau de confiance à prouver si leurs agents IA, leur code généré par l’IA et leurs systèmes modernisés respectent les règles de sécurité et de gouvernance définies.",
    tagline: "Sécurité vérifiable pour l’IA et les logiciels.",
    country: "Canada",
    copyright: "IronProof. Tous droits réservés.",
  },
};
