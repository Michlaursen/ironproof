import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, type Locale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { ProofSeal } from "@/components/landing/proof-seal";
import { VerifyArtifact } from "@/components/landing/verify-artifact";
import { type L, pick, count, NBSP } from "@/components/landing/i18n";
import { EVIDENCE_BASE, loadEvidencePack, type Decision, type Verdict } from "@/lib/evidence";

/*
 * THE EVIDENCE PACK — what a risk committee or an examiner can check without us.
 *
 * Every fact on this page is READ from public/evidence/golden-path-001 at build
 * time (src/lib/evidence.ts): verdicts, approvers, solver answers, the choices
 * we made on the customer's behalf, the limits. The copy below only FRAMES
 * them. Where the pack's own words appear (rule labels, verdict details,
 * decisions, limits) they are quoted in English on both locales, like the
 * verifier's failure strings: translating them would be a second copy of the
 * evidence, and the second copy is the one that drifts.
 */

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  provenance: (commit: string) => ReactNode;
  quoted: string;

  ruleEyebrow: string;
  ruleTitle: string;
  approved: (n: number, q: number) => ReactNode;
  keyNotLabel: string;

  runEyebrow: string;
  runTitle: string;
  runLead: string;
  amount: string;
  secondSig: string;
  window: string;
  yes: string;
  no: string;
  windowRows: (rows: number, declared: number | null) => string;
  verdictName: Record<Verdict, string>;
  verdictMeaning: Record<Verdict, string>;
  reached: (ids: ReactNode) => ReactNode;

  solverEyebrow: string;
  solverTitle: string;
  solverLead: string;
  solverMeaning: Record<string, string>;
  outsideSeal: (methods: string) => ReactNode;

  checkEyebrow: string;
  checkTitle: string;
  checkLead: (seq: number) => ReactNode;
  noAnchor: string;

  threeEyebrow: string;
  threeTitle: string;
  three: { q: string; how: string; here: string }[];
  threeFoot: string;

  oursEyebrow: string;
  oursTitle: string;
  oursLead: string;
  decided: string;

  limitsEyebrow: string;
  limitsTitle: string;
  limitsFull: string;

  filesTitle: string;
  filesNote: string;
  ctaTitle: string;
  ctaLead: string;
  ctaPilot: string;
  ctaVerify: string;
  ctaLab: string;
};

