import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/content";
import { LandingHeader } from "@/components/landing/landing-header";
import { FadeUpInit } from "@/components/landing/fade-up-init";
import { type L, pick } from "@/components/landing/i18n";

/*
 * Python to C, proven (Dom, 2026-10-17: « met une demo de python a c prouve
 * sur le site »). The same task translation vendors sell, shown with the
 * proof instead of a test report.
 *
 * Every figure comes from cobalt-ai/bench/traduction_2026-10-16 (criteria
 * frozen before the run, commit 720d3be) and was re-run on 2026-10-17 on the
 * exact files served from /demo/python-to-c/: CBMC 6.10.0 with Z3,
 * "0 of 15 failed"; the two caught faults with the same counterexamples;
 * check.py, 100,000 inputs, 0 differences. The input space is
 * 65,536 x 65,536 x 32,769 = 140,741,783,322,624 combinations.
 *
 * The code blocks below are the served files, copied, not paraphrased.
 * Limits are stated on the page: one short function with no loop, the
 * reference transcribed by hand, the C not yet MISRA-clean.
 */

const FILES = "/demo/python-to-c";

const PY = `def ema_step(prev, x, alpha_q15):
    acc = prev * (32768 - alpha_q15) + x * alpha_q15
    y = acc >> 15          # Python: a shift is a division by 2**15 rounded toward minus infinity
    return max(-32768, min(32767, y))`;

const C = `#include <stdint.h>
/* Embedded C translation of ema.py */
int16_t ema_step(int16_t prev, int16_t x, uint16_t alpha_q15) {
    int32_t acc = (int32_t)prev * (32768 - (int32_t)alpha_q15) + (int32_t)x * (int32_t)alpha_q15;
    int32_t y = acc >> 15;
    if (y > 32767) y = 32767;
    if (y < -32768) y = -32768;
    return (int16_t)y;
}`;

const RUN = "cbmc harness.c ema.c --signed-overflow-check --conversion-check --z3";
const OUT = `** Results:
** 0 of 15 failed (1 iterations)
VERIFICATION SUCCESSFUL`;

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  srcLabel: string;
  dstLabel: string;
  provedEyebrow: string;
  provedTitle: string;
  provedBody: string;
  stats: [string, string][];
  runLabel: string;
  trapEyebrow: string;
  trapTitle: string;
  trapBody: string;
  trapPy: string;
  trapC: string;
  trapEnd: string;
  secondEyebrow: string;
  secondBody: string;
  limitsEyebrow: string;
  limits: string[];
  rerunEyebrow: string;
  rerunTitle: string;
  rerunSteps: string[];
  filesLabel: string;
  cta: string;
};

