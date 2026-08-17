/**
 * Keccak-f[1600]: SHA3-512, SHAKE128, SHAKE256. Pure JavaScript, no imports.
 *
 * WebCrypto has SHA-256/384/512 but NOT SHA3, and it has no XOF at all. A
 * browser that is going to verify a Sceal dossier therefore has to carry its
 * own Keccak or it cannot compute H() at all, let alone ML-DSA-65 -- which
 * needs SHAKE128 for matrix expansion and SHAKE256 for everything else.
 *
 * Lanes are held as two 32-bit halves rather than BigInt. JavaScript bitwise
 * operators are 32-bit, so BigInt would be the only alternative, and one
 * ML-DSA-65 verification drives on the order of ten thousand permutations --
 * BigInt makes that take seconds instead of milliseconds.
 */

const RC_LO = new Uint32Array([
  0x00000001, 0x00008082, 0x0000808a, 0x80008000, 0x0000808b, 0x80000001,
  0x80008081, 0x00008009, 0x0000008a, 0x00000088, 0x80008009, 0x8000000a,
  0x8000808b, 0x0000008b, 0x00008089, 0x00008003, 0x00008002, 0x00000080,
  0x0000800a, 0x8000000a, 0x80008081, 0x00008080, 0x80000001, 0x80008008,
]);
const RC_HI = new Uint32Array([
  0x00000000, 0x00000000, 0x80000000, 0x80000000, 0x00000000, 0x00000000,
  0x80000000, 0x80000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
  0x00000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000,
  0x00000000, 0x80000000, 0x80000000, 0x80000000, 0x00000000, 0x80000000,
]);

// rho offsets, indexed by lane = x + 5y.
const RHO = new Uint8Array([
  0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39,
  41, 45, 15, 21, 8, 18, 2, 61, 56, 14,
]);

// pi destination for each source lane, precomputed: B[y + 5*((2x+3y)%5)] = A[x+5y].
const PI = (() => {
  const dst = new Uint8Array(25);
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) dst[x + 5 * y] = y + 5 * ((2 * x + 3 * y) % 5);
  }
  return dst;
})();

const B_LO = new Uint32Array(25);
const B_HI = new Uint32Array(25);
const C_LO = new Uint32Array(5);
const C_HI = new Uint32Array(5);

/**
 * In-place Keccak-f[1600] over a Uint32Array(50): lane i is [2i]=low, [2i+1]=high.
 */
export function keccakF1600(s) {
  for (let round = 0; round < 24; round++) {
    // theta
    for (let x = 0; x < 5; x++) {
      let lo = 0, hi = 0;
      for (let y = 0; y < 5; y++) {
        const i = 2 * (x + 5 * y);
        lo ^= s[i]; hi ^= s[i + 1];
      }
      C_LO[x] = lo; C_HI[x] = hi;
    }
    for (let x = 0; x < 5; x++) {
      const n = (x + 1) % 5, p = (x + 4) % 5;
      // D[x] = C[x-1] ^ rot(C[x+1], 1)
      const dLo = C_LO[p] ^ (((C_LO[n] << 1) | (C_HI[n] >>> 31)) >>> 0);
      const dHi = C_HI[p] ^ (((C_HI[n] << 1) | (C_LO[n] >>> 31)) >>> 0);
      for (let y = 0; y < 5; y++) {
        const i = 2 * (x + 5 * y);
        s[i] ^= dLo; s[i + 1] ^= dHi;
      }
    }

    // rho + pi
    for (let lane = 0; lane < 25; lane++) {
      const n = RHO[lane];
      const lo = s[2 * lane], hi = s[2 * lane + 1];
      let rLo, rHi;
      if (n === 0) { rLo = lo; rHi = hi; }
      else if (n === 32) { rLo = hi; rHi = lo; }
      else if (n < 32) {
        rLo = ((lo << n) | (hi >>> (32 - n))) >>> 0;
        rHi = ((hi << n) | (lo >>> (32 - n))) >>> 0;
      } else {
        const m = n - 32;
        rLo = ((hi << m) | (lo >>> (32 - m))) >>> 0;
        rHi = ((lo << m) | (hi >>> (32 - m))) >>> 0;
      }
      const d = PI[lane];
      B_LO[d] = rLo; B_HI[d] = rHi;
    }

    // chi
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const i = x + 5 * y;
        const n1 = ((x + 1) % 5) + 5 * y, n2 = ((x + 2) % 5) + 5 * y;
        s[2 * i] = (B_LO[i] ^ (~B_LO[n1] & B_LO[n2])) >>> 0;
        s[2 * i + 1] = (B_HI[i] ^ (~B_HI[n1] & B_HI[n2])) >>> 0;
      }
    }

    // iota
    s[0] = (s[0] ^ RC_LO[round]) >>> 0;
    s[1] = (s[1] ^ RC_HI[round]) >>> 0;
  }
}

