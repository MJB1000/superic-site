import { expect, test } from "@playwright/test";

/**
 * Every route renders a heading without uncaught errors. Guards the lazily
 * loaded pages in App.tsx. Sanity-backed content may be empty locally
 * (Sanity only answers allow-listed origins), so this checks the page shell.
 */
const routes = ["/", "/blog", "/newsletter", "/projects", "/tools", "/reads", "/social"];

for (const route of routes) {
  test(`${route} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("unknown deep links show the 404 page", async ({ page }) => {
  await page.goto("/v4-matrix");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/not found/i);
});
