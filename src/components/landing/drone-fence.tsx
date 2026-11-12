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
 * and the query removed). The three figures left the slide (Dom, 2026-11-11:
 * « enleve sa… on garde juste le pilot truc et on dit ce que on px faire pour
 * les drones »); they stay on /critical-actions#drones with their limits.
 * Each offer below is work already run in ironproof/lab: the fence gate in
 * front of PX4 (px4_fence), the map of data outputs read from PX4 and
 * ArduCopter firmware (carte des sorties, manches 1-6), the bounded
 * SERIAL_CONTROL fix checked by CBMC (px4_fence/serial_control), the sealed
 * journal checked offline (bench.py).
 */
type Offer = { title: string; body: string };
// The « Image: illustration » notes left the page (Dom, 2026-11-11: « enlève les écritures image illustration »).
type SlideCopy = {
  eyebrow: string;
  title: string;
  titleGold: string;
  offersLabel: string;
  offers: readonly Offer[];
  cta: string;
  link: string;
};

const SLIDE: L<SlideCopy> = {
  en: {
    eyebrow: "DRONES · PX4 SIMULATION",
    title: "Three commands tried to fly into a no-fly zone.",
    titleGold: "Our gate refused all three.",
    offersLabel: "What we can do for your drones",
    offers: [
      { title: "Stop the command before the autopilot", body: "Every command that would move the drone is checked against your no-fly zones before the autopilot sees it, then refused or let through." },
      { title: "Map every data output", body: "From the firmware image alone: every channel the drone sends data on, and what goes out on it. A new output between two versions is flagged." },
      { title: "Prove a fix closes the flaw", body: "A patch to the flight code is checked against the flaw it claims to close, not only against its tests." },
      { title: "Seal every decision", body: "Accepted, refused or overridden by a person: each one is recorded, and a third party can check the record offline." },
    ],
    cta: "START A DRONE PILOT",
    link: "See the run and its limits",
  },
  fr: {
    eyebrow: "DRONES · SIMULATION PX4",
    title: "Trois commandes ont tenté d’entrer dans une zone interdite.",
    titleGold: "Notre barrière a refusé les trois.",
    offersLabel: "Ce qu’on peut faire pour vos drones",
    offers: [
      { title: "Arrêter la commande avant l’autopilote", body: "Chaque commande qui ferait bouger le drone est vérifiée selon vos zones interdites avant que l’autopilote la voie, puis refusée ou laissée passer." },
      { title: "Cartographier chaque sortie de données", body: `À partir du seul firmware${NBSP}: chaque canal par lequel le drone envoie des données, et ce qui en sort. Une nouvelle sortie entre deux versions est signalée.` },
      { title: "Prouver qu’un correctif ferme la faille", body: "Un correctif du code de vol est vérifié contre la faille qu’il prétend fermer, pas seulement contre ses tests." },
      { title: "Sceller chaque décision", body: `Acceptée, refusée ou outrepassée par une personne${NBSP}: chacune est consignée, et un tiers peut vérifier le registre hors ligne.` },
    ],
    cta: "DÉMARRER UN PILOTE DRONE",
    link: "Voir la simulation et ses limites",
  },
};

export function DroneHeroSlide({ locale, href, pilotHref }: { locale: Locale; href: string; pilotHref: string }) {
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
      </figure>
      <div className="fade-up mt-8 max-w-4xl">
        <p className="seal-label track-mid mb-4 text-xs">{s.eyebrow}</p>
        <p className="font-serif text-3xl leading-tight text-neutral-100 md:text-5xl">
          {s.title} <span className="text-[#a07a2c]">{s.titleGold}</span>
        </p>
      </div>
      <div className="fade-up mt-10">
        <p className="track-mid pb-4 text-xs text-neutral-400">{s.offersLabel}</p>
        <ol className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {s.offers.map((o, i) => (
            <li key={o.title} className="border-b border-white/10 py-5 sm:pr-6 lg:border-b-0">
              <span className="font-mono text-xs text-[#a07a2c]">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-serif text-xl leading-snug text-neutral-100">{o.title}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-neutral-300">{o.body}</p>
            </li>
          ))}
        </ol>
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
