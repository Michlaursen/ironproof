"use client";

import { useEffect } from "react";

/*
 * Reveal-on-scroll, fail-safe.
 *
 * Each `.fade-up` starts at opacity:0 (globals.css) and only becomes visible
 * once it gets the `.in` class. A plain "reveal on intersection" observer leaves
 * a whole section invisible whenever the reveal never fires for it:
 *   - it was scrolled past before the observer ran (anchor jump, fast scroll,
 *     back/forward bf-cache restore) — it is never "intersecting" again, so it
 *     stays blank forever;
 *   - hydration is slow and the first paint happens with the block still at 0.
 *
 * So on top of the observer we add three nets: reveal anything already in or
 * above the viewport at mount, a one-shot timeout that un-hides any in-view
 * straggler, and a bf-cache re-sweep. Below-the-fold blocks still animate in on
 * scroll — the nets only ever touch what should already be on screen.
 */
export function FadeUpInit() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("in");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));
    if (els.length === 0) return;

    // No IntersectionObserver support → never hide anything.
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      // Trigger a touch before the block scrolls fully into view.
      { threshold: 0.12, rootMargin: "0px 0px 10% 0px" },
    );

    els.forEach((el) => {
      // Already scrolled past on load: the observer would report it as
      // non-intersecting and never reveal it. Show it now.
      if (el.getBoundingClientRect().bottom < 0) {
        reveal(el);
      } else {
        io.observe(el);
      }
    });

    // Last-resort net for the hydration/timing window: un-hide any block that is
    // already in or above the viewport but has not been revealed. Scoped to the
    // visible region so below-the-fold blocks keep their scroll animation.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".fade-up:not(.in)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
        });
    }, 1200);

    // bf-cache restore can replay the page already scrolled down.
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      document.querySelectorAll<HTMLElement>(".fade-up:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      });
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
