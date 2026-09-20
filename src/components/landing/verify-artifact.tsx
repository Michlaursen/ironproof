"use client";

import { useState } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, count, NBSP } from "./i18n";

/*
 * VERIFY A PROOF — the REAL thing. Paste (or load) a sealed Sceal dossier and
 * it is verified entirely in your browser: Ed25519 + ML-DSA-65 (FIPS 204)
 * signatures and the SHA3-512 chain, in pure JavaScript, no server, no Ironproof
 * code. The verifier is vendored verbatim from ironproof/sceal/verifier-web
 * (src/lib/sceal). Demo dossiers (real, plus deliberately tampered) live in
 * /public/sceal so anyone can watch a forgery get rejected.
 *
 * Translation note: the verifier's own failure strings (result.failures) are
 * NOT translated. They come out of the vendored verifier verbatim and are the
 * evidence — restating them in French would mean maintaining a second copy of
 * someone else's output, which is exactly the mirror this codebase refuses.
 * The prose that FRAMES them is translated; the machine's words are quoted.
 */

type VerifyResult = {
  status: "VERIFIED" | "FAILED" | "CANNOT_VERIFY";
  failures: string[];
  reason?: string;
  nEntries?: number;
  nAnchors?: number;
  // Six states, not two. `both` is the only one that refutes backdating: an
  // upper bound alone proves the bytes are no NEWER than the timestamp and says
  // nothing about a date written inside the document that is older than the
  // truth. So the state is RENDERED, never implied by the word "anchored".
  time?: {
    state: "both" | "upper" | "lower" | "none" | "unbounded" | "direction-unrecorded";
    before: number;
    after: number;
    unspecified: number;
    down: number;
  };
  toolchain?: { liboqs?: string; liboqsPython?: string; canonicalForm?: string } | null;
};

const DEMOS = {
  verified: "/sceal/demo-verified.json",
  tampered: "/sceal/demo-tampered-content.json",
} as const;

type Copy = {
  eyebrow: string;
  title: string;
  lead: (when: React.ReactNode) => React.ReactNode;
  when: string;
  dossierLabel: string;
  loadReal: string;
  loadTampered: string;
  placeholder: string;
  verify: string;
  verifying: string;
  verified: string;
  verifiedBody: (entries: string) => React.ReactNode;
  rejected: string;
  rejectedBody: string;
  cannot: string;
  cannotDefault: string;
  sealedBy: (v: string) => string;
  foot: React.ReactNode;
  readSpec: string;
  errLoad: string;
  errRun: string;
  noAnchor: React.ReactNode;
  bothSides: (before: number, after: number) => React.ReactNode;
  partial: string;
  upper: string;
  lower: string;
  unbounded: string;
  unrecorded: string;
};

