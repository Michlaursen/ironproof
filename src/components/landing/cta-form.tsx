"use client";

import { useState } from "react";

/*
 * Request-access form. Client-side only for now (matches the reference landing:
 * clears the field and shows a thank-you). Wire to a real endpoint later.
 */
export function CtaForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setEmail("");
          setSubmitted(true);
        }}
        className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="work@company.com"
          aria-label="Work email"
          className="flex-1 border border-white/10 bg-black/50 px-5 py-3.5 text-neutral-200 placeholder-neutral-600 transition focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          className="track-mid bg-gradient-to-b from-white to-neutral-300 rounded-[5px] px-8 py-3.5 text-xs font-semibold text-ink shadow-lg shadow-white/10 transition hover:from-neutral-100 hover:to-white"
        >
          REQUEST ACCESS
        </button>
      </form>
      {submitted ? (
        <p className="mt-5 text-sm text-neutral-300">Thank you — we&apos;ll be in touch shortly.</p>
      ) : null}
    </>
  );
}
