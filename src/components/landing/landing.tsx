import { IronProofLogo } from "@/components/ironproof-logo";
import { LandingHeader } from "./landing-header";
import { ProofSeal } from "./proof-seal";
import { ProofArtifact } from "./proof-artifact";
import { FadeUpInit } from "./fade-up-init";
import { RefundDemo } from "./refund-demo";
import { Counterexample } from "./counterexample";
import { VerifyArtifact } from "./verify-artifact";
import { GateDiagram } from "./gate-diagram";
import { ProofPipeline } from "./proof-pipeline";
import { SequenceProof } from "./sequence-proof";
import { DeployGate } from "./deploy-gate";
import { CtaForm } from "./cta-form";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money, count, NBSP } from "./i18n";

/*
 * The Ironproof landing.
 *
 * Ordered so the visitor meets the product before the mechanism:
 *   authorization  = the product      (what is bought)
 *   formal methods = the mechanism    (how the boundary is established)
 *   cryptography   = the evidence     (what is kept, and re-checked)
 *
 * Everything named Z3, ML-DSA or post-quantum therefore lives below the fold
 * of the argument, not inside the pitch. Anchor ids are load
 * bearing: the header links #how, #initiators, #start and #verify, and the
 * research page links #counterexample.
 *
 * Copy lives in the T dictionary below and in each child component's own
 * dictionary, read through `pick`. Nothing on this page is written inline any
 * more: a string in the JSX is a string that only exists in one language, and
 * that is exactly how /fr spent months rendering an English page.
 *
 * The numbers are NOT in the dictionary. Amounts are declared once as figures
 * and formatted per locale by `money`, so the French and the English page
 * cannot disagree about what a cap is.
 */

const DAILY_CAP = 1000;
const REFUND_OK = 640;
const REFUND_SPLIT = 600;
const REFUND_COMBINED = 1200;
const BULK_RECORDS = 40000;
const BULK_THRESHOLD = 1000;
const WIRE = 250000;

type Action = {
  kind: string;
  ask: string;
  /** `true` = the gate lets it through. The tag text comes from the copy. */
  allow: boolean;
  why: string;
};

type Layer = { tag: string; title: string; body: string };
type Framework = { where: string; rules: string };

type Copy = {
  allow: string;
  block: string;

  hero: {
    eyebrow: string;
    headline: string;
    body: React.ReactNode;
    boundary: string;
    initiators: string;
    authorized: string;
    unauthorized: string;
    executes: string;
    refused: string;
    ctaTry: string;
    ctaVerify: string;
    logoTitle: string;
  };

  takeaway: React.ReactNode;
  blockIsNotSilence: string;

  creditedBy: string;

  actions: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    tableLabel: string;
    illustrative: string;
    items: readonly Action[];
    frameworksLabel: string;
    frameworks: readonly Framework[];
  };

  breathFrameworks: React.ReactNode;

  gate: {
    eyebrow: string;
    title: string;
    lead: string;
    foot: string;
  };

  layers: { eyebrow: string; titleA: string; titleB: string; items: readonly Layer[] };

  breathCounterexample: React.ReactNode;
  breathCoverage: React.ReactNode;

  why: {
    eyebrow: string;
    title: React.ReactNode;
    lead: string;
    testVsProof: React.ReactNode;
    scope: string;
  };

  how: {
    eyebrow: string;
    title: string;
    lead: string;
    compiler: string;
    recordPre: string;
    recordLink: string;
  };

  engine: {
    eyebrow: string;
    title: string;
    lead: React.ReactNode;
    cta: string;
  };

  cta: { title: string; lead: string };

  footer: string;
};

