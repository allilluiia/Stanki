import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "@/data/categories";
import { getMachinesByCategory, searchMachines } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { cn } from "@/lib/utils";

type VisibleCategory = {
  category: (typeof categories)[number];
  list: ReturnType<typeof getMachinesByCategory>;
};

function CatalogJumpLinks({
  items,
  activeSlug,
  onSelect,
}: {
  items: VisibleCategory[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <ul className="catalog-jump-list">
      {items.map(({ category, list }, index) => {
        const active = activeSlug === category.slug;
        const edge =
          index === 0
            ? "is-edge-start"
            : index === 1
              ? "is-edge-col-end"
              : index === items.length - 1
                ? "is-edge-end"
                : null;
        return (
          <li key={category.id} className="min-w-0 shrink-0 md:min-w-0 md:flex-1">
            <a
              href={`#${category.slug}`}
              onClick={() => onSelect(category.slug)}
              className={cn(
                "catalog-jump-item inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-tight transition-colors duration-180 ease-out md:w-full",
                active
                  ? cn("is-active bg-brand text-surface-muted", edge)
                  : "text-ink-soft hover:bg-canvas-soft hover:text-ink",
              )}
            >
              <span>{category.navTitle}</span>
              <span
                className={cn(
                  "font-sans text-xs tabular-nums",
                  active ? "text-surface-muted/75" : "text-ink-faint",
                )}
              >
                {list.length}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function CatalogPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const hitCount = q ? searchMachines(q).length : 0;
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const slotRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(false);
  const [pinned, setPinned] = useState(false);
  const [swapHide, setSwapHide] = useState(false);

  const visibleCategories = useMemo(() => {
    const hitSlugs = q ? new Set(searchMachines(q).map((m) => m.slug)) : null;
    return categories
      .map((category) => {
        const list = getMachinesByCategory(category.id).filter((m) =>
          hitSlugs ? hitSlugs.has(m.slug) : true,
        );
        return { category, list };
      })
      .filter(({ list }) => !hitSlugs || list.length > 0);
  }, [q]);

  const sectionKey = useMemo(
    () => visibleCategories.map(({ category }) => category.slug).join("|"),
    [visibleCategories],
  );

  /** Pin only — free phase stays in document flow (no per-frame top updates). */
  useLayoutEffect(() => {
    if (q) {
      pinnedRef.current = false;
      setPinned(false);
      return;
    }

    let frame = 0;
    let swapTimer = 0;
    const mq = window.matchMedia("(min-width: 768px)");

    const sync = () => {
      frame = 0;
      const slot = slotRef.current;
      if (!slot) return;

      /* Prefer the visible chip (mobile + desk logos both exist in DOM) */
      let logo: HTMLElement | null = null;
      for (const el of document.querySelectorAll<HTMLElement>(".chip-logo")) {
        if (el.getClientRects().length > 0) {
          logo = el;
          break;
        }
      }
      let dockY: number;

      if (logo) {
        /* Pin into the logo ↔ menu header band (all viewports) */
        dockY = logo.getBoundingClientRect().top;
      } else {
        const raw = getComputedStyle(document.documentElement)
          .getPropertyValue("--header-chrome-top")
          .trim();
        const parsed = Number.parseFloat(raw);
        dockY = Number.isFinite(parsed) ? parsed : 12;
      }

      const slotTop = slot.getBoundingClientRect().top;
      const prev = pinnedRef.current;
      /* Hysteresis: avoid flicker at the threshold */
      const next = prev ? slotTop <= dockY + 10 : slotTop <= dockY + 0.5;
      if (next === prev) return;

      const deskOpen = document.documentElement.classList.contains("is-desk-nav-open");

      const commit = () => {
        pinnedRef.current = next;
        setPinned(next);
        window.requestAnimationFrame(() => {
          if (next && trackRef.current) {
            slot.style.height = `${Math.ceil(trackRef.current.getBoundingClientRect().height)}px`;
          } else {
            slot.style.height = "";
          }
        });
      };

      /* Open menu: row ↔ 2×3 — short fade masks the layout change both ways */
      if (deskOpen && mq.matches) {
        if (swapTimer) window.clearTimeout(swapTimer);
        pinnedRef.current = next; /* lock hysteresis during fade */
        setSwapHide(true);
        swapTimer = window.setTimeout(() => {
          commit();
          window.requestAnimationFrame(() => setSwapHide(false));
        }, 140);
        return;
      }

      commit();
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    mq.addEventListener("change", sync);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      mq.removeEventListener("change", sync);
      if (frame) window.cancelAnimationFrame(frame);
      if (swapTimer) window.clearTimeout(swapTimer);
    };
  }, [q]);

  /** When pinned, reserve slot height before paint (track is position:fixed). */
  useLayoutEffect(() => {
    const slot = slotRef.current;
    const track = trackRef.current;
    if (!slot || !track) return;

    const apply = () => {
      if (!pinned) {
        slot.style.height = "";
        return;
      }
      /* Measure while still in-flow height is known via min chip-h / content */
      const h = Math.max(
        track.offsetHeight,
        Math.ceil(track.getBoundingClientRect().height),
      );
      slot.style.height = `${h}px`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(track);
    return () => {
      ro.disconnect();
      slot.style.height = "";
    };
  }, [pinned, q]);

  useEffect(() => {
    if (q || !sectionKey) return;
    const sectionIds = sectionKey.split("|");

    let frame = 0;

    const activationLine = () => {
      const jump = document.getElementById("catalog-jump");
      if (jump && jump.getClientRects().length > 0) {
        return jump.getBoundingClientRect().bottom + 24;
      }
      return 120;
    };

    const update = () => {
      frame = 0;
      const line = activationLine();
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) {
          current = id;
        }
      }
      setActiveSlug((prev) => (prev === current ? prev : current));
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [q, sectionKey]);

  /** Mobile: keep the active chip visible in the horizontal scroller */
  useEffect(() => {
    if (q) return;
    const active = document.querySelector<HTMLElement>(
      "#catalog-jump .catalog-jump-item.is-active",
    );
    active?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSlug, q]);

  return (
    <div className="container-page page-start">
      <h1 className="section-title">Каталог станков SZGH</h1>
      <p className="section-lead">
        {q
          ? `Результаты по запросу «${q}»: ${hitCount}.`
          : "Токарные, фрезерные, VMC, токарно-фрезерные и портальные центры SZGH - по данным производителя. Выберите модель и запросите КП."}
      </p>
      {q ? (
        <p className="mt-3 text-sm">
          <Link to="/catalog" className="link-quiet text-accent">
            Сбросить поиск
          </Link>
        </p>
      ) : null}

      {!q ? (
        <div ref={slotRef} className="catalog-jump-slot mt-8 sm:mt-10">
          <div
            ref={trackRef}
            className={cn(
              "catalog-jump-track",
              pinned && "is-pinned",
              swapHide && "is-swap",
            )}
          >
            <nav
              id="catalog-jump"
              aria-label="Разделы каталога"
              className="catalog-jump"
            >
              <CatalogJumpLinks
                items={visibleCategories}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
              />
            </nav>
          </div>
        </div>
      ) : null}

      <div className="mt-10 space-y-14 sm:mt-12 sm:space-y-16">
        {visibleCategories.map(({ category, list }) => (
          <section
            key={category.id}
            id={category.slug}
            className="scroll-mt-[calc(var(--header-chrome-top)+var(--header-chip-h)+0.75rem)]"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
              <div className="min-w-0">
                <h2 className="heading-2">{category.title}</h2>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  {category.description}
                </p>
              </div>
              <Link
                to={`/catalog/${category.slug}`}
                className="link-quiet shrink-0 text-sm font-semibold text-mark"
              >
                Сравнение →
              </Link>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {list.map((m) => (
                <li key={m.slug}>
                  <Link
                    to={`/machines/${m.slug}`}
                    className="inline-flex border border-line bg-canvas-soft px-2.5 py-1.5 text-sm font-semibold tracking-tight text-ink transition-colors duration-180 ease-out hover:border-accent hover:bg-white hover:text-accent"
                  >
                    {m.model}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
                <li key={`${m.slug}-card`}>
                  <MachineCard machine={m} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
