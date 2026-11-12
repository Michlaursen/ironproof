import Image from "next/image";
import type { Locale } from "@/content";

/*
 * The last screen of the home page (Dom, 2026-11-11: « tu me changes le design complet,
 * une photo de qualité comme celle du drone mais pour la robotique »). It replaces the
 * one-line diagram (one-line-finale.tsx, kept in git history).
 *
 * The photo is an illustration and says so: a robot arm stopped at a plane of gold
 * light, the same visual rule as the drone at the top of the page (the gold light is the
 * line a rule draws). We have run no robot yet; the copy claims nothing about robotics,
 * it states what the gate does for any critical action.
 *
 * FRERES-EXAMINES: drone-fence.tsx (DroneHeroSlide: same photo plate and image note),
 * one-line-finale.tsx (the screen this replaces).
 */

type Copy = {
  kicker: string;
  from: string;
  probably: string;
  to: string;
  provably: string;
  lead1: string;
  lead2: string;
  cta: string;
  imageNote: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    kicker: "ROBOTICS · DRONES · CRITICAL SYSTEMS",
    from: "From",
    probably: "probably",
    to: "to",
    provably: "provably.",
    lead1: "Every action an agent, an operator or a script sends to a critical system passes one gate.",
    lead2: "What complies runs, and is sealed. What does not never executes.",
    cta: "START A PILOT",
    imageNote: "Image: illustration.",
  },
  fr: {
    kicker: "ROBOTIQUE · DRONES · SYSTÈMES CRITIQUES",
    // The play on words stays in English, as on the previous screen (Dom, 2026-11-07).
    from: "From",
    probably: "probably",
    to: "to",
    provably: "provably.",
    lead1: "Chaque action qu’un agent, un opérateur ou un script envoie à un système critique passe par une seule barrière.",
    lead2: "Ce qui est conforme s’exécute, et est scellé. Le reste ne s’exécute jamais.",
    cta: "DÉMARRER UN PILOTE",
    imageNote: "Image : illustration.",
  },
};

export function RoboticsFinale({ locale, pilotHref }: { locale: Locale; pilotHref: string }) {
  const t = COPY[locale];
  return (
    <section className="finale-robotics relative z-10 edge-t px-6 pb-28 pt-24 md:px-14 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mx-auto max-w-4xl text-center">
          <p className="seal-label track-mid mb-6 text-xs">{t.kicker}</p>
          <h2 className="finale-robotics-title font-serif font-normal">
            <span className="block">
              {t.from} <s className="finale-robotics-strike">{t.probably}</s>
            </span>
            <span className="block">
              {t.to} <span className="text-[#8a6624]">{t.provably}</span>
            </span>
          </h2>
        </div>
        <figure className="fade-up mt-14">
          <div className="photo-plate" aria-hidden="true">
            <Image
              src="/media/robot-gold-line.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 50%" }}
            />
            <span className="plate-brackets" />
          </div>
          <figcaption className="mt-3 text-right text-xs text-neutral-500">{t.imageNote}</figcaption>
        </figure>
        <div className="fade-up mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg font-light leading-relaxed text-neutral-300 md:text-xl">{t.lead1}</p>
          <p className="mt-3 text-lg leading-relaxed text-neutral-100 md:text-xl">{t.lead2}</p>
          <a href={pilotHref} className="track-mid mt-10 inline-flex items-center gap-3 rounded-[5px] bg-[#24262a] px-8 py-3.5 text-xs font-semibold text-[#f4f2ee] shadow-lg transition hover:bg-[#33363b]">
            {t.cta} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
