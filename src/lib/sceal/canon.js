/**
 * Sceal canonical encoding + dossier verification, for the browser.
 *
 * PROVENANCE -- read this before quoting what the web verifier establishes.
 *
 * This file is a PORT of verifier-ts/verify.ts, which was itself written from
 * SPEC_CANON.md without reference to the Python that produces dossiers. So:
 *
 *   - it shares NO code with the sealing implementation, which is what makes a
 *     verdict here independent of the thing being verified;
 *   - it is NOT a third independent reading of section 2. A misreading shared
 *     with verifier-ts would be invisible to both, and the differential test in
 *     test-canon.js exists to keep that honest rather than to disprove it;
 *   - the CRYPTO underneath is independent of both: pure JavaScript SHA3/
 *     ML-DSA/Ed25519, cross-validated against OpenSSL and liboqs.
 *
 * Saying "independently verified" without that third clause would be the
 * borrowed-rigour mistake: the primitives are genuinely independent, the
 * canonical encoder is genuinely a port, and the two must not be blurred.
 */

import { sha3_512 } from "./keccak.js";
import { verify as mldsaVerify, PUBKEY_BYTES as MLDSA_PK, SIG_BYTES as MLDSA_SIG } from "./mldsa65.js";
import { verify as edVerify } from "./ed25519.js";

const GENESIS_PREV = "0".repeat(128);
const ED25519_PUBKEY_BYTES = 32;
const ED25519_SIG_BYTES = 64;

// ---------------------------------------------------------------------------
// SPEC section 2.1 -- numbers.
//
// The spec distinguishes 1 from 1.0 and pins Python-shaped exponents (1e-07).
// JavaScript has one numeric type, so re-encoding a parsed number would emit
// the wrong bytes; the spec anticipates this and directs a verifier to preserve
// the source lexeme. Hence a hand-written reader instead of JSON.parse.
// ---------------------------------------------------------------------------

export class RawNumber {
  constructor(lexeme) { this.lexeme = lexeme; }
}

export class JsonReader {
  constructor(src) { this.src = src; this.i = 0; }

  static parse(text) {
    const r = new JsonReader(text);
    r.ws();
    const v = r.value();
    r.ws();
    if (r.i !== r.src.length) throw new Error(`trailing content at offset ${r.i}`);
    return v;
  }

  ws() { while (this.i < this.src.length && " \t\n\r".includes(this.src[this.i])) this.i++; }

  lit(word) {
    if (this.src.startsWith(word, this.i)) this.i += word.length;
    else throw new Error(`expected ${word} at offset ${this.i}`);
  }

  value() {
    const c = this.src[this.i];
    if (c === undefined) throw new Error("unexpected end of input");
    if (c === "{") return this.object();
    if (c === "[") return this.array();
    if (c === '"') return this.string();
    if (c === "t") { this.lit("true"); return true; }
    if (c === "f") { this.lit("false"); return false; }
    if (c === "n") { this.lit("null"); return null; }
    // section 2.1: NaN and Infinity are not RFC 8259 JSON. Refused, not parsed.
    if (c === "N" || c === "I" || (c === "-" && this.src[this.i + 1] === "I")) {
      throw new Error(`NaN/Infinity are not valid JSON (offset ${this.i})`);
    }
    return this.number();
  }

  object() {
    this.i++;
    const out = new Map();
    this.ws();
    if (this.src[this.i] === "}") { this.i++; return out; }
    for (;;) {
      this.ws();
      if (this.src[this.i] !== '"') throw new Error(`expected key at offset ${this.i}`);
      const k = this.string();
      this.ws();
      if (this.src[this.i] !== ":") throw new Error(`expected ':' at offset ${this.i}`);
      this.i++;
      this.ws();
      out.set(k, this.value()); // duplicate keys: last wins, as in the producer
      this.ws();
      const c = this.src[this.i];
      if (c === ",") { this.i++; continue; }
      if (c === "}") { this.i++; return out; }
      throw new Error(`expected ',' or '}' at offset ${this.i}`);
    }
  }

  array() {
    this.i++;
    const out = [];
    this.ws();
    if (this.src[this.i] === "]") { this.i++; return out; }
    for (;;) {
      this.ws();
      out.push(this.value());
      this.ws();
      const c = this.src[this.i];
      if (c === ",") { this.i++; continue; }
      if (c === "]") { this.i++; return out; }
      throw new Error(`expected ',' or ']' at offset ${this.i}`);
    }
  }

