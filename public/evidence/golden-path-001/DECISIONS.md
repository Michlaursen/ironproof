# Decisions we made on the customer's behalf

The rule was prose. Every row below changes a verdict, and none of
them is theirs. If one is wrong, it is wrong in our encoding, not in
their policy -- which is why the list ships rather than sitting in a
commit message.

### 'above 5,000,000' -- inclusive or exclusive?

**We decided:** EXCLUSIVE: 5,000,000.00 exactly passes without a second signature

a one-word reading. lab/bank_policy found the same seam in a real policy: 'exceeding 10,000' and '$10,000 or more' differ by one payment

### the window: which rows are in it?

**We decided:** the CALLER declares the population; the gate RECONCILES and refuses when it does not tie out

we do not derive the window and we never will -- it lives in a system we do not read. An unaccounted aggregate REFUSES rather than decides

### '3 changes' -- does a reversal count? a spelling fix?

**We decided:** every row tagged kind=beneficiary_change counts, reversals included

the narrower readings need a field nobody sends us

### 12 months from when -- the request, or settlement?

**We decided:** the window is whatever the caller declares; we do not compute dates

same seam as row 2. The clock is theirs
