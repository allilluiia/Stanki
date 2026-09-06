import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { useMobileUi } from "@/contexts/MobileUiContext";

const navItems = siteConfig.nav.filter((item) => item.label !== "Станки");

export function Header() {
  const { menuOpen, setMenuOpen } = useMobileUi();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, setMenuOpen]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const menu = menuOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col bg-ink-950 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
            <span className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-white">
              {siteConfig.brand}
            </span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-white"
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href + item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-sm px-3 py-3.5 font-display text-xl uppercase tracking-wide text-steel-100 transition active:bg-white/10",
                    isActive && "bg-white/5 text-accent-soft",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-4 space-y-3 border-t border-white/10 pb-8 pt-5 safe-bottom">
              <a
                href={siteConfig.phoneHref}
                className="flex min-h-12 items-center gap-3 rounded-sm border border-white/10 px-4 text-sm text-steel-100"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent-soft" />
                <span className="truncate">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex min-h-12 items-center gap-3 rounded-sm border border-white/10 px-4 text-sm text-steel-100"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent-soft" />
                <span className="truncate">{siteConfig.email}</span>
              </a>
              <Link
                to="/contacts?type=quote"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Получить КП
              </Link>
            </div>
          </nav>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink-950/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-none items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20">
          <Link
            to="/"
            className="min-w-0"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-white sm:text-3xl">
              {siteConfig.brand}
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href + item.label}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-sm px-2.5 py-2 text-[13px] text-steel-200 transition hover:bg-white/5 hover:text-white",
                    isActive && "bg-white/5 text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/contacts?type=quote"
              className="btn-primary hidden !min-h-10 !px-4 !py-2 text-xs md:inline-flex"
            >
              Получить КП
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-white lg:hidden"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      {menu}
    </>
  );
}
