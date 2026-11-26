import SEOHead from "@/components/SEOHead";
import NewsletterForm from "@/components/NewsletterForm";

export default function Newsletter() {
  return (
    <>
      <SEOHead
        title="The Weekly Email — Super Eye See (IC)"
        description="One email a week from a marketer learning AI in public — the experiments, the systems, and how to run them yourself."
      />

      <div className="mx-auto max-w-[720px] px-6 py-20 text-center">
        <p className="mb-4 font-mono text-xs text-primary opacity-80">
          // learning in public
        </p>

        <h1 className="mb-4 text-3xl font-extrabold tracking-[-0.035em] text-foreground md:text-4xl">
Learn AI marketing<br />with me
        </h1>

        <p className="mx-auto mb-10 max-w-[520px] text-[15px] leading-relaxed text-secondary-text">
          I'm a marketer figuring out AI week by week. I send what I tested, what
          actually worked, and how you can run it yourself — no guru voice, just notes
          from someone doing the work alongside you.
        </p>

        <div className="mx-auto max-w-[420px]">
          <NewsletterForm />
          <p className="mt-4 font-mono text-[11px] text-muted-text">
            Sent every Tuesday — unsubscribe anytime
          </p>
        </div>

        {/* What you get */}
        <div className="mx-auto mt-16 max-w-md text-left">
          <h2 className="mb-5 font-mono text-[11px] font-medium uppercase tracking-widest text-primary opacity-80">
            {">"} what's inside
          </h2>
          <div className="space-y-4">
            {[
              { num: "01", title: "One idea", desc: "The thing that clicked for me this week, explained plainly." },
              { num: "02", title: "One build", desc: "An experiment, automation or workflow — with enough detail to rebuild it." },
              { num: "03", title: "One read", desc: "The best thing I read, and what I took away from it." },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                <span className="flex-shrink-0 font-mono text-xs text-muted-text">{item.num}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-[13px] text-secondary-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
