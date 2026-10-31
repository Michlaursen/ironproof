import Image from "next/image";
import { defaultLocale, type Locale } from "@/content";
import { type L, NBSP, pick } from "./i18n";
import { FlowDiagram, type FlowCopy } from "./flow-diagram";
import { TRACE_CHECKS, TRACE_NOTE } from "./traceability-copy";

/*
 * How the modernization service works, step by step (Dom, 2026-10-17, after
 * reading how Code Metal lays out its platform: « faut le faire pour nous, en
 * changeant les mots, avec en bas faster audit, why us »).
 *
 * Every step says what is actually done today: the model of each program is
 * built one program at a time, the solver checks every input that model
 * allows, the same cases go through IBM's own COBOL compiler. No figure here:
 * the figures live on the results already published. "Why us" contrasts with
 * testing in general and names no one.
 *
 * Traceability audit (Dom, 2026-10-19: « audit de traçabilité, on oublie pas
 * de mettre ça sur le website »), shown FIRST since 2026-10-19 (Dom: « c
 * smartttt go »): the audit opens the door, the proof is the next sale, two
 * separate reports. No figure on any third-party translation here, not even
 * in this comment: this repository is public. The measurements live in the
 * private cobalt-ai repository (verif_tierce) and come to this page only after
 * the translator has answered.
 */

type Step = { title: string; body: string };
type Item = { title: string; body: string };

type HowCopy = {
  auditEyebrow: string;
  auditTitle: string;
  auditLead: string;
  /** Link to the product page; the checks themselves live in traceability-copy.ts. */
  auditMore: string;
  eyebrow: string;
  title: string;
  steps: readonly Step[];
  gainEyebrow: string;
  gainTitle: string;
  gains: readonly Item[];
  /** Where the idea comes from: translation validation, and the same question in avionics. */
  lineageEyebrow: string;
  lineageTitle: string;
  lineage: readonly string[];
  sourcesLabel: string;
  whyEyebrow: string;
  whyTitle: string;
  why: readonly Item[];
  limitsPre: string;
  limitsLink: string;
  /** Notes on the photograph: punched cards (the old program) beside a drive (the new one). */
  plate: readonly { x: number; y: number; label: string; gold?: boolean }[];
  /** The path of one program, read left to right in the diagram. */
  flow: FlowCopy;
};

