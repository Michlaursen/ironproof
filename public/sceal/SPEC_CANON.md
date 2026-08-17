# Sceal Wire Specification — canonical encoding and seal verification

**Version 1.0 · covers dossier schema `sceal_dossier_version` 1.2 (and reads 1.1)**

This document specifies the exact bytes a Sceal dossier commits to, so that an independent
verifier — written in any language, by anyone, without our code — can reproduce every hash and
check every signature.

It exists because of a precise gap. The signature primitives are NIST standards (FIPS 204
ML-DSA-65, Ed25519, SHA3-512) and anyone can implement those. But what gets *hashed* is the output
of our serializer, and until this document existed no third party could reconstruct those bytes.
**The verifiability of an artifact is that of its least public link, not that of its most
prestigious primitive.** This specification is that link, made public.

---

## 1. Scope

**In scope.** The canonical encoding, the hash constructions, the entry and anchor seals, the
chain linkage rule, the dossier envelope, and the verification algorithm.

**Out of scope, and deliberately so.** How evidence is collected, whether the collected content is
true, and what a timestamp means. See §9.

---

## 2. Canonical encoding

All hashing is performed over `canonical(v)`, a deterministic UTF-8 byte encoding of a
JSON-compatible value `v`.

```
canonical(v) = utf8( json_encode(v) )
```

where `json_encode` is RFC 8259 JSON with these five constraints applied at **every** level of
nesting:

| # | Constraint | Effect |
|---|---|---|
| C1 | **Object keys sorted** by ascending Unicode **code point** of the key string | key order in the source is irrelevant |
| C2 | **No insignificant whitespace** — item separator is `,`, key separator is `:` | no incidental spacing drift |
| C3 | **String escaping** per §2.2 — the output is pure ASCII | byte-identical across locales and platforms |
| C4 | **Numbers** encoded per §2.1 | no float ambiguity |
| C5 | **Duplicate object keys**: the last occurrence wins | a re-encoder cannot invent an order |

The reference implementation is Python's
`json.dumps(v, sort_keys=True, separators=(",", ":"), ensure_ascii=True).encode("utf-8")`
(`sceal/canon.py`). This specification is normative; the implementation follows it.

### 2.1 Numbers

- **Integers** are encoded in their exact decimal form, no exponent, no decimal point, `-` for
  negatives. `0` encodes as `0`.
- **Floats** are encoded as the **shortest decimal string that round-trips** to the same IEEE-754
  binary64 value, with these formatting rules:
  - a value with no fractional part **retains** `.0` — `1.0` encodes as `1.0`, never `1`;
  - exponent form is used exactly when the shortest form requires it, written as `e` followed by
    a mandatory sign and **at least two digits** — `1e-07`, `1e+21`, `3e-05`;
  - this is Python's `repr(float)`. It is *not* the ECMAScript number-to-string algorithm.
- **Integer and float are distinct types and encode differently.** `{"a":1}` and `{"a":1.0}` are
  different documents with different hashes. A verifier that parses JSON into a single numeric
  type cannot re-encode faithfully and **must** preserve the lexical form of the source instead.
- `NaN` and `±Infinity` are **not valid** in sealed content. They are not representable in RFC 8259
  JSON, and a dossier containing them cannot be parsed by a conformant third-party verifier. Sceal
  rejects them at seal time (`sceal/canon.py`).

### 2.2 String escaping

Applied in this order. The output contains **no byte above `0x7E`**.

