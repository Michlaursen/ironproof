import type { L } from "./i18n";

/*
 * The four action types the product is sold by, one page each (/actions/<id>).
 *
 * The ids are the ones the home page's "Watch it decide" tabs already use, so a
 * tab and its page cannot name different things.
 *
 * `evidence` is the part that must never be rounded up. It says what a visitor
 * can check TODAY for this action type, at the strength it has:
 *   public    -- an artifact on this site, verifiable in the browser
 *   onRequest -- exists, sealed, but not published; shown in a call
 *   none      -- nothing yet; the home demo is illustrative
 * A type moves up a level only when the artifact exists, never because the
 * copy would read better.
 */

export const ACTION_IDS = ["money", "access", "records", "deploy"] as const;
export type ActionId = (typeof ACTION_IDS)[number];

export type EvidenceLevel = "public" | "onRequest" | "none";

export type ActionCopy = {
  tab: string;
  h1: string;
  lead: string;
  initiators: string;
  rules: string[];
  breaks: { head: string; body: string }[];
  evidence: EvidenceLevel;
  evidenceBody: string;
};

export function isActionId(v: string): v is ActionId {
  return (ACTION_IDS as readonly string[]).includes(v);
}

export const ACTION_COPY: L<Record<ActionId, ActionCopy>> = {
  en: {
    money: {
      tab: "MOVE MONEY",
      h1: "Payments that leave before anyone checks the total.",
      lead: "Wires, internal transfers, refunds, payouts. An agent that can call the payment API can move money at the speed of the API, and the rule that should have stopped it is usually a sentence in a policy document.",
      initiators: "Treasury agents, payout scripts, refund bots, reconciliation jobs.",
      rules: [
        "A ceiling per payment, often lifted by a second signature",
        "A cumulative cap per day, per account or per counterparty",
        "A cooling-off period after a new or changed beneficiary",
        "A limit on how often the beneficiary itself can change",
      ],
      breaks: [
        {
          head: "The ceiling was conditional all along.",
          body: "“No payment above X without a second signature” caps unsigned payments only. A signed one of any size passes, and nobody notices until a solver is asked.",
        },
        {
          head: "Split it, and every part is legal.",
          body: "A per-payment rule cannot see a total. Several payments under the ceiling move more than the ceiling, one compliant request at a time.",
        },
      ],
      evidence: "public",
      evidenceBody: "A sealed evidence pack for a real payment control, verifiable in your browser, and a lab where you can attack the same policy.",
    },
    access: {
      tab: "GRANT ACCESS",
      h1: "Access that is granted in seconds and reviewed in a quarter.",
      lead: "Role assignments, group memberships, API keys, temporary elevation. Helpdesk agents and provisioning scripts already grant access; the review that is meant to catch a bad grant usually comes long after it was used.",
      initiators: "IT helpdesk agents, provisioning scripts, identity workflows, CI service accounts.",
      rules: [
        "A requester cannot grant a role above their own",
        "Elevated access is time-boxed",
        "Sensitive roles need an approver who is not the requester",
        "Some conditions must hold at request time, such as MFA or a network range",
      ],
      breaks: [
        {
          head: "Grants chain.",
          body: "A role that may grant roles can hand out one that may grant more. Each step is within policy; the end state is not.",
        },
        {
          head: "Temporary adds up.",
          body: "Time-boxed grants renewed back to back are standing access, while each renewal passes on its own.",
        },
      ],
      evidence: "onRequest",
      evidenceBody: "Sealed decision benches on access policies published verbatim by AWS and Microsoft, decided by our reading of their documented semantics. AWS’s and Azure’s own engines were not run. Shown in a call, not published.",
    },
    records: {
      tab: "DELETE RECORDS",
      h1: "Deletions that cannot be undone, run by a job nobody watches.",
      lead: "Retention clean-ups, account closures, data-subject requests, log rotation. The job is usually right, and the one time it is not, the evidence it needed is the thing it deleted.",
      initiators: "Nightly clean-up scripts, privacy-request workflows, account-closure agents.",
      rules: [
        "Only records past their retention period",
        "Never a record under a legal or regulatory hold",
        "Large batches need a second approval",
        "Some record types are never deleted by automation",
      ],
      breaks: [
        {
          head: "The hold lives somewhere else.",
          body: "The system that deletes is rarely the system that knows about the hold. A rule that cannot see the hold cannot honour it.",
        },
        {
          head: "Small batches, large total.",
          body: "A batch-size limit applies per run. Many runs under the limit remove as much as one run the rule would have stopped.",
        },
      ],
      evidence: "none",
      evidenceBody: "Nothing public yet for this action type. The decisions on the home page are illustrative, under a sample policy. A pilot is where the first sealed pack for record deletion would come from.",
    },
    deploy: {
      tab: "SHIP A CHANGE",
      h1: "Changes that reach production because the pipeline said yes.",
      lead: "Configuration pushes, releases, infrastructure changes, feature flags. Coding agents and release bots already ship; the change-management rules exist, and the pipeline is where they are supposed to hold.",
      initiators: "AI coding agents, release bots, infrastructure-as-code pipelines.",
      rules: [
        "Only inside an approved change window",
        "Reviewed by someone other than the author",
        "A signed rollback plan for critical systems",
        "No change during a declared freeze",
      ],
      breaks: [
        {
          head: "The approval was for a different change.",
          body: "A review approves a diff. If what ships is not bound to the diff that was approved, the approval travels to changes nobody read.",
        },
        {
          head: "The window is checked by the thing it constrains.",
          body: "A pipeline that decides whether it is inside the window can be asked to decide differently. The check belongs in front of the action, not inside it.",
        },
      ],
      evidence: "none",
      evidenceBody: "Nothing public yet for this action type. The decisions on the home page are illustrative, under a sample policy. A pilot is where the first sealed pack for deployments would come from.",
    },
  },
  fr: {
    money: {
      tab: "DÉPLACER DE L’ARGENT",
      h1: "Des paiements qui partent avant que quiconque vérifie le total.",
      lead: "Virements, transferts internes, remboursements, versements. Un agent qui peut appeler l’API de paiement déplace l’argent à la vitesse de l’API, et la règle qui aurait dû l’arrêter est souvent une phrase dans une politique.",
      initiators: "Agents de trésorerie, scripts de versement, robots de remboursement, tâches de rapprochement.",
      rules: [
        "Un plafond par paiement, souvent levé par une deuxième signature",
        "Un plafond cumulé par jour, par compte ou par contrepartie",
        "Un délai de carence après un bénéficiaire nouveau ou modifié",
        "Une limite à la fréquence des changements de bénéficiaire",
      ],
      breaks: [
        {
          head: "Le plafond était conditionnel depuis le début.",
          body: "« Aucun paiement au-dessus de X sans deuxième signature » ne plafonne que les paiements non signés. Un paiement signé de n’importe quel montant passe, et personne ne le voit avant qu’on le demande à un solveur.",
        },
        {
          head: "Fractionnez, et chaque part est légale.",
          body: "Une règle par paiement ne voit pas de total. Plusieurs paiements sous le plafond déplacent plus que le plafond, une demande conforme à la fois.",
        },
      ],
      evidence: "public",
      evidenceBody: "Un dossier de preuve scellé pour une vraie règle de paiement, vérifiable dans votre navigateur, et un labo où attaquer la même politique.",
    },
    access: {
      tab: "DONNER UN ACCÈS",
      h1: "Des accès accordés en secondes et révisés au trimestre.",
      lead: "Attributions de rôles, appartenances à des groupes, clés d’API, élévations temporaires. Les agents de soutien et les scripts de provisionnement accordent déjà des accès ; la révision censée attraper un mauvais accès arrive souvent longtemps après son usage.",
      initiators: "Agents de soutien TI, scripts de provisionnement, flux d’identité, comptes de service d’intégration continue.",
      rules: [
        "Un demandeur ne peut pas accorder un rôle supérieur au sien",
        "Un accès élevé est limité dans le temps",
        "Les rôles sensibles exigent un approbateur autre que le demandeur",
        "Certaines conditions doivent tenir au moment de la demande, comme l’authentification multifacteur ou une plage réseau",
      ],
      breaks: [
        {
          head: "Les accès s’enchaînent.",
          body: "Un rôle autorisé à accorder des rôles peut en donner un qui en accorde davantage. Chaque étape respecte la politique ; l’état final, non.",
        },
        {
          head: "Le temporaire s’additionne.",
          body: "Des accès limités dans le temps, renouvelés bout à bout, deviennent un accès permanent, alors que chaque renouvellement passe seul.",
        },
      ],
      evidence: "onRequest",
      evidenceBody: "Des bancs de décision scellés sur des politiques d’accès publiées mot pour mot par AWS et Microsoft, décidées selon notre lecture de leur sémantique documentée. Les moteurs d’AWS et d’Azure n’ont pas été exécutés. Montrés en appel, non publiés.",
    },
    records: {
      tab: "SUPPRIMER DES DOSSIERS",
      h1: "Des suppressions irréversibles, lancées par une tâche que personne ne surveille.",
      lead: "Nettoyages de rétention, fermetures de comptes, demandes d’accès à l’information, rotation des journaux. La tâche a presque toujours raison, et la seule fois où elle a tort, la preuve qu’il fallait est ce qu’elle a supprimé.",
      initiators: "Scripts de nettoyage nocturnes, flux de demandes de confidentialité, agents de fermeture de comptes.",
      rules: [
        "Seulement les dossiers dont la période de rétention est échue",
        "Jamais un dossier sous gel juridique ou réglementaire",
        "Les gros lots exigent une deuxième approbation",
        "Certains types de dossiers ne sont jamais supprimés par l’automatisation",
      ],
      breaks: [
        {
          head: "Le gel vit ailleurs.",
          body: "Le système qui supprime est rarement celui qui connaît le gel. Une règle qui ne voit pas le gel ne peut pas le respecter.",
        },
        {
          head: "Petits lots, gros total.",
          body: "Une limite de taille s’applique par exécution. Plusieurs exécutions sous la limite suppriment autant qu’une seule que la règle aurait arrêtée.",
        },
      ],
      evidence: "none",
      evidenceBody: "Rien de public encore pour ce type d’action. Les décisions de l’accueil sont illustratives, sous une politique d’exemple. C’est d’un pilote que viendrait le premier dossier scellé pour la suppression de dossiers.",
    },
    deploy: {
      tab: "LIVRER UN CHANGEMENT",
      h1: "Des changements qui arrivent en production parce que le pipeline a dit oui.",
      lead: "Poussées de configuration, versions, changements d’infrastructure, indicateurs de fonctionnalité. Les agents de code et les robots de publication déploient déjà ; les règles de gestion du changement existent, et c’est dans le pipeline qu’elles sont censées tenir.",
      initiators: "Agents de code IA, robots de publication, pipelines d’infrastructure en code.",
      rules: [
        "Seulement dans une fenêtre de changement approuvée",
        "Revu par une autre personne que l’auteur",
        "Un plan de retour arrière signé pour les systèmes critiques",
        "Aucun changement pendant un gel déclaré",
      ],
      breaks: [
        {
          head: "L’approbation visait un autre changement.",
          body: "Une revue approuve un diff. Si ce qui part n’est pas lié au diff approuvé, l’approbation voyage vers des changements que personne n’a lus.",
        },
        {
          head: "La fenêtre est vérifiée par ce qu’elle contraint.",
          body: "Un pipeline qui décide s’il est dans la fenêtre peut être amené à décider autrement. Le contrôle appartient devant l’action, pas dedans.",
        },
      ],
      evidence: "none",
      evidenceBody: "Rien de public encore pour ce type d’action. Les décisions de l’accueil sont illustratives, sous une politique d’exemple. C’est d’un pilote que viendrait le premier dossier scellé pour les déploiements.",
    },
  },
};
