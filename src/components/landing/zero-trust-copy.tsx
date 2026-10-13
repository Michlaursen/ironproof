import type { L } from "./i18n";

/*
 * Copy for /zero-trust, in both languages.
 *
 * Every sentence about Zero Trust was read against NIST SP 800-207, "Zero Trust
 * Architecture" (Rose, Borchert, Mitchell, Connelly, August 2020,
 * https://doi.org/10.6028/NIST.SP.800-207):
 *   - the operative definition, section 2 ("least privilege per-request access
 *     decisions");
 *   - policy engine, policy administrator, policy enforcement point, section 3.1;
 *   - section 5.7, "Use of Non-person Entities (NPE) in ZTA Administration",
 *     quoted word for word below.
 *
 * Every sentence about Ironproof reuses wording already on the site:
 *   - hero-copy.ts ("it never executes");
 *   - landing.tsx (the gate decides for an action that goes THROUGH it);
 *   - provable-ai-copy.tsx ("anyone verifies it offline — without having to trust us").
 *
 * Deliberately NOT claimed: that Ironproof is a Zero Trust architecture. It
 * covers the decision on an action; identity, authentication, devices and the
 * network stay with the customer's own Zero Trust stack (section 04).
 */

export type Card = { k: string; t: string; b: string };
export type Row = { zt: string; ip: string };

export type ZeroTrustCopy = {
  eyebrow: string;
  h1: React.ReactNode;
  heroLead: React.ReactNode;

  s01: string;
  s01Title: string;
  s01a: React.ReactNode;
  s01Quote: string;
  s01Source: string;
  s01b: React.ReactNode;

  s02: string;
  s02Title: string;
  s02Lead: React.ReactNode;
  s02Quote: string;
  s02Source: string;
  s02b: React.ReactNode;

  s03: string;
  s03Title: string;
  s03Lead: React.ReactNode;
  colZt: string;
  colIp: string;
  rows: readonly Row[];

  s04: string;
  s04Title: string;
  s04Lead: string;
  limits: readonly Card[];

  s05: string;
  s05Title: React.ReactNode;
  s05a: React.ReactNode;
  s05b: React.ReactNode;
  verifyTag: string;
  verifyTitle: string;
  verifyBody: string;

  s06Phrase: string;

  ctaTitle: string;
  ctaLead: string;
  logoTitle: string;
};

