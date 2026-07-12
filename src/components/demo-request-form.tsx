"use client";

import { useState, type FormEvent } from "react";
import { IconVerify } from "./icons";

const HUBSPOT_PORTAL_ID = "343262416";
const HUBSPOT_FORM_ID = "e9072082-8533-4d98-93d4-e02054dc1d37";
const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

type Status = "idle" | "submitting" | "success" | "error";

export function DemoRequestForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: data.get("firstname") },
            { name: "lastname", value: data.get("lastname") },
            { name: "email", value: data.get("email") },
            { name: "company", value: data.get("company") },
            { name: "message", value: data.get("message") },
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-8 text-center">
        <IconVerify className="h-6 w-6 text-accent" />
        <p className="text-base font-medium text-foreground">
          Request received.
        </p>
        <p className="text-sm text-muted">
          We&rsquo;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-xl flex-col gap-4 text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="firstname"
          type="text"
          placeholder="First name"
          required
          className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <input
          name="lastname"
          type="text"
          placeholder="Last name"
          required
          className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>
      <input
        name="email"
        type="email"
        placeholder="Work email"
        required
        className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <input
        name="company"
        type="text"
        placeholder="Company"
        required
        className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <textarea
        name="message"
        placeholder="What are you looking to verify?"
        rows={3}
        className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a demo"}
      </button>

      {status === "error" ? (
        <p className="text-sm text-rose-400">
          Something went wrong — please email{" "}
          <a href="mailto:hello@ironproof.ai" className="underline">
            hello@ironproof.ai
          </a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}