const T: L<Copy> = {
  en: {
    allow: "ALLOW",
    block: "BLOCK",

    hero: {
      eyebrow: "THE AUTHORIZATION LAYER FOR CRITICAL ACTIONS",
      headline: "If it isn't authorized, it never executes.",
      body: (
        <>
          Ironproof checks every critical action before it executes. If it's authorized, it runs. If
          it isn't, Ironproof <span className="metal-text">blocks it</span>{" "}&mdash; and creates
          evidence anyone can verify.
        </>
      ),
      boundary: "One boundary. Any initiator.",
      initiators: "AI agent. API. Script. Person.",
      authorized: "AUTHORIZED",
      unauthorized: "UNAUTHORIZED",
      executes: "EXECUTES",
      refused: "BLOCKED",
      ctaTry: "BLOCK ONE YOURSELF",
      ctaVerify: "CHECK A REAL SEAL",
      logoTitle: "Ironproof monogram",
    },

    takeaway: (
      <>
        Ironproof stops unauthorized critical actions from executing
        <span className="text-neutral-500"> &mdash; </span>
        <span className="metal-text">and cryptographically seals every decision,</span> allow or
        block.
      </>
    ),
    blockIsNotSilence:
      "A block is not a silence. It is an artifact stating what was requested, which policy was in force, and why the action did not run.",

    creditedBy: "SECURITY RESEARCH BY IRONPROOF — CREDITED BY",

    actions: {
      eyebrow: "WHICH ACTIONS",
      titleA: "Move money. Grant access.",
      titleB: "Delete records. Ship a change.",
      lead: "The actions that cannot be taken back once they run. For those, authorization stops being a setting and becomes infrastructure.",
      tableLabel: "WHAT WAS REQUESTED — AND WHAT HAPPENED",
      illustrative: "Illustrative decisions under a sample policy.",
      items: [
        {
          kind: "PAYMENT",
          ask: `Refund ${money(REFUND_OK, "en")} to a payee already on file`,
          allow: true,
          why: `Below the ${money(DAILY_CAP, "en")} daily cap. Two authorized approvers are on record.`,
        },
        {
          kind: "CUMULATIVE LIMIT",
          ask: `Refund ${money(REFUND_SPLIT, "en")} to a payee who already received ${money(REFUND_SPLIT, "en")} today`,
          allow: false,
          why: `The refund is individually within the limit. The combined total would reach ${money(REFUND_COMBINED, "en")} — so the second refund never executes.`,
        },
        {
          kind: "PRIVILEGE ESCALATION",
          ask: "Grant admin access to a service account",
          allow: false,
          why: "Privileged access requires an open change ticket and two authorized approvers. Neither is present.",
        },
        {
          kind: "DELETION",
          ask: `Delete ${count(BULK_RECORDS, "en")} inactive customer records`,
          allow: false,
          why: `Bulk deletion above ${count(BULK_THRESHOLD, "en")} records requires a verified retention-hold check. None is recorded.`,
        },
        {
          kind: "DEPLOYMENT",
          ask: "Push a configuration change to the payment rail",
          allow: false,
          why: "The approved change window is closed, and the rollback plan is unsigned.",
        },
        {
          kind: "IRREVERSIBLE ACTION",
          ask: `Wire ${money(WIRE, "en")} to a beneficiary added last month`,
          allow: true,
          why: "The cooling-off period has elapsed and dual authorization is on record. Because the wire cannot be recalled, authorization is decided before it is sent.",
        },
      ],
      frameworksLabel: "WHERE THE POLICY ALREADY EXISTS ON PAPER",
      frameworks: [
        { where: "Financial services", rules: "OSFI E-23 · SOX · AML programs" },
        { where: "Healthcare", rules: "HIPAA · PHIPA · device software" },
        { where: "Government", rules: "Directive on Automated Decision-Making" },
        { where: "Critical infrastructure", rules: "IEC 62443 · change control" },
        { where: "Software delivery", rules: "SOC 2 change management · release gates" },
        { where: "Data platforms", rules: "Retention holds · privacy law (Law 25, PIPEDA)" },
      ],
    },

    breathFrameworks: (
      <>
        These frameworks already say what must never happen. Ironproof turns that sentence into{" "}
        <span className="metal-text">a boundary the system cannot cross</span>, and into evidence
        the regulator can re-check.
      </>
    ),

    gate: {
      eyebrow: "ONE GATE, ANY INITIATOR",
      title: "The gate does not ask who is asking.",
      lead: "It asks whether the action is inside the policy in force. The same check applies to every path that can reach a critical system — which is why this is not an AI problem with an AI answer.",
      foot: "Every authorization records the requesting actor, the policy version and the action. Nothing executes without spending a single-use grant bound to that exact decision.",
    },

    layers: {
      eyebrow: "HOW THE PIECES SIT",
      titleA: "You buy authorization.",
      titleB: "The rest is how it holds.",
      items: [
        {
          tag: "THE PRODUCT",
          title: "Authorization",
          body: "A boundary a critical action cannot cross. That is what you deploy, and what the policy owner signs off on.",
        },
        {
          tag: "THE MECHANISM",
          title: "Formal verification",
          body: "How the boundary is established rather than hoped for: the property is checked across the modeled action space, for a sequence of any length — not for a sample of cases.",
        },
        {
          tag: "THE EVIDENCE",
          title: "Cryptographic proof",
          body: "What outlives the decision. Every allow and every block leaves a sealed artifact your auditor re-checks on their own machine.",
        },
      ],
    },

    breathCounterexample: (
      <>
        Take the clause out and the proof collapses. That is what makes the certificate
        load-bearing rather than decorative:{" "}
        <span className="metal-text">a green that can never turn red is worth nothing</span>.
      </>
    ),
    breathCoverage: (
      <>
        Ironproof does not claim coverage it has not modeled.{" "}
        <span className="metal-text">
          Every certificate states what was proven &mdash; and what was not.
        </span>
      </>
    ),

    why: {
      eyebrow: "WHY THIS IS DIFFERENT",
      title: (
        <>
          We don't test your system <span className="text-neutral-500">&mdash;</span>{" "}
          <span className="metal-shine">we prove it</span>.
        </>
      ),
      lead: "You walk away with one of two things: the exact case that breaks it, or the proof that no such case exists. Either way, you re-run that proof yourself — in your own tools, without trusting us.",
      testVsProof: (
        <>
          A test tells you what it tried.{" "}
          <span className="metal-text">A proof tells you what's impossible.</span>
        </>
      ),
      scope: "Proven within the boundary you define. The certificate states that boundary.",
    },

    how: {
      eyebrow: "HOW IT WORKS",
      title: "Prove. Enforce. Seal. Verify.",
      lead: "Ironproof mathematically checks that no reachable sequence of actions can cross the defined authorization boundary.",
      compiler:
        "Your written policy is compiled into mathematics by a deterministic compiler — the same one the runtime uses. A differential check fails the build if the two ever diverge.",
      recordPre:
        "The theorem that ties the runtime fast path to the full formal model, and the equivalence checks behind it, are in the ",
      recordLink: "technical record",
    },

    engine: {
      eyebrow: "THE SAME ENGINE",
      title: "Same proof engine. Proven on real vulnerabilities.",
      lead: (
        <>
          Findings by <span className="metal-text">Dominik Blain</span>{" "}
          and Cobalt, credited on the
          projects' own repositories &mdash; published research, assigned CVEs and public upstream
          acknowledgements.
        </>
      ),
      cta: "VIEW TECHNICAL RECORD",
    },

    cta: {
      title: "Put one critical action behind the boundary.",
      lead: "Choose a payment, access grant, deletion, or deployment. Ironproof will define the authorization boundary, prove it, enforce it at runtime, and produce an independently verifiable record.",
    },

    footer: "Deterministic authorization. Independently verifiable proof.",
  },

  fr: {
    allow: "AUTORISÉ",
    block: "BLOQUÉ",

    hero: {
      eyebrow: "LA COUCHE D’AUTORISATION DES ACTIONS CRITIQUES",
      headline: "Si ce n’est pas autorisé, il n’y a pas d’exécution.",
      body: (
        <>
          Ironproof vérifie chaque action critique avant qu’elle s’exécute. Si elle est autorisée,
          elle passe. Sinon, Ironproof <span className="metal-text">la bloque</span>{" "}&mdash; et
          produit une preuve mathématique que n’importe qui peut vérifier.
        </>
      ),
      boundary: "Une seule frontière. Peu importe qui demande.",
      initiators: "Agent IA. API. Script. Humain.",
      authorized: "AUTORISÉE",
      unauthorized: "NON AUTORISÉE",
      executes: "S’EXÉCUTE",
      refused: "BLOQUÉE",
      ctaTry: "BLOQUEZ-EN UNE VOUS-MÊME",
      ctaVerify: "VÉRIFIEZ UN VRAI SCEAU",
      logoTitle: "Monogramme Ironproof",
    },

    takeaway: (
      <>
        Ironproof empêche les actions critiques non autorisées de s’exécuter
        <span className="text-neutral-500"> &mdash; </span>
        <span className="metal-text">et scelle cryptographiquement chaque décision,</span> qu’elle
        passe ou qu’elle bloque.
      </>
    ),
    blockIsNotSilence: `Un blocage n’est pas un silence. C’est un artefact qui dit ce qui a été demandé, quelle politique s’appliquait, et pourquoi l’action ne s’est pas exécutée.`,

    creditedBy: "RECHERCHE EN SÉCURITÉ PAR IRONPROOF — CRÉDITÉE PAR",

    actions: {
      eyebrow: "QUELLES ACTIONS",
      titleA: "Déplacer de l’argent. Donner un accès.",
      titleB: "Supprimer des dossiers. Livrer un changement.",
      lead: "Les actions qu’on ne peut plus reprendre une fois exécutées. Pour celles-là, l’autorisation cesse d’être un réglage et devient une infrastructure.",
      tableLabel: "CE QUI A ÉTÉ DEMANDÉ — ET CE QUI S’EST PASSÉ",
      illustrative: "Décisions illustratives sous une politique d’exemple.",
      items: [
        {
          kind: "PAIEMENT",
          ask: `Rembourser ${money(REFUND_OK, "fr")} à un bénéficiaire déjà au dossier`,
          allow: true,
          why: `Sous le plafond quotidien de ${money(DAILY_CAP, "fr")}. Deux approbateurs autorisés sont au dossier.`,
        },
        {
          kind: "LIMITE CUMULATIVE",
          ask: `Rembourser ${money(REFUND_SPLIT, "fr")} à un bénéficiaire qui a déjà reçu ${money(REFUND_SPLIT, "fr")} aujourd’hui`,
          allow: false,
          why: `Pris seul, le remboursement respecte la limite. Le total combiné atteindrait ${money(REFUND_COMBINED, "fr")} — le deuxième remboursement ne s’exécute donc jamais.`,
        },
        {
          kind: "ÉLÉVATION DE PRIVILÈGES",
          ask: "Accorder un accès administrateur à un compte de service",
          allow: false,
          why: "Un accès privilégié exige un billet de changement ouvert et deux approbateurs autorisés. Ni l’un ni l’autre n’est présent.",
        },
        {
          kind: "SUPPRESSION",
          ask: `Supprimer ${count(BULK_RECORDS, "fr")} dossiers clients inactifs`,
          allow: false,
          why: `Une suppression en lot de plus de ${count(BULK_THRESHOLD, "fr")} dossiers exige une vérification de gel de conservation. Aucune n’est consignée.`,
        },
        {
          kind: "DÉPLOIEMENT",
          ask: "Pousser un changement de configuration sur le rail de paiement",
          allow: false,
          why: "La fenêtre de changement approuvée est fermée, et le plan de retour arrière n’est pas signé.",
        },
        {
          kind: "ACTION IRRÉVERSIBLE",
          ask: `Virer ${money(WIRE, "fr")} à un bénéficiaire ajouté le mois dernier`,
          allow: true,
          why: "Le délai de carence est écoulé et la double autorisation est au dossier. Comme un virement ne se rappelle pas, l’autorisation se décide avant l’envoi.",
        },
      ],
      frameworksLabel: "OÙ LA POLITIQUE EXISTE DÉJÀ SUR PAPIER",
      frameworks: [
        { where: "Services financiers", rules: "BSIF E-23 · SOX · programmes LBA" },
        { where: "Santé", rules: "HIPAA · PHIPA · logiciels de dispositifs médicaux" },
        { where: "Gouvernement", rules: "Directive sur la prise de décisions automatisée" },
        { where: "Infrastructures critiques", rules: "IEC 62443 · gestion du changement" },
        {
          where: "Livraison logicielle",
          rules: "Gestion du changement SOC 2 · barrières de mise en production",
        },
        {
          where: "Plateformes de données",
          rules: "Gels de conservation · lois sur la vie privée (loi 25, LPRPDE)",
        },
      ],
    },

    breathFrameworks: (
      <>
        Ces cadres disent déjà ce qui ne doit jamais arriver. Ironproof transforme cette phrase en{" "}
        <span className="metal-text">une frontière que le système ne peut pas franchir</span>, et en
        une preuve que le régulateur peut revérifier.
      </>
    ),

    gate: {
      eyebrow: "UNE SEULE BARRIÈRE, PEU IMPORTE QUI DEMANDE",
      title: "La barrière ne demande pas qui demande.",
      lead: "Elle demande si l’action est à l’intérieur de la politique en vigueur. La même vérification s’applique à tous les chemins qui mènent à un système critique — c’est pourquoi ce n’est pas un problème d’IA qui appelle une réponse d’IA.",
      foot: "Chaque autorisation consigne l’acteur qui demande, la version de la politique et l’action. Rien ne s’exécute sans dépenser un jeton à usage unique lié à cette décision exacte.",
    },

    layers: {
      eyebrow: "COMMENT LES PIÈCES S’EMBOÎTENT",
      titleA: "Vous achetez de l’autorisation.",
      titleB: "Le reste, c’est ce qui la fait tenir.",
      items: [
        {
          tag: "LE PRODUIT",
          title: "L’autorisation",
          body: "Une frontière qu’une action critique ne peut pas franchir. C’est ce que vous déployez, et ce que le responsable de la politique approuve.",
        },
        {
          tag: "LE MÉCANISME",
          title: "La vérification formelle",
          body: `Comment la frontière est établie plutôt qu’espérée${NBSP}: la propriété est vérifiée sur tout l’espace d’actions modélisé, pour une séquence de n’importe quelle longueur — pas sur un échantillon de cas.`,
        },
        {
          tag: "LA PREUVE",
          title: "La preuve cryptographique",
          body: "Ce qui survit à la décision. Chaque autorisation et chaque blocage laisse un artefact scellé que votre auditeur revérifie sur sa propre machine.",
        },
      ],
    },

    breathCounterexample: (
      <>
        Retirez la clause et la preuve s’effondre. C’est ce qui rend le certificat porteur plutôt
        que décoratif{NBSP}:{" "}
        <span className="metal-text">un vert qui ne peut jamais virer au rouge ne vaut rien</span>.
      </>
    ),
    breathCoverage: (
      <>
        Ironproof ne revendique pas une couverture qu’il n’a pas modélisée.{" "}
        <span className="metal-text">
          Chaque certificat dit ce qui a été prouvé &mdash; et ce qui ne l’a pas été.
        </span>
      </>
    ),

    why: {
      eyebrow: "CE QUI NOUS DISTINGUE",
      title: (
        <>
          On ne teste pas votre système <span className="text-neutral-500">&mdash;</span>{" "}
          <span className="metal-shine">on le prouve</span>.
        </>
      ),
      lead: `Vous repartez avec l’une de deux choses${NBSP}: le cas exact qui le casse, ou la preuve qu’aucun tel cas n’existe. Dans les deux cas, vous rejouez cette preuve vous-même — avec vos propres outils, sans avoir à nous croire.`,
      testVsProof: (
        <>
          Un test vous dit ce qu’il a essayé.{" "}
          <span className="metal-text">Une preuve vous dit ce qui est impossible.</span>
        </>
      ),
      scope: "Prouvé à l’intérieur de la frontière que vous définissez. Le certificat énonce cette frontière.",
    },

    how: {
      eyebrow: "COMMENT ÇA MARCHE",
      title: "Prouver. Appliquer. Sceller. Vérifier.",
      lead: "Ironproof vérifie mathématiquement qu’aucune séquence d’actions atteignable ne peut franchir la frontière d’autorisation définie.",
      compiler:
        "Votre politique écrite est compilée en mathématiques par un compilateur déterministe — le même que celui qu’utilise le runtime. Un contrôle différentiel fait échouer la compilation si les deux divergent.",
      recordPre:
        "Le théorème qui relie le chemin rapide du runtime au modèle formel complet, et les contrôles d’équivalence derrière lui, sont dans le ",
      recordLink: "dossier technique",
    },

    engine: {
      eyebrow: "LE MÊME MOTEUR",
      title: "Le même moteur de preuve. Éprouvé sur de vraies vulnérabilités.",
      lead: (
        <>
          Découvertes par <span className="metal-text">Dominik Blain</span>{" "}
          et Cobalt, créditées sur
          les dépôts des projets eux-mêmes &mdash; recherche publiée, CVE assignées et
          remerciements publics en amont.
        </>
      ),
      cta: "VOIR LE DOSSIER TECHNIQUE",
    },

    cta: {
      title: "Mettez une action critique derrière la frontière.",
      lead: "Choisissez un paiement, un octroi d’accès, une suppression ou un déploiement. Ironproof définira la frontière d’autorisation, la prouvera, l’appliquera à l’exécution et produira une trace vérifiable de façon indépendante.",
    },

    footer: "Autorisation déterministe. Preuve vérifiable de façon indépendante.",
  },
};

