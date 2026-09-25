"use client";

import { useState } from "react";
import { defaultLocale, type Locale } from "@/content";
import { type L, pick, NBSP } from "./i18n";

type State = "idle" | "loading" | "done" | "error";

const T: L<{
  placeholder: string;
  ariaEmail: string;
  submit: string;
  sending: string;
  done: string;
  error: string;
}> = {
  en: {
    placeholder: "work@company.com",
    ariaEmail: "Work email",
    submit: "START A PILOT",
    sending: "SENDING…",
    done: "Thank you — request received. We’ll be in touch shortly.",
    error:
      "Something went wrong — check the email and try again, or write to hello@ironproof.ai.",
  },
  fr: {
    placeholder: "vous@entreprise.com",
    ariaEmail: "Courriel professionnel",
    submit: "DÉMARRER UN PILOTE",
    sending: "ENVOI…",
    done: "Merci — demande reçue. Nous vous reviendrons sous peu.",
    error: `Une erreur est survenue — vérifiez le courriel et réessayez, ou écrivez à${NBSP}hello@ironproof.ai.`,
  },
};

/*
 * Request-access form — posts the lead to /api/request-access (server-side
 * validated, destination configured via env). Shows loading / success / error.
 */
export function CtaForm({ locale = defaultLocale }: { locale?: Locale }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const t = pick(T, locale);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail("");
        setState("done");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder={t.placeholder}
          aria-label={t.ariaEmail}
          className="min-w-0 flex-1 rounded-[5px] border border-white/10 bg-black/50 px-5 py-3.5 text-neutral-200 placeholder-neutral-600 transition focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="track-mid whitespace-nowrap rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? t.sending : t.submit}
        </button>
      </form>
      {state === "done" ? (
        <p className="mt-5 text-sm text-neutral-300">{t.done}</p>
      ) : null}
      {state === "error" ? (
        <p className="mt-5 text-sm" style={{ color: "#ffb4b4" }}>
          {t.error}
        </p>
      ) : null}
    </>
  );
}
