import { expect, test, type Page } from "@playwright/test";

/** The three homepage forms, located by the section they live in. */
const homepageForms = [
  { source: "hero", form: (page: Page) => page.locator("form").first(), button: "Subscribe" },
  { source: "training", form: (page: Page) => page.locator("#training form"), button: "Join the waitlist" },
  { source: "community", form: (page: Page) => page.locator("#community form"), button: "Join the lab" },
];

test("forms go through /api/subscribe, never straight to Beehiiv", async ({ page }) => {
  const beehiivCalls: string[] = [];
  page.on("request", (req) => {
    if (req.url().includes("beehiiv.com")) beehiivCalls.push(req.url());
  });

  await page.goto("/");
  const hero = page.locator("form").first();
  await hero.getByRole("textbox").fill("e2e@example.com");

  // Real dev handler, no API key configured → 503 → friendly error, not a crash.
  const responsePromise = page.waitForResponse("**/api/subscribe");
  await hero.getByRole("button", { name: "Subscribe" }).click();
  const response = await responsePromise;

  expect(response.status()).toBe(503);
  await expect(hero.getByRole("alert")).toHaveText(/Something went wrong/);
  expect(beehiivCalls).toEqual([]);
});

for (const { source, form, button } of homepageForms) {
  test(`${source} form shows success and sends source="${source}"`, async ({ page }) => {
    let payload: Record<string, unknown> | undefined;
    await page.route("**/api/subscribe", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });

    await page.goto("/");
    const target = form(page);
    await target.scrollIntoViewIfNeeded();
    await target.getByRole("textbox").fill("e2e@example.com");
    await target.getByRole("button", { name: button }).click();

    await expect(page.getByRole("status").filter({ hasText: "You're in" })).toBeVisible();
    expect(payload).toEqual({ email: "e2e@example.com", source, company: "" });
  });
}
