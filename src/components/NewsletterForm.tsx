import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

/** Where a form sits. Sent to Beehiiv as utm_campaign so signups can be told apart. */
export type SignupSource = "hero" | "training" | "community" | "footer" | "post" | "newsletter";

interface NewsletterFormProps {
  compact?: boolean;
  buttonLabel?: string;
  emailLabel?: string;
  source: SignupSource;
}

type Status = "idle" | "loading" | "success" | "invalid" | "error";

/**
 * Every signup form posts here. /api/subscribe holds the Beehiiv key
 * server-side (api/subscribe.ts) — the browser never talks to Beehiiv.
 */
export default function NewsletterForm({
  compact,
  buttonLabel = "Subscribe",
  emailLabel = "Email address",
  source,
}: NewsletterFormProps) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real people never see it
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus(res.status === 400 ? "invalid" : "error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="font-mono text-sm text-primary">
        You're in — see you in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>
      <label htmlFor={emailId} className="sr-only">{emailLabel}</label>
      <input
        id={emailId}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        className={`min-w-0 flex-[1_1_160px] rounded-lg border border-border bg-card px-4 font-sans text-sm text-foreground placeholder:text-muted-text transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 ${
          compact ? "py-2.5" : "py-3.5"
        }`}
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className={`h-auto rounded-lg bg-primary font-semibold text-primary-foreground transition-colors duration-200 hover:opacity-90 active:opacity-80 disabled:opacity-50 ${
          compact ? "px-4 py-2.5 text-sm" : "px-6 py-3.5 text-sm"
        }`}
      >
        {status === "loading" ? "Sending…" : buttonLabel}
      </Button>
      {status === "invalid" && (
        <p role="alert" className="mt-2 w-full font-mono text-xs text-destructive">That email doesn't look right — check it and try again.</p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 w-full font-mono text-xs text-destructive">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
