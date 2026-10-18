"use client";

import { useState } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * THE LIVING SEAL (Dom, 2026-10-18: "go"). The seal line under the hero used to
 * announce a seal it never checked ("the page does not verify anything at that
 * moment"). Now a click runs the SAME vendored verifier as /verify
 * (src/lib/sceal/canon.js: Ed25519 + ML-DSA-65 + the SHA3-512 chain) on the
 * SAME published dossier whose fingerprint is shown, in the visitor's browser.
 *
 * Nothing is simulated. "Verified" only appears when report() returned
 * VERIFIED; the tamper button changes one real byte (the second-signature
 * threshold of the policy, 5,000,000 -> 5,000,001) and shows the verifier's own failure strings,
 * untranslated, for the same reason as on /verify: they are the evidence.
 * The three checks appear one after another for reading; the verifier itself
 * requires all three on every entry, so the stagger is display, not sequence.
 */

const DOSSIER = "/evidence/golden-path-001/dossier.json";
const CAP = "5000000";
const CAP_TAMPERED = "5000001";

type Result = { status: "VERIFIED" | "FAILED" | "CANNOT_VERIFY"; failures: string[]; nEntries?: number; reason?: string };
type Run = { kind: "intact" | "tampered"; result: Result; ms: number };

const T: L<{
  label: string;
  state: string;
  broken: string;
  verify: string;
  busy: string;
  checks: [string, string, string];
  ok: (n: number, ms: number) => string;
  tamper: string;
  tamperedNote: string;
  failed: string;
  restore: string;
  cannot: string;
  full: string;
}> = {
  en: {
    label: "DECISION 1 · SHA3-512 FINGERPRINT",
    state: "SEALED",
    broken: "SEAL BROKEN",
    verify: "VERIFY IT HERE",
    busy: "VERIFYING IN YOUR BROWSER…",
    checks: ["Ed25519 signature", "ML-DSA-65 signature", "SHA3-512 chain"],
    ok: (n, ms) => `VERIFIED · ${n} entries · in your browser, no server · ${ms} ms`,
    tamper: "NOW CHANGE ONE BYTE",
    tamperedNote: "Second-signature threshold raised by CAD 1: 5,000,000 → 5,000,001",
    failed: "REFUSED BY THE VERIFIER",
    restore: "RESTORE THE ORIGINAL",
    cannot: "The verifier could not run here. The full page does the same check:",
    full: "FULL VERIFIER",
  },
  fr: {
    label: "DÉCISION 1 · EMPREINTE SHA3-512",
    state: "SCELLÉE",
    broken: "SCEAU ROMPU",
    verify: "VÉRIFIEZ-LA ICI",
    busy: "VÉRIFICATION DANS VOTRE NAVIGATEUR…",
    checks: ["Signature Ed25519", "Signature ML-DSA-65", "Chaîne SHA3-512"],
    ok: (n, ms) => `VÉRIFIÉE · ${n} entrées · dans votre navigateur, sans serveur · ${ms} ms`,
    tamper: "CHANGEZ MAINTENANT UN OCTET",
    tamperedNote: "Seuil de double signature relevé de 1\u00a0$\u00a0CA\u202f: 5\u202f000\u202f000 → 5\u202f000\u202f001",
    failed: "REFUSÉE PAR LE VÉRIFICATEUR",
    restore: "RÉTABLIR L’ORIGINAL",
    cannot: "Le vérificateur n’a pas pu tourner ici. La page complète fait le même contrôle\u202f:",
    full: "VÉRIFICATEUR COMPLET",
  },
};

export function SealLive({ hash, locale = defaultLocale, verifyHref }: { hash: string; locale?: Locale; verifyHref: string }) {
  const t = pick(T, locale);
  const [busy, setBusy] = useState(false);
  const [run, setRun] = useState<Run | null>(null);

  async function check(kind: Run["kind"]) {
    if (busy) return;
    setBusy(true);
    setRun(null);
    const t0 = performance.now();
    try {
      const res = await fetch(DOSSIER);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      // One occurrence in the published dossier (checked 2026-10-18); if the
      // dossier changes and the cap is gone, say so instead of faking a tamper.
      if (kind === "tampered" && !text.includes(CAP)) throw new Error("cap not found in dossier");
      const input = kind === "tampered" ? text.replace(CAP, CAP_TAMPERED) : text;
      const mod = (await import("@/lib/sceal/canon.js")) as { report: (text: string) => Result };
      // let the busy state paint before the CPU-bound ML-DSA check
      await new Promise((r) => setTimeout(r, 30));
      const result = mod.report(input);
      setRun({ kind, result, ms: Math.max(1, Math.round(performance.now() - t0)) });
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      setRun({ kind, result: { status: "CANNOT_VERIFY", failures: [], reason }, ms: 0 });
    } finally {
      setBusy(false);
    }
  }

  const status = run?.result.status;

  return (
    <div className="hero-seal mt-9" aria-live="polite">
      <span className="hero-seal-label">{t.label}</span>
      <span className="hero-seal-hash" title={hash}>
        <span className="hero-seal-type">{hash.slice(0, 32)}</span>…
      </span>
      <span className={`hero-seal-state${status === "FAILED" ? " is-broken" : ""}`}>
        <span className="hero-seal-mark" aria-hidden="true" /> {status === "FAILED" ? t.broken : t.state}
        {run === null ? (
          <button type="button" onClick={() => void check("intact")} disabled={busy} className="hero-seal-check hero-seal-btn">
            {busy ? t.busy : t.verify} {busy ? null : <span aria-hidden="true">&rarr;</span>}
          </button>
        ) : null}
      </span>

      {status === "VERIFIED" ? (
        <div className="hero-seal-result">
          <ul className="hero-seal-checks">
            {t.checks.map((c, i) => (
              <li key={c} style={{ animationDelay: `${i * 0.35}s` }}>
                <span className="hero-seal-ok" aria-hidden="true">✓</span> {c}
              </li>
            ))}
          </ul>
          <p className="hero-seal-verdict">{t.ok(run?.result.nEntries ?? 0, run?.ms ?? 0)}</p>
          <button type="button" onClick={() => void check("tampered")} disabled={busy} className="hero-seal-check hero-seal-btn">
            {busy ? t.busy : t.tamper} {busy ? null : <span aria-hidden="true">&rarr;</span>}
          </button>
        </div>
      ) : null}

      {status === "FAILED" ? (
        <div className="hero-seal-result">
          {run?.kind === "tampered" ? <p className="hero-seal-note">{t.tamperedNote}</p> : null}
          <p className="hero-seal-refused">
            <span aria-hidden="true">✕</span> {t.failed}
          </p>
          <ul className="hero-seal-failures">
            {run?.result.failures.slice(0, 2).map((f) => (
              <li key={f} lang="en">{f}</li>
            ))}
          </ul>
          <button type="button" onClick={() => void check("intact")} disabled={busy} className="hero-seal-check hero-seal-btn">
            {busy ? t.busy : t.restore} {busy ? null : <span aria-hidden="true">&rarr;</span>}
          </button>
        </div>
      ) : null}

      {status === "CANNOT_VERIFY" ? (
        <p className="hero-seal-note">
          {t.cannot}{" "}
          <a href={verifyHref} className="hero-seal-check">
            {t.full} <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      ) : null}
    </div>
  );
}
