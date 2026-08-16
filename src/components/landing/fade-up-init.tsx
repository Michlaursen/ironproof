"use client";

import { useEffect } from "react";

/*
 * Reveal-on-scroll. Mirrors the reference landing: a single IntersectionObserver
 * adds `.in` to every `.fade-up` element as it enters the viewport, once.
 */
export function FadeUpInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
