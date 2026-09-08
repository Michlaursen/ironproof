#!/usr/bin/env node
/*
 * Guard for the research-note charts. Run: node scripts/check-research-charts.mjs
 *
 * The charts carry their labels inside the SVG, so a label that grows — which is
 * what translation does; French runs 15–20% longer than English — silently
 * overflows its viewBox or collides with a neighbour. That is invisible to tsc,
 * to eslint and to `next build`, and it is easy to miss by eye in the locale you
 * do not read. Every failure this script reports was a real one found this way.
 *
 * Widths are estimated from character count and font size, using a conservative
 * advance ratio. The estimate is deliberately pessimistic: it should complain
 * slightly before the browser does, never after.
 */

import { readFileSync } from "node:fs";

const SRC = "src/components/landing/research-charts.tsx";
const src = readFileSync(SRC, "utf8");

const SANS = 0.545; // Inter advance ratio at weight 400
const MONO = 0.74; // JetBrains Mono + 0.14em tracking

const fails = [];
const note = (m) => fails.push(m);

/** Pull one locale's slice out of a `const NAME: L<...> = { en: {...}, fr: {...} }` table. */
function localeBlock(constName, locale) {
  const i = src.indexOf(`const ${constName}`);
  const body = src.slice(i, src.indexOf("\n};", i));
  const k = body.indexOf(`  ${locale}: {`);
  if (k < 0) throw new Error(`${constName}: no ${locale} block`);
  const end = locale === "en" ? body.indexOf("\n  fr: {", k + 1) : body.length;
  return body.slice(k, end > 0 ? end : body.length);
}

const width = (text, size, ratio) => text.length * size * ratio;

/* ── Timeline: labels are centred on their tick, alternating above and below.
      They must sit inside the viewBox, and must not touch the same-side
      neighbour two ticks away. Keep in step with TimelineChart. */
{
  const [x0, x1, VB] = [115, 915, 1030];
  for (const loc of ["en", "fr"]) {
    const rows = [...localeBlock("TIMELINE", loc).matchAll(
      /\["([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*(?:true|false)\]/g,
    )].map((m) => [m[1], m[2], m[3]]);
    if (!rows.length) note(`timeline/${loc}: parsed no events`);
    const pitch = (x1 - x0) / (rows.length - 1);
    rows.forEach(([date, l1, l2], i) => {
      const x = x0 + i * pitch;
      for (const [t, size, ratio] of [[date, 12.5, MONO], [l1, 15, SANS], [l2, 15, SANS]]) {
        const half = width(t, size, ratio) / 2;
        if (x - half < -1 || x + half > VB + 1) note(`timeline/${loc}: "${t}" overflows the viewBox`);
      }
      const next = rows[i + 2];
      if (!next) return;
      for (const [a, b, size, ratio] of [
        [l1, next[1], 15, SANS],
        [l2, next[2], 15, SANS],
        [date, next[0], 12.5, MONO],
      ]) {
        if ((width(a, size, ratio) + width(b, size, ratio)) / 2 > 2 * pitch) {
          note(`timeline/${loc}: "${a}" collides with "${b}"`);
        }
      }
    });
  }
}

/* ── Runs legend: three items sharing one baseline. */
{
  const xs = [95, 488, 758]; // keep in step with RunsChart's legend origins + 18
  for (const loc of ["en", "fr"]) {
    const b = localeBlock("RUNS", loc);
    const legend = [...b.slice(b.indexOf("legend: [")).matchAll(/"([^"]*)"/g)].slice(0, 3).map((m) => m[1]);
    const ends = legend.map((t, i) => xs[i] + width(t, 15, SANS));
    ends.forEach((end, i) => {
      if (i < 2 && end > xs[i + 1] - 6) note(`runs/${loc}: "${legend[i]}" runs into "${legend[i + 1]}"`);
      if (i === 2 && end > 1000) note(`runs/${loc}: "${legend[i]}" overflows the viewBox`);
    });
  }
}

/* ── Bar charts: the row label and its small-caps sub-label sit left of the
      bars and must not reach them. */
for (const [constName, barX] of [["SPREAD", 330], ["DETECTION", 490]]) {
  for (const loc of ["en", "fr"]) {
    const rows = [...localeBlock(constName, loc).matchAll(
      /\["([^"]*)",\s*"([^"]*)"(?:,\s*"([^"]*)")?\]/g,
    )];
    for (const m of rows) {
      if (70 + width(m[1], 16, SANS) > barX - 10) note(`${constName.toLowerCase()}/${loc}: "${m[1]}" reaches the bars`);
      if (70 + width(m[2], 11.5, MONO) > barX - 10) note(`${constName.toLowerCase()}/${loc}: sub-label "${m[2]}" reaches the bars`);
    }
  }
}

if (fails.length) {
  console.error(`research charts: ${fails.length} layout problem(s)\n`);
  for (const f of fails) console.error("  " + f);
  process.exit(1);
}
console.log("research charts: labels fit, EN and FR");
