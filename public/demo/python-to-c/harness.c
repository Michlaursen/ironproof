#include <stdint.h>
#include <assert.h>
int16_t ema_step(int16_t prev, int16_t x, uint16_t alpha_q15);
int16_t nondet_i16(void); uint16_t nondet_u16(void);
/* Reference: the Python semantics, transcribed (unbounded integers simulated in int64, explicit floor division) */
static int64_t floordiv(int64_t a, int64_t b) { int64_t q = a / b; if ((a % b != 0) && ((a < 0) != (b < 0))) q -= 1; return q; }
static int64_t ref(int64_t prev, int64_t x, int64_t alpha) {
    int64_t acc = prev * (32768 - alpha) + x * alpha;
    int64_t y = floordiv(acc, 32768);
    if (y > 32767) y = 32767;
    if (y < -32768) y = -32768;
    return y;
}
int main(void) {
    int16_t prev = nondet_i16(), x = nondet_i16(); uint16_t a = nondet_u16();
    __CPROVER_assume(a <= 32768);
    assert((int64_t)ema_step(prev, x, a) == ref(prev, x, a));
    return 0;
}
