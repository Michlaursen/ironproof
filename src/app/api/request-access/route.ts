/*
 * POST /api/request-access — captures a REQUEST ACCESS lead.
 *
 * Destination is pluggable via env (set ONE to actually receive leads):
 *   - LEAD_WEBHOOK_URL : any endpoint (Zapier/Make/n8n/Slack) — receives {email,...}
 *   - RESEND_API_KEY + LEAD_TO_EMAIL : sends an email via Resend
 * If neither is set, the lead is still recorded in the server logs (Vercel
 * function logs) and success is returned — a lead is never silently dropped.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
 * Rate limit: 5 requests per IP per 10 minutes. In memory, so it holds per
 * serverless instance, not across the fleet: it stops a single script from
 * flooding the form, not a distributed attack. A shared store (Upstash, Vercel
 * KV) would be the next step if the form is ever targeted.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  const first = fwd ? fwd.split(",")[0]?.trim() : "";
  return first || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Bound memory: drop the oldest entries once too many IPs are tracked.
  if (hits.size > MAX_TRACKED_IPS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return false;
}

export async function POST(request: Request) {
  try {
    if (rateLimited(clientIp(request), Date.now())) {
      return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }
    const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    // Server-side validation — never trust the client.
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const webhook = process.env.LEAD_WEBHOOK_URL;
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    const at = new Date().toISOString();

    let delivered = false;
    try {
      if (webhook) {
        const r = await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, source: "ironproof-landing", at }),
        });
        delivered = r.ok;
      } else if (resendKey && to) {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
          body: JSON.stringify({
            from: "Ironproof <onboarding@resend.dev>",
            to,
            subject: "New Ironproof access request",
            text: `Access request from: ${email}\nAt: ${at}`,
          }),
        });
        delivered = r.ok;
      }
    } catch {
      delivered = false;
    }

    // Always record so no lead is lost, even before a destination is configured.
    console.log(`[request-access] email=${email} delivered=${delivered} at=${at}`);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
