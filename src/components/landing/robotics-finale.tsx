import Image from "next/image";
import type { Locale } from "@/content";

/*
 * The last screen of the home page (Dom, 2026-11-11: « tu me changes le design complet,
 * une photo de qualité comme celle du drone mais pour la robotique »). It replaces the
 * one-line diagram (one-line-finale.tsx, kept in git history).
 *
 * Second pass (Dom, 2026-11-11: « on enlève ça et toutes les écritures… le bras en gros
 * qui prend toute la place et on écrit par-dessus quelque chose ; ça porte à confusion »):
 * the « From probably / to provably » title, the kicker and the two lead lines are gone.
 * The photo fills the screen; one plain sentence and the pilot button sit over its light
 * side. The « Image: illustration » note left too (Dom, 2026-11-11: « enlève les écritures
 * image illustration »). On a phone the photo sits above the sentence, cropped so the
 * whole arm, hand included, shows (Dom: « on voit pas la main du robot au complet »).
 *
 * FRERES-EXAMINES: drone-fence.tsx (DroneHeroSlide: same photo and image note),
 * one-line-finale.tsx (the screen this replaced).
 */

type Copy = {
  line: string;
  cta: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    line: "Every action checked before it runs.",
    cta: "START A PILOT",
  },
  fr: {
    line: "Chaque action vérifiée avant de s’exécuter.",
    cta: "DÉMARRER UN PILOTE",
  },
};

export function RoboticsFinale({ locale, pilotHref }: { locale: Locale; pilotHref: string }) {
  const t = COPY[locale];
  return (
    <section className="finale-arm relative z-10 edge-t overflow-hidden">
      <Image
        src="/media/robot-gold-line.jpg"
        alt=""
        fill
        sizes="100vw"
        className="finale-arm-photo object-cover"
      />
      <span className="finale-arm-veil" aria-hidden="true" />
      <div className="finale-arm-inner relative mx-auto flex w-full max-w-7xl px-6 md:px-14">
        <div className="finale-arm-copy fade-up">
          <h2 className="finale-arm-line font-serif font-normal">{t.line}</h2>
          <a href={pilotHref} className="track-mid mt-10 inline-flex items-center gap-3 rounded-[5px] bg-[#24262a] px-8 py-3.5 text-xs font-semibold text-[#f4f2ee] shadow-lg transition hover:bg-[#33363b]">
            {t.cta} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
