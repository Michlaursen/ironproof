"use client";

import { useEffect, useRef } from "react";

/*
 * Particle wave — the animated white dots behind the whole page.
 * Ported verbatim from the reference landing (<canvas id="wave">): a polar
 * grid of picots that wobble, fade with distance, flicker, and get pushed
 * away from the cursor. Decorative only (pointer-events: none).
 */
export function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const el = canvas;
    const context = ctx;

    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    const mouse = { x: -9999, y: -9999 };
    let t = 0;
    let raf = 0;
    const rows = 50;
    const cols = 100;
    const REPEL = 90; // radius of influence

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      el.width = W * dpr;
      el.height = H * dpr;
      el.style.width = W + "px";
      el.style.height = H + "px";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onOut() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      context.clearRect(0, 0, W, H);
      const originX = -W * 0.15;
      const originY = H * 1.15;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ang = (r / rows) * Math.PI * 0.55 - 0.1;
          const rad = 30 + c * (Math.max(W, H) / cols) * 1.4;
          const wob = Math.sin(t * 0.4 + c * 0.15 + r * 0.08) * 16;
          let x = originX + Math.cos(ang) * rad + wob;
          let y = originY - Math.sin(ang) * rad - wob * 0.5;
          if (x < -40 || x > W + 40 || y < -40 || y > H + 40) continue;

          // mouse repulsion
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const md = Math.sqrt(dx * dx + dy * dy);
          let boost = 0;
          if (md < REPEL && md > 0.001) {
            const force = 1 - md / REPEL;
            x += (dx / md) * force * 26;
            y += (dy / md) * force * 26;
            boost = force;
          }

          const dist = Math.sqrt(x * x + (y - H) * (y - H));
          const alpha = Math.max(0, 0.62 - dist / (W * 1.05));
          const flick = 0.55 + 0.45 * Math.sin(t * 1.6 + c * 0.2 + r * 0.3);
          const a = alpha * flick + boost * 0.5;
          if (a <= 0.01) continue;
          const rr = 1.6 + boost * 1.6;

          context.beginPath();
          context.arc(x, y, rr, 0, Math.PI * 2);
          context.fillStyle = "rgba(210,220,255," + (a * 0.25).toFixed(3) + ")";
          context.fill();

          context.beginPath();
          context.arc(x, y, 0.8 + boost * 0.8, 0, Math.PI * 2);
          context.fillStyle = "rgba(245,248,255," + Math.min(1, a).toFixed(3) + ")";
          context.fill();
        }
      }
      t += 0.014;
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
