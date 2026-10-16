"use client";

import { useEffect, useState } from "react";

/*
 * The gold thread on the left rail carries the four words of the method
 * (Dom, 2026-10-16). Each one turns gold as the reader goes down the page:
 * the page reads as one path, from the first screen to the seal. Desktop only
 * (the rail exists from 900 px); nothing moves with reduced motion -- the
 * words are simply all lit.
 */
export function JourneyRail({ steps }: { steps: readonly string[] }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reduced motion: the stylesheet lights every word; no listener needed.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol className="journey-rail" aria-hidden="true">
      {steps.map((s, i) => (
        <li key={s} className={progress >= (i + 1) / (steps.length + 1) ? "is-lit" : undefined}>
          <span className="journey-dot" />
          <span className="journey-word">{s}</span>
        </li>
      ))}
    </ol>
  );
}