const T: L<Copy> = {
  en: {
    metaTitle: "Python to C, method demo — Ironproof",
    metaDescription:
      "A Python function translated to embedded C, and a proof that both return the same result on every one of 140 trillion inputs. Files and command included: re-run it yourself.",
    eyebrow: "LIVE PROOF · PYTHON TO C",
    h1: "Translated to C. Proven, not tested.",
    lead: "A fixed-point filter step, the kind of signal-processing prototype teams port to a chip. Written in Python, translated to embedded C, then checked by a solver on every input the function can receive. This translation comes from our own tests: it shows the method, it is not an independent verification.",
    srcLabel: "PYTHON · THE ORIGINAL",
    dstLabel: "C · THE TRANSLATION",
    provedEyebrow: "WHAT WAS PROVEN",
    provedTitle: "Same result, on every input. Not on a sample.",
    provedBody:
      "For every 16-bit value of prev and x, and every alpha from 0 to 32,768, the C returns exactly what the Python returns. The solver does not try inputs one by one: it shows that no input exists where the two differ.",
    stats: [
      ["140,741,783,322,624", "input combinations covered"],
      ["0 of 15", "checks failed, overflow and conversion included"],
      ["1.3 s", "to prove it, on a laptop"],
    ],
    runLabel: "THE COMMAND AND ITS OUTPUT · CBMC 6.10.0 WITH Z3",
    trapEyebrow: "THE BUG A TEST WOULD MISS",
    trapTitle: "The most natural translation is wrong by one.",
    trapBody:
      "Write the division the obvious way in C, acc / 32768, and it looks right. But C rounds toward zero, and Python rounds toward minus infinity. The solver finds an input where they part:",
    trapPy: "Python returns −4752",
    trapC: "the naive C returns −4751",
    trapEnd:
      "prev = −12,565, x = 8,715, alpha = 12,032. One step off, only on some negative values: the kind of difference that passes a test suite and shows up later as a wrong figure. A second planted fault, alpha off by one, was caught the same way.",
    secondEyebrow: "A SECOND, INDEPENDENT CHECK",
    secondBody:
      "The proof compares the C to a reference we transcribed from the Python. To catch a mistake in that transcription, the real Python and the compiled C also ran side by side on 100,000 inputs, edge values included: 0 differences.",
    limitsEyebrow: "WHAT THIS DOES NOT SHOW",
    limits: [
      "One short function, with no loop. Larger programs are the work ahead, not something this page proves.",
      "The proof's reference is a hand transcription of the Python semantics; the 100,000-input run is what checks it, and a sample is not a proof.",
      "This C is not yet MISRA-clean: a separate run found deviations to fix before it would ship to a regulated device.",
    ],
    rerunEyebrow: "RE-RUN IT WITHOUT US",
    rerunTitle: "Four files. One command. Your machine.",
    rerunSteps: [
      "Download the four files below.",
      `Prove the translation: ${RUN}`,
      "Build the C (cc -O2 -shared -o libema.dylib ema.c on macOS; add -fPIC and name it libema.so on Linux), then run python3 check.py.",
    ],
    filesLabel: "THE FILES",
    cta: "SEE HOW WE CHECK IT",
  },
  fr: {
    metaTitle: "Python vers C, prouvé — Ironproof",
    metaDescription:
      "Une fonction Python traduite en C embarqué, et la preuve que les deux donnent le même résultat sur chacune de 140 billions d’entrées. Fichiers et commande fournis : refaites-le vous-même.",
    eyebrow: "PREUVE EN DIRECT · PYTHON VERS C",
    h1: "Traduit en C. Prouvé, pas testé.",
    lead: "Une étape de filtre en virgule fixe, le genre de prototype de traitement du signal qu’on porte vers une puce. Écrit en Python, traduit en C embarqué, puis vérifié par un solveur sur toutes les entrées que la fonction peut recevoir. Cette traduction vient de nos propres essais : elle montre la méthode, ce n’est pas une vérification indépendante.",
    srcLabel: "PYTHON · L’ORIGINAL",
    dstLabel: "C · LA TRADUCTION",
    provedEyebrow: "CE QUI EST PROUVÉ",
    provedTitle: "Le même résultat, sur toutes les entrées. Pas sur un échantillon.",
    provedBody:
      "Pour toutes les valeurs 16 bits de prev et de x, et tout alpha de 0 à 32 768, le C rend exactement ce que rend le Python. Le solveur n’essaie pas les entrées une à une : il montre qu’aucune entrée ne les fait diverger.",
    stats: [
      ["140 741 783 322 624", "combinaisons d’entrées couvertes"],
      ["0 sur 15", "vérifications en échec, débordements et conversions compris"],
      ["1,3 s", "pour le prouver, sur un portable"],
    ],
    runLabel: "LA COMMANDE ET SA SORTIE · CBMC 6.10.0 AVEC Z3",
    trapEyebrow: "L’ERREUR QU’UN TEST RATERAIT",
    trapTitle: "La traduction la plus naturelle se trompe d’un point.",
    trapBody:
      "Écrivez la division de la façon évidente en C, acc / 32768, et elle a l’air juste. Mais le C arrondit vers zéro, et Python vers moins l’infini. Le solveur trouve une entrée où ils se séparent :",
    trapPy: "Python rend −4752",
    trapC: "le C naïf rend −4751",
    trapEnd:
      "prev = −12 565, x = 8 715, alpha = 12 032. Un point d’écart, seulement sur certaines valeurs négatives : le genre de différence qui passe une suite de tests et revient plus tard sous forme de chiffre faux. Une seconde faute plantée, alpha décalé d’un, a été attrapée de la même façon.",
    secondEyebrow: "UNE SECONDE VÉRIFICATION, INDÉPENDANTE",
    secondBody:
      "La preuve compare le C à une référence que nous avons transcrite depuis le Python. Pour attraper une erreur dans cette transcription, le vrai Python et le C compilé ont aussi tourné côte à côte sur 100 000 entrées, valeurs limites comprises : 0 différence.",
    limitsEyebrow: "CE QUE CETTE PAGE NE MONTRE PAS",
    limits: [
      "Une seule fonction courte, sans boucle. Les programmes plus grands sont le travail à venir, pas ce que cette page prouve.",
      "La référence de la preuve est une transcription à la main de la sémantique Python ; c’est l’exécution sur 100 000 entrées qui la contrôle, et un échantillon n’est pas une preuve.",
      "Ce C n’est pas encore conforme MISRA : une passe séparée a trouvé des écarts à corriger avant qu’il parte dans un appareil réglementé.",
    ],
    rerunEyebrow: "REFAITES-LE SANS NOUS",
    rerunTitle: "Quatre fichiers. Une commande. Votre machine.",
    rerunSteps: [
      "Téléchargez les quatre fichiers ci-dessous.",
      `Prouvez la traduction : ${RUN}`,
      "Compilez le C (cc -O2 -shared -o libema.dylib ema.c sur macOS ; ajoutez -fPIC et nommez-le libema.so sur Linux), puis lancez python3 check.py.",
    ],
    filesLabel: "LES FICHIERS",
    cta: "VOIR COMMENT ON VÉRIFIE",
  },
};

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = pick(T, locale);
  const path = "/demo/python-to-c";
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: locale === "en" ? path : `/fr${path}`, languages: { en: path, fr: `/fr${path}`, "x-default": path } },
    openGraph: { title: t.metaTitle, description: t.metaDescription, type: "article" },
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="seal-label track-mid mb-4 text-xs">{children}</p>;
}

