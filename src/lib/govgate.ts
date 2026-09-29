/*
 * A GovGate verdict, re-derived in the browser -- the subset of SPEC_VERDICT §6
 * the published golden-path policy uses: flag, not, all, any, gt, field, const,
 * window_gt.
 *
 * Why the site carries an evaluator at all: /lab lets a visitor edit an action
 * and watch the SEALED policy decide it. A verdict typed into the copy would be
 * a claim; this is the rule running.
 *
 * Why it cannot quietly drift from the engine:
 *   1. At build time, src/lib/evidence.ts re-decides every sealed action of the
 *      pack with this file and FAILS THE BUILD unless decision, violated and
 *      undecidable all equal what was sealed.
 *   2. scripts/check-govgate.mjs runs this file and the engine's own second
 *      implementation (verifier-ts/verify-verdict.ts) side by side on every lab
 *      scenario plus mutations. Local only: Vercel builds without the engine.
 *
 * Order of checks inside window_gt follows verifier-ts, because §6.5 does not
 * settle it: the rule's own shape first, then the set, then the relabelling,
 * then the pivot, then the total.
 */

export type Verdict = "PROCEED" | "BLOCK" | "REFUSE";

export type Decision = {
  decision: Verdict;
  violated: string[];
  undecidable: string[];
  /** Why each constraint that did not simply pass ended where it did. */
  reasons: Record<string, string>;
};

/** §6.3 -- a malformed rule or value. Fails safe into `violated`. */
class Refusal extends Error {}
/** §6.5.1 -- there is no set to total. `undecidable`, never `violated`. */
class Unanchored extends Error {}

type Obj = Record<string, unknown>;

function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function has(o: Obj, k: string): boolean {
  return Object.prototype.hasOwnProperty.call(o, k);
}

function name(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}

/** An integer, and never a boolean: `field` must refuse `true` (§6.3). */
function intOf(v: unknown): number | null {
  return typeof v === "number" && Number.isSafeInteger(v) ? v : null;
}

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function evalNum(node: unknown, a: Obj, at: string): number {
  if (!isObj(node)) throw new Refusal(`${at}: node must be an object`);
  if (node.op === "const") {
    const v = intOf(node.value);
    if (v === null) throw new Refusal(`${at}/const: 'value' must be an integer`);
    return v;
  }
  if (node.op === "field") {
    const key = name(node.key);
    if (!key) throw new Refusal(`${at}/field: 'key' must be a name`);
    const dflt = has(node, "default") ? intOf(node.default) : 0;
    if (dflt === null) throw new Refusal(`${at}/field: 'default' must be an integer`);
    if (!has(a, key)) return dflt;
    const v = intOf(a[key]);
    if (v === null) throw new Refusal(`${at}/field ${key}: not an integer`);
    return v;
  }
  throw new Refusal(`${at}: ${String(node.op)} is not a numeric op`);
}

function evalWindowGt(node: Obj, a: Obj, at0: string): boolean {
  const at = `${at0}/window_gt`;

  // §6.3 -- the rule
  const over = name(node.over);
  if (!over) throw new Refusal(`${at}: 'over' must be a name`);
  const agg = node.agg;
  if (agg !== "sum" && agg !== "count") throw new Refusal(`${at}: 'agg' must be "sum" or "count"`);
  const field = has(node, "field") ? name(node.field) : null;
  if (agg === "sum" && !field) throw new Refusal(`${at}: 'field' is required for "sum"`);
  if (agg === "count" && has(node, "field")) throw new Refusal(`${at}: 'field' must be absent for "count"`);
  const right = intOf(node.right);
  if (right === null) throw new Refusal(`${at}: 'right' must be an integer`);
  if (has(node, "where") && !isObj(node.where)) throw new Refusal(`${at}: 'where' must be an object`);
  const wherePairs = isObj(node.where) ? Object.entries(node.where) : [];
  if (has(node, "same") && !Array.isArray(node.same)) throw new Refusal(`${at}: 'same' must be a list`);
  const sameKeys: string[] = [];
  for (const k of Array.isArray(node.same) ? node.same : []) {
    const n = name(k);
    if (!n) throw new Refusal(`${at}: 'same' must be a list of names`);
    sameKeys.push(n);
  }

  // §6.5.1 -- is there a set to total at all?
  const rows = a[over];
  if (!Array.isArray(rows)) throw new Unanchored(`the action carries no '${over}' list`);
  const pop = a[`${over}_population`];
  if (!isObj(pop)) throw new Unanchored(`no '${over}_population' declared`);
  if (!Array.isArray(pop.declared_ids)) throw new Unanchored(`'${over}_population.declared_ids' is not a list`);
  const declared = new Set<string>();
  for (const d of pop.declared_ids) {
    if (typeof d !== "string") throw new Unanchored("a declared id is not a string");
    declared.add(d);
  }
  const present = new Set<string>();
  for (const r of rows) {
    if (!isObj(r)) throw new Refusal(`${at}: a row is not an object`);
    if (typeof r.id !== "string") throw new Refusal(`${at}: a row has no string 'id'`);
    present.add(r.id);
  }
  const missing = [...declared].filter((d) => !present.has(d));
  const unexpected = [...present].filter((p) => !declared.has(p));
  if (missing.length || unexpected.length) {
    throw new Unanchored(
      "the window does not reconcile" +
        (missing.length ? ` -- missing ${missing.join(", ")}` : "") +
        (unexpected.length ? ` -- unexpected ${unexpected.join(", ")}` : ""),
    );
  }

  // The third direction: rows relabelled (1.4)
  const decisive = [...new Set([...wherePairs.map(([k]) => k), ...sameKeys])].sort();
  if (decisive.length) {
    const dr = pop.declared_rows;
    if (!isObj(dr)) throw new Unanchored(`the rule filters on ${decisive.join(", ")}, and no 'declared_rows' says their values`);
    const relabelled: string[] = [];
    for (const r of rows as Obj[]) {
      const rid = r.id as string;
      const decl = dr[rid];
      if (!isObj(decl)) throw new Unanchored(`row '${rid}' has no declared keys`);
      for (const k of decisive) {
        if (!has(decl, k)) throw new Unanchored(`row '${rid}' does not declare '${k}'`);
        if (!same(decl[k], r[k])) relabelled.push(`${rid}.${k}`);
      }
    }
    if (relabelled.length) {
      throw new Unanchored(`relabelled: ${relabelled.join(", ")} differ from the declared population`);
    }
  }

  // Without the pivot there is no set to total.
  for (const k of sameKeys) {
    if (a[k] === undefined || a[k] === null) throw new Unanchored(`'${k}' is absent on the action`);
  }

  let total = 0;
  for (const r of rows as Obj[]) {
    if (wherePairs.some(([k, v]) => !same(r[k], v))) continue;
    if (sameKeys.some((k) => !same(r[k], a[k]))) continue;
    if (agg === "count") {
      total += 1;
      continue;
    }
    const n = intOf(r[field as string]);
    if (n === null) throw new Refusal(`${at}: '${field}' is not an integer on row ${String(r.id)}`);
    total += n;
  }
  return total > right;
}

