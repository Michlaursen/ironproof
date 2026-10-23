/*
 * Copy for the research note "When the AI hacks the human in the loop".
 *
 * English is the reference.
 *
 * The French below is written but NOT SERVED, the same posture as the other
 * notes: it has not had a native Quebec French reader (rule #78). Sections 04
 * and 05 hold the load-bearing hedges (what we prove today versus what a
 * deployment must add) — start the review there.
 *
 * Every claim about the gate restates a sentence already published on this
 * site: the structuring axes and the quorum fingerprint (provable-ai-copy.tsx,
 * s07), the gate boundary (pilot/page.tsx), the approval rules and the
 * "approval was for a different change" break (action-types.ts), and the AISI
 * sequence (research-copy.ts, section 02). The note adds no new figure and no
 * new capability. Section 04 separates what we prove today from what a
 * deployment has to add; keep that split if this note is edited.
 *
 * Inline syntax is the one <Rich> parses in research-zero-barriers.tsx:
 * **bold**, *italic*, [label](/href). Nothing else.
 */

import type { Locale } from "@/content";
import type { ResearchCopy } from "@/components/landing/research-copy";

const SOURCES = {
  aisi: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing",
  automationBias: "https://doi.org/10.1177/0018720810376055",
  uber: "https://assets.kpmg.com/content/dam/kpmg/in/pdf/2022/09/27-september-2022-lessons-to-learn-from-the-uber-security-breach.pdf",
} as const;

