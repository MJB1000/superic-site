import { useState, useEffect, useCallback } from "react";
import { X, ExternalLink, Loader2 } from "lucide-react";

interface LabPreviewModalProps {
  url: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

export default function LabPreviewModal({ url, title, open, onClose }: LabPreviewModalProps) {
  const [iframeStatus, setIframeStatus] = useState<"loading" | "loaded" | "blocked">("loading");

  useEffect(() => {
    if (!open) {
      setIframeStatus("loading");
      return;
    }
    // Fallback timeout — if iframe hasn't signalled load in 6s, assume blocked
    const timer = setTimeout(() => {
      setIframeStatus((prev) => (prev === "loading" ? "blocked" : prev));
    }, 6000);
    return () => clearTimeout(timer);
  }, [open]);

  const handleLoad = useCallback(() => {
    setIframeStatus("loaded");
  }, []);

  const handleError = useCallback(() => {
    setIframeStatus("blocked");
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 flex w-[90vw] max-w-6xl flex-col rounded-xl border border-border bg-card shadow-2xl" style={{ height: "80vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h3 className="font-mono text-sm font-semibold text-foreground">{title}</h3>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-primary transition-colors hover:text-primary/80"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-muted-text transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden rounded-b-xl">
          {iframeStatus === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <Loader2 size={24} className="animate-spin text-primary" />
            </div>
          )}

          {iframeStatus === "blocked" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <p className="font-mono text-sm text-secondary-text">
                This project can't be previewed in an iframe.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-4 py-2 font-mono text-xs font-semibold text-primary transition-colors hover:bg-primary/30"
              >
                Open in new tab <ExternalLink size={14} />
              </a>
            </div>
          ) : (
            <iframe
              src={url}
              title={`Preview of ${title}`}
              sandbox="allow-scripts allow-same-origin"
              className="h-full w-full border-0"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
