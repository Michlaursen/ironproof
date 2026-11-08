"use client";

import { useEffect, useRef } from "react";

/*
 * « A test tries a few cases. A proof covers them all. », shown rather than said
 * (Dom, 2026-11-07: « le théorème aussi ça aurait été sharp », then « dope »). It takes
 * the place of the method diagram on the home page.
 *
 * Nothing here is invented. The two queries are the ones Z3 received when
 * ironproof/lab/bank_policy/encode.py ran on 2026-11-07 (captured from
 * threshold_soundness.prove_ceiling with solver.sexpr()), and the answers are its
 * answers: as written, sat, with amount_cents = 5000001 and payee_on_register = true;
 * repaired, unsat. The policy is ours, with defects planted on purpose, and the page
 * says so under the scene.
 *
 * Three beats, looped: a few tests pass; the query is asked about every payment and
 * the solver finds the one that escapes; the repaired query is asked and none does.
 * The field is amount (log, CAD 1 to 10 M) by the 64 combinations of six flags.
 * Starts when a third of it is on screen. Reduced motion: the final state, still.
 */

const Q1 = `(declare-fun authorized () Bool)
(declare-fun account_frozen () Bool)
(declare-fun is_cash () Bool)
(declare-fun amount_cents () Int)
(declare-fun lctr_filed () Bool)
(declare-fun enhanced_review () Bool)
(declare-fun payee_on_register () Bool)
(declare-fun treasury_exception () Bool)
(declare-fun dual_approved () Bool)
(assert (let ((a!1 (not (or (and (< 5000000 amount_cents)
                         (not dual_approved)
                         (not payee_on_register)
                         (not treasury_exception))
                    account_frozen
                    (not authorized)
                    (and (not payee_on_register) (not enhanced_review))
                    (and (< 1000000 amount_cents) is_cash (not lctr_filed))))))
  (and a!1 (< 5000000 amount_cents))))
(check-sat)`;

// The repaired query: one clause added (marked with § for the gold highlight), cap raised.
const Q2 = Q1.replace(
  "(and (< 1000000 amount_cents) is_cash (not lctr_filed))))))\n  (and a!1 (< 5000000 amount_cents))))",
  "(and (< 1000000 amount_cents) is_cash (not lctr_filed))\n                    §(< 500000000 amount_cents)§))))\n  (and a!1 (< 500000000 amount_cents))))",
);

// On a phone the field is about 300 px wide: 150 columns of dots turn to grey mush, so it
// draws 60 (Dom, 2026-11-07: « sur le cell ... c zéro propre »). The rows stay the 64 flag
// combinations. Chosen once, when the scene mounts.
const COLS_WIDE = 150;
const COLS_NARROW = 60;
const NARROW = 640;
const ROWS = 64;
const KW = new Set(["declare-fun", "assert", "let", "not", "or", "and", "check-sat", "Bool", "Int"]);

type Tok = { t: string; cls: string; hl: boolean };

function tokens(text: string): Tok[] {
  const out: Tok[] = [];
  let hl = false;
  const re = /§|\n|\s+|[()]|[<>=]|-?\d+|[A-Za-z_!][\w!-]*|./g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const t = m[0];
    if (t === "§") {
      hl = !hl;
      continue;
    }
    const cls = t === "\n" ? "nl" : /^\s+$/.test(t) ? "" : /^-?\d+$/.test(t) ? "num" : /^[<>=]$/.test(t) ? "op" : KW.has(t) ? "kw" : /^[()]$/.test(t) ? "" : "id";
    out.push({ t, cls, hl });
  }
  return out;
}

const esc = (c: string) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c);
const colAt = (a: number, cols: number) => Math.min(cols - 1, Math.max(0, Math.floor((Math.log10(a) / 7) * cols)));
// Row bits: dual, register, treasury, frozen, not-authorized, enhanced.
const HOLE_ROW = (0 << 5) | (1 << 4) | (0 << 3) | (0 << 2) | (0 << 1) | 0;

