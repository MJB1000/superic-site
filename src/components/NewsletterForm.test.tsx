import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NewsletterForm from "./NewsletterForm";

function submit(email: string) {
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: email } });
  fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));
}

describe("NewsletterForm", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("posts to /api/subscribe with its source label and shows success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<NewsletterForm source="hero" />);

    submit("jo@example.com");

    expect(await screen.findByRole("status")).toHaveTextContent("You're in");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/subscribe");
    expect(JSON.parse(init.body)).toEqual({ email: "jo@example.com", source: "hero", company: "" });
  });

  it("asks the visitor to check their email on a 400", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 400 })));
    render(<NewsletterForm source="footer" />);
    submit("jo@example.com");
    expect(await screen.findByRole("alert")).toHaveTextContent("doesn't look right");
  });

  it("shows a retry message when the server fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 502 })));
    render(<NewsletterForm source="footer" />);
    submit("jo@example.com");
    expect(await screen.findByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("shows a retry message when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    render(<NewsletterForm source="footer" />);
    submit("jo@example.com");
    expect(await screen.findByRole("alert")).toHaveTextContent("Something went wrong");
  });
});
