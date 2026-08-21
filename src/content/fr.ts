import type { SiteContent } from "./types";

export const fr: SiteContent = {
  meta: {
    title:
      "IronProof | Autorisation vérifiable pour les actions IA irréversibles",
    description:
      "IronProof prouve ce qu’un agent IA peut et ne peut pas faire avant qu’il agisse — mouvements d’argent, dossiers supprimés, données qui sortent, code déployé en production — et produit une preuve que les équipes de risque, de conformité et d’audit vérifient indépendamment.",
    // Open Graph et la carte X/Twitter lisent ceci. Identique à la meta
    // description a dessein : meme positionnement partout, rien d’invente.
    ogDescription:
      "IronProof prouve ce qu’un agent IA peut et ne peut pas faire avant qu’il agisse — mouvements d’argent, dossiers supprimés, données qui sortent, code déployé en production — et produit une preuve que les équipes de risque, de conformité et d’audit vérifient indépendamment.",
  },
  header: {
    nav: [
      { href: "#evidence", label: "Preuves" },
      { href: "#artifact", label: "L’artefact" },
      { href: "#products", label: "Produit" },
      { href: "#comparison", label: "Comparer" },
      { href: "#corpus", label: "Recherche" },
      { href: "https://ironproof-lab.vercel.app", label: "Proof Lab" },
    ],
    cta: "Évaluer un flux",
    langSwitchLabel: "EN",
  },
  hero: {
    eyebrow: "Autorisation vérifiable pour les actions IA irréversibles",
    headline:
      "Prouvez ce qu’un agent IA ne peut pas faire — avant qu’il agisse.",
    body: [
      "Certaines actions ne se défont pas. IronProof vérifie qu’un agent reste à l’intérieur de la politique que vous avez écrite avant qu’il s’exécute — remboursements, paiements et changements de bénéficiaire aujourd’hui, et le même contrôle pour un dossier supprimé, une donnée qui sort ou du code qui part en production.",
      "Pour chaque décision, il consigne la politique appliquée, l’autorité de l’agent sous cette politique, l’état de la transaction, et une justification vérifiable expliquant pourquoi l’action a été permise ou refusée.",
      "La preuve qui en résulte se vérifie de façon indépendante par les équipes de risque, de conformité et d’audit — sans dépendre d’un tableau de bord IronProof.",
    ],
    ctaPrimary: "Évaluer le flux qui vous inquiète",
    ctaSecondary: "Inspecter un certificat exemple",
    trustLine: [
      "Politique contrôlée par le client",
      "Vérification avant exécution",
      "Déploiement souverain et en isolement réseau disponible",
    ],
    proofCard: {
      label: "Artefact de preuve",
      status: "SCELLÉ",
      rows: [
        { label: "Décision", value: "REMBOURSEMENT AUTORISÉ", accent: true },
        {
          label: "Politique",
          value: "Politique de remboursement marchand · v3.2",
        },
        {
          label: "Autorité de l’agent",
          value: "Remboursements ≤ 1 000 $ · active",
        },
        {
          label: "État transactionnel",
          value: "640 $ demandés · 1 820 $ cumulés ce mois",
        },
        {
          label: "Contrôle de frontière",
          value: "dans les limites par action et cumulatives",
        },
        {
          label: "Justification",
          value:
            "politique satisfaite · autorité valide · approbation non requise",
        },
        {
          label: "Verdict de preuve",
          value: "UNSAT · aucune violation atteignable",
          accent: true,
        },
        { label: "Sceau", value: "Ed25519 + ML-DSA-65" },
        { label: "Vérificateur", value: "hors ligne · implémentation indépendante" },
      ],
      footnote:
        "La politique, l’autorité, l’état transactionnel et le verdict de preuve sont scellés ensemble. Le format est publié : l’artefact se contrôle avec un vérificateur que nous n’avons pas écrit — hors ligne, sans compte et sans une ligne de notre code.",
    },
  },
  attributions: {
    title: "Dossier technique public",
    subtitle: "Des preuves que vous pouvez examiner en dehors de notre site.",
    items: [
      {
        org: "IBM",
        body: "Nomme Cobalt AI dans le commit sarama qui porte le correctif.",
        cta: "Voir le commit",
        href: "https://github.com/IBM/sarama/commit/b01879002b37abe3b44a957615d982847a44da94",
      },
      {
        org: "GnuPG",
        body: "Deux commits libksba créditent notre signalement, livrés en version 1.7.0.",
        cta: "Voir le commit",
        href: "https://github.com/gpg/libksba/commit/c44cc98460ea42e393214dc6e23ff746196baefd",
      },
      {
        org: "Mozilla",
        body: "Notre signalement est consigné et résolu dans le suivi de bogues public de Mozilla.",
        cta: "Voir la fiche",
        href: "https://bugzilla.mozilla.org/show_bug.cgi?id=2027434",
      },
      {
        org: "Red Hat · OpenELA",
        body: "Des correctifs libyang publics créditent Dominik Blain et Cobalt AI pour le signalement de deux corruptions mémoire.",
        cta: "Voir le dossier de correctif",
        href: "https://github.com/openela-main/libyang",
      },
      {
        org: "wolfSSL",
        body: "Correctifs de sécurité crédités publiquement dans les notes de version wolfSSL 5.9.2.",
        cta: "Voir les notes de version",
        href: "https://github.com/wolfSSL/wolfssl/blob/master/README.md",
      },
      {
        org: "VideoLAN · VLC",
        body: "Un correctif de vulnérabilité portant le nom de Dominik Blain est conservé dans l’arbre source public de VLC.",
        cta: "Voir le correctif",
        href: "https://github.com/videolan/vlc/blob/master/contrib/src/upnp/0006-uri.c-Dominik-Blain-s-fix-for-vulnerability.patch",
      },
      {
        org: "OFFIS · DCMTK",
        body: "Trois commits remercient Dominik Blain pour le signalement.",
        cta: "Voir le commit",
        href: "https://github.com/DCMTK/dcmtk/commit/63b0bae751f62ed1b384141fa0fd032c98af57aa",
      },
      {
        org: "libmodbus",
        body: "Le commit du correctif nomme la vérification formelle Qreativelab comme rapporteur.",
        cta: "Voir le commit",
        href: "https://github.com/stephane/libmodbus/commit/d6941168d13cfa1db1bec40ef5bf04470c351175",
      },
    ],
    summary:
      "8 organisations nous créditent publiquement · 3 CVE assignées · 28 divulgations coordonnées · 4 prépublications en sécurité",
    linkLabel: "Consulter le dossier technique complet",
    linkHref: "#corpus",
  },
  lab: {
    eyebrow: "Laboratoire de preuve",
    title: "Testez la frontière transactionnelle vous-même.",
    description:
      "Modifiez le montant du remboursement, le cumul mensuel ou le statut d’approbation. Le moteur de preuve autorisera l’action, ou produira la condition exacte qui la bloque.",
    cta: "Ouvrir le Proof Lab",
    previewLabel: "INSTRUMENT EN DIRECT",
    policyLabel: "Politique d’exemple",
    policy: [
      "Remboursement maximum : 1 000 $",
      "Limite mensuelle par client : 2 500 $",
      "Approbation humaine requise au-delà de 1 000 $",
    ],
    transactionLabel: "Transaction par défaut",
    transaction: [
      "Remboursement demandé : 640 $",
      "Cumul mensuel actuel : 1 820 $",
      "Approbation : non requise",
    ],
    safeLabel: "Résultat autorisé",
    safeVerdict: "REMBOURSEMENT AUTORISÉ",
    safeBody:
      "Aucune violation de la politique n’est atteignable dans le périmètre défini.",
    failLabel: "Résultat bloqué",
    failVerdict: "REMBOURSEMENT BLOQUÉ",
    failBody: "Affiche la règle exacte violée et le contre-exemple.",
  },
  problem: {
    eyebrow: "L’écart",
    title: "Ce que les contrôles existants ne peuvent toujours pas prouver",
    body: [
      "L’identité confirme quel agent agit. Les permissions définissent son accès général. Les garde-fous encadrent son comportement. Les journaux consignent ce qui s’est passé.",
      "Aucun d’eux, seul, ne prouve qu’une action financière précise était autorisée sous la politique, l’autorité et l’état transactionnel exacts en vigueur au moment de la décision.",
      "IronProof comble cet écart avant l’exécution et conserve le fondement de l’autorisation comme preuve vérifiable indépendamment.",
    ],
    layers: [
      { name: "Identité", role: "Qui agit" },
      { name: "Permissions", role: "Ce à quoi il accède" },
      { name: "Garde-fous", role: "Comment il devrait se comporter" },
      { name: "Journaux", role: "Ce qui s’est passé" },
    ],
    conclusion: {
      name: "IronProof",
      role: "Pourquoi cette action a été permise ou refusée",
    },
  },
  solution: {
    eyebrow: "Comment ça marche",
    title: "Comment IronProof autorise une action d’IA",
    description:
      "Votre politique écrite est compilée en mathématiques — par le même compilateur déterministe qu’utilise le runtime. La preuve porte sur ce modèle, pas sur une liste de contrôles.",
    steps: [
      {
        step: "01",
        title: "Capturer le contexte de la décision",
        body: "Consigner la version de la politique, l’autorité de l’agent, l’état transactionnel et l’action demandée.",
      },
      {
        step: "02",
        title: "Prouver la frontière",
        body: "Déterminer si l’action peut violer une règle définie par le client ou une limite cumulative. La décision est déterministe — les mêmes entrées donnent toujours le même verdict, sans solveur dans le chemin d’exécution et sans branche de dépassement de délai. Le solveur intervient plus tôt et ailleurs : il certifie la politique sur tout son espace d’action, de sorte qu’une politique qui n’admet rien est détectée avant d’être mise en service.",
      },
      {
        step: "03",
        title: "Autoriser ou bloquer l’exécution",
        body: "N’émettre un jeton d’exécution à usage unique que lorsque l’action est prouvée à l’intérieur de la frontière. Le jeton est lié à cette action exacte et à la politique en vigueur ; rien ne s’exécute sans le dépenser.",
      },
      {
        step: "04",
        title: "Sceller la preuve",
        body: "Conserver la décision, la justification et le résultat de preuve dans un artefact vérifiable indépendamment.",
      },
    ],
  },
  products: {
    eyebrow: "Produit",
    title:
      "La couche d’autorisation pour les agents IA qui agissent",
    description:
      "IronProof Actions évalue chaque action irréversible avant son exécution, au regard de la politique, de l’autorité et de l’état en vigueur. L’argent est notre point de départ ; le contrôle, lui, n’en dépend pas.",
    capabilities: [
      {
        title: "Contexte au moment de la décision",
        body: "Capture la version de la politique — rédigée par le client, pas par nous — l’autorité de l’agent sous celle-ci, l’action demandée et l’état cumulatif dans lequel elle arrive.",
      },
      {
        title: "Contrôle formel de la frontière",
        body: "Prouve si l’action reste à l’intérieur de la frontière transactionnelle définie par le client — et qu’aucune séquence d’actions que l’agent peut enchaîner ne s’en échappe, pas seulement la requête du moment.",
      },
      {
        title: "Jeton d’exécution à usage unique",
        body: "Seule une action prouvée reçoit un jeton, lié à cette décision exacte et à la politique en vigueur. Rien ne s’exécute sans le dépenser.",
      },
      {
        title: "Preuve vérifiable",
        body: "Conserve pourquoi l’action a été permise ou refusée dans un artefact scellé que votre propre auditeur peut contrôler hors ligne.",
      },
    ],
    finalLine:
      "Commencez par un seul flux — celui sur lequel personne ne veut se tromper.",
  },
  artifact: {
    eyebrow: "L’artefact",
    title: "Ce que l’artefact de preuve conserve",
    blocks: [
      {
        num: "01",
        title: "Politique et autorité",
        body: "La version exacte de la politique et l’autorité de l’agent sous celle-ci.",
      },
      {
        num: "02",
        title: "État transactionnel",
        body: "L’action demandée, les limites cumulatives, les approbations et le contexte pertinent.",
      },
      {
        num: "03",
        title: "Décision et justification",
        body: "Pourquoi l’action a été permise ou refusée, avec le résultat de preuve ou le contre-exemple.",
      },
      {
        num: "04",
        title: "Sceau et vérification",
        body: "L’artefact révèle toute altération. Le format étant publié, une implémentation indépendante peut recalculer chaque empreinte et chaque signature — sans une ligne de code IronProof.",
      },
    ],
    finalLine:
      "Un rapport vous donne une conclusion. L’artefact conserve le fondement de l’autorisation qui la soutient.",
  },
  comparison: {
    eyebrow: "Comparer",
    title: "Ce que chaque contrôle prouve",
    rows: [
      {
        name: "Gestion des identités et des accès",
        primary: "Prouve qui est l’agent et à quels systèmes il peut accéder.",
        secondary: "Ne prouve pas que cette transaction précise est autorisée.",
      },
      {
        name: "Garde-fous",
        primary: "Encadrent le comportement du modèle et bloquent les schémas dangereux connus.",
        secondary: "N’établissent pas le fondement complet d’autorisation d’une action financière.",
      },
      {
        name: "Journaux et observabilité",
        primary: "Consignent ce qui s’est passé pendant ou après l’exécution.",
        secondary: "Ne prouvent pas que l’action était valide avant l’exécution.",
      },
      {
        name: "Rapports d’audit",
        primary: "Fournissent une conclusion d’expert à un instant donné.",
        secondary: "Ne conservent généralement pas une preuve rejouable au moment de la décision.",
      },
      {
        name: "IronProof",
        primary: "Prouve si l’action précise est à l’intérieur de la politique, de l’autorité et de l’état transactionnel en vigueur, avant l’exécution.",
        secondary: "Conserve le fondement de l’autorisation comme preuve vérifiable indépendamment.",
        isUs: true,
      },
    ],
  },
  sovereignty: {
    eyebrow: "Souveraineté",
    title:
      "Conçu pour les environnements qui ne peuvent exporter ni données ni confiance",
    description:
      "IronProof peut fonctionner localement ou en isolement réseau, de sorte que les politiques transactionnelles, le contexte système et la preuve de décision restent sous le contrôle de l’institution.",
    features: [
      {
        title: "Déploiement local",
        body: "Le cœur de preuve peut fonctionner sans accès réseau.",
      },
      {
        title: "Vérification indépendante",
        body: "L’auditeur du client peut recontrôler l’artefact avec un second vérificateur écrit indépendamment — hors ligne, sans tableau de bord IronProof.",
      },
      {
        title: "Preuve durable",
        body: "Chaque artefact porte une signature classique et une signature post-quantique (Ed25519 + ML-DSA-65, FIPS 204), et son horodatage est borné des deux côtés — un sceau ne peut pas être reculé dans le temps.",
      },
    ],
  },
  corpus: {
    eyebrow: "Recherche",
    title: "Pourquoi la preuve peut être contestée",
    description:
      "Une entreprise de vérification devrait exposer les parties les plus susceptibles de faillir : le modèle, la traduction, le vérificateur et les hypothèses.",
    points: [
      {
        title: "Traduction vérifiée par machine",
        body: "Lean 4 contrôle que le compilateur de politique du runtime et l’encodage pour le solveur représentent la même logique de décision.",
      },
      {
        title: "Vérification reproductible",
        body: "La suite de vérification peut être rejouée de bout en bout, preuves réussies et cas d’échec compris.",
      },
      {
        title: "Méthodes publiées",
        body: "Quatre prépublications en sécurité exposent les méthodes, les jeux de données, les limites et les cas d’échec.",
      },
    ],
    papers: {
      eyebrow: "Recherche publiée",
      items: [
        {
          id: "arXiv:2604.05292",
          title:
            "Broken by Default: A Formal Verification Study of Security Vulnerabilities in AI-Generated Code",
          href: "https://arxiv.org/abs/2604.05292",
        },
        {
          id: "arXiv:2604.06712",
          title:
            "Broken Quantum: A Systematic Formal Verification Study of Security Vulnerabilities Across the Open-Source Quantum Computing Simulator Ecosystem",
          href: "https://arxiv.org/abs/2604.06712",
        },
        {
          id: "arXiv:2604.12172",
          title:
            "COBALT-TLA: A Neuro-Symbolic Verification Loop for Cross-Chain Bridge Vulnerability Discovery",
          href: "https://arxiv.org/abs/2604.12172",
        },
        {
          id: "arXiv:2604.20496",
          title:
            "Mythos and the Unverified Cage: Z3-Based Pre-Deployment Verification for Frontier-Model Sandbox Infrastructure",
          href: "https://arxiv.org/abs/2604.20496",
        },
      ],
    },
  },
  sector: {
    eyebrow: "Par où nous commençons",
    title:
      "Les flux qui déplacent de l’argent, dans les services financiers canadiens",
    description:
      "Nous commençons par les agents IA d’arrière-guichet qui émettent des remboursements, des paiements, des décaissements ou des changements de bénéficiaire, sous des limites et des règles d’approbation définies.",
    buyersLabel: "Acheteurs principaux",
    buyers:
      "Les équipes de risque technologique, de risque opérationnel et de conformité.",
    engagementLabel: "Mandat initial",
    engagement:
      "Choisir un flux, définir la frontière transactionnelle et produire un artefact de preuve vérifiable indépendamment.",
    quote:
      "Elles ne l’utilisent pas pour remplacer le jugement humain ni pour automatiser entièrement des décisions critiques, compte tenu des conséquences financières, juridiques et réputationnelles importantes.",
    quoteSource: "Banque du Canada — Enquête sur le système financier, mai 2026",
    quoteHref:
      "https://www.bankofcanada.ca/2026/05/financial-system-survey-highlights-2026/",
  },
  finalCta: {
    title: "Commencez par un seul flux qui déplace de l’argent",
    description:
      "Choisissez un flux de remboursement, de paiement, de décaissement ou de changement de bénéficiaire. Nous définissons la frontière transactionnelle, la testons pour y trouver des violations et livrons un artefact de preuve que votre équipe peut vérifier de façon indépendante.",
    ctaSecondary: "Inspecter un certificat exemple",
    designPartnerPre:
      "Vous préférez devenir partenaire de conception ? Écrivez-nous à ",
    designPartnerEmail: "hello@ironproof.ai",
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Courriel professionnel",
      company: "Entreprise",
      message: "Quel flux souhaitez-vous évaluer ?",
      submit: "Évaluer un flux",
      submitting: "Envoi en cours…",
      successTitle: "Demande reçue.",
      successBody: "Nous vous reviendrons sous peu.",
      errorPre: "Une erreur est survenue — écrivez-nous à ",
      errorLinkLabel: "hello@ironproof.ai",
      errorPost: " directement.",
    },
  },
  footer: {
    description:
      "Autorisation vérifiable et preuve décisionnelle pour les flux financiers propulsés par l’IA.",
    closing:
      "IronProof offre aux institutions quelque chose de rare : la preuve.",
    country: "Canada",
    copyright: "IronProof. Tous droits réservés.",
  },
};