1. **Short escapes**, which take precedence over everything below:
   `"` -> `\"` · `\` -> `\\` · U+0008 -> `\b` · U+000C -> `\f` ·
   U+000A -> `\n` · U+000D -> `\r` · U+0009 -> `\t`
2. **Any other character in `0x20`-`0x7E` is emitted verbatim.** In particular `/` is **not**
   escaped.
3. **Everything else** - every code point below `0x20` **and every code point above `0x7E`** -
   becomes `\uXXXX` with **lowercase** hex digits. Code points above `0xFFFF` become a
   UTF-16 **surrogate pair**, written as two consecutive `\uXXXX` escapes.

⚠️ Rule 3 is stated as a **code-point range**, not as "non-ASCII", and the difference is
load-bearing. **U+007F (DEL) is an ASCII character and is escaped** - it encodes as `\u007f`,
not as a raw byte. An implementation that escapes "non-ASCII" emits a different byte string for any
document containing DEL, and therefore a different hash. This was found by building the second
implementation, not by reading the first.

Note also that RFC 8259 permits **both** `\n` and `\u000a` for a line feed. This
encoding requires the short form, so rule 1 is not a stylistic preference: choosing `\u000a`
yields different bytes and a different hash.

### 2.3 Relationship to RFC 8785 (JCS) — read this before implementing

**This encoding is NOT JCS, and must not be implemented as JCS.** It is close enough that the
mistake is easy and the resulting verifier would silently disagree on real documents. The four
differences, each measured on the shipped implementation, not assumed:

| Aspect | Sceal canonical | RFC 8785 (JCS) |
|---|---|---|
| Non-ASCII | escaped `\uXXXX` — `"été"` encodes as `"\u00e9t\u00e9"` | raw UTF-8 — `"été"` |
| Whole floats | `1.0` | `1` |
| Exponents | `1e-07` (padded, ECMAScript-incompatible) | `1e-7` |
| Key sort | by Unicode **code point** | by UTF-16 **code unit** |

The key-sort difference is not cosmetic. For a document with keys `U+FFFD` and `U+1F600`, code
point order puts `U+FFFD` first (65533 < 128512) while UTF-16 code-unit order puts the emoji first
(its leading surrogate `D83D` = 55357 < 65533). **The two produce different bytes and different
hashes for the same document.**

Why we specify rather than migrate: changing the encoding would change the bytes under every seal
already issued, invalidating dossiers that are, by design, permanent. The format is frozen and
described exactly.

### 2.4 Test vectors

Generated from the shipped implementation. An independent encoder is conformant if it reproduces
every byte string below.

| # | Case | `canonical(v)` | `SHA3-512` (first 32 hex) |
|---|------|-------------------------|-------------------------|
| 1 | empty object | `{}` | `c1802e6b9670927ebfddb7f67b382464` |
| 2 | key ordering | `{"A":3,"_z":4,"a":2,"b":1}` | `9a797ddbffa8633f8278ad1b7d36d23c` |
| 3 | nested sort | `{"a":"x","z":{"a":[3,2,1],"b":1}}` | `ef162fe451affe1710c7a94253233124` |
| 4 | non-ASCII + astral | `{"accent":"\u00e9t\u00e9","cle":"montreal","emoji":"\ud83d\udd10"}` | `faa26435b6ec61fb946a1ff8046fb213` |
| 5 | floats (real EPSS shape) | `{"epss_percentile":0.97,"epss_score":0.00042,"whole":1.0}` | `78ae41b07801348144bb8bb6f6f53add` |
| 6 | scalars | `{"f":false,"i":0,"n":null,"neg":-1,"t":true}` | `f430e022d56826fad6d8d60c2df14eca` |
| 7 | empty containers | `{"arr":[],"obj":{},"s":""}` | `88b2d24153f64595d67d153b3da539e7` |
| 8 | escaping boundaries | `{"ctrl":"\u0001","del":"\u007f","keep":"~ /  ","quote":"q\"b\\s","short":"a\nb\tc"}` | `69f8bc36bfb21184c13918fc1c04fb95` |

Vector 2 covers C1: `A` (U+0041) < `_` (U+005F) < `a` (U+0061). Vector 4 covers §2.2 rule 3
including the surrogate pair. Vector 5 covers §2.1 including the `1.0` case that JCS gets wrong.
Vector 8 covers every §2.2 boundary at once: DEL escaped, short escapes preferred, `~` and `/`
and space kept verbatim, a sub-`0x20` control escaped long-form.

Full digests for the two vectors most likely to catch an encoder bug:

```
4: faa26435b6ec61fb946a1ff8046fb2133e3a7b3d6e946afcd4493e88b020a14e
   e11e398513747bfa475abcb094771101268768a74df23bff5b4c8c3b8eb4e1e3
5: 78ae41b07801348144bb8bb6f6f53add318df51946c28bd888c20a9c8348eecb
   8aa3bb23ac9eabb6121b8c530aa0be705bc7970ec07af035529a471e951c1fe0
```

---

## 3. Hash construction

```
H(v) = SHA3-512( canonical(v) )          -- lowercase hex, 128 characters
```

`GENESIS_PREV` is 128 `0` characters — the `prev_hash` of the first entry and the
`prev_anchor_hash` of the first anchor.

---

## 4. Entry seal

A chain entry commits to seven identity fields — and **only** those seven. `content` itself is not
in the preimage; it enters through `content_hash`.

```
content_hash = H(content)

