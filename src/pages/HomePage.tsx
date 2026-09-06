import { Link } from "react-router-dom";
import { ArrowRight, Wrench, ShieldCheck, Cog, Package, GraduationCap } from "lucide-react";
import { categories } from "@/data/categories";
import { machines } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { MachineVisual } from "@/components/MachineVisual";
import { siteConfig } from "@/lib/siteConfig";

const serviceSteps = [
  { title: "Подбор", icon: Cog },
  { title: "Демонстрация", icon: Package },
  { title: "ПНР", icon: Wrench },
  { title: "Обучение", icon: GraduationCap },
  { title: "ТО и ЗИП", icon: ShieldCheck },
];

export function HomePage() {
  const featured = machines.filter((m) =>
    ["szgh-46j", "szgh-46y", "vmc850", "szgh-36j"].includes(m.slug),
  );

  return (
    <div className="w-full">
      {/* Full-bleed viewport hero */}
      <section className="relative flex min-h-[calc(100svh-3.5rem)] w-full flex-col overflow-hidden border-b border-white/10 sm:min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-6.5rem)]">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundSize: "56px 56px",
            backgroundImage:
              "linear-gradient(rgba(47,125,181,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(47,125,181,0.07) 1px, transparent 1px)",
          }}
        />

        <div className="relative grid w-full flex-1 items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="animate-fade-up order-2 w-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:order-1 lg:px-10 lg:py-12 xl:px-14 2xl:px-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-soft sm:text-xs">
              SZGH CNC
            </p>
            <h1 className="mt-3 font-display text-[clamp(3.25rem,10vw,8rem)] font-bold uppercase leading-[0.88] tracking-[0.02em] text-white">
              {siteConfig.brand}
            </h1>
            <p className="mt-4 max-w-xl text-base text-steel-200 sm:mt-5 sm:text-xl md:text-2xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-steel-400 sm:block md:text-base">
              Токарные станки · Обрабатывающие центры · Токарно-фрезерные центры ·
              Системы ЧПУ
            </p>

            <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:mt-9">
              <Link to="/solutions" className="btn-primary">
                Подобрать станок
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contacts?type=quote" className="btn-secondary">
                Получить КП
              </Link>
            </div>
          </div>

          {/* Full-bleed machine visual to the right edge on desktop */}
          <div className="animate-fade-in order-1 w-full px-4 pt-6 sm:px-6 md:px-8 lg:order-2 lg:h-full lg:px-0 lg:pt-0">
            <Link
              to="/machines/szgh-46j"
              className="group block h-full lg:min-h-full"
            >
              <MachineVisual className="aspect-[16/11] w-full shadow-panel transition duration-500 group-hover:border-accent/40 group-hover:shadow-glow sm:aspect-[5/3] lg:aspect-auto lg:h-full lg:min-h-[min(70svh,560px)] lg:rounded-none lg:border-y-0 lg:border-l lg:border-r-0" />
            </Link>
          </div>
        </div>

        <div className="relative w-full border-t border-white/10 bg-ink-950/40">
          <div className="flex w-full gap-4 overflow-x-auto px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-steel-300 sm:justify-between sm:gap-6 sm:px-6 sm:py-4 sm:text-xs md:px-8 lg:px-10 xl:px-14 2xl:px-20">
            {[
              "Поставка от производителя",
              "Пусконаладка",
              "Техподдержка",
              "Гарантия",
              "Запасные части",
            ].map((item) => (
              <span key={item} className="shrink-0 whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-y w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Станки SZGH</h2>
            <p className="section-lead">
              Каталог по типу оборудования: сначала задача, затем модель.
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-semibold text-accent-soft hover:underline"
          >
            Весь каталог →
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/catalog/${category.slug}`}
              className="panel group rounded-sm p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-panel sm:p-6"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-steel-400 sm:text-xs">
                0{index + 1} · Категория
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-wide text-white transition group-hover:text-accent-soft sm:text-2xl">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full border-y border-white/10 bg-ink-900/35">
        <div className="container-page section-y">
          <h2 className="section-title">Популярные модели</h2>
          <p className="section-lead">
            Ключевые станки линейки — характеристики и запрос КП в один клик.
          </p>
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {featured.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-y w-full">
        <h2 className="section-title">Сервис полного цикла</h2>
        <p className="section-lead">
          Сопровождаем станок от подбора до запасных частей.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {serviceSteps.map((step, i) => (
            <div
              key={step.title}
              className="panel rounded-sm p-4 transition duration-300 hover:border-accent/35 sm:p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.16em] text-accent-soft sm:text-xs">
                0{i + 1}
              </div>
              <step.icon className="mt-3 h-5 w-5 text-steel-200" />
              <div className="mt-2 text-sm font-semibold text-white sm:text-base">
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <Link to="/service" className="btn-secondary mt-8 inline-flex sm:mt-10">
          Подробнее о сервисе
        </Link>
      </section>

      <section className="container-page w-full pb-16 sm:pb-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-6 sm:p-10 md:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-semibold uppercase leading-none text-white sm:text-4xl md:text-5xl">
            Нужен станок под задачу?
          </h2>
          <p className="relative mt-4 max-w-2xl text-sm text-steel-300 sm:text-base">
            Опишите деталь, материал и серийность — подготовим подбор и коммерческое
            предложение.
          </p>
          <div className="relative mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Link to="/solutions" className="btn-primary">
              Подобрать станок
            </Link>
            <Link to="/contacts?type=quote" className="btn-secondary">
              Получить КП
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
