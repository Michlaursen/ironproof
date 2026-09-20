"use client";

import { useState } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";

/*
 * PROOF EXPLORER — a real, ASSIGNED CVE (libyang CVE-2026-44673, CWE-190 -> CWE-122)
 * walked through four tabs: the code, the Z3 proof an undersizing input exists (SAT),
 * the exact witness, and the re-proof that a 64-bit fix closes it (UNSAT).
 * Faithful to the hardened Cobalt proof (cobalt-ai/cobalt_libyang_lyb001_finding.py):
 * BUG obligation SAT + two FIX obligations UNSAT, non-vacuous. Not overclaimed (R3).
 *
 * Translation: the listings keep their code, their identifiers and the solver's
 * own words (SAT, UNSAT) verbatim in both languages — a translated identifier
 * names nothing, and SAT is what Z3 printed. Only the annotations move.
 */

type TabKey = "code" | "proof" | "poc" | "reprove";

const TAB_ORDER: TabKey[] = ["code", "proof", "poc", "reprove"];

type Copy = {
  tabs: Record<TabKey, string>;
  eyebrow: string;
  titleA: string;
  titleB: string;
  sub: string;
  lead: (lib: React.ReactNode) => React.ReactNode;
  engine: React.ReactNode;

  codeLabel: string;
  codeSrc: string;
  codeNote: React.ReactNode;

  proofLabel: string;
  proofSrc: string;
  proofNote: React.ReactNode;

  pocLabel: string;
  pocSrc: string;
  pocNote: React.ReactNode;

  reproveLabel: string;
  reproveSrc: string;
  reproveNote: React.ReactNode;

  scopeLabel: string;
  provenLead: string;
  proven: string;
  notProvenLead: string;
  notProven: React.ReactNode;

  foot: string;
  cveLink: string;
};

