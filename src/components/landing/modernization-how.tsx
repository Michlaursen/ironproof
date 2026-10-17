import Image from "next/image";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { FlowDiagram, type FlowCopy } from "./flow-diagram";

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
 */

type Step = { title: string; body: string };
type Item = { title: string; body: string };

type HowCopy = {
  eyebrow: string;
  title: string;
  steps: readonly Step[];
  gainEyebrow: string;
  gainTitle: string;
  gains: readonly Item[];
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
    eyebrow: "HOW IT WORKS",
    title: "One program at a time. Every step leaves evidence.",
    steps: [
      {
        title: "Scope",
        body: "Send one program with its copybooks and your compiler options. Before translating anything, we write down what the program reads, what it writes, and exactly what we will check.",
      },
      {
        title: "Model and translate",
        body: "Ironproof builds a precise model of what the COBOL computes, down to decimal rounding and truncation, and generates the Python from it.",
      },
      {
        title: "Prove and cross-check",
        body: "A solver checks every input the model allows: same results, or the exact input where they differ. The same cases run through IBM’s own COBOL compiler, and we plant deliberate faults to show the check catches them.",
      },
      {
        title: "Seal and hand over",
        body: "You receive the Python, the proof or the counterexample, and the list of what the model does not cover. The record is sealed, and your team re-runs the check without us.",
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
        title: "Code your team can own",
        body: "Plain Python, readable by your developers, with the evidence that it computes what the COBOL did.",
      },
    ],
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
      { x: 56, y: 18, label: "THE CODE YOU KEEP", gold: true },
    ],
    flow: {
      caption: "The path of one program: two independent checks, one verdict, a sealed record.",
      lead: [
        ["COBOL", "your program"],
        ["MODEL", "what the COBOL computes"],
        ["PYTHON", "generated"],
      ],
      top: ["SOLVER", "every input the model allows"],
      bottom: ["IBM COMPILER", "the same cases, run for real"],
      verdict: ["VERDICT", "same, or the input that differs"],
      seal: ["SEALED", "re-run without us"],
    },
  },
  fr: {
    eyebrow: "COMMENT ÇA FONCTIONNE",
    title: "Un programme à la fois. Chaque étape laisse une preuve.",
    steps: [
      {
        title: "Cadrer",
        body: "Envoyez-nous un programme avec ses copybooks et vos options de compilation. Avant de traduire quoi que ce soit, nous écrivons ce que le programme lit, ce qu’il écrit et exactement ce que nous allons vérifier.",
      },
      {
        title: "Modéliser et traduire",
        body: "Ironproof construit un modèle précis de ce que le COBOL calcule, jusqu’aux arrondis et aux troncatures, et en génère le Python.",
      },
      {
        title: "Prouver et confronter",
        body: "Un solveur vérifie toutes les entrées que le modèle permet : mêmes résultats, ou l’entrée exacte où ils diffèrent. Les mêmes cas passent dans le compilateur COBOL d’IBM lui-même, et nous plantons des fautes exprès pour montrer que la vérification les attrape.",
      },
      {
        title: "Sceller et remettre",
        body: "Vous recevez le Python, la preuve ou le contre-exemple, et la liste de ce que le modèle ne couvre pas. Le dossier est scellé, et votre équipe refait la vérification sans nous.",
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
        title: "Un code que votre équipe peut garder",
        body: "Du Python simple, lisible par vos développeurs, avec la preuve qu’il calcule ce que calculait le COBOL.",
      },
    ],
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
      { x: 56, y: 18, label: "LE CODE QUE VOUS GARDEZ", gold: true },
    ],
    flow: {
      caption: "Le parcours d’un programme : deux vérifications indépendantes, un verdict, un dossier scellé.",
      lead: [
        ["COBOL", "votre programme"],
        ["MODÈLE", "ce que calcule le COBOL"],
        ["PYTHON", "généré"],
      ],
      top: ["SOLVEUR", "toutes les entrées du modèle"],
      bottom: ["COMPILATEUR IBM", "les mêmes cas, exécutés"],
      verdict: ["VERDICT", "identiques, ou l’écart exact"],
      seal: ["SCELLÉ", "revérifiable sans nous"],
    },
  },
};

function Snum({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

export function ModernizationHow({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);
  const r = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <>
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
