import Image from "next/image";
import type { Locale } from "@/content";
import { type L, NBSP, pick } from "./i18n";

/*
 * Drones: the gate in front of PX4, in simulation (Dom, 2026-11-11: « le
 * truc de drone » on the critical-actions page, with the drone image).
 * Every number here is the run's own: ironproof/lab/px4_fence/README.md,
 * section « Live run against PX4 », and bench.py (40 cases written before the
 * first run). The limits are the README's « Limits (scope) », said on the page.
 */

type Stat = { label: string; value: string; note: string; tone: "red" | "ok" | "gold" };
type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  stats: readonly Stat[];
  limitsLabel: string;
  limits: readonly string[];
  imageNote: string;
};

const T: L<Copy> = {
  en: {
    eyebrow: "DRONES · SIMULATION",
    title: "A no-fly rule, judged before the autopilot.",
    lead: "We placed the gate on the drone’s companion computer, in front of PX4, the open-source autopilot. Every command that would move the drone is checked against the no-fly zones, with exact arithmetic on MAVLink’s own integer coordinates, before PX4 sees it. Every verdict is signed.",
    stats: [
      { label: "PX4 alone", value: "3 / 3", note: "unsafe commands accepted, with the same fence loaded in PX4", tone: "red" },
      { label: "With the gate", value: "0 / 3", note: "unsafe commands let through; the two safe ones pass", tone: "ok" },
      { label: "Cases written in advance", value: "40 / 40", note: "judged right, written before the first run", tone: "gold" },
    ],
    limitsLabel: "What this does not show yet",
    limits: [
      "It is a simulation: PX4 v1.18.0-rc1, software-in-the-loop, run on November 11, 2026.",
      "The gate judges only the commands that pass through the companion computer; a command sent straight to PX4 on another link never meets it.",
      "It trusts the position it decodes: GPS spoofing is outside its reach.",
      "A real board, a real flight and a customer’s real zones come next.",
    ],
    imageNote: "Image: illustration.",
  },
  fr: {
    eyebrow: "DRONES · SIMULATION",
    title: "Une zone interdite, jugée avant l’autopilote.",
    lead: `Nous avons placé la barrière sur l’ordinateur de bord du drone, devant PX4, l’autopilote libre. Chaque commande qui ferait bouger le drone est vérifiée selon les zones interdites, en arithmétique exacte sur les coordonnées entières de MAVLink, avant que PX4 la voie. Chaque verdict est signé.`,
    stats: [
      { label: "PX4 seul", value: "3 / 3", note: "commandes dangereuses acceptées, avec la même clôture chargée dans PX4", tone: "red" },
      { label: "Avec la barrière", value: "0 / 3", note: "commandes dangereuses laissées passer ; les deux sûres passent", tone: "ok" },
      { label: "Cas écrits d’avance", value: "40 / 40", note: "bien jugés, écrits avant le premier essai", tone: "gold" },
    ],
    limitsLabel: "Ce que cela ne montre pas encore",
    limits: [
      `C’est une simulation${NBSP}: PX4 v1.18.0-rc1, logiciel dans la boucle, exécutée le 11 novembre 2026.`,
      `La barrière ne juge que les commandes qui passent par l’ordinateur de bord${NBSP}; une commande envoyée directement à PX4 par un autre lien ne la croise jamais.`,
      `Elle se fie à la position qu’elle décode${NBSP}: le leurrage GPS est hors de sa portée.`,
      "Une vraie carte, un vrai vol et les vraies zones d’un client viennent ensuite.",
    ],
    imageNote: `Image${NBSP}: illustration.`,
  },
};

const TONE: Record<Stat["tone"], string> = {
  red: "text-[#b8443a]",
  ok: "text-[#3d8a5e]",
  gold: "text-[#a07a2c]",
};

