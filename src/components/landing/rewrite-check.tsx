import Image from "next/image";
import Link from "next/link";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { PLATFORM_COPY } from "./platform-copy";

/*
 * The first section under the hero since 2026-10-19 (Dom, "PARFAIT LETS GO"):
 * what Ironproof says about code a machine rewrote, in three answers, before
 * the gate in front of critical actions.
 *
 * Every line was read against what runs or what the site already states:
 *   - "different" is the answer that asks for no trust: the input is replayed
 *     on the client's own compiler (cobalt-ai verif_tierce/verifier.py,
 *     replay on IBM COBOL and the JVM).
 *   - "same" rests on our model of the original; the line says so, and says
 *     the model is itself confronted with IBM's compiler (platform-how.tsx).
 *     No figure here: the confrontation is not on the site yet.
 *   - the example is the translation card's own line (platform-copy.ts),
 *     read from there, never copied, so the two cannot drift apart.
 *   - Dom's order of 2026-10-19: we show differences in behavior, never
 *     "errors" -- the translator may have changed it on purpose.
 */
export type Answer = { word: string; body: string; receive: string };

export type RewriteCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  /** The same three answers on /modernization, under its own title (application-page.tsx). */
  method: { title: string; lead: string };
  answers: readonly [Answer, Answer, Answer];
  who: string;
  /** Our model against IBM's compiler (.omg/oracle/confrontation_ibm_7b91abb_z416_2026-10-19.txt in omg-universe). Dated: the count moves with the suite. */
  clarifyLabel: string;
  clarifyLine: string;
  clarifyLink: string;
  partner: string;
  /** The audit comes first, the proof second: two reports (Dom, 2026-10-19). */
  audit: string;
  auditLink: string;
  exampleLabel: string;
  cta: string;
  href: string;
};

export const REWRITE_COPY: L<RewriteCopy> = {
  en: {
    eyebrow: "CODE VERIFICATION",
    title: "Your code was rewritten. Does it still do the same thing?",
    lead: "A bank moves its COBOL to Java, with an integrator or an AI tool. The new code compiles and passes its tests. Ironproof shows you, module by module, where it no longer does what the old code did.",
    method: {
      title: "Three answers. Each one comes with what you need to check it.",
      lead: "Never a green checkmark. Every module gets one of three answers, and each comes with what was used to reach it.",
    },
    answers: [
      {
        word: "Different behavior.",
        body: "The exact input where the two differ, replayed on your own compiler. You run it yourself and see the difference with your own eyes.",
        receive: "You get the input, to replay on the old program and on the new one.",
      },
      {
        word: "Not decided.",
        body: "Where we could not conclude, we say so, with the reason. Never shown as a pass.",
        receive: "You get the reason it stopped, recorded with the result.",
      },
      {
        word: "Same behavior.",
        body: "We are rebuilding this answer. Until it holds up, we don’t issue it.",
        receive: "You get the reason, in the clarification below.",
      },
    ],
    who: "We don’t build what we verify. We check the translations others make, for the side that carries the risk if it breaks.",
    partner: "You modernize, we check. Hand your client a report from someone who didn’t write the code. Every result reaches your client, including the ones you won’t like.",
    clarifyLabel: "CLARIFICATION, OCTOBER 31, 2026",
    clarifyLine: "Audits of our own checker have reproduced dozens of false “same behavior” answers, on cases written to attack it. So we are rebuilding that answer, and we don’t issue it in the meantime. The figures we published before describe our model: read them as history, not as confirmed behavior.",
    clarifyLink: "READ THE CLARIFICATION",
    audit: "It starts with a traceability audit: we check what the translation says about itself, its cited sources, its data mapping, its compliance sheets. The proof of behavior comes next, in its own report.",
    auditLink: "SEE THE AUDIT",
    exampleLabel: "ALREADY RUN",
    cta: "SEE HOW WE CHECK IT",
    href: "/modernization",
  },
  fr: {
    eyebrow: "VÉRIFICATION DE CODE",
    title: "Votre code a été réécrit. Fait-il toujours la même chose ?",
    lead: "Une banque fait passer son COBOL à Java, avec un intégrateur ou un outil d’IA. Le nouveau code compile, il passe ses tests. Reste une question : fait-il encore ce que faisait l’ancien ? Ironproof vous montre, module par module, où ce n’est plus le cas.",
    method: {
      title: "Trois réponses. Chacune vient avec de quoi la vérifier.",
      lead: "Jamais un simple crochet vert. Chaque module reçoit l’une des trois réponses, avec ce qui a servi à l’obtenir.",
    },
    answers: [
      {
        word: "Comportement différent.",
        body: "L’entrée précise où les deux divergent, rejouée sur votre propre compilateur. Vous la lancez vous-même et vous voyez l’écart de vos yeux.",
        receive: "Vous recevez l’entrée, à rejouer sur l’ancien programme et sur le nouveau.",
      },
      {
        word: "Impossible à trancher.",
        body: "Quand on ne peut pas conclure, on le dit, raison à l’appui. Jamais présenté comme une réussite.",
        receive: "Vous recevez la raison de l’arrêt, consignée avec le résultat.",
      },
      {
        word: "Même comportement.",
        body: "On reconstruit cette réponse. Tant qu’elle ne tient pas, on ne la donne pas.",
        receive: "Vous recevez la raison, dans la clarification ci-dessous.",
      },
    ],
    who: "On ne bâtit pas ce qu’on vérifie. On vérifie ce que d’autres ont traduit, pour vous, qui en portez le risque.",
    partner: "Vous modernisez, on vérifie. Remettez à votre client un rapport signé par quelqu’un qui n’a pas écrit le code. Tous les résultats se rendent à votre client, même ceux qui ne font pas votre affaire.",
    clarifyLabel: "CLARIFICATION, 31 OCTOBRE 2026",
    clarifyLine: "Des audits de notre propre vérificateur ont reproduit des dizaines de fausses réponses « même comportement », sur des cas écrits pour l’attaquer. On reconstruit donc cette réponse, et on ne la donne pas d’ici là. Les chiffres publiés avant décrivent notre modèle : lisez-les comme un historique, pas comme un comportement confirmé.",
    clarifyLink: "LIRE LA CLARIFICATION",
    audit: "On commence par un audit de traçabilité : on vérifie ce que la traduction dit d’elle-même, ses sources citées, sa correspondance de données, ses fiches de conformité. La preuve de comportement vient ensuite, dans son propre rapport.",
    auditLink: "VOIR L’AUDIT",
    exampleLabel: "DÉJÀ FAIT",
    cta: "VOIR COMMENT ON VÉRIFIE",
    href: "/fr/modernization",
  },
};

