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
type Answer = { word: string; body: string };

type RewriteCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  answers: readonly [Answer, Answer, Answer];
  who: string;
  exampleLabel: string;
  cta: string;
  href: string;
};

const COPY: L<RewriteCopy> = {
  en: {
    eyebrow: "TRANSLATION CHECK",
    title: "Rewritten is not the same as equivalent.",
    lead: "A bank moves its COBOL to Java, with an integrator or an AI tool. The new code compiles and passes its tests. Ironproof tells you, module by module, whether it still does what the old code did.",
    answers: [
      {
        word: "Same behavior.",
        body: "Within the scope we state before we start. This answer rests on our model of the original code, and that model is itself confronted with IBM’s compiler.",
      },
      {
        word: "Different behavior.",
        body: "The exact input where the two differ, replayed on your own compiler. You don’t have to trust us: you run it and see the difference yourself.",
      },
      {
        word: "Not decided.",
        body: "Where we could not conclude, we say so, with the reason. Never shown as a pass.",
      },
    ],
    who: "We don’t translate. We check the translations others make, for the side that carries the risk if it breaks.",
    exampleLabel: "ALREADY RUN",
    cta: "SEND US A TRANSLATION",
    href: "/modernization",
  },
  fr: {
    eyebrow: "VÉRIFICATION DE TRADUCTION",
    title: "Réécrit ne veut pas dire équivalent.",
    lead: "Une banque migre son COBOL vers Java, avec un intégrateur ou un outil d’IA. Le nouveau code compile et passe ses tests. Ironproof vous dit, module par module, s’il fait encore ce que faisait l’ancien.",
    answers: [
      {
        word: "Même comportement.",
        body: "Dans le périmètre que nous annonçons avant de commencer. Cette réponse repose sur notre modèle du code d’origine, et ce modèle est lui-même confronté au compilateur d’IBM.",
      },
      {
        word: "Comportement différent.",
        body: "L’entrée exacte où les deux diffèrent, rejouée sur votre propre compilateur. Vous n’avez pas à nous croire : vous l’exécutez et vous voyez la différence vous-même.",
      },
      {
        word: "Non tranché.",
        body: "Là où nous n’avons pas pu conclure, nous le disons, avec la raison. Jamais affiché comme un succès.",
      },
    ],
    who: "Nous ne traduisons pas. Nous vérifions les traductions faites par d’autres, pour le compte de celui qui porte le risque si ça casse.",
    exampleLabel: "DÉJÀ FAIT",
    cta: "ENVOYEZ-NOUS UNE TRADUCTION",
    href: "/fr/modernization",
  },
};

export function RewriteCheck({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);
  // The example is the translation card's own line: one source.
  const example = pick(PLATFORM_COPY, locale).useCases.cards.find((c) => c.href.endsWith("/modernization"));
  return (
    <section id="rewrite-check" className="relative z-10 edge-t px-6 py-28 md:px-14 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up max-w-4xl">
          <p className="seal-label track-mid mb-5 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium leading-[1.05] md:text-6xl">{t.title}</h2>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{t.lead}</p>
        </div>
        <ol className="fade-up mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {t.answers.map((a, i) => (
            <li key={a.word} className="border-t border-white/10 pt-6">
              <span className="num-badge font-serif text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl text-neutral-100">{a.word}</h3>
              <p className="mt-3 text-base font-light leading-relaxed text-neutral-400">{a.body}</p>
            </li>
          ))}
        </ol>
        <p className="fade-up mt-16 max-w-3xl font-serif text-2xl leading-snug text-neutral-200 md:text-3xl">{t.who}</p>
        {example ? (
          <div className="fade-up mt-12 max-w-3xl">
            <p className="seal-label track-mid mb-3 text-xs">{t.exampleLabel}</p>
            <p className="text-base font-light leading-relaxed text-neutral-400">{example.ranOn}</p>
          </div>
        ) : null}
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
