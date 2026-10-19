import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
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
import { usePresence, usePhasedExpand } from "@/lib/usePresence";
import { useMobileUi } from "@/contexts/MobileUiContext";

const otherNav = siteConfig.nav.filter((item) => item.href !== "/catalog");

/** Keep in sync with --dur-expand-x / --dur-expand-y / --dur-panel in index.css */
const EXPAND_X_MS = 320;
const EXPAND_Y_MS = 360;
const DRILL_MS = 280;
const DESK_TOGGLE_CLOSED = "9.75rem";
const DESK_TOGGLE_OPEN = "3.75rem";

function remPx(rem: number) {
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * (Number.isFinite(root) && root > 0 ? root : 16);
}

function measureDeskOpenWidth(panel: HTMLElement, toggleOpenPx: number) {
  const nav = panel.querySelector("nav");
  if (!nav) return null;
  const w = Math.ceil(nav.scrollWidth + toggleOpenPx);
  return w > 280 ? w : null;
}

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
  /** Mobile: drill into a category to list models (Abamet-style level 2) */
  const [drillCatId, setDrillCatId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? "turning");
  const location = useLocation();
  const navigate = useNavigate();
  const mobileOpenRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const logoMobileRef = useRef<HTMLAnchorElement>(null);
  const logoDeskRef = useRef<HTMLAnchorElement>(null);
  const deskToggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Target open width of the desk chip — set before open so width can tween cleanly. */
  const [deskBarWidth, setDeskBarWidth] = useState<number | null>(null);
  const searchId = useId();
  const deskSearchId = useId();
  const mobilePhase = usePhasedExpand(menuOpen, EXPAND_X_MS, EXPAND_Y_MS);
  const mobileCat = usePresence(catalogOpen, DRILL_MS);
  const mobileDrill = usePresence(Boolean(drillCatId), DRILL_MS);
  const deskNav = usePresence(deskOpen, EXPAND_X_MS);
  const deskCat = usePresence(deskOpen && catalogOpen, EXPAND_Y_MS);

  useEffect(() => {
    if (!deskNav.mounted) setDeskBarWidth(null);
  }, [deskNav.mounted]);

  /** Catalog jump-nav switches to 2×3 while desk menu is open */
  useEffect(() => {
    document.documentElement.classList.toggle("is-desk-nav-open", deskOpen);
    return () => document.documentElement.classList.remove("is-desk-nav-open");
  }, [deskOpen]);

  /** Mobile menu open — jump hides (no gap left between chips) */
  useEffect(() => {
    document.documentElement.classList.toggle("is-mobile-nav-open", menuOpen);
    return () => document.documentElement.classList.remove("is-mobile-nav-open");
  }, [menuOpen]);

  /** Live logo/menu chip widths → catalog jump sits in the gap between them */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const root = document.documentElement;

    const publish = () => {
      const logo = mq.matches ? logoDeskRef.current : logoMobileRef.current;
      const menu = mq.matches ? panelRef.current : mobilePanelRef.current;
      if (logo) {
        const w = Math.round(logo.getBoundingClientRect().width);
        if (w > 0) root.style.setProperty("--header-logo-live-w", `${w}px`);
      }
      if (menu) {
        const w = Math.round(menu.getBoundingClientRect().width);
        if (w > 0) root.style.setProperty("--header-menu-live-w", `${w}px`);
      }
    };

    publish();
    const ro = new ResizeObserver(publish);
    for (const el of [
      logoMobileRef.current,
      logoDeskRef.current,
      mobilePanelRef.current,
      panelRef.current,
    ]) {
      if (el) ro.observe(el);
    }
    mq.addEventListener("change", publish);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", publish);
      window.removeEventListener("resize", publish);
      root.style.removeProperty("--header-logo-live-w");
      root.style.removeProperty("--header-menu-live-w");
    };
  }, [
    deskBarWidth,
    deskNav.visible,
    deskCat.mounted,
    menuOpen,
    mobilePhase.wide,
  ]);

  const prepareDeskOpenWidth = () => {
    if (!panelRef.current) return;
    const next = measureDeskOpenWidth(panelRef.current, remPx(3.75));
    if (next != null) setDeskBarWidth(next);
  };

  const drillCategory = useMemo(
    () => categories.find((c) => c.id === drillCatId) ?? null,
    [drillCatId],
  );
  const drillMachines = useMemo(
    () => (drillCatId ? getMachinesByCategory(drillCatId) : []),
    [drillCatId],
  );
  const deskMachines = useMemo(
    () => getMachinesByCategory(activeCat),
    [activeCat],
  );
  const deskActiveCategory = useMemo(
    () => categories.find((c) => c.id === activeCat) ?? categories[0],
    [activeCat],
  );

  useEffect(() => {
    setMenuOpen(false);
    setDeskOpen(false);
    setCatalogOpen(false);
    setDrillCatId(null);
  }, [location.pathname, location.search, setMenuOpen]);

  useEffect(() => {
    if (menuOpen || deskOpen || mobilePhase.active || deskNav.mounted || mobileCat.mounted) {
      return;
    }
    setCatalogOpen(false);
    setDrillCatId(null);
  }, [menuOpen, deskOpen, mobilePhase.active, deskNav.mounted, mobileCat.mounted]);

  useEffect(() => {
    if (!catalogOpen) setDrillCatId(null);
  }, [catalogOpen]);

  useEffect(() => {
    if (!drillCatId || !mobilePanelRef.current) return;
    const body = mobilePanelRef.current.querySelector(".menu-drill-sheet-body");
    body?.scrollTo({ top: 0, behavior: "auto" });
  }, [drillCatId]);

  useEffect(() => {
    if (!deskOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drillCatId && menuOpen) {
        setDrillCatId(null);
        return;
      }
      if (catalogOpen && (menuOpen || deskOpen)) {
        setCatalogOpen(false);
        return;
      }
      setMenuOpen(false);
      setDeskOpen(false);
      (deskOpen ? deskToggleRef : mobileOpenRef).current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deskOpen, menuOpen, catalogOpen, drillCatId, setMenuOpen]);

  useEffect(() => {
    if (!deskOpen && !menuOpen) return;
    let remove: (() => void) | undefined;
    const attachId = window.setTimeout(() => {
      function onPointer(e: MouseEvent) {
        const t = e.target as Node;
        if (panelRef.current?.contains(t)) return;
        if (mobilePanelRef.current?.contains(t)) return;
        setDeskOpen(false);
        setMenuOpen(false);
      }
      document.addEventListener("pointerdown", onPointer);
      remove = () => document.removeEventListener("pointerdown", onPointer);
    }, 0);
    return () => {
      window.clearTimeout(attachId);
      remove?.();
    };
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
      navigate(`/catalog?q=${encodeURIComponent(q)}`);
    }
  }

  function closeMenus() {
    setMenuOpen(false);
    setDeskOpen(false);
    setCatalogOpen(false);
  }

  function closeAll() {
    setMenuOpen(false);
    setDeskOpen(false);
    setCatalogOpen(false);
    setDrillCatId(null);
  }

  function mobileBack() {
    if (drillCatId) {
      setDrillCatId(null);
      return;
    }
    if (catalogOpen) {
      setCatalogOpen(false);
    }
  }

  const catalogSearch = (id: string) => (
    <form onSubmit={submitSearch} className="flex h-11 items-stretch border-b border-line bg-white">
      <label className="sr-only" htmlFor={id}>
        Поиск модели
      </label>
      <input
        id={id}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Искать модель…"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink-faint"
        autoComplete="off"
      />
      <button
        type="submit"
        className="inline-flex w-11 shrink-0 items-center justify-center bg-brand text-white"
        aria-label="Искать"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );

  const catalogCta = (
    <div className="grid gap-3 border-t border-line bg-brand p-3 text-white sm:grid-cols-[1fr_auto] sm:items-end sm:gap-4 sm:p-4">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
          Подбор
        </div>
        <p className="mt-1.5 text-sm leading-snug text-white">
          Станок под задачу производства
        </p>
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

  /** Desktop mega: lives inside the menu chip; chip stretches from the right */
  const deskCatalogPanel = (
    <div className="border-t border-line bg-canvas-soft">
      {catalogSearch(deskSearchId)}
      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <ul className="border-b border-line sm:border-b-0 sm:border-r sm:border-line">
          {categories.map((cat) => {
            const count = getMachinesByCategory(cat.id).length;
            const active = activeCat === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveCat(cat.id)}
                  onFocus={() => setActiveCat(cat.id)}
                  onClick={() => setActiveCat(cat.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-semibold tracking-tight transition-colors duration-180 ease-out sm:text-[15px]",
                    active
                      ? "bg-white text-ink shadow-[inset_3px_0_0_0_var(--c-brand)]"
                      : "text-ink-soft hover:bg-white hover:text-ink",
                  )}
                >
                  <span className="min-w-0 leading-snug">{cat.navTitle}</span>
                  <span
                    className={cn(
                      "shrink-0 font-sans text-xs tabular-nums",
                      active ? "text-ink-muted" : "text-ink-faint",
                    )}
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
          <li>
            <Link
              to="/catalog"
              onClick={closeAll}
              className="flex items-center justify-between gap-3 border-t border-line-soft px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors duration-180 ease-out hover:bg-white hover:text-ink"
            >
              Весь каталог
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </li>
        </ul>

        <div className="flex h-[20.5rem] flex-col bg-white sm:h-[22rem]">
          <div className="shrink-0 border-b border-line-soft px-3 py-2.5">
            <Link
              to={`/catalog/${deskActiveCategory?.slug ?? ""}`}
              onClick={closeAll}
              className="font-display text-sm font-semibold uppercase tracking-tight text-ink transition-colors hover:text-accent"
            >
              {deskActiveCategory?.title}
            </Link>
            <p className="mt-1 line-clamp-2 min-h-[2.25rem] text-xs leading-snug text-ink-faint">
              {deskActiveCategory?.description ?? "\u00a0"}
            </p>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1 [scrollbar-width:thin]">
            {deskMachines.map((m) => (
              <li key={m.slug}>
                <Link
                  to={`/machines/${m.slug}`}
                  onClick={closeAll}
                  className="flex items-center justify-between gap-2 px-3 py-2.5 transition-colors duration-180 ease-out hover:bg-canvas-soft"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-semibold tracking-tight text-ink">
                      {m.model}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-muted">
                      {m.name}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint" />
                </Link>
              </li>
            ))}
            {deskMachines.length === 0 ? (
              <li className="px-3 py-4 text-sm text-ink-faint">Нет моделей в категории</li>
            ) : null}
          </ul>
          <div className="mt-auto shrink-0 border-t border-line-soft p-2">
            <Link
              to={`/catalog/${deskActiveCategory?.slug ?? ""}`}
              onClick={closeAll}
              className="flex min-h-10 items-center justify-between gap-2 px-2 text-xs font-semibold uppercase tracking-[0.1em] text-accent transition-colors hover:text-ink"
            >
              Все модели категории
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      {catalogCta}
    </div>
  );

  const mobileMainNav = (
    <>
      <button
        type="button"
        tabIndex={mobilePhase.tall && !mobileCat.visible ? 0 : -1}
        className="flex w-full min-h-11 items-center justify-between gap-2 border-b border-line-soft px-3 py-3 text-left font-display text-sm font-semibold uppercase tracking-tight text-ink transition-colors duration-180 ease-out hover:bg-canvas-soft active:bg-canvas-soft"
        onClick={() => {
          setCatalogOpen(true);
          setDrillCatId(null);
        }}
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
          tabIndex={mobilePhase.tall && !mobileCat.visible ? 0 : -1}
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
            tabIndex={mobilePhase.tall && !mobileCat.visible ? 0 : -1}
            className="flex min-h-11 items-center gap-2 border border-line px-3 text-sm text-ink transition-colors duration-180 ease-out hover:border-accent hover:bg-canvas-soft"
          >
            <Phone className="h-4 w-4 text-accent" />
            {siteConfig.company.phone}
          </a>
        ) : null}
        {hasEmail() ? (
          <a
            href={`mailto:${siteConfig.company.email}`}
            tabIndex={mobilePhase.tall && !mobileCat.visible ? 0 : -1}
            className="flex min-h-11 items-center gap-2 border border-line px-3 text-sm text-ink transition-colors duration-180 ease-out hover:border-accent hover:bg-canvas-soft"
          >
            <Mail className="h-4 w-4 text-accent" />
            {siteConfig.company.email}
          </a>
        ) : null}
        <Link
          to="/contacts?type=quote#lead"
          onClick={closeAll}
          tabIndex={mobilePhase.tall && !mobileCat.visible ? 0 : -1}
          className="btn-primary w-full"
        >
          Получить КП
        </Link>
      </div>
    </>
  );

  const mobileCatalogRoot = (
    <div className="bg-white">
      {catalogSearch(searchId)}
      <ul>
        {categories.map((cat) => {
          const count = getMachinesByCategory(cat.id).length;
          return (
            <li key={cat.id}>
              <button
                type="button"
                tabIndex={mobileCat.visible && !mobileDrill.visible ? 0 : -1}
                className="flex w-full min-h-12 items-center justify-between gap-2 border-b border-line-soft px-3 py-3 text-left transition-colors duration-180 ease-out hover:bg-canvas-soft"
                onClick={() => setDrillCatId(cat.id)}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold tracking-tight text-ink">
                    {cat.navTitle}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-faint">
                    {count}{" "}
                    {count === 1 ? "модель" : count < 5 ? "модели" : "моделей"}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" />
              </button>
            </li>
          );
        })}
      </ul>
      <Link
        to="/catalog"
        onClick={closeAll}
        tabIndex={mobileCat.visible && !mobileDrill.visible ? 0 : -1}
        className="flex min-h-11 items-center justify-between gap-2 border-b border-line-soft px-3 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent"
      >
        Весь каталог
        <ArrowRight className="h-4 w-4" />
      </Link>
      <div className="space-y-2 border-t border-line bg-canvas-soft p-3">
        <p className="text-xs leading-snug text-ink-muted">
          Подберём станок под задачу производства
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/solutions"
            onClick={closeAll}
            tabIndex={mobileCat.visible && !mobileDrill.visible ? 0 : -1}
            className="inline-flex min-h-11 items-center justify-center border border-line bg-white px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink"
          >
            Подбор
          </Link>
          <Link
            to="/contacts?type=quote#lead"
            onClick={closeAll}
            tabIndex={mobileCat.visible && !mobileDrill.visible ? 0 : -1}
            className="btn-primary min-h-11 px-2 text-[11px]"
          >
            Получить КП
          </Link>
        </div>
      </div>
    </div>
  );

  const mobileCatalogDrill = drillCategory ? (
    <div className="menu-drill-sheet bg-white">
      <div className="menu-drill-sheet-body">
        <Link
          to={`/catalog/${drillCategory.slug}`}
          onClick={closeAll}
          tabIndex={mobileDrill.visible ? 0 : -1}
          className="block border-b border-line bg-canvas-soft px-3 py-3"
        >
          <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
            {drillCategory.navTitle}
          </span>
          {drillCategory.description ? (
            <span className="mt-1 block line-clamp-2 text-xs leading-snug text-ink-muted">
              {drillCategory.description}
            </span>
          ) : null}
        </Link>
        <ul>
          {drillMachines.map((m) => (
            <li key={m.slug}>
              <Link
                to={`/machines/${m.slug}`}
                onClick={closeAll}
                tabIndex={mobileDrill.visible ? 0 : -1}
                className="flex min-h-12 items-center justify-between gap-2 border-b border-line-soft px-3 py-2.5 transition-colors hover:bg-canvas-soft"
              >
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold tracking-tight text-ink">
                    {m.model}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-muted">
                    {m.name}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="menu-drill-sheet-footer">
        <Link
          to="/contacts?type=quote#lead"
          onClick={closeAll}
          tabIndex={mobileDrill.visible ? 0 : -1}
          className="btn-primary w-full"
        >
          Получить КП
        </Link>
        <Link
          to={`/catalog/${drillCategory.slug}`}
          onClick={closeAll}
          tabIndex={mobileDrill.visible ? 0 : -1}
          className="inline-flex min-h-10 items-center justify-center text-xs font-semibold uppercase tracking-[0.1em] text-accent"
        >
          Все модели категории
        </Link>
      </div>
    </div>
  ) : null;

  const showMobileBack = menuOpen && mobilePhase.wide && mobileCat.visible;
  const mobileBackLabel = drillCatId ? "Каталог" : "Меню";
  /** Soft ceiling only — panel hugs content, no forced full-screen height. */
  const mobilePanelMaxH =
    "calc(100dvh - max(0.75rem, var(--safe-top)) - max(0.5rem, env(safe-area-inset-bottom, 0px)) - 0.5rem)";

  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>

      {/* Mobile */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 edge-chrome pt-[max(0.75rem,var(--safe-top))] md:hidden">
        <Link
          ref={logoMobileRef}
          to="/"
          className="chip-logo chip-shell pointer-events-auto flex h-12 shrink-0 items-center gap-2 bg-white px-3 shadow-frame"
          onClick={(e) => {
            closeAll();
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
          }}
        >
          <BrandMark className="h-7 w-7" />
          <span className="font-display text-[12px] font-bold uppercase tracking-tight text-ink">
            {siteConfig.brand}
          </span>
        </Link>

        <div
          ref={mobilePanelRef}
          className={cn(
            "chip-menu chip-shell menu-width-tween pointer-events-auto relative ml-auto flex h-auto flex-col overflow-hidden bg-white shadow-frame",
            (menuOpen || mobilePhase.active) && "is-busy",
            mobileCat.mounted && "is-catalog-open",
          )}
          style={{
            width: mobilePhase.wide ? "20rem" : "4.75rem",
            maxWidth: "calc(100vw - 9rem)",
            maxHeight: mobilePhase.active ? mobilePanelMaxH : undefined,
          }}
        >
          <div className="flex h-12 shrink-0 items-center">
            <div className="flex min-h-12 min-w-0 flex-1 items-center overflow-hidden">
              {showMobileBack ? (
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center gap-1 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink"
                  onClick={mobileBack}
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
                  {mobileBackLabel}
                </button>
              ) : null}
            </div>

            <button
              ref={mobileOpenRef}
              type="button"
              className={cn(
                "menu-width-tween relative flex h-12 shrink-0 items-center justify-center overflow-hidden",
                !mobilePhase.wide && "pl-1",
              )}
              style={{
                width: mobilePhase.wide ? "3rem" : "4.75rem",
              }}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => {
                if (menuOpen) {
                  closeMenus();
                } else {
                  setMenuOpen(true);
                  setCatalogOpen(false);
                  setDrillCatId(null);
                }
              }}
            >
              <span
                className={cn(
                  "menu-toggle-label font-display text-[12px] font-bold uppercase tracking-[0.06em] text-ink",
                  mobilePhase.wide && "is-hidden",
                )}
              >
                Меню
              </span>
              <span
                className={cn(
                  "menu-toggle-label absolute inset-0 flex items-center justify-center",
                  !mobilePhase.wide && "is-hidden",
                )}
                aria-hidden={!mobilePhase.wide}
              >
                <X className="h-5 w-5 text-ink" strokeWidth={2.25} />
              </span>
            </button>
          </div>

          <div
            className={cn("motion-expand-y", mobilePhase.tall && "is-open")}
          >
            <div className="motion-expand-clip">
              {mobilePhase.active ? (
                <nav
                  className="menu-drill border-t border-line"
                  aria-label="Мобильная навигация"
                  aria-hidden={!mobilePhase.tall}
                >
                  <div
                    className={cn(
                      "menu-drill-pane bg-white",
                      mobileCat.visible && "is-back",
                    )}
                    aria-hidden={mobileCat.visible}
                  >
                    {mobileMainNav}
                  </div>

                  {mobileCat.mounted ? (
                    <div
                      className={cn(
                        "menu-drill-pane bg-white",
                        !mobileCat.visible && "is-forward",
                      )}
                      aria-hidden={!mobileCat.visible}
                    >
                      <div className="menu-drill">
                        <div
                          className={cn(
                            "menu-drill-pane bg-white",
                            mobileDrill.visible && "is-back",
                          )}
                          aria-hidden={mobileDrill.visible}
                        >
                          {mobileCatalogRoot}
                        </div>
                        {mobileDrill.mounted ? (
                          <div
                            className={cn(
                              "menu-drill-pane bg-white",
                              !mobileDrill.visible && "is-forward",
                            )}
                            aria-hidden={!mobileDrill.visible}
                          >
                            {mobileCatalogDrill}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet / Desktop */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:block">
        <div className="edge-chrome-md flex w-full items-start justify-between gap-3 pt-[var(--header-chrome-top)] lg:gap-4">
          <Link
            ref={logoDeskRef}
            to="/"
            onClick={(e) => {
              closeAll();
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }
            }}
            className="chip-logo chip-shell pointer-events-auto inline-flex h-[var(--header-chip-h)] w-[var(--header-logo-w)] shrink-0 items-center gap-3 bg-white px-4 shadow-frame"
          >
            <BrandMark className="h-9 w-9" />
            <span className="font-display text-lg font-bold uppercase tracking-tight text-ink">
              {siteConfig.brand}
            </span>
          </Link>

          <div
            ref={panelRef}
            className={cn(
              "chip-menu chip-shell menu-width-tween pointer-events-auto relative ml-auto flex max-w-[calc(100%-10.5rem)] flex-col overflow-hidden bg-white shadow-frame",
              (deskOpen || deskNav.mounted || deskCat.mounted) && "is-busy",
              deskCat.mounted && "is-catalog-open",
            )}
            style={{
              width:
                deskNav.visible && deskBarWidth != null
                  ? deskBarWidth
                  : DESK_TOGGLE_CLOSED,
            }}
          >
            <div className="flex h-[var(--header-chip-h)] w-full min-w-0 shrink-0">
              <nav
                className={cn(
                  "flex h-[var(--header-chip-h)] items-center gap-0.5 overflow-hidden md:gap-0 lg:gap-0.5",
                  deskNav.visible
                    ? "min-w-0 flex-1 pl-2 pr-1"
                    : "w-0 min-w-0 flex-none p-0",
                )}
                aria-hidden={!deskNav.visible}
              >
                <button
                  type="button"
                  tabIndex={deskNav.visible ? 0 : -1}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-180 ease-out lg:px-2.5 lg:text-[12px]",
                    catalogOpen
                      ? "bg-brand text-white"
                      : "text-ink hover:bg-canvas-soft hover:text-accent",
                  )}
                  aria-expanded={catalogOpen}
                  onClick={() => {
                    if (!deskOpen) {
                      prepareDeskOpenWidth();
                      setDeskOpen(true);
                    }
                    if (!catalogOpen && deskBarWidth == null) prepareDeskOpenWidth();
                    setCatalogOpen((v) => !v);
                  }}
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
                    tabIndex={deskNav.visible ? 0 : -1}
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
                  to="/contacts?type=quote#lead"
                  tabIndex={deskNav.visible ? 0 : -1}
                  onClick={closeAll}
                  className="ml-1 shrink-0 bg-brand px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-180 ease-out hover:bg-accent-hover lg:px-3 lg:text-[11px]"
                >
                  Получить КП
                </Link>
              </nav>

              <button
                ref={deskToggleRef}
                type="button"
                className="menu-width-tween relative flex h-[var(--header-chip-h)] shrink-0 items-center justify-center overflow-hidden font-display font-bold uppercase text-ink"
                style={{
                  width: deskNav.visible ? DESK_TOGGLE_OPEN : DESK_TOGGLE_CLOSED,
                }}
                aria-label={deskOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={deskOpen}
                onClick={() => {
                  if (deskOpen) {
                    setCatalogOpen(false);
                    closeMenus();
                  } else {
                    prepareDeskOpenWidth();
                    setDeskOpen(true);
                  }
                }}
              >
                <span
                  className={cn(
                    "menu-toggle-label menu-toggle-label-desk pl-[0.35rem] text-lg tracking-tight",
                    deskNav.visible && "is-hidden",
                  )}
                >
                  Меню
                </span>
                <span
                  className={cn(
                    "menu-toggle-label menu-toggle-label-desk absolute inset-0 flex items-center justify-center",
                    !deskNav.visible && "is-hidden",
                  )}
                  aria-hidden={!deskNav.visible}
                >
                  <X className="h-5 w-5" strokeWidth={2.25} />
                </span>
              </button>
            </div>

            <div
              className={cn("motion-expand-y", deskCat.visible && "is-open")}
              aria-hidden={!deskCat.visible}
            >
              <div className="motion-expand-clip">
                {deskCat.mounted ? deskCatalogPanel : null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