const T: L<Copy> = {
  en: {
    metaTitle: "Evidence pack — Ironproof",
    metaDescription:
      "One payment control, six requests, every decision sealed. See what an examiner can check without Ironproof: the verdicts, who approved the policy, what the solver established about the rule, the choices we made on the customer’s behalf, and what the pack does not establish.",
    eyebrow: "EVIDENCE PACK",
    h1: "What your auditor can check, without us.",
    lead: "One payment control, six requests, every decision sealed. This page is built from the pack itself: the verdicts, approvals and limits below are read from the files you can download, not written by hand.",
    provenance: (commit) => (
      <>
        Built from engine commit <span className="font-mono text-neutral-300">{commit}</span>. Sample
        data: fictional accounts, keys minted for this build.
      </>
    ),
    quoted: "Quoted as shipped in the pack.",

    ruleEyebrow: "THE CONTROL",
    ruleTitle: "One rule, as a policy team would write it.",
    approved: (n, q) => (
      <>
        Approved by <span className="text-neutral-100">{n} of {q}</span> designated keys, each
        dual-signed (Ed25519 + ML-DSA-65) over the exact bytes of the policy and of the compiler
        that reads it.
      </>
    ),
    keyNotLabel: "A signature binds a key, never a label. The roles are declared; resolve them against your own key registry.",

    runEyebrow: "SIX REQUESTS, THREE OUTCOMES",
    runTitle: "Allowed, blocked, or refused. Never guessed.",
    runLead: "Each request was decided before it reached the payment tool, and each decision is an entry in the sealed record.",
    amount: "Amount",
    secondSig: "Second signature",
    window: "Beneficiary changes in window",
    yes: "yes",
    no: "no",
    windowRows: (rows, declared) =>
      declared === null
        ? `${rows} sent · population not declared`
        : declared === rows
          ? `${rows} sent · ${declared} declared`
          : `${rows} sent · ${declared} declared, does not tie out`,
    verdictName: { PROCEED: "PROCEED", BLOCK: "BLOCK", REFUSE: "REFUSE" },
    verdictMeaning: {
      PROCEED: "Runs. No rule is broken.",
      BLOCK: "Stopped. A rule is broken, and the record names which.",
      REFUSE: "Not decided. The gate could not evaluate a rule on what it was given, so it declines instead of guessing.",
    },
    reached: (ids) => (
      <>
        Reached the payment tool: {ids}. The other requests were stopped before it. An exception
        raised after the money moved is a log entry.
      </>
    ),

    solverEyebrow: "THE SOLVER",
    solverTitle: "What the solver found in the rule.",
    solverLead: "Four questions about the same rule, four different answers. Replaying a decision says nothing about the set of actions a rule admits; these questions do.",
    solverMeaning: {
      REFUTED: "The rule never imposed an absolute ceiling, only one conditional on the second signature: a signed payment of any size passes.",
      PROVEN: "Without a second signature, no single payment above the ceiling can be approved, over every amount rather than a sample.",
      STRUCTURING: "Split into payments that each stay under the ceiling, a sequence moves more than the ceiling without breaking the rule once. As written, the rule does not cap a total.",
      "NOT EXERCISED": "The rolling-window count cannot be quantified by the compiler, so that clause is decided request by request and never proved.",
    },
    outsideSeal: (methods) => (
      <>
        These four answers come from the solver at build time and are listed in the pack’s README.
        They are <span className="text-neutral-200">not inside the seal</span>: in the sealed record,
        each rule is discharged as <span className="font-mono text-neutral-300">{methods}</span>, an
        evaluation of each request, not a theorem.
      </>
    ),

    checkEyebrow: "CHECK THE SEAL, HERE",
    checkTitle: "Load the record. Then load the forgery.",
    checkLead: (seq) => (
      <>
        The forged copy changes one field: it claims the blocked CAD 9,000,000 payment carried a
        second signature, the one edit that would make the block look wrong. Nothing else moves.
        Watch the verifier name entry <span className="font-mono text-neutral-200">seq={seq}</span>.
      </>
    ),
    noAnchor: "This record carries no time anchor, so it proves the bytes have not moved since sealing, not when they were written.",

    threeEyebrow: "THREE CHECKS, NO IRONPROOF ACCOUNT",
    threeTitle: "Everything we concluded, re-derived without our code.",
    three: [
      {
        q: "Has the pack moved since it was built?",
        how: "Every file hashed in MANIFEST.sha3. This catches accident, not an adversary, who could regenerate it.",
        here: "In the pack",
      },
      {
        q: "Has the sealed record moved since it was sealed?",
        how: "Ed25519 and ML-DSA-65 signatures over a SHA3-512 chain, both of which must pass. This is the check an adversary cannot forge.",
        here: "On this page",
      },
      {
        q: "Does each verdict follow from its own sealed inputs?",
        how: "A second implementation, written from the published verdict specification rather than from our code, re-derives every decision.",
        here: "In the pack",
      },
    ],
    threeFoot: "The pack runs all three with Node 24 and nothing else: no Python, no network, no Ironproof package.",

    oursEyebrow: "DECISIONS WE MADE ON YOUR BEHALF",
    oursTitle: "The rule was prose. These choices are ours.",
    oursLead: "Every one of them changes a verdict, and none of them is the customer’s. They ship in the pack, so a disagreement is visible instead of buried in a commit.",
    decided: "WE DECIDED",

    limitsEyebrow: "WHAT THIS DOES NOT ESTABLISH",
    limitsTitle: "Read this before quoting anything above.",
    limitsFull: "Read LIMITS.md in full",

    filesTitle: "FILES ON THIS PAGE",
    filesNote: "verify.sh, MANIFEST.sha3, the verdict specification and the second verifier ship in the full pack, handed over in a pilot. The seal specification is public.",
    ctaTitle: "The same pack, for one of your controls.",
    ctaLead: "A pilot starts with one action type and ends with this: a sealed record your risk committee checks without us.",
    ctaPilot: "START A PILOT",
    ctaVerify: "VERIFY ANY DOSSIER",
    ctaLab: "ATTACK THIS POLICY",
  },
  fr: {
    metaTitle: "Dossier de preuve — Ironproof",
    metaDescription:
      "Une règle de paiement, six demandes, chaque décision scellée. Voyez ce qu’un examinateur peut vérifier sans Ironproof : les verdicts, qui a approuvé la politique, ce que le solveur a établi sur la règle, les choix faits pour le client, et ce que le dossier n’établit pas.",
    eyebrow: "DOSSIER DE PREUVE",
    h1: "Ce que votre auditeur peut vérifier, sans nous.",
    lead: "Une règle de paiement, six demandes, chaque décision scellée. Cette page est construite à partir du dossier lui-même : les verdicts, les approbations et les limites ci-dessous sont lus dans les fichiers téléchargeables, pas écrits à la main.",
    provenance: (commit) => (
      <>
        Construit depuis le commit moteur <span className="font-mono text-neutral-300">{commit}</span>.
        Données d’exemple{NBSP}: comptes fictifs, clés générées pour cette construction.
      </>
    ),
    quoted: "Cité tel que livré dans le dossier (en anglais).",

    ruleEyebrow: "LA RÈGLE",
    ruleTitle: "Une règle, écrite comme l’écrirait une équipe de conformité.",
    approved: (n, q) => (
      <>
        Approuvée par <span className="text-neutral-100">{n} clés désignées sur {q}</span>, chacune en
        double signature (Ed25519 + ML-DSA-65) sur les octets exacts de la politique et du
        compilateur qui la lit.
      </>
    ),
    keyNotLabel: "Une signature lie une clé, jamais une étiquette. Les rôles sont déclarés : rapprochez-les de votre propre registre de clés.",

    runEyebrow: "SIX DEMANDES, TROIS ISSUES",
    runTitle: "Autorisé, bloqué ou refusé. Jamais deviné.",
    runLead: "Chaque demande a été décidée avant d’atteindre l’outil de paiement, et chaque décision est une entrée du dossier scellé.",
    amount: "Montant",
    secondSig: "Deuxième signature",
    window: "Changements de bénéficiaire dans la fenêtre",
    yes: "oui",
    no: "non",
    windowRows: (rows, declared) =>
      declared === null
        ? `${rows} envoyés · population non déclarée`
        : declared === rows
          ? `${rows} envoyés · ${declared} déclarés`
          : `${rows} envoyés · ${declared} déclarés, ne concorde pas`,
    verdictName: { PROCEED: "PROCEED", BLOCK: "BLOCK", REFUSE: "REFUSE" },
    verdictMeaning: {
      PROCEED: "S’exécute. Aucune règle n’est enfreinte.",
      BLOCK: "Arrêtée. Une règle est enfreinte, et le dossier dit laquelle.",
      REFUSE: "Non décidée. La barrière n’a pas pu évaluer une règle avec ce qu’on lui a fourni : elle décline au lieu de deviner.",
    },
    reached: (ids) => (
      <>
        Ont atteint l’outil de paiement{NBSP}: {ids}. Les autres demandes ont été arrêtées avant. Une
        exception levée après le départ de l’argent n’est qu’une ligne de journal.
      </>
    ),

    solverEyebrow: "LE SOLVEUR",
    solverTitle: "Ce que le solveur a trouvé dans la règle.",
    solverLead: "Quatre questions sur la même règle, quatre réponses différentes. Rejouer une décision ne dit rien de l’ensemble des actions qu’une règle admet ; ces questions, si.",
    solverMeaning: {
      REFUTED: "La règle n’a jamais imposé de plafond absolu, seulement un plafond conditionnel à la deuxième signature : un paiement signé de n’importe quel montant passe.",
      PROVEN: "Sans deuxième signature, aucun paiement unique au-dessus du plafond ne peut être approuvé, sur tous les montants et non sur un échantillon.",
      STRUCTURING: "Fractionnée en paiements qui restent chacun sous le plafond, une séquence déplace plus que le plafond sans enfreindre la règle une seule fois. Telle qu’écrite, la règle ne plafonne pas un total.",
      "NOT EXERCISED": "Le compte sur fenêtre glissante ne peut pas être quantifié par le compilateur : cette clause est décidée demande par demande, jamais prouvée.",
    },
    outsideSeal: (methods) => (
      <>
        Ces quatre réponses viennent du solveur au moment de la construction et figurent dans le
        README du dossier. Elles ne sont <span className="text-neutral-200">pas sous le sceau</span>
        {NBSP}: dans le dossier scellé, chaque règle est traitée comme{" "}
        <span className="font-mono text-neutral-300">{methods}</span>, une évaluation de chaque
        demande, pas un théorème.
      </>
    ),

    checkEyebrow: "VÉRIFIEZ LE SCEAU, ICI",
    checkTitle: "Chargez le dossier. Puis chargez le faux.",
    checkLead: (seq) => (
      <>
        La copie falsifiée change un seul champ{NBSP}: elle prétend que le paiement bloqué de
        9{" "}000{" "}000{" "}$ CA portait une deuxième signature, la seule retouche qui
        ferait paraître le blocage injustifié. Rien d’autre ne bouge. Regardez le vérificateur
        nommer l’entrée <span className="font-mono text-neutral-200">seq={seq}</span>.
      </>
    ),
    noAnchor: "Ce dossier ne porte aucun ancrage temporel : il prouve que les octets n’ont pas bougé depuis le scellement, pas quand ils ont été écrits.",

    threeEyebrow: "TROIS CONTRÔLES, AUCUN COMPTE IRONPROOF",
    threeTitle: "Tout ce que nous avons conclu, re-dérivé sans notre code.",
    three: [
      {
        q: "Le dossier a-t-il bougé depuis sa construction ?",
        how: "Chaque fichier haché dans MANIFEST.sha3. Cela attrape l’accident, pas un adversaire, qui pourrait le régénérer.",
        here: "Dans le dossier",
      },
      {
        q: "Le dossier scellé a-t-il bougé depuis son scellement ?",
        how: "Signatures Ed25519 et ML-DSA-65 sur une chaîne SHA3-512, les deux devant passer. C’est le contrôle qu’un adversaire ne peut pas falsifier.",
        here: "Sur cette page",
      },
      {
        q: "Chaque verdict découle-t-il de ses propres entrées scellées ?",
        how: "Une seconde implémentation, écrite à partir de la spécification publiée des verdicts et non de notre code, re-dérive chaque décision.",
        here: "Dans le dossier",
      },
    ],
    threeFoot: "Le dossier exécute les trois avec Node 24 et rien d’autre : ni Python, ni réseau, ni paquet Ironproof.",

    oursEyebrow: "LES CHOIX FAITS POUR LE CLIENT",
    oursTitle: "La règle était en prose. Ces choix sont les nôtres.",
    oursLead: "Chacun change un verdict, et aucun n’appartient au client. Ils sont livrés dans le dossier : un désaccord se voit au lieu de dormir dans un commit.",
    decided: "WE DECIDED",

    limitsEyebrow: "CE QUE CE DOSSIER N’ÉTABLIT PAS",
    limitsTitle: "À lire avant de citer quoi que ce soit ci-dessus.",
    limitsFull: "Lire LIMITS.md en entier",

    filesTitle: "FICHIERS DE CETTE PAGE",
    filesNote: "verify.sh, MANIFEST.sha3, la spécification des verdicts et le second vérificateur sont dans le dossier complet, remis dans le cadre d’un pilote. La spécification du sceau est publique.",
    ctaTitle: "Le même dossier, pour une de vos règles.",
    ctaLead: "Un pilote commence par un type d’action et se termine par ceci : un dossier scellé que votre comité de risque vérifie sans nous.",
    ctaPilot: "DÉMARRER UN PILOTE",
    ctaVerify: "VÉRIFIER UN DOSSIER",
    ctaLab: "ATTAQUER CETTE POLITIQUE",
  },
};

