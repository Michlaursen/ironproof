#!/usr/bin/env node
/*
 * Differential: the site's evaluator (src/lib/govgate.ts) against the engine's
 * own second implementation (ironproof/verifier-ts/verify-verdict.ts), on every
 * action /lab can build plus the sealed ones.
 *
 *   node scripts/check-govgate.mjs [path/to/ironproof]
 *
 * Local only: Vercel builds this repo without the engine. The build-time check
 * in src/lib/evidence.ts covers the six sealed verdicts; this one covers the
 * actions no seal has seen -- the ones a visitor makes.
 *
 * Exit 1 on the first disagreement, and on a corpus that exercised fewer than
 * all three verdicts: a differential that never saw REFUSE proves nothing
 * about REFUSE.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ENGINE = resolve(process.argv[2] ?? join(ROOT, "..", "ironproof"));

const imp = (p) => import(pathToFileURL(p).href);
const { decide } = await imp(join(ROOT, "src/lib/govgate.ts"));
const lab = await imp(join(ROOT, "src/lib/lab-scenarios.ts"));
const ref = await imp(join(ENGINE, "verifier-ts/verify-verdict.ts"));
const { JsonReader } = await imp(join(ENGINE, "sceal/verifier-ts/verify.ts"));

const dossier = JSON.parse(readFileSync(join(ROOT, "public/evidence/golden-path-001/dossier.json"), "utf8"));
const [head, ...rest] = dossier.entries;
const policy = head.content.policy;
const sealed = Object.fromEntries(rest.map((e) => [e.content.action.id, e.content.action]));

/** The engine's decision, §6.4 precedence, from its own evalBool. */
function engineDecide(action) {
  const a = JsonReader.parse(JSON.stringify(action));
  const violated = [];
  const undecidable = [];
  for (const c of policy.constraints) {
    const pred = JsonReader.parse(JSON.stringify(c.predicate));
    try {
      if (ref.evalBool(pred, a)) violated.push(c.id);
    } catch (e) {
      if (e instanceof ref.Unanchored) undecidable.push(c.id);
      else if (e instanceof ref.Refusal) violated.push(c.id);
      else throw e;
    }
  }
  const decision = violated.length ? "BLOCK" : undecidable.length ? "REFUSE" : "PROCEED";
  return { decision, violated, undecidable };
}

const key = (d) => `${d.decision} v=${d.violated.join(",")} u=${d.undecidable.join(",")}`;

const corpus = [];
for (const [id, a] of Object.entries(sealed)) corpus.push([`sealed ${id}`, a]);
const C = lab.ceilingOf(policy);
for (const amt of [0, 1, C - 1, C, C + 1, 2 * C, 9_000_000, 50_000_000]) {
  for (const signed of [false, true]) corpus.push([`amount ${amt} signed=${signed}`, lab.amountAttack(sealed["pay-ok"], amt, signed)]);
}
for (const total of [C, C + 1, 12_000_000, 30_000_000]) {
  for (const parts of [1, 2, 3, 7, 200]) {
    lab.splitAttack(sealed["pay-ok"], total, parts).forEach((a, i) => corpus.push([`split ${total}/${parts} #${i}`, a]));
  }
}
for (const k of lab.allWindowKnobs()) {
  corpus.push([`window ${JSON.stringify(k)}`, lab.windowAttack(sealed["ben-4th"], k)]);
}

const seen = new Set();
let n = 0;
for (const [label, action] of corpus) {
  const mine = key(decide(policy, action));
  const theirs = key(engineDecide(action));
  n += 1;
  seen.add(mine.split(" ")[0]);
  if (mine !== theirs) {
    console.error(`DISAGREE on ${label}\n  site:   ${mine}\n  engine: ${theirs}`);
    process.exit(1);
  }
}
if (seen.size !== 3) {
  console.error(`corpus exercised only ${[...seen].join(", ")} -- a differential that never saw all three verdicts proves nothing about the missing one`);
  process.exit(1);
}
console.log(`check-govgate: ${n}/${n} actions, site == engine (${[...seen].sort().join(", ")} all exercised)`);
