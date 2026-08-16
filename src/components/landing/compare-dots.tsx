"use client";

import { useEffect, useRef, useState } from "react";

/*
 * The two dot grids in "Testing vs. Proving". Testing lights ~1/7 of its dots
 * (the cases someone thought of); Proving fades all of them in, in a cascade,
 * once the grid scrolls into view. Ported from the reference landing.
 */

const TOTAL = 40;

/** Testing grid: static, only every 7th dot is lit. */
export function TestingDots() {
  return (
    <div className="mb-8 grid grid-cols-8 gap-2 rounded-sm border border-white/5 bg-black/40 p-4">
      {Array.from({ length: TOTAL }, (_, i) => {
        const lit = i % 7 === 0;
        return (
          <span
            key={i}
            className="h-2 w-2 rounded-full"
            style={
              lit
                ? { background: "#e8ebf5", boxShadow: "0 0 6px rgba(210,220,255,0.7)" }
                : { background: "#1e1e22" }
            }
          />
        );
      })}
    </div>
  );
}

/** Proving grid: all dots fade in as a cascade when the grid enters view. */
export function ProvingDots() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-8 grid grid-cols-8 gap-2 rounded-sm border border-white/5 bg-black/40 p-4"
    >
      {Array.from({ length: TOTAL }, (_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={{
            background: "#e8ebf5",
            boxShadow: "0 0 6px rgba(210,220,255,0.6)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.4s ease",
            transitionDelay: `${i * 25}ms`,
          }}
        />
      ))}
    </div>
  );
}
