import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const navItems = siteConfig.nav.filter((item) => item.label !== "Станки");

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink-950/90 backdrop-blur-xl">
        <div className="container-page w-full">
          <div className="hidden h-9 items-center justify-between gap-4 border-b border-white/5 text-xs text-steel-300 md:flex">
            <div className="flex items-center gap-5">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-1.5 transition hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-accent-soft" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 transition hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-accent-soft" />
                {siteConfig.email}
              </a>
            </div>
            <span className="tracking-[0.12em] uppercase text-steel-400">
              Прямой дистрибьютор SZGH
            </span>
          </div>

          <div className="flex h-14 items-center justify-between gap-3 sm:h-16 md:h-[4.25rem]">
            <Link
              to="/"
              className="group flex min-w-0 items-baseline gap-2"
              onClick={() => setOpen(false)}
            >
              <span className="font-display text-[1.85rem] font-bold uppercase tracking-[0.06em] text-white sm:text-3xl">
                {siteConfig.brand}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-steel-400 sm:inline md:text-xs">
                SZGH CNC
              </span>
            </Link>

            <nav className="hidden items-center xl:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.href + item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "rounded-sm px-2.5 py-2 text-[13px] text-steel-200 transition hover:bg-white/5 hover:text-white 2xl:px-3",
                      isActive && "bg-white/5 text-white",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/contacts?type=quote"
                className="btn-primary hidden !min-h-10 !px-4 !py-2 text-xs md:inline-flex"
              >
                Получить КП
              </Link>
              <button
                type="button"
                className="relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-white xl:hidden"
                aria-label={open ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Outside sticky/backdrop header — otherwise fixed menu collapses to 0 height */}
      {open ? (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-16 sm:px-6 md:px-8">
            <span className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-white">
              {siteConfig.brand}
            </span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-white"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6 md:px-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href + item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-sm px-4 py-4 font-display text-2xl uppercase tracking-wide text-steel-100 transition hover:bg-white/5",
                    isActive && "bg-white/5 text-accent-soft",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-auto space-y-3 border-t border-white/10 pb-24 pt-6 safe-bottom sm:pb-8">
              <a
                href={siteConfig.phoneHref}
                className="flex min-h-12 items-center gap-3 rounded-sm border border-white/10 px-4 text-steel-100"
              >
                <Phone className="h-4 w-4 text-accent-soft" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex min-h-12 items-center gap-3 rounded-sm border border-white/10 px-4 text-steel-100"
              >
                <Mail className="h-4 w-4 text-accent-soft" />
                {siteConfig.email}
              </a>
              <Link
                to="/contacts?type=quote"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Получить коммерческое предложение
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
