"use client";

import { useState } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, money, count } from "./i18n";
import { GateLoop } from "./gate-loop";

/*
 * WATCH IT DECIDE — four action classes, one gate.
 *
 * The rest of the page used to demonstrate one thing: a refund. The product is
 * sold per bounded action TYPE, and the headline names four of them, so the
 * visitor has to see all four decided the same way. Each tab is one action
 * class, each with an allowed and a blocked request under a sample policy.
 *
 * The verdict is NOT written in the copy. It is derived by `verdict()` from the
 * per-rule results, so a case cannot be labelled ALLOW while one of its own
 * rules reads as failed. Copy says what happened; the evaluator decides.
 */

type Check = { rule: string; ok: boolean };
type Case = { request: string; checks: readonly Check[] };
type Scenario = {
  id: string;
  tab: string;
  initiator: string;
  allowCase: Case;
  blockCase: Case;
};

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  initiatorLabel: string;
  requestLabel: string;
  checksLabel: string;
  presetAllow: string;
  presetBlock: string;
  allow: string;
  block: string;
  allowWhy: string;
  blockWhy: string;
  receiptLabel: string;
  receiptFields: readonly string[];
  receiptCta: string;
  illustrative: string;
  scenarios: readonly Scenario[];
};

const WIRE_CAP = 50000;
const TRANSFER_CAP = 50000;
const COMBINED_CAP = 60000;
const WIRE_ASK = 35000;
const TRANSFER_ASK = 30000;
const BULK = 40000;
const HELD = 1200;

