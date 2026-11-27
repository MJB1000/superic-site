import { PortableText, type PortableTextComponents } from "@portabletext/react";
import NewsletterForm from "./NewsletterForm";
import type { ComponentProps } from "react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 mt-10 text-3xl font-extrabold tracking-tight text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-[22px] font-bold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-lg font-bold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-[1.7] text-body-text">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-border pl-4 text-secondary-text italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm text-primary">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 transition-colors hover:text-signal-green-light"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-1.5 text-body-text">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-1.5 text-body-text">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-[1.7]">{children}</li>,
    number: ({ children }) => <li className="text-base leading-[1.7]">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img
            src={`https://cdn.sanity.io/images/qs95bq7w/production/${value.asset._ref
              .replace("image-", "")
              .replace("-jpg", ".jpg")
              .replace("-png", ".png")
              .replace("-webp", ".webp")}`}
            alt={value.alt || ""}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center font-mono text-xs text-muted-text">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const borderColors: Record<string, string> = {
        tip: "border-primary",
        warning: "border-amber-500",
        info: "border-secondary-text",
      };
      const labelColors: Record<string, string> = {
        tip: "text-primary",
        warning: "text-amber-500",
        info: "text-secondary-text",
      };
      const type = value.type || "tip";
      return (
        <div
          className={`my-7 rounded-lg border-l-[3px] ${borderColors[type] || borderColors.tip} bg-primary/5 p-4`}
        >
          <p className={`mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${labelColors[type] || labelColors.tip}`}>
            {type === "tip" ? "> steal this" : `> ${type}`}
          </p>
          <p className="text-sm leading-relaxed text-secondary-text">{value.text}</p>
        </div>
      );
    },
    codeBlock: ({ value }) => (
      <div className="my-6 overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span className="h-2 w-2 rounded-full bg-muted" />
          </div>
          {value.filename && (
            <span className="font-mono text-[11px] text-muted-text">{value.filename}</span>
          )}
        </div>
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-[13px] leading-[1.7] text-secondary-text">
            {value.code}
          </code>
        </pre>
      </div>
    ),
    newsletterCta: ({ value }) => (
      <div className="my-8 rounded-xl border border-border bg-card p-7 text-center">
        <h3 className="mb-1.5 text-lg font-bold text-foreground">
          {value.heading || "Get the operator's briefing"}
        </h3>
        <p className="mb-4 text-[13px] text-secondary-text">
          {value.body || "One insight, one system, one link. Every Tuesday."}
        </p>
        <div className="mx-auto max-w-sm">
          <NewsletterForm compact source="post" />
        </div>
      </div>
    ),
  },
};

interface PortableTextRendererProps {
  content: ComponentProps<typeof PortableText>["value"];
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) return null;
  return <PortableText value={content} components={components} />;
}
