"""Second check: the real Python against the compiled C, on 100,000 inputs.

Build the C first:
  macOS : cc -O2 -shared -o libema.dylib ema.c
  Linux : cc -O2 -shared -fPIC -o libema.so ema.c
Then : python3 check.py
Fixed seed, so every run draws the same inputs. Expected : 100000 inputs, 0 difference(s).
"""
import ctypes
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ema import ema_step  # noqa: E402

here = os.path.dirname(os.path.abspath(__file__))
name = "libema.dylib" if sys.platform == "darwin" else "libema.so"
lib = ctypes.CDLL(os.path.join(here, name))
lib.ema_step.restype = ctypes.c_int16
lib.ema_step.argtypes = [ctypes.c_int16, ctypes.c_int16, ctypes.c_uint16]

rng = random.Random(20261017)
edges = (-32768, -1, 0, 1, 32767)
cases = [(p, x, a) for p in edges for x in edges for a in (0, 1, 16384, 32767, 32768)]
while len(cases) < 100_000:
    cases.append((rng.randint(-32768, 32767), rng.randint(-32768, 32767), rng.randint(0, 32768)))

diff = sum(1 for p, x, a in cases if ema_step(p, x, a) != lib.ema_step(p, x, a))
print(f"{len(cases)} inputs, {diff} difference(s)")
