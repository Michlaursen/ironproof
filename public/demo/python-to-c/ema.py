def ema_step(prev, x, alpha_q15):
    acc = prev * (32768 - alpha_q15) + x * alpha_q15
    y = acc >> 15          # Python: a shift is a division by 2**15 rounded toward minus infinity
    return max(-32768, min(32767, y))