  string() {
    this.i++;
    let out = "";
    for (;;) {
      const c = this.src[this.i];
      if (c === undefined) throw new Error("unterminated string");
      if (c === '"') { this.i++; return out; }
      if (c !== "\\") { out += c; this.i++; continue; }
      const esc = this.src[this.i + 1];
      this.i += 2;
      switch (esc) {
        case '"': out += '"'; break;
        case "\\": out += "\\"; break;
        case "/": out += "/"; break;
        case "b": out += "\b"; break;
        case "f": out += "\f"; break;
        case "n": out += "\n"; break;
        case "r": out += "\r"; break;
        case "t": out += "\t"; break;
        case "u": {
          const hexs = this.src.slice(this.i, this.i + 4);
          if (!/^[0-9a-fA-F]{4}$/.test(hexs)) throw new Error(`bad \\u escape at ${this.i}`);
          out += String.fromCharCode(parseInt(hexs, 16));
          this.i += 4;
          break;
        }
        default: throw new Error(`bad escape \\${esc} at offset ${this.i - 2}`);
      }
    }
  }

  number() {
    const start = this.i;
    if (this.src[this.i] === "-") this.i++;
    while (this.i < this.src.length && this.src[this.i] >= "0" && this.src[this.i] <= "9") this.i++;
    if (this.src[this.i] === ".") {
      this.i++;
      while (this.i < this.src.length && this.src[this.i] >= "0" && this.src[this.i] <= "9") this.i++;
    }
    const e = this.src[this.i];
    if (e === "e" || e === "E") {
      this.i++;
      if (this.src[this.i] === "+" || this.src[this.i] === "-") this.i++;
      while (this.i < this.src.length && this.src[this.i] >= "0" && this.src[this.i] <= "9") this.i++;
    }
    const lexeme = this.src.slice(start, this.i);
    if (lexeme === "" || lexeme === "-") throw new Error(`bad number at offset ${start}`);
    return new RawNumber(lexeme);
  }
}

// ---------------------------------------------------------------------------
// SPEC section 2 -- canonical encoding.
// ---------------------------------------------------------------------------

const SHORT_ESCAPES = new Map([
  ['"', '\\"'], ["\\", "\\\\"], ["\n", "\\n"], ["\r", "\\r"],
  ["\t", "\\t"], ["\b", "\\b"], ["\f", "\\f"],
]);

/** section C3: printable ASCII verbatim (0x20..0x7E), everything else \uXXXX. */
function encodeString(s) {
  let out = '"';
  for (let i = 0; i < s.length; i++) {   // by UTF-16 code UNIT
    const ch = s[i];
    const short = SHORT_ESCAPES.get(ch);
    if (short !== undefined) { out += short; continue; }
    const code = ch.charCodeAt(0);
    out += code >= 0x20 && code <= 0x7e ? ch : "\\u" + code.toString(16).padStart(4, "0");
  }
  return out + '"';
}

/**
 * section C1: sort by ascending Unicode CODE POINT.
 *
 * JavaScript's `<` orders by UTF-16 code unit, which disagrees for astral
 * characters -- a leading surrogate D83D sorts below FFFD as a code unit and
 * above it as a code point. Using `<` would be a bug visible only on emoji keys.
 */
function compareByCodePoint(a, b) {
  const ca = Array.from(a), cb = Array.from(b);
  const n = Math.min(ca.length, cb.length);
  for (let i = 0; i < n; i++) {
    const x = ca[i].codePointAt(0), y = cb[i].codePointAt(0);
    if (x !== y) return x - y;
  }
  return ca.length - cb.length;
}

export function canonicalText(v) {
  if (v === null) return "null";
  if (v === true) return "true";
  if (v === false) return "false";
  if (typeof v === "string") return encodeString(v);
  if (v instanceof RawNumber) return v.lexeme;          // never re-format
  if (Array.isArray(v)) return "[" + v.map(canonicalText).join(",") + "]";
  if (v instanceof Map) {
    const keys = Array.from(v.keys()).sort(compareByCodePoint);
    return "{" + keys.map((k) => encodeString(k) + ":" + canonicalText(v.get(k))).join(",") + "}";
  }
  throw new Error("not JSON-compatible");
}

const utf8 = new TextEncoder();
const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

/** section 3: H(v) = SHA3-512(canonical(v)), lowercase hex. */
export function hashCanonical(v) {
  return toHex(sha3_512(utf8.encode(canonicalText(v))));
}

// ---------------------------------------------------------------------------
// Signatures.
// ---------------------------------------------------------------------------

function hexToBytes(h, what) {
  if (!/^[0-9a-fA-F]*$/.test(h) || h.length % 2 !== 0) throw new Error(`${what}: not hex`);
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.substr(i * 2, 2), 16);
  return out;
}

