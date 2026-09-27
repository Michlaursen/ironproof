#!/usr/bin/env node
/*
 * Copy ONE built evidence pack from the engine repo into the site, and forge
 * the tampered twin the /evidence page offers next to it.
 *
 *   node scripts/sync-evidence-pack.mjs [path/to/dist/pack/golden-path-001]
 *
 * Why a copy at all: Vercel builds this repo alone, so the engine's
 * dist/pack/ is not there at build time. The copy is the snapshot the page
 * quotes, and the page DERIVES every verdict, role and limit from these files
 * at build time -- nothing on the page restates them by hand. The only thing
 * that can go stale is the snapshot itself, and it carries the commit it was
 * built from (source.json), printed on the page.
 *
 * Fails loudly on anything missing: a pack we cannot read is not one we may
 * half-publish.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(process.argv[2] ?? join(ROOT, "..", "ironproof", "dist", "pack", "golden-path-001"));
const OUT = join(ROOT, "public", "evidence", "golden-path-001");

// README.md is read by the page for the solver table and the list of actions
// that reached the tool. It is published too: it is the pack's own front page.
const FILES = ["dossier.json", "README.md", "DECISIONS.md", "LIMITS.md"];

function die(msg) {
  console.error(`sync-evidence-pack: ${msg}`);
  process.exit(1);
}

for (const f of FILES) {
  if (!existsSync(join(SRC, f))) die(`missing ${f} in ${SRC} -- run \`make pack\` in the engine repo first`);
}

const readme = readFileSync(join(SRC, "README.md"), "utf8");
const commit = /Built from commit `([0-9a-f]{40})`/.exec(readme)?.[1];
if (!commit) die("README.md does not name the commit it was built from");

mkdirSync(OUT, { recursive: true });
for (const f of FILES) copyFileSync(join(SRC, f), join(OUT, f));

/*
 * The forgery: after the fact, someone edits the blocked CAD 9,000,000 payment
 * so the record claims it carried a second signature -- the one edit that
 * would make the BLOCK look wrong. Only `content` changes; the hashes and
 * signatures are left as sealed, which is exactly what an editor without the
 * signing keys can do.
 */
const dossier = JSON.parse(readFileSync(join(SRC, "dossier.json"), "utf8"));
const target = dossier.entries.find(
  (e) => e?.content?.action?.id === "pay-big-unsigned" && e.content.decision === "BLOCK",
);
if (!target) die("no BLOCKed entry `pay-big-unsigned` to forge -- the pack changed shape, update this script");
if (target.content.action.dual_signed !== false) die("`pay-big-unsigned` is already dual_signed -- nothing to forge");
target.content.action.dual_signed = true;
writeFileSync(join(OUT, "dossier-tampered.json"), JSON.stringify(dossier, null, 2) + "\n");

writeFileSync(
  join(OUT, "source.json"),
  JSON.stringify({ pack: "golden-path-001", engine_commit: commit, forged_entry_seq: target.seq }, null, 2) + "\n",
);

console.log(`sync-evidence-pack: golden-path-001 @ ${commit.slice(0, 7)} -> ${OUT}`);
console.log(`  forged: seq=${target.seq} pay-big-unsigned dual_signed false -> true`);
