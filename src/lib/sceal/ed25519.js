/**
 * Ed25519 signature VERIFICATION (RFC 8032) + SHA-512. Pure JavaScript.
 *
 * WebCrypto does have Ed25519 in current browsers, and SHA-512 everywhere --
 * but both are async and their availability differs by browser and version.
 * A verifier whose answer depends on which browser opened it is a verifier
 * whose answer cannot be quoted. This file makes the code path identical in
 * Node and in every browser, at a cost of a few milliseconds per signature.
 *
 * Verification only. No secret ever passes through here, so the constant-time
 * discipline a signing implementation would owe does not apply: every input is
 * already public by construction.
 */

// ---------------------------------------------------------------------------
// SHA-512, with the round constants DERIVED rather than transcribed.
//
// K[i] is the fractional part of the cube root of the i-th prime, H[i] that of
// the square root. Eighty 64-bit constants copied by hand is eighty chances to
// produce a hash that is wrong on some inputs and right on the ones tested.
// ---------------------------------------------------------------------------

const PRIMES = (() => {
  const out = [];
  for (let n = 2; out.length < 80; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
    if (prime) out.push(n);
  }
  return out;
})();

/** Integer n-th root by Newton iteration on BigInt. */
function iroot(x, n) {
  if (x < 2n) return x;
  const nb = BigInt(n);
  let r = 1n << (BigInt(x.toString(2).length) / nb + 1n);
  for (;;) {
    const next = ((nb - 1n) * r + x / r ** (nb - 1n)) / nb;
    if (next >= r) return r;
    r = next;
  }
}

/** Fractional part of the n-th root of p, scaled to 64 bits. */
function fracRoot(p, n) {
  const scaled = iroot(BigInt(p) << BigInt(64 * n), n); // root(p) * 2^64
  return scaled & 0xffffffffffffffffn;
}

const K_HI = new Uint32Array(80);
const K_LO = new Uint32Array(80);
for (let i = 0; i < 80; i++) {
  const v = fracRoot(PRIMES[i], 3);
  K_HI[i] = Number(v >> 32n) >>> 0;
  K_LO[i] = Number(v & 0xffffffffn) >>> 0;
}
const H_INIT = new Uint32Array(16);
for (let i = 0; i < 8; i++) {
  const v = fracRoot(PRIMES[i], 2);
  H_INIT[2 * i] = Number(v >> 32n) >>> 0;
  H_INIT[2 * i + 1] = Number(v & 0xffffffffn) >>> 0;
}