const COPY: L<HowCopy> = {
  en: {
    auditEyebrow: "TRACEABILITY AUDIT · BEFORE THE PROOF",
    auditTitle: "First, we check what the translation says about itself.",
    auditLead: "An AI translation ships with its own paperwork: where each piece of new code came from, how each field maps, which checks passed. Your migration team and your auditors rely on it. We check every one of those statements against the real code.",
    auditMore: "The traceability audit, in detail",
    eyebrow: "HOW IT WORKS",
    title: "One program at a time. Every step leaves evidence.",
    steps: [
      {
        title: "Scope",
        body: "Send the original program with its copybooks and compiler options, and the translation your integrator or AI tool produced. Before checking anything, we write down what the program reads, what it writes, and exactly what we will check.",
      },
      {
        title: "Model the original",
        body: "Ironproof builds a precise model of what the COBOL computes, down to decimal rounding and truncation. We do not translate: we have no stake in the new code being right.",
      },
      {
        title: "Compare and cross-check",
        body: "The translation is confronted with the model: the exact input where they differ, or not covered with the reason. Same-behavior answers are suspended while we rebuild them. The same cases run through IBM’s own COBOL compiler, and we plant deliberate faults to show the check catches them.",
      },
      {
        title: "Seal and hand over",
        body: "You receive the proof or the counterexample, and the list of what the model does not cover. The record is sealed, and your team re-runs the check without us.",
      },
    ],
    gainEyebrow: "WHAT CHANGES FOR YOU",
    gainTitle: "Faster sign-off. Fewer surprises. Nothing to take on faith.",
    gains: [
      {
        title: "A faster audit",
        body: "Your risk committee receives evidence it can re-check, not a test report it has to trust. The questions it will ask are answered in the record.",
      },
      {
        title: "No surprise after go-live",
        body: "The input where old and new code disagree is found before production, not by a customer.",
      },
      {
        title: "Keep your migration partner",
        body: "We work on top of the translation you already paid for, from an integrator or an AI tool. We check it; we do not replace it.",
      },
    ],
    lineageEyebrow: "WHERE THE IDEA COMES FROM",
    lineageTitle: "Check each translation, not the translator.",
    lineage: [
      "The idea has had a name since 1998: translation validation (Pnueli, Siegel and Singerman, Weizmann Institute). Rather than proving once and for all that a translator is always right, you check each translation it produces. When the two disagree, you show the scenario where the new code behaves differently. We apply it to translations of COBOL.",
      "Aviation asks the same question. A NASA report on DO-333, the formal methods supplement to the airborne software standard DO-178C, puts it plainly: what is shown on the source code counts for the compiled code only once the two are established as equivalent.",
    ],
    sourcesLabel: "Sources:",
    whyEyebrow: "WHY IRONPROOF",
    whyTitle: "A test tells you what it tried. We tell you what holds.",
    why: [
      {
        title: "Every input, not a sample",
        body: "Testing runs the cases someone thought of. The solver covers every input the model allows, including the one nobody tried.",
      },
      {
        title: "Evidence, not a verdict",
        body: "You do not take our word for it. The proof, the cases and the seal can be re-checked on your own machine.",
      },
      {
        title: "The limits, in writing",
        body: "When we cannot conclude, the result says so. What the model does not cover is marked as not covered, never as passed.",
      },
    ],
    limitsPre: "What our proofs guarantee, and what they do not: ",
    limitsLink: "read the note",
    plate: [
      { x: 10, y: 14, label: "THE PROGRAM YOU RUN TODAY" },
      { x: 56, y: 18, label: "THE TRANSLATION YOU RECEIVED", gold: true },
    ],
    flow: {
      caption: "The path of one translated program: two independent checks, one verdict, a sealed record.",
      lead: [
        ["COBOL", "your program"],
        ["MODEL", "what the COBOL computes"],
        ["TRANSLATION", "made by others"],
      ],
      top: ["SOLVER", "every input the model allows"],
      topInset: [["Z3", "SMT solver"], ["SPACER", "loop invariants"]],
      bottom: ["REAL RUNS", "the same cases, executed"],
      bottomInset: [["IBM COBOL", "the original"], ["JVM", "the translation"]],
      verdict: ["VERDICT", "same, or the input that differs"],
      seal: ["SEALED", "re-run without us"],
    },
  },
  fr: {
    auditEyebrow: "AUDIT DE TRAÇABILITÉ · AVANT LA PREUVE",
    auditTitle: "D’abord, on vérifie ce que la traduction dit d’elle-même.",
    auditLead: "Une traduction par IA arrive avec ses propres documents : d’où vient chaque morceau du nouveau code, à quoi correspond chaque champ, quels contrôles ont réussi. Votre équipe de migration et vos auditeurs s’y fient. On compare chacune de ces affirmations au vrai code.",
    auditMore: "L’audit de traçabilité, en détail",
    eyebrow: "COMMENT ÇA FONCTIONNE",
    title: "Un programme à la fois. Chaque étape laisse une preuve.",
    steps: [
      {
        title: "Cadrer",
        body: "Vous nous confiez le programme d’origine avec ses copybooks et ses options de compilation, et la traduction produite par votre intégrateur ou votre outil d’IA. Avant de vérifier quoi que ce soit, nous écrivons ce que le programme lit, ce qu’il écrit et exactement ce que nous allons vérifier.",
      },
      {
        title: "Modéliser l’original",
        body: "Ironproof construit un modèle précis de ce que le COBOL calcule, jusqu’aux arrondis et aux troncatures. Nous ne traduisons pas : nous n’avons aucun intérêt à ce que le nouveau code soit déclaré bon.",
      },
      {
        title: "Compare and cross-check",
        body: "La traduction est confrontée au modèle : l’entrée exacte où ils diffèrent, ou non couvert, avec la raison. Les réponses « même comportement » sont suspendues pendant qu’on les reconstruit. Les mêmes cas passent dans le compilateur COBOL d’IBM lui-même, et nous plantons des fautes exprès pour montrer que la vérification les attrape.",
      },
      {
        title: "Sceller et remettre",
        body: "Vous recevez la preuve ou le contre-exemple, et la liste de ce que le modèle ne couvre pas. Le dossier est scellé, et votre équipe refait la vérification sans nous.",
      },
    ],
    gainEyebrow: "CE QUI CHANGE POUR VOUS",
    gainTitle: "Une approbation plus rapide. Moins de surprises. Rien à croire sur parole.",
    gains: [
      {
        title: "Un audit plus rapide",
        body: "Votre comité des risques reçoit une preuve qu’il peut revérifier, pas un rapport de tests qu’il doit croire. Les questions qu’il posera trouvent leur réponse dans le dossier.",
      },
      {
        title: "Pas de surprise après la mise en service",
        body: "L’entrée où l’ancien et le nouveau code divergent est trouvée avant la production, pas par un client.",
      },
      {
        title: "Gardez votre partenaire de migration",
        body: "Nous travaillons par-dessus la traduction que vous avez déjà payée, faite par un intégrateur ou un outil d’IA. Nous la vérifions ; nous ne la remplaçons pas.",
      },
    ],
    lineageEyebrow: "D’OÙ VIENT L’IDÉE",
    lineageTitle: "On vérifie chaque traduction, pas le traducteur.",
    lineage: [
      "L’idée a un nom depuis 1998 : la validation de traduction (Pnueli, Siegel et Singerman, Institut Weizmann). Plutôt que de prouver une fois pour toutes qu’un traducteur a toujours raison, on vérifie chaque traduction qu’il produit. Quand les deux ne s’entendent pas, on montre le scénario où le nouveau code se comporte autrement. Nous l’appliquons aux traductions de COBOL.",
      "L’aviation se pose la même question. Un rapport de la NASA sur DO-333, le supplément sur les méthodes formelles de la norme du logiciel embarqué DO-178C, le dit clairement : ce qu’on démontre sur le code source ne compte pour le code compilé qu’une fois l’équivalence des deux établie.",
    ],
    sourcesLabel: `Sources${NBSP}:`,
    whyEyebrow: "POURQUOI IRONPROOF",
    whyTitle: "Un test vous dit ce qu’il a essayé. Nous vous disons ce qui tient.",
    why: [
      {
        title: "Toutes les entrées, pas un échantillon",
        body: "Un test exécute les cas auxquels quelqu’un a pensé. Le solveur couvre toutes les entrées que le modèle permet, y compris celle que personne n’a essayée.",
      },
      {
        title: "Une preuve, pas un verdict",
        body: "Vous n’avez pas à nous croire sur parole. La preuve, les cas et le sceau se revérifient sur votre propre machine.",
      },
      {
        title: "Les limites, par écrit",
        body: "Quand nous ne pouvons pas conclure, le résultat le dit. Ce que le modèle ne couvre pas est déclaré non couvert, jamais réussi.",
      },
    ],
    limitsPre: "Ce que nos preuves garantissent, et ce qu’elles ne garantissent pas : ",
    limitsLink: "lire la note (en anglais)",
    plate: [
      { x: 10, y: 14, label: "LE PROGRAMME D’AUJOURD’HUI" },
      { x: 56, y: 18, label: "LA TRADUCTION REÇUE", gold: true },
    ],
    flow: {
      caption: "Le parcours d’un programme traduit : deux vérifications indépendantes, un verdict, un dossier scellé.",
      lead: [
        ["COBOL", "votre programme"],
        ["MODÈLE", "ce que calcule le COBOL"],
        ["TRADUCTION", "faite par d’autres"],
      ],
      top: ["SOLVEUR", "toutes les entrées du modèle"],
      topInset: [["Z3", "solveur SMT"], ["SPACER", "invariants"]],
      bottom: ["VRAIES EXÉCUTIONS", "les mêmes cas, exécutés"],
      bottomInset: [["IBM COBOL", "l’original"], ["JVM", "la traduction"]],
      verdict: ["VERDICT", "identiques, ou l’écart exact"],
      seal: ["SCELLÉ", "revérifiable sans nous"],
    },
  },
};

