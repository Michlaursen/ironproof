import type { L } from "./i18n";

/*
 * The three checks of the traceability audit, once. The /traceability-audit
 * product page and the audit section of /modernization both read them, so the
 * two pages cannot describe two different audits.
 *
 * No figure on any third-party translation here, not even in this comment:
 * this repository is public. The measurements live in the private cobalt-ai
 * repository (verif_tierce) and come to the site only after the translator
 * has answered.
 */

export type TraceCheck = { title: string; body: string };

export const TRACE_CHECKS: L<readonly TraceCheck[]> = {
  en: [
    {
      title: "Cited sources",
      body: "“This method comes from that COBOL paragraph.” Does that paragraph exist in the program it cites?",
    },
    {
      title: "Data mapping",
      body: "“This Java field is that COBOL field, of this size.” Do both fields exist, with the stated size and a compatible type?",
    },
    {
      title: "Compliance claims",
      body: "“This calculation matches the original: passed.” Is the calculation actually in the new code?",
    },
  ],
  fr: [
    {
      title: "Les sources citées",
      body: "« Cette méthode vient de tel paragraphe COBOL. » Ce paragraphe existe-t-il dans le programme cité ?",
    },
    {
      title: "La correspondance des données",
      body: "« Ce champ Java est tel champ COBOL, de telle taille. » Les deux champs existent-ils, avec la taille annoncée et un type compatible ?",
    },
    {
      title: "Les fiches de conformité",
      body: "« Ce calcul est conforme à l’original : réussi. » Le calcul est-il vraiment dans le nouveau code ?",
    },
  ],
};

/** Audit and behavior proof are two reports (Dom, 2026-10-19): the note says which is which. */
export const TRACE_NOTE: L<string> = {
  en: "These are simple checks, not a proof: they tell you whether the paperwork is true. The proof tells you whether the new code does the same thing.",
  fr: "Ce sont des contrôles simples, pas une preuve : ils vous disent si les documents disent vrai. La preuve, elle, vous dit si le nouveau code fait la même chose.",
};