export function sha512(msg) {
  const h = Uint32Array.from(H_INIT);

  // padding: 0x80, zeros, then a 128-bit big-endian bit length
  const bitLenLo = msg.length * 8;
  const padded = new Uint8Array(((msg.length + 17 + 127) >> 7) << 7);
  padded.set(msg, 0);
  padded[msg.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, Math.floor(bitLenLo / 0x100000000) >>> 0);
  dv.setUint32(padded.length - 4, bitLenLo >>> 0);

  const wHi = new Uint32Array(80), wLo = new Uint32Array(80);

  for (let off = 0; off < padded.length; off += 128) {
    for (let i = 0; i < 16; i++) {
      wHi[i] = dv.getUint32(off + i * 8);
      wLo[i] = dv.getUint32(off + i * 8 + 4);
    }
    for (let i = 16; i < 80; i++) {
      // s0 = ror(w[i-15],1) ^ ror(w[i-15],8) ^ shr(w[i-15],7)
      let xh = wHi[i - 15], xl = wLo[i - 15];
      const s0h = (((xh >>> 1) | (xl << 31)) ^ ((xh >>> 8) | (xl << 24)) ^ (xh >>> 7)) >>> 0;
      const s0l = (((xl >>> 1) | (xh << 31)) ^ ((xl >>> 8) | (xh << 24)) ^ ((xl >>> 7) | (xh << 25))) >>> 0;
      // s1 = ror(w[i-2],19) ^ ror(w[i-2],61) ^ shr(w[i-2],6)
      xh = wHi[i - 2]; xl = wLo[i - 2];
      const s1h = (((xh >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (xh << 3)) ^ (xh >>> 6)) >>> 0;
      const s1l = (((xl >>> 19) | (xh << 13)) ^ ((xh >>> 29) | (xl << 3)) ^ ((xl >>> 6) | (xh << 26))) >>> 0;

      let lo = (wLo[i - 16] + s0l) >>> 0; let carry = lo < s0l ? 1 : 0;
      let hi = (wHi[i - 16] + s0h + carry) >>> 0;
      const lo2 = (lo + wLo[i - 7]) >>> 0; carry = lo2 < wLo[i - 7] ? 1 : 0;
      hi = (hi + wHi[i - 7] + carry) >>> 0;
      const lo3 = (lo2 + s1l) >>> 0; carry = lo3 < s1l ? 1 : 0;
      hi = (hi + s1h + carry) >>> 0;
      wHi[i] = hi; wLo[i] = lo3;
    }

    let ah = h[0], al = h[1], bh = h[2], bl = h[3], ch = h[4], cl = h[5], dh = h[6], dl = h[7];
    let eh = h[8], el = h[9], fh = h[10], fl = h[11], gh = h[12], gl = h[13], hh = h[14], hl = h[15];

    for (let i = 0; i < 80; i++) {
      // S1 = ror(e,14) ^ ror(e,18) ^ ror(e,41)
      const S1h = (((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23))) >>> 0;
      const S1l = (((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23))) >>> 0;
      const chh = ((eh & fh) ^ (~eh & gh)) >>> 0;
      const chl = ((el & fl) ^ (~el & gl)) >>> 0;
      // S0 = ror(a,28) ^ ror(a,34) ^ ror(a,39)
      const S0h = (((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25))) >>> 0;
      const S0l = (((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25))) >>> 0;
      const majh = ((ah & bh) ^ (ah & ch) ^ (bh & ch)) >>> 0;
      const majl = ((al & bl) ^ (al & cl) ^ (bl & cl)) >>> 0;

      // T1 = h + S1 + ch + K[i] + W[i]
      let lo = (hl + S1l) >>> 0; let carry = lo < S1l ? 1 : 0;
      let hi = (hh + S1h + carry) >>> 0;
      let t = lo; lo = (lo + chl) >>> 0; carry = lo < chl ? 1 : 0; hi = (hi + chh + carry) >>> 0;
      t = lo; lo = (lo + K_LO[i]) >>> 0; carry = lo < K_LO[i] ? 1 : 0; hi = (hi + K_HI[i] + carry) >>> 0;
      t = lo; lo = (lo + wLo[i]) >>> 0; carry = lo < wLo[i] ? 1 : 0; hi = (hi + wHi[i] + carry) >>> 0;
      const T1h = hi, T1l = lo;
      // T2 = S0 + maj
      let t2l = (S0l + majl) >>> 0; carry = t2l < majl ? 1 : 0;
      const T2h = (S0h + majh + carry) >>> 0, T2l = t2l;

      hh = gh; hl = gl; gh = fh; gl = fl; fh = eh; fl = el;
      let nl = (dl + T1l) >>> 0; carry = nl < T1l ? 1 : 0;
      eh = (dh + T1h + carry) >>> 0; el = nl;
      dh = ch; dl = cl; ch = bh; cl = bl; bh = ah; bl = al;
      nl = (T1l + T2l) >>> 0; carry = nl < T2l ? 1 : 0;
      ah = (T1h + T2h + carry) >>> 0; al = nl;
    }

    const add = (i, hiV, loV) => {
      const lo = (h[i + 1] + loV) >>> 0;
      const carry = lo < loV ? 1 : 0;
      h[i] = (h[i] + hiV + carry) >>> 0;
      h[i + 1] = lo;
    };
    add(0, ah, al); add(2, bh, bl); add(4, ch, cl); add(6, dh, dl);
    add(8, eh, el); add(10, fh, fl); add(12, gh, gl); add(14, hh, hl);
  }

  const out = new Uint8Array(64);
  const odv = new DataView(out.buffer);
  for (let i = 0; i < 16; i++) odv.setUint32(i * 4, h[i]);
  return out;
}

// ---------------------------------------------------------------------------
// Curve25519 / Edwards arithmetic, BigInt.
// ---------------------------------------------------------------------------

const P = (1n << 255n) - 19n;
const L = (1n << 252n) + 27742317777372353535851937790883648493n;
const D = -121665n * modInv(121666n, P) % P + P;
const SQRT_M1 = powMod(2n, (P - 1n) / 4n, P);

function powMod(b, e, m) {
  let r = 1n; b %= m;
  while (e > 0n) { if (e & 1n) r = (r * b) % m; b = (b * b) % m; e >>= 1n; }
  return r;
}
function modInv(a, m) { return powMod(((a % m) + m) % m, m - 2n, m); }

const fe = (x) => { const r = x % P; return r < 0n ? r + P : r; };

// Extended coordinates (X : Y : Z : T), with T = XY/Z.
const BASE_Y = 4n * modInv(5n, P) % P;

function pointAdd(p1, p2) {
  const [X1, Y1, Z1, T1] = p1, [X2, Y2, Z2, T2] = p2;
  const A = fe((Y1 - X1) * (Y2 - X2));
  const B = fe((Y1 + X1) * (Y2 + X2));
  const C = fe(T1 * 2n * D * T2);
  const Dd = fe(Z1 * 2n * Z2);
  const E = fe(B - A), F = fe(Dd - C), G = fe(Dd + C), H = fe(B + A);
  return [fe(E * F), fe(G * H), fe(F * G), fe(E * H)];
}

function scalarMul(point, k) {
  let q = [0n, 1n, 1n, 0n]; // neutral element
  let p = point;
  let s = k;
  while (s > 0n) {
    if (s & 1n) q = pointAdd(q, p);
    p = pointAdd(p, p);
    s >>= 1n;
  }
  return q;
}

function pointEqual(p1, p2) {
  const [X1, Y1, Z1] = p1, [X2, Y2, Z2] = p2;
  return fe(X1 * Z2 - X2 * Z1) === 0n && fe(Y1 * Z2 - Y2 * Z1) === 0n;
}

/** RFC 8032 5.1.3 -- decompress, returning null on any invalid encoding. */
function decodePoint(bytes) {
  if (bytes.length !== 32) return null;
  let y = 0n;
  for (let i = 31; i >= 0; i--) y = (y << 8n) | BigInt(bytes[i]);
  const sign = (y >> 255n) & 1n;
  y &= (1n << 255n) - 1n;
  if (y >= P) return null; // non-canonical y is refused, not reduced

  const y2 = fe(y * y);
  const u = fe(y2 - 1n);
  const v = fe(D * y2 + 1n);
  let x = fe(u * modInv(v, P));
  x = powMod(x, (P + 3n) / 8n, P);
  if (fe(v * x * x) !== u) {
    if (fe(v * x * x) !== fe(-u)) return null;
    x = fe(x * SQRT_M1);
  }
  if (x === 0n && sign === 1n) return null;
  if ((x & 1n) !== sign) x = fe(P - x);
  return [x, y, 1n, fe(x * y)];
}

const BASE = (() => {
  const enc = new Uint8Array(32);
  let y = BASE_Y;
  for (let i = 0; i < 32; i++) { enc[i] = Number(y & 0xffn); y >>= 8n; }
  // the base point has even x, so the sign bit stays clear
  return decodePoint(enc);
})();

/**
 * RFC 8032 5.1.7 -- verify.
 *
 * Uses the cofactored equation [8][s]B == [8]R + [8][k]A, which accepts
 * everything the cofactorless form accepts and additionally tolerates the
 * mixed-order edge cases where implementations historically diverged. Any
 * disagreement with OpenSSL would show up in the cross-check tests.
 */
export function verify(publicKey, message, signature) {
  if (publicKey.length !== 32 || signature.length !== 64) return false;

  const A = decodePoint(publicKey);
  if (A === null) return false;
  const R = decodePoint(signature.subarray(0, 32));
  if (R === null) return false;

  let s = 0n;
  for (let i = 31; i >= 0; i--) s = (s << 8n) | BigInt(signature[32 + i]);
  if (s >= L) return false; // non-canonical scalar: malleable, refused

  const hashInput = new Uint8Array(64 + message.length);
  hashInput.set(signature.subarray(0, 32), 0);
  hashInput.set(publicKey, 32);
  hashInput.set(message, 64);
  const hv = sha512(hashInput);
  let k = 0n;
  for (let i = 63; i >= 0; i--) k = (k << 8n) | BigInt(hv[i]);
  k %= L;

  const lhs = scalarMul(BASE, s);
  const rhs = pointAdd(R, scalarMul(A, k));
  // multiply both sides by the cofactor 8
  const c8 = (pt) => pointAdd(pointAdd(pointAdd(pt, pt), pointAdd(pt, pt)),
                              pointAdd(pointAdd(pt, pt), pointAdd(pt, pt)));
  return pointEqual(c8(lhs), c8(rhs));
}

export const _internals = { P, L, D, BASE, decodePoint, scalarMul, pointAdd, pointEqual };
