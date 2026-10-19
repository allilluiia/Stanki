import { Link } from "react-router-dom";
import { hasEmail, hasPhone, siteConfig } from "@/lib/siteConfig";
import { categories } from "@/data/categories";
import { CompanyRequisites } from "@/components/CompanyRequisites";

export function Footer() {
  const { company } = siteConfig;

  return (
    <footer className="border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:pb-0">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="font-display text-2xl font-bold tracking-tight text-ink">
            {siteConfig.brand}
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {siteConfig.tagline}.
          </p>
          <div className="mt-6">
            <CompanyRequisites compact />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Каталог
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            {categories.map((c) => (
              <li key={c.id}>
                <Link className="link-quiet" to={`/catalog/${c.slug}`}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Компания
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li>
              <Link className="link-quiet" to="/service">
                Сервис
              </Link>
            </li>
            <li>
              <Link className="link-quiet" to="/docs">
                Документация
              </Link>
            </li>
            <li>
              <Link className="link-quiet" to="/about-szgh">
                О SZGH
              </Link>
            </li>
            <li>
              <Link className="link-quiet" to="/about">
                О компании
              </Link>
            </li>
            <li>
              <Link className="link-quiet" to="/contacts">
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Документы
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            {siteConfig.legalNav.map((item) => (
              <li key={item.href}>
                <Link className="link-quiet" to={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            {hasEmail() ? (
              <li>
                <a className="link-quiet" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </li>
            ) : null}
            {hasPhone() ? (
              <li>
                <a className="link-quiet" href={company.phoneHref}>
                  {company.phone}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-6 text-center text-xs tracking-wide text-ink-faint">
        © {new Date().getFullYear()} {siteConfig.brand}
        {company.legalName ? ` · ${company.legalName}` : ""}. Каталог оборудования
        SZGH.
      </div>
    </footer>
  );
}
