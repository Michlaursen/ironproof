/**
 * ML-DSA-65 signature VERIFICATION (FIPS 204). Pure JavaScript, no imports
 * beyond this directory's Keccak.
 *
 * Why this file exists: no browser can verify a post-quantum signature. Node 24+
 * can (OpenSSL 3.5), and liboqs can, but WebCrypto has no ML-DSA and no roadmap
 * we can point a client at today. A web verifier without this file would check
 * the Ed25519 half, print a green result, and have silently discarded the exact
 * guarantee the dossier exists to carry.
 *
 * Only verification is implemented. Signing needs secret-dependent constant-time
 * discipline that JavaScript cannot honestly provide -- and a verifier has no
 * business holding a private key. Nothing here touches secret material, so the
 * usual timing caveats do not apply: every input is already public.
 *
 * Parameters, FIPS 204 Table 1 (ML-DSA-65):
 *   q=8380417  n=256  d=13  tau=49  lambda=192  gamma1=2^19
 *   gamma2=(q-1)/32  (k,l)=(6,5)  eta=4  beta=tau*eta=196  omega=55
 */

import { shake128Xof, shake256Xof, shake256 } from "./keccak.js";

const Q = 8380417;
const N = 256;
const D = 13;
const TAU = 49;
const GAMMA1 = 1 << 19;
const GAMMA2 = (Q - 1) / 32;          // 261888
const K = 6;
const L = 5;
const BETA = 196;                      // tau * eta
const OMEGA = 55;
const CTILDE_BYTES = 48;               // 2*lambda/8
const M_DECOMPOSE = (Q - 1) / (2 * GAMMA2); // 16

export const PUBKEY_BYTES = 1952;
export const SIG_BYTES = 3309;

const T1_POLY_BYTES = 320;             // 256 coefficients * 10 bits
const Z_POLY_BYTES = 640;              // 256 coefficients * 20 bits

// ---------------------------------------------------------------------------
// Arithmetic mod q.
//
// Coefficients are < 2^23, so a product is < 2^46 -- inside the range where a
// JS number is an exact integer (2^53). Plain `(a*b) % Q` is therefore exact,
// and no Montgomery form is needed.
// ---------------------------------------------------------------------------

const mod = (a) => { const r = a % Q; return r < 0 ? r + Q : r; };

/**
 * zeta = 1753 is the 512th root of unity fixed by FIPS 204. The table is
 * COMPUTED rather than transcribed: a 256-entry hex table copied by hand is a
 * silent-wrong-answer waiting to happen, and this costs microseconds once.
 */
const ZETAS = (() => {
  const brv8 = (x) => {
    let r = 0;
    for (let i = 0; i < 8; i++) r |= ((x >> i) & 1) << (7 - i);
    return r;
  };
  const powmod = (b, e) => {
    let r = 1, x = b % Q;
    while (e > 0) {
      if (e & 1) r = (r * x) % Q;
      x = (x * x) % Q;
      e >>= 1;
    }
    return r;
  };
  const z = new Int32Array(N);
  for (let i = 0; i < N; i++) z[i] = powmod(1753, brv8(i));
  return z;
})();

/** FIPS 204 Algorithm 41 -- NTT, in place, bit-reversed output order. */
function ntt(a) {
  let k = 0;
  for (let len = 128; len >= 1; len >>= 1) {
    for (let start = 0; start < N; start += 2 * len) {
      const zeta = ZETAS[++k];
      for (let j = start; j < start + len; j++) {
        const t = (zeta * a[j + len]) % Q;
        a[j + len] = mod(a[j] - t);
        a[j] = mod(a[j] + t);
      }
    }
  }
}

/** FIPS 204 Algorithm 42 -- inverse NTT, in place. */
function intt(a) {
  let k = N;
  for (let len = 1; len < N; len <<= 1) {
    for (let start = 0; start < N; start += 2 * len) {
      const zeta = Q - ZETAS[--k];
      for (let j = start; j < start + len; j++) {
        const t = a[j];
        a[j] = mod(t + a[j + len]);
        a[j + len] = mod(t - a[j + len]);
        a[j + len] = (zeta * a[j + len]) % Q;
      }
    }
  }
  const f = 8347681; // 256^-1 mod q, folded with the Montgomery-free convention
  for (let j = 0; j < N; j++) a[j] = (f * a[j]) % Q;
}

// ---------------------------------------------------------------------------
// Bit-level unpacking (FIPS 204 sec. 7.1).
//
// BytesToBits is LSB-first and BitsToInteger reads the first bit as the least
// significant -- so a c-bit field at bit offset o is just the little-endian
// gathering below. Getting this backwards produces plausible-looking garbage
// rather than an error, which is why it lives in one place.
// ---------------------------------------------------------------------------

