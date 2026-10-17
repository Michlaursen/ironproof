#include <stdint.h>
/* Embedded C translation of ema.py */
int16_t ema_step(int16_t prev, int16_t x, uint16_t alpha_q15) {
    int32_t acc = (int32_t)prev * (32768 - (int32_t)alpha_q15) + (int32_t)x * (int32_t)alpha_q15;
    int32_t y = acc >> 15;
    if (y > 32767) y = 32767;
    if (y < -32768) y = -32768;
    return (int16_t)y;
}