/** section 4: the signed message is the ASCII of the 128 hex characters. */
function verifyDual(digestHex, sigEdHex, sigPqHex, edPubHex, pqPubHex) {
  const message = utf8.encode(digestHex);
  try {
    const edPub = hexToBytes(edPubHex, "ed25519 public key");
    if (edPub.length !== ED25519_PUBKEY_BYTES) {
      return `ed25519 public key is ${edPub.length} bytes, expected ${ED25519_PUBKEY_BYTES}`;
    }
    const sig = hexToBytes(sigEdHex, "ed25519 signature");
    if (sig.length !== ED25519_SIG_BYTES) {
      return `ed25519 signature is ${sig.length} bytes, expected ${ED25519_SIG_BYTES}`;
    }
    if (!edVerify(edPub, message, sig)) return "ed25519 signature invalid";
  } catch (err) {
    return `ed25519 signature invalid (${err.message})`;
  }
  try {
    const pqPub = hexToBytes(pqPubHex, "ml-dsa public key");
    if (pqPub.length !== MLDSA_PK) return `ml-dsa public key is ${pqPub.length} bytes, expected ${MLDSA_PK}`;
    const sig = hexToBytes(sigPqHex, "ml-dsa signature");
    if (sig.length !== MLDSA_SIG) return `ml-dsa signature is ${sig.length} bytes, expected ${MLDSA_SIG}`;
    if (!mldsaVerify(pqPub, message, sig)) return "ml-dsa signature invalid";
  } catch (err) {
    return `ml-dsa signature invalid (${err.message})`;
  }
  return null;
}

// ---------------------------------------------------------------------------
// SPEC section 7 -- verification algorithm.
// ---------------------------------------------------------------------------

const str = (m, k) => { const v = m.get(k); return typeof v === "string" ? v : ""; };
const intOf = (m, k) => { const v = m.get(k); return v instanceof RawNumber ? Number(v.lexeme) : null; };
const asMap = (v) => (v instanceof Map ? v : null);

export function verifyDossier(dossier, onProgress) {
  const failures = [];
  const pk = asMap(dossier.get("public_keys"));
  if (pk === null) return ["dossier carries no public_keys"];
  const edPub = str(pk, "ed25519");
  const pqPub = str(pk, "mldsa65");
  if (!edPub || !pqPub) return ["dossier is missing one of the two public keys"];

  const entries = dossier.get("entries");
  if (!Array.isArray(entries)) return ["dossier carries no entries array"];

  const anchorsArr = Array.isArray(dossier.get("anchors")) ? dossier.get("anchors") : [];
  const totalUnits = entries.length + anchorsArr.length;
  let done = 0;
  const tick = () => { done++; if (onProgress) onProgress(done, totalUnits); };

  let expectedPrev = GENESIS_PREV;
  entries.forEach((raw, idx) => {
    const e = asMap(raw);
    if (e === null) { failures.push(`entry ${idx}: not an object`); tick(); return; }
    const tag = `seq=${intOf(e, "seq") ?? "?"}`;

    if (intOf(e, "seq") !== idx) failures.push(`${tag}: out-of-order (expected seq=${idx})`);
    if (!e.has("content")) failures.push(`${tag}: no content`);
    else if (hashCanonical(e.get("content")) !== str(e, "content_hash")) {
      failures.push(`${tag}: content tampered (content_hash mismatch)`);
    }
    if (str(e, "prev_hash") !== expectedPrev) failures.push(`${tag}: broken link (prev_hash mismatch)`);

    // section 4: exactly these seven fields, in this order, in the preimage.
    const preimage = new Map([
      ["seq", e.get("seq") ?? null],
      ["id", e.get("id") ?? null],
      ["source", e.get("source") ?? null],
      ["target", e.get("target") ?? null],
      ["collected_at", e.get("collected_at") ?? null],
      ["content_hash", e.get("content_hash") ?? null],
      ["prev_hash", e.get("prev_hash") ?? null],
    ]);
    if (hashCanonical(preimage) !== str(e, "entry_hash")) failures.push(`${tag}: entry_hash mismatch`);

    const sigErr = verifyDual(str(e, "entry_hash"), str(e, "sig_ed25519"), str(e, "sig_mldsa65"), edPub, pqPub);
    if (sigErr !== null) failures.push(`${tag}: ${sigErr}`);

    expectedPrev = str(e, "entry_hash");
    tick();
  });

  // section 5: anchors -- same walk, plus witnesses_hash.
  let expectedPrevAnchor = GENESIS_PREV;
  anchorsArr.forEach((raw, idx) => {
    const a = asMap(raw);
    if (a === null) { failures.push(`anchor ${idx}: not an object`); tick(); return; }
    const tag = `anchor seq=${intOf(a, "seq") ?? "?"}`;

    if (intOf(a, "seq") !== idx) failures.push(`${tag}: out-of-order (expected seq=${idx})`);
    const witnesses = a.get("witnesses") ?? [];
    if (hashCanonical(witnesses) !== str(a, "witnesses_hash")) {
      failures.push(`${tag}: witnesses tampered (witnesses_hash mismatch)`);
    }
    if (str(a, "prev_anchor_hash") !== expectedPrevAnchor) failures.push(`${tag}: broken anchor link`);

    const preimage = new Map([
      ["seq", a.get("seq") ?? null],
      ["digest", a.get("digest") ?? null],
      ["anchored_at", a.get("anchored_at") ?? null],
      ["prev_anchor_hash", a.get("prev_anchor_hash") ?? null],
      ["witnesses_hash", a.get("witnesses_hash") ?? null],
    ]);
    if (hashCanonical(preimage) !== str(a, "anchor_hash")) failures.push(`${tag}: anchor_hash mismatch`);

    const sigErr = verifyDual(str(a, "anchor_hash"), str(a, "sig_ed25519"), str(a, "sig_mldsa65"), edPub, pqPub);
    if (sigErr !== null) failures.push(`${tag}: ${sigErr}`);

    expectedPrevAnchor = str(a, "anchor_hash");
    tick();
  });

  return failures;
}