const T: L<Copy> = {
  en: {
    eyebrow: "VERIFY A PROOF",
    title: "Check a Real Proof Yourself",
    lead: (when) => (
      <>
        Load a real sealed dossier and verify it right here — Ed25519 + ML-DSA-65 signatures, the
        SHA3-512 chain, and the temporal anchor that pins {when}, entirely in your browser. Then
        load a tampered one and watch it get rejected. No dashboard, no server, no trust required.
      </>
    ),
    when: "when",
    dossierLabel: "SEALED DOSSIER",
    loadReal: "LOAD A REAL PROOF",
    loadTampered: "LOAD A TAMPERED ONE",
    placeholder: "paste a sealed Sceal dossier (JSON) — or use the buttons above",
    verify: "VERIFY IN YOUR BROWSER",
    verifying: "VERIFYING…",
    verified: "✓ VERIFIED",
    verifiedBody: (entries) => (
      <>
        Both signatures check out — <span className="text-neutral-200">Ed25519</span> and{" "}
        <span className="text-neutral-200">ML-DSA-65</span> (dual: both must pass) — over a
        SHA3-512 chain of {entries} sealed entries. Nothing was altered.
      </>
    ),
    rejected: "✕ REJECTED",
    rejectedBody: "The dossier does not verify — the proof caught it:",
    cannot: "⚠ CANNOT VERIFY",
    cannotDefault: "This input is not a sealed dossier.",
    sealedBy: (v) => `sealed by liboqs ${v}`,
    foot: (
      <>
        Runs entirely in your browser — pure-JavaScript Ed25519 + ML-DSA-65 (FIPS 204) + SHA3-512,
        no server and no Ironproof code. The wire format is published, so anyone can write a second
        verifier:{" "}
      </>
    ),
    readSpec: "read the spec →",
    errLoad: "could not load the demo dossier",
    errRun: "the verifier failed to run",
    noAnchor: (
      <>
        <span className="text-neutral-300">No temporal anchor.</span> The seal proves the bytes, not
        the date — nothing here refutes a document written later and dated earlier.
      </>
    ),
    bothSides: (before, after) => (
      <>
        <span className="text-neutral-100">Anchored in time, from both sides.</span> {before} RFC
        3161 timestamp{before === 1 ? "" : "s"} place it{" "}
        <span className="text-neutral-200">before</span> an instant, and {after} public beacon
        {after === 1 ? "" : "s"} place it <span className="text-neutral-200">after</span> one — a
        value nobody could predict earlier. Two sides close the interval; an upper bound alone would
        not.
      </>
    ),
    partial: "Anchored, partially:",
    upper: "an upper bound only — it proves the bytes are no newer than the timestamp, and does not refute a date written inside the document that is older than the truth.",
    lower: "a lower bound only — it proves the bytes are no older than that beacon round, with nothing capping the other side.",
    unbounded: "witnesses that were all unreachable when this was sealed, so no bound was recorded. The absence is the signal, not an error.",
    unrecorded: "witnesses whose direction was not recorded, so no bound can be claimed from them.",
  },
  fr: {
    eyebrow: "VÉRIFIER UNE PREUVE",
    title: "Vérifiez vous-même une vraie preuve",
    lead: (when) => (
      <>
        Chargez un vrai dossier scellé et vérifiez-le ici même — signatures Ed25519 + ML-DSA-65,
        chaîne SHA3-512, et l’ancrage temporel qui fixe le {when}, entièrement dans votre
        navigateur. Chargez ensuite un dossier altéré et regardez-le se faire rejeter. Aucun tableau
        de bord, aucun serveur, aucune confiance requise.
      </>
    ),
    when: "quand",
    dossierLabel: "DOSSIER SCELLÉ",
    loadReal: "CHARGER UNE VRAIE PREUVE",
    loadTampered: "CHARGER UN DOSSIER ALTÉRÉ",
    placeholder: "collez un dossier Sceal scellé (JSON) — ou utilisez les boutons ci-dessus",
    verify: "VÉRIFIER DANS VOTRE NAVIGATEUR",
    verifying: "VÉRIFICATION…",
    verified: "✓ VÉRIFIÉ",
    verifiedBody: (entries) => (
      <>
        Les deux signatures sont bonnes — <span className="text-neutral-200">Ed25519</span> et{" "}
        <span className="text-neutral-200">ML-DSA-65</span> (double{NBSP}: les deux doivent passer)
        — sur une chaîne SHA3-512 de {entries} entrées scellées. Rien n’a été altéré.
      </>
    ),
    rejected: "✕ REJETÉ",
    rejectedBody: `Le dossier ne se vérifie pas — la preuve l’a attrapé${NBSP}:`,
    cannot: "⚠ VÉRIFICATION IMPOSSIBLE",
    cannotDefault: "Cette entrée n’est pas un dossier scellé.",
    sealedBy: (v) => `scellé par liboqs ${v}`,
    foot: (
      <>
        Tourne entièrement dans votre navigateur — Ed25519 + ML-DSA-65 (FIPS 204) + SHA3-512 en
        JavaScript pur, sans serveur et sans code Ironproof. Le format est publié, donc n’importe
        qui peut écrire un second vérificateur{NBSP}:{" "}
      </>
    ),
    readSpec: "lire la spécification →",
    errLoad: "impossible de charger le dossier de démonstration",
    errRun: "le vérificateur n’a pas pu s’exécuter",
    noAnchor: (
      <>
        <span className="text-neutral-300">Aucun ancrage temporel.</span> Le sceau prouve les
        octets, pas la date — rien ici ne réfute un document écrit plus tard et daté plus tôt.
      </>
    ),
    bothSides: (before, after) => (
      <>
        <span className="text-neutral-100">Ancré dans le temps, des deux côtés.</span> {before}{" "}
        horodatage{before === 1 ? "" : "s"} RFC 3161 le place{before === 1 ? "" : "nt"}{" "}
        <span className="text-neutral-200">avant</span> un instant, et {after} balise
        {after === 1 ? "" : "s"} publique{after === 1 ? "" : "s"} le place
        {after === 1 ? "" : "nt"} <span className="text-neutral-200">après</span> un autre — une
        valeur que personne ne pouvait prédire avant. Deux côtés ferment l’intervalle{NBSP}; une
        borne supérieure seule ne le ferait pas.
      </>
    ),
    partial: `Ancré, partiellement${NBSP}:`,
    upper: "une borne supérieure seulement — elle prouve que les octets ne sont pas plus récents que l’horodatage, et ne réfute pas une date écrite dans le document qui serait plus ancienne que la vérité.",
    lower: "une borne inférieure seulement — elle prouve que les octets ne sont pas plus anciens que ce tour de balise, sans rien pour plafonner l’autre côté.",
    unbounded: "des témoins tous injoignables au moment du scellement, donc aucune borne n’a été consignée. C’est l’absence qui est le signal, pas une erreur.",
    unrecorded: "des témoins dont la direction n’a pas été consignée, donc aucune borne ne peut en être tirée.",
  },
};

/** What the seal proves about WHEN, stated at the strength it actually has.
 *
 * A signature proves the bytes did not move; it proves nothing about the date,
 * because `collected_at` is a clock the sealer owns. An anchor binds the chain
 * head to witnesses the sealer does not own. Which DIRECTION those witnesses
 * bound is the whole question and it is printed, because "anchored" on its own
 * is the word a reader takes for "the date is proven".
 */
