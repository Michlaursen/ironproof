"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content";

/*
 * The last screen of the home page (Dom, 2026-11-07: « fais-moi un king design »).
 *
 * One idea, drawn in dots: "probably" is a grey cloud that never sits still; a gold
 * line sweeps the screen (∀x, every input) and each dot it crosses locks into a
 * clean grid, until the word reads "provably." The two words differ by one letter,
 * so the v turns gold. The wordplay only exists in English, so the French page keeps
 * it as a signature and translates the rest (Dom, 2026-11-07: « du probable au
 * prouvé c'est mauvais »).
 *
 * Around the word: the hero rings (the same loop as the top of the page, redrawn as
 * halftone), a transmission tower on the left and a telecom mast on the right. Their
 * lines run into the rings: every critical action goes through the gate. Once the
 * word is proven, gold pulses run along them.
 *
 * Starts when the section is half on screen; stops drawing when it leaves.
 * Reduced motion: the proven state, still. Phones (< 900 px): no tower, no mast.
 */

type Copy = {
  link: [string, string];
  state: string;
  probable: string;
  proven: string;
  line: string;
  cta: string;
  grid: string;
  telecom: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    link: ["From", "to"],
    state: "STATE: ",
    probable: "PROBABLE",
    proven: "PROVEN",
    line: "A test tries a few cases. A proof covers them all.",
    cta: "START A PILOT",
    grid: "POWER GRID",
    telecom: "TELECOM",
  },
  fr: {
    link: ["From", "to"],
    state: "ÉTAT : ",
    probable: "PROBABLE",
    proven: "PROUVÉ",
    line: "Un test essaie quelques cas. Une preuve les couvre tous.",
    cta: "DÉMARRER UN PILOTE",
    grid: "RÉSEAU ÉLECTRIQUE",
    telecom: "TÉLÉCOM",
  },
};

const WORD_A = "probably";
const WORD_B = "provably.";
const HOLD_MS = 1600;
const SWEEP_MS = 2600;
const INK = "#24262a";
const GOLD = "#a8843a";

type WordDot = {
  ax: number; ay: number; bx: number; by: number;
  ox: number; oy: number; vx: number; vy: number;
  ph: number; sp: number; r0: number;
};
type InfraDot = { x: number; y: number; ph: number; gold: boolean };
type Cable = { x0: number; y0: number; x1: number; y1: number; sag: number; phase: number; node: boolean; dense: number };
type Label = { x: number; y: number; text: string };

const ease = (u: number): number => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const clamp01 = (u: number): number => Math.max(0, Math.min(1, u));

function fontFamily(variable: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return v.length > 0 ? v : fallback;
}

