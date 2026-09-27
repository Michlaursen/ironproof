import { readFileSync } from "node:fs";
import { join } from "node:path";
import { decide } from "./govgate";

/*
 * The /evidence page reads the published pack; it never restates it.
 *
 * Every verdict, role, solver answer, decision and limit shown on the page is
 * parsed here, at build time, from the files under public/evidence/ -- the
 * same bytes a visitor downloads. A parse that finds nothing THROWS, so a pack
 * that changed shape breaks the build instead of rendering an empty table
 * that reads as "nothing to report".
 *
 * One cross-check is enforced rather than trusted: the README's list of
 * actions that reached the tool must equal the dossier's PROCEED set. Two
 * places saying the same thing, with a check that breaks when they disagree.
 */

// Build-time read of a fixed folder: tell the tracer not to follow cwd.
const DIR = join(/*turbopackIgnore: true*/ process.cwd(), "public", "evidence", "golden-path-001");
export const EVIDENCE_BASE = "/evidence/golden-path-001";

export type Verdict = "PROCEED" | "BLOCK" | "REFUSE";

export type Decision = {
  seq: number;
  id: string;
  amount: number;
  dualSigned: boolean;
  /** Rows the caller put in the window, and whether it declared the population. */
  windowRows: number;
  /** Rows the caller DECLARED for the window; null when it declared none. */
  declaredRows: number | null;
  verdict: Verdict;
  violated: string[];
  undecidable: string[];
  detail: string;
};

export type SolverRow = { question: string; answer: string; method: string };
export type OwnDecision = { question: string; decided: string; why: string };
export type Limit = { head: string; body: string };

export type EvidencePack = {
  commit: string;
  control: string;
  constraints: { id: string; label: string; method: string }[];
  approvers: { role: string; keyId: string }[];
  quorum: number;
  signaturesVerified: number;
  decisions: Decision[];
  reached: string[];
  solver: SolverRow[];
  ownDecisions: OwnDecision[];
  limits: Limit[];
  forgedSeq: number;
  /** The sealed policy and actions, verbatim, for /lab to edit and re-decide. */
  policy: unknown;
  actions: Record<string, unknown>;
};

function fail(what: string): never {
  throw new Error(`evidence pack: ${what} (public/evidence/golden-path-001)`);
}

