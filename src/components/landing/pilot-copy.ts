import type { L } from "./i18n";

/*
 * The design-partner pilot, in ONE place. The home page's #pilot section and
 * the /pilot page both read it, so the steps a visitor reads on one cannot
 * disagree with the other. Moved out of landing.tsx verbatim (2026-09-26).
 */

type Step = { title: string; body: string };

export type PilotCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  steps: readonly Step[];
  fitLabel: string;
  fit: readonly string[];
  cta: string;
};

export const PILOT_COPY: L<PilotCopy> = {
  en: {
    eyebrow: "DESIGN PARTNER PILOT",
    title: "Start with one action type.",
    lead: "A fixed-scope pilot on a single action your automation already performs. You keep the certificate, the gate and the sealed records.",
    steps: [
      {
        title: "Pick the action",
        body: "One action type your agents or scripts already run — a transfer, an access grant, a deletion, a deployment — and the rules that govern it today.",
      },
      {
        title: "Prove the policy",
        body: "We encode the rules, search for sequences that pass every rule yet break the intent, and prove the corrected policy holds.",
      },
      {
        title: "Enforce and seal",
        body: "The gate runs in your environment, in front of the action. Every decision, allow or block, is sealed.",
      },
      {
        title: "Verify without us",
        body: "Your risk team or auditor re-checks the certificate and the records on their own machine.",
      },
    ],
    fitLabel: "A GOOD FIT IF",
    fit: [
      "An agent, API or script can already execute the action without a person clicking approve",
      "The rules exist on paper — limits, approvals, windows, holds",
      "Someone will be asked to show that those rules actually held",
    ],
    cta: "START A PILOT",
  },
  fr: {
    eyebrow: "PILOTE PARTENAIRE DE CONCEPTION",
    title: "Commencez par un seul type d’action.",
    lead: "Un pilote à périmètre fixe sur une seule action que votre automatisation exécute déjà. Vous gardez le certificat, la barrière et les traces scellées.",
    steps: [
      {
        title: "Choisir l’action",
        body: "Un type d’action que vos agents ou scripts exécutent déjà — un transfert, un accès, une suppression, un déploiement — et les règles qui l’encadrent aujourd’hui.",
      },
      {
        title: "Prouver la politique",
        body: "Nous encodons les règles, cherchons les séquences qui passent chaque règle mais trahissent l’intention, et prouvons que la politique corrigée tient.",
      },
      {
        title: "Appliquer et sceller",
        body: "La barrière tourne dans votre environnement, devant l’action. Chaque décision, autorisée ou bloquée, est scellée.",
      },
      {
        title: "Vérifier sans nous",
        body: "Votre équipe de risque ou votre auditeur revérifie le certificat et les traces sur sa propre machine.",
      },
    ],
    fitLabel: "UN BON CANDIDAT SI",
    fit: [
      "Un agent, une API ou un script peut déjà exécuter l’action sans qu’une personne clique sur approuver",
      "Les règles existent sur papier — limites, approbations, fenêtres, gels",
      "Quelqu’un devra montrer que ces règles ont réellement tenu",
    ],
    cta: "DÉMARRER UN PILOTE",
  },
};