preimage = {
  "seq":          <int>,     -- 0-based position, strictly increasing by 1
  "id":           <string>,
  "source":       <string>,
  "target":       <string>,
  "collected_at": <string>,  -- "YYYY-MM-DDTHH:MM:SS.ffffffZ", self-declared (see §9)
  "content_hash": <string>,
  "prev_hash":    <string>   -- predecessor's entry_hash, or GENESIS_PREV at seq 0
}

entry_hash = H(preimage)
```

**The signed message is the 128 hex characters of `entry_hash`, ASCII-encoded** — not the raw
32-byte digest, not the preimage:

```
message   = ascii(entry_hash)            -- 128 bytes
sig_ed25519 = hex( Ed25519.sign(message) )
sig_mldsa65 = hex( ML-DSA-65.sign(message) )
```

Both signatures are lowercase hex. Both must verify (§7).

**Signature parameters** — needed to pick the right API in any library, and none of it is
inferable from the algorithm name alone:

| | Ed25519 | ML-DSA-65 |
|---|---|---|
| Standard | RFC 8032 | FIPS 204 |
| Mode | pure (no pre-hash; **not** Ed25519ph) | **pure ML-DSA** — not HashML-DSA / pre-hash |
| Context string | n/a | **empty** |
| Public key | 32 bytes | 1952 bytes |
| Signature | 64 bytes | 3309 bytes |
| SPKI OID | `1.3.101.112` | `2.16.840.1.101.3.4.3.18` |

Public keys travel as raw hex, so a library that wants DER must wrap them itself. The two SPKI
prefixes, for a raw key appended directly after:

```
Ed25519    302a300506032b6570032100                       (12 bytes)
ML-DSA-65  308207b2300b0609608648016503040312038207a100   (22 bytes)
```

The mode and context rows are not decoration: a verifier that calls its library's *pre-hash*
variant, or passes a non-empty context, rejects a perfectly valid signature — and it fails the
same way a forgery does, so the operator sees `FAILED` and concludes the dossier was tampered
with. **Interoperability confirmed by execution**, not assumed: signatures produced by
`liboqs` 0.15.0 verify under OpenSSL 3.6 with these parameters (`verifier-ts/`).

---

## 5. Anchor record

An anchor commits a chain head to an independently sequenced, hash-linked ledger.

```
witnesses_hash = H(witnesses)            -- the witness array as-is; [] when absent

preimage = {
  "seq":              <int>,
  "digest":           <string>,   -- the chain head (an entry_hash) being anchored
  "anchored_at":      <string>,   -- self-declared (see §9)
  "prev_anchor_hash": <string>,   -- or GENESIS_PREV at seq 0
  "witnesses_hash":   <string>
}

anchor_hash = H(preimage)
message     = ascii(anchor_hash)
```

Signed identically to §4. Note the asymmetry with entries: `witnesses` is committed via
`witnesses_hash`, so witnesses cannot be swapped, but the anchor preimage does not contain them
directly.

### 5.1 Witness direction — `bound`

A witness object carries `type`, `status`, `ref`, `detail`, and **`bound`**. The array is hashed
**as-is**, so this field needs no change to §2 and older dossiers stay valid; but a verifier that
reads witnesses at all MUST read `bound`, because two witnesses of identical shape support
**opposite** inferences.

| `bound` | Meaning | Example | Confirmed by |
|---|---|---|---|
| `"before"` | The digest existed **before** that instant — an **upper** bound | RFC 3161 token, ledger event | offline, via the token's own CMS signature |
| `"after"` | The anchor was sealed **after** that instant, because the value could not be known earlier — a **lower** bound | drand pulse, Bitcoin tip | **re-querying the public source** (round / height), not offline |
| `""` (absent) | Direction not declared — sealed before this field existed | any pre-1.0 witness | nothing; counts toward neither side |

**Three states, never two.** A verifier MUST NOT treat an absent `bound` as either direction, and
MUST NOT infer direction from `type`: an unknown type is a reason to abstain, not to guess. Reading
a lower bound as an upper one yields the exact reverse of the truth.

**A verifier MUST distinguish "no witnesses" from "witnesses that came back unavailable."** A
witness with `status != "ok"` is a recorded fact — the sealer asked and got nothing — and reporting
silence in that case erases the distinction `status` exists to preserve.

---

## 6. Dossier envelope

```json
{
  "sceal_dossier_version": "1.2",
  "signature_scheme": {
    "classical": "Ed25519",
    "post_quantum": "ML-DSA-65",
    "hash": "SHA3-512",
    "mode": "dual (both must verify)"
  },
  "toolchain": {
    "liboqs": "0.15.0",
    "liboqs_python": "0.15.0",
    "canonical_form": "sceal-canonical-json/1.0",
    "spec": "SPEC_CANON.md"
  },
  "public_keys": { "ed25519": "<hex>", "mldsa65": "<hex>" },
  "entry_count": 3,
  "entries":  [ ... ],
  "anchor_count": 1,
  "anchors":  [ ... ]
}
```

`toolchain` records what actually sealed the dossier. The commercial promise is that a seal issued
today remains checkable in seven years; a reader in 2033 asking *"with exactly what was this
2026 dossier sealed?"* must find the answer **inside** the dossier, not in a repository that may
no longer exist. `canonical_form` names the encoding of §2 so a future divergence is detectable
rather than silent.

**Version 1.1 compatibility.** Dossiers written before `toolchain` existed are valid and verify
unchanged — the field is additive and outside every preimage, so adding it altered no seal.
Absence of `toolchain` means *unrecorded*, never *unsealed*.

---

## 7. Verification algorithm

Input: a dossier. No network, no secrets, no Sceal code.

```
1. Read public_keys.ed25519 and public_keys.mldsa65.
   Read signature_scheme.post_quantum as the ML-DSA parameter set.