function evalBool(node: unknown, a: Obj, at = "root"): boolean {
  if (!isObj(node)) throw new Refusal(`${at}: node must be an object`);
  const op = node.op;
  if (op === "flag") {
    const key = name(node.key);
    if (!key) throw new Refusal(`${at}/flag: 'key' must be a name`);
    const dflt = has(node, "default") ? node.default : false;
    if (typeof dflt !== "boolean") throw new Refusal(`${at}/flag: 'default' must be a boolean`);
    if (!has(a, key)) return dflt;
    const v = a[key];
    if (typeof v !== "boolean") throw new Refusal(`${at}/flag ${key}: not a boolean`);
    return v;
  }
  if (op === "not") {
    if (!has(node, "arg")) throw new Refusal(`${at}/not: missing 'arg'`);
    return !evalBool(node.arg, a, `${at}/not`);
  }
  if (op === "all" || op === "any") {
    const args = Array.isArray(node.args) ? node.args : [];
    if (args.length === 0) throw new Refusal(`${at}/${op}: 'args' must be non-empty`);
    // Every branch is evaluated, as the reference does: a malformed branch
    // must raise even when another branch already settles the result.
    const vals = args.map((x, i) => evalBool(x, a, `${at}/${op}[${i}]`));
    return op === "all" ? vals.every(Boolean) : vals.some(Boolean);
  }
  if (op === "gt") {
    if (!has(node, "left") || !has(node, "right")) throw new Refusal(`${at}/gt: needs 'left' and 'right'`);
    return evalNum(node.left, a, `${at}/gt.left`) > evalNum(node.right, a, `${at}/gt.right`);
  }
  if (op === "window_gt") return evalWindowGt(node, a, at);
  throw new Refusal(`${at}: ${String(op)} is not supported here`);
}

/** §6.4 -- two lists, never merged; BLOCK outranks REFUSE outranks PROCEED. */
export function decide(policy: unknown, action: unknown): Decision {
  const violated: string[] = [];
  const undecidable: string[] = [];
  const reasons: Record<string, string> = {};
  if (!isObj(policy) || !Array.isArray(policy.constraints) || policy.constraints.length === 0) {
    return { decision: "BLOCK", violated: ["policy"], undecidable, reasons: { policy: "no constraints to evaluate" } };
  }
  // §6.4.1: declared-uncovered obligations can never let an action PROCEED.
  if (Array.isArray(policy.uncovered)) {
    for (const u of policy.uncovered) {
      if (isObj(u) && typeof u.id === "string") {
        undecidable.push(u.id);
        reasons[u.id] = "declared uncovered by the policy";
      }
    }
  }
  const a: Obj = isObj(action) ? action : {};
  for (const c of policy.constraints) {
    const id = isObj(c) && typeof c.id === "string" ? c.id : "?";
    try {
      if (evalBool(isObj(c) ? c.predicate : undefined, a)) {
        violated.push(id);
        reasons[id] = isObj(c) && typeof c.label === "string" ? c.label : "violated";
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (e instanceof Unanchored) {
        undecidable.push(id);
      } else {
        violated.push(id);
      }
      reasons[id] = msg;
    }
  }
  const decision: Verdict = violated.length ? "BLOCK" : undecidable.length ? "REFUSE" : "PROCEED";
  return { decision, violated, undecidable, reasons };
}
