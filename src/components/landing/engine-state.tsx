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

const AS_OF = "2026-10-16";

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
        { title: t.gateTitle, body: `${gate.body} ${gate.evidence ?? ""}`.trim(), href: `${r}/verify`, link: t.verifyLink },
        { title: t.labTitle, body: t.labBody, href: `${r}/lab`, link: t.labLink },
      ],
    },
    {
      key: "progress",
      label: t.progress,
      items: [
        { title: t.cTitle, body: `${c.evidence ?? ""} ${t.cRebuild}`.trim(), href: `${r}/software-security`, link: t.readMore },
        { title: t.cobolTitle, body: cobol.evidence ?? "", href: `${r}/modernization`, link: t.readMore },
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
