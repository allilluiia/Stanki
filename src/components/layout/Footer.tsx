import { Link } from "react-router-dom";
import { hasEmail, hasPhone, siteConfig } from "@/lib/siteConfig";
import { categories } from "@/data/categories";
import { CompanyRequisites } from "@/components/CompanyRequisites";
import { resolveMediaUrl } from "@/lib/media";

export function Footer() {
  const { company, developer } = siteConfig;

  return (
    <footer className="border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:pb-0">
      <div className="container-page grid gap-12 py-20 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12 lg:py-24">
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
                <Link className="link-quiet" to={`/catalog#${c.slug}`}>
                  {c.navTitle}
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
      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row sm:gap-6">
          <p className="text-center text-xs tracking-wide text-ink-faint sm:text-left">
            © {new Date().getFullYear()} {siteConfig.brand}
            {company.legalName ? ` · ${company.legalName}` : ""}. Каталог
            оборудования SZGH.
          </p>
          <a
            href={developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-ink-faint transition-colors duration-180 ease-out hover:text-ink"
            aria-label={`${developer.name} - разработка сайта`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
              Разработка
            </span>
            <img
              src={resolveMediaUrl(developer.logo)}
              alt={developer.name}
              width={40}
              height={50}
              className="h-9 w-auto opacity-70 transition-opacity duration-180 ease-out group-hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
