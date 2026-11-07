"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/content";

/*
 * The last screen of the home page (Dom, 2026-11-07: « on change ça complètement…
 * un design sharp qui fait critical infra »), in the site's iron and gold (« sinon le
 * noir »; the blue blueprint was dropped because blue is not a site colour).
 *
 * An engineering sheet: a one-line diagram, the drawing used in substations. Three
 * sources (an AI agent, an operator, a script) feed one bus into the Ironproof gate;
 * the gate lights its four stages (read, prove, decide, seal); allowed requests go on
 * to a breaker, a transformer, a dosing pump, a network core or a payment rail, which
 * react and take the seal (the three rings of the logo); refused ones stop at DECIDE.
 * The requests are fictitious and the log says so. The three numbered notes state
 * what the proof rests on, with the same care as the copy they replace.
 *
 * Built in one SVG (viewBox 1600 x 900) so it scales as a drawing. Starts when a third
 * of it is on screen; every timer stops when it unmounts. Reduced motion: a still sheet
 * with a filled log.
 */

type Copy = {
  kicker: string;
  lead1: string;
  lead2: string;
  cta: string;
  bus: string;
  gatePolicy: string;
  notes: [string, string, string];
  logTitle: string;
  logLive: string;
  logExample: string;
  allowed: string;
  blocked: string;
  never: string;
  sealed: string;
  project: string;
  drawing: string;
  drawingName: string;
  rev: string;
  sheet: string;
  sheetOf: string;
  ariaLabel: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    kicker: "CRITICAL ACTIONS · DECIDED BEFORE THEY RUN",
    lead1: "Every action an agent, an operator or a script sends to a critical system passes one gate.",
    lead2: "What complies runs, and is sealed. What does not never executes.",
    cta: "START A PILOT  →",
    bus: "BUS · ALL REQUESTS",
    gatePolicy: "∀x · YOUR POLICY",
    notes: [
      "THE ACTION CAN ONLY RUN THROUGH THE GATE: THE CONDITION THE PROOF RESTS ON.",
      "POLICY PROVEN FOR EVERY INPUT, NOT TESTED ON A SAMPLE.",
      "WHAT RUNS IS SEALED. THE RECORD RE-CHECKS WITHOUT US.",
    ],
    logTitle: "GATE LOG",
    logLive: "● LIVE",
    logExample: "EXAMPLE · FICTITIOUS REQUESTS",
    allowed: "ALLOWED",
    blocked: "BLOCKED",
    never: "NEVER EXECUTED",
    sealed: "SEALED",
    project: "PROJECT",
    drawing: "DRAWING",
    drawingName: "ONE-LINE",
    rev: "REV",
    sheet: "SHEET",
    sheetOf: "1 OF 1",
    ariaLabel: "From probably to provably. Every critical action passes one gate before it runs.",
  },
  fr: {
    kicker: "ACTIONS CRITIQUES · DÉCIDÉES AVANT DE S’EXÉCUTER",
    lead1: "Chaque action qu’un agent, un opérateur ou un script envoie à un système critique passe par une seule barrière.",
    lead2: "Ce qui est conforme s’exécute, et est scellé. Le reste ne s’exécute jamais.",
    cta: "DÉMARRER UN PILOTE  →",
    bus: "BUS · TOUTES LES DEMANDES",
    gatePolicy: "∀x · VOTRE POLITIQUE",
    notes: [
      "L’ACTION NE PEUT PASSER QUE PAR LA BARRIÈRE : LA CONDITION DONT DÉPEND LA PREUVE.",
      "POLITIQUE PROUVÉE POUR CHAQUE ENTRÉE, PAS TESTÉE SUR UN ÉCHANTILLON.",
      "CE QUI S’EXÉCUTE EST SCELLÉ. LE DOSSIER SE REVÉRIFIE SANS NOUS.",
    ],
    logTitle: "JOURNAL",
    logLive: "● EN DIRECT",
    logExample: "EXEMPLE · DEMANDES FICTIVES",
    allowed: "AUTORISÉE",
    blocked: "BLOQUÉE",
    never: "JAMAIS EXÉCUTÉE",
    sealed: "SCELLÉE",
    project: "PROJET",
    drawing: "PLAN",
    drawingName: "UNIFILAIRE",
    rev: "RÉV.",
    sheet: "FEUILLE",
    sheetOf: "1 DE 1",
    ariaLabel: "From probably to provably. Chaque action critique passe par une seule barrière avant de s’exécuter.",
  },
};

