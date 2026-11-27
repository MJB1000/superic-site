// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { handleSubscribe, normaliseEmail, normaliseSource } from "./subscribe";

const ENV = { BEEHIIV_API_KEY: "test-key", BEEHIIV_PUBLICATION_ID: "pub_test" };

function post(body: unknown): Request {
  return new Request("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function beehiiv(status: number, text = "{}") {
  return vi.fn<typeof fetch>().mockResolvedValue(new Response(text, { status }));
}

describe("handleSubscribe", () => {
  it("forwards a valid signup to Beehiiv with the server-side key", async () => {
    const fetchImpl = beehiiv(201);
    const res = await handleSubscribe(post({ email: "  Jo@Example.com ", source: "training" }), ENV, fetchImpl);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://api.beehiiv.com/v2/publications/pub_test/subscriptions");
    expect((init?.headers as Record<string, string>).authorization).toBe("Bearer test-key");
    expect(JSON.parse(init?.body as string)).toMatchObject({
      email: "jo@example.com",
      utm_source: "website",
      utm_campaign: "training",
      reactivate_existing: true,
      send_welcome_email: true,
    });
  });

  it("falls back to the default publication ID", async () => {
    const fetchImpl = beehiiv(201);
    await handleSubscribe(post({ email: "a@b.co", source: "hero" }), { BEEHIIV_API_KEY: "k" }, fetchImpl);
    expect(fetchImpl.mock.calls[0][0]).toContain("pub_8115cd79-d2a8-48ff-a97b-2ca6b47b9ac1");
  });

  it("rejects an invalid email without calling Beehiiv", async () => {
    const fetchImpl = beehiiv(201);
    const res = await handleSubscribe(post({ email: "not-an-email" }), ENV, fetchImpl);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "invalid_email" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const res = await handleSubscribe(post("{nope"), ENV, beehiiv(201));
    expect(res.status).toBe(400);
  });

  it("silently accepts honeypot submissions without calling Beehiiv", async () => {
    const fetchImpl = beehiiv(201);
    const res = await handleSubscribe(post({ email: "bot@spam.com", company: "Acme" }), ENV, fetchImpl);
    expect(res.status).toBe(200);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("returns 503 when the API key is missing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = beehiiv(201);
    const res = await handleSubscribe(post({ email: "a@b.co" }), {}, fetchImpl);
    expect(res.status).toBe(503);
    expect(fetchImpl).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("hides Beehiiv's error details from the browser", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await handleSubscribe(post({ email: "a@b.co" }), ENV, beehiiv(401, '{"errors":"secret detail"}'));
    expect(res.status).toBe(502);
    const text = await res.text();
    expect(text).not.toContain("secret detail");
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("returns 502 when Beehiiv is unreachable", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("network down"));
    const res = await handleSubscribe(post({ email: "a@b.co" }), ENV, fetchImpl);
    expect(res.status).toBe(502);
    errorSpy.mockRestore();
  });

  it("only accepts POST", async () => {
    const res = await handleSubscribe(new Request("http://localhost/api/subscribe"), ENV, beehiiv(201));
    expect(res.status).toBe(405);
    expect(res.headers.get("allow")).toBe("POST");
  });
});

describe("normalisers", () => {
  it("normaliseEmail trims, lowercases and validates", () => {
    expect(normaliseEmail(" A@B.CO ")).toBe("a@b.co");
    expect(normaliseEmail("a@b")).toBeNull();
    expect(normaliseEmail(42)).toBeNull();
    expect(normaliseEmail(`${"x".repeat(250)}@b.co`)).toBeNull();
  });

  it("normaliseSource keeps safe slugs and drops anything else", () => {
    expect(normaliseSource("community")).toBe("community");
    expect(normaliseSource("<script>")).toBe("website");
    expect(normaliseSource(undefined)).toBe("website");
  });
});