export const ZERO_TRUST_COPY: L<ZeroTrustCopy> = {
  en: {
    eyebrow: "ZERO TRUST",
    h1: (
      <>
        Zero Trust, <span className="metal-shine">extended to actions.</span>
      </>
    ),
    heroLead: (
      <>
        Zero Trust decides who reaches a resource. Ironproof decides whether{" "}
        <span className="metal-text">this exact action</span> may run. Before each critical action
        executes, Ironproof allows it or blocks it against your formal policy, and every allowed
        action leaves sealed evidence anyone can verify offline, without having to trust us.
      </>
    ),

    s01: "01 · WHAT ZERO TRUST IS",
    s01Title: "No implicit trust. A decision for every request.",
    s01a: (
      <>
        Zero Trust is a security model published by the U.S. National Institute of Standards and
        Technology in <span className="metal-text">NIST SP 800-207</span>. Its working definition:
      </>
    ),
    s01Quote:
      "Zero trust (ZT) provides a collection of concepts and ideas designed to minimize uncertainty in enforcing accurate, least privilege per-request access decisions in information systems and services in the face of a network viewed as compromised.",
    s01Source: "NIST SP 800-207, section 2, August 2020",
    s01b: (
      <>
        In that architecture, a policy engine decides, a policy administrator carries the decision,
        and a policy enforcement point opens or closes the path between a subject and a resource.
        The unit of decision is <span className="metal-text">access to a resource</span>.
      </>
    ),

    s02: "02 · THE RISK NIST NAMES",
    s02Title: "An agent can be talked into acting.",
    s02Lead: (
      <>
        Section 5.7 of the same document addresses AI and other software agents, which NIST calls
        non-person entities (NPE):
      </>
    ),
    s02Quote:
      "The associated risk is that an attacker will be able to induce or coerce an NPE to perform some task that the attacker is not privileged to perform.",
    s02Source: "NIST SP 800-207, section 5.7, August 2020",
    s02b: (
      <>
        The agent may hold valid credentials and a legitimate session. Access is granted. The
        question that remains is the one Zero Trust leaves open at the level of a single act:{" "}
        <span className="metal-text">should this action, with these parameters, run now?</span>
      </>
    ),

    s03: "03 · WHAT IRONPROOF ADDS",
    s03Title: "The same principle, one level down.",
    s03Lead: (
      <>
        Ironproof applies the Zero Trust idea to the action itself. A compliant action goes through
        without friction; an action the policy does not permit never runs. For an action that goes
        through Ironproof, the decision is made before execution, not reviewed after.
      </>
    ),
    colZt: "Zero Trust (NIST SP 800-207)",
    colIp: "Ironproof",
    rows: [
      {
        zt: "Verify explicitly, per request",
        ip: "Every critical action is evaluated against your formal policy before it runs",
      },
      {
        zt: "Least privilege on access",
        ip: "Least privilege on the act: the amount, the target, the sequence, not only the session",
      },
      {
        zt: "Policy enforcement point in front of the resource",
        ip: "A gate in front of the action: allow or block, nothing in between",
      },
      {
        zt: "Decisions logged",
        ip: "Every allowed action sealed post-quantum, verifiable offline without having to trust us",
      },
      {
        zt: "Policy written by the enterprise",
        ip: "The policy itself is proven: we show the exact case where it breaks, or prove there is none",
      },
    ],

    s04: "04 · WHAT IRONPROOF IS NOT",
    s04Title: "Not a Zero Trust architecture. A layer inside one.",
    s04Lead:
      "Zero Trust is an enterprise-wide architecture. Ironproof covers one decision in it. Saying more would be a claim we cannot back.",
    limits: [
      {
        k: "IDENTITY",
        t: "We do not authenticate users or agents.",
        b: "Who the agent is, and whether its credentials are valid, stays with your identity provider. Ironproof decides on what the agent asks to do.",
      },
      {
        k: "NETWORK AND DEVICES",
        t: "We do not segment networks or assess devices.",
        b: "Micro-segmentation, device posture and session control stay with your existing Zero Trust stack.",
      },
      {
        k: "PERIMETER",
        t: "Only what goes through the gate.",
        b: "An action that reaches your systems by another path is outside Ironproof's decision. The guarantee covers the actions routed through it, and says so.",
      },
    ],

    s05: "05 · ZERO TRUST, APPLIED TO US",
    s05Title: (
      <>
        Do not trust us either. <span className="metal-shine">Verify.</span>
      </>
    ),
    s05a: (
      <>
        A Zero Trust page that asks you to take the vendor&apos;s word would contradict itself.
        Every allowed action leaves a sealed record. You check it offline, with no network and no
        Ironproof code, byte for byte.
      </>
    ),
    s05b: <>The verifier is public, along with the canonical format it checks.</>,
    verifyTag: "VERIFY A PROOF",
    verifyTitle: "Check a sealed record yourself",
    verifyBody: "The offline verifier, the canonical format, and a sample record to run it on.",

    s06Phrase: "Zero Trust asked who gets in. We answer what runs.",

    ctaTitle: "See the gate on one of your workflows",
    ctaLead: "Pick one action your agents take. We write the rule with you, prove it, and hand you the record.",
    logoTitle: "Ironproof",
  },

  fr: {
    eyebrow: "ZERO TRUST",
    h1: (
      <>
        Le Zero Trust, <span className="metal-shine">étendu aux actions.</span>
      </>
    ),
    heroLead: (
      <>
        Le Zero Trust décide qui atteint une ressource. Ironproof décide si{" "}
        <span className="metal-text">cette action précise</span> peut s’exécuter. Avant chaque
        action critique, Ironproof l’autorise ou la bloque selon votre politique formelle, et chaque
        action autorisée laisse une preuve scellée que n’importe qui vérifie hors ligne, sans avoir
        à nous croire.
      </>
    ),

    s01: "01 · CE QU’EST LE ZERO TRUST",
    s01Title: "Aucune confiance implicite. Une décision par demande.",
    s01a: (
      <>
        Le Zero Trust est un modèle de sécurité publié par le National Institute of Standards and
        Technology des États-Unis dans la <span className="metal-text">NIST SP 800-207</span>. Sa
        définition de travail :
      </>
    ),
    s01Quote:
      "Zero trust (ZT) provides a collection of concepts and ideas designed to minimize uncertainty in enforcing accurate, least privilege per-request access decisions in information systems and services in the face of a network viewed as compromised.",
    s01Source: "NIST SP 800-207, section 2, août 2020",
    s01b: (
      <>
        Dans cette architecture, un moteur de politique décide, un administrateur de politique
        transmet la décision, et un point d’application ouvre ou ferme le chemin entre un sujet et
        une ressource. L’unité de décision est <span className="metal-text">l’accès à une ressource</span>.
      </>
    ),

    s02: "02 · LE RISQUE QUE NOMME LE NIST",
    s02Title: "Un agent peut être amené à agir.",
    s02Lead: (
      <>
        La section 5.7 du même document traite des agents logiciels et d’IA, que le NIST appelle
        entités non humaines (NPE) :
      </>
    ),
    s02Quote:
      "The associated risk is that an attacker will be able to induce or coerce an NPE to perform some task that the attacker is not privileged to perform.",
    s02Source: "NIST SP 800-207, section 5.7, août 2020",
    s02b: (
      <>
        L’agent peut détenir des identifiants valides et une session légitime. L’accès est accordé.
        Reste la question que le Zero Trust laisse ouverte au niveau d’un acte :{" "}
        <span className="metal-text">cette action, avec ces paramètres, doit-elle s’exécuter maintenant ?</span>
      </>
    ),

    s03: "03 · CE QU’AJOUTE IRONPROOF",
    s03Title: "Le même principe, un niveau plus bas.",
    s03Lead: (
      <>
        Ironproof applique l’idée du Zero Trust à l’action elle-même. Une action conforme passe sans
        friction ; une action que la politique ne permet pas ne s’exécute jamais. Pour une action
        qui passe par Ironproof, la décision est prise avant l’exécution, pas révisée après.
      </>
    ),
    colZt: "Zero Trust (NIST SP 800-207)",
    colIp: "Ironproof",
    rows: [
      {
        zt: "Vérifier explicitement, à chaque demande",
        ip: "Chaque action critique est évaluée contre votre politique formelle avant de s’exécuter",
      },
      {
        zt: "Moindre privilège sur l’accès",
        ip: "Moindre privilège sur l’acte : le montant, la cible, la séquence, pas seulement la session",
      },
      {
        zt: "Point d’application devant la ressource",
        ip: "Une porte devant l’action : autoriser ou bloquer, rien entre les deux",
      },
      {
        zt: "Décisions journalisées",
        ip: "Chaque action autorisée scellée post-quantique, vérifiable hors ligne sans avoir à nous croire",
      },
      {
        zt: "Politique écrite par l’entreprise",
        ip: "La politique elle-même est prouvée : on montre le cas exact où elle cède, ou on prouve qu’il n’y en a aucun",
      },
    ],

    s04: "04 · CE QU’IRONPROOF N’EST PAS",
    s04Title: "Pas une architecture Zero Trust. Une couche à l’intérieur.",
    s04Lead:
      "Le Zero Trust est une architecture d’entreprise. Ironproof en couvre une décision. En dire plus serait une affirmation qu’on ne peut pas soutenir.",
    limits: [
      {
        k: "IDENTITÉ",
        t: "Nous n’authentifions ni les utilisateurs ni les agents.",
        b: "Qui est l’agent, et si ses identifiants sont valides, reste chez votre fournisseur d’identité. Ironproof décide de ce que l’agent demande de faire.",
      },
      {
        k: "RÉSEAU ET APPAREILS",
        t: "Nous ne segmentons pas le réseau et n’évaluons pas les appareils.",
        b: "La micro-segmentation, l’état des appareils et le contrôle de session restent dans votre pile Zero Trust existante.",
      },
      {
        k: "PÉRIMÈTRE",
        t: "Seulement ce qui passe par la porte.",
        b: "Une action qui atteint vos systèmes par un autre chemin est hors de la décision d’Ironproof. La garantie couvre les actions qui passent par lui, et le dit.",
      },
    ],

    s05: "05 · LE ZERO TRUST, APPLIQUÉ À NOUS",
    s05Title: (
      <>
        Ne nous croyez pas non plus. <span className="metal-shine">Vérifiez.</span>
      </>
    ),
    s05a: (
      <>
        Une page Zero Trust qui vous demanderait de croire le fournisseur sur parole se contredirait.
        Chaque action autorisée laisse un dossier scellé. Vous le vérifiez hors ligne, sans réseau
        et sans code d’Ironproof, octet par octet.
      </>
    ),
    s05b: <>Le vérificateur est public, avec le format canonique qu’il vérifie.</>,
    verifyTag: "VÉRIFIER UNE PREUVE",
    verifyTitle: "Vérifiez vous-même un dossier scellé",
    verifyBody: "Le vérificateur hors ligne, le format canonique, et un dossier d’exemple pour l’essayer.",

    s06Phrase: "Le Zero Trust a demandé qui entre. Nous répondons à ce qui s’exécute.",

    ctaTitle: "Voyez la porte sur l’un de vos processus",
    ctaLead:
      "Choisissez une action que prennent vos agents. Nous écrivons la règle avec vous, nous la prouvons, et nous vous remettons le registre.",
    logoTitle: "Ironproof",
  },
};
