import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";
import NowStrip from "./NowStrip";
import BitBand from "./BitBand";
import { PixelRule } from "./BitGraphics";

export default function Footer() {
  return (
    <footer className="relative bg-card">
      {/* 8-bit horizon: the page white drives down into the night plate */}
      <BitBand height={128} />
      <div className="blend-dark-top relative mx-auto max-w-[1180px] px-5 py-14 sm:px-8">

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          {/* Newsletter CTA */}
          <div>
            <h3 className="label-mono !text-foreground">Learn with me, weekly</h3>
            <p className="mb-5 mt-2 max-w-[42ch] text-[14px] leading-relaxed text-secondary-text">
              One email a week: what I tested, what worked, and how to try it yourself.
            </p>
            <div className="max-w-md">
              <NewsletterForm compact source="footer" />
            </div>
          </div>
          <div className="md:max-w-[280px] md:justify-self-end">
            <NowStrip />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 opacity-60">
          <PixelRule />
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-mono text-[11px] text-muted-text">
            © {new Date().getFullYear()} Super Eye See (IC)
          </span>
          <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.12em]">
            <Link
              to="/social"
              className="text-muted-text transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-text transition-colors hover:text-foreground"
            >
              Twitter/X
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-text transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <Link
              to="/newsletter"
              className="text-muted-text transition-colors hover:text-foreground"
            >
              Newsletter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