export function TheoremScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pick = <T extends Element>(sel: string): T | null => root.querySelector<T>(sel);
    const q = pick<HTMLPreElement>("[data-q]");
    const cv = pick<HTMLCanvasElement>("[data-cv]");
    const field = pick<HTMLDivElement>("[data-field]");
    const tag = pick<HTMLDivElement>("[data-tag]");
    const qname = pick<HTMLSpanElement>("[data-qname]");
    const qphase = pick<HTMLSpanElement>("[data-qphase]");
    const qres = pick<HTMLSpanElement>("[data-qres]");
    const fphase = pick<HTMLSpanElement>("[data-fphase]");
    const fres = pick<HTMLSpanElement>("[data-fres]");
    const v1 = pick<HTMLParagraphElement>("[data-v1]");
    const v2 = pick<HTMLParagraphElement>("[data-v2]");
    if (!q || !cv || !field || !tag || !qname || !qphase || !qres || !fphase || !fres || !v1 || !v2) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const narrow = root.getBoundingClientRect().width < NARROW;
    const COLS = narrow ? COLS_NARROW : COLS_WIDE;
    const PAD = narrow ? 20 : 34;
    const colOf = (a: number) => colAt(a, COLS);
    const HOLE = { c: colOf(50000.01), r: HOLE_ROW };

    let alive = true;
    const timers = new Set<number>();
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          if (alive) resolve();
          else reject(new Error("unmounted"));
        }, ms);
        timers.add(id);
      });

    const state = new Uint8Array(COLS * ROWS); // 0 idle, 1 tested, 2 swept, 3 hole
    let W = 0;
    let H = 0;
    let cw = 0;
    let ch = 0;
    let capCol = colOf(50000);
    let sweep = -1;
    let stampAt = 0;
    let animT = 0;

    const size = () => {
      const r = field.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = (W - PAD * 2) / COLS;
      ch = (H - PAD * 2) / ROWS;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const cx = PAD + capCol * cw;
      ctx.strokeStyle = "rgba(233,231,226,.45)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, PAD - 8);
      ctx.lineTo(cx, H - PAD + 4);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#a3a6ac";
      ctx.font = '500 9.5px ui-monospace, "JetBrains Mono", monospace';
      const lab = capCol === colOf(50000) ? "CAP · CAD 50,000" : "CAP · CAD 5,000,000";
      const lw = ctx.measureText(lab).width;
      ctx.fillText(lab, cx + 6 + lw > W - 8 ? cx - 6 - lw : cx + 6, PAD - 10);
      const base = Math.min(cw, ch) * (narrow ? 0.26 : 0.32);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const s = state[r * COLS + c] ?? 0;
          let col = "rgba(233,231,226,.16)";
          let rad = base;
          if (s === 1) {
            col = "#e9e7e2";
            rad *= 1.7;
          } else if (s === 2) col = "rgba(217,178,90,.62)";
          else if (s === 3) {
            col = "#e0614f";
            rad *= 2.6;
          }
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(PAD + c * cw + cw / 2, PAD + r * ch + ch / 2, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (sweep >= 0 && sweep < COLS) {
        const sx = PAD + sweep * cw;
        const g = ctx.createLinearGradient(sx - 60, 0, sx, 0);
        g.addColorStop(0, "rgba(217,178,90,0)");
        g.addColorStop(1, "rgba(217,178,90,.28)");
        ctx.fillStyle = g;
        ctx.fillRect(sx - 60, PAD - 4, 60, H - PAD * 2 + 8);
        ctx.fillStyle = "#d9b25a";
        ctx.fillRect(sx, PAD - 4, 1.6, H - PAD * 2 + 8);
      }
      // axis ticks
      ctx.font = '400 9px ui-monospace, "JetBrains Mono", monospace';
      ctx.fillStyle = "#6f737a";
      ctx.strokeStyle = "rgba(233,231,226,.25)";
      for (const [a, l] of [[1, "$1"], [100, "$100"], [10000, "$10K"], [1000000, "$1M"], [10000000, "$10M"]] as const) {
        const x = PAD + Math.min(COLS, (Math.log10(a) / 7) * COLS) * cw;
        ctx.beginPath();
        ctx.moveTo(x, H - PAD + 4);
        ctx.lineTo(x, H - PAD + 9);
        ctx.stroke();
        ctx.fillText(l, Math.min(W - 30, x - 8), H - PAD + 20);
      }
      // reticle on the hole
      if (state[HOLE.r * COLS + HOLE.c] === 3) {
        const x = PAD + HOLE.c * cw + cw / 2;
        const y = PAD + HOLE.r * ch + ch / 2;
        ctx.strokeStyle = "rgba(224,97,79,.55)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(PAD, y);
        ctx.lineTo(W - PAD, y);
        ctx.moveTo(x, PAD);
        ctx.lineTo(x, H - PAD);
        ctx.stroke();
        ctx.setLineDash([]);
        const k = 10 + 2 * Math.sin(t / 200);
        ctx.strokeStyle = "#e0614f";
        ctx.lineWidth = 1.4;
        for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
          ctx.beginPath();
          ctx.moveTo(x + sx * k, y + sy * (k - 5));
          ctx.lineTo(x + sx * k, y + sy * k);
          ctx.lineTo(x + sx * (k - 5), y + sy * k);
          ctx.stroke();
        }
        ctx.fillStyle = "#e0614f";
        ctx.font = '500 9px ui-monospace, "JetBrains Mono", monospace';
        ctx.fillText("x = 5000001", Math.min(W - 80, x + 4), H - PAD - 4);
        ctx.fillText("register=1 · dual=0", PAD + 4, y - 5);
      }
      // the seal, once the repaired policy holds
      if (stampAt) {
        const u = Math.min(1, (t - stampAt) / 500);
        const k = 1 - Math.pow(1 - u, 3);
        const x = W - 46;
        const y = H - 52;
        ctx.save();
        ctx.globalAlpha = k;
        ctx.translate(x, y);
        ctx.scale((0.3 + 0.7 * k) * 1.4, (0.3 + 0.7 * k) * 1.4);
        ctx.rotate(((-30 + 30 * k) * Math.PI) / 180);
        ctx.strokeStyle = "#e9e7e2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 2.2;
        ctx.save();
        ctx.rotate((35 * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, 13, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = "#d9b25a";
        ctx.save();
        ctx.rotate((-20 * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 10, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.restore();
        ctx.fillStyle = `rgba(217,178,90,${k})`;
        ctx.font = '500 9px ui-monospace, "JetBrains Mono", monospace';
        ctx.fillText("SEALED", x - 22, y + 34);
      }
    };

    let raf = 0;
    const loop = (t: number) => {
      animT = t;
      draw(t);
      raf = window.requestAnimationFrame(loop);
    };

    const type = async (text: string, speed: number) => {
      const toks = tokens(text);
      let line = 1;
      let html = '<span class="ln">1</span>';
      q.innerHTML = html;
      for (const tk of toks) {
        if (tk.cls === "nl") {
          line++;
          html += `\n<span class="ln">${line}</span>`;
          q.innerHTML = `${html}<span class="caret"></span>`;
          await wait(speed * 6);
          continue;
        }
        let acc = "";
        for (const c of tk.t) {
          acc += esc(c);
          const span = tk.cls ? `<span class="${tk.cls}">${acc}</span>` : acc;
          q.innerHTML = `${html}${tk.hl ? `<span class="new">${span}</span>` : span}<span class="caret"></span>`;
          await wait(speed);
        }
        const span = tk.cls ? `<span class="${tk.cls}">${acc}</span>` : acc;
        html += tk.hl ? `<span class="new">${span}</span>` : span;
      }
      q.innerHTML = html;
    };

    const placeTag = () => {
      const x = PAD + HOLE.c * cw + cw / 2;
      const y = PAD + HOLE.r * ch + ch / 2;
      // Measured, so the tag never runs past the edge of a narrow field.
      const tw = tag.offsetWidth || 240;
      tag.style.left = `${Math.max(8, Math.min(W - tw - 8, x + 14))}px`;
      // Narrow: below the hole, clear of the cap label along the top edge.
      tag.style.top = `${narrow ? y + 18 : Math.max(8, y - 54)}px`;
    };
    const setRes = (el: HTMLElement, text: string, cls: string) => {
      el.textContent = text;
      el.className = `v ${cls}`;
    };

    const run = async (): Promise<void> => {
      state.fill(0);
      sweep = -1;
      stampAt = 0;
      capCol = colOf(50000);
      tag.style.opacity = "0";
      v1.style.opacity = "0";
      v2.style.opacity = "0";
      qname.textContent = "POLICY AS WRITTEN";
      setRes(qres, "", "");
      setRes(fres, "", "");
      qphase.textContent = "WAITING";
      const tries: readonly [number, number][] = [[1200, 0], [48000, 33], [72000, 32], [9500, 1], [250000, 34], [30000, 48]];
      for (let i = 0; i < tries.length; i++) {
        const tr = tries[i];
        if (!tr) continue;
        state[tr[1] * COLS + colOf(tr[0])] = 1;
        fphase.textContent = `TESTS · ${i + 1} PAYMENTS TRIED · ALL PASS`;
        await wait(420);
      }
      await wait(500);
      qphase.textContent = "SOLVING";
      fphase.textContent = "ONE QUESTION · EVERY PAYMENT";
      await type(Q1, 7);
      for (sweep = 0; sweep < COLS; sweep++) {
        for (let r = 0; r < ROWS; r++) if (state[r * COLS + sweep] !== 1) state[r * COLS + sweep] = 2;
        if (sweep === HOLE.c) {
          state[HOLE.r * COLS + HOLE.c] = 3;
          placeTag();
          tag.style.opacity = "1";
          setRes(qres, "sat", "sat");
          setRes(fres, "A PAYMENT ESCAPES", "sat");
          qphase.textContent = "COUNTEREXAMPLE";
          await wait(1500);
          break;
        }
        await wait(9);
      }
      sweep = -1;
      v1.style.opacity = "1";
      await wait(2600);
      tag.style.opacity = "0";
      state.fill(0);
      capCol = colOf(5000000);
      qname.textContent = "REPAIRED · ABSOLUTE CAP";
      setRes(qres, "", "");
      setRes(fres, "", "");
      qphase.textContent = "SOLVING";
      fphase.textContent = "SAME QUESTION · EVERY PAYMENT";
      await type(Q2, 5);
      for (sweep = 0; sweep < COLS; sweep++) {
        for (let r = 0; r < ROWS; r++) state[r * COLS + sweep] = 2;
        await wait(8);
      }
      sweep = -1;
      setRes(qres, "unsat", "unsat");
      qphase.textContent = "NO PAYMENT ESCAPES";
      setRes(fres, "0 EXITS", "unsat");
      v2.style.opacity = "1";
      stampAt = animT;
      await wait(4500);
      return run();
    };

    size();
    // The field can change size without the window doing so (fonts, the phone layout settling):
    // watch the field itself, so the canvas never keeps a stale size.
    const onResize = () => size();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(field);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      q.textContent = Q2.replace(/§/g, "");
      setRes(qres, "unsat", "unsat");
      qphase.textContent = "NO PAYMENT ESCAPES";
      state.fill(2);
      capCol = colOf(5000000);
      v1.style.opacity = "1";
      v2.style.opacity = "1";
      draw(0);
      return () => {
        alive = false;
        ro.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    raf = window.requestAnimationFrame(loop);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          io.disconnect();
          run().catch(() => undefined); // rejects only on unmount
        }
      },
      { threshold: 0.3 },
    );
    io.observe(root);

    return () => {
      alive = false;
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={rootRef} className="thm fade-up mt-16" aria-label="A test tries a few cases. A proof covers them all.">
      <div className="thm-stage">
        <i className="thm-c1" />
        <i className="thm-c2" />
        <div className="thm-panel">
          <header>
            <span>
              <b>THE QUERY</b> · Z3
            </span>
            <span data-qname>POLICY AS WRITTEN</span>
          </header>
          <pre data-q aria-hidden="true" />
          <div className="thm-result">
            <span className="thm-phase" data-qphase>
              WAITING
            </span>
            <span className="v" data-qres />
          </div>
        </div>
        <div className="thm-panel">
          <header>
            <span>
              <b>EVERY POSSIBLE PAYMENT</b>
            </span>
            <span>AMOUNT (LOG) × 64 FLAG COMBINATIONS</span>
          </header>
          <div className="thm-field" data-field>
            <canvas data-cv aria-hidden="true" />
            <span className="thm-yax">FLAGS ↓</span>
            <div className="thm-tag" data-tag>
              CAD 50,000.01 · ONE SIGNATURE
              <br />
              PAYEE ON THE REGISTER → RUNS
            </div>
          </div>
          <div className="thm-result">
            <span className="thm-phase" data-fphase>
              —
            </span>
            <span className="v" data-fres />
          </div>
        </div>
      </div>
      <div className="thm-verdict">
        <p className="k" data-v1>
          A CAD 50,000.01 payment runs on one signature.
        </p>
        <p className="g" data-v2>
          Repaired: no approved payment can exceed CAD 5,000,000.
        </p>
      </div>
      <p className="thm-foot">
        Real queries and real answers, from <code>ironproof/lab/bank_policy/encode.py</code> (Z3). The policy was written by us, with defects planted on purpose; it is
        not a bank&rsquo;s. Re-derive: <code>python3 lab/bank_policy/encode.py</code>.
      </p>
    </div>
  );
}