const VERDICT_STYLE: Record<Verdict, { color: string; border: string }> = {
  PROCEED: { color: "var(--seal)", border: "rgba(212,175,95,0.35)" },
  BLOCK: { color: "#ffb4b4", border: "rgba(255,150,150,0.3)" },
  REFUSE: { color: "#e5e5e5", border: "rgba(255,255,255,0.22)" },
};

function cad(n: number, locale: Locale): string {
  return locale === "fr" ? `${count(n, locale)} $ CA` : `CAD ${count(n, locale)}`;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="metal-text max-w-3xl font-serif text-3xl font-medium leading-tight md:text-5xl">{children}</h2>;
}

function Quoted({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div>
      <div lang="en">{children}</div>
      <p className="mt-3 text-xs text-neutral-500">{note}</p>
    </div>
  );
}

function RequestCard({ d, t, locale }: { d: Decision; t: Copy; locale: Locale }) {
  const s = VERDICT_STYLE[d.verdict];
  return (
    <li className="chip-metal fade-up flex flex-col p-5" style={{ borderColor: s.border }}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm text-neutral-200">{d.id}</span>
        <span className="track-mid rounded-[4px] border px-2 py-1 text-[11px]" style={{ color: s.color, borderColor: s.border }}>
          {t.verdictName[d.verdict]}
        </span>
      </div>
      <dl className="mt-4 space-y-1.5 text-sm font-light">
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500">{t.amount}</dt>
          <dd className="text-right text-neutral-200">{cad(d.amount, locale)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500">{t.secondSig}</dt>
          <dd className="text-right text-neutral-200">{d.dualSigned ? t.yes : t.no}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500">{t.window}</dt>
          <dd className="text-right text-neutral-200">{t.windowRows(d.windowRows, d.declaredRows)}</dd>
        </div>
      </dl>
      <p lang="en" className="mt-4 border-t border-white/10 pt-3 font-mono text-xs leading-relaxed text-neutral-400">
        {d.detail}
      </p>
    </li>
  );
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = locale === "en" ? "/evidence" : `/${locale}/evidence`;
  const { metaTitle: title, metaDescription: description } = pick(T, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `https://ironproof.ai${path}`,
      languages: { en: "/evidence", fr: "/fr/evidence", "x-default": "/evidence" },
    },
    openGraph: { title, description, url: `https://ironproof.ai${path}` },
  };
}

