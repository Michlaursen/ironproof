/*
 * Prove -> Enforce -> Seal -> Verify, as four photographed steps.
 *
 * Redesigned 2026-09-25: the icon rail read as the old site, and one photo
 * per step read as a puzzle. Type only now: a large number, the verb, one
 * sentence, under a hairline. The single image of the section (the struck
 * seal) sits beside the heading. Gold marks the steps where the sealed
 * artifact exists.
 */
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/* The words only. The photos, the numbers and which steps are gold belong to
   the layout, not to a language — so they are declared once below and the
   dictionary supplies nothing but the title and the body. */
const WORDS: L<readonly { title: string; body: string }[]> = {
  en: [
    {
      title: "Prove",
      body: "Before deployment, Ironproof establishes that the defined policy holds across the modeled action space.",
    },
    {
      title: "Enforce",
      body: "At runtime, every requested action is checked deterministically before execution.",
    },
    {
      title: "Seal",
      body: "Each decision is sealed at execution time — SHA3-512 digest, dual Ed25519 + ML-DSA-65 signature — binding the action, the policy version and the verdict into one artifact.",
    },
    {
      title: "Verify",
      body: "The certificate is re-checked against its sealed inputs: the same verdict must come back, or the seal is broken.",
    },
  ],
  fr: [
    {
      title: "Prouver",
      body: "Avant le déploiement, Ironproof établit que la politique définie tient sur tout l’espace d’actions modélisé.",
    },
    {
      title: "Appliquer",
      body: "À l’exécution, chaque action demandée est vérifiée de façon déterministe avant de s’exécuter.",
    },
    {
      title: "Sceller",
      body: "Chaque décision est scellée au moment de l’exécution — empreinte SHA3-512, double signature Ed25519 + ML-DSA-65 — liant l’action, la version de la politique et le verdict dans un seul artefact.",
    },
    {
      title: "Vérifier",
      body: "Le certificat est revérifié contre ses entrées scellées\u00a0: le même verdict doit revenir, sinon le sceau est rompu.",
    },
  ],
};

const STEPS: readonly { n: string; sealed: boolean }[] = [
  { n: "01", sealed: false },
  { n: "02", sealed: false },
  { n: "03", sealed: true },
  { n: "04", sealed: true },
] as const;

export function ProofPipeline({ locale = defaultLocale }: { locale?: Locale }) {
  const words = pick(WORDS, locale);
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
      {STEPS.map((s, i) => {
        const w = words[i] ?? pick(WORDS, "en")[i];
        if (!w) return null;
        return (
          <li key={s.n} className={`min-w-0 border-t pt-6 ${s.sealed ? "border-seal/60" : "border-white/15"}`}>
            <span className={`font-serif text-6xl leading-none ${s.sealed ? "text-seal" : "text-neutral-600"}`}>{s.n}</span>
            <h3 className="mt-5 font-serif text-3xl text-neutral-100">{w.title}</h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-neutral-400">{w.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
