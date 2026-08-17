"use client";

import { useState } from "react";

type State = "idle" | "loading" | "done" | "error";

/*
 * Request-access form — posts the lead to /api/request-access (server-side
 * validated, destination configured via env). Shows loading / success / error.
 */
export function CtaForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

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
          placeholder="work@company.com"
          aria-label="Work email"
          className="flex-1 rounded-[5px] border border-white/10 bg-black/50 px-5 py-3.5 text-neutral-200 placeholder-neutral-600 transition focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="track-mid rounded-[5px] bg-gradient-to-b from-white to-neutral-300 px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "SENDING…" : "REQUEST ACCESS"}
        </button>
      </form>
      {state === "done" ? (
        <p className="mt-5 text-sm text-neutral-300">
          Thank you — request received. We&apos;ll be in touch shortly.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-5 text-sm" style={{ color: "#ffb4b4" }}>
          Something went wrong — check the email and try again, or write to hello@ironproof.ai.
        </p>
      ) : null}
    </>
  );
}
