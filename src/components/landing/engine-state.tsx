import { defaultLocale, type Locale } from "@/content";
import { type L, pick } from "./i18n";
import { PLATFORM_COPY } from "./platform-copy";

/*
 * State of the engine (Dom, 2026-10-16): what works today, what is in
 * progress, what is open -- the three verdicts applied to ourselves.
 *
 * The status lines of the three applications are read from PLATFORM_COPY,
 * never re-typed, so this page cannot drift from the home page. Only the
 * open problems are written here. Update AS_OF with every change.
 */

const AS_OF = "2026-10-17";

type Item = { title: string; body: string; href?: string; link?: string };
type Column = { key: "works" | "progress" | "open"; label: string; items: Item[] };

const T: L<{
  eyebrow: string;
  title: string;
  lead: string;
  asOf: string;
  works: string;
  progress: string;
  open: string;
  gateTitle: string;
  labTitle: string;
  labBody: string;
  labLink: string;
  verifyLink: string;
  cTitle: string;
  cobolTitle: string;
  readMore: string;
  cRebuild: string;
  translateTitle: string;
  translateBody: string;
  misraTitle: string;
  misraBody: string;
  cBody: string;
  cobolBody: string;
  rustFixTitle: string;
  rustFixBody: string;
  openItems: Item[];
  invite: string;
  inviteLink: string;
}> = {
  en: {
    eyebrow: "STATE OF THE ENGINE",
    title: "What works today. What is in progress. What is still open.",
    lead: "The same three states we give every result, applied to ourselves. Each line says how to check it.",
    asOf: "As of",
    works: "WORKS TODAY",
    progress: "IN PROGRESS",
    open: "OPEN PROBLEMS",
    gateTitle: "Authorization of critical actions",
    labTitle: "Try to get past the gate",
    labBody: "Four attacks against the sealed sample payment policy, computed in your browser. Some get through, and the page says exactly why.",
    labLink: "OPEN THE LAB",
    verifyLink: "CHECK A SEALED RECORD",
    cTitle: "C software security",
    cobolTitle: "Legacy modernization",
    readMore: "READ THE RESEARCH",
    cRebuild: "The checker is being rebuilt; earlier results are not presented as complete proofs.",
    translateTitle: "Code translation, checked by proof",
    translateBody: "A Python module of four functions with loops, translated to Rust. Equivalence is proved for every input series of up to six values, and the loops are proved for any per-step calculation. Beyond six values, 100,000 random runs found no difference. Test files are available to reviewers on request.",
    misraTitle: "MISRA C on translated code",
    misraBody: "The C translation of a signal-processing function passes the open-source MISRA C:2012 checker (cppcheck) on the whole program, and its equivalence with the Python original is re-proved. This is a free tool covering part of the rules, not a certification.",
    cBody: "Checking that a security fix really closes the flaw, on real fixes from open-source projects.",
    cobolBody: "IBM’s GenApp insurance programs, checked under a CICS model we write ourselves and tested against a real CICS. A run on z/OS and an outside replay are still to come.",
    rustFixTitle: "Security fix in Rust",
    rustFixBody: "A published flaw in a Rust library (RUSTSEC-2017-0004). The original code and a plausible false fix are both caught. The real fix is proved on the actual code for standard line lengths, and for any length on a hand-written model whose link to the code is not yet checked by a machine.",
    openItems: [
      {
        title: "Faithfulness",
        body: "Showing that the logic we check says the same thing as the original policy, code or program. A proof is only as good as this step.",
      },
      {
        title: "Fixes written by language models",
        body: "Proving that a C fix proposed by a model closes the flaw, not just that it passes the tests.",
      },
      {
        title: "COBOL that reads real data",
        body: "Equivalence for every input a program can receive, not for one run.",
      },
    ],
    invite: "Working on one of these? We want to take them on with university researchers.",
    inviteLink: "WRITE TO US",
  },
  fr: {
    eyebrow: "ÉTAT DU MOTEUR",
    title: "Ce qui fonctionne aujourd’hui. Ce qui est en cours. Ce qui reste ouvert.",
    lead: "Les trois états que nous donnons à chaque résultat, appliqués à nous-mêmes. Chaque ligne dit comment la vérifier.",
    asOf: "État au",
    works: "FONCTIONNE AUJOURD’HUI",
    progress: "EN COURS",
    open: "PROBLÈMES OUVERTS",
    gateTitle: "Autorisation des actions critiques",
    labTitle: "Essayez de passer la barrière",
    labBody: "Quatre attaques contre la politique de paiement scellée de l’exemple, calculées dans votre navigateur. Certaines passent, et la page dit exactement pourquoi.",
    labLink: "OUVRIR LE LABO",
    verifyLink: "VÉRIFIER UNE TRACE SCELLÉE",
    cTitle: "Sécurité du logiciel C",
    cobolTitle: "Modernisation des systèmes hérités",
    readMore: "LIRE LA RECHERCHE",
    cRebuild: "Le vérificateur est en reconstruction ; les résultats antérieurs ne sont pas présentés comme des preuves complètes.",
    translateTitle: "Traduction de code, vérifiée par preuve",
    translateBody: "Un module Python de quatre fonctions avec boucles, traduit en Rust. L’équivalence est prouvée pour toute série d’au plus six valeurs, et les boucles sont prouvées pour n’importe quel calcul à chaque pas. Au-delà de six valeurs, 100 000 essais au hasard n’ont trouvé aucune différence. Les fichiers du test sont disponibles sur demande pour un examen.",
    misraTitle: "MISRA C sur du code traduit",
    misraBody: "La traduction C d’une fonction de traitement de signal passe le vérificateur libre MISRA C:2012 (cppcheck) sur le programme complet, et son équivalence avec l’original Python est reprouvée. C’est un outil libre qui couvre une partie des règles, pas une certification.",
    cBody: "Vérifier qu’un correctif de sécurité ferme vraiment la faille, sur de vrais correctifs de projets open source.",
    cobolBody: "Les programmes d’assurance GenApp d’IBM, vérifiés sous un modèle CICS que nous écrivons nous-mêmes et confrontés à un vrai CICS. Une exécution sur z/OS et une reprise par un tiers restent à faire.",
    rustFixTitle: "Correctif de sécurité en Rust",
    rustFixBody: "Une faille publiée d’une librairie Rust (RUSTSEC-2017-0004). Le code d’origine et un faux correctif plausible sont tous deux attrapés. Le vrai correctif est prouvé sur le code réel pour les longueurs de ligne standard, et pour toute longueur sur un modèle écrit à la main, dont le lien avec le code n’est pas encore vérifié par une machine.",
    openItems: [
      {
        title: "La fidélité",
        body: "Montrer que la logique que nous vérifions dit la même chose que la politique, le code ou le programme d’origine. Une preuve ne vaut pas plus que cette étape.",
      },
      {
        title: "Les correctifs écrits par des modèles de langage",
        body: "Prouver qu’un correctif C proposé par un modèle ferme la faille, pas seulement qu’il passe les tests.",
      },
      {
        title: "Le COBOL qui lit de vraies données",
        body: "L’équivalence pour toutes les entrées qu’un programme peut recevoir, pas pour une seule exécution.",
      },
    ],
    invite: "Vous travaillez sur l’un de ces problèmes ? Nous voulons les attaquer avec des chercheurs universitaires.",
    inviteLink: "ÉCRIVEZ-NOUS",
  },
};