export function DroneFence({ locale }: { locale: Locale }) {
  const t = pick(T, locale);
  return (
    <section id="drones" className="relative z-10 mx-auto max-w-7xl edge-t px-6 py-28 md:px-14">
      <div className="fade-up mb-12 max-w-3xl">
        <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
        <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.title}</h2>
        <p className="mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
      </div>
      <figure className="fade-up mb-14">
        <div className="photo-plate" aria-hidden="true">
          <Image
            src="/media/drone-no-fly-wall.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 45%" }}
          />
          <span className="plate-brackets" />
        </div>
        <figcaption className="mt-3 text-right text-xs text-neutral-500">{t.imageNote}</figcaption>
      </figure>
      <ul className="fade-up grid gap-4 md:grid-cols-3">
        {t.stats.map((s) => (
          <li key={s.label} className="rounded-[6px] border border-white/10 bg-ink/55 px-6 py-6">
            <p className="seal-label track-mid text-[11px]">{s.label}</p>
            <p className={`mt-3 font-serif text-5xl ${TONE[s.tone]}`}>{s.value}</p>
            <p className="mt-3 text-sm font-light leading-relaxed text-neutral-300">{s.note}</p>
          </li>
        ))}
      </ul>
      <div className="fade-up mt-12 max-w-3xl">
        <p className="track-mid pb-4 text-xs text-neutral-400">{t.limitsLabel}</p>
        <ul className="border-t border-white/10">
          {t.limits.map((l) => (
            <li key={l} className="border-b border-white/10 py-4 text-base font-light leading-relaxed text-neutral-300 last:border-b-0">
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
 * The same run as a slide under the home page title (Dom, 2026-11-11: « sur
 * la front première page au lieu de l'animation », the seal, the two cards
 * and the query removed). Same numbers as the section above; the limits stay
 * one click away on /critical-actions#drones and are named in the link.
 */
type SlideCopy = { eyebrow: string; title: string; titleGold: string; cta: string; link: string; imageNote: string };

const SLIDE: L<SlideCopy> = {
  en: {
    eyebrow: "DRONES · PX4 SIMULATION",
    title: "Three commands tried to fly into a no-fly zone.",
    titleGold: "Our gate refused all three.",
    cta: "START A DRONE PILOT",
    link: "See the run and its limits",
    imageNote: "Image: illustration.",
  },
  fr: {
    eyebrow: "DRONES · SIMULATION PX4",
    title: "Trois commandes ont tenté d’entrer dans une zone interdite.",
    titleGold: "Notre barrière a refusé les trois.",
    cta: "DÉMARRER UN PILOTE DRONE",
    link: "Voir la simulation et ses limites",
    imageNote: `Image${NBSP}: illustration.`,
  },
};

export function DroneHeroSlide({ locale, href, pilotHref }: { locale: Locale; href: string; pilotHref: string }) {
  const t = pick(T, locale);
  const s = pick(SLIDE, locale);
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-14 md:px-14 md:pt-20">
      <figure className="fade-up">
        <div className="photo-plate" aria-hidden="true">
          <Image
            src="/media/drone-no-fly-wall.jpg"
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 45%" }}
          />
          <span className="plate-brackets" />
        </div>
        <figcaption className="mt-3 text-right text-xs text-neutral-500">{s.imageNote}</figcaption>
      </figure>
      <div className="fade-up mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-14">
        <div>
          <p className="seal-label track-mid mb-4 text-xs">{s.eyebrow}</p>
          <p className="font-serif text-3xl leading-tight text-neutral-100 md:text-5xl">
            {s.title} <span className="text-[#a07a2c]">{s.titleGold}</span>
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {t.stats.map((st) => (
            <li key={st.label} className="flex items-center justify-between gap-4 rounded-[6px] border border-white/10 bg-ink/55 px-4 py-3 sm:block sm:py-4">
              <p className="seal-label track-mid text-[10px]">{st.label}</p>
              <p className={`whitespace-nowrap font-serif text-3xl sm:mt-2 md:text-4xl ${TONE[st.tone]}`}>{st.value}</p>
              {/* What the number counts, under it (Dom, 2026-11-11: the figures, read as on /critical-actions). */}
              <p className="mt-2 hidden text-xs leading-snug text-[#5b5f66] sm:block">{st.note}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        {/* The offer first, the limits one click away (Dom, 2026-11-11: « dire pilot »). */}
        <a href={pilotHref} className="hero-white-cta track-mid inline-flex items-center gap-3 rounded-[5px] px-8 py-3.5 text-xs font-semibold">
          {s.cta} <span aria-hidden="true">&rarr;</span>
        </a>
        <a href={href} className="track-mid inline-flex items-center gap-3 text-xs font-semibold text-neutral-200 underline decoration-white/20 underline-offset-8 transition hover:text-white">
          {s.link} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
