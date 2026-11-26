import { Link, useLocation } from "react-router-dom";
import { FileText, FlaskConical, Wrench, BookOpen, Mail, Home, Instagram } from "lucide-react";
import NowStrip from "./NowStrip";
import { sectionAccents } from "@/lib/sectionTheme";

const links = [
  { to: "/", label: "Home", icon: Home, accent: sectionAccents.home.hsl },
  { to: "/blog", label: "Blog", icon: FileText, accent: sectionAccents.blog.hsl },
  { to: "/projects", label: "Projects", icon: FlaskConical, accent: sectionAccents.projects.hsl },
  { to: "/social", label: "Instagram", icon: Instagram, accent: sectionAccents.social.hsl },
  { to: "/tools", label: "Tools", icon: Wrench, accent: sectionAccents.tools.hsl },
  { to: "/reads", label: "Reads", icon: BookOpen, accent: sectionAccents.reads.hsl },
];

export default function SideNav() {
  const { pathname } = useLocation();
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <aside className="sticky top-0 hidden h-screen w-[228px] shrink-0 flex-col border-r border-border bg-card/50 px-4 py-5 md:flex">
      <Link
        to="/"
        className="mb-7 block font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-foreground"
      >
        super eye see
      </Link>

      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-text">
        // quick nav
      </p>

      <nav className="flex flex-col gap-0.5">
        {links.map(({ to, label, icon: Icon, accent }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.12em] transition-colors ${
                active ? "bg-background" : "text-muted-text hover:bg-background hover:text-foreground"
              }`}
              style={active ? { color: `hsl(${accent})` } : undefined}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/newsletter"
        className="mt-5 flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Mail size={13} />
        Subscribe
      </Link>

      <div className="mt-auto pt-6">
        <NowStrip />
      </div>
    </aside>
  );
}