export function RewriteCheck({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(REWRITE_COPY, locale);
  // The example is the translation card's own line: one source.
  const example = pick(PLATFORM_COPY, locale).useCases.cards.find((c) => c.href.endsWith("/modernization"));
  return (
    <section id="rewrite-check" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="rewrite-top fade-up">
        <div className="min-w-0">
          <p className="seal-label track-mid mb-5 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{t.title}</h2>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{t.lead}</p>
          {/* The example right under the lead (Dom, 2026-10-19, review). */}
          {example ? (
            <div className="mt-10 max-w-3xl border-l-2 border-seal/60 pl-6">
              <p className="seal-label track-mid mb-3 text-xs">{t.exampleLabel}</p>
              <p className="font-serif text-xl leading-snug text-neutral-100 md:text-2xl">{example.ranOn}</p>
            </div>
          ) : null}
        </div>
        {/* Paper cards tied with ribbon beside a drive: the old program and its rewrite (Dom, 2026-11-01). */}
        <div className="rewrite-photo" aria-hidden="true">
          <Image src="/media/app-punchcards.jpg" alt="" fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover" />
        </div>
        </div>
        <ol className="verdict-cards fade-up mt-16 grid gap-6 md:grid-cols-3">
          {t.answers.map((a, i) => (
            <li key={a.word} className="border-t border-white/10 pt-6">
              <span className="num-badge font-serif text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl text-neutral-100">{a.word}</h3>
              <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{a.body}</p>
            </li>
          ))}
        </ol>
        <div className="fade-up mt-12 max-w-3xl border-l-2 border-seal/60 pl-6">
          <p className="seal-label track-mid mb-3 text-xs">{t.clarifyLabel}</p>
          <p className="text-base font-light leading-relaxed text-neutral-300 md:text-lg">{t.clarifyLine}</p>
          <Link href="/research/what-our-proofs-do-not-prove" className="track-mid mt-4 inline-flex items-center gap-2 border-b border-white/25 pb-0.5 text-xs text-neutral-200">
            {t.clarifyLink} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <p className="fade-up mt-16 max-w-3xl font-serif text-2xl leading-snug text-neutral-200 md:text-3xl">{t.who}</p>
        <p className="fade-up mt-6 max-w-3xl text-base font-light leading-relaxed text-neutral-300 md:text-lg">{t.partner}</p>
        <p className="fade-up mt-8 max-w-3xl text-base font-light leading-relaxed text-neutral-300 md:text-lg">
          {t.audit}{" "}
          <a href={`${t.href}#traceability`} className="track-mid ml-1 whitespace-nowrap border-b border-white/25 pb-0.5 text-xs text-neutral-200 transition hover:border-seal hover:text-white">
            {t.auditLink} <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
        <a
          href={t.href}
          className="track-mid fade-up mt-10 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
        >
          {t.cta} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
