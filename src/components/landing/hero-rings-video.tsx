"use client";

import { useEffect, useRef } from "react";

/*
 * The hero rings turn (Dom, 2026-11-02): very slowly on their own, faster while the
 * page scrolls (« vrm slow si sa bouge sans scroll »).
 *
 * Engraved (Dom, 2026-11-07: « rends ça moins plastique », then « gravure, nice »):
 * the video is never shown. Each frame is redrawn as line engraving, the technique of
 * banknotes and certificates: one horizontal line per row, thicker where the metal is
 * darker. Iron in ink, gold in gold, the white ring as a fine line. The canvas carries
 * the same class as the video did, so every framing rule in globals.css (object-position,
 * scale) applies to it unchanged, and the lines (hero-connectors.tsx) keep their places.
 *
 * The file is a 9.5 s loop interpolated to 96 fps, so even at the idle rate (0.2x,
 * about 19 frames a second on screen) it stays smooth. No autoPlay attribute: this
 * component starts playback at the idle rate, so the first frame never runs at full
 * speed. Without JavaScript the still under it shows. With reduced motion, the first
 * frame is engraved once and nothing moves.
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

// Engraving, in the video's own pixels (1440 x 1080).
const ROW_GAP = 7; // one line every 7 px (Dom, 2026-11-07: « moins intense »)
const COL_STEP = 3; // sampled every 3 px along the line
const INK_MIN = 0.1;
const IRON = "rgba(36,38,42,.7)";
const GOLD = "rgba(168,132,58,.82)";
const WHITE_LINE = "rgba(36,38,42,.42)";

type Metal = "iron" | "gold" | "white";

export function HeroRingsVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = ref.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    const sampler = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx || !sampler) return;

    let bg: [number, number, number] | null = null;
    let lastDrawn = -1;

    const engrave = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (video.readyState < 2 || vw === 0 || vh === 0) return;
      if (video.currentTime === lastDrawn) return; // same frame: nothing to redraw
      lastDrawn = video.currentTime;
      if (canvas.width !== vw || canvas.height !== vh) {
        canvas.width = vw;
        canvas.height = vh;
      }
      const cols = Math.floor(vw / COL_STEP);
      const rows = Math.floor(vh / ROW_GAP);
      sampler.canvas.width = cols;
      sampler.canvas.height = rows;
      sampler.drawImage(video, 0, 0, cols, rows);
      let d: Uint8ClampedArray;
      try {
        d = sampler.getImageData(0, 0, cols, rows).data;
      } catch {
        return; // unreadable frame: the still under the canvas stays visible
      }
      if (!bg) bg = [d[0] ?? 230, d[1] ?? 228, d[2] ?? 224];
      const bl = (0.3 * bg[0] + 0.59 * bg[1] + 0.11 * bg[2]) / 255;

      const read = (k: number, floor: boolean): { ink: number; metal: Metal } => {
        const r = d[k] ?? 0;
        const g = d[k + 1] ?? 0;
        const b = d[k + 2] ?? 0;
        const lum = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
        const sat = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
        // The cast shadow is only a little darker than the floor: it does not count.
        // Below the rings, only a clearly dark pixel is metal; the soft shadow on the floor is not.
        const dark = bl - lum > (floor ? 0.3 : 0.12) ? (bl - lum) * 1.9 : 0;
        const light = lum - bl > (floor ? 0.08 : 0) ? (lum - bl) * 2.6 : 0;
        const ink = dark + sat * 1.5 + light;
        const metal: Metal = lum > bl + 0.02 && sat < 0.12 ? "white" : sat > 0.12 ? "gold" : "iron";
        return { ink, metal };
      };

      ctx.clearRect(0, 0, vw, vh);
      for (let j = 0; j < rows; j++) {
        const y0 = j * ROW_GAP + ROW_GAP / 2;
        let i = 0;
        while (i < cols) {
          const floor = j / rows > 0.76;
          const first = read((j * cols + i) * 4, floor);
          if (first.ink < INK_MIN) {
            i++;
            continue;
          }
          // One run of the same metal is drawn as one filled stroke.
          const top: number[] = [];
          const bot: number[] = [];
          let i2 = i;
          for (; i2 < cols; i2++) {
            const p = read((j * cols + i2) * 4, floor);
            if (p.ink < INK_MIN || p.metal !== first.metal) break;
            const w = first.metal === "white" ? 1.1 : Math.min(ROW_GAP * 0.55, 0.5 + p.ink * ROW_GAP * 0.4);
            const x = i2 * COL_STEP + COL_STEP / 2;
            const wave = Math.sin(x * 0.015 + j * 0.6) * 0.6; // the burin's slight tremor
            top.push(x, y0 - w / 2 + wave);
            bot.push(x, y0 + w / 2 + wave);
          }
          if (top.length > 2) {
            ctx.beginPath();
            ctx.moveTo(top[0] ?? 0, top[1] ?? 0);
            for (let q = 2; q < top.length; q += 2) ctx.lineTo(top[q] ?? 0, top[q + 1] ?? 0);
            for (let q = bot.length - 2; q >= 0; q -= 2) ctx.lineTo(bot[q] ?? 0, bot[q + 1] ?? 0);
            ctx.closePath();
            ctx.fillStyle = first.metal === "gold" ? GOLD : first.metal === "white" ? WHITE_LINE : IRON;
            ctx.fill();
          }
          i = Math.max(i2, i + 1);
        }
      }
      // The engraving now carries the picture: the plastic still under it goes.
      canvas.parentElement?.setAttribute("data-engraved", "");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Still: engrave the first frame once.
      const once = () => engrave();
      if (video.readyState >= 2) once();
      else video.addEventListener("loadeddata", once, { once: true });
      return () => video.removeEventListener("loadeddata", once);
    }

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
      engrave();
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
    io.observe(canvas);

    return () => {
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      video.pause();
    };
  }, []);

  return (
    <>
      {/* Read, never shown: the canvas draws each of its frames as engraving. */}
      <video
        ref={ref}
        className="pointer-events-none absolute h-px w-px"
        style={{ opacity: 0 }}
        src="/media/hero-rings-loop.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <canvas ref={canvasRef} className="hero-rings-video absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
    </>
  );
}