const T: L<Copy> = {
  en: {
    tabs: { code: "1 · CODE", proof: "2 · PROOF", poc: "3 · POC", reprove: "4 · RE-PROVE" },
    eyebrow: "PROOF EXPLORER · CVE-2026-44673",
    titleA: "We Mathematically Prove",
    titleB: "a Critical Vulnerability",
    sub: "Proven, then closed. Here's the proof.",
    lead: (lib) => (
      <>
        A real, assigned vulnerability in {lib} (CVE-2026-44673, CVSS 7.5) — the YANG library behind
        NETCONF and sysrepo network config.
      </>
    ),
    engine: (
      <>
        <span className="metal-text">The same proof engine</span> certifies your money-moving
        policies before an agent can act — this is that engine, shown here on a real, assigned CVE.
      </>
    ),

    codeLabel: "libyang · src/parser_lyb.c · lyb_read_string()  —  CWE-190 -> CWE-122",
    codeSrc: `// libyang · src/parser_lyb.c · lyb_read_string()
// str_len is a 32-bit length read straight from the LYB blob — attacker-controlled.

L288  *str = malloc(str_len + 1);       /* (str_len + 1) wraps to 0 in uint32      */
L293  lyb_read(*str, str_len * 8, in);  /* str_len * 8 also wraps — no 64-bit guard */
L296  (*str)[str_len] = '\\0';           /* write at [str_len] — far out of bounds   */`,
    codeNote: (
      <>
        <span className="font-mono text-neutral-300">str_len</span> comes straight from the LYB blob,
        unchecked. With <span className="metal-text">str_len = 0xFFFFFFFF</span>,{" "}
        <span className="font-mono text-neutral-300">(str_len + 1)</span> wraps to 0: the parser
        allocates almost nothing, then writes str_len bytes into it — integer overflow to heap
        overflow (CWE-190 → CWE-122).
      </>
    ),

    proofLabel: "OBLIGATION LYB-b1 · Z3 · BitVec 32 · the BUG",
    proofSrc: `str_len : BitVec 32              # attacker-controlled length field

# BUG obligation LYB-b1 — can the buffer be smaller than the data?
alloc = str_len + 1             # 32-bit, exactly as written
assert  ULT(alloc, str_len)     # does an undersizing input exist?

witness   str_len = 0xFFFFFFFF   ->   alloc = 0x00000000   (wrapped)

Z3  ->  SAT      an undersizing input EXISTS — the overflow is real`,
    proofNote: (
      <>
        Gate rule <span className="text-neutral-300">R2</span>: this BUG obligation (SAT) is paired
        with FIX obligations that must return UNSAT (tab 4). A verdict that cannot be red would mean
        nothing in green.
      </>
    ),

    pocLabel: "WITNESS · the exact input that triggers it",
    pocSrc: `LYB blob · string length field (4 bytes, little-endian)

  str_len = FF FF FF FF   =   0xFFFFFFFF

  L288  malloc(0xFFFFFFFF + 1)  ->  malloc(0)   (wrapped)  ->  ~0-byte buffer
  L296  buf[0xFFFFFFFF] = 0                                 ->  heap write ~4 GB out of bounds

  reached in-memory (LY_IN_MEMORY) via lyd_parse_data() — NETCONF / sysrepo`,
    pocNote: (
      <>
        A crafted LYB blob makes <span className="font-mono text-neutral-300">lyb_read_string()</span>{" "}
        allocate a near-empty buffer, then write about 4 GB past it — heap corruption (DoS; RCE
        potential if the heap is groomable). Reported to CESNET, the libyang maintainer; assigned{" "}
        <span className="metal-text">CVE-2026-44673</span>.
      </>
    ),

    reproveLabel: "OBLIGATIONS LYB-f1 / LYB-f2 · Z3 · the FIX",
    reproveSrc: `# fix: widen to 64-bit before the arithmetic, then re-run for ALL str_len:
#   malloc((uint64_t)str_len + 1)   ·   lyb_read(*str, (uint64_t)str_len * 8, in)

for every 32-bit str_len:
    assert  ULE( (uint64_t)str_len + 1, str_len )   # can it still undersize?

Z3  ->  UNSAT    no input undersizes — bounded, provably, over all 2^32 lengths`,
    reproveNote: (
      <>
        With 64-bit arithmetic,{" "}
        <span className="text-neutral-300">&quot;some length undersizes the buffer&quot;</span> is
        UNSAT for <span className="metal-text">every</span> input. Green only because red was
        reachable — and the fix obligations are non-vacuous: revert to 32-bit and the counterexample
        returns.
      </>
    ),

    scopeLabel: "WHAT THIS PROVES — AND WHAT IT DOES NOT (declared, gate rule R3)",
    provenLead: "Proven —",
    proven:
      "the 32-bit model admits an undersizing input (SAT); the 64-bit-widened model admits none (UNSAT); both fix obligations are non-vacuous — reverting the fix re-exhibits the counterexample.",
    notProvenLead: "Not proven here —",
    notProven: (
      <>
        reachability of <span className="font-mono">lyb_read_string()</span> from a given network
        path, and that this exact fix is the upstream libyang patch. It is a sufficient,
        proven-correct fix — not necessarily the one deployed.
      </>
    ),

    foot: "Faithful to the Cobalt proof set (LYB-001) — reported to CESNET / libyang.",
    cveLink: "View the published CVE-2026-44673 →",
  },

  fr: {
    tabs: { code: "1 · CODE", proof: "2 · PREUVE", poc: "3 · POC", reprove: "4 · RE-PROUVER" },
    eyebrow: "EXPLORATEUR DE PREUVE · CVE-2026-44673",
    titleA: "Nous prouvons mathématiquement",
    titleB: "une vulnérabilité critique",
    sub: "Prouvée, puis fermée. Voici la preuve.",
    lead: (lib) => (
      <>
        Une vulnérabilité réelle et assignée dans {lib} (CVE-2026-44673, CVSS 7,5) — la bibliothèque
        YANG derrière la configuration réseau NETCONF et sysrepo.
      </>
    ),
    engine: (
      <>
        <span className="metal-text">Le même moteur de preuve</span> certifie vos politiques qui
        déplacent de l’argent avant qu’un agent puisse agir — c’est ce moteur, montré ici sur une CVE
        réelle et assignée.
      </>
    ),

    codeLabel: "libyang · src/parser_lyb.c · lyb_read_string()  —  CWE-190 -> CWE-122",
    codeSrc: `// libyang · src/parser_lyb.c · lyb_read_string()
// str_len est une longueur 32 bits lue telle quelle dans le blob LYB — controlee par l'attaquant.

L288  *str = malloc(str_len + 1);       /* (str_len + 1) repasse a 0 en uint32      */
L293  lyb_read(*str, str_len * 8, in);  /* str_len * 8 deborde aussi — aucun garde 64 bits */
L296  (*str)[str_len] = '\\0';           /* ecriture en [str_len] — tres loin hors bornes */`,
    codeNote: (
      <>
        <span className="font-mono text-neutral-300">str_len</span> vient directement du blob LYB,
        sans contrôle. Avec <span className="metal-text">str_len = 0xFFFFFFFF</span>,{" "}
        <span className="font-mono text-neutral-300">(str_len + 1)</span> repasse à 0 : l’analyseur
        alloue presque rien, puis y écrit str_len octets — dépassement d’entier devenu dépassement de
        tas (CWE-190 → CWE-122).
      </>
    ),

    proofLabel: "OBLIGATION LYB-b1 · Z3 · BitVec 32 · le DÉFAUT",
    proofSrc: `str_len : BitVec 32              # champ de longueur controle par l'attaquant

# obligation DEFAUT LYB-b1 — le tampon peut-il etre plus petit que les donnees ?
alloc = str_len + 1             # 32 bits, exactement comme ecrit
assert  ULT(alloc, str_len)     # existe-t-il une entree qui sous-dimensionne ?

temoin    str_len = 0xFFFFFFFF   ->   alloc = 0x00000000   (deborde)

Z3  ->  SAT      une entree qui sous-dimensionne EXISTE — le debordement est reel`,
    proofNote: (
      <>
        Règle de barrière <span className="text-neutral-300">R2</span> : cette obligation DÉFAUT
        (SAT) est appariée à des obligations CORRECTIF qui doivent rendre UNSAT (onglet 4). Un
        verdict qui ne peut pas être rouge ne voudrait rien dire en vert.
      </>
    ),

    pocLabel: "TÉMOIN · l’entrée exacte qui déclenche",
    pocSrc: `blob LYB · champ de longueur de chaine (4 octets, petit-boutiste)

  str_len = FF FF FF FF   =   0xFFFFFFFF

  L288  malloc(0xFFFFFFFF + 1)  ->  malloc(0)   (deborde)  ->  tampon de ~0 octet
  L296  buf[0xFFFFFFFF] = 0                                 ->  ecriture ~4 Go hors bornes

  atteint en memoire (LY_IN_MEMORY) via lyd_parse_data() — NETCONF / sysrepo`,
    pocNote: (
      <>
        Un blob LYB forgé fait allouer à{" "}
        <span className="font-mono text-neutral-300">lyb_read_string()</span> un tampon quasi vide,
        puis écrire environ 4 Go au-delà — corruption de tas (déni de service ; exécution de code
        possible si le tas est façonnable). Signalé à CESNET, le mainteneur de libyang ; CVE assignée{" "}
        <span className="metal-text">CVE-2026-44673</span>.
      </>
    ),

    reproveLabel: "OBLIGATIONS LYB-f1 / LYB-f2 · Z3 · le CORRECTIF",
    reproveSrc: `# correctif : elargir en 64 bits avant le calcul, puis rejouer pour TOUS les str_len :
#   malloc((uint64_t)str_len + 1)   ·   lyb_read(*str, (uint64_t)str_len * 8, in)

pour chaque str_len 32 bits :
    assert  ULE( (uint64_t)str_len + 1, str_len )   # peut-il encore sous-dimensionner ?

Z3  ->  UNSAT    aucune entree ne sous-dimensionne — borne, prouve, sur les 2^32 longueurs`,
    reproveNote: (
      <>
        Avec une arithmétique 64 bits,{" "}
        <span className="text-neutral-300">
          «&#8239;une longueur sous-dimensionne le tampon&#8239;»
        </span>{" "}
        est UNSAT pour <span className="metal-text">toute</span> entrée. Vert seulement parce que le
        rouge était atteignable — et les obligations du correctif ne sont pas creuses : revenez au 32
        bits et le contre-exemple réapparaît.
      </>
    ),

    scopeLabel: "CE QUE ÇA PROUVE — ET CE QUE ÇA NE PROUVE PAS (déclaré, règle de barrière R3)",
    provenLead: "Prouvé —",
    proven:
      "le modèle 32 bits admet une entrée qui sous-dimensionne (SAT) ; le modèle élargi en 64 bits n’en admet aucune (UNSAT) ; les deux obligations du correctif ne sont pas creuses — retirer le correctif fait réapparaître le contre-exemple.",
    notProvenLead: "Non prouvé ici —",
    notProven: (
      <>
        l’atteignabilité de <span className="font-mono">lyb_read_string()</span> depuis un chemin
        réseau donné, et le fait que ce correctif exact soit celui de libyang en amont. C’est un
        correctif suffisant et prouvé correct — pas nécessairement celui qui est déployé.
      </>
    ),

    foot: "Fidèle au jeu de preuves Cobalt (LYB-001) — signalé à CESNET / libyang.",
    cveLink: "Voir la CVE-2026-44673 publiée →",
  },
};

