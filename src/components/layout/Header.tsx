import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  X,
  Mail,
  Phone,
  Search,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { hasEmail, hasPhone, siteConfig } from "@/lib/siteConfig";
import { categories } from "@/data/categories";
import { getMachinesByCategory, searchMachines } from "@/data/machines";
import { cn } from "@/lib/utils";
import { usePresence } from "@/lib/usePresence";
import { useMobileUi } from "@/contexts/MobileUiContext";

const otherNav = siteConfig.nav.filter((item) => item.href !== "/catalog");

function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("relative inline-block h-8 w-8 shrink-0 bg-logo", className)}
      aria-hidden
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
    >
      <span className="absolute inset-[3px] flex flex-col justify-center gap-[3px] overflow-hidden">
        <span className="h-[3px] w-full -rotate-45 bg-white/95" />
        <span className="h-[3px] w-full -rotate-45 bg-white/95" />
      </span>
    </span>
  );
}

export function Header() {
  const { menuOpen, setMenuOpen } = useMobileUi();
  const [deskOpen, setDeskOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? "turning");
  const location = useLocation();
  const navigate = useNavigate();
  const mobileOpenRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const deskToggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchId = useId();
  const mobile = usePresence(menuOpen, 280);

  useEffect(() => {
    setMenuOpen(false);
    setDeskOpen(false);
    setCatalogOpen(false);
  }, [location.pathname, location.search, setMenuOpen]);

  useEffect(() => {
    if (!deskOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (catalogOpen && menuOpen) {
          setCatalogOpen(false);
          return;
        }
        setMenuOpen(false);
        setDeskOpen(false);
        setCatalogOpen(false);
        (deskOpen ? deskToggleRef : mobileOpenRef).current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deskOpen, menuOpen, catalogOpen, setMenuOpen]);

  useEffect(() => {
    if (!deskOpen && !menuOpen) return;
    function onPointer(e: MouseEvent) {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (mobilePanelRef.current?.contains(t)) return;
      setDeskOpen(false);
      setMenuOpen(false);
      setCatalogOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [deskOpen, menuOpen, setMenuOpen]);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    closeAll();
    if (!q) {
      navigate("/catalog");
      return;
    }
    const hits = searchMachines(q);
    if (hits.length === 1) {
      navigate(`/machines/${hits[0].slug}`);
    } else {
      navigate(`/docs?q=${encodeURIComponent(q)}`);
    }
  }

  function closeAll() {
    setMenuOpen(false);
    setDeskOpen(false);
    setCatalogOpen(false);
  }

  const categoryList = (
    <ul className="p-2">
      {categories.map((cat) => {
        const count = getMachinesByCategory(cat.id).length;
        const active = activeCat === cat.id;
        return (
          <li key={cat.id}>
            <Link
              to={`/catalog/${cat.slug}`}
              onMouseEnter={() => setActiveCat(cat.id)}
              onClick={closeAll}
              className={cn(
                "flex items-baseline justify-between gap-3 px-3 py-2.5 font-display text-sm font-semibold uppercase tracking-tight transition-colors duration-200 ease-soft sm:text-base",
                active ? "bg-white text-accent" : "text-ink hover:bg-white hover:text-accent",
              )}
            >
              <span>{cat.title}</span>
              <span className="font-sans text-xs font-medium text-ink-faint">[{count}]</span>
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          to="/catalog"
          onClick={closeAll}
          className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-accent transition-colors duration-200 ease-soft hover:bg-white hover:text-ink"
        >
          Посмотреть все
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </li>
    </ul>
  );

  const catalogSearch = (
    <form onSubmit={submitSearch} className="flex border-b border-line bg-white">
      <label className="sr-only" htmlFor={searchId}>
        Поиск модели
      </label>
      <input
        id={searchId}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Найти модель…"
        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
        autoComplete="off"
      />
      <button
        type="submit"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-brand text-white"
        aria-label="Искать"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );

  const catalogCta = (
    <div className="grid gap-2 border-t border-line bg-brand p-3 text-white sm:grid-cols-[1fr_auto] sm:items-end sm:p-4">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
          Подбор
        </div>
        <p className="mt-1 text-sm leading-snug">Станок под задачу производства</p>
      </div>
      <Link
        to="/solutions"
        onClick={closeAll}
        className="inline-flex items-center justify-center gap-2 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink"
      >
        Подобрать
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );

  /** Desktop / tablet: full catalog block, no scroll */
  const deskCatalogPanel = (
    <div className="border border-line bg-canvas-soft">
      {catalogSearch}
      {categoryList}
      {catalogCta}
    </div>
  );

  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>

      {/* Mobile — drill-down: main list ↔ catalog list */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 edge-chrome pt-[max(0.75rem,var(--safe-top))] md:hidden">
        <Link
          to="/"
          className="chip-logo chip-shell pointer-events-auto flex h-12 shrink-0 items-center gap-2 bg-white px-3 shadow-frame"
          onClick={closeAll}
        >
          <BrandMark className="h-7 w-7" />
          <span className="font-display text-[12px] font-bold uppercase tracking-tight text-ink">
            {siteConfig.brand}
          </span>
        </Link>

        <div
          ref={mobilePanelRef}
          className={cn(
            "chip-menu chip-shell pointer-events-auto relative ml-auto bg-white shadow-frame transition-[width] duration-280 ease-out",
            mobile.visible ? "w-[min(calc(100vw-9rem),20rem)]" : "h-12 w-auto",
          )}
        >
          {!mobile.mounted ? (
            <button
              ref={mobileOpenRef}
              type="button"
              className="flex h-12 items-center justify-center pl-4 pr-3"
              aria-label="Открыть меню"
              aria-expanded={false}
              onClick={() => {
                setMenuOpen(true);
                setCatalogOpen(false);
              }}
            >
              <span className="font-display text-[12px] font-bold uppercase tracking-[0.06em] text-ink">
                Меню
              </span>
            </button>
          ) : (
            <div className={cn("menu-panel-body", mobile.visible && "is-open")}>
              <div className="flex h-12 items-center">
                {catalogOpen ? (
                  <button
                    type="button"
                    className="inline-flex h-12 flex-1 items-center gap-1 px-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-180 ease-out hover:text-accent"
                    onClick={() => setCatalogOpen(false)}
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0" />
                    Меню
                  </button>
                ) : (
                  <span className="flex-1" />
                )}
                <button
                  ref={mobileOpenRef}
                  type="button"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-180 ease-out hover:text-accent"
                  aria-label="Закрыть меню"
                  aria-expanded={menuOpen}
                  onClick={closeAll}
                >
                  <X className="h-5 w-5 text-ink" strokeWidth={2.25} />
                </button>
              </div>

              <nav className="border-t border-line" aria-label="Мобильная навигация">
                {catalogOpen ? (
                  <div className="animate-fade-in bg-canvas-soft">
                    {catalogSearch}
                    {categoryList}
                    {catalogCta}
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="flex w-full min-h-11 items-center justify-between gap-2 border-b border-line-soft px-3 py-3 text-left font-display text-sm font-semibold uppercase tracking-tight text-ink transition-colors duration-180 ease-out hover:bg-canvas-soft"
                      onClick={() => setCatalogOpen(true)}
                    >
                      <span className="inline-flex items-center gap-2">
                        <LayoutGrid className="h-4 w-4 text-accent" />
                        Каталог
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" />
                    </button>

                    {otherNav.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          cn(
                            "block border-b border-line-soft px-3 py-3 font-display text-sm font-semibold tracking-tight text-ink transition-colors duration-180 ease-out hover:bg-canvas-soft",
                            isActive && "text-accent",
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}

                    <div className="space-y-2 p-4">
                      {hasPhone() ? (
                        <a
                          href={siteConfig.company.phoneHref}
                          className="flex min-h-11 items-center gap-2 border border-line px-3 text-sm text-ink transition-colors duration-180 ease-out hover:border-accent hover:bg-canvas-soft"
                        >
                          <Phone className="h-4 w-4 text-accent" />
                          {siteConfig.company.phone}
                        </a>
                      ) : null}
                      {hasEmail() ? (
                        <a
                          href={`mailto:${siteConfig.company.email}`}
                          className="flex min-h-11 items-center gap-2 border border-line px-3 text-sm text-ink transition-colors duration-180 ease-out hover:border-accent hover:bg-canvas-soft"
                        >
                          <Mail className="h-4 w-4 text-accent" />
                          {siteConfig.company.email}
                        </a>
                      ) : null}
                      <Link
                        to="/contacts?type=quote"
                        onClick={closeAll}
                        className="btn-primary w-full"
                      >
                        Получить КП
                      </Link>
                    </div>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Tablet / Desktop */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:block">
        <div className="edge-chrome-md flex w-full items-start justify-between gap-3 pt-[max(1.25rem,var(--safe-top))] lg:gap-4 lg:pt-[max(1.5rem,var(--safe-top))]">
          <Link
            to="/"
            onClick={closeAll}
            className="chip-logo chip-shell pointer-events-auto inline-flex shrink-0 items-center gap-3 bg-white px-4 py-3 shadow-frame"
          >
            <BrandMark className="h-9 w-9" />
            <span className="font-display text-lg font-bold uppercase tracking-tight text-ink lg:text-xl">
              {siteConfig.brand}
            </span>
          </Link>

          <div
            ref={panelRef}
            className={cn(
              "chip-menu chip-shell pointer-events-auto relative bg-white shadow-frame",
              deskOpen && "min-w-0 max-w-[min(100%,calc(100%-10.5rem))]",
            )}
          >
            <div className="flex h-14 w-fit max-w-full">
              {deskOpen ? (
                <nav className="flex h-14 min-w-0 max-w-full items-center gap-0.5 overflow-x-auto overscroll-x-contain pl-2 pr-1 animate-fade-in [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-0 lg:gap-0.5">
                  <button
                    type="button"
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-180 ease-out lg:px-2.5 lg:text-[12px]",
                      catalogOpen ? "bg-brand text-white" : "text-ink hover:bg-canvas-soft hover:text-accent",
                    )}
                    aria-expanded={catalogOpen}
                    onClick={() => setCatalogOpen((v) => !v)}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    Каталог
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-280 ease-out",
                        catalogOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {otherNav.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        cn(
                          "shrink-0 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors duration-180 ease-out hover:bg-canvas-soft hover:text-ink lg:px-2.5 lg:text-[12px]",
                          isActive && "text-ink",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}

                  <Link
                    to="/contacts?type=quote"
                    onClick={closeAll}
                    className="ml-1 shrink-0 bg-brand px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-180 ease-out hover:bg-accent-hover lg:px-3 lg:text-[11px]"
                  >
                    Получить КП
                  </Link>
                </nav>
              ) : null}

              <button
                ref={deskToggleRef}
                type="button"
                className="inline-flex h-14 shrink-0 items-center justify-center px-4 font-display text-xs font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-180 ease-out hover:text-accent"
                aria-label={deskOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={deskOpen}
                onClick={() => {
                  if (deskOpen) {
                    setDeskOpen(false);
                    setCatalogOpen(false);
                  } else {
                    setDeskOpen(true);
                  }
                }}
              >
                {deskOpen ? <X className="h-5 w-5" strokeWidth={2.25} /> : "Меню"}
              </button>
            </div>

            {deskOpen && catalogOpen ? (
              <div className="animate-fade-in border-t border-line px-3 pb-3 pt-3">
                {deskCatalogPanel}
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}
