"use client";

import { useEffect, useRef } from "react";

/*
 * The hero rings turn (Dom, 2026-11-02): very slowly on their own, faster while the
 * page scrolls (« vrm slow si sa bouge sans scroll »).
 *
 * The file is a 9.5 s loop interpolated to 96 fps, so even at the idle rate (0.2x,
 * about 19 frames a second on screen) it stays smooth. No autoPlay attribute: this
 * component starts playback at the idle rate, so the first frame never runs at full
 * speed. Without JavaScript, or with reduced motion, the still under it shows
 * (globals.css hides the video under reduced motion).
 *
 * Rate: target = IDLE + scroll speed * GAIN, capped at MAX; the shown rate eases
 * toward the target and the target falls back to IDLE when the scrolling stops.
 * The loop only runs while the hero is on screen.
 */
const IDLE_RATE = 0.2;
const MAX_RATE = 2.4;
const GAIN = 0.035; // rate added per pixel scrolled in one frame
const EASE = 0.12;
const SETTLE = 0.05;

export function HeroRingsVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.defaultPlaybackRate = IDLE_RATE;
    video.playbackRate = IDLE_RATE;

    let rate = IDLE_RATE;
    let target = IDLE_RATE;
    let lastY = window.scrollY;
    let raf = 0;
    let visible = false;

    const start = () => {
      video.playbackRate = rate;
      const p = video.play();
      // Autoplay refused (data saver, policy): the still stays, nothing breaks.
      if (p !== undefined) p.catch(() => undefined);
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      lastY = y;
      if (dy > 0) target = Math.min(MAX_RATE, Math.max(target, IDLE_RATE + dy * GAIN));
      target += (IDLE_RATE - target) * SETTLE;
      rate += (target - rate) * EASE;
      // Only touch the element when the change is visible; setting it every frame stutters.
      if (Math.abs(video.playbackRate - rate) > 0.02) video.playbackRate = rate;
      raf = window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) {
          lastY = window.scrollY;
          start();
          if (!raf) raf = window.requestAnimationFrame(tick);
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="hero-rings-video absolute inset-0 h-full w-full object-cover"
      src="/media/hero-rings-loop.mp4"
      poster="/media/hero-rings-loop-poster.jpg"
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
