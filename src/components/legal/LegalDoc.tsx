import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

export function LegalDoc({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page page-start">
      <h1 className="section-title">{title}</h1>
      <p className="section-lead">{lead}</p>
      {updated ? (
        <p className="mt-3 text-xs uppercase tracking-[0.12em] text-ink-faint">
          Редакция от {updated}
        </p>
      ) : null}

      <div className="stack-after-lead max-w-3xl space-y-8 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>

      <nav
        className="stack-after-lead flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-8 text-xs uppercase tracking-[0.1em] text-ink-faint"
        aria-label="Другие документы"
      >
        {siteConfig.legalNav.map((item) => (
          <Link key={item.href} to={item.href} className="link-quiet hover:text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="heading-3 text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
