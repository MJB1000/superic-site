import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead title="404 — Super Eye See (IC)" description="This page doesn't exist yet." />
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-4 font-mono text-sm text-primary">{"> error 404"}</p>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground">
            Route not found
          </h1>
          <p className="mb-8 text-[15px] text-secondary-text">
            This page doesn't exist yet. Maybe it will soon.
          </p>
          <Link
            to="/"
            className="font-mono text-sm text-primary transition-colors hover:text-primary/80"
          >
            {">"} cd /home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