2. expected_prev := GENESIS_PREV
   For each entry, in array order, at index i:

   a. entry.seq == i                                  else FAIL "out-of-order"
   b. H(entry.content) == entry.content_hash          else FAIL "content tampered"
   c. entry.prev_hash == expected_prev                else FAIL "broken link"
   d. H(preimage(entry)) == entry.entry_hash          else FAIL "entry_hash mismatch"
   e. Ed25519.verify(ascii(entry.entry_hash), entry.sig_ed25519)  must pass
      ML-DSA.verify(ascii(entry.entry_hash), entry.sig_mldsa65)   must pass
                                                      else FAIL "signature invalid"
   f. expected_prev := entry.entry_hash

3. Anchors: same walk, using §5, with prev_anchor_hash / anchor_hash,
   and additionally H(anchor.witnesses) == anchor.witnesses_hash.

4. The dossier is valid only if the failure list is empty.
```

**Both signatures must pass.** A single valid signature is a failure, not a partial success: the
dual scheme exists so that an adversary must break Ed25519 *and* ML-DSA-65, and accepting either
alone silently discards the post-quantum guarantee.

Expected parameter sizes for ML-DSA-65 (FIPS 204), useful as a sanity check on a decoder:
public key **1952 bytes**, signature **3309 bytes**.

---

## 8. Conformance

An implementation is conformant if it:

1. reproduces every byte string in §2.4;
2. accepts a dossier this implementation produced;
3. rejects each of: mutated `content`, mutated `entry_hash`, a flipped signature byte, reordered
   entries, and a broken `prev_hash` link.

Two independent implementations ship with this specification, both exercised in **both**
directions — accepting valid dossiers and refusing every tampering:

| | Language | Shares code with the sealer | Notes |
|---|---|---|---|
| `tests/test_canon_conformance.py` | Python | no `sceal` import | hand-rolled encoder, 63 checks |
| `verifier-ts/verify.ts` | TypeScript | none at all — different runtime | zero dependencies, 57 checks |

The TypeScript verifier is the stronger evidence: it shares no language, no runtime and no
cryptographic library with the sealer, so agreement is not explicable by a common implementation
bug. A **differential over 400 generated documents** — floats, astral characters, control
characters, large integers, adversarial key orderings — produced byte-identical canonical forms
under both. Each of the four §2.3 divergences was then injected into the TypeScript encoder to
confirm the differential actually fails when it should: 261, 56, 243 and 239 disagreements
respectively, out of 400.

**Anyone can run it:** `node verifier-ts/verify.ts dossier.json`. Node 24+ (OpenSSL 3.5+) supplies
SHA3-512, Ed25519 and ML-DSA-65 natively, so there is nothing to install and no package to trust.

---

## 9. What this specification does not establish

Stated plainly, because a specification this precise invites over-reading.

- **It does not establish that the recorded content is true.** The seal proves the dossier has not
  changed since sealing. It says nothing about whether the collector observed reality correctly.
- **It does not establish absolute time by itself.** `collected_at` and `anchored_at` are
  self-declared by the sealing host. Witnesses bound them from two sides (§5.1), and the two sides
  are not equally strong. An RFC 3161 timestamp (`sceal/tsa.py`) gives an **upper** bound and
  relocates trust to the timestamp authority rather than removing it — and an upper bound alone
  **does not prevent backdating**, which is the failure that matters when the sealer is the party
  with something to gain. A beacon (`sceal/beacon.py`) gives a **lower** bound that no single party
  writes, but it is confirmed by re-querying a public source, **not offline**. A dossier carrying
  only one direction, or none, is bounded only on that side; a conformant verifier must say which
  it holds rather than reporting that witnesses exist.
- **It does not establish key ownership.** A dossier carries its own public keys, so verification
  proves internal consistency and that one holder of those keys signed every entry. Binding those
  keys to a named party is an out-of-band problem this format does not solve. §10 does not solve it
  either — it **reduces** it from N operational keys to one root key, learned once, and makes any
  substitution detectable. §10.7 then makes that one value **checkable against a public name**,
  which is what turns a silent substitution into a visible one; it still does not establish
  ownership by a legal entity, and it is not offline-verifiable. A verifier given no key log MUST
  say so rather than stay silent: silence next to a green result reads as "the key was checked".
- **It does not make Sceal's hash and signature implementations correct.** It makes them
  *checkable*: the primitives are NIST standards, and an independent implementation can now
  disagree with ours and be right.

---

## 10. Key transparency log (companion artifact)

A **separate file** from the dossier, addressing the key-ownership gap named in §9. It is optional:
a dossier is complete without one, and a verifier given none must report the key as **not checked**.

### 10.1 What it answers

For an operational key and an instant: *was this key authorized by this root, and was it still
authorized then?* Two consequences follow, and the second is the one that survives an adversarial
reading:

- **Forgery is detectable.** A dossier signed by a key the log never authorized fails against the
  log however flawless it is internally — which is exactly what a forged dossier looks like.
- **Repudiation is impossible.** The log is append-only and hash-chained, so its own operator can
  neither invent a key they never held nor disown one they used. A record that only constrains
  outsiders is a marketing artifact; this one constrains the party publishing it.

### 10.2 Structure

```json
{ "sceal_keylog_version": "1.0",
  "root":    { "ed25519_pub_hex": "...", "mldsa_pub_hex": "...", "mldsa_alg": "ML-DSA-65" },
  "entries": [ /* KeyLogEntry, seq 0..n */ ] }