// Fictitious requests: [source, asset, allowed, text]. The log marks them as examples.
const REQUESTS: readonly [number, number, boolean, string][] = [
  [0, 0, true, "agent → BRK 52-A open · maintenance window"],
  [1, 2, false, "operator → P-3 dosing +40 % · above limit"],
  [2, 4, true, "script → wire 12 400 $ · within daily limit"],
  [0, 3, false, "agent → core config push · no change ticket"],
  [1, 1, true, "operator → T2 tap +1 · ticket attached"],
  [2, 0, false, "script → BRK 52-A close · crew on site"],
  [0, 4, false, "agent → wire 2.4 M$ · new payee, no 2nd approver"],
  [1, 3, true, "operator → core route change · approved window"],
];

const NS = "http://www.w3.org/2000/svg";
type Attrs = Record<string, string | number>;

export function OneLineFinale({ locale, pilotHref }: { locale: Locale; pilotHref: string }) {
  const copy = COPY[locale];
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const sv = svgRef.current;
    if (!sv) return;
    while (sv.firstChild) sv.firstChild.remove();

    let alive = true;
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (alive) fn();
      }, ms);
      timers.add(id);
    };
    const frame = (fn: FrameRequestCallback) => {
      window.requestAnimationFrame((ts) => {
        if (alive) fn(ts);
      });
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Colours go through style so the CSS variables of the section apply.
    const COLOR_KEYS = new Set(["fill", "stroke", "stop-color"]);
    const E = <K extends keyof SVGElementTagNameMap>(tag: K, a: Attrs, p: Element = sv): SVGElementTagNameMap[K] => {
      const e = document.createElementNS(NS, tag) as SVGElementTagNameMap[K];
      for (const [k, v] of Object.entries(a)) {
        if (COLOR_KEYS.has(k) && typeof v === "string" && v.startsWith("var(")) e.style.setProperty(k, v);
        else e.setAttribute(k, String(v));
      }
      p.appendChild(e);
      return e;
    };
    const T = (x: number, y: number, s: string, cls = "", anchor = "start", p: Element = sv): SVGTextElement => {
      const t = E("text", { x, y, class: cls, "text-anchor": anchor }, p);
      t.textContent = s;
      return t;
    };
    const paint = (el: SVGElement, key: "fill" | "stroke", v: string) => el.style.setProperty(key, v);
    const hex = (n: number) => Array.from({ length: n }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)] ?? "0").join("");
    const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

    // ---------- defs ----------
    const defs = E("defs", {});
    const pat = E("pattern", { id: "olf-dots", width: 20, height: 20, patternUnits: "userSpaceOnUse" }, defs);
    E("circle", { cx: 10, cy: 10, r: 0.9, fill: "var(--olf-dot)" }, pat);
    const grain = E("filter", { id: "olf-grain", x: 0, y: 0, width: "100%", height: "100%" }, defs);
    E("feTurbulence", { type: "fractalNoise", baseFrequency: 0.85, numOctaves: 2, stitchTiles: "stitch" }, grain);
    E("feColorMatrix", { values: "0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.88  0 0 0 .05 0" }, grain);
    const glow = E("filter", { id: "olf-glow", x: "-30%", y: "-30%", width: "160%", height: "160%" }, defs);
    E("feGaussianBlur", { in: "SourceGraphic", stdDeviation: 7, result: "b" }, glow);
    E("feColorMatrix", { in: "b", values: "0 0 0 0 0.85  0 0 0 0 0.7  0 0 0 0 0.35  0 0 0 .6 0", result: "c" }, glow);
    const mg = E("feMerge", {}, glow);
    E("feMergeNode", { in: "c" }, mg);
    E("feMergeNode", { in: "SourceGraphic" }, mg);
    const vign = E("radialGradient", { id: "olf-vign", cx: "50%", cy: "45%", r: "75%" }, defs);
    E("stop", { offset: "60%", "stop-color": "var(--olf-paper)", "stop-opacity": 0 }, vign);
    E("stop", { offset: "100%", "stop-color": "#111214", "stop-opacity": 0.55 }, vign);

    // ---------- the sheet ----------
    E("rect", { x: 10, y: 10, width: 1580, height: 880, class: "w" });
    E("rect", { x: 26, y: 26, width: 1548, height: 848, class: "w2" });
    for (let i = 0; i < 8; i++) {
      const x = 26 + (1548 / 8) * (i + 0.5);
      T(x, 22, String(i + 1), "t-s", "middle");
      T(x, 886, String(i + 1), "t-s", "middle");
      if (i) {
        const xx = 26 + (1548 / 8) * i;
        E("line", { x1: xx, y1: 10, x2: xx, y2: 26, class: "w" });
        E("line", { x1: xx, y1: 874, x2: xx, y2: 890, class: "w" });
      }
    }
    for (let j = 0; j < 4; j++) {
      const y = 26 + (848 / 4) * (j + 0.5);
      T(18, y + 3, "ABCD"[j] ?? "", "t-s", "middle");
      T(1582, y + 3, "ABCD"[j] ?? "", "t-s", "middle");
      if (j) {
        const yy = 26 + (848 / 4) * j;
        E("line", { x1: 10, y1: yy, x2: 26, y2: yy, class: "w" });
        E("line", { x1: 1574, y1: yy, x2: 1590, y2: yy, class: "w" });
      }
    }
    E("rect", { x: 27, y: 27, width: 1546, height: 846, fill: "url(#olf-dots)" });
    E("rect", { x: 0, y: 0, width: 1600, height: 900, fill: "url(#olf-vign)", "pointer-events": "none" });
    E("rect", { x: 0, y: 0, width: 1600, height: 900, filter: "url(#olf-grain)", "pointer-events": "none" });
    for (const [cx, cy] of [[10, 10], [1590, 10], [10, 890], [1590, 890]] as const) {
      const sx = cx < 800 ? -1 : 1;
      const sy = cy < 450 ? -1 : 1;
      E("path", { d: `M${cx} ${cy + sy * 2} v${sy * 8} M${cx + sx * 2} ${cy} h${sx * 8}`, class: "w" });
    }

    // ---------- headline ----------
    E("rect", { x: 66, y: 64, width: 8, height: 8, fill: "var(--olf-gold)" });
    T(84, 72, copy.kicker, "t-k");
    const h1 = T(64, 152, "From probably", "t-h2");
    const strike = E("path", { d: "M262 128 C 340 122, 420 132, 512 124", stroke: "var(--olf-gold)", "stroke-width": 3, fill: "none", "stroke-linecap": "round" });
    const strikeLen = 300;
    strike.setAttribute("stroke-dasharray", String(strikeLen));
    strike.setAttribute("stroke-dashoffset", reduced ? "0" : String(strikeLen));
    const h2 = T(64, 228, "", "t-h");
    ["to pro", "v", "ably."].forEach((s, i) => {
      const ts = E("tspan", i === 1 ? { class: "v" } : {}, h2);
      ts.textContent = s;
    });
    T(66, 268, copy.lead1, "t-p");
    T(66, 288, copy.lead2, "t-p");
    const cta = E("a", { href: pilotHref, class: "cta" });
    const ctaText = T(66, 330, copy.cta, "", "start", cta);
    E("line", { x1: 66, y1: 338, x2: 66 + Math.max(150, copy.cta.length * 8), y2: 338, stroke: "var(--olf-gold)", "stroke-width": 1 }, cta);
    void ctaText;

    // ---------- the one-line diagram ----------
    const GX = 800;
    const GY = 590;
    const BUSX = 520;
    type Src = { y: number; name: string; sub: string; path: SVGPathElement | null };
    const SRC: Src[] = [
      { y: 470, name: "AI AGENT", sub: "LLM · TOOL CALL", path: null },
      { y: 590, name: "OPERATOR", sub: "HMI · CONSOLE", path: null },
      { y: 710, name: "SCRIPT", sub: "CRON · API", path: null },
    ];
    for (const s of SRC) {
      if (s.name === "AI AGENT") {
        E("path", { d: `M114 ${s.y - 19} l16.5 9.5 v19 l-16.5 9.5 l-16.5 -9.5 v-19 Z`, class: "w" });
        E("circle", { cx: 114, cy: s.y, r: 4, fill: "var(--olf-gold)" });
      } else if (s.name === "OPERATOR") {
        E("circle", { cx: 114, cy: s.y, r: 18, class: "w" });
        E("circle", { cx: 114, cy: s.y - 4, r: 5, class: "w" });
        E("path", { d: `M104 ${s.y + 11} q10 -10 20 0`, class: "w" });
      } else {
        E("rect", { x: 96, y: s.y - 18, width: 36, height: 36, rx: 3, class: "w" });
        T(114, s.y + 4, "{ }", "t-k", "middle");
      }
      T(146, s.y - 4, s.name, "t-k");
      T(146, s.y + 10, s.sub, "t-s");
      const dy = GY - s.y;
      const r = Math.sign(dy) * Math.min(28, Math.abs(dy) / 2);
      s.path = E("path", {
        d: dy === 0
          ? `M132 ${s.y} H${GX - 110}`
          : `M132 ${s.y} H${BUSX - 28} Q${BUSX} ${s.y} ${BUSX} ${s.y + r} V${GY - r} Q${BUSX} ${GY} ${BUSX + 28} ${GY} H${GX - 110}`,
        class: "w",
      });
    }
    E("line", { x1: BUSX, y1: GY - 130, x2: BUSX, y2: GY + 130, class: "w2" });
    E("line", { x1: GX + 110, y1: GY, x2: GX + 202, y2: GY, class: "w2" });
    T(BUSX, GY - 140, copy.bus, "t-s", "middle");

    const gateBox = E("rect", { x: GX - 110, y: GY - 92, width: 220, height: 184, class: "g", fill: "var(--olf-panel)" });
    for (const [x, y, sx, sy] of [[GX - 118, GY - 100, 1, 1], [GX + 118, GY - 100, -1, 1], [GX - 118, GY + 100, 1, -1], [GX + 118, GY + 100, -1, -1]] as const) {
      E("path", { d: `M${x} ${y + sy * 16} V${y} H${x + sx * 16}`, stroke: "var(--olf-gold)", "stroke-width": 1.6, fill: "none" });
    }
    E("rect", { x: GX - 102, y: GY - 84, width: 204, height: 168, class: "l" });
    T(GX, GY - 58, "IRONPROOF GATE", "t-g", "middle");
    T(GX, GY - 42, copy.gatePolicy, "t-s", "middle");
    const STAGES = ["READ", "PROVE", "DECIDE", "SEAL"];
    const stage = STAGES.map((name, i) => {
      const y = GY - 20 + i * 24;
      const box = E("rect", { x: GX - 80, y: y - 9, width: 160, height: 18, class: "l", fill: "none" });
      T(GX - 70, y + 4, `${i + 1}  ${name}`);
      const dot = E("circle", { cx: GX + 66, cy: y, r: 3.5, fill: "var(--olf-off)" });
      return { box, dot };
    });
    const lamp = E("circle", { cx: GX + 92, cy: GY - 74, r: 6, fill: "var(--olf-off)" });

    const AX = 1250;
    type Asset = { y: number; name: string; sub: string; sym: string; path: SVGPathElement | null; g: SVGGElement | null; blade: SVGElement | null; seal: SVGTextElement | null };
    const AST: Asset[] = [
      { y: 420, name: "BREAKER 52-A", sub: "SUBSTATION · 230 KV", sym: "breaker", path: null, g: null, blade: null, seal: null },
      { y: 505, name: "TRANSFORMER T2", sub: "GRID · TAP CHANGER", sym: "xfmr", path: null, g: null, blade: null, seal: null },
      { y: 590, name: "DOSING PUMP P-3", sub: "WATER · CHLORINE", sym: "valve", path: null, g: null, blade: null, seal: null },
      { y: 675, name: "NETWORK CORE", sub: "TELECOM · CONFIG", sym: "core", path: null, g: null, blade: null, seal: null },
      { y: 760, name: "PAYMENT RAIL", sub: "BANKING · WIRE", sym: "rail", path: null, g: null, blade: null, seal: null },
    ];
    for (const a of AST) {
      const dy = a.y - GY;
      const r = Math.sign(dy) * Math.min(28, Math.abs(dy) / 2);
      const bx = GX + 230;
      a.path = E("path", {
        d: dy === 0
          ? `M${GX + 110} ${GY} H${AX - 30}`
          : `M${GX + 110} ${GY} H${bx - 28} Q${bx} ${GY} ${bx} ${GY + r} V${a.y - r} Q${bx} ${a.y} ${bx + 28} ${a.y} H${AX - 30}`,
        class: "w",
      });
      const g = E("g", { class: "asset" });
      a.g = g;
      if (a.sym === "breaker") {
        E("rect", { x: AX - 20, y: a.y - 20, width: 40, height: 40, class: "w" }, g);
        a.blade = E("line", { x1: AX - 12, y1: a.y + 10, x2: AX + 12, y2: a.y - 10, class: "w2" }, g);
      } else if (a.sym === "xfmr") {
        E("circle", { cx: AX - 9, cy: a.y, r: 16, class: "w" }, g);
        E("circle", { cx: AX + 11, cy: a.y, r: 16, class: "w" }, g);
        a.blade = E("path", { d: `M${AX + 30} ${a.y + 14} l10 -28`, class: "w" }, g);
      } else if (a.sym === "valve") {
        E("path", { d: `M${AX - 22} ${a.y - 14} L${AX + 22} ${a.y + 14} V${a.y - 14} L${AX - 22} ${a.y + 14} Z`, class: "w" }, g);
        a.blade = E("path", { d: `M${AX} ${a.y} V${a.y - 26} M${AX - 10} ${a.y - 26} H${AX + 10}`, class: "w" }, g);
      } else if (a.sym === "core") {
        E("rect", { x: AX - 22, y: a.y - 17, width: 44, height: 34, class: "w" }, g);
        const bl = E("g", {}, g);
        for (let k = -10; k <= 10; k += 10) E("line", { x1: AX - 14, y1: a.y + k, x2: AX + 14, y2: a.y + k, class: "w" }, bl);
        a.blade = bl;
      } else {
        E("path", { d: `M${AX - 24} ${a.y - 9} H${AX + 24} M${AX - 24} ${a.y + 9} H${AX + 24}`, class: "w" }, g);
        const bl = E("g", {}, g);
        for (let k = -18; k <= 18; k += 9) E("line", { x1: AX + k, y1: a.y - 14, x2: AX + k, y2: a.y + 14, class: "w" }, bl);
        a.blade = bl;
      }
      T(AX + 44, a.y - 3, a.name, "t-k", "start", g);
      T(AX + 44, a.y + 11, a.sub, "t-s", "start", g);
      a.seal = T(AX + 44, a.y + 25, "", "t-g", "start", g);
    }

    // The seal: the three rings of the logo, stamped on what was allowed.
    const stamp = (x: number, y: number): SVGGElement => {
      const g = E("g", { transform: `translate(${x} ${y}) scale(.2) rotate(-30)`, opacity: 0 });
      E("circle", { r: 15, fill: "none", stroke: "var(--olf-ink)", "stroke-width": 1 }, g);
      E("ellipse", { rx: 13, ry: 6, fill: "none", stroke: "var(--olf-ink)", "stroke-width": 2.2, transform: "rotate(35)" }, g);
      E("ellipse", { rx: 8, ry: 10, fill: "none", stroke: "var(--olf-gold)", "stroke-width": 2.2, transform: "rotate(-20)" }, g);
      let t0: number | null = null;
      const f = (ts: number) => {
        if (t0 === null) t0 = ts;
        const u = Math.min(1, (ts - t0) / 420);
        const k = 1 - Math.pow(1 - u, 3);
        g.setAttribute("transform", `translate(${x} ${y}) scale(${0.2 + 0.8 * k}) rotate(${-30 + 30 * k})`);
        g.setAttribute("opacity", String(k));
        if (u < 1) frame(f);
      };
      frame(f);
      return g;
    };

    const NOTE = (n: number, x: number, y: number, lx: number, ly: number, text: string) => {
      E("path", { d: `M${x} ${y} L${lx} ${ly}`, class: "l" });
      E("circle", { cx: lx, cy: ly, r: 10, class: "w", fill: "var(--olf-paper)" });
      T(lx, ly + 3.5, String(n), "t-k", "middle");
      T(lx + 16, ly + 3.5, text, "t-s");
    };
    NOTE(1, BUSX, GY - 100, 330, 400, copy.notes[0]);
    NOTE(2, GX + 110, GY - 92, 930, 368, copy.notes[1]);
    NOTE(3, GX, GY + 92, 620, 830, copy.notes[2]);

    // ---------- gate log ----------
    const LX = 1050;
    const LY = 64;
    const LW = 500;
    E("rect", { x: LX, y: LY, width: LW, height: 250, class: "w", fill: "var(--olf-panel)" });
    E("line", { x1: LX, y1: LY + 28, x2: LX + LW, y2: LY + 28, class: "w" });
    T(LX + 12, LY + 18, copy.logTitle, "t-k");
    const live = T(LX + 12 + copy.logTitle.length * 8 + 14, LY + 18, copy.logLive, "t-g");
    T(LX + LW - 12, LY + 18, copy.logExample, "t-s", "end");
    const logG = E("g", {});
    type Line = { text: string; ok: boolean; seal: string; time: string };
    const lines: Line[] = [];
    const addLog = (text: string, ok: boolean, seal: string) => {
      lines.unshift({ text, ok, seal, time: new Date().toTimeString().slice(0, 8) });
      if (lines.length > 7) lines.pop();
      while (logG.firstChild) logG.firstChild.remove();
      lines.forEach((l, i) => {
        const y = LY + 50 + i * 28;
        T(LX + 12, y, l.time, "t-s", "start", logG);
        T(LX + 84, y, l.text.length > 46 ? `${l.text.slice(0, 45)}…` : l.text, "", "start", logG);
        T(LX + LW - 12, y, l.ok ? copy.allowed : copy.blocked, l.ok ? "t-g" : "t-r", "end", logG);
        T(LX + 84, y + 11, l.ok ? `SEAL ${l.seal}` : copy.never, "t-s", "start", logG);
      });
    };

    // ---------- title block ----------
    const CX = 1170;
    const CY = 800;
    const CW = 404;
    const CH = 74;
    E("rect", { x: CX, y: CY, width: CW, height: CH, class: "w2", fill: "var(--olf-panel)" });
    E("line", { x1: CX, y1: CY + 37, x2: CX + CW, y2: CY + 37, class: "w" });
    for (const dx of [150, 270]) E("line", { x1: CX + dx, y1: CY, x2: CX + dx, y2: CY + CH, class: "w" });
    T(CX + 10, CY + 15, copy.project, "t-s");
    T(CX + 10, CY + 30, "IRONPROOF", "t-k");
    T(CX + 160, CY + 15, copy.drawing, "t-s");
    T(CX + 160, CY + 30, copy.drawingName, "t-k");
    T(CX + 280, CY + 15, copy.rev, "t-s");
    T(CX + 280, CY + 30, "2026-11-07", "t-k");
    T(CX + 10, CY + 52, copy.allowed, "t-s");
    const cA = T(CX + 10, CY + 67, "0", "t-g");
    T(CX + 160, CY + 52, copy.blocked, "t-s");
    const cB = T(CX + 160, CY + 67, "0", "t-r");
    T(CX + 280, CY + 52, copy.sheet, "t-s");
    T(CX + 280, CY + 67, copy.sheetOf, "t-k");
    let nA = 0;
    let nB = 0;

    // ---------- the requests ----------
    const at = (p: SVGPathElement, u: number) => p.getPointAtLength(p.getTotalLength() * u);
    let gateBusy = false;
    const queue: (() => void)[] = [];

    const travel = (path: SVGPathElement, ms: number, dot: SVGCircleElement, done: () => void) => {
      let t0: number | null = null;
      const colour = dot.style.fill || "var(--olf-gold)";
      const tail = Array.from({ length: 7 }, (_, k) => E("circle", { r: 4.5 - k * 0.5, fill: colour, opacity: 0.5 - k * 0.065 }));
      const f = (ts: number) => {
        if (t0 === null) t0 = ts;
        const u = Math.min(1, (ts - t0) / ms);
        const e = ease(u);
        const p = at(path, e);
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
        tail.forEach((c, k) => {
          const q = at(path, Math.max(0, e - (k + 1) * 0.012));
          c.setAttribute("cx", String(q.x));
          c.setAttribute("cy", String(q.y));
        });
        if (u < 1) frame(f);
        else {
          tail.forEach((c) => c.remove());
          done();
        }
      };
      frame(f);
    };
    const pump = () => {
      if (gateBusy) return;
      const next = queue.shift();
      if (!next) return;
      gateBusy = true;
      next();
    };
    const reset = (free: boolean) => {
      gateBox.removeAttribute("filter");
      for (const s of stage) {
        paint(s.dot, "fill", "var(--olf-off)");
        s.box.setAttribute("class", "l");
      }
      later(() => paint(lamp, "fill", "var(--olf-off)"), 500);
      gateBusy = false;
      if (free) pump();
      else later(pump, 200);
    };
    const check = (dot: SVGCircleElement, ok: boolean, ast: Asset, text: string) => {
      dot.setAttribute("cx", String(GX - 110));
      dot.setAttribute("cy", String(GY));
      gateBox.setAttribute("filter", "url(#olf-glow)");
      let k = 0;
      const tick = () => {
        stage.forEach((s, j) => {
          paint(s.dot, "fill", j < k ? "var(--olf-gold)" : "var(--olf-off)");
          s.box.setAttribute("class", j === k - 1 ? "g" : "l");
        });
        const decide = stage[2];
        if (!ok && k === 3 && decide) {
          paint(decide.dot, "fill", "var(--olf-red)");
          paint(decide.box, "stroke", "var(--olf-red)");
          paint(lamp, "fill", "var(--olf-red)");
          paint(dot, "fill", "var(--olf-red)");
          const x = E("path", { d: `M${GX - 132} ${GY - 12} l24 24 M${GX - 108} ${GY - 12} l-24 24`, stroke: "var(--olf-red)", "stroke-width": 2.6, fill: "none" });
          const stub = T(GX - 120, GY + 34, copy.blocked, "t-r", "middle");
          nB++;
          cB.textContent = String(nB);
          addLog(text, false, "");
          later(() => {
            x.remove();
            stub.remove();
            dot.remove();
            decide.box.style.removeProperty("stroke");
            reset(true);
          }, 1300);
          return;
        }
        if (k === 4 && ast.path && ast.g) {
          const path = ast.path;
          const g = ast.g;
          paint(lamp, "fill", "var(--olf-gold)");
          const seal = hex(8);
          path.setAttribute("class", "flow");
          dot.setAttribute("cx", String(GX + 110));
          reset(false);
          travel(path, 1100, dot, () => {
            dot.remove();
            path.setAttribute("class", "w");
            g.querySelectorAll(".w,.w2").forEach((n) => {
              n.setAttribute("data-c", n.getAttribute("class") ?? "w");
              n.setAttribute("class", "g");
            });
            if (ast.blade) ast.blade.setAttribute("transform", `rotate(${ast.sym === "breaker" ? 45 : ast.sym === "valve" ? 90 : 0} ${AX} ${ast.y})`);
            if (ast.seal) ast.seal.textContent = `${copy.sealed} ✓ ${seal}`;
            const st = stamp(AX - 46, ast.y);
            nA++;
            cA.textContent = String(nA);
            addLog(text, true, seal);
            later(() => {
              g.querySelectorAll("[data-c]").forEach((n) => {
                n.setAttribute("class", n.getAttribute("data-c") ?? "w");
                n.removeAttribute("data-c");
              });
              if (ast.blade) ast.blade.removeAttribute("transform");
              if (ast.seal) ast.seal.textContent = "";
              st.remove();
            }, 2200);
          });
          return;
        }
        k++;
        later(tick, 300);
      };
      tick();
    };
    const request = (i: number) => {
      const rq = REQUESTS[i % REQUESTS.length];
      if (!rq) return;
      const [si, ai, ok, text] = rq;
      const src = SRC[si];
      const ast = AST[ai];
      if (!src?.path || !ast) return;
      const path = src.path;
      const dot = E("circle", { r: 5.5, fill: "var(--olf-gold)" });
      path.setAttribute("class", "flow");
      travel(path, 1400, dot, () => {
        path.setAttribute("class", "w");
        queue.push(() => check(dot, ok, ast, text));
        pump();
      });
    };

    // Fit the hand strike to the real width of "probably" once the font is in.
    document.fonts.ready
      .then(() => {
        if (!alive) return;
        try {
          const x0 = 64 + h1.getSubStringLength(0, 5) - 4;
          const x1 = 64 + h1.getComputedTextLength() + 6;
          strike.setAttribute("d", `M${x0} 128 C ${x0 + (x1 - x0) * 0.3} 122, ${x0 + (x1 - x0) * 0.65} 132, ${x1} 124`);
        } catch {
          // the default strike stays
        }
      })
      .catch(() => undefined);

    const start = () => {
      if (reduced) {
        REQUESTS.slice(0, 7).forEach((r) => addLog(r[3], r[2], hex(8)));
        const allowed = REQUESTS.slice(0, 7).filter((r) => r[2]).length;
        cA.textContent = String(allowed);
        cB.textContent = String(7 - allowed);
        return;
      }
      let t0: number | null = null;
      const s = (ts: number) => {
        if (t0 === null) t0 = ts;
        const u = Math.min(1, (ts - t0) / 700);
        strike.setAttribute("stroke-dashoffset", String(strikeLen * (1 - ease(u))));
        if (u < 1) frame(s);
      };
      frame(s);
      let i = 0;
      request(i++);
      const loop = () => {
        request(i++);
        later(loop, 1700);
      };
      later(loop, 1700);
      const blink = () => {
        live.setAttribute("opacity", live.getAttribute("opacity") === "0.3" ? "1" : "0.3");
        later(blink, 700);
      };
      blink();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          io.disconnect();
          later(start, 300);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(sv);

    return () => {
      alive = false;
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };
  }, [copy, pilotHref]);

  return (
    <section id="one-line" className="one-line-finale relative z-10" aria-label={copy.ariaLabel}>
      <svg ref={svgRef} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label={copy.ariaLabel} />
    </section>
  );
}