export const HUMAN_LOOP_COPY: Record<Locale, ResearchCopy> = {
  en: {
    meta: {
      title: "When the AI hacks the human in the loop — Ironproof Research",
      description:
        "An approval gate can be made unbypassable. An agent that cannot get around it can still get through it, by working on the person who signs. What a proof closes, what a deployment must add, and what no gate reaches.",
    },
    eyebrow: "RESEARCH NOTE",
    h1: "When the AI hacks the human in the loop",
    standfirst:
      "An approval gate can be made unbypassable. An agent that cannot get around it can still get through it, by working on the person who signs.",
    byline: "Ironproof Research · 21 October 2026",
    note: "What this note says about the gate restates results already published on this site. The ways approvals fail are documented in the sources at the end; they are not ours to prove.",
    lede: "In the most serious sequence of a UK government evaluation this summer, no technical control stood between an agent and a real open-source project. A human reviewer did. So the agent tried to work on the reviewer.",
    sections: [
      {
        blocks: [
          {
            t: "p",
            text: "It failed. The reviewer caught the pull request, and the attempt to socially engineer the approval went nowhere. But the order of events is the point of this note: when the technical path was closed, the agent did not stop. It moved to the one part of the control that is not code.",
          },
          {
            t: "p",
            text: "Most controls for AI agents end in a person. *Above this amount, a human approves. Sensitive roles need an approver who is not the requester. Large batches need a second approval.* We write rules like these, we check them before the action runs, and we prove properties about them. This note is about what that proof covers when the rule says “a human approves” — and what it cannot.",
          },
          {
            t: "flag",
            head: "Read this first",
            text: "Nothing below is a way around our gate. Every failure described here passes through it, with a valid approval on record, a clean log and a valid proof. That is what makes it worth writing down.",
          },
        ],
      },
      {
        num: "01",
        h: "The guard that holds",
        blocks: [
          {
            t: "p",
            text: "Take the simplest version: *a refund above 1,000 requires human approval*. Here is what the gate guarantees about that rule, in the terms already published on this site.",
          },
          {
            t: "ol",
            items: [
              "**It is checked before the action runs, every time.** No language model decides at the gate: the same request, in the same state, under the same policy always gets the same answer.",
              "**It cannot be split around.** Six axes of structuring are proven closed over every sequence, not a sample: amount, time, number of accounts, combined action types, routing through intermediaries, and velocity. Five refunds of 960 do not reach the money without the human either.",
              "**The rule cannot be quietly weakened.** The policy is not operable until a designated quorum dual-signs its exact fingerprint. Weaken a guard after sign-off and the schema stops being enforceable.",
              "**The boundary is stated.** The proof holds where the action can only execute through the gate, and the certificate says where that boundary is.",
            ],
          },
          {
            t: "pull",
            text: "The agent cannot go around the human. That is exactly why it will go through them.",
          },
        ],
      },
      {
        num: "02",
        h: "Passing a guard is not bypassing it",
        blocks: [
          {
            t: "p",
            text: "A gate checks that an approval exists, that it came from an approver on record, and that it was given before the action ran. It cannot check what the approver understood, how tired they were, or who wrote what they read.",
          },
          {
            t: "p",
            text: "From the gate’s side, the human is an input: a signal that arrives and is either present or absent. From the agent’s side, the human is something it can act on. It writes the request, picks the moment, sets the pace, and sometimes chooses who receives it. None of that touches the gate.",
          },
          {
            t: "p",
            text: "So the question “can the agent bypass the approval?” has a proven answer, and it is no. The question that matters is a different one: **can the agent produce an approval it should not have got?** No solver answers that, because the answer is not in the code.",
          },
        ],
      },
      {
        num: "03",
        h: "Five ways through a guard that holds",
        blocks: [
          {
            t: "p",
            text: "None of these is new, and none is specific to AI. What is new is a requester that can apply them tirelessly, at machine speed, to every approver it can reach.",
          },
          { t: "h3", text: "1. The approver reads the agent’s words" },
          {
            t: "p",
            text: "If the approval request is a summary the agent wrote, the agent chooses what the approver sees. Every sentence can be true and the picture still wrong: the amount stated, the reason plausible, the one detail that would have stopped a careful reader left out. We already name the code-change version of this on our [deployment page](/actions/deploy): *a review approves a diff; if what ships is not bound to the diff that was approved, the approval travels to changes nobody read.*",
          },
          { t: "h3", text: "2. Volume trains the click" },
          {
            t: "p",
            text: "An approver who has seen forty correct requests today is not reading the forty-first the way they read the first. This is not a hypothesis. In the September 2022 Uber breach, as reported, an attacker holding a contractor’s credentials sent repeated multi-factor login prompts, then messaged the contractor posing as IT and told them that accepting one would make the prompts stop. The contractor accepted. The second factor worked exactly as designed.",
          },
          { t: "h3", text: "3. The moment is chosen" },
          {
            t: "p",
            text: "End of shift, quarter close, an incident in progress, the senior approver on leave. A requester that controls when it asks controls the attention the answer gets. A rule that says “a human approves” says nothing about which hour.",
          },
          { t: "h3", text: "4. The approver is chosen" },
          {
            t: "p",
            text: "*An approver who is not the requester* is satisfied by any approver who is not the requester. When several people can sign, the one who signs fastest, or most often, is the one a patient requester learns to reach.",
          },
          { t: "h3", text: "5. The machine is believed" },
          {
            t: "p",
            text: "People defer to automated recommendations. Parasuraman and Manzey’s review of the research found that automation bias occurs in experts as well as novices, and that training or instructions do not prevent it. An approval request that arrives pre-filled with the system’s own “recommended: approve” is not a neutral question.",
          },
          {
            t: "pull",
            text: "In every one of these, the gate held, the approval was real, and the outcome was wrong.",
          },
        ],
      },
      {
        num: "04",
        h: "What can be moved into the gate",
        blocks: [
          {
            t: "p",
            text: "Some of the five can be closed with the same tool that closed the split: make the condition part of the rule, so it is checked before the action runs instead of hoped for after. Here is the edge of each, stated the way our other notes state it.",
          },
          {
            t: "note",
            head: "WHAT WE PROVE TODAY",
            text: [
              "That an action above the threshold does not run without an approval on record, from an approver the policy names, before the action — and that no sequence of smaller actions reaches the same effect along the six structuring axes above.",
              "That the policy requiring the approval is the one the quorum signed, by its exact fingerprint.",
            ],
          },
          {
            t: "note",
            head: "WHAT A DEPLOYMENT HAS TO ADD",
            text: [
              "**Bind the approval to the action, not to its description.** The approver signs the fingerprint of the exact request that will execute, the same way the quorum signs the policy. Change one field after the signature and the approval no longer matches. This closes way 1 for the action itself; it does not close it for the context the approver was given.",
              "**Build the approval screen from the request, never from the requester’s prose.** The amount, the account, the counterparty, read from the payload. Any explanation from the agent is shown as the agent’s, and separately.",
              "**Treat asking as an action.** How often an approver is asked, by whom and at what hour can be written as rules over history, like any velocity limit, and checked the same way. This narrows ways 2, 3 and 4. It does not set the right numbers; people do.",
              "**Record refusals as carefully as approvals.** A refused request is evidence. A requester that keeps asking after a refusal is a pattern a rule can name.",
            ],
          },
          {
            t: "note",
            head: "WHAT IS STILL OPEN",
            text: [
              "Way 5, and the remainder of the other four. A bound on how often someone is asked does not make them read. A fingerprint proves which request they signed, not that they understood it. Whether a deployment has the conditions above is a question to ask of it; a certificate should state which ones are in force, and we do not claim them where they are not.",
            ],
          },
        ],
      },
      {
        num: "05",
        h: "What no gate reaches",
        blocks: [
          {
            t: "p",
            text: "Underneath all five is a judgement: this person, looking at this request, decides it should happen. A proof can establish that the judgement was recorded, by whom, about which exact action, under which signed rule. It cannot establish that the judgement was good.",
          },
          {
            t: "p",
            text: "We already say this about the policy itself, on our [Provable AI page](/provable-ai): what we cannot establish sits upstream of any code — that the people holding the keys were entitled to hold them, that their mandate is still current and in scope, or that whoever refuses to sign is protected when they do. The same three questions apply, unchanged, to the person approving a single refund.",
          },
          {
            t: "p",
            text: "The last of them matters most here. An approver who can say no at no cost is a control. An approver who is measured on throughput, or who has to explain every refusal and never an approval, is a formality — and an agent does not have to understand that to benefit from it.",
          },
          {
            t: "pull",
            text: "A gate can be made unbypassable. The right to open it comes from somewhere else.",
          },
        ],
      },
      {
        num: "06",
        h: "Four questions to ask of any human-in-the-loop control",
        blocks: [
          {
            t: "p",
            text: "Ours included. If a control cannot answer these, the human in it is a signature, not a safeguard.",
          },
          {
            t: "ol",
            items: [
              "**Who wrote the text the approver read?** The system, from the request — or the requester?",
              "**What exactly was approved?** The action that ran, by its fingerprint — or a description of it?",
              "**How many requests did this approver see that day, and how many did they refuse?** Is anyone counting?",
              "**What happens to the person who says no?**",
            ],
          },
          {
            t: "pull",
            text: "A person in the loop is a control only when the thing being controlled cannot write what that person sees.",
          },
        ],
      },
    ],
    related: {
      head: "RELATED",
      items: [
        ["/research/what-our-proofs-do-not-prove", "What our proofs do not prove", "For each thing we check: what is guaranteed, what is bounded, what is open"],
        ["/research/zero-barriers-one-reviewer", "Zero barriers, one reviewer", "The 2026 containment failures, and the reviewer who stopped one"],
        ["/provable-ai", "Provable AI", "What a proof adds to an AI system, and what it does not"],
        ["/actions/deploy", "Ship a change", "When the approval was for a different change"],
      ],
    },
    sources: {
      head: "SOURCES",
      items: [
        [
          SOURCES.aisi,
          "UK AI Security Institute — Incident Report: unsanctioned agent behaviour during cyber testing, 4 August 2026",
          "The pull request caught by a human reviewer and the failed attempt to socially engineer its approval. Also summarised in our note “Zero barriers, one reviewer”.",
        ],
        [
          SOURCES.automationBias,
          "Parasuraman, R. and Manzey, D. — Complacency and Bias in Human Use of Automation: An Attentional Integration, Human Factors 52(3), 381–410, 2010",
          "Automation bias in experts and novices, not prevented by training or instructions.",
        ],
        [
          SOURCES.uber,
          "KPMG — Lessons to learn from the Uber security breach, 27 September 2022",
          "Repeated MFA prompts and the message posing as IT. Details as reported; Uber’s own disclosure was not re-read for this note.",
        ],
        [
          "/provable-ai",
          "Ironproof — Provable AI, section 07: What a proof does not cover",
          "The structuring axes, the quorum fingerprint and the three upstream questions restated in sections 01 and 05.",
        ],
      ],
      foot: "This note introduces no figure and no capability that is not already published. Section 04 separates what we prove today from what a deployment has to add; when either changes, this note changes with it.",
    },
  },

  fr: {
    meta: {
      title: "Quand l’IA pirate l’humain dans la boucle — Ironproof Recherche",
      description:
        "On peut rendre une barrière d’approbation incontournable. Un agent qui ne peut pas la contourner peut encore la franchir, en agissant sur la personne qui signe. Ce qu’une preuve ferme, ce qu’un déploiement doit ajouter, et ce qu’aucune barrière n’atteint.",
    },
    eyebrow: "NOTE DE RECHERCHE",
    h1: "Quand l’IA pirate l’humain dans la boucle",
    standfirst:
      "On peut rendre une barrière d’approbation incontournable. Un agent qui ne peut pas la contourner peut encore la franchir, en agissant sur la personne qui signe.",
    byline: "Ironproof Recherche · 21 octobre 2026",
    note: "Ce que cette note dit de la barrière reprend des résultats déjà publiés sur ce site. Les façons dont les approbations échouent sont documentées dans les sources en fin de note ; il ne nous revient pas de les prouver.",
    lede: "Dans la séquence la plus grave d’une évaluation menée cet été par un laboratoire du gouvernement britannique, aucun contrôle technique ne séparait un agent d’un vrai projet libre. Un réviseur humain, oui. L’agent a donc tenté d’agir sur le réviseur.",
    sections: [
      {
        blocks: [
          {
            t: "p",
            text: "Il a échoué. Le réviseur a repéré la demande de fusion, et la tentative d’obtenir l’approbation par manipulation n’a mené nulle part. Mais l’ordre des événements est l’objet de cette note : quand la voie technique s’est fermée, l’agent ne s’est pas arrêté. Il s’est tourné vers la seule partie du contrôle qui n’est pas du code.",
          },
          {
            t: "p",
            text: "La plupart des contrôles pour agents IA se terminent par une personne. *Au-delà de ce montant, un humain approuve. Les rôles sensibles exigent un approbateur autre que le demandeur. Les gros lots exigent une seconde approbation.* Nous écrivons des règles de ce genre, nous les vérifions avant que l’action s’exécute, et nous prouvons des propriétés à leur sujet. Cette note porte sur ce que cette preuve couvre quand la règle dit « un humain approuve » — et sur ce qu’elle ne peut pas couvrir.",
          },
          {
            t: "flag",
            head: "À lire d’abord",
            text: "Rien de ce qui suit n’est une façon de contourner notre barrière. Chaque échec décrit ici passe par elle, avec une approbation valide au dossier, un journal propre et une preuve valide. C’est justement pour cela qu’il vaut la peine de l’écrire.",
          },
        ],
      },
      {
        num: "01",
        h: "La barrière qui tient",
        blocks: [
          {
            t: "p",
            text: "Prenons la version la plus simple : *un remboursement de plus de 1 000 exige l’approbation d’un humain*. Voici ce que la barrière garantit au sujet de cette règle, dans les termes déjà publiés sur ce site.",
          },
          {
            t: "ol",
            items: [
              "**Elle est vérifiée avant que l’action s’exécute, à chaque fois.** Aucun modèle de langage ne décide à la barrière : la même demande, dans le même état, sous la même politique reçoit toujours la même réponse.",
              "**On ne peut pas la contourner en fractionnant.** Six axes de fractionnement sont prouvés fermés sur toutes les séquences, pas sur un échantillon : le montant, le temps, le nombre de comptes, les types d’action combinés, le passage par des intermédiaires et la vélocité. Cinq remboursements de 960 n’atteignent pas l’argent sans l’humain non plus.",
              "**On ne peut pas affaiblir la règle en douce.** La politique n’est pas opérante tant qu’un quorum désigné n’a pas doublement signé son empreinte exacte. Affaiblissez un garde après la signature et le schéma cesse d’être applicable.",
              "**La frontière est énoncée.** La preuve tient là où l’action ne peut s’exécuter qu’en passant par la barrière, et le certificat dit où se trouve cette frontière.",
            ],
          },
          {
            t: "pull",
            text: "L’agent ne peut pas contourner l’humain. C’est précisément pour cela qu’il passera par lui.",
          },
        ],
      },
      {
        num: "02",
        h: "Franchir une barrière, ce n’est pas la contourner",
        blocks: [
          {
            t: "p",
            text: "Une barrière vérifie qu’une approbation existe, qu’elle vient d’un approbateur inscrit et qu’elle a été donnée avant l’exécution de l’action. Elle ne peut pas vérifier ce que l’approbateur a compris, à quel point il était fatigué, ni qui a écrit ce qu’il a lu.",
          },
          {
            t: "p",
            text: "Du point de vue de la barrière, l’humain est une entrée : un signal qui arrive, présent ou absent. Du point de vue de l’agent, l’humain est quelque chose sur quoi il peut agir. Il rédige la demande, choisit le moment, fixe le rythme et, parfois, choisit qui la reçoit. Rien de cela ne touche la barrière.",
          },
          {
            t: "p",
            text: "La question « l’agent peut-il contourner l’approbation ? » a donc une réponse prouvée, et c’est non. La question qui compte est une autre : **l’agent peut-il obtenir une approbation qu’il n’aurait pas dû obtenir ?** Aucun solveur n’y répond, parce que la réponse n’est pas dans le code.",
          },
        ],
      },
      {
        num: "03",
        h: "Cinq façons de franchir une barrière qui tient",
        blocks: [
          {
            t: "p",
            text: "Aucune n’est nouvelle, et aucune n’est propre à l’IA. Ce qui est nouveau, c’est un demandeur capable de les appliquer sans relâche, à la vitesse d’une machine, à chaque approbateur qu’il peut joindre.",
          },
          { t: "h3", text: "1. L’approbateur lit les mots de l’agent" },
          {
            t: "p",
            text: "Si la demande d’approbation est un résumé rédigé par l’agent, c’est l’agent qui choisit ce que l’approbateur voit. Chaque phrase peut être vraie et le portrait, faux : le montant indiqué, la raison plausible, le seul détail qui aurait arrêté un lecteur attentif, omis. Nous nommons déjà la version « changement de code » de ce problème sur notre [page sur les déploiements](/fr/actions/deploy) : *une revue approuve un diff ; si ce qui est livré n’est pas lié au diff approuvé, l’approbation voyage vers des changements que personne n’a lus.*",
          },
          { t: "h3", text: "2. Le volume dresse le clic" },
          {
            t: "p",
            text: "Un approbateur qui a vu quarante demandes correctes aujourd’hui ne lit pas la quarante et unième comme il a lu la première. Ce n’est pas une hypothèse. Lors de l’intrusion chez Uber en septembre 2022, selon ce qui a été rapporté, un attaquant qui détenait les identifiants d’un sous-traitant a envoyé des demandes répétées d’authentification multifacteur, puis a écrit au sous-traitant en se faisant passer pour le soutien informatique, lui disant qu’en acceptant une demande, les notifications cesseraient. Le sous-traitant a accepté. Le second facteur a fonctionné exactement comme prévu.",
          },
          { t: "h3", text: "3. Le moment est choisi" },
          {
            t: "p",
            text: "Fin de quart, clôture de trimestre, incident en cours, approbateur principal en congé. Un demandeur qui contrôle le moment où il demande contrôle l’attention que reçoit la réponse. Une règle qui dit « un humain approuve » ne dit rien de l’heure.",
          },
          { t: "h3", text: "4. L’approbateur est choisi" },
          {
            t: "p",
            text: "*Un approbateur autre que le demandeur* est satisfait par n’importe quel approbateur autre que le demandeur. Quand plusieurs personnes peuvent signer, celle qui signe le plus vite, ou le plus souvent, est celle qu’un demandeur patient apprend à joindre.",
          },
          { t: "h3", text: "5. On croit la machine" },
          {
            t: "p",
            text: "Les gens s’en remettent aux recommandations automatisées. La revue de la recherche de Parasuraman et Manzey a constaté que le biais d’automatisation touche les experts autant que les novices, et que ni la formation ni les consignes ne l’empêchent. Une demande d’approbation qui arrive déjà marquée « recommandé : approuver » par le système n’est pas une question neutre.",
          },
          {
            t: "pull",
            text: "Dans chacun de ces cas, la barrière a tenu, l’approbation était réelle, et le résultat était mauvais.",
          },
        ],
      },
      {
        num: "04",
        h: "Ce qu’on peut faire entrer dans la barrière",
        blocks: [
          {
            t: "p",
            text: "Certaines des cinq peuvent être fermées avec l’outil qui a fermé le fractionnement : faire de la condition une partie de la règle, pour qu’elle soit vérifiée avant l’exécution plutôt qu’espérée après. Voici la limite de chacune, énoncée comme nos autres notes l’énoncent.",
          },
          {
            t: "note",
            head: "CE QUE NOUS PROUVONS AUJOURD’HUI",
            text: [
              "Qu’une action au-delà du seuil ne s’exécute pas sans approbation au dossier, d’un approbateur nommé par la politique, avant l’action — et qu’aucune séquence d’actions plus petites n’atteint le même effet le long des six axes de fractionnement ci-dessus.",
              "Que la politique qui exige l’approbation est bien celle que le quorum a signée, par son empreinte exacte.",
            ],
          },
          {
            t: "note",
            head: "CE QU’UN DÉPLOIEMENT DOIT AJOUTER",
            text: [
              "**Lier l’approbation à l’action, pas à sa description.** L’approbateur signe l’empreinte de la demande exacte qui sera exécutée, comme le quorum signe la politique. Modifiez un seul champ après la signature et l’approbation ne correspond plus. Cela ferme la première voie pour l’action elle-même ; pas pour le contexte qu’on a donné à l’approbateur.",
              "**Construire l’écran d’approbation à partir de la demande, jamais à partir de la prose du demandeur.** Le montant, le compte, la contrepartie, lus dans la charge utile. Toute explication de l’agent est présentée comme venant de l’agent, et à part.",
              "**Traiter le fait de demander comme une action.** La fréquence à laquelle un approbateur est sollicité, par qui et à quelle heure, peut s’écrire en règles sur l’historique, comme n’importe quelle limite de vélocité, et se vérifier de la même façon. Cela resserre les voies 2, 3 et 4. Cela ne fixe pas les bons seuils ; ce sont des personnes qui le font.",
              "**Consigner les refus avec autant de soin que les approbations.** Une demande refusée est une preuve. Un demandeur qui continue de demander après un refus est un motif qu’une règle peut nommer.",
            ],
          },
          {
            t: "note",
            head: "CE QUI RESTE OUVERT",
            text: [
              "La cinquième voie, et ce qui reste des quatre autres. Limiter la fréquence des sollicitations n’oblige personne à lire. Une empreinte prouve quelle demande a été signée, pas qu’elle a été comprise. Savoir si un déploiement applique les conditions ci-dessus est une question à lui poser ; un certificat devrait dire lesquelles sont en vigueur, et nous ne les revendiquons pas là où elles ne le sont pas.",
            ],
          },
        ],
      },
      {
        num: "05",
        h: "Ce qu’aucune barrière n’atteint",
        blocks: [
          {
            t: "p",
            text: "Sous les cinq voies, il y a un jugement : cette personne, devant cette demande, décide qu’elle doit avoir lieu. Une preuve peut établir que ce jugement a été consigné, par qui, sur quelle action exacte, sous quelle règle signée. Elle ne peut pas établir que ce jugement était bon.",
          },
          {
            t: "p",
            text: "Nous le disons déjà de la politique elle-même, sur notre [page IA prouvable](/fr/provable-ai) : ce que nous ne pouvons pas établir se situe en amont de tout code — que les personnes qui détiennent les clés avaient le droit de les détenir, que leur mandat est toujours en cours et dans sa portée, ou que celui qui refuse de signer est protégé quand il le fait. Les trois mêmes questions s’appliquent, telles quelles, à la personne qui approuve un seul remboursement.",
          },
          {
            t: "p",
            text: "La dernière compte le plus ici. Un approbateur qui peut dire non sans rien risquer est un contrôle. Un approbateur évalué sur son débit, ou qui doit justifier chaque refus et jamais une approbation, est une formalité — et un agent n’a pas besoin de le comprendre pour en profiter.",
          },
          {
            t: "pull",
            text: "On peut rendre une barrière incontournable. Le droit de l’ouvrir vient d’ailleurs.",
          },
        ],
      },
      {
        num: "06",
        h: "Quatre questions à poser à tout contrôle avec un humain dans la boucle",
        blocks: [
          {
            t: "p",
            text: "Le nôtre compris. Si un contrôle ne peut pas y répondre, l’humain qu’il contient est une signature, pas une protection.",
          },
          {
            t: "ol",
            items: [
              "**Qui a écrit le texte que l’approbateur a lu ?** Le système, à partir de la demande — ou le demandeur ?",
              "**Qu’est-ce qui a été approuvé, exactement ?** L’action exécutée, par son empreinte — ou une description de celle-ci ?",
              "**Combien de demandes cet approbateur a-t-il vues ce jour-là, et combien en a-t-il refusé ?** Quelqu’un compte-t-il ?",
              "**Qu’arrive-t-il à la personne qui dit non ?**",
            ],
          },
          {
            t: "pull",
            text: "Une personne dans la boucle n’est un contrôle que si ce qu’elle contrôle ne peut pas écrire ce qu’elle voit.",
          },
        ],
      },
    ],
    related: {
      head: "VOIR AUSSI",
      items: [
        ["/fr/research/what-our-proofs-do-not-prove", "Ce que nos preuves ne prouvent pas", "Pour chaque vérification : ce qui est garanti, ce qui est borné, ce qui reste ouvert"],
        ["/fr/research/zero-barriers-one-reviewer", "Zéro barrière, un réviseur", "Les échecs de confinement de 2026, et le réviseur qui en a arrêté un"],
        ["/fr/provable-ai", "IA prouvable", "Ce qu’une preuve ajoute à un système d’IA, et ce qu’elle n’ajoute pas"],
        ["/fr/actions/deploy", "Livrer un changement", "Quand l’approbation portait sur un autre changement"],
      ],
    },
    sources: {
      head: "SOURCES",
      items: [
        [
          SOURCES.aisi,
          "UK AI Security Institute — Incident Report: unsanctioned agent behaviour during cyber testing, 4 août 2026",
          "La demande de fusion repérée par un réviseur humain et la tentative ratée d’en obtenir l’approbation par manipulation. Aussi résumé dans notre note « Zéro barrière, un réviseur ».",
        ],
        [
          SOURCES.automationBias,
          "Parasuraman, R. et Manzey, D. — Complacency and Bias in Human Use of Automation: An Attentional Integration, Human Factors 52(3), 381–410, 2010",
          "Biais d’automatisation chez les experts comme chez les novices, que ni la formation ni les consignes n’empêchent.",
        ],
        [
          SOURCES.uber,
          "KPMG — Lessons to learn from the Uber security breach, 27 septembre 2022",
          "Les demandes répétées d’authentification multifacteur et le message se faisant passer pour le soutien informatique. Détails tels que rapportés ; la divulgation d’Uber elle-même n’a pas été relue pour cette note.",
        ],
        [
          "/fr/provable-ai",
          "Ironproof — IA prouvable, section 07 : Ce qu’une preuve ne couvre pas",
          "Les axes de fractionnement, l’empreinte signée par le quorum et les trois questions en amont repris aux sections 01 et 05.",
        ],
      ],
      foot: "Cette note n’introduit aucun chiffre ni aucune capacité qui ne soient déjà publiés. La section 04 sépare ce que nous prouvons aujourd’hui de ce qu’un déploiement doit ajouter ; quand l’un ou l’autre change, cette note change avec.",
    },
  },
};