/**
 * Sponge: absorb `input`, pad with `domain`, squeeze `outLen` bytes.
 *
 * `rate` is in bytes (72 for SHA3-512, 168 for SHAKE128, 136 for SHAKE256).
 */
function sponge(rate, domain, input, outLen) {
  const s = new Uint32Array(50);
  const bytes = new Uint8Array(s.buffer); // little-endian lanes, which is what Keccak wants

  let off = 0;
  while (off + rate <= input.length) {
    for (let i = 0; i < rate; i++) bytes[i] ^= input[off + i];
    keccakF1600(s);
    off += rate;
  }

  const tail = input.length - off;
  for (let i = 0; i < tail; i++) bytes[i] ^= input[off + i];
  bytes[tail] ^= domain;
  bytes[rate - 1] ^= 0x80;
  keccakF1600(s);

  const out = new Uint8Array(outLen);
  let produced = 0;
  for (;;) {
    const take = Math.min(rate, outLen - produced);
    out.set(bytes.subarray(0, take), produced);
    produced += take;
    if (produced >= outLen) return out;
    keccakF1600(s);
  }
}

/**
 * Incremental XOF, needed because ML-DSA's rejection sampling reads an unknown
 * number of bytes: it keeps drawing until enough coefficients land in range.
 * Squeezing a fixed guess would either waste work or, worse, run out silently.
 */
export class Xof {
  constructor(rate, domain, input) {
    this.rate = rate;
    this.s = new Uint32Array(50);
    this.bytes = new Uint8Array(this.s.buffer);

    let off = 0;
    while (off + rate <= input.length) {
      for (let i = 0; i < rate; i++) this.bytes[i] ^= input[off + i];
      keccakF1600(this.s);
      off += rate;
    }
    const tail = input.length - off;
    for (let i = 0; i < tail; i++) this.bytes[i] ^= input[off + i];
    this.bytes[tail] ^= domain;
    this.bytes[rate - 1] ^= 0x80;
    keccakF1600(this.s);
    this.pos = 0;
  }

  /** Next `n` bytes of the stream. */
  read(n) {
    const out = new Uint8Array(n);
    let produced = 0;
    while (produced < n) {
      if (this.pos === this.rate) { keccakF1600(this.s); this.pos = 0; }
      const take = Math.min(this.rate - this.pos, n - produced);
      out.set(this.bytes.subarray(this.pos, this.pos + take), produced);
      this.pos += take;
      produced += take;
    }
    return out;
  }
}

export const sha3_512 = (input) => sponge(72, 0x06, input, 64);
export const sha3_256 = (input) => sponge(136, 0x06, input, 32);
export const shake128 = (input, outLen) => sponge(168, 0x1f, input, outLen);
export const shake256 = (input, outLen) => sponge(136, 0x1f, input, outLen);
export const shake128Xof = (input) => new Xof(168, 0x1f, input);
export const shake256Xof = (input) => new Xof(136, 0x1f, input);