function Code({ label, code }: { label: string; code: string }) {
  return (
    <div className="card-premium overflow-hidden">
      <p className="track-mid border-b border-white/10 px-5 py-3 text-xs text-neutral-500">{label}</p>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-neutral-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default async function PythonToCPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = pick(T, locale as Locale);
  const home = locale === "en" ? "/" : `/${locale}`;

  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader variant="sub" locale={locale} page="demo-python-c" />
      <main className="blueprint flex-1">
        <section className="relative z-10 px-6 pb-12 pt-24 md:px-14 md:pt-28">
          <div className="halo" aria-hidden="true" />
          <div className="fade-up mx-auto max-w-5xl">
            <p className="seal-label track-wide mb-6 text-xs md:text-sm">{t.eyebrow}</p>
            <h1 className="metal-text mb-8 font-serif text-4xl font-medium leading-[0.98] sm:text-5xl md:text-7xl">{t.h1}</h1>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{t.lead}</p>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 md:px-14">
          <div className="fade-up grid gap-6 lg:grid-cols-2">
            <Code label={t.srcLabel} code={PY} />
            <Code label={t.dstLabel} code={C} />
          </div>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
          <div className="fade-up max-w-3xl">
            <Label>{t.provedEyebrow}</Label>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.provedTitle}</h2>
            <p className="text-lg font-light leading-relaxed text-neutral-300">{t.provedBody}</p>
          </div>
          <div className="fade-up my-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
            {t.stats.map(([n, l]) => (
              <div key={l} className="bg-surface p-6">
                <p className="mb-3 font-mono text-2xl leading-none text-seal md:text-3xl">{n}</p>
                <p className="text-sm leading-snug text-neutral-400">{l}</p>
              </div>
            ))}
          </div>
          <div className="fade-up card-premium overflow-hidden">
            <p className="track-mid border-b border-white/10 px-5 py-3 text-xs text-neutral-500">{t.runLabel}</p>
            <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-neutral-200">
              <code>{`$ ${RUN}\n...\n${OUT}`}</code>
            </pre>
          </div>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
          <div className="fade-up max-w-3xl">
            <Label>{t.trapEyebrow}</Label>
            <h2 className="metal-text mb-6 font-serif text-3xl font-medium md:text-5xl">{t.trapTitle}</h2>
            <p className="text-lg font-light leading-relaxed text-neutral-300">{t.trapBody}</p>
          </div>
          <div className="fade-up my-8 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="card-premium border-l-2 border-l-seal/60 p-6">
              <p className="font-mono text-xl text-foreground">{t.trapPy}</p>
            </div>
            <div className="card-premium p-6">
              <p className="font-mono text-xl text-neutral-400">{t.trapC}</p>
            </div>
          </div>
          <p className="fade-up max-w-3xl font-light leading-relaxed text-neutral-300">{t.trapEnd}</p>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 md:px-14">
          <div className="fade-up grid gap-12 md:grid-cols-2">
            <div>
              <Label>{t.secondEyebrow}</Label>
              <p className="text-lg font-light leading-relaxed text-neutral-300">{t.secondBody}</p>
            </div>
            <div>
              <Label>{t.limitsEyebrow}</Label>
              <ul className="space-y-4">
                {t.limits.map((l) => (
                  <li key={l} className="border-t border-white/10 pt-4 font-light leading-relaxed text-neutral-300">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-10 edge-t mx-auto max-w-6xl px-6 py-20 pb-28 md:px-14">
          <div className="fade-up max-w-3xl">
            <Label>{t.rerunEyebrow}</Label>
            <h2 className="metal-text mb-8 font-serif text-3xl font-medium md:text-5xl">{t.rerunTitle}</h2>
            <ol className="space-y-5">
              {t.rerunSteps.map((s, i) => (
                <li key={s} className="relative pl-11">
                  <span className="absolute left-0 top-1 font-mono text-xs text-seal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="break-words font-light leading-relaxed text-neutral-300">{s}</span>
                </li>
              ))}
            </ol>
            <p className="track-mid mt-10 text-xs text-neutral-500">{t.filesLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {["ema.py", "ema.c", "harness.c", "check.py"].map((f) => (
                <li key={f}>
                  <a
                    href={`${FILES}/${f}`}
                    download
                    className="card-premium inline-block px-4 py-2 font-mono text-sm text-neutral-200 transition hover:text-seal"
                  >
                    {f}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`${home === "/" ? "" : home}/modernization`}
              className="mt-12 inline-block rounded-md bg-foreground px-6 py-3 text-xs font-medium tracking-[0.2em] text-background transition hover:opacity-90"
            >
              {t.cta}
            </a>
          </div>
        </section>
      </main>
      <FadeUpInit />
    </div>
  );
}