function readBits(bytes, base, bitOffset, width) {
  let v = 0;
  for (let j = 0; j < width; j++) {
    const bit = bitOffset + j;
    v |= ((bytes[base + (bit >> 3)] >> (bit & 7)) & 1) << j;
  }
  return v >>> 0;
}

/** SimpleBitUnpack: unsigned coefficients of `width` bits. */
function simpleBitUnpack(bytes, base, width) {
  const out = new Int32Array(N);
  for (let i = 0; i < N; i++) out[i] = readBits(bytes, base, i * width, width);
  return out;
}

/** BitUnpack(v, a, b): coefficient = b - raw. Returns SIGNED values. */
function bitUnpackSigned(bytes, base, width, b) {
  const out = new Int32Array(N);
  for (let i = 0; i < N; i++) out[i] = b - readBits(bytes, base, i * width, width);
  return out;
}

// ---------------------------------------------------------------------------
// Sampling.
// ---------------------------------------------------------------------------

/** FIPS 204 Algorithm 30 RejNTTPoly -- matrix entry, already in NTT domain. */
function rejNttPoly(seed) {
  const xof = shake128Xof(seed);
  const a = new Int32Array(N);
  let j = 0;
  while (j < N) {
    const b = xof.read(3);
    // CoeffFromThreeBytes: top bit of the third byte is discarded.
    const z = ((b[2] & 0x7f) << 16) | (b[1] << 8) | b[0];
    if (z < Q) a[j++] = z;
  }
  return a;
}

/** FIPS 204 Algorithm 32 ExpandA. Note the index order: rho || s || r. */
function expandA(rho) {
  const A = [];
  for (let r = 0; r < K; r++) {
    const row = [];
    for (let s = 0; s < L; s++) {
      const seed = new Uint8Array(34);
      seed.set(rho, 0);
      seed[32] = s;
      seed[33] = r;
      row.push(rejNttPoly(seed));
    }
    A.push(row);
  }
  return A;
}

/**
 * FIPS 204 Algorithm 29 SampleInBall -- tau coefficients of +/-1, rest zero.
 *
 * The first 8 squeezed bytes supply the 64 sign bits; subsequent bytes drive a
 * Fisher-Yates style placement with rejection.
 */
function sampleInBall(ctilde) {
  const xof = shake256Xof(ctilde);
  const signs = xof.read(8);
  const c = new Int32Array(N);
  let bit = 0;
  for (let i = N - TAU; i < N; i++) {
    let j;
    do { j = xof.read(1)[0]; } while (j > i);
    c[i] = c[j];
    const s = (signs[bit >> 3] >> (bit & 7)) & 1;
    bit++;
    c[j] = s === 1 ? Q - 1 : 1; // -1 mod q, or +1
  }
  return c;
}

// ---------------------------------------------------------------------------
// Rounding (FIPS 204 sec. 7.4).
// ---------------------------------------------------------------------------

/** FIPS 204 Algorithm 36 Decompose. Input in [0,q), returns [r1, r0centered]. */
function decompose(r) {
  const rp = r % Q;
  let r0 = rp % (2 * GAMMA2);
  if (r0 > GAMMA2) r0 -= 2 * GAMMA2;          // centered representative
  if (rp - r0 === Q - 1) return [0, r0 - 1];
  return [(rp - r0) / (2 * GAMMA2), r0];
}

/** FIPS 204 Algorithm 40 UseHint. */
function useHint(h, r) {
  const [r1, r0] = decompose(r);
  if (h === 1) {
    return r0 > 0 ? (r1 + 1) % M_DECOMPOSE : (r1 - 1 + M_DECOMPOSE) % M_DECOMPOSE;
  }
  return r1;
}

// ---------------------------------------------------------------------------
// Decoding.
// ---------------------------------------------------------------------------

function pkDecode(pk) {
  const rho = pk.slice(0, 32);
  const t1 = [];
  for (let i = 0; i < K; i++) {
    t1.push(simpleBitUnpack(pk, 32 + i * T1_POLY_BYTES, 10));
  }
  return { rho, t1 };
}

/**
 * FIPS 204 Algorithm 21 HintBitUnpack.
 *
 * Returns null -- never a zero hint -- on any malformed encoding. A malformed
 * hint is a REFUSAL, not "no hints set": treating it as empty would accept
 * signatures the standard rejects.
 */
