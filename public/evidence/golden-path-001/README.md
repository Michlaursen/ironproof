# Ironproof evidence pack -- golden-path-001

Built from commit `fb0d5f027b6ff5fdc1869bdd302b7f77b389c940`.

This pack lets you reach our verdicts without running our code, and without
taking our word for any step. Start here:

    sh verify.sh            # needs node >= 24, nothing else

## What this control is

No single payment above CAD 5,000,000 may leave without a second signature, and no account may have more than 3 beneficiary changes in a rolling 12-month window.

## What the solver established, and by which method

Four questions about the clauses of ONE policy, four different answers. The
first one is the one to read.

| question | answer | method |
|---|---|---|
| can ANY approved payment exceed the ceiling? | **REFUTED** | Z3, whole numeric range |
| ...without a second signature? | **PROVEN** | Z3, whole numeric range |
| ...over a sequence of 200 payments? | **STRUCTURING** | Z3, bounded at 200 |
| ...the count over a rolling window? | **NOT EXERCISED** | the compiler declines to quantify it |

The first row is REFUTED, and that is not a defect in the encoding. Asked
plainly, the rule admits a payment of any size as long as it carries a second
signature -- it never imposed an absolute ceiling, it imposed one CONDITIONAL on
that signature. A solver returned that in about a tenth of a second; two human
readings of the same sentence did not.

## When it was sealed

The chain head is anchored (declared 2026-10-08T16:06:46.531348Z). Witnesses that landed:

- sealed AFTER: bitcoin, drand
- existed BEFORE: opentimestamps (pending Bitcoin confirmation), rfc3161

Both sides are bounded: backdating would require rewriting a public record.

`verify.sh` checks that the anchor is signed by the dossier's keys and covers this chain's head, and prints which side the time is bounded on. It does not re-fetch the witnesses: each one names its public source (TSA, drand round, Bitcoin block), checkable there.

## Who authorised the policy

2 of 2 designated authorities dual-signed (Ed25519 + ML-DSA-65) the exact
bytes of this policy AND of the compiler that reads it. Their roles:

- `risk-officer`  key `3b5ffc6e05f11844...`
- `treasury-controller`  key `9a6d9aa2c8fe721a...`

A signature binds a KEY, never a label. The roles above are declared; resolve
them against your own key registry.

## What actually ran

The gate is not advisory. Of the actions in this pack, the tool received
exactly: `pay-ok`, `pay-big-signed`

Every other action was denied before reaching it. That distinction is the whole
product: an exception raised after the money moved is a log entry.

## Files

    verify.sh                   the three checks, in order
    dossier.json                the sealed chain: policy, approval, verdicts
    MANIFEST.sha3               every file in this pack, hashed
    SPEC_VERDICT.md             the normative spec for re-deriving a verdict
    sceal/SPEC_CANON.md         the normative spec for the seal
    verifier-ts/                a SECOND implementation, written from the spec
    sceal/verifier-ts/          the seal verifier
    LIMITS.md                   what this pack does NOT establish -- read it

## Read LIMITS.md

It is a separate file so that a reader who stops at the first green line still
has to walk past it.