function read(name: string): string {
  return readFileSync(join(DIR, name), "utf8");
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function str(v: unknown, what: string): string {
  if (typeof v !== "string") fail(`${what} is not a string`);
  return v;
}

function strList(v: unknown, what: string): string[] {
  if (!Array.isArray(v)) fail(`${what} is not a list`);
  return v.map((x, i) => str(x, `${what}[${i}]`));
}

/** Strip the markdown the pack uses inline: `code`, **bold**. */
function plain(s: string): string {
  return s.replace(/`([^`]*)`/g, "$1").replace(/\*\*([^*]*)\*\*/g, "$1").replace(/\s+/g, " ").trim();
}

function parseDossier(raw: string) {
  const d: unknown = JSON.parse(raw);
  if (!isRecord(d) || !Array.isArray(d.entries) || d.entries.length < 2) fail("dossier has no entries");
  const [head, ...rest] = d.entries as unknown[];
  if (!isRecord(head) || !isRecord(head.content)) fail("dossier header missing");
  const h = head.content;
  if (!isRecord(h.policy) || !Array.isArray(h.policy.constraints)) fail("policy constraints missing");
  if (!Array.isArray(h.discharge) || !isRecord(h.approval)) fail("discharge or approval missing");

  const methodOf = new Map<string, string>();
  for (const x of h.discharge) {
    if (isRecord(x)) methodOf.set(str(x.constraint_id, "discharge id"), str(x.method, "discharge method"));
  }
  const constraints = h.policy.constraints.map((c, i) => {
    if (!isRecord(c)) fail(`constraint ${i} malformed`);
    const id = str(c.id, "constraint id");
    return { id, label: str(c.label, "constraint label"), method: methodOf.get(id) ?? fail(`no discharge for ${id}`) };
  });

  const a = h.approval;
  if (!Array.isArray(a.approver_identities)) fail("approver identities missing");
  const approvers = a.approver_identities.map((x, i) => {
    if (!isRecord(x)) fail(`approver ${i} malformed`);
    return { role: str(x.approver_id, "approver_id"), keyId: str(x.key_id, "key_id") };
  });
  if (typeof a.quorum !== "number" || typeof a.signatures_verified !== "number") fail("quorum missing");

  const decisions: Decision[] = rest.map((e, i) => {
    if (!isRecord(e) || !isRecord(e.content) || !isRecord(e.content.action)) fail(`entry ${i + 1} malformed`);
    const c = e.content;
    const act = c.action as Record<string, unknown>;
    const v = str(c.decision, "decision");
    if (v !== "PROCEED" && v !== "BLOCK" && v !== "REFUSE") fail(`unknown verdict ${v}`);
    if (typeof act.amount !== "number" || typeof act.dual_signed !== "boolean") fail(`action ${i + 1} fields`);
    if (typeof e.seq !== "number") fail(`entry ${i + 1} seq`);
    return {
      seq: e.seq,
      id: str(act.id, "action id"),
      amount: act.amount,
      dualSigned: act.dual_signed,
      windowRows: Array.isArray(act.changes_12m) ? act.changes_12m.length : 0,
      declaredRows:
        isRecord(act.changes_12m_population) && Array.isArray(act.changes_12m_population.declared_ids)
          ? act.changes_12m_population.declared_ids.length
          : null,
      verdict: v,
      violated: strList(c.violated, "violated"),
      undecidable: strList(c.undecidable, "undecidable"),
      detail: str(c.detail, "detail"),
    };
  });

  // The site's evaluator must reach every sealed verdict on its own, or the
  // build stops: /lab runs this evaluator, so it has to agree with the engine
  // on everything the engine sealed.
  const policy = h.policy;
  const actions: Record<string, unknown> = {};
  for (const [i, e] of rest.entries()) {
    const c = (e as Record<string, Record<string, unknown>>).content;
    const d = decisions[i];
    const got = decide(policy, c.action);
    const want = `${d.verdict} v=${d.violated.join(",")} u=${d.undecidable.join(",")}`;
    const mine = `${got.decision} v=${got.violated.join(",")} u=${got.undecidable.join(",")}`;
    if (want !== mine) fail(`site evaluator decides ${d.id} as ${mine}, the seal says ${want}`);
    actions[d.id] = c.action;
  }

  return {
    policy,
    actions,
    constraints,
    approvers,
    quorum: a.quorum,
    signaturesVerified: a.signatures_verified,
    decisions,
  };
}

function parseReadme(md: string) {
  const commit = /Built from commit `([0-9a-f]{40})`/.exec(md)?.[1] ?? fail("README names no commit");
  const control = /## What this control is\s+([\s\S]*?)\n\s*\n/.exec(md)?.[1] ?? fail("README has no control sentence");
  const solver: SolverRow[] = [];
  for (const m of md.matchAll(/^\| (.+?) \| \*\*([A-Z][A-Z ]+)\*\* \| (.+?) \|$/gm)) {
    solver.push({ question: plain(m[1]), answer: m[2], method: plain(m[3]) });
  }
  if (solver.length === 0) fail("README solver table not found");
  const line = /the tool received\s+exactly:\s*([^\n]+)/.exec(md)?.[1] ?? fail("README does not list what reached the tool");
  const reached = [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  if (reached.length === 0) fail("README reached-list is empty");
  return { commit, control: plain(control), solver, reached };
}

function parseOwnDecisions(md: string): OwnDecision[] {
  const out: OwnDecision[] = [];
  for (const block of md.split(/^### /m).slice(1)) {
    const question = plain(block.split("\n", 1)[0]);
    const m = /\*\*We decided:\*\*\s*([^\n]+)\n\s*\n([\s\S]*)/.exec(block);
    if (!m) fail(`DECISIONS.md block "${question}" has no decision`);
    out.push({ question, decided: plain(m[1]), why: plain(m[2]) });
  }
  if (out.length === 0) fail("DECISIONS.md is empty");
  return out;
}

function parseLimits(md: string): Limit[] {
  const out: Limit[] = [];
  for (const m of md.matchAll(/^\d+\. \*\*([\s\S]+?)\*\*([\s\S]*?)(?=^\d+\. \*\*|(?![\s\S]))/gm)) {
    out.push({ head: plain(m[1]), body: plain(m[2]) });
  }
  // Count EVERY numbered line, bold or not: a limit that lost its bold would
  // otherwise be swallowed into the previous one's body and vanish from the
  // page while the two counts still agreed (mutation seen 2026-09-26).
  const numbers = (md.match(/^\d+(?=\. )/gm) ?? []).map(Number);
  const consecutive = numbers.every((n, i) => n === i + 1);
  if (out.length === 0 || out.length !== numbers.length || !consecutive) {
    fail(`LIMITS.md: parsed ${out.length} limits, file numbers ${numbers.join(",")}`);
  }
  return out;
}

let cached: EvidencePack | null = null;

export function loadEvidencePack(): EvidencePack {
  if (cached) return cached;
  const dossier = parseDossier(read("dossier.json"));
  const readme = parseReadme(read("README.md"));

  const proceeded = dossier.decisions.filter((d) => d.verdict === "PROCEED").map((d) => d.id).sort();
  const reached = [...readme.reached].sort();
  if (proceeded.join(",") !== reached.join(",")) {
    fail(`README says ${reached.join(",")} reached the tool, the dossier PROCEEDs ${proceeded.join(",")}`);
  }

  const src: unknown = JSON.parse(read("source.json"));
  if (!isRecord(src) || src.engine_commit !== readme.commit || typeof src.forged_entry_seq !== "number") {
    fail("source.json disagrees with README.md -- re-run scripts/sync-evidence-pack.mjs");
  }

  cached = {
    ...dossier,
    ...readme,
    ownDecisions: parseOwnDecisions(read("DECISIONS.md")),
    limits: parseLimits(read("LIMITS.md")),
    forgedSeq: src.forged_entry_seq,
  };
  return cached;
}
