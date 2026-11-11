import Image from "next/image";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * The whole architecture in one figure: the path of one case, the foundation,
 * memory, learning and control, and the organs that keep the system alive and
 * honest, plugged in where they work (Dom, 2026-11-11: « put this on the
 * website as well, remove the others »). It replaces the engineering sheet on
 * /neuro-symbolic and the engineering-system diagram on /proof-intelligence.
 *
 * The SVG files are generated, never edited by hand:
 *   omg-universe/repos/.omg/docs/schema_os_cognitif.py --site <this repo>
 * Every box of the path and the three columns repeats the former diagram word
 * for word; the organs are read from the live organ map of our own system.
 */

type FigureCopy = { src: string; alt: string; caption: string };

const COPY: L<FigureCopy> = {
  en: {
    src: "/images/ironproof-cognitive-os-en.svg",
    alt: "Ironproof cognitive operating system: the path of one case from the proposal to the sealed record, with memory, learning, control and the organs that keep it running.",
    caption:
      "The path of one case runs through two independent checks to one verdict and a sealed record. Below it, the memory, learning and controls that govern how we build; around them, the organs that keep the whole system alive and honest, inside a wall with listed doors only. “Holds” applies to policies and critical actions; for rewritten code it is suspended.",
  },
  fr: {
    src: "/images/ironproof-cognitive-os-fr.svg",
    alt: "Système d’exploitation cognitif d’Ironproof : le chemin d’un cas, de la proposition à la trace scellée, avec la mémoire, l’apprentissage, le contrôle et les organes qui le font vivre.",
    caption:
      "Le chemin d’un cas passe par deux vérifications indépendantes, jusqu’à un verdict et une trace scellée. Dessous, la mémoire, l’apprentissage et les contrôles qui encadrent notre façon de bâtir ; autour, les organes qui gardent tout le système vivant et honnête, derrière une muraille dont seules les portes listées s’ouvrent. « Tient » vaut pour les politiques et les actions critiques ; pour du code réécrit, il est suspendu.",
  },
};

export function CognitiveOsFigure({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(COPY, locale);

  return (
    <figure className="fade-up">
      {/* Narrow screens scroll the drawing sideways instead of shrinking its labels out of reach. */}
      <div className="overflow-x-auto rounded-sm border border-black/10">
        <Image
          src={t.src}
          alt={t.alt}
          width={1000}
          height={900}
          unoptimized
          className="block h-auto w-full min-w-[860px]"
        />
      </div>
      <figcaption className="mt-5 max-w-3xl font-light leading-relaxed text-neutral-400">{t.caption}</figcaption>
    </figure>
  );
}