export function EngineState({ locale = defaultLocale }: { locale?: Locale }) {
  const t = pick(T, locale);
  const p = pick(PLATFORM_COPY, locale).pillars;
  const r = locale === defaultLocale ? "" : `/${locale}`;
  const [gate, c, cobol] = p;
  if (!gate || !c || !cobol) return null;

  const columns: Column[] = [
    {
      key: "works",
      label: t.works,
      items: [
        // Code first, then critical actions (Dom, 2026-10-19): order only, no line changed.
        { title: t.translateTitle, body: t.translateBody },
        { title: t.misraTitle, body: t.misraBody },
        { title: t.gateTitle, body: `${gate.body} ${gate.evidence ?? ""}`.trim(), href: `${r}/verify`, link: t.verifyLink },
        { title: t.labTitle, body: t.labBody, href: `${r}/lab`, link: t.labLink },
      ],
    },
    {
      key: "progress",
      label: t.progress,
      items: [
        { title: t.cobolTitle, body: t.cobolBody, href: `${r}/modernization`, link: t.readMore },
        { title: t.cTitle, body: `${t.cBody} ${t.cRebuild}`, href: `${r}/software-security`, link: t.readMore },
        { title: t.rustFixTitle, body: t.rustFixBody },
      ],
    },
    { key: "open", label: t.open, items: t.openItems },
  ];

  return (
    <section id="state" className="relative z-10 mx-auto max-w-7xl px-6 pb-16 md:px-14">
      <p className="seal-label track-mid mb-4 text-xs">{t.eyebrow}</p>
      <h2 className="max-w-4xl font-serif text-3xl font-medium leading-tight text-neutral-100 md:text-5xl">{t.title}</h2>
      <p className="mt-5 max-w-2xl text-lg font-light text-neutral-300">{t.lead}</p>
      <p className="track-mid mt-4 text-xs text-neutral-500">
        {t.asOf} <time dateTime={AS_OF}>{AS_OF}</time>
      </p>
      <div className="engine-state mt-12">
        {columns.map((col) => (
          <div key={col.key} className={`engine-col engine-${col.key}`}>
            <p className="engine-label track-mid">
              <span className="engine-mark" aria-hidden="true" />
              {col.label}
            </p>
            <ul className="engine-items">
              {col.items.map((it) => (
                <li key={it.title} className="engine-item">
                  <p className="engine-title font-serif">{it.title}</p>
                  <p className="engine-body">{it.body}</p>
                  {it.href && it.link ? (
                    <a href={it.href} className="engine-link track-mid">
                      {it.link} <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl font-light text-neutral-300">
        {t.invite}{" "}
        <a href="mailto:hello@ironproof.ai" className="engine-link track-mid">
          {t.inviteLink} <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
    </section>
  );
}
