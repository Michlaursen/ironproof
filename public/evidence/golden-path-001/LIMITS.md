# What this pack does NOT establish

Read this before quoting anything from it. Each line removes something from the
claim, and they are here because a result whose limits are not stated is worth
less than a smaller result whose limits are.

1. **The manifest proves integrity against accident, not against an adversary.**
   Anyone who can edit a file in this pack can regenerate `MANIFEST.sha3`. What
   it catches is transport damage and a file edited by someone who forgot the
   manifest. The SEAL inside `dossier.json` is the part an adversary cannot
   forge -- check 2 and check 3 in `verify.sh` are the ones that carry weight.

2. **`unsat` is bounded by the domain it was proved over.** The ceiling result
   holds for the flags and ranges declared in the trace inside the dossier, and
   says nothing outside them.

3. **The sequence result is bounded at k.** It settles sequences of exactly that
   many actions. A ceiling that survives k and falls at k+1 is a normal shape,
   not a pathology. Run the k you intend to claim.

4. **The window clause is DECIDED, never proved.** The rolling-window count is
   evaluated against a population the caller declares. We reconcile that
   population -- ids, and the keys the rule filters on -- and REFUSE when it
   does not tie out. We do not derive the window, and we never will: it lives in
   a system we do not read.

5. **A valid approval proves that N authorised KEYS signed those bytes.** It does
   not prove a human read them, and `approver_id` is a declared label the
   signature does not certify.

6. **The gate stops a caller, not hostile code in the same process.** Code
   already running there could call the tool directly -- but it could equally
   open a socket, so the gate was never the constraint in that scenario. This is
   not sandbox-grade isolation and must not be sold as such.

7. **The encoding is our reading of the rule.** Two readers encode one sentence
   two ways, and no solver decides between them. The decisions we made on the
   customer's behalf are listed in the control's own output; that list is part
   of the deliverable, not a footnote.

8. **The seal proves the document has not moved since it was sealed.** It does
   not prove the document was true when it was written.

9. **Rebuilding this pack does NOT reproduce it byte for byte, and that is by
   design.** Each build stamps `collected_at` and mints FRESH approver keys, so
   `dossier.json`, `README.md` and therefore `MANIFEST.sha3` differ between two
   builds of the SAME commit -- 48 fields move, in cascade, from those two
   sources. Measured on 2026-09-20 by building the same commit twice.

   So: verify the pack you were given **against itself** (`./verify.sh`, which
   recomputes every digest from the bytes next to it). Do NOT compare your
   manifest to ours and read a difference as tampering -- it is not evidence of
   anything. What a rebuild reproduces is the VERDICT and the reasoning, never
   the bytes. A reviewer who compares the wrong thing gets a red that accuses
   us of forgery, and a seal would only lend that accusation authority.
