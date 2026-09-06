import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink-900/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-3xl font-bold uppercase tracking-wide text-white">
            {siteConfig.brand}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-steel-300">
            {siteConfig.tagline}. Поставка, пусконаладка, поддержка и запасные
            части.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
            Каталог
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel-200">
            {categories.map((c) => (
              <li key={c.id}>
                <Link className="hover:text-white" to={`/catalog/${c.slug}`}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
            Компания
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel-200">
            <li>
              <Link className="hover:text-white" to="/service">
                Сервис
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/docs">
                Документация
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/about-szgh">
                О SZGH
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/about">
                О компании
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-400">
            Контакты
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel-200">
            <li>
              <a className="hover:text-white" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </a>
            </li>
            <li className="text-steel-400">{siteConfig.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-steel-500">
        © {new Date().getFullYear()} {siteConfig.brand}. Официальный дистрибьютор
        SZGH.
      </div>
    </footer>
  );
}