export function ProvablyFinale({ locale, pilotHref }: { locale: Locale; pilotHref: string }) {
  const copy = COPY[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [proven, setProven] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!section || !canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const serif = fontFamily("--font-eb-garamond", "Georgia, serif");
    const mono = fontFamily("--font-jetbrains", "ui-monospace, monospace");

    const grid = document.createElement("canvas");
    const g = grid.getContext("2d", { willReadFrequently: true });

    let W = 0;
    let H = 0;
    let step = 5;
    let dots: WordDot[] = [];
    let vZone: [number, number] | null = null;
    let infra: InfraDot[] = [];
    let cables: Cable[] = [];
    let labels: Label[] = [];
    let mastTop: { x: number; y: number } | null = null;
    const ring = { cx: 0, cy: 0, side: 0, cols: 0, cell: 6 };
    let bg: [number, number, number] | null = null;
    let raf = 0;
    let visible = false;
    let started = 0;
    let provenShown = false;
    const mouse = { x: -9999, y: -9999 };

    const wordPoints = (word: string): { x: number; y: number }[] => {
      const oc = document.createElement("canvas");
      oc.width = W;
      oc.height = H;
      const o = oc.getContext("2d");
      if (!o) return [];
      const maxW = W * (W < 900 ? 0.88 : 0.62);
      let size = Math.min(maxW / (word.length * 0.5), H * 0.2);
      o.font = `500 ${size}px ${serif}`;
      while (o.measureText(word).width > maxW && size > 20) {
        size -= 4;
        o.font = `500 ${size}px ${serif}`;
      }
      o.fillStyle = "#000";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(word, W / 2, H * 0.735);
      if (word === WORD_B) {
        const left = W / 2 - o.measureText(word).width / 2;
        vZone = [left + o.measureText("pro").width - 2, left + o.measureText("prov").width + 2];
      }
      const data = o.getImageData(0, 0, W, H).data;
      const out: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if ((data[(y * W + x) * 4 + 3] ?? 0) > 128) out.push({ x, y });
        }
      }
      return out;
    };

    const segs = (list: [number, number, number, number][], spacing: number, gold: boolean): InfraDot[] => {
      const out: InfraDot[] = [];
      for (const [x1, y1, x2, y2] of list) {
        const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / spacing));
        for (let k = 0; k <= n; k++) {
          out.push({ x: x1 + ((x2 - x1) * k) / n, y: y1 + ((y2 - y1) * k) / n, ph: Math.random() * 6.28, gold });
        }
      }
      return out;
    };

    const buildInfra = () => {
      infra = [];
      cables = [];
      labels = [];
      mastTop = null;
      if (W < 900) return;
      const sp = 6;
      // Transmission tower, left. u: -1..1 across, v: 0 ground .. 1 top.
      {
        const cx = W * 0.095;
        const hw = W * 0.06;
        const hh = H * 0.8;
        const base = H * 1.01;
        const P = (u: number, v: number): [number, number] => [cx + u * hw, base - v * hh];
        const legX = (v: number): number => (v <= 0.62 ? 1 - (0.75 * v) / 0.62 : 0.25 - (0.07 * (v - 0.62)) / 0.28);
        const L: [number, number, number, number][] = [];
        const levels = [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.76, 0.9];
        for (let i = 0; i < levels.length - 1; i++) {
          const a = levels[i] ?? 0;
          const b = levels[i + 1] ?? 0;
          L.push([...P(-legX(a), a), ...P(-legX(b), b)], [...P(legX(a), a), ...P(legX(b), b)]);
          L.push([...P(-legX(a), a), ...P(legX(b), b)], [...P(legX(a), a), ...P(-legX(b), b)]);
          L.push([...P(-legX(b), b), ...P(legX(b), b)]);
        }
        L.push([...P(-0.18, 0.9), ...P(0, 1)], [...P(0.18, 0.9), ...P(0, 1)]);
        const arms: [number, number][] = [[0.62, 1.25], [0.76, 1.0]];
        for (const [v, ext] of arms) {
          L.push([...P(-ext, v), ...P(ext, v)], [...P(-ext, v), ...P(-legX(v), v + 0.05)], [...P(ext, v), ...P(legX(v), v + 0.05)]);
        }
        infra.push(...segs(L, sp, false));
        for (const [v, ext] of arms) {
          for (const sgn of [-1, 1]) {
            const [x, y] = P(sgn * ext, v);
            infra.push(...segs([[x, y, x, y + H * 0.035]], 4, true));
            if (sgn < 0) {
              cables.push({ x0: x, y0: y + H * 0.035, x1: -40, y1: y + H * 0.06, sag: H * 0.05, phase: v, node: false, dense: 70 });
            } else {
              cables.push({
                x0: x, y0: y + H * 0.035,
                x1: ring.cx - ring.side * 0.36, y1: ring.cy + ring.side * (v < 0.7 ? 0.16 : -0.04),
                sag: H * 0.045, phase: v, node: true, dense: 70,
              });
            }
          }
        }
        labels.push({ x: cx, y: H * 0.16, text: copy.grid });
      }
      // Telecom mast, right: triangular lattice, panels, gold dishes.
      {
        const cx = W * 0.91;
        const hw = W * 0.032;
        const hh = H * 0.74;
        const base = H * 1.01;
        const P = (u: number, v: number): [number, number] => [cx + u * hw, base - v * hh];
        const legX = (v: number): number => 1 - 0.62 * v;
        const L: [number, number, number, number][] = [];
        const n = 12;
        for (let i = 0; i < n; i++) {
          const a = i / n;
          const b = (i + 1) / n;
          L.push([...P(-legX(a), a), ...P(-legX(b), b)], [...P(legX(a), a), ...P(legX(b), b)]);
          L.push([...P(i % 2 ? -legX(a) : legX(a), a), ...P(i % 2 ? legX(b) : -legX(b), b)]);
          L.push([...P(-legX(b), b), ...P(legX(b), b)]);
        }
        L.push([...P(0, 1), ...P(0, 1.06)]);
        for (const sgn of [-1, 1]) {
          L.push([...P(sgn * 0.55, 0.9), ...P(sgn * 0.55, 0.99)], [...P(sgn * 0.85, 0.9), ...P(sgn * 0.85, 0.99)]);
        }
        infra.push(...segs(L, sp, false));
        const dish = (u: number, v: number, r: number, dir: number): InfraDot[] => {
          const [x, y] = P(u, v);
          const pts: InfraDot[] = [];
          for (let k = 0; k <= 22; k++) {
            const t = -1.2 + (2.4 * k) / 22;
            pts.push({ x: x + dir * Math.cos(t) * r * 0.35, y: y + Math.sin(t) * r, ph: Math.random() * 6.28, gold: true });
          }
          return pts;
        };
        infra.push(...dish(-0.9, 0.72, H * 0.05, -1), ...dish(0.9, 0.58, H * 0.04, 1), ...dish(-0.8, 0.45, H * 0.035, -1));
        mastTop = { x: cx, y: base - hh };
        const [dx, dy] = P(-0.9, 0.72);
        cables.push({ x0: dx - H * 0.02, y0: dy, x1: ring.cx + ring.side * 0.36, y1: ring.cy + ring.side * 0.1, sag: H * 0.035, phase: 0.3, node: true, dense: 46 });
        labels.push({ x: cx, y: base - hh - H * 0.1, text: copy.telecom });
      }
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      step = W < 600 ? 3 : W < 1100 ? 4 : 5;
      ring.side = Math.min(H * 0.52, W * 0.8);
      ring.cx = W / 2;
      ring.cy = H * 0.3;
      ring.cell = W < 600 ? 5 : 6;
      ring.cols = Math.floor(ring.side / ring.cell);
      grid.width = ring.cols;
      grid.height = ring.cols;
      buildInfra();
      const A = wordPoints(WORD_A).sort((p, q) => p.x - q.x);
      const B = wordPoints(WORD_B).sort((p, q) => p.x - q.x);
      const n = Math.max(A.length, B.length);
      dots = [];
      if (A.length === 0 || B.length === 0) return;
      for (let i = 0; i < n; i++) {
        const a = A[Math.floor((i * A.length) / n)];
        const b = B[Math.floor((i * B.length) / n)];
        if (!a || !b) continue;
        dots.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, ox: 0, oy: 0, vx: 0, vy: 0, ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 1.6, r0: 0.5 + Math.random() * 1.4 });
      }
    };

    const drawRings = (lineX: number, tt: number) => {
      if (!g || video.readyState < 2 || ring.cols < 2) return;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const s = vh * 0.92;
      g.drawImage(video, (vw - s) / 2, (vh - s) / 2 - vh * 0.035, s, s, 0, 0, ring.cols, ring.cols);
      let d: Uint8ClampedArray;
      try {
        d = g.getImageData(0, 0, ring.cols, ring.cols).data;
      } catch {
        return; // a tainted frame: the word and the edges still draw
      }
      if (!bg) bg = [d[0] ?? 226, d[1] ?? 224, d[2] ?? 220];
      const bl = (0.3 * bg[0] + 0.59 * bg[1] + 0.11 * bg[2]) / 255;
      const x0 = ring.cx - ring.side / 2;
      const y0 = ring.cy - ring.side / 2;
      const c = ring.cell;
      for (let j = 0; j < ring.cols; j++) {
        for (let i = 0; i < ring.cols; i++) {
          const k = (j * ring.cols + i) * 4;
          const r = d[k] ?? 0;
          const gg = d[k + 1] ?? 0;
          const b = d[k + 2] ?? 0;
          const lum = (0.3 * r + 0.59 * gg + 0.11 * b) / 255;
          const sat = (Math.max(r, gg, b) - Math.min(r, gg, b)) / 255;
          const fx = (i + 0.5) / ring.cols - 0.5;
          const fy = (j + 0.5) / ring.cols - 0.5;
          // A circle, never the square edge of the video; the cast shadow below stays out.
          const vign = clamp01((0.44 - Math.hypot(fx, fy)) / 0.07) * (fy > 0.3 ? 0 : 1);
          const dark = bl - lum > 0.12 ? (bl - lum) * 1.9 : 0;
          const ink = (dark + sat * 1.5 + Math.max(0, (lum - bl) * 2.6)) * vign;
          if (ink < 0.1) continue;
          const x = x0 + i * c + c / 2;
          const y = y0 + j * c + c / 2;
          const sw = clamp01(-(x - lineX) / 200);
          const amp = (1 - sw) * 2.6;
          const jx = Math.sin(tt * 2.3 + i * 1.7 + j) * amp;
          const jy = Math.cos(tt * 1.9 + j * 1.3 + i) * amp;
          const rad = Math.min(c * 0.62, (0.18 + ink) * c * 0.5) * (0.75 + 0.25 * sw);
          const white = lum > bl + 0.02 && sat < 0.12;
          if (sw < 0.02) {
            const gy = Math.round(150 - ink * 40);
            ctx.fillStyle = `rgba(${gy},${gy + 2},${gy + 6},${0.55 + 0.3 * Math.sin(tt * 3 + i + j)})`;
          } else if (white) {
            ctx.fillStyle = `rgba(255,255,255,${0.85 * sw + 0.15})`;
          } else {
            const mix = (a: number, bb: number) => Math.round(a * (1 - sw) + bb * sw);
            ctx.fillStyle = `rgb(${mix(140, r * 0.92)},${mix(142, gg * 0.92)},${mix(148, b * 0.92)})`;
          }
          ctx.beginPath();
          ctx.arc(x + jx, y + jy, rad, 0, 6.283);
          ctx.fill();
          if (sw > 0.5 && white) {
            ctx.strokeStyle = "rgba(36,38,42,.42)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawInfra = (lineX: number, tt: number, done: boolean, since: number) => {
      for (const p of infra) {
        const sw = clamp01((lineX - p.x) / 200);
        const amp = (1 - sw) * 2.4;
        ctx.fillStyle = sw > 0.5
          ? (p.gold ? GOLD : `rgba(36,38,42,${0.55 + 0.35 * sw})`)
          : `rgba(140,143,150,${0.45 + 0.25 * Math.sin(tt * 3 + p.ph)})`;
        ctx.beginPath();
        ctx.arc(p.x + Math.sin(tt * 2.2 + p.ph) * amp, p.y + Math.cos(tt * 1.8 + p.ph * 1.3) * amp, p.gold ? 1.7 : 1.35, 0, 6.283);
        ctx.fill();
      }
      for (const c of cables) {
        for (let k = 0; k <= c.dense; k++) {
          const t = k / c.dense;
          const x = c.x0 + (c.x1 - c.x0) * t;
          const y = c.y0 + (c.y1 - c.y0) * t + Math.sin(Math.PI * t) * c.sag;
          const sw = clamp01((lineX - x) / 200);
          let col = sw > 0.5 ? "rgba(36,38,42,.6)" : "rgba(140,143,150,.45)";
          let rad = 1.1;
          if (done) {
            const head = (since / 1700 + c.phase) % 1;
            const dd = Math.abs(t - head);
            if (dd < 0.06) {
              col = `rgba(201,162,75,${1 - dd / 0.06})`;
              rad = 2.1;
            }
          }
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, 6.283);
          ctx.fill();
        }
        if (c.node) {
          ctx.fillStyle = done ? `rgba(168,132,58,${0.6 + 0.4 * Math.sin(since / 260 + c.phase * 6)})` : "rgba(140,143,150,.5)";
          ctx.beginPath();
          ctx.arc(c.x1, c.y1, done ? 3.2 : 2, 0, 6.283);
          ctx.fill();
        }
      }
      if (done && mastTop) {
        for (let k = 0; k < 3; k++) {
          const ph = (since / 1400 + k / 3) % 1;
          ctx.strokeStyle = `rgba(168,132,58,${0.7 * (1 - ph)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(mastTop.x, mastTop.y, 14 + ph * 70, Math.PI * 1.08, Math.PI * 1.92);
          ctx.stroke();
        }
      }
      if (done) {
        ctx.font = `500 10.5px ${mono}`;
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(168,132,58,${Math.min(1, since / 700)})`;
        for (const l of labels) ctx.fillText(l.text, l.x, l.y);
        ctx.textAlign = "start";
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (!started) started = now;
      const el = reduced ? 1e9 : now - started;
      const sweep = clamp01((el - HOLD_MS) / SWEEP_MS);
      const lineX = -0.12 * W + sweep * 1.3 * W;
      const done = sweep >= 1;
      const since = Math.max(0, el - HOLD_MS - SWEEP_MS);
      const tt = now / 1000;
      ctx.clearRect(0, 0, W, H);

      drawRings(lineX, tt);
      drawInfra(lineX, tt, done, reduced ? now : since);

      if (sweep > 0 && sweep < 1) {
        const gr = ctx.createLinearGradient(lineX - 160, 0, lineX + 2, 0);
        gr.addColorStop(0, "rgba(168,132,58,0)");
        gr.addColorStop(1, "rgba(168,132,58,.14)");
        ctx.fillStyle = gr;
        ctx.fillRect(lineX - 160, 0, 162, H);
        ctx.fillStyle = "rgba(168,132,58,.95)";
        ctx.fillRect(lineX, 0, 1.2, H);
        ctx.font = `500 11px ${mono}`;
        ctx.fillText("∀x", lineX + 8, H * 0.08);
      }

      for (const p of dots) {
        const s = ease(lineX > Math.max(p.ax, p.bx) + 40 ? 1 : clamp01((lineX - Math.min(p.ax, p.bx)) / 220));
        const amp = (1 - s) * (4 + 2.5 * Math.sin(tt * 0.7 + p.ph));
        const jx = Math.sin(tt * p.sp * 2.1 + p.ph) * amp + Math.cos(tt * 3.3 * p.sp + p.ph * 2) * amp * 0.6;
        const jy = Math.cos(tt * p.sp * 1.7 + p.ph) * amp + Math.sin(tt * 2.9 * p.sp + p.ph) * amp * 0.6;
        const tx = p.ax + (p.bx - p.ax) * s + jx;
        const ty = p.ay + (p.by - p.ay) * s + jy;
        // The mouse pushes an offset, never the target: probable dots drift away, proven ones snap back.
        const dx = tx + p.ox - mouse.x;
        const dy = ty + p.oy - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 100 * 100) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / 100) * (s > 0.99 ? 4 : 8);
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        const k = 0.02 + s * 0.16;
        const damp = 0.86 - s * 0.12;
        p.vx = (p.vx - p.ox * k) * damp;
        p.vy = (p.vy - p.oy * k) * damp;
        p.ox += p.vx;
        p.oy += p.vy;
        const inV = vZone !== null && s > 0.98 && p.bx >= vZone[0] && p.bx <= vZone[1];
        const a = Math.min(1, 0.55 + 0.3 * Math.sin(tt * p.sp + p.ph) * (1 - s) + 0.45 * s);
        ctx.fillStyle = inV ? GOLD : s > 0.98 ? INK
          : `rgba(${Math.round(130 - 94 * s)},${Math.round(133 - 95 * s)},${Math.round(140 - 98 * s)},${a})`;
        ctx.beginPath();
        ctx.arc(tx + p.ox, ty + p.oy, Math.max(0.4, p.r0 * (1 - s) + step * 0.42 * s), 0, 6.283);
        ctx.fill();
      }

      if (done !== provenShown) {
        provenShown = done;
        setProven(done);
        video.playbackRate = done ? 1 : 0.5;
      }
      raf = window.requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => build();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) {
          const p = video.play();
          if (p !== undefined) p.catch(() => undefined); // autoplay refused: rings stay out, the rest draws
          if (!raf) raf = window.requestAnimationFrame(frame);
        } else {
          video.pause();
          if (raf) window.cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.5 },
    );

    let cancelled = false;
    const go = () => {
      if (cancelled) return;
      build();
      io.observe(section);
    };
    document.fonts.ready.then(go).catch(go);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    video.playbackRate = 0.5;

    return () => {
      cancelled = true;
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [copy]);

  return (
    <section
      ref={sectionRef}
      id="provably"
      aria-label="From probably to provably."
      className="relative z-10 h-[100svh] min-h-[620px] overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 34%, #efede9 0%, #e6e4e0 62%)" }}
    >
      <video
        ref={videoRef}
        src="/media/hero-rings-loop.mp4"
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
      <p className="track-mid pointer-events-none absolute left-4 top-6 text-[11px] text-neutral-500 md:left-14 md:top-10">
        {copy.state}
        <b className={proven ? "font-medium text-[#a8843a]" : "font-medium"}>{proven ? copy.proven : copy.probable}</b>
      </p>
      <p
        className="pointer-events-none absolute left-1/2 top-[57%] -translate-x-1/2 font-serif text-[clamp(26px,3.4vw,48px)] italic text-[#24262a]"
        aria-hidden="true"
      >
        {proven ? copy.link[1] : copy.link[0]}
      </p>
      <p
        className={`pointer-events-none absolute bottom-[13.5%] left-1/2 w-[min(90vw,760px)] -translate-x-1/2 text-center font-serif text-[clamp(17px,1.9vw,23px)] italic text-[#3a3d43] transition-opacity duration-700 ${proven ? "opacity-100" : "opacity-0"}`}
      >
        {copy.line}
      </p>
      <div className="absolute inset-x-0 bottom-6 flex justify-center md:bottom-10">
        <a
          href={pilotHref}
          className={`track-mid border-b border-[#a8843a] px-1 py-3 text-xs text-[#24262a] transition duration-500 hover:text-[#a8843a] ${proven ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        >
          {copy.cta} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