/**
 * SPEC section 5.1 -- WHICH SIDE of the time interval the dossier pins.
 *
 * Three states, never two. An absent `bound` counts toward neither direction,
 * and `type` is never used to guess one: an unknown witness is a reason to
 * abstain. A witness whose status is not "ok" is a recorded fact and must not
 * be reported as silence.
 */
export function temporalBounds(anchors) {
  if (!Array.isArray(anchors)) return { state: "none", before: 0, after: 0, unspecified: 0, down: 0 };
  let before = 0, after = 0, unspecified = 0, down = 0;

  for (const rawAnchor of anchors) {
    const a = asMap(rawAnchor);
    if (a === null) continue;
    const witnesses = a.get("witnesses");
    if (!Array.isArray(witnesses)) continue;
    for (const rawWitness of witnesses) {
      const w = asMap(rawWitness);
      if (w === null) continue;
      if (str(w, "status") !== "ok") { down++; continue; }
      const bound = str(w, "bound");
      if (bound === "before") before++;
      else if (bound === "after") after++;
      else unspecified++;
    }
  }

  let state;
  if (before === 0 && after === 0 && unspecified === 0) state = down > 0 ? "unbounded" : "none";
  else if (before > 0 && after > 0) state = "both";
  else if (before > 0) state = "upper";
  else if (after > 0) state = "lower";
  else state = "direction-unrecorded";

  return { state, before, after, unspecified, down };
}

export function parseDossier(text) {
  const v = JsonReader.parse(text);
  if (!(v instanceof Map)) throw new Error("dossier root is not a JSON object");
  return v;
}

/**
 * Full structured verdict.
 *
 * `status` is one of VERIFIED / FAILED / CANNOT_VERIFY. The third is never
 * folded into either of the others: a file that is not a dossier has not been
 * found sound and has not been found forged, and saying either would be a lie
 * about what was actually established.
 */
export function report(text, onProgress) {
  let dossier;
  try {
    dossier = parseDossier(text);
  } catch (err) {
    return { status: "CANNOT_VERIFY", reason: err.message, failures: [] };
  }

  const entries = dossier.get("entries");
  const anchors = dossier.get("anchors");
  const nEntries = Array.isArray(entries) ? entries.length : 0;
  const nAnchors = Array.isArray(anchors) ? anchors.length : 0;

  let failures;
  try {
    failures = verifyDossier(dossier, onProgress);
  } catch (err) {
    return { status: "CANNOT_VERIFY", reason: `malformed dossier: ${err.message}`, failures: [] };
  }

  const tc = asMap(dossier.get("toolchain"));
  return {
    status: failures.length === 0 ? "VERIFIED" : "FAILED",
    failures,
    nEntries,
    nAnchors,
    time: temporalBounds(anchors),
    toolchain: tc === null ? null : {
      liboqs: str(tc, "liboqs"),
      liboqsPython: str(tc, "liboqs_python"),
      canonicalForm: str(tc, "canonical_form"),
    },
  };
}
