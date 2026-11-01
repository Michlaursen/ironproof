"use client";

import { useEffect } from "react";

/*
 * Lands each hero line on its own ring at every width (Dom, 2026-11-01). The cards
 * and the picture scale differently, so fixed lengths only held at one width. Points
 * are fractions of hero-rings.jpg (1600 x 1200). Without this script the CSS keeps its
 * fixed lengths, so the page still reads; below 1100 px the lines are not shown.
 */
const IMAGE_RATIO = 1600 / 1200;
const NEURAL = { x: 0.5, y: 0.162 };
const SYMBOLIC = { x: 0.557, y: 0.322 };
const PROOF = { x: 0.621, y: 0.506 };
const MIN_WIDTH = 1100;
/* A line never leaves a card closer than this to its corner. */
const CARD_MARGIN = 16;

export function HeroConnectors() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".hero-white-stage");
    const picture = stage?.querySelector<HTMLElement>(".hero-white-brain");
    const image = picture?.querySelector<HTMLImageElement>("img");
    const left = stage?.querySelector<HTMLElement>(".hero-stage-left");
    const neural = stage?.querySelector<HTMLElement>(".hero-card-iron");
    const symbolic = stage?.querySelector<HTMLElement>(".hero-card-gold");
    const dossier = stage?.querySelector<HTMLElement>(".hero-dossier");
    if (!stage || !picture || !image || !left || !neural || !symbolic || !dossier) return;

    const update = () => {
      if (window.innerWidth < MIN_WIDTH) {
        left.style.removeProperty("padding-top");
        return;
      }
      const box = picture.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      // object-fit: cover, with the vertical position the stylesheet gives the image.
      const width = Math.max(box.width, box.height * IMAGE_RATIO);
      const height = width / IMAGE_RATIO;
      const parts = getComputedStyle(image).objectPosition.split(" ");
      const posY = parseFloat(parts[1] ?? "50") / 100;
      const at = (p: { x: number; y: number }) => ({
        x: box.left + (box.width - width) / 2 + p.x * width,
        y: box.top + (box.height - height) * (Number.isNaN(posY) ? 0.5 : posY) + p.y * height,
      });
      const within = (card: DOMRect, y: number) =>
        Math.min(Math.max(y - card.top, CARD_MARGIN), Math.max(card.height - CARD_MARGIN, CARD_MARGIN));

      // Neural: bring the card down until its middle meets the top of the white ring.
      left.style.paddingTop = "0px";
      const n = at(NEURAL);
      const before = neural.getBoundingClientRect();
      const drop = n.y - (before.top + before.height / 2);
      left.style.paddingTop = `${Math.max(drop, 0)}px`;
      const neuralBox = neural.getBoundingClientRect();
      const symbolicBox = symbolic.getBoundingClientRect();
      const dossierBox = dossier.getBoundingClientRect();
      const s = at(SYMBOLIC);
      const p = at(PROOF);
      const set = (name: string, value: number) => stage.style.setProperty(name, `${value}px`);
      set("--line-neural", n.x - neuralBox.right);
      set("--y-neural", within(neuralBox, n.y));
      set("--line-symbolic", symbolicBox.left - s.x);
      set("--y-symbolic", within(symbolicBox, s.y));
      set("--line-proof", dossierBox.left - p.x);
      set("--y-proof", within(dossierBox, p.y));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    image.addEventListener("load", update);
    // The cards fade up into place: measure again once they have settled.
    const settled = window.setTimeout(update, 1400);
    return () => {
      observer.disconnect();
      image.removeEventListener("load", update);
      window.clearTimeout(settled);
    };
  }, []);

  return null;
}