export function Landing({ locale = defaultLocale }: { locale?: Locale }) {
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const t = pick(T, locale);

  return (
    <div className="flex flex-1 flex-col">
      {/* NAV */}
      <LandingHeader locale={locale} />

      <main className="flex-1">
        {/* HERO — the product, in one sentence, before any mechanism */}
        <section id="top" className="relative z-10 flex min-h-[86vh] items-center px-6 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <IronProofLogo
                width={210}
                height={280}
                className="h-[200px] w-[150px] drop-shadow-2xl md:h-[280px] md:w-[210px]"
                title={t.hero.logoTitle}
              />
              <span className="track-logo iron-text mt-4 text-2xl font-semibold md:mt-6 md:text-4xl">
                IRONPROOF
              </span>
            </div>
            <div className="fade-up">
              <p className="seal-label track-wide mb-6 text-xs md:text-sm">
                {t.hero.eyebrow}
              </p>
              <h1 className="mb-6 font-serif font-medium leading-[0.98] sm:leading-[0.95]">
                <span className="metal-shine block text-4xl sm:text-5xl md:text-7xl">
                  {t.hero.headline}
                </span>
              </h1>
              <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-neutral-400 sm:text-lg sm:leading-snug sm:text-neutral-300 md:text-xl">
                {t.hero.body}
              </p>
              <div className="mb-6 max-w-xl">
                <p className="text-base font-medium text-neutral-200 md:text-lg">
                  {t.hero.boundary}
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-neutral-400">
                  {t.hero.initiators}
                </p>
                <p className="track-mid mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-300 sm:text-sm">
                  <span className="whitespace-nowrap">
                    {t.hero.authorized} &rarr; {t.hero.executes}
                  </span>
                  <span className="whitespace-nowrap">
                    {t.hero.unauthorized} &rarr;{" "}
                    <span className="metal-text">{t.hero.refused}</span>
                  </span>
                </p>
              </div>
              <div className="hairline mb-10 h-px w-full max-w-md" />
              <div className="flex flex-wrap gap-4">
                {/* Both used to land on more prose — a section title is not a
                  * reward for a click. These two go to the only places on the
                  * page where the reader DOES something: move a limit and watch
                  * the verdict flip, then check a real seal in their own tab. */}
                <a
                  href="#try"
                  className="track-mid bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  {t.hero.ctaTry}
                </a>
                <a
                  href="#verify"
                  className="chip-metal track-mid px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
                >
                  {t.hero.ctaVerify}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* THE TEN-SECOND TAKEAWAY — then the two artifacts that prove the sentence */}
        <section id="evidence" className="relative z-10 edge-t px-6 py-16 md:px-14 md:py-20">
          <p className="fade-up mx-auto max-w-4xl text-center font-serif text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl md:text-4xl">
            {t.takeaway}
          </p>
          <div className="fade-up mx-auto mt-12 grid max-w-3xl justify-items-center gap-6 sm:grid-cols-2">
            <ProofArtifact kind="allowed" locale={locale} />
            <ProofArtifact kind="blocked" locale={locale} />
          </div>
          <p className="fade-up mx-auto mt-10 max-w-2xl text-center text-sm font-light leading-relaxed text-neutral-400 md:text-base">
            {t.blockIsNotSilence}
          </p>
        </section>

        {/* TRY IT — the reader blocks one themselves, right after seeing the two
            sealed artifacts the sentence above promises. Kept high on the page:
            the strongest demonstration should not wait behind the argument. */}
        <RefundDemo locale={locale} />

        {/* CREDITED-BY STRIP */}
        <section className="relative z-10 edge-t px-6 py-8 md:px-14">
          <div className="fade-up mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="track-mid text-xs text-neutral-500">{t.creditedBy}</span>
            {["IBM", "GnuPG", "Mozilla", "Red Hat", "wolfSSL", "VideoLAN", "DCMTK"].map((o) => (
              <span key={o} className="metal-text text-sm font-medium">
                {o}
              </span>
            ))}
          </div>
        </section>

        {/* WHICH ACTIONS — the concrete problem, before any mechanism */}
        <section id="start" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.actions.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.actions.titleA}
              <br />
              {t.actions.titleB}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.actions.lead}</p>
          </div>

          <p className="track-mid fade-up mb-6 text-xs text-neutral-400">{t.actions.tableLabel}</p>
          <div className="fade-up grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {t.actions.items.map((c) => (
              <div
                key={c.ask}
                className={`card-premium flex flex-col p-6 ${
                  c.allow ? "card-allow" : "card-block"
                }`}
              >
                <p className="track-mid mb-3 text-[10px] text-neutral-500">{c.kind}</p>
                <p className="mb-5 font-serif text-xl leading-snug text-neutral-100">{c.ask}</p>
                <div className="mt-auto border-t border-white/5 pt-4">
                  <span
                    className={`verdict-tag ${c.allow ? "verdict-allow" : "verdict-block"}`}
                  >
                    {c.allow ? t.allow : t.block}
                  </span>
                  <p className="mt-3 text-sm font-light leading-relaxed text-neutral-400">{c.why}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fade-up mt-6 text-xs text-neutral-500">{t.actions.illustrative}</p>

          <div className="card-premium card-iron fade-up mt-12 p-10 md:p-12">
            <p className="track-mid mb-6 text-xs text-neutral-400">{t.actions.frameworksLabel}</p>
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.actions.frameworks.map((i) => (
                <div key={i.where}>
                  <p className="metal-text font-serif text-xl">{i.where}</p>
                  <p className="mt-1 text-sm font-light text-neutral-400">{i.rules}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BREATH — the frameworks exist; this is what Ironproof does with them */}
        <section className="relative z-10 px-6 py-32 md:px-14 md:py-40">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="breath-mark" aria-hidden="true" />
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-400 sm:text-3xl md:text-4xl">
              {t.breathFrameworks}
            </p>
          </div>
        </section>

        {/* THE SEQUENCE — the centre of the argument */}
        <SequenceProof locale={locale} />

        {/* ONE GATE, ANY INITIATOR */}
        <section id="initiators" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="fade-up mb-12 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.gate.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.gate.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.gate.lead}</p>
          </div>
          <GateDiagram locale={locale} />
          <p className="fade-up mt-10 max-w-2xl text-sm font-light text-neutral-400">
            {t.gate.foot}
          </p>
        </section>

        {/* PRODUCT / MECHANISM / EVIDENCE */}
        <section id="layers" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-14 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.layers.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.layers.titleA}
              <br />
              {t.layers.titleB}
            </h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {t.layers.items.map((l, i) => (
              <li key={l.title} className="card-premium fade-up p-8 md:p-10">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="num-badge font-serif text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="track-mid text-[10px] text-neutral-500">{l.tag}</p>
                </div>
                <h3 className="metal-text mb-3 font-serif text-2xl">{l.title}</h3>
                <p className="text-sm font-light leading-relaxed text-neutral-300">{l.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WHAT A COUNTEREXAMPLE LOOKS LIKE */}
        <Counterexample locale={locale} />

        {/* BREATH — what the counterexample was for */}
        <section className="relative z-10 px-6 py-32 md:px-14 md:py-40">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="breath-mark" aria-hidden="true" />
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-400 sm:text-3xl md:text-4xl">
              {t.breathCounterexample}
            </p>
            <p className="mt-10 font-serif text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl md:text-4xl">
              {t.breathCoverage}
            </p>
          </div>
        </section>

        {/* ── from here down: the mechanism, then the evidence ── */}

        {/* WHY THIS IS DIFFERENT — the commercial form of "testing vs proving".
          * The full two-column comparison moved to /proof on 2026-09-10 because
          * it stalled the page between "why is this different" and "prove it";
          * nothing replaced it here. This is the replacement: same idea, two
          * sentences, zero solver vocabulary. The reader who wants the mechanism
          * gets it in the very next section. Scope is deliberately stated once,
          * at the end, rather than hedged into every sentence — diluting the
          * caveat everywhere is the mirror error of overclaiming. */}
        <section id="why" className="relative z-10 px-6 py-32 md:px-14 md:py-40">
          <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="seal-label track-mid mb-8 text-xs">{t.why.eyebrow}</p>
            <h2 className="font-serif text-3xl font-medium leading-snug text-neutral-100 sm:text-4xl md:text-5xl">
              {t.why.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
              {t.why.lead}
            </p>
            <div className="hairline my-10 h-px w-full max-w-md" />
            <p className="font-serif text-xl font-medium leading-snug text-neutral-400 sm:text-2xl md:text-3xl">
              {t.why.testVsProof}
            </p>
            <p className="mt-10 max-w-xl text-sm font-light leading-relaxed text-neutral-400">
              {t.why.scope}
            </p>
          </div>
        </section>


        {/* PROVE -> ENFORCE -> SEAL -> VERIFY */}
        <section id="how" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
          <div className="fade-up mb-16 max-w-3xl">
            <p className="seal-label track-mid mb-4 text-xs">{t.how.eyebrow}</p>
            <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
              {t.how.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.how.lead}</p>
            <p className="mt-4 max-w-2xl text-lg font-light text-neutral-400">{t.how.compiler}</p>
          </div>
          <div className="fade-up">
            <ProofPipeline locale={locale} />
          </div>
          <p className="fade-up mt-8 text-sm font-light text-neutral-400">
            {t.how.recordPre}
            <a
              href={`${r}/proof`}
              className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition hover:text-white"
            >
              {t.how.recordLink}
            </a>
            .
          </p>
        </section>

        {/* VERIFY */}
        <VerifyArtifact locale={locale} />

        {/* PUBLIC TECHNICAL RECORD */}
        <section className="relative z-10 edge-t px-6 py-20 md:px-14">
          <div className="fade-up mx-auto max-w-4xl text-center">
            <p className="seal-label track-mid mb-4 text-xs">{t.engine.eyebrow}</p>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">
              {t.engine.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
              {t.engine.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href="https://github.com/pupnp/pupnp/security/advisories/GHSA-q522-6w45-4j58"
                target="_blank"
                rel="noopener noreferrer"
                className="chip-metal track-mid px-3 py-1 text-xs text-neutral-200 transition hover:text-white"
              >
                CVE-2026-41682
              </a>
            </div>
            <a
              href={`${r}/proof`}
              className="chip-metal track-mid mt-10 inline-block px-8 py-3.5 text-xs text-neutral-200 transition hover:text-white"
            >
              {t.engine.cta}
            </a>
          </div>
        </section>

        {/* DEPLOY IT — where it sits in the stack */}
        <DeployGate locale={locale} />

        {/* CTA */}
        <section id="contact" className="relative z-10 edge-t px-6 py-40 md:px-14">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up relative mx-auto max-w-3xl text-center">
            <div className="mb-10 flex items-center justify-center gap-8">
              <IronProofLogo width={111} height={148} title={t.hero.logoTitle} />
              <ProofSeal size={148} locale={locale} />
            </div>
            <h2 className="metal-shine mb-6 font-serif text-4xl font-medium md:text-6xl">
              {t.cta.title}
            </h2>
            <p className="mb-10 text-lg font-light text-neutral-400">{t.cta.lead}</p>
            <CtaForm locale={locale} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 edge-t px-6 py-12 md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-neutral-400 md:flex-row">
          <div className="flex items-center gap-3">
            <IronProofLogo width={20} height={27} />
            <span className="track-logo iron-text font-semibold">IRONPROOF</span>
          </div>
          <span className="font-light">{t.footer}</span>
        </div>
      </footer>

      <FadeUpInit />
    </div>
  );
}
