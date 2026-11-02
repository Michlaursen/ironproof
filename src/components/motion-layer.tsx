"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
 * Motion layer (Dom, 2026-11-02: « le rendre plus premium, plus le fun à naviguer »).
 *
 * One client component, mounted once in the layout, that adds what CSS alone
 * cannot do:
 *   1. inertial scrolling (Lenis): the page glides instead of stepping;
 *   2. the hero rings catch a light that follows the pointer (they never move:
 *      the lines from the cards are measured to land on them);
 *   3. cards (outside the hero) tilt under the pointer and carry a gold light where it points;
 *   4. the "start a pilot" buttons pull gently toward the pointer.
 *
 * Contract: nothing here hides content or changes layout. Every effect only
 * writes CSS custom properties or a class; globals.css decides what they do.
 * Reduced motion -> nothing runs. Touch / coarse pointer -> no pointer effects
 * (Lenis leaves touch scrolling native by default). Every listener is removed
 * on unmount.
 */

const TILT_SELECTOR = [
  ".why-cards > li",
  ".verdict-cards > li",
  "#use-cases ol > li > a",
  "#how-platform ol > li",
  // Not the hero cards: their lines are measured to land on the rings
  // (hero-connectors.tsx), a tilt would make them miss.
].join(",");

const MAGNET_SELECTOR = ".hero-white-cta, a.mo-magnet, header a[href$='/pilot'], .closing-card a[href$='/pilot']";

const MAX_TILT_DEG = 5;
const MAGNET_PULL = 0.28;

export function MotionLayer() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const cleanups: Array<() => void> = [];

    // 1. Inertial scroll. Anchors keep working: Lenis intercepts in-page links.
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: -88 },
        autoRaf: true,
      });
      const active = lenis;
      cleanups.push(() => active.destroy());
    } catch (err) {
      // Degrade, never crash: the page keeps native scrolling.
      console.warn("[motion] smooth scroll unavailable", err);
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (finePointer.matches) {
      // 2. Hero: one rAF-throttled listener on the stage.
      const stage = document.querySelector<HTMLElement>(".hero-white-stage");
      if (stage) {
        let raf = 0;
        const onMove = (e: PointerEvent) => {
          if (raf) return;
          raf = window.requestAnimationFrame(() => {
            raf = 0;
            const r = stage.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
            const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
            stage.style.setProperty("--mo-px", px.toFixed(3));
            stage.style.setProperty("--mo-py", py.toFixed(3));
          });
        };
        const onLeave = () => {
          stage.style.setProperty("--mo-px", "0");
          stage.style.setProperty("--mo-py", "0");
        };
        stage.classList.add("mo-live");
        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          if (raf) window.cancelAnimationFrame(raf);
          stage.removeEventListener("pointermove", onMove);
          stage.removeEventListener("pointerleave", onLeave);
          stage.classList.remove("mo-live");
        });
      }

      // 3 and 4. Delegated on the document: works for cards rendered later too.
      let current: HTMLElement | null = null;
      let magnet: HTMLElement | null = null;
      const resetCard = (el: HTMLElement) => {
        el.classList.remove("mo-tilt-on");
        el.style.removeProperty("--mo-rx");
        el.style.removeProperty("--mo-ry");
      };
      const resetMagnet = (el: HTMLElement) => {
        el.style.removeProperty("--mo-mx");
        el.style.removeProperty("--mo-my");
      };
      const onDocMove = (e: PointerEvent) => {
        const target = e.target instanceof Element ? e.target : null;

        const card = target ? target.closest<HTMLElement>(TILT_SELECTOR) : null;
        if (current && current !== card) resetCard(current);
        current = card;
        if (card) {
          const r = card.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            card.classList.add("mo-tilt", "mo-tilt-on");
            card.style.setProperty("--mo-rx", `${((0.5 - y) * MAX_TILT_DEG * 2).toFixed(2)}deg`);
            card.style.setProperty("--mo-ry", `${((x - 0.5) * MAX_TILT_DEG * 2).toFixed(2)}deg`);
            card.style.setProperty("--mo-x", `${(x * 100).toFixed(1)}%`);
            card.style.setProperty("--mo-y", `${(y * 100).toFixed(1)}%`);
          }
        }

        const btn = target ? target.closest<HTMLElement>(MAGNET_SELECTOR) : null;
        if (magnet && magnet !== btn) resetMagnet(magnet);
        magnet = btn;
        if (btn) {
          const r = btn.getBoundingClientRect();
          btn.classList.add("mo-magnet-on");
          btn.style.setProperty("--mo-mx", `${((e.clientX - (r.left + r.width / 2)) * MAGNET_PULL).toFixed(1)}px`);
          btn.style.setProperty("--mo-my", `${((e.clientY - (r.top + r.height / 2)) * MAGNET_PULL).toFixed(1)}px`);
        }
      };
      const onDocLeave = () => {
        if (current) resetCard(current);
        if (magnet) resetMagnet(magnet);
        current = null;
        magnet = null;
      };
      document.addEventListener("pointermove", onDocMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onDocLeave);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onDocMove);
        document.documentElement.removeEventListener("pointerleave", onDocLeave);
        onDocLeave();
      });
    }

    // If the visitor turns reduced motion on mid-visit, stop everything.
    const onPref = () => {
      if (reduced.matches) cleanups.splice(0).forEach((fn) => fn());
    };
    reduced.addEventListener("change", onPref);
    cleanups.push(() => reduced.removeEventListener("change", onPref));

    return () => {
      cleanups.splice(0).forEach((fn) => fn());
    };
  }, []);

  return null;
}