function hintBitUnpack(y, base) {
  const h = [];
  for (let i = 0; i < K; i++) h.push(new Uint8Array(N));
  let index = 0;
  for (let i = 0; i < K; i++) {
    const end = y[base + OMEGA + i];
    if (end < index || end > OMEGA) return null;
    const first = index;
    while (index < end) {
      // positions must be strictly increasing within a polynomial
      if (index > first && y[base + index - 1] >= y[base + index]) return null;
      h[i][y[base + index]] = 1;
      index++;
    }
  }
  // every unused slot must be zero, or the encoding carries hidden data
  for (let i = index; i < OMEGA; i++) if (y[base + i] !== 0) return null;
  return h;
}

function sigDecode(sig) {
  const ctilde = sig.slice(0, CTILDE_BYTES);
  const z = [];
  for (let i = 0; i < L; i++) {
    z.push(bitUnpackSigned(sig, CTILDE_BYTES + i * Z_POLY_BYTES, 20, GAMMA1));
  }
  const h = hintBitUnpack(sig, CTILDE_BYTES + L * Z_POLY_BYTES);
  return { ctilde, z, h };
}

/** w1Encode: SimpleBitPack with b = 15, i.e. 4 bits per coefficient. */
function w1Encode(w1) {
  const out = new Uint8Array(K * ((N * 4) / 8));
  let p = 0;
  for (let i = 0; i < K; i++) {
    for (let j = 0; j < N; j += 2) {
      out[p++] = (w1[i][j] & 0x0f) | ((w1[i][j + 1] & 0x0f) << 4);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Verification.
// ---------------------------------------------------------------------------

const concat = (...parts) => {
  const n = parts.reduce((a, p) => a + p.length, 0);
  const out = new Uint8Array(n);
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
};

/**
 * FIPS 204 Algorithm 3 ML-DSA.Verify_internal.
 *
 * `mPrime` is the already-domain-separated message. Callers wanting the plain
 * ML-DSA.Verify of Algorithm 8 should use `verify()` below, which prepends the
 * context octets.
 */
export function verifyInternal(pk, mPrime, sig) {
  if (pk.length !== PUBKEY_BYTES) return false;
  if (sig.length !== SIG_BYTES) return false;

  const { rho, t1 } = pkDecode(pk);
  const { ctilde, z, h } = sigDecode(sig);
  if (h === null) return false; // malformed hints

  // ||z||_inf < gamma1 - beta, on the centered representatives.
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < N; j++) {
      const v = z[i][j];
      if (v >= GAMMA1 - BETA || v <= -(GAMMA1 - BETA)) return false;
    }
  }

  const A = expandA(rho);
  const tr = shake256(pk, 64);
  const mu = shake256(concat(tr, mPrime), 64);
  const c = sampleInBall(ctilde);

  const cHat = Int32Array.from(c);
  ntt(cHat);

  const zHat = z.map((p) => {
    const q = Int32Array.from(p, mod);
    ntt(q);
    return q;
  });

  const w1 = [];
  for (let r = 0; r < K; r++) {
    // sum_s A[r][s] * NTT(z[s])
    const acc = new Int32Array(N);
    for (let s = 0; s < L; s++) {
      const a = A[r][s], zz = zHat[s];
      for (let j = 0; j < N; j++) acc[j] = (acc[j] + a[j] * zz[j]) % Q;
    }
    // minus NTT(c) * NTT(t1 * 2^d)
    const t1Hat = Int32Array.from(t1[r], (v) => (v * (1 << D)) % Q);
    ntt(t1Hat);
    for (let j = 0; j < N; j++) {
      acc[j] = mod(acc[j] - (cHat[j] * t1Hat[j]) % Q);
    }
    intt(acc);

    const row = new Int32Array(N);
    for (let j = 0; j < N; j++) row[j] = useHint(h[r][j], acc[j]);
    w1.push(row);
  }

  const ctildePrime = shake256(concat(mu, w1Encode(w1)), CTILDE_BYTES);
  let diff = 0;
  for (let i = 0; i < CTILDE_BYTES; i++) diff |= ctilde[i] ^ ctildePrime[i];
  return diff === 0;
}

/**
 * FIPS 204 Algorithm 8 ML-DSA.Verify -- the "pure" mode, with the context
 * prefix 0x00 || len(ctx) || ctx.
 */
export function verify(pk, message, sig, ctx = new Uint8Array(0)) {
  if (ctx.length > 255) return false;
  const mPrime = concat(new Uint8Array([0, ctx.length]), ctx, message);
  return verifyInternal(pk, mPrime, sig);
}

export const _internals = {
  ZETAS, ntt, intt, decompose, useHint, sampleInBall, expandA,
  pkDecode, sigDecode, w1Encode, Q, GAMMA1, GAMMA2, K, L, OMEGA,
};
