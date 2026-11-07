"use client";

import { useEffect, useRef } from "react";

/*
 * The hero rings, drawn as a wireframe gyroscope (Dom, 2026-11-07: « le logo au début
 * j'aime pas le design, trouve autre chose », then « j'aime bien » on the wireframe).
 * It replaced the engraved video, which replaced the 3D loop (« moins plastique »).
 *
 * Three bands, the same three as the logo: an outer ring in fine iron lines with a
 * knurl, an iron ring cross-hatched, a gold ring with grooves. Each turns on its own
 * axis; the far side of every band fades, so depth comes from the drawing, not a
 * render. The outer ring's pivot is a dashed axis held by two gold bearings.
 *
 * They turn slowly on their own and faster while the page scrolls (Dom, 2026-11-02:
 * « vrm slow si sa bouge sans scroll »). Drawn only while the hero is on screen.
 * Reduced motion: one still drawing. Without JavaScript, the still image under it shows.
 */

type Ring = {
  R: number;
  w: number;
  gold: boolean;
  alpha: number;
  ribs: number;
  rails: number;
  tilt: readonly [number, number, number];
  spin: readonly [number, number, number];
};

const RINGS: readonly Ring[] = [
  { R: 1.0, w: 0.16, gold: false, alpha: 0.55, ribs: 72, rails: 4, tilt: [0.35, -0.25, 0], spin: [0, 0.05, 0] },
  { R: 0.78, w: 0.2, gold: false, alpha: 0.95, ribs: 56, rails: 4, tilt: [1.05, 0.3, 0.2], spin: [0, 0.16, 0] },
  { R: 0.55, w: 0.26, gold: true, alpha: 1, ribs: 0, rails: 11, tilt: [-0.6, 0.9, -0.3], spin: [0.22, 0, 0.07] },
];
const INK = "36,38,42";
const GOLD = "168,124,44";
const SEGMENTS = 160;

const IDLE_RATE = 1;
const MAX_RATE = 7;
const GAIN = 0.12; // rate added per pixel scrolled in one frame
const EASE = 0.1;
const SETTLE = 0.05;

type V3 = [number, number, number];
const rotX = (p: V3, a: number): V3 => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
const rotY = (p: V3, a: number): V3 => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
const rotZ = (p: V3, a: number): V3 => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a), p[2]];
const orient = (p: V3, o: V3): V3 => rotZ(rotY(rotX(p, o[0]), o[1]), o[2]);

type Seg = { ax: number; ay: number; bx: number; by: number; z: number; ring: Ring; width: number };

export function HeroRingsVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Phase accumulates so a change of speed never jumps the drawing.
    let phase = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const s = Math.min(W, H) * 0.4;
      const cx = W / 2;
      const cy = H / 2;
      const project = (p: V3): V3 => {
        const f = 3.2 / (3.2 - p[2]);
        return [cx + p[0] * s * f, cy + p[1] * s * f, p[2]];
      };
      const segs: Seg[] = [];
      for (const ring of RINGS) {
        const o: V3 = [ring.tilt[0] + phase * ring.spin[0], ring.tilt[1] + phase * ring.spin[1], ring.tilt[2] + phase * ring.spin[2]];
        const at = (u: number, v: number): V3 => project(orient([Math.cos(u) * ring.R, Math.sin(u) * ring.R, (v * ring.w) / 2], o));
        const bold = ring.gold ? 1.3 : 1;
        for (let r = 0; r < ring.rails; r++) {
          const v = -1 + (2 * r) / (ring.rails - 1);
          let prev = at(0, v);
          for (let i = 1; i <= SEGMENTS; i++) {
            const q = at((i / SEGMENTS) * Math.PI * 2, v);
            segs.push({ ax: prev[0], ay: prev[1], bx: q[0], by: q[1], z: (prev[2] + q[2]) / 2, ring, width: (r === 0 || r === ring.rails - 1 ? 1.15 : 0.7) * bold });
            prev = q;
          }
        }
        for (let i = 0; i < ring.ribs; i++) {
          const u = (i / ring.ribs) * Math.PI * 2;
          const a = at(u, -1);
          const b = at(u, 1);
          segs.push({ ax: a[0], ay: a[1], bx: b[0], by: b[1], z: (a[2] + b[2]) / 2, ring, width: 0.7 });
        }
      }
      // Back to front; the far side of each band fades.
      segs.sort((p, q) => p.z - q.z);
      for (const g of segs) {
        const depth = Math.max(0, Math.min(1, (g.z + 1.1) / 2.2));
        const a = g.ring.alpha * (g.ring.gold ? 0.35 + 0.65 * depth : 0.18 + 0.82 * depth);
        ctx.strokeStyle = `rgba(${g.ring.gold ? GOLD : INK},${a})`;
        ctx.lineWidth = g.width;
        ctx.beginPath();
        ctx.moveTo(g.ax, g.ay);
        ctx.lineTo(g.bx, g.by);
        ctx.stroke();
      }
      // The outer ring's pivot: a dashed axis and two gold bearings.
      const outer = RINGS[0];
      if (outer) {
        const o: V3 = [outer.tilt[0] + phase * outer.spin[0], outer.tilt[1] + phase * outer.spin[1], outer.tilt[2]];
        const p1 = project(orient([0, 1.14, 0], o));
        const p2 = project(orient([0, -1.14, 0], o));
        ctx.setLineDash([4, 5]);
        ctx.strokeStyle = `rgba(${INK},.28)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
        ctx.setLineDash([]);
        for (const p of [p1, p2]) {
          ctx.fillStyle = `rgb(${GOLD})`;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(${INK},.6)`;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    size();
    draw();
    // The drawing now carries the picture: the still under it goes.
    canvas.parentElement?.setAttribute("data-engraved", "");
    const onResize = () => {
      size();
      draw();
    };
    window.addEventListener("resize", onResize);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("resize", onResize);
    }

    let rate = IDLE_RATE;
    let target = IDLE_RATE;
    let lastY = window.scrollY;
    let last = 0;
    let raf = 0;
    let visible = false;

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      lastY = y;
      if (dy > 0) target = Math.min(MAX_RATE, Math.max(target, IDLE_RATE + dy * GAIN));
      target += (IDLE_RATE - target) * SETTLE;
      rate += (target - rate) * EASE;
      phase += dt * rate;
      draw();
      raf = window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) {
          lastY = window.scrollY;
          last = 0;
          if (!raf) raf = window.requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-gyro absolute inset-0 h-full w-full" aria-hidden="true" />;
}
