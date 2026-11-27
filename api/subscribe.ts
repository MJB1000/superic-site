/**
 * POST /api/subscribe — the single newsletter transport behind every signup
 * form on the site (hero, training waitlist, community, footer, posts,
 * /newsletter). Forms send { email, source }; this function adds the Beehiiv
 * API key server-side, so the key never reaches the browser.
 *
 * Runs as a Vercel Function (Web API signature). `bun run dev` serves the same
 * handler through a Vite middleware (see vite.config.ts).
 *
 * Env:
 *   BEEHIIV_API_KEY         required — Beehiiv API key (never commit it)
 *   BEEHIIV_PUBLICATION_ID  optional — defaults to the SuperIC publication
 *   SITE_URL                optional — sent to Beehiiv as referring_site
 *
 * Kept in one file on purpose: Vercel compiles each function file on its own,
 * and extensionless relative imports break under "type": "module".
 */

/** Environment variables (see the list above); compatible with process.env. */
export type SubscribeEnv = Record<string, string | undefined>;

/** Public identifier (not a secret) — the same ID Beehiiv shows in its UI. */
const DEFAULT_PUBLICATION_ID = "pub_8115cd79-d2a8-48ff-a97b-2ca6b47b9ac1";
const DEFAULT_SITE_URL = "https://supereyesee.com";
const BEEHIIV_TIMEOUT_MS = 8000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE_RE = /^[a-z0-9-]{1,32}$/;

function json(status: number, body: Record<string, unknown>, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });
}

/** Normalises and validates an email; returns null when it isn't usable. */
export function normaliseEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  return email;
}

/** Form label → utm_campaign. Anything unexpected collapses to "website". */
export function normaliseSource(value: unknown): string {
  return typeof value === "string" && SOURCE_RE.test(value) ? value : "website";
}

export async function handleSubscribe(
  request: Request,
  env: SubscribeEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { error: "method_not_allowed" }, { allow: "POST" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }
  if (typeof body !== "object" || body === null) {
    return json(400, { error: "invalid_json" });
  }
  const fields = body as Record<string, unknown>;

  // Honeypot: a visually hidden field people never fill in. Bots that do get a
  // fake success so they don't retry, and nothing is sent to Beehiiv.
  if (typeof fields.company === "string" && fields.company.trim() !== "") {
    return json(200, { ok: true });
  }

  const email = normaliseEmail(fields.email);
  if (!email) return json(400, { error: "invalid_email" });

  const apiKey = env.BEEHIIV_API_KEY?.trim();
  if (!apiKey) {
    console.error("[subscribe] BEEHIIV_API_KEY is not set — signups cannot be delivered.");
    return json(503, { error: "not_configured" });
  }
  const publicationId = env.BEEHIIV_PUBLICATION_ID?.trim() || DEFAULT_PUBLICATION_ID;

  try {
    const upstream = await fetchImpl(
      `https://api.beehiiv.com/v2/publications/${encodeURIComponent(publicationId)}/subscriptions`,
      {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "website",
          utm_medium: "signup_form",
          utm_campaign: normaliseSource(fields.source),
          referring_site: env.SITE_URL?.trim() || DEFAULT_SITE_URL,
        }),
        signal: AbortSignal.timeout(BEEHIIV_TIMEOUT_MS),
      },
    );

    if (upstream.ok) return json(200, { ok: true });

    // Log Beehiiv's reason for us; never forward it to the browser.
    const detail = await upstream.text().catch(() => "");
    console.error(`[subscribe] Beehiiv responded ${upstream.status}: ${detail.slice(0, 500)}`);
    return json(502, { error: "upstream_error" });
  } catch (error) {
    console.error("[subscribe] Beehiiv request failed:", error);
    return json(502, { error: "upstream_unreachable" });
  }
}

export function POST(request: Request): Promise<Response> {
  return handleSubscribe(request, process.env);
}
