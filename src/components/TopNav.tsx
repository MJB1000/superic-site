import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/blog", label: "Blog" },
  { to: "/projects", label: "Projects" },
  { to: "/social", label: "Instagram" },
  { to: "/tools", label: "Tools" },
  { to: "/reads", label: "Reads" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur md:hidden">
      <div className="mx-auto flex h-[58px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-foreground"
        >
          super eye see
        </Link>


        <div className="flex items-center gap-2">
          <Link
            to="/newsletter"
            className="hidden rounded-md bg-primary/10 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/15 sm:inline-flex"
          >
            Subscribe
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-secondary-text hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          {[...links, { to: "/newsletter", label: "Newsletter" }].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-secondary-text hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
