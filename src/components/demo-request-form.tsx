"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale, SiteContent } from "@/content";
import { IconVerify } from "./icons";

const HUBSPOT_PORTAL_ID = "343262416";
const HUBSPOT_FORM_ID: Record<Locale, string> = {
  en: "e9072082-8533-4d98-93d4-e02054dc1d37",
  fr: "6e706d61-db4e-4786-aa1f-50962240d7af",
};
const HUBSPOT_EMBED_SRC = "https://js.hsforms.net/forms/embed/v2.js";

type HubspotFormCreateOptions = {
  portalId: string;
  formId: string;
  target: string;
  locale?: string;
  onFormSubmitted?: () => void;
  onFormReady?: () => void;
};

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: HubspotFormCreateOptions) => void;
      };
    };
  }
}

let hubspotScriptPromise: Promise<void> | null = null;

function loadHubspotScript(): Promise<void> {
  if (window.hbspt) return Promise.resolve();
  if (hubspotScriptPromise) return hubspotScriptPromise;

  hubspotScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[src="${HUBSPOT_EMBED_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load HubSpot forms script")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = HUBSPOT_EMBED_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load HubSpot forms script"));
    document.body.appendChild(script);
  });

  return hubspotScriptPromise;
}

type Status = "loading" | "ready" | "success" | "error";

type DemoRequestFormProps = {
  content: SiteContent["finalCta"]["form"];
  locale: Locale;
};

export function DemoRequestForm({ content, locale }: DemoRequestFormProps) {
  const [status, setStatus] = useState<Status>("loading");
  const rawId = useId().replace(/:/g, "");
  const targetId = `hubspot-form-${rawId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadHubspotScript()
      .then(() => {
        if (cancelled || !window.hbspt || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        window.hbspt.forms.create({
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID[locale],
          target: `#${targetId}`,
          locale: locale === "fr" ? "fr" : "en",
          onFormReady: () => {
            if (!cancelled) setStatus("ready");
          },
          onFormSubmitted: () => {
            if (!cancelled) setStatus("success");
          },
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [locale, targetId]);

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-8 text-center">
        <IconVerify className="h-6 w-6 text-accent" />
        <p className="text-base font-medium text-foreground">
          {content.successTitle}
        </p>
        <p className="text-sm text-muted">{content.successBody}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-left">
      <div
        id={targetId}
        ref={containerRef}
        className="hubspot-form"
        style={status === "loading" ? { minHeight: "18rem" } : undefined}
      />

      {status === "error" ? (
        <p className="text-sm text-rose-400">
          {content.errorPre}
          <a href={`mailto:${content.errorLinkLabel}`} className="underline">
            {content.errorLinkLabel}
          </a>
          {content.errorPost}
        </p>
      ) : null}
    </div>
  );
}
