/*
 * The attacks /lab lets a visitor run, as PURE builders over the sealed
 * actions of golden-path-001. The page and scripts/check-govgate.mjs import
 * the same builders, so what is cross-checked against the engine is exactly
 * what the visitor sees -- not a parallel list that could drift.
 *
 * No verdict lives here. A builder only shapes an action; `decide()` in
 * govgate.ts runs the sealed policy on it.
 */

type Obj = Record<string, unknown>;

function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

/**
 * The ceiling, READ from the sealed policy (C1's `gt` against a `const`),
 * never typed a second time. Throws if the policy changed shape.
 */
export function ceilingOf(policy: unknown): number {
  const found: number[] = [];
  const walk = (n: unknown): void => {
    if (Array.isArray(n)) n.forEach(walk);
    else if (isObj(n)) {
      if (n.op === "gt" && isObj(n.right) && n.right.op === "const" && typeof n.right.value === "number") {
        found.push(n.right.value);
      }
      Object.values(n).forEach(walk);
    }
  };
  walk(policy);
  if (found.length !== 1) throw new Error(`lab: expected one amount ceiling in the policy, found ${found.length}`);
  return found[0];
}

/** Attack 1 -- one payment: any amount, with or without the second signature. */
export function amountAttack(base: unknown, amount: number, signed: boolean): Obj {
  const a = clone(base) as Obj;
  a.id = "lab-amount";
  a.amount = Math.max(0, Math.round(amount));
  a.dual_signed = signed;
  return a;
}

/** Attack 2 -- one total, split into `parts` unsigned payments. Remainder on the first. */
export function splitAttack(base: unknown, total: number, parts: number): Obj[] {
  const n = Math.max(1, Math.floor(parts));
  const each = Math.floor(total / n);
  return Array.from({ length: n }, (_, i) => {
    const a = clone(base) as Obj;
    a.id = `lab-split-${i + 1}`;
    a.amount = i === 0 ? total - each * (n - 1) : each;
    a.dual_signed = false;
    return a;
  });
}

/** Attack 3 -- tamper with the window of beneficiary changes. */
export type WindowKnobs = {
  /** Drop the newest change from the rows sent. */
  dropSent: boolean;
  /** ...and from the declaration too, so both sides agree on the lie. */
  dropDeclared: boolean;
  /** Relabel the newest change as something the rule does not count. */
  relabelSent: boolean;
  /** ...and relabel it in the declaration too. */
  relabelDeclared: boolean;
  /** Send no declaration at all. */
  noDeclaration: boolean;
};

export const NO_TAMPERING: WindowKnobs = {
  dropSent: false,
  dropDeclared: false,
  relabelSent: false,
  relabelDeclared: false,
  noDeclaration: false,
};

export const RELABEL_KIND = "address_change";

export function windowAttack(base: unknown, k: WindowKnobs): Obj {
  const a = clone(base) as Obj;
  a.id = "lab-window";
  const rows = Array.isArray(a.changes_12m) ? (a.changes_12m as Obj[]) : [];
  const pop = isObj(a.changes_12m_population) ? a.changes_12m_population : {};
  const ids = Array.isArray(pop.declared_ids) ? (pop.declared_ids as string[]) : [];
  const drows = isObj(pop.declared_rows) ? (pop.declared_rows as Record<string, Obj>) : {};
  const last = rows.length ? String(rows[rows.length - 1].id) : "";

  if (k.relabelSent && rows.length) rows[rows.length - 1].kind = RELABEL_KIND;
  if (k.relabelDeclared && isObj(drows[last])) drows[last].kind = RELABEL_KIND;
  if (k.dropSent) a.changes_12m = rows.filter((r) => r.id !== last);
  if (k.dropDeclared) {
    pop.declared_ids = ids.filter((i) => i !== last);
    delete drows[last];
  }
  if (k.noDeclaration) delete a.changes_12m_population;
  return a;
}

/** Every knob combination -- for the cross-check, not the page. */
export function allWindowKnobs(): WindowKnobs[] {
  const keys = Object.keys(NO_TAMPERING) as (keyof WindowKnobs)[];
  return Array.from({ length: 1 << keys.length }, (_, m) => {
    const k = { ...NO_TAMPERING };
    keys.forEach((key, i) => {
      k[key] = Boolean(m & (1 << i));
    });
    return k;
  });
}
