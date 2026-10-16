"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A headline figure that counts up to its real value when it comes into view
 * (Dom, 2026-10-16). The server renders the final value, so without JavaScript,
 * with reduced motion, or for a screen reader, the true figure is what is
 * there. Only "N / M" figures animate, and only N moves; M never changes.
 */
export function CountUp({ figure, className }: { figure: string; className?: string }) {
  const m = /^(\d+)\s*\/\s*(\d+)$/.exec(figure.trim());
  const target = m ? Number(m[1]) : null;
  const total = m ? m[2] : null;
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const p = Math.min(1, (now - start) / 1000);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(run);
          else setShown(null);
        };
        setShown(0);
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <p ref={ref} className={className} aria-label={figure}>
      <span aria-hidden="true">{shown === null || total === null ? figure : `${shown} / ${total}`}</span>
    </p>
  );
}