const T: L<Copy> = {
  en: {
    eyebrow: "WATCH IT DECIDE",
    title: "Four kinds of action. One gate.",
    lead: "Pick what the agent is trying to do. Every request is checked against the policy before it runs — and every decision, allow or block, leaves a sealed record.",
    initiatorLabel: "INITIATOR",
    requestLabel: "REQUESTED ACTION",
    checksLabel: "POLICY CHECKS",
    presetAllow: "✓ WITHIN POLICY",
    presetBlock: "✕ OUTSIDE POLICY",
    allow: "Allowed. It executes.",
    block: "Blocked. It never executes.",
    allowWhy: "Every rule holds. The action runs, and the decision is sealed.",
    blockWhy: "A rule fails. The action does not run, and the refusal is sealed with the reason.",
    receiptLabel: "WHAT THE SEALED RECORD CARRIES",
    receiptFields: [
      "The exact action requested, and by whom",
      "The policy version in force",
      "The verdict and the rule that decided it",
      "Two signatures (Ed25519 + ML-DSA-65), re-checkable offline",
    ],
    receiptCta: "CHECK A REAL SEALED RECORD",
    illustrative: "Illustrative decisions under a sample policy.",
    scenarios: [
      {
        id: "money",
        tab: "MOVE MONEY",
        initiator: "AI agent · treasury-ops",
        allowCase: {
          request: `Wire ${money(WIRE_ASK, "en")} to a beneficiary on file for 90 days`,
          checks: [
            { rule: `Wire under its own cap of ${money(WIRE_CAP, "en")}`, ok: true },
            { rule: `Wires + internal transfers today under the combined cap of ${money(COMBINED_CAP, "en")}`, ok: true },
            { rule: "Beneficiary past the 30-day cooling-off period", ok: true },
          ],
        },
        blockCase: {
          request: `Internal transfer of ${money(TRANSFER_ASK, "en")}, after a ${money(WIRE_ASK, "en")} wire earlier today`,
          checks: [
            { rule: `Transfer under its own cap of ${money(TRANSFER_CAP, "en")}`, ok: true },
            { rule: `Wires + internal transfers today under the combined cap of ${money(COMBINED_CAP, "en")}`, ok: false },
            { rule: "Destination account owned by the same client", ok: true },
          ],
        },
      },
      {
        id: "access",
        tab: "GRANT ACCESS",
        initiator: "AI agent · it-helpdesk",
        allowCase: {
          request: "Grant read-only access to the reporting dashboard for 24 hours",
          checks: [
            { rule: "Role at or below the requester's own ceiling", ok: true },
            { rule: "Time-boxed grant (72 hours maximum)", ok: true },
            { rule: "Requester's manager on record as approver", ok: true },
          ],
        },
        blockCase: {
          request: "Grant the admin role to service account svc-billing",
          checks: [
            { rule: "Role at or below the requester's own ceiling", ok: false },
            { rule: "Open change ticket referencing the account", ok: false },
            { rule: "Two authorized approvers on record", ok: false },
          ],
        },
      },
      {
        id: "records",
        tab: "DELETE RECORDS",
        initiator: "Script · nightly-cleanup",
        allowCase: {
          request: `Delete ${count(800, "en")} records past their retention period`,
          checks: [
            { rule: "Every record past its retention period", ok: true },
            { rule: "No record under a legal or retention hold", ok: true },
            { rule: `Batch under ${count(1000, "en")} records, or dual approval`, ok: true },
          ],
        },
        blockCase: {
          request: `Delete ${count(BULK, "en")} inactive customer records`,
          checks: [
            { rule: "Every record past its retention period", ok: true },
            { rule: `No record under a legal or retention hold (${count(HELD, "en")} are)`, ok: false },
            { rule: `Batch under ${count(1000, "en")} records, or dual approval`, ok: false },
          ],
        },
      },
      {
        id: "deploy",
        tab: "SHIP A CHANGE",
        initiator: "AI coding agent · release-bot",
        allowCase: {
          request: "Push a configuration change to the payment rail",
          checks: [
            { rule: "Inside the approved change window", ok: true },
            { rule: "Rollback plan signed", ok: true },
            { rule: "Change reviewed by someone other than its author", ok: true },
          ],
        },
        blockCase: {
          request: "Push a configuration change to the payment rail at 2:14 a.m.",
          checks: [
            { rule: "Inside the approved change window", ok: false },
            { rule: "Rollback plan signed", ok: false },
            { rule: "Change reviewed by someone other than its author", ok: true },
          ],
        },
      },
    ],
  },
  fr: {
    eyebrow: "VOYEZ-LE DÉCIDER",
    title: "Quatre types d’action. Une seule barrière.",
    lead: "Choisissez ce que l’agent tente de faire. Chaque demande est vérifiée contre la politique avant de s’exécuter — et chaque décision, autorisée ou bloquée, laisse une trace scellée.",
    initiatorLabel: "INITIATEUR",
    requestLabel: "ACTION DEMANDÉE",
    checksLabel: "VÉRIFICATIONS DE LA POLITIQUE",
    presetAllow: "✓ DANS LA POLITIQUE",
    presetBlock: "✕ HORS POLITIQUE",
    allow: "Autorisée. Exécution.",
    block: "Bloquée. Pas d’exécution.",
    allowWhy: "Toutes les règles tiennent. L’action s’exécute, et la décision est scellée.",
    blockWhy: "Une règle échoue. L’action ne s’exécute pas, et le refus est scellé avec sa raison.",
    receiptLabel: "CE QUE CONTIENT LA TRACE SCELLÉE",
    receiptFields: [
      "L’action exacte demandée, et par qui",
      "La version de la politique en vigueur",
      "Le verdict et la règle qui l’a décidé",
      "Deux signatures (Ed25519 + ML-DSA-65), revérifiables hors ligne",
    ],
    receiptCta: "VÉRIFIEZ UNE VRAIE TRACE SCELLÉE",
    illustrative: "Décisions illustratives sous une politique d’exemple.",
    scenarios: [
      {
        id: "money",
        tab: "DÉPLACER DE L’ARGENT",
        initiator: "Agent IA · treasury-ops",
        allowCase: {
          request: `Virer ${money(WIRE_ASK, "fr")} à un bénéficiaire au dossier depuis 90 jours`,
          checks: [
            { rule: `Virement sous son propre plafond de ${money(WIRE_CAP, "fr")}`, ok: true },
            { rule: `Virements + transferts internes du jour sous le plafond combiné de ${money(COMBINED_CAP, "fr")}`, ok: true },
            { rule: "Bénéficiaire au-delà du délai de carence de 30 jours", ok: true },
          ],
        },
        blockCase: {
          request: `Transfert interne de ${money(TRANSFER_ASK, "fr")}, après un virement de ${money(WIRE_ASK, "fr")} plus tôt aujourd’hui`,
          checks: [
            { rule: `Transfert sous son propre plafond de ${money(TRANSFER_CAP, "fr")}`, ok: true },
            { rule: `Virements + transferts internes du jour sous le plafond combiné de ${money(COMBINED_CAP, "fr")}`, ok: false },
            { rule: "Compte de destination détenu par le même client", ok: true },
          ],
        },
      },
      {
        id: "access",
        tab: "DONNER UN ACCÈS",
        initiator: "Agent IA · it-helpdesk",
        allowCase: {
          request: "Accorder un accès en lecture seule au tableau de bord de rapports pour 24 heures",
          checks: [
            { rule: "Rôle égal ou inférieur au plafond du demandeur", ok: true },
            { rule: "Accès limité dans le temps (72 heures maximum)", ok: true },
            { rule: "Gestionnaire du demandeur au dossier comme approbateur", ok: true },
          ],
        },
        blockCase: {
          request: "Accorder le rôle administrateur au compte de service svc-billing",
          checks: [
            { rule: "Rôle égal ou inférieur au plafond du demandeur", ok: false },
            { rule: "Billet de changement ouvert qui vise ce compte", ok: false },
            { rule: "Deux approbateurs autorisés au dossier", ok: false },
          ],
        },
      },
      {
        id: "records",
        tab: "SUPPRIMER DES DOSSIERS",
        initiator: "Script · nightly-cleanup",
        allowCase: {
          request: `Supprimer ${count(800, "fr")} dossiers dont la période de conservation est échue`,
          checks: [
            { rule: "Chaque dossier au-delà de sa période de conservation", ok: true },
            { rule: "Aucun dossier sous gel juridique ou de conservation", ok: true },
            { rule: `Lot de moins de ${count(1000, "fr")} dossiers, ou double approbation`, ok: true },
          ],
        },
        blockCase: {
          request: `Supprimer ${count(BULK, "fr")} dossiers clients inactifs`,
          checks: [
            { rule: "Chaque dossier au-delà de sa période de conservation", ok: true },
            { rule: `Aucun dossier sous gel juridique ou de conservation (${count(HELD, "fr")} le sont)`, ok: false },
            { rule: `Lot de moins de ${count(1000, "fr")} dossiers, ou double approbation`, ok: false },
          ],
        },
      },
      {
        id: "deploy",
        tab: "LIVRER UN CHANGEMENT",
        initiator: "Agent de code IA · release-bot",
        allowCase: {
          request: "Pousser un changement de configuration sur le rail de paiement",
          checks: [
            { rule: "Dans la fenêtre de changement approuvée", ok: true },
            { rule: "Plan de retour arrière signé", ok: true },
            { rule: "Changement revu par une autre personne que son auteur", ok: true },
          ],
        },
        blockCase: {
          request: "Pousser un changement de configuration sur le rail de paiement à 2 h 14",
          checks: [
            { rule: "Dans la fenêtre de changement approuvée", ok: false },
            { rule: "Plan de retour arrière signé", ok: false },
            { rule: "Changement revu par une autre personne que son auteur", ok: true },
          ],
        },
      },
    ],
  },
};