export default async function EvidencePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(T, locale);
  const pack = loadEvidencePack();
  const r = locale === "en" ? "" : `/${locale}`;

  // A solver answer this page cannot explain is a pack that changed shape:
  // refuse the build rather than render an answer with no meaning beside it.
  for (const row of pack.solver) {
    if (!(row.answer in t.solverMeaning)) {
      throw new Error(`evidence page: no explanation for solver answer ${row.answer}`);
    }
  }
  const methods = [...new Set(pack.constraints.map((c) => c.method))].join(", ");
  const verdicts: Verdict[] = ["PROCEED", "BLOCK", "REFUSE"];

  return (
    <div className="relative min-h-screen">
      <FadeUpInit />
      <LandingHeader variant="sub" locale={locale} page="evidence" />
      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-32 md:px-14">
          {/* Same anchor as /verify and /proof: the seal is what the page is about. */}
          <div className="pointer-events-none absolute right-0 top-24 hidden opacity-40 lg:right-14 lg:block xl:opacity-55">
            <ProofSeal size={300} locale={locale} />
          </div>
          <Eyebrow>
            {t.eyebrow} · <span className="whitespace-nowrap">GOLDEN-PATH-001</span>
          </Eyebrow>
          <h1 className="metal-shine max-w-4xl font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
          <p className="mt-4 max-w-2xl text-sm font-light text-neutral-500">{t.provenance(pack.commit.slice(0, 7))}</p>
        </section>

        {/* 1. The rule and who approved it. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <Eyebrow>{t.ruleEyebrow}</Eyebrow>
          <H2>{t.ruleTitle}</H2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <Quoted note={t.quoted}>
              <blockquote className="chip-metal fade-up p-6 font-serif text-xl leading-snug text-neutral-100 md:text-2xl">
                “{pack.control}”
              </blockquote>
              <ul className="mt-4 space-y-2">
                {pack.constraints.map((c) => (
                  <li key={c.id} className="flex gap-3 font-mono text-xs text-neutral-400">
                    <span className="text-neutral-200">{c.id}</span>
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>
            </Quoted>
            <div className="fade-up">
              <p className="text-base font-light text-neutral-300">{t.approved(pack.signaturesVerified, pack.quorum)}</p>
              <ul className="mt-5 space-y-2">
                {pack.approvers.map((a) => (
                  <li key={a.keyId} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2">
                    <span className="font-mono text-sm text-neutral-200">{a.role}</span>
                    <span className="font-mono text-xs text-neutral-500">{a.keyId.slice(0, 16)}…</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-light text-neutral-400">{t.keyNotLabel}</p>
            </div>
          </div>
        </section>

        {/* 2. The six requests, read from the sealed record. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <Eyebrow>{t.runEyebrow}</Eyebrow>
          <H2>{t.runTitle}</H2>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.runLead}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {verdicts.map((v) => (
              <li key={v} className="text-sm font-light text-neutral-400">
                <span className="track-mid mr-2 text-xs" style={{ color: VERDICT_STYLE[v].color }}>
                  {t.verdictName[v]}
                </span>
                {t.verdictMeaning[v]}
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pack.decisions.map((d) => (
              <RequestCard key={d.seq} d={d} t={t} locale={locale} />
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm font-light text-neutral-400">
            {t.reached(
              pack.reached.map((id, i) => (
                <span key={id}>
                  {i > 0 ? ", " : ""}
                  <span className="font-mono text-neutral-200">{id}</span>
                </span>
              )),
            )}
          </p>
        </section>

        {/* 3. What the solver established about the RULE, not the requests. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <Eyebrow>{t.solverEyebrow}</Eyebrow>
          <H2>{t.solverTitle}</H2>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.solverLead}</p>
          <ol className="mt-10 space-y-3">
            {pack.solver.map((row, i) => (
              <li key={row.question} className={`chip-metal fade-up grid gap-3 p-5 md:grid-cols-[1.1fr_9.5rem_1.6fr] md:items-baseline md:gap-8 ${i === 0 ? "border-seal/40" : ""}`}>
                <div lang="en">
                  <p className="font-mono text-sm text-neutral-200">{row.question}</p>
                  <p className="mt-1 font-mono text-xs text-neutral-500">{row.method}</p>
                </div>
                <p className="track-mid text-xs" style={{ color: row.answer === "PROVEN" ? "var(--seal)" : row.answer === "NOT EXERCISED" ? "#a3a3a3" : "#ffb4b4" }}>
                  {row.answer}
                </p>
                <p className="text-sm font-light text-neutral-300">{t.solverMeaning[row.answer]}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-sm font-light text-neutral-400">{t.outsideSeal(methods)}</p>
        </section>

        {/* 4. The seal, checked in this tab, against the record AND a forgery. */}
        <section className="relative z-10 edge-t pt-24">
          <div className="mx-auto max-w-7xl px-6 md:px-14">
            <Eyebrow>{t.checkEyebrow}</Eyebrow>
            <H2>{t.checkTitle}</H2>
            <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.checkLead(pack.forgedSeq)}</p>
            <p className="mt-3 max-w-2xl text-sm font-light text-neutral-500">{t.noAnchor}</p>
          </div>
          <div className="mt-10">
            <VerifyArtifact
              locale={locale}
              heading={false}
              id="check"
              demos={{
                verified: `${EVIDENCE_BASE}/dossier.json`,
                tampered: `${EVIDENCE_BASE}/dossier-tampered.json`,
              }}
            />
          </div>
        </section>

        {/* 5. The three checks, and which one this page actually runs. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <Eyebrow>{t.threeEyebrow}</Eyebrow>
          <H2>{t.threeTitle}</H2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {t.three.map((c, i) => (
              <li key={c.q} className="chip-metal fade-up flex flex-col p-6">
                <span className="font-serif text-3xl text-neutral-500">{i + 1}</span>
                <p className="mt-3 font-serif text-xl leading-snug text-neutral-100">{c.q}</p>
                <p className="mt-3 flex-1 text-sm font-light text-neutral-400">{c.how}</p>
                <p className={`track-mid mt-5 text-[11px] ${i === 1 ? "text-seal" : "text-neutral-500"}`}>{c.here}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm font-light text-neutral-400">{t.threeFoot}</p>
        </section>

        {/* 6. The encoding choices that are ours, not the customer's. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <Eyebrow>{t.oursEyebrow}</Eyebrow>
          <H2>{t.oursTitle}</H2>
          <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.oursLead}</p>
          <Quoted note={t.quoted}>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {pack.ownDecisions.map((d) => (
                <li key={d.question} className="chip-metal fade-up p-6">
                  <p className="font-mono text-sm text-neutral-200">{d.question}</p>
                  <p className="mt-3 text-sm text-neutral-100">
                    <span className="seal-label track-mid mr-2 text-[11px]">{t.decided}</span>
                    {d.decided}
                  </p>
                  <p className="mt-2 text-sm font-light text-neutral-400">{d.why}</p>
                </li>
              ))}
            </ul>
          </Quoted>
        </section>

        {/* 7. The limits. Last before the call to action, so no reader reaches
          * the button without walking past them. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <Eyebrow>{t.limitsEyebrow}</Eyebrow>
          <H2>{t.limitsTitle}</H2>
          <Quoted note={t.quoted}>
            <ol className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {pack.limits.map((l, i) => (
                <li key={l.head} className="fade-up flex gap-4">
                  <span className="font-serif text-2xl text-neutral-600">{i + 1}</span>
                  <div>
                    <p className="text-base text-neutral-100">{l.head}</p>
                    <p className="mt-1 text-sm font-light text-neutral-400">{l.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Quoted>
          <a
            href={`${EVIDENCE_BASE}/LIMITS.md`}
            className="metal-text mt-8 inline-block text-sm underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
          >
            {t.limitsFull} →
          </a>
        </section>

        {/* 8. Files, then the one next step. */}
        <section className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-24 md:px-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <p className="seal-label track-mid mb-4 text-xs">{t.filesTitle}</p>
              <ul className="space-y-2 font-mono text-sm">
                {["dossier.json", "dossier-tampered.json", "README.md", "DECISIONS.md", "LIMITS.md"].map((f) => (
                  <li key={f}>
                    <a href={`${EVIDENCE_BASE}/${f}`} className="text-neutral-300 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/50">
                      {f}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-sm text-xs font-light text-neutral-500">
                {t.filesNote}{" "}
                <a href="/sceal/SPEC_CANON.md" className="underline decoration-white/20 underline-offset-4 hover:text-neutral-300">
                  SPEC_CANON.md
                </a>
              </p>
            </div>
            <div>
              <H2>{t.ctaTitle}</H2>
              <p className="mt-5 max-w-xl text-lg font-light text-neutral-300">{t.ctaLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`${r}/pilot`}
                  className="track-mid rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-7 py-3 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
                >
                  {t.ctaPilot}
                </a>
                <a
                  href={`${r}/verify`}
                  className="chip-metal track-mid px-7 py-3 text-xs text-neutral-200 transition hover:text-white"
                >
                  {t.ctaVerify}
                </a>
                <a
                  href={`${r}/lab`}
                  className="chip-metal track-mid px-7 py-3 text-xs text-neutral-200 transition hover:text-white"
                >
                  {t.ctaLab}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