function TemporalLine({ time, t }: { time?: VerifyResult["time"]; t: Copy }) {
  if (!time || time.state === "none") {
    return <p className="mt-3 text-sm font-light text-neutral-400">{t.noAnchor}</p>;
  }
  if (time.state === "both") {
    return (
      <p className="mt-3 text-sm font-light text-neutral-300">
        {t.bothSides(time.before, time.after)}
      </p>
    );
  }
  const side =
    time.state === "upper"
      ? t.upper
      : time.state === "lower"
        ? t.lower
        : time.state === "unbounded"
          ? t.unbounded
          : t.unrecorded;
  return (
    <p className="mt-3 text-sm font-light text-neutral-400">
      <span className="text-neutral-300">{t.partial}</span> {side}
    </p>
  );
}

export function VerifyArtifact({ locale = defaultLocale }: { locale?: Locale }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [busy, setBusy] = useState(false);
  // A dossier loaded from the sealed sample reads in gold, like every other
  // sealed artifact on the site. The tampered one does not: its seal is broken,
  // so gold there would promise exactly what the demo goes on to refute.
  const [sealed, setSealed] = useState(false);
  const t = pick(T, locale);

  async function load(which: keyof typeof DEMOS) {
    try {
      const res = await fetch(DEMOS[which]);
      const text = await res.text();
      setInput(text);
      setSealed(which === "verified");
      setResult(null);
    } catch {
      setSealed(false);
      setResult({ status: "CANNOT_VERIFY", reason: t.errLoad, failures: [] });
    }
  }

  async function verify() {
    if (busy) return;
    setBusy(true);
    setResult(null);
    try {
      const mod = (await import("@/lib/sceal/canon.js")) as {
        report: (text: string) => VerifyResult;
      };
      // let the "verifying" state paint before the CPU-bound ML-DSA check
      await new Promise((r) => setTimeout(r, 30));
      setResult(mod.report(input));
    } catch {
      setResult({ status: "CANNOT_VERIFY", reason: t.errRun, failures: [] });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="verify" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-14">
      <div className="mx-auto max-w-4xl">
        <div className="fade-up mb-12 text-center">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            {t.lead(<em>{t.when}</em>)}
          </p>
        </div>

        <div className="fade-up card-premium relative overflow-hidden p-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="artifactInput" className="seal-label track-mid text-xs">
              {t.dossierLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => load("verified")}
                className="chip-metal track-mid px-4 py-2 text-xs text-neutral-200 transition hover:text-white"
              >
                {t.loadReal}
              </button>
              <button
                type="button"
                onClick={() => load("tampered")}
                className="chip-metal track-mid px-4 py-2 text-xs text-neutral-200 transition hover:text-white"
              >
                {t.loadTampered}
              </button>
            </div>
          </div>

          <textarea
            id="artifactInput"
            rows={6}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSealed(false);
              if (result) setResult(null);
            }}
            placeholder={t.placeholder}
            className={`w-full resize-none rounded-[5px] border bg-black/50 px-4 py-3 font-mono text-xs placeholder-neutral-600 transition focus:outline-none ${
              sealed
                ? "border-seal/35 text-seal focus:border-seal/60"
                : "border-white/10 text-neutral-200 focus:border-white/30"
            }`}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={verify}
              disabled={busy || input.trim().length === 0}
              className="track-mid rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-7 py-3 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? t.verifying : t.verify}
            </button>
          </div>

          {result ? (
            <div className="seal-pop mt-6">
              {result.status === "VERIFIED" ? (
                <div className="chip-metal p-5">
                  <p className="seal-word mb-2 font-serif text-2xl">{t.verified}</p>
                  <p className="text-sm font-light text-neutral-300">
                    {t.verifiedBody(count(result.nEntries ?? 0, locale))}
                  </p>
                  <TemporalLine time={result.time} t={t} />
                  {result.toolchain?.liboqs ? (
                    <p className="mt-2 font-mono text-xs text-neutral-500">
                      {t.sealedBy(result.toolchain.liboqs)}
                    </p>
                  ) : null}
                </div>
              ) : result.status === "FAILED" ? (
                <div className="chip-metal p-5" style={{ borderColor: "rgba(255,150,150,0.3)" }}>
                  <p className="mb-2 font-serif text-2xl text-neutral-100">{t.rejected}</p>
                  <p className="mb-3 text-sm font-light text-neutral-300">{t.rejectedBody}</p>
                  <ul className="space-y-1.5">
                    {result.failures.map((f, i) => (
                      <li key={i} className="flex gap-2 font-mono text-xs text-neutral-300">
                        <span style={{ color: "#ffb4b4" }}>✕</span>
                        <span className="break-all">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="chip-metal p-5">
                  <p className="mb-1 font-serif text-lg text-neutral-200">{t.cannot}</p>
                  <p className="text-sm text-neutral-300">{result.reason ?? t.cannotDefault}</p>
                </div>
              )}
            </div>
          ) : null}

          <p className="mt-5 text-xs text-neutral-400">
            {t.foot}
            <a
              href="/sceal/SPEC_CANON.md"
              target="_blank"
              rel="noopener noreferrer"
              className="metal-text underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
            >
              {t.readSpec}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