function CodeBlock({ src }: { src: string }) {
  return (
    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-neutral-300 md:text-[13px]">
      {src}
    </pre>
  );
}

export function ProofExplorer({ locale = defaultLocale }: { locale?: Locale }) {
  const [tab, setTab] = useState<TabKey>("code");
  const t = pick(T, locale);

  const PANELS: Record<TabKey, { label: string; src: string; note: React.ReactNode }> = {
    code: { label: t.codeLabel, src: t.codeSrc, note: t.codeNote },
    proof: { label: t.proofLabel, src: t.proofSrc, note: t.proofNote },
    poc: { label: t.pocLabel, src: t.pocSrc, note: t.pocNote },
    reprove: { label: t.reproveLabel, src: t.reproveSrc, note: t.reproveNote },
  };
  const panel = PANELS[tab];

  return (
    <section id="explorer" className="relative z-10 edge-t px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-12 text-center">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">
            {t.titleA}
            <br />
            {t.titleB}
          </h2>
          <p className="metal-text mx-auto mt-5 font-serif text-2xl md:text-3xl">{t.sub}</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">
            {t.lead(<span className="metal-text">libyang</span>)}
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-light leading-snug text-neutral-200 md:text-2xl">
            {t.engine}
          </p>
        </div>

        <div className="fade-up card-premium overflow-hidden">
          <div className="flex flex-wrap gap-2 border-b border-white/5 p-4">
            {TAB_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`preset-btn chip-metal px-5 py-2.5 text-xs track-mid text-neutral-200 transition hover:text-white${tab === key ? " active" : ""}`}
              >
                {t.tabs[key]}
              </button>
            ))}
          </div>

          <div className="bg-black/40 p-6 md:p-8">
            <div>
              <p className="track-mid mb-4 text-[10px] text-neutral-400">{panel.label}</p>
              <CodeBlock src={panel.src} />
              <p className="mt-5 text-sm font-light text-neutral-400">{panel.note}</p>
            </div>
          </div>

          <div className="border-t border-white/5 p-6 md:p-8">
            <p className="track-mid mb-3 text-[10px] text-neutral-400">{t.scopeLabel}</p>
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div className="flex gap-3">
                <span className="icon-metal mt-0.5">✓</span>
                <p className="font-light text-neutral-400">
                  <span className="text-neutral-200">{t.provenLead}</span> {t.proven}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 text-neutral-500">○</span>
                <p className="font-light text-neutral-400">
                  <span className="text-neutral-300">{t.notProvenLead}</span> {t.notProven}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="fade-up mt-4 text-center text-xs text-neutral-400">
          {t.foot}{" "}
          <a
            href="https://www.cve.org/CVERecord?id=CVE-2026-44673"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-text underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
          >
            {t.cveLink}
          </a>
        </p>
      </div>
    </section>
  );
}