const srcLink = "underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60";

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

export function ModernizationHow({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);
  const r = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <>
      <section id="traceability" className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
        <div className="fade-up mb-10 max-w-3xl">
          <Snum>{t.auditEyebrow}</Snum>
          <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.auditTitle}</h2>
          <p className="mt-6 font-light leading-relaxed text-neutral-300">{t.auditLead}</p>
        </div>
        <ul className="fade-up grid gap-8 md:grid-cols-3">
          {pick(TRACE_CHECKS, locale).map((a) => (
            <li key={a.title} className="edge-t pt-6">
              <h3 className="mb-3 font-serif text-xl text-foreground">{a.title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{a.body}</p>
            </li>
          ))}
        </ul>
        <p className="fade-up mt-10 max-w-3xl text-sm font-light text-neutral-400">
          {pick(TRACE_NOTE, locale)}{" "}
          <a href={`${r}/traceability-audit`} className="underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60">
            {t.auditMore}
          </a>
        </p>
      </section>

      <section id="how" className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
        <div className="fade-up mb-12 grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div className="max-w-xl">
            <Snum>{t.eyebrow}</Snum>
            <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.title}</h2>
          </div>
          {/* Punched cards tied with ribbon beside a drive: the old program and
            * the new one, the same family of objects as the rest of the site. */}
          <div className="photo-plate photo-plate-wide" aria-hidden="true">
            <Image src="/media/app-punchcards.jpg" alt="" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" style={{ objectPosition: "50% 60%" }} />
            <span className="plate-brackets" />
            {t.plate.map((n) => (
              <span
                key={n.label}
                className={`plate-note${n.gold ? " plate-note-gold" : ""}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.label}
              </span>
            ))}
          </div>
        </div>
        <ol className="fade-up grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s.title} className="card-premium p-6">
              <p className="mb-4 font-mono text-xs text-seal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-3 font-serif text-xl text-foreground">{s.title}</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">{s.body}</p>
            </li>
          ))}
        </ol>
        <FlowDiagram f={t.flow} />
      </section>

      <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
        <div className="fade-up mb-10 max-w-3xl">
          <Snum>{t.gainEyebrow}</Snum>
          <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.gainTitle}</h2>
        </div>
        <ul className="fade-up grid gap-8 md:grid-cols-3">
          {t.gains.map((g) => (
            <li key={g.title} className="edge-t pt-6">
              <h3 className="mb-3 font-serif text-xl text-foreground">{g.title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{g.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/*
        Both sources read in full or at the cited passage (2026-10-20): Pnueli,
        Siegel, Singerman, TACAS 1998, abstract and section 1; Cofer and Miller,
        NASA/CR-2014-218244, section 4 conclusion (DO-333 paragraph 6.7.f, as
        that report states it -- DO-333 itself was not opened). The 1998 paper
        is not about aviation: the two are kept as two separate sentences.
      */}
      <section id="lineage" className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
        <div className="fade-up max-w-3xl">
          <Snum>{t.lineageEyebrow}</Snum>
          <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.lineageTitle}</h2>
          {t.lineage.map((para) => (
            <p key={para} className="mt-6 font-light leading-relaxed text-neutral-300">{para}</p>
          ))}
          <p className="mt-8 text-sm font-light text-neutral-400">
            {t.sourcesLabel}{" "}
            <a href="https://doi.org/10.1007/BFb0054170" className={srcLink}>Pnueli, Siegel, Singerman, “Translation Validation”, TACAS 1998</a>
            {" · "}
            <a href="https://ntrs.nasa.gov/citations/20140004055" className={srcLink}>Cofer, Miller, “Formal Methods Case Studies for DO-333”, NASA/CR-2014-218244</a>
          </p>
        </div>
      </section>

      <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
        <div className="fade-up mb-10 max-w-3xl">
          <Snum>{t.whyEyebrow}</Snum>
          <h2 className="metal-text font-serif text-3xl font-medium md:text-5xl">{t.whyTitle}</h2>
        </div>
        <ul className="fade-up grid gap-8 md:grid-cols-3">
          {t.why.map((w) => (
            <li key={w.title} className="edge-t pt-6">
              <h3 className="mb-3 font-serif text-xl text-foreground">{w.title}</h3>
              <p className="font-light leading-relaxed text-neutral-300">{w.body}</p>
            </li>
          ))}
        </ul>
        <p className="fade-up mt-10 text-sm font-light text-neutral-400">
          {t.limitsPre}
          <a
            href={`${r}/research/what-our-proofs-do-not-prove`}
            className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition hover:text-white"
          >
            {t.limitsLink}
          </a>
          .
        </p>
      </section>
    </>
  );
}
