import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-11 items-center justify-between gap-4 border-b border-white/5 text-xs text-steel-300">
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              {siteConfig.email}
            </a>
          </div>
          <span className="hidden sm:inline">Прямой дистрибьютор SZGH</span>
        </div>

        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="font-display text-3xl font-bold uppercase tracking-[0.06em] text-white">
              {siteConfig.brand}
            </span>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-steel-400 sm:inline">
              SZGH CNC
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav
              .filter((item) => item.label !== "Станки")
              .map((item) => (
                <NavLink
                  key={item.href + item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "rounded-sm px-2.5 py-2 text-sm text-steel-200 transition hover:bg-white/5 hover:text-white",
                      isActive && "bg-white/5 text-white",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contacts?type=quote" className="btn-primary hidden sm:inline-flex">
              Получить КП
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-white lg:hidden"
              aria-label="Меню"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink-900 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {siteConfig.nav
              .filter((item) => item.label !== "Станки")
              .map((item) => (
                <NavLink
                  key={item.href + item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-3 py-3 text-sm text-steel-100 hover:bg-white/5"
                >
                  {item.label}
                </NavLink>
              ))}
            <Link
              to="/contacts?type=quote"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Получить КП
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
