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

const trustItems = [
  "Поставка от производителя",
  "Пусконаладка",
  "Техподдержка",
  "Гарантия",
  "Запасные части",
];

export function HomePage() {
  const featured = machines.filter((m) =>
    ["szgh-46j", "szgh-46y", "vmc850", "szgh-36j"].includes(m.slug),
  );

  return (
    <div className="w-full max-w-[100vw] overflow-x-clip">
      <section className="relative w-full border-b border-white/10 lg:flex lg:min-h-[calc(100dvh-4rem)] lg:flex-col">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />

        <div className="relative grid w-full lg:flex-1 lg:grid-cols-2 lg:items-stretch">
          <div className="w-full px-4 pb-5 pt-7 sm:px-6 sm:pb-8 sm:pt-10 md:px-8 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:py-12 xl:px-14 2xl:px-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-soft">
              SZGH CNC
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.5rem,13vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-[0.02em] text-white">
              {siteConfig.brand}
            </h1>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-snug text-steel-200 sm:mt-4 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-2 text-xs text-steel-400 sm:text-sm">
              Токарные · ОЦ · Токарно-фрезерные · ЧПУ
            </p>

            <div className="mt-5 grid w-full grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:max-w-lg sm:flex-row">
              <Link to="/solutions" className="btn-primary w-full justify-center sm:w-auto">
                Подобрать станок
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contacts?type=quote"
                className="btn-secondary w-full justify-center sm:w-auto"
              >
                Получить КП
              </Link>
            </div>
          </div>

          <div className="w-full px-4 pb-5 sm:px-6 sm:pb-8 md:px-8 lg:px-0 lg:pb-0">
            <Link to="/machines/szgh-46j" className="block h-full">
              <MachineVisual className="aspect-[16/10] w-full sm:aspect-[5/3] lg:aspect-auto lg:h-full lg:min-h-[420px] lg:rounded-none lg:border-y-0 lg:border-l lg:border-r-0" />
            </Link>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-ink-950/50">
          {/* Mobile: wrapping chips — no mid-word cut */}
          <div className="grid grid-cols-2 gap-2 px-4 py-3 sm:hidden">
            {trustItems.map((item) => (
              <div
                key={item}
                className="rounded-sm border border-white/10 px-2.5 py-2 text-center text-[10px] uppercase leading-tight tracking-[0.08em] text-steel-300"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="hidden px-6 py-4 text-xs uppercase tracking-[0.14em] text-steel-300 sm:flex sm:flex-wrap sm:justify-between sm:gap-4 md:px-8 lg:px-10 xl:px-14 2xl:px-20">
            {trustItems.map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-y w-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 className="section-title">Станки SZGH</h2>
            <p className="section-lead">
              Каталог по типу оборудования: сначала задача, затем модель.
            </p>
          </div>
          <Link
            to="/catalog"
            className="shrink-0 text-sm font-semibold text-accent-soft hover:underline"
          >
            Весь каталог →
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/catalog/${category.slug}`}
              className="panel rounded-sm p-4 transition active:bg-ink-800 sm:p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.16em] text-steel-400">
                0{index + 1}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white sm:text-xl">
                {category.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-steel-300">
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
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
          {serviceSteps.map((step, i) => (
            <div key={step.title} className="panel rounded-sm p-3.5 sm:p-4">
              <div className="text-[10px] uppercase tracking-[0.14em] text-accent-soft">
                0{i + 1}
              </div>
              <step.icon className="mt-2.5 h-4 w-4 text-steel-200 sm:h-5 sm:w-5" />
              <div className="mt-2 text-xs font-semibold text-white sm:text-sm">
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <Link to="/service" className="btn-secondary mt-6 inline-flex sm:mt-8">
          Подробнее о сервисе
        </Link>
      </section>

      <section className="container-page w-full pb-8 sm:pb-16 lg:pb-24">
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-5 sm:p-10">
          <h2 className="font-display text-2xl font-semibold uppercase leading-none text-white sm:text-4xl">
            Нужен станок под задачу?
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-steel-300">
            Опишите деталь, материал и серийность — подготовим подбор и КП.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:flex sm:max-w-md sm:flex-row">
            <Link to="/solutions" className="btn-primary w-full justify-center sm:w-auto">
              Подобрать станок
            </Link>
            <Link
              to="/contacts?type=quote"
              className="btn-secondary w-full justify-center sm:w-auto"
            >
              Получить КП
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
