"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * THE GATE — a 15 s silent loop above "see it decide".
 *
 * Three actions (API, script, person) pass the gate and execute; the AI
 * agent's action reaches it and the blade drops: BLOCKED / OUTSIDE POLICY.
 * Both halves of the act are on screen on purpose — a loop that only blocks
 * sells a brake, while the value is that authorized actions run.
 *
 * Delivery rules, each with its reason:
 *   - AV1 first, H.264 fallback: Safari decodes AV1 only in hardware.
 *   - muted + playsInline: without them iOS refuses autoplay or goes
 *     fullscreen.
 *   - Stoppable without an icon on the film: a loop longer than 5 s must be
 *     stoppable (WCAG 2.2.2), so the whole frame is the control (click, or
 *     Enter/Space when focused). Dom asked for no play logo over the video.
 *   - Reduced motion: the poster only, the video never starts.
 *   - Off screen: paused, so a tab left open does not decode for nothing.
 *   - Starts fast (Dom, 2026-09-25: people scroll past before anything moves):
 *     fetched only when it comes within a third of a screen (preload="none":
 *     at page load it cost mobile 1.1 MB and an AV1 decode, Lighthouse
 *     2026-09-25), started before it is visible,
 *     and the first play jumps to 2 s: one frame per second shows gold
 *     (authorized, SCRIPT then its path) from 2-3 s and the red agent from
 *     4 s. Dom: it must open on gold, never on red. The loop then plays whole.
 *   - play() rejected (Low Power Mode, autoplay policy): the poster stays,
 *     a click on the frame starts it — degrade, never a broken frame.
 */

type Copy = { label: string; pause: string; play: string };

const T: L<Copy> = {
  en: {
    label:
      "Animation: four channels (AI agent, API, script, person) reach the Ironproof gate. The API, script and person actions pass and execute. The AI agent's action is stopped as a blade drops across the gate, reading BLOCKED, outside policy.",
    pause: "Pause animation",
    play: "Play animation",
  },
  fr: {
    label:
      "Animation : quatre canaux (agent IA, API, script, personne) arrivent à la barrière Ironproof. Les actions de l’API, du script et de la personne passent et s’exécutent. Celle de l’agent IA est arrêtée par une lame qui tombe sur la barrière : BLOCKED, hors politique.",
    pause: "Mettre l’animation en pause",
    play: "Lire l’animation",
  },
};

const POSTER = "/media/gate-poster.jpg";
const FIRST_PLAY_AT = 2; // seconds: the first gold (an authorized action) lights up

export function GateLoop({ locale }: { locale: Locale }) {
  const t = pick(T, locale);
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const started = useRef(false);
  const tryPlay = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (!started.current) {
      started.current = true;
      // Nothing is downloaded until now (preload="none"): fetch, then seek to
      // the first gold once the duration is known.
      const seek = () => {
        try {
          v.currentTime = FIRST_PLAY_AT;
        } catch {
          // Not seekable: it simply starts from 0, the loop is still whole.
        }
      };
      if (v.readyState >= 1) seek();
      else v.addEventListener("loadedmetadata", seek, { once: true });
    }
    v.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced || userPaused) {
      v?.pause();
      setPlaying(false);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) tryPlay();
        else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 35% 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, userPaused, tryPlay]);

  const toggle = () => {
    if (playing) {
      setUserPaused(true);
    } else {
      setUserPaused(false);
      tryPlay();
    }
  };

  return (
    <figure className="gate-loop fade-up relative mx-auto mb-14 w-full max-w-5xl overflow-hidden rounded-[6px]">
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element -- static poster, no optimisation needed
        <img src={POSTER} alt={t.label} width={1920} height={1080} className="block h-auto w-full" />
      ) : (
        <video
          ref={ref}
          className="block h-auto w-full"
          width={1920}
          height={1080}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="none"
          aria-label={t.label}
        >
          <source src="/media/gate.av1.mp4" type='video/mp4; codecs="av01.0.08M.10"' />
          <source src="/media/gate.h264.mp4" type='video/mp4; codecs="avc1.640032"' />
        </video>
      )}
      {!reduced && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.pause : t.play}
          className="absolute inset-0 cursor-pointer bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/60"
        />
      )}
    </figure>
  );
}
