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
// Cleaner pass (Dom, 2026-11-07: « trop intense », « moins griché, plus propre »): finer sampling,
// each line smoothed along its length so it swells and tapers instead of breaking, specks dropped,
// softer ink.
const ROW_GAP = 7; // one line every 7 px
const COL_STEP = 2; // sampled every 2 px along the line
const SMOOTH = 2; // box-blur radius along the line, in samples
const MIN_RUN = 6; // shorter runs are specks, not metal
const INK_MIN = 0.18;
const IRON = "rgba(36,38,42,.86)";
const GOLD = "rgba(160,124,50,.95)";
const WHITE_LINE = "rgba(36,38,42,.45)";

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

      // Per sample: how much metal (ink), and how much of it is gold or the white ring.
      const ink = new Float32Array(cols);
      const gold = new Float32Array(cols);
      const white = new Float32Array(cols);
      const sInk = new Float32Array(cols);
      const sGold = new Float32Array(cols);
      const sWhite = new Float32Array(cols);

      ctx.clearRect(0, 0, vw, vh);
      for (let j = 0; j < rows; j++) {
        const y0 = j * ROW_GAP + ROW_GAP / 2;
        // Below the rings, only clearly dark or clearly light pixels are metal; the soft shadow is not.
        const floor = j / rows > 0.76;
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4;
          const r = d[k] ?? 0;
          const g = d[k + 1] ?? 0;
          const b = d[k + 2] ?? 0;
          const lum = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
          const sat = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
          const dark = bl - lum > (floor ? 0.3 : 0.12) ? (bl - lum) * 1.9 : 0;
          const light = lum - bl > (floor ? 0.08 : 0) ? (lum - bl) * 2.6 : 0;
          ink[i] = dark + sat * 1.5 + light;
          gold[i] = sat > 0.12 ? 1 : 0;
          white[i] = lum > bl + 0.02 && sat < 0.12 ? 1 : 0;
        }
        // Smooth along the line: one sliding window, so each line swells and tapers.
        let aI = 0;
        let aG = 0;
        let aW = 0;
        for (let i = -SMOOTH; i < cols + SMOOTH; i++) {
          const add = i + SMOOTH;
          const drop = i - SMOOTH - 1;
          if (add < cols) { aI += ink[add] ?? 0; aG += gold[add] ?? 0; aW += white[add] ?? 0; }
          if (drop >= 0) { aI -= ink[drop] ?? 0; aG -= gold[drop] ?? 0; aW -= white[drop] ?? 0; }
          if (i >= 0 && i < cols) {
            const n = Math.min(cols - 1, i + SMOOTH) - Math.max(0, i - SMOOTH) + 1;
            sInk[i] = aI / n;
            sGold[i] = aG / n;
            sWhite[i] = aW / n;
          }
        }
        // Metal of a sample, read on the smoothed values so a line does not flicker between colours.
        const kind = (q: number): 0 | 1 | 2 => ((sGold[q] ?? 0) > 0.5 ? 1 : (sWhite[q] ?? 0) > 0.6 ? 2 : 0);
        let i = 0;
        while (i < cols) {
          if ((sInk[i] ?? 0) < INK_MIN) {
            i++;
            continue;
          }
          const m = kind(i);
          let i2 = i;
          while (i2 < cols && (sInk[i2] ?? 0) >= INK_MIN && kind(i2) === m) i2++;
          if (i2 - i >= MIN_RUN) {
            const width = (q: number): number =>
              m === 2 ? 0.9 : Math.min(ROW_GAP * 0.5, 0.5 + (sInk[q] ?? 0) * ROW_GAP * 0.46);
            ctx.beginPath();
            for (let q = i; q < i2; q++) {
              const x = q * COL_STEP + COL_STEP / 2;
              if (q === i) ctx.moveTo(x, y0 - width(q) / 2);
              else ctx.lineTo(x, y0 - width(q) / 2);
            }
            for (let q = i2 - 1; q >= i; q--) ctx.lineTo(q * COL_STEP + COL_STEP / 2, y0 + width(q) / 2);
            ctx.closePath();
            ctx.fillStyle = m === 1 ? GOLD : m === 2 ? WHITE_LINE : IRON;
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
