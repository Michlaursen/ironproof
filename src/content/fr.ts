import type { SiteContent } from "./types";

export const fr: SiteContent = {
  meta: {
    title:
      "IronProof | Autorisation vérifiable pour les workflows financiers propulsés par l’IA",
    description:
      "IronProof vérifie les limites transactionnelles avant qu’un agent IA exécute un remboursement, un paiement, un décaissement ou un changement de bénéficiaire, puis produit une preuve vérifiable indépendamment par les équipes de risque, de conformité et d’audit.",
    // Open Graph et la carte X/Twitter lisent ceci. Identique à la meta
    // description a dessein : meme positionnement partout, rien d’invente.
    ogDescription:
      "IronProof vérifie les limites transactionnelles avant qu’un agent IA exécute un remboursement, un paiement, un décaissement ou un changement de bénéficiaire, puis produit une preuve vérifiable indépendamment par les équipes de risque, de conformité et d’audit.",
  },
  header: {
    nav: [
      { href: "#evidence", label: "Preuves" },
      { href: "#artifact", label: "L’artefact" },
      { href: "#products", label: "Produit" },
      { href: "#comparison", label: "Comparer" },
      { href: "#corpus", label: "Recherche" },
      { href: "https://lab.ironproof.ai", label: "Proof Lab" },
    ],
    cta: "Demander une démo",
    langSwitchLabel: "EN",
  },
  hero: {
    eyebrow: "Autorisation vérifiable pour les flux financiers pilotés par l’IA",
    headline:
      "Prouvez la frontière transactionnelle avant qu’un agent IA ne déplace de l’argent.",
    body: [
      "IronProof vérifie que les remboursements, paiements, décaissements et changements de bénéficiaire restent à l’intérieur de la politique rédigée par le client, avant exécution.",
      "Pour chaque décision, il consigne la politique appliquée, l’autorité de l’agent sous cette politique, l’état de la transaction, et une justification vérifiable expliquant pourquoi l’action a été permise ou refusée.",
      "La preuve qui en résulte se vérifie de façon indépendante par les équipes de risque, de conformité et d’audit — sans dépendre d’un tableau de bord IronProof.",
    ],
    ctaPrimary: "Évaluer un flux qui déplace de l’argent",
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
        { label: "Vérificateur", value: "hors ligne · clé publique de confiance" },
      ],
      footnote:
        "La politique, l’autorité, l’état transactionnel et le verdict de preuve sont scellés ensemble. Vérifiez l’artefact hors ligne avec une clé publique de confiance — sans accès à un tableau de bord IronProof.",
    },
  },
  attributions: {
    title: "Dossier technique public",
    subtitle: "Des preuves que vous pouvez examiner en dehors de notre site.",
    items: [
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
        org: "Red Hat · OpenELA",
        body: "Des correctifs libyang publics créditent Dominik Blain et Cobalt AI pour le signalement de deux corruptions mémoire.",
        cta: "Voir le dossier de correctif",
        href: "https://github.com/openela-main/libyang",
      },
    ],
    alsoLabel: "Nous créditent aussi nommément",
    also: [
      { org: "GnuPG", href: "https://github.com/gpg/libksba/commit/c44cc98460ea42e393214dc6e23ff746196baefd" },
      { org: "OFFIS · DCMTK", href: "https://github.com/DCMTK/dcmtk/commit/63b0bae751f62ed1b384141fa0fd032c98af57aa" },
      { org: "IBM", href: "https://github.com/IBM/sarama/commit/b01879002b37abe3b44a957615d982847a44da94" },
      { org: "libmodbus", href: "https://github.com/stephane/libmodbus/commit/d6941168d13cfa1db1bec40ef5bf04470c351175" },
      { org: "Mozilla", href: "https://bugzilla.mozilla.org/show_bug.cgi?id=2027434" },
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
        body: "Déterminer si l’action peut violer une règle définie par le client ou une limite cumulative. La politique compilée devient des contraintes et un solveur parcourt tout l’espace défini — unsat signifie qu’aucun état en violation n’existe, sat renvoie le contre-exemple.",
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
    title: "Un seul moteur de preuve. Quatre surfaces où ça compte.",
    description:
      "Le même moteur, pointé vers quatre endroits où se tromper coûte cher. Chaque surface produit le même livrable : un contre-exemple, ou un artefact scellé.",
    items: [
      {
        name: "IronProof Core",
        tag: "Moteur de preuve",
        description:
          "Le moteur d’ontologie. Z3 et Spacer sur un jumeau numérique typé : il synthétise lui-même l’invariant, puis prouve qu’aucune trajectoire ne s’en échappe. La plupart des outils vérifient une règle que vous avez écrite. Core trouve la règle qui doit tenir.",
        items: [
          "Synthèse symbolique d’invariant",
          "Fidélité de l’encodeur vérifiée par noyau en Lean 4",
          "Contre-exemple à chaque échec",
          "Artefacts scellés en post-quantique",
          "Vérification hors ligne par un tiers",
        ],
      },
      {
        name: "IronProof Actions",
        tag: "Gouvernance des agents IA",
        description:
          "Juge une action d’agent à haut risque avant son exécution. La porte est la seule entrée — structurellement, pas par convention : rien ne s’exécute sans dépenser un jeton à usage unique, émis uniquement sur la branche prouvée sûre.",
        items: [
          "Vérification avant exécution, pas des journaux après coup",
          "Approbations, remboursements, crédits, virements, limites",
          "Jetons d’exécution à usage unique liés à la politique en vigueur",
          "Registre scellé de ce qui a été permis, refusé et prouvé",
          "Fonctionne en isolement réseau — zéro réseau dans le cœur de preuve",
        ],
      },
      {
        name: "IronProof Cobalt-AI",
        tag: "Code et contrats intelligents",
        description:
          "Prouve des propriétés du code — hérité, réusiné, généré par IA ou en chaîne. C’est la surface derrière nos CVE publiées et les correctifs intégrés par wolfSSL, VideoLAN et Red Hat.",
        items: [
          "Assurance du code généré par IA",
          "Audits de preuve pour la modernisation d’applications héritées",
          "Contrats intelligents et analyse de ponts inter-chaînes",
          "Classes de sûreté mémoire (CWE-190 / 131 / 195)",
          "Divulgation coordonnée, créditée publiquement",
        ],
      },
      {
        name: "IronProof Cobalt-PQC",
        tag: "Cryptographie",
        description:
          "Prouve l’absence de canaux auxiliaires temporels dans les implémentations cryptographiques, et audite la migration post-quantique elle-même — la seule échéance que personne ne peut renégocier.",
        items: [
          "Vérification de temps constant (temporisation IEEE-754)",
          "Implémentations ML-DSA / FIPS 204",
          "Inventaire post-quantique et CBOM",
          "Exposition « récolter maintenant, déchiffrer plus tard »",
          "Recherche publiée sur l’écosystème",
        ],
      },
    ],
  },
  artifact: {
    eyebrow: "Anatomie de l’artefact",
    title: "Chaque champ de l’artefact a une raison d’être.",
    description:
      "Ouvrez un artefact IronProof scellé et démontez-le. Il compte huit parties, et chacune est là parce qu’un ingénieur, un auditeur ou un régulateur qui le lit a une décision à prendre. Un rapport vous dit ce que nous avons conclu. Un artefact vous laisse le vérifier.",
    stats: [
      {
        stat: "8",
        label: "Champs annotés",
        note: "Chacun délibérément différent de ce qu’un rapport vous donne.",
      },
      {
        stat: "2",
        label: "Signatures par entrée",
        note: "Ed25519 et ML-DSA-65, et les deux doivent valider sinon l’entrée échoue. SHA3-512 est la troisième primitive du sceau, mais elle hache — elle ne signe pas.",
      },
      {
        stat: "0",
        label: "Accès fournisseur requis",
        note: "Les clés publiques voyagent dans l’artefact. La vérification est hors ligne.",
      },
    ],
    fileLabel: "verdict_dossier.json — politique de remboursement marchand v3.2",
    fileMeta: "sceal_dossier_version 1.1 · doublement signé · chaîné",
    parts: [
      {
        num: "01",
        field: "target · policy_owner",
        anchor: "Qui a écrit la règle",
        claim: "Le client possède la politique. Nous ne faisons que la prouver.",
        body: "L’artefact enregistre, dans son propre corps, que la règle prouvée a été écrite par le client et non par nous. Une entreprise de vérification qui rédige les règles sur lesquelles elle se note ensuite corrige sa propre copie, et l’artefact rend cette confusion impossible à cacher.",
        statusQuo:
          "Le fournisseur définit la propriété et le critère de réussite : un résultat vert mesure donc en partie ses propres choix.",
        code: [
          {
            key: "target",
            value: "\"Acme Store — politique remboursement / crédit / rabais v3.2\"",
          },
          {
            key: "policy_owner",
            value: "\"merchant (customer-authored, not written by Ironproof)\"",
            tone: "ok",
          },
        ],
      },
      {
        num: "02",
        field: "theorem",
        anchor: "L’obligation, en forme de solveur",
        claim: "Le vrai théorème, pas une paraphrase.",
        body: "Deux obligations, toutes deux déchargées : le cas de base dit que le système démarre à l’intérieur de l’invariant, le pas inductif dit qu’aucune action seule ne peut en sortir. Ensemble, ils couvrent toutes les séquences atteignables — pas un échantillon. La formule est dans l’artefact : vous pouvez la relancer au lieu de croire notre résumé.",
        statusQuo:
          "Les rapports décrivent la propriété en français. La prose et la formule réellement contrôlée peuvent diverger, et personne ne s’en aperçoit.",
        code: [
          { key: "theorem", value: "\"INIT => INV ; INV & step => INV'\"" },
          {
            key: "discharge",
            value: "\"both UNSAT under spec-compiled gate\"",
            tone: "ok",
          },
        ],
      },
      {
        num: "03",
        field: "meaning",
        anchor: "Langage clair, à côté des maths",
        claim:
          "La phrase qu’un responsable des risques peut lire, à côté de la formule d’où elle vient.",
        body: "L’artefact porte une lecture en langage clair du théorème — pas à la place de la formule, à côté. L’ingénieur contrôle les maths ; le comité de risque lit la phrase ; les deux regardent le même objet scellé, donc on ne peut pas leur raconter deux histoires différentes.",
        statusQuo:
          "Vous obtenez l’un ou l’autre : de la prose invérifiable, ou une formule que personne ne lit. C’est dans cet écart que vivent les surclaims.",
        code: [
          {
            key: "meaning",
            value:
              "\"aucune séquence d’actions de remboursement / crédit / rabais que l’agent peut prendre ne dépasse les limites du marchand\"",
          },
        ],
      },
      {
        num: "04",
        field: "solver_in_proof",
        anchor: "Solveur nommé, version figée",
        claim: "Quel prouveur, quelle version — inscrit dans la preuve.",
        body: "Une preuve n’est reproductible que dans la mesure où l’outil qui l’a produite l’est. L’artefact nomme le solveur et fige sa version, pour que le calcul puisse être refait des années plus tard sur le même outillage, et pour qu’un bogue de solveur divulgué demain puisse être rattaché à chaque artefact qu’il a touché.",
        statusQuo:
          "Une coche verte, sans solveur, sans version, sans obligation. Rien à reproduire, rien à rappeler.",
        code: [
          { key: "solver_in_proof", value: "\"z3 4.16.0\"", tone: "ok" },
          {
            key: "artifact_sha3_512",
            value: "\"ca5628f661854813be35…\"",
            tone: "muted",
          },
        ],
      },
      {
        num: "05",
        field: "independent_engine_count",
        anchor: "Corroboration par moteurs indépendants",
        claim: "Plus d’un moteur devait être d’accord.",
        body: "Le verdict est corroboré par des moteurs de raisonnement indépendants, et le compte voyage avec l’artefact. L’avis d’un seul outil est une donnée ; l’accord entre des moteurs qui échouent différemment est une preuve. Quand ils divergent, l’artefact le dit au lieu de retenir la réponse qui arrange.",
        statusQuo:
          "La sortie d’un seul outil, présentée comme un fait. Ses angles morts deviennent les vôtres, en silence.",
        code: [
          { key: "corroborating_engines", value: "[ … ]" },
          { key: "independent_engine_count", value: "2", tone: "ok" },
        ],
      },
      {
        num: "06",
        field: "content_hash · prev_hash · entry_hash",
        anchor: "Chaîne en ajout seul",
        claim: "Modifier le passé casse la chaîne, bruyamment.",
        body: "Chaque entrée hache son propre contenu, porte l’empreinte de celle qui précède, et scelle les deux. Changez une valeur après coup et la chaîne ne ferme plus : la vérification échoue sur une divergence d’empreinte au lieu d’accepter discrètement la nouvelle version. La détection d’altération est une propriété du format, pas une promesse dans un contrat.",
        statusQuo:
          "Un PDF qu’on peut réexporter, ou une ligne de tableau de bord qu’on met à jour sur place sans laisser de trace.",
        code: [
          { key: "content_hash", value: "\"8a42d3e9bff6c0037bc7…\"", tone: "muted" },
          { key: "prev_hash", value: "\"000000000000000000…\"", tone: "muted" },
          { key: "entry_hash", value: "\"e2bc96d69a59406606f0…\"", tone: "muted" },
        ],
      },
      {
        num: "07",
        field: "signature_scheme · public_keys",
        anchor: "Double signature, post-quantique",
        claim:
          "Les deux signatures doivent valider. Les clés voyagent avec l’artefact.",
        body: "Chaque entrée est signée classiquement en Ed25519 et en post-quantique en ML-DSA-65 sous FIPS 204, dans un mode où les deux doivent valider sinon l’entrée est rejetée. Les clés publiques sont dans le fichier : le contrôler ne demande ni compte, ni réseau, ni coopération de notre part — y compris après notre disparition.",
        statusQuo:
          "Vérifier veut dire se connecter au tableau de bord du fournisseur, ou faire confiance à une signature PDF qui expire avec son autorité de certification.",
        code: [
          { key: "classical", value: "\"Ed25519\"" },
          { key: "post_quantum", value: "\"ML-DSA-65\"", tone: "ok" },
          { key: "mode", value: "\"dual (both must verify)\"", tone: "ok" },
        ],
      },
      {
        num: "08",
        field: "claim (quand un contrôle n’a pas tourné)",
        anchor: "Un saut ne se lit jamais comme une réussite",
        claim:
          "Quand nous n’avons pas pu contrôler quelque chose, l’artefact le dit dans le champ même qui aurait dit « vérifié ».",
        body: "Si le prouveur ou le vérificateur est absent, l’artefact ne se tait pas et ne passe pas au vert. Il inscrit le manque à l’endroit exact où une réussite aurait été écrite. C’est le mode de panne qui compte le plus dans notre métier — un résumé vert posé au-dessus de quelque chose qui n’a jamais tourné — et nous avons conçu le format pour qu’il ne puisse pas se produire en silence.",
        statusQuo:
          "Un contrôle qui n’a pas tourné est indiscernable d’un contrôle qui n’a rien trouvé. Les deux s’affichent en vert.",
        code: [
          {
            key: "claim",
            value:
              "\"NOT RUN — prover and/or checker absent. This is a gap, not a pass.\"",
            tone: "warn",
          },
          { key: "obligations_checked", value: "0", tone: "warn" },
        ],
      },
    ],
    tableTitle: "Côte à côte",
    tableColumns: {
      row: "Dans le livrable",
      us: "Artefact IronProof",
      them: "Rapport ou tableau de bord habituel",
    },
    tableRows: [
      { row: "Nomme l’auteur de la politique", us: "oui", them: "non" },
      {
        row: "Livre la formule contrôlée, pas une paraphrase",
        us: "oui",
        them: "non",
      },
      {
        row: "Lecture en langage clair à côté de la formule",
        us: "oui",
        them: "parfois",
      },
      { row: "Nomme le solveur et fige sa version", us: "oui", them: "non" },
      {
        row: "Consigne la corroboration par moteurs indépendants",
        us: "oui",
        them: "non",
      },
      { row: "L’altération fait échouer la vérification", us: "oui", them: "non" },
      { row: "Signature post-quantique (FIPS 204)", us: "oui", them: "non" },
      { row: "Vérifiable hors ligne, sans le fournisseur", us: "oui", them: "non" },
      {
        row: "Un contrôle sauté ne peut pas s’afficher comme réussi",
        us: "oui",
        them: "non",
      },
      {
        row: "Garde son sens après la disparition du fournisseur",
        us: "oui",
        them: "non",
      },
    ],
  },
  comparison: {
    eyebrow: "Comparaison honnête",
    title: "Où vit la preuve une fois le travail terminé ?",
    description:
      "Nous ne sommes pas les seuls à savoir prouver du logiciel, et nous n’allons pas prétendre le contraire. Certora, Imandra, Galois, Trail of Bits et AWS font un travail sérieux — sur leur terrain, meilleur que le nôtre. La différence, c’est ce qui vous reste en main une fois le mandat terminé.",
    columns: {
      vendor: "Fournisseur",
      strength: "Le plus fort en",
      location: "Où vit la preuve",
      survives: "Survit au fournisseur ?",
    },
    rows: [
      {
        vendor: "Certora",
        strength: "Contrats intelligents, contrôle continu de propriétés",
        location: "Leur tableau de bord",
        survives: "Non",
      },
      {
        vendor: "Imandra",
        strength:
          "Logique d’algorithmes et de code, raisonnement neuro-symbolique",
        location: "Leur service infonuagique",
        survives: "Non",
      },
      {
        vendor: "Galois",
        strength: "Haute assurance de niveau gouvernemental, depuis 25 ans",
        location: "Un rapport de mandat",
        survives: "Non",
      },
      {
        vendor: "Trail of Bits",
        strength: "Audit expert à grande échelle, outillage libre",
        location: "Un rapport PDF",
        survives: "Non",
      },
      {
        vendor: "AWS",
        strength: "Sécurité prouvable à l’intérieur de son propre nuage",
        location: "Dans AWS",
        survives: "Non",
      },
      {
        vendor: "IronProof",
        strength:
          "Preuve portable pour les actions IA, le code et la cryptographie",
        location: "Un artefact scellé que vous détenez",
        survives: "Oui — hors ligne, clé publique, post-quantique",
        isUs: true,
      },
    ],
    footnote:
      "Lisez ce tableau correctement. Sur le volume de recherche publiée, Trail of Bits et Galois nous devancent d’un ordre de grandeur. Sur la couverture des contrats intelligents, Certora est l’acteur en place et ce n’est même pas serré. Nous ne prétendons pas faire leur métier mieux qu’eux. Nous revendiquons un livrable différent : une preuve qui ne dépend pas de notre survie.",
  },
  sovereignty: {
    eyebrow: "Souveraineté et durabilité",
    title:
      "Conçu pour les institutions qui ne peuvent exporter ni leurs systèmes, ni leur confiance.",
    description:
      "Le cœur de preuve fonctionne sans accès réseau. Rien de vos systèmes, de votre code ou de vos décisions n’a besoin de quitter votre contrôle pour être prouvé, et rien n’a besoin de nous revenir pour être contrôlé.",
    tagline: "Sécurité vérifiable pour l’IA et les logiciels critiques.",
    features: [
      {
        title: "Sceau post-quantique",
        body: "Les artefacts sont hachés en SHA3-512 et doublement signés Ed25519 + ML-DSA-65 sous FIPS 204. Une preuve scellée aujourd’hui reste contrôlable après l’arrivée d’un ordinateur quantique cryptographiquement pertinent.",
      },
      {
        title: "Vérification hors ligne",
        body: "Un vérificateur a besoin de l’artefact et d’une clé publique. Aucun réseau, aucun compte, aucun appel maison. Une altération se manifeste par une divergence d’empreinte, pas par un silence.",
      },
      {
        title: "Déploiement souverain et isolé",
        body: "Local, privé, compatible avec les environnements en isolement réseau. Opéré au Canada, pour des institutions qui traitent la résidence des données et la concentration fournisseur comme un risque à documenter.",
      },
    ],
  },
  corpus: {
    eyebrow: "Le dossier",
    title: "Tout ce que nous affirmons est publié ou reproductible.",
    description:
      "La chose la plus forte qu’une entreprise de vérification puisse faire, c’est se rendre réfutable. Lisez les méthodes, lancez la suite, contrôlez les chiffres, et contredisez-nous en public.",
    record: [
      {
        stat: "3",
        label: "CVE assignées",
        note: "libyang, pupnp et Zephyr RTOS. Deux portent un identifiant public que vous pouvez consulter : CVE-2026-44673 (CVSS 7,5) et CVE-2026-41682.",
      },
      {
        stat: "28",
        label: "Divulgations coordonnées déposées",
        note: "Signalées par les canaux des éditeurs, sur un cycle de 90 jours.",
      },
      {
        stat: "3",
        label: "Attributions publiques par des tiers",
        note: "wolfSSL, VideoLAN et Red Hat / OpenELA nous créditent nommément.",
      },
      {
        stat: "Lean 4",
        label: "Fidélité de l’encodeur, vérifiée par noyau",
        note: "Le décideur et l’encodeur Z3 sont prouvés équivalents par un théorème vérifié machine, engendré depuis le vrai AST du solveur plutôt que transcrit à la main — la discipline qu’AWS applique à Cedar.",
      },
      {
        stat: "1",
        label: "Commande rejoue la suite",
        note: "reproduce.sh --verify redérive les résultats de vérification de bout en bout.",
      },
      {
        stat: "4",
        label: "Prépublications sur arXiv (cs.CR)",
        note: "Méthodes, jeux de données et cas d’échec publiés à découvert.",
      },
    ],
    papers: {
      eyebrow: "Recherche publiée",
      note: "Quatre prépublications sur arXiv (cs.CR). Lisez les méthodes, contrôlez les chiffres, contredisez-nous en public.",
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
      "Services financiers canadiens. Les agents IA d’arrière-guichet qui déplacent de l’argent.",
    description:
      "Comptes fournisseurs, remboursements, décaissements, changements de bénéficiaire, limites cumulatives, paiements en attente d’approbation humaine. L’acheteur, c’est le risque, la conformité et l’audit interne — pas l’équipe de développement. Nous commençons délibérément étroit, parce qu’un créneau sans comptes nommés n’est encore qu’une catégorie.",
    quote:
      "Elles ne l’utilisent pas pour remplacer le jugement humain ni pour automatiser entièrement des décisions critiques, compte tenu des conséquences financières, juridiques et réputationnelles importantes.",
    quoteSource: "Banque du Canada — Enquête sur le système financier, mai 2026",
    quoteHref:
      "https://www.bankofcanada.ca/2026/05/financial-system-survey-highlights-2026/",
    afterQuote:
      "C’est ce blocage que nous levons. Pas avec une promesse — avec un artefact que l’auditeur de l’institution revérifie sans nous appeler. La même enquête signale la concentration autour d’un petit nombre de fournisseurs d’IA et d’infonuagique comme un risque de stabilité : une preuve portable répond mieux à cette inquiétude que la géographie.",
    alsoLabel: "Le moteur s’applique aussi à",
    also: [
      "Exploitants d’infrastructures critiques",
      "Programmes gouvernementaux et connexes à la défense",
      "Télécommunications",
      "Plateformes d’administration de la santé",
      "Partenaires de modernisation et d’intégration",
      "Logiciels d’entreprise déployant des agents IA",
    ],
  },
  finalCta: {
    eyebrow: "Dans un monde d’incertitude face à l’IA",
    title: "IronProof offre aux institutions quelque chose de rare : la preuve.",
    subhead: "IronProof ne vend pas la confiance. IronProof vend la preuve.",
    offerLabel: "Mandat d’entrée",
    offerName: "Certificat de frontière transactionnelle",
    offerBody:
      "Nous prenons un seul flux qui déplace de l’argent, encodons la frontière qu’il ne doit jamais franchir, prouvons qu’aucun état atteignable ne la franchit, et scellons le certificat. Votre auditeur le vérifie hors ligne. La recertification est déclenchée par votre mise en production, pas par notre calendrier.",
    designPartnerPre:
      "Vous préférez devenir partenaire de conception ? Écrivez-nous à ",
    designPartnerEmail: "hello@ironproof.ai",
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Courriel professionnel",
      company: "Entreprise",
      message: "Que cherchez-vous à vérifier ?",
      submit: "Demander une démo",
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
      "IronProof bâtit de l’infrastructure de sécurité vérifiable pour l’IA et les logiciels critiques. Nous prouvons ce que les agents, le code et la cryptographie ont le droit de faire, et scellons le résultat en preuve post-quantique qu’un tiers revérifie hors ligne — sans nous faire confiance.",
    tagline: "Sécurité vérifiable pour l’IA et les logiciels critiques.",
    country: "Canada",
    copyright: "IronProof. Tous droits réservés.",
  },
};
