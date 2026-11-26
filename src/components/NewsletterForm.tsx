import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  compact?: boolean;
  buttonLabel?: string;
  emailLabel?: string;
}

export default function NewsletterForm({ compact, buttonLabel = "Subscribe", emailLabel = "Email address" }: NewsletterFormProps) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch(
        "https://api.beehiiv.com/v2/publications/pub_8115cd79-d2a8-48ff-a97b-2ca6b47b9ac1/subscriptions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, utm_source: "website" }),
        }
      );
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="font-mono text-sm text-primary">
        You're in — see you in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
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
      {status === "error" && (
        <p role="alert" className="mt-2 w-full font-mono text-xs text-destructive">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