```

```
key_id   = H({ "ed25519_pub_hex", "mldsa_pub_hex", "mldsa_alg" })   -- BOTH halves
preimage = { "seq", "action", "key_id", "ed25519_pub_hex", "mldsa_pub_hex",
             "mldsa_alg", "effective_at", "reason", "prev_hash", "witnesses_hash" }
entry_hash = H(preimage);   message = ascii(entry_hash)
```

`action` is `"register"`, `"retire"` or `"attest"` (§10.7). `witnesses` follow §5.1 unchanged, so a
registration can itself be bounded in time.

An optional **`role`** — a human label the key is enrolled under (e.g. `officer`, `break-glass`) —
is included in the preimage **only when non-empty**, exactly as `method`/`locator` are for
attestations (§10.7). A role-less entry therefore hashes as it did before this field existed, so no
previously written entry hash moves. A role is signed content: editing **or** stripping it breaks the
entry. But it is a **declared** label, proven by nothing beyond the signed declaration — the `key_id`
is the cryptographic anchor, the role the convenience, and a conformant verifier MUST NOT treat the
label as certified by the signature. The publishable **roster** (one row per key: `key_id`, `role`,
enrolment date, revocation date) is a view **derived** from the entries, not a new signed structure;
it carries exactly what a signed entry already establishes.

`key_id` MUST cover both halves. Hashing only the Ed25519 key would let two entries differing solely
in their post-quantum key collide — the one substitution a dual-signature scheme exists to prevent.

### 10.3 Signatures — two, for two different reasons

| Signature | Present on | Asserts |
|---|---|---|
| `sig_root_*` | every entry | **authorization**: this root vouches for this entry |
| `sig_subject_*` | `register` only | **possession**: the registrant controls that private key |

Without proof of possession, anyone could enter someone else's public key into their own log and
manufacture confusion about who signed what.

**Retirement is root-signed alone, and this is deliberate.** A key is retired exactly when it is lost
or compromised — precisely when its own signature is unavailable or untrustworthy. Requiring it
would disable the log in the only situation it exists for.

### 10.4 Query result — four states, never fewer

| State | Meaning |
|---|---|
| `authorized` | registered, and not retired at or before the instant |
| `retired` | registered, then withdrawn on or before the instant |
| `not-yet` | registered, but only **after** the instant |
| `unknown` | this log never mentions the key |

`not-yet` MUST NOT be folded into `unknown`. A key registered after the dossier it supposedly sealed
is not a missing record — it is the signature of a log written to fit an artifact after the fact, and
merging the two hides the more incriminating one.

### 10.5 The activity answer inherits its clock

A key-activity check is only as good as the instant it compares against, and that instant comes from
`anchored_at` — self-declared (§9). A forger who backdates the anchor also backdates the window in
which their key appears authorized. **A verifier MUST therefore report which time basis it used**:
`bounded` (both directions per §5.1), `one-sided`, `self-declared`, or `none`. Reporting
`authorized` without that qualifier states a conclusion stronger than the evidence supports.

### 10.7 Root anchoring — where the root itself is published

An **attestation** entry (`action: "attest"`) records where this log's root fingerprint is
published: a `method` and a `locator`. The fingerprint is `key_id(root)` — SHA3-512 over both
public halves — and the published record is exactly:

```
sceal-root=v1 <fingerprint>
```

Identical for every method, so one parser serves all of them and a human can eyeball any of them.
A record with a different version prefix is **not** this format and MUST NOT be read as if it were.

An attestation is an ordinary log entry: root-signed, hash-chained, append-only. Its `method` and
`locator` are inside the signing preimage, so an edited locator breaks that entry's hash and a
removed attestation breaks the chain. **They are absent from the preimage of every other action**,
which keeps every previously written entry hash unmoved — and a `register` or `retire` entry that
carries them MUST be rejected, because there they are unsigned.

**An attestation is a CLAIM, never a confirmation.** A conformant verifier MUST NOT read any stored
field as evidence that a source agrees: a forger writes their own log, so they would write their own
confirmations. Confirming means re-querying the locator, which makes root anchoring **not
offline-verifiable** — the same weakness as a beacon (§5.1), and unlike an RFC 3161 token.

A verifier MUST report which of six states the root binding is in, because collapsing any two hides
something a reader needs:

| Basis | Meaning |
|---|---|
| `attested` | ≥2 **independent authorities** confirm — substitution requires compromising all of them |
| `single-source` | confirmed, but one authority holds every locator |
| `declared` | attestations recorded, **not re-queried** (any offline check) |
| `unconfirmed` | re-queried, nothing publishes this root |
| `contradicted` | a source publishes a **different** root — substitution, or split-horizon DNS |
| `none` | the log names no public location at all |

`declared` and `unconfirmed` MUST NOT be merged: the difference is whether anyone asked. A
contradiction MUST outrank any number of confirmations — averaging it away hides the one signal
this mechanism exists to surface.

Independence is **approximated** by registrable domain, and the approximation is wrong in **both**
directions. Under a multi-label public suffix it *undercounts* (`a.co.uk` and `b.co.uk` collapse into
one), which is the safe half. It also *overcounts*, which is not: two distinct names served by one
DNS operator, or held at one registrar, or under a single account at either, are **one failure
domain** reported as two. `attested` therefore asserts **distinct names**, never distinct failure
domains, and a conformant verifier MUST NOT present the two as equivalent.

~~The approximation deliberately errs toward *undercounting*: it may report `single-source` for
something genuinely independent, never `attested` for something that is not.~~ **Corrected the same
day it was written (2026-08-01):** that sentence generalised from the public-suffix case and was
false — the shared-operator overcount is real and is the direction that flatters.

### 10.6 What §10 still does not establish

- ~~**That the root key belongs to any named party.** Anyone can publish a log; two logs claiming
  the same name are indistinguishable until someone performs the out-of-band step.~~
  **Superseded by §10.7 (2026-08-01), and narrowed rather than removed.** An attested log names a
  public place where its root is published, so two logs claiming the same name are no longer
  indistinguishable — the substitution becomes visible. What remains is that DNS and HTTPS
  demonstrate control of a **name**, which is not ownership by a **legal entity**. The out-of-band
  step still exists; it now happens **once**, on **one** value, against a name anyone can look up.
- **That the binding held in the past.** A confirmation is present tense: it says the name points
  here *now*, never what it pointed to when a dossier was sealed. Detecting a swap over time needs
  repeated observation, which §10 does not specify.
- **When control of a key was actually lost.** The log records when retirement was *declared*.