/** The one evaluator: a case is allowed only if every one of its rules holds. */
function verdict(c: Case): boolean {
  if (c.checks.length === 0) return false; // no rule evaluated = nothing authorizes it
  return c.checks.every((k) => k.ok);
}

export function AgentScenarios({
  locale = defaultLocale,
  verifyHref,
}: {
  locale?: Locale;
  verifyHref: string;
}) {
  const t = pick(T, locale);
  const [tab, setTab] = useState(0);
  const [blocked, setBlocked] = useState(true);

  const scenario = t.scenarios[tab] ?? t.scenarios[0];
  if (!scenario) return null;
  const current = blocked ? scenario.blockCase : scenario.allowCase;
  const allowed = verdict(current);

  return (
    <section id="decide" className="relative z-10 edge-t px-6 py-28 md:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="fade-up mb-10 text-center">
          <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
          <h2 className="metal-text font-serif text-4xl font-medium md:text-6xl">{t.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
        </div>

        <GateLoop locale={locale} />

        {/* Redesigned 2026-09-25 in the new grammar: text tabs on a hairline,
          * a two-state policy switch, ruled rows instead of cards, and the
          * verdict set large. Both halves of the act stay one click apart. */}
        <div className="fade-up mb-12 flex flex-col gap-6 border-b border-white/10 md:flex-row md:items-end md:justify-between">
          <div role="tablist" className="-mb-px flex flex-wrap gap-x-8 gap-y-2">
            {t.scenarios.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={`track-mid border-b-2 pb-4 text-[11px] transition ${
                  i === tab ? "border-seal text-white" : "border-transparent text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <div className="mb-4 inline-flex self-start rounded-full border border-white/10 p-1 md:self-auto">
            <button
              type="button"
              aria-pressed={!blocked}
              onClick={() => setBlocked(false)}
              className={`track-mid rounded-full px-4 py-2 text-[10px] transition ${blocked ? "text-neutral-500 hover:text-neutral-200" : "bg-seal/15 text-seal"}`}
            >
              {t.presetAllow}
            </button>
            <button
              type="button"
              aria-pressed={blocked}
              onClick={() => setBlocked(true)}
              className={`track-mid rounded-full px-4 py-2 text-[10px] transition ${blocked ? "bg-[#ffb4b4]/10 text-[#ffb4b4]" : "text-neutral-500 hover:text-neutral-200"}`}
            >
              {t.presetBlock}
            </button>
          </div>
        </div>

        <div key={`${tab}-${blocked ? "b" : "a"}`} className="scenario-swap grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="track-mid text-[10px] text-neutral-500">
              {t.initiatorLabel} <span className="ml-3 font-mono normal-case tracking-normal text-neutral-300">{scenario.initiator}</span>
            </p>
            <p className="track-mid mt-8 text-[10px] text-neutral-500">{t.requestLabel}</p>
            <p className="mt-3 font-serif text-3xl leading-snug text-neutral-100 md:text-4xl">{current.request}</p>

            <p className="track-mid mt-10 text-[10px] text-neutral-500">{t.checksLabel}</p>
            <ul className="mt-3 border-t border-white/10">
              {current.checks.map((k) => (
                <li key={k.rule} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-base font-light">
                  <span aria-hidden="true" className={`w-4 shrink-0 font-mono ${k.ok ? "text-seal" : "text-[#ffb4b4]"}`}>
                    {k.ok ? "✓" : "✕"}
                  </span>
                  <span className={k.ok ? "text-neutral-400" : "text-neutral-100"}>{k.rule}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className={`font-serif text-4xl md:text-5xl ${allowed ? "text-seal" : "text-[#ffb4b4]"}`}>
                {allowed ? t.allow : t.block}
              </p>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-neutral-400">
                {allowed ? t.allowWhy : t.blockWhy}
              </p>
            </div>
          </div>

          <div className="border-l border-seal/40 pl-8 lg:mt-1">
            <p className="track-mid mb-6 text-[10px] text-neutral-500">{t.receiptLabel}</p>
            <ol className="space-y-5">
              {t.receiptFields.map((f, i) => (
                <li key={f} className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-seal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base font-light leading-relaxed text-neutral-300">{f}</span>
                </li>
              ))}
            </ol>
            <a
              href={verifyHref}
              className="track-mid mt-10 inline-flex items-center gap-3 border-b border-white/20 pb-1 text-xs text-neutral-200 transition hover:border-seal hover:text-white"
            >
              {t.receiptCta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <p className="fade-up mt-12 text-xs text-neutral-500">{t.illustrative}</p>
      </div>
    </section>
  );
}
