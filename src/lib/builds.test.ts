import { describe, expect, it } from "vitest";
import { builds } from "./builds";

describe("build publication statuses", () => {
  it.each([
    ["Knowledge Vault", "live"],
    ["WiperTech Marketing Dashboard", "live"],
    ["Brand Intelligence Bot", "wip"],
    ["Automated Competitor Tracker", "wip"],
    ["Voice of Customer Tracker", "wip"],
    ["Super Eye See", "live"],
  ])("keeps %s marked %s", (name, status) => {
    expect(builds.find((build) => build.name === name)?.status).toBe(status);
  });
});