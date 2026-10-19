import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { categories } from "@/data/categories";
import { getMachinesByCategory, machines } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { MachineVisual } from "@/components/MachineVisual";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export function HomePage() {
  const featuredUnique = machines.filter((m) =>
    ["szgh-46j", "szgh-46y", "vmc850", "szgh-540"].includes(m.slug),
  );

  const heroPool = featuredUnique.length ? featuredUnique : machines.slice(0, 4);
  const [heroIndex, setHeroIndex] = useState(0);
  const flagship = heroPool[heroIndex] ?? heroPool[0];

  const series = categories.slice(0, 3);

  return (
    <div className="w-full overflow-x-clip">
      {/* -- Product hero -- */}
      <section className="relative chrome-bleed bg-stage">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" />

        <div className="relative container-page pt-10 sm:pt-14 lg:pt-16">
          {flagship ? (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line/80 pb-7 sm:pb-8">
                <div className="min-w-0">
                  <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold uppercase leading-[1.05] tracking-tight text-ink">
                    {flagship.model}
                    <span className="text-ink/55"> · </span>
                    <span className="text-mark">SZGH</span>
                  </h1>
                  <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-ink/90 sm:text-base">
                    {flagship.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-line bg-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    Каталог
                  </span>
                  <span className="bg-brand px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-muted">
                    B2B
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1fr_auto]">
                <div className="relative min-h-[300px] py-10 sm:min-h-[380px] sm:py-12 lg:min-h-[460px]">
                  <div className="absolute left-0 top-8 z-10 hidden max-w-[11rem] space-y-4 lg:block">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        Тип
                      </div>
                      <div className="mt-2 text-sm font-medium leading-snug text-ink">
                        {flagship.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        Бренд
                      </div>
                      <div className="mt-2 text-sm font-medium text-ink">{flagship.brand}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        Документы
                      </div>
                      <div className="mt-2 text-sm font-medium text-ink">По запросу</div>
                    </div>
                  </div>

                  <Link
                    to={`/machines/${flagship.slug}`}
                    className="mx-auto block max-w-xl transition-opacity duration-220 ease-out hover:opacity-95 lg:max-w-2xl"
                  >
                    <MachineVisual
                      key={flagship.slug}
                      label={flagship.model}
                      categoryId={flagship.categoryId}
                      media={flagship.media}
                      priority
                      hideCaption
                      className="aspect-square animate-fade-in shadow-frame sm:aspect-[5/4]"
                    />
                  </Link>
                </div>

                <div className="flex gap-2 overflow-x-auto overscroll-x-contain border-t border-line/80 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:w-44 lg:flex-col lg:gap-2 lg:overflow-visible lg:border-l lg:border-t-0 lg:py-8 lg:pl-4">
                  {heroPool.map((m, i) => (
                    <button
                      key={m.slug}
                      type="button"
                      onClick={() => setHeroIndex(i)}
                      className={cn(
                        "min-h-11 shrink-0 border px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.1em] transition-[background-color,border-color,color] duration-180 ease-out lg:w-full",
                        i === heroIndex
                          ? "border-brand bg-brand text-surface-muted"
                          : "border-line bg-surface/90 text-ink-muted hover:border-ink hover:bg-surface hover:text-ink",
                      )}
                    >
                      {m.model}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5 border-t border-line/80 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:py-10">
                <p className="max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {siteConfig.description}
                </p>
                <Link to={`/machines/${flagship.slug}`} className="btn-arrow shrink-0 bg-brand text-surface-muted">
                  <span>К модели</span>
                  <span className="btn-arrow-icon bg-surface-muted text-ink">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* -- Mission -- */}
      <section className="bg-surface">
        <div className="container-page section-y">
          <p className="max-w-3xl font-display text-[clamp(1.35rem,0.9rem+2vw,2.25rem)] font-medium leading-[1.3] tracking-tight text-ink">
            Каталог станков с ЧПУ{" "}
            <strong className="font-semibold text-accent">SZGH</strong> для предприятий:{" "}
            <strong className="font-semibold">подбор</strong> модели и{" "}
            <strong className="font-semibold">коммерческое предложение</strong> под задачу
            производства.
          </p>
          <div className="mt-12 grid gap-px border border-line bg-line sm:mt-14 sm:grid-cols-3">
            {[
              { t: "Каталог", d: `${machines.length} моделей в линейке` },
              { t: "Категории", d: `${categories.length} типов оборудования` },
              { t: "Заявка", d: "КП через форму на сайте" },
            ].map((item) => (
              <div key={item.t} className="bg-surface p-7 transition-colors duration-180 ease-out hover:bg-canvas-soft sm:p-9">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {item.t}
                </div>
                <div className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                  {item.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Series -- */}
      <section className="bg-canvas">
        <div className="mx-auto grid max-w-page gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {series.map((cat) => {
            const count = getMachinesByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/catalog#${cat.slug}`}
                className="group relative flex min-h-[240px] flex-col bg-surface p-6 transition-colors duration-180 ease-out hover:bg-canvas-soft lg:min-h-[280px] lg:p-8"
              >
                <div className="font-display text-xl font-semibold uppercase tracking-tight text-ink transition-colors duration-300 ease-soft group-hover:text-accent sm:text-2xl">
                  {cat.title}
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                  {cat.description}
                </p>
                <div className="mt-auto flex items-end justify-between pt-10">
                  <LayoutGrid className="h-8 w-8 text-line-strong transition-colors duration-300 ease-soft group-hover:text-accent" />
                  <span className="text-sm font-medium tabular-nums text-ink-faint">[{count}]</span>
                </div>
              </Link>
            );
          })}
          <Link
            to="/catalog"
            className="group flex min-h-[240px] flex-col justify-between bg-stage p-6 text-ink transition-colors duration-180 ease-out hover:bg-stage-soft lg:min-h-[280px] lg:p-8"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Каталог
              </div>
              <div className="mt-4 font-display text-2xl font-semibold uppercase leading-tight tracking-tight sm:text-3xl">
                Весь каталог станков
              </div>
            </div>
            <span className="btn-arrow mt-10 self-start bg-brand text-surface-muted">
              <span>Смотреть</span>
              <span className="btn-arrow-icon bg-surface-muted text-ink">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* -- Featured models -- */}
      <section className="bg-surface">
        <div className="container-page section-y">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="heading-2">
              Модели в каталоге
            </h2>
            <div className="flex items-center gap-3">
              <Link
                to="/catalog"
                className="link-quiet text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted"
              >
                Смотреть все
              </Link>
              <Link
                to="/catalog"
                className="inline-flex h-11 w-11 items-center justify-center border border-line bg-surface text-ink transition-[background-color,border-color,color] duration-180 ease-out hover:border-ink hover:bg-brand hover:text-surface-muted"
                aria-label="Каталог"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-0 border border-line sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredUnique.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} dense />
            ))}
          </div>
        </div>
      </section>

      {/* -- Solutions split -- */}
      <section className="bg-stage">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-[400px]">
            <div className="pointer-events-none absolute inset-0 tech-grid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-14">
              {flagship ? (
                <img
                  src={flagship.media?.hero}
                  alt=""
                  className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col justify-center bg-brand p-8 text-surface-muted sm:p-12 lg:p-16">
            <h2 className="font-display text-3xl font-semibold uppercase leading-[1.1] tracking-tight sm:text-4xl">
              Подберите станок под вашу задачу
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-surface-muted/70 sm:text-base">
              Точение, фрезерование, VMC или портал - выберите направление, и мы покажем
              релевантные модели SZGH.
            </p>
            <Link to="/solutions" className="btn-arrow mt-8 self-start bg-surface-muted text-ink">
              <span>Открыть подбор</span>
              <span className="btn-arrow-icon bg-accent text-surface-muted">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* -- Consultation form -- */}
      <section className="bg-canvas-soft">
        <div className="container-page section-y">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <div>
              <p className="eyebrow">Заявка</p>
              <h2 className="section-title mt-3">Получить коммерческое предложение</h2>
              <p className="section-lead">
                Укажите организацию и задачу - ответим на email. Без выдуманных сроков и цен.
              </p>
            </div>
            <div id="lead-home" className="scroll-mt-[calc(var(--header-offset)+1rem)]">
              <LeadForm type="quote" title="Запрос КП" />
            </div>
          </div>
        </div>
      </section>

      {/* -- Giant catalog band -- */}
      <section className="relative overflow-hidden bg-stage py-16 text-center sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display text-[clamp(4rem,18vw,14rem)] font-bold uppercase leading-none tracking-tight text-ink/[0.07]">
            {siteConfig.brand}
          </span>
        </div>
        <Link
          to="/catalog"
          className="relative inline-flex items-center gap-3 bg-brand px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-surface-muted transition-colors duration-180 ease-out hover:bg-accent-hover"
        >
          <LayoutGrid className="h-4 w-4 text-accent-soft" />
          Открыть каталог
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
