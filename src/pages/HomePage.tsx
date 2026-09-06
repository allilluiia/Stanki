import { Link } from "react-router-dom";
import { ArrowRight, Wrench, ShieldCheck, Cog, Package } from "lucide-react";
import { categories } from "@/data/categories";
import { machines } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { siteConfig } from "@/lib/siteConfig";

const serviceSteps = [
  { title: "Подбор оборудования", icon: Cog },
  { title: "Демонстрация", icon: Package },
  { title: "Ввод в эксплуатацию", icon: Wrench },
  { title: "Обучение", icon: ShieldCheck },
  { title: "Обслуживание и ЗИП", icon: Wrench },
];

export function HomePage() {
  const featured = machines.filter((m) =>
    ["szgh-46j", "szgh-46y", "vmc850", "szgh-36j"].includes(m.slug),
  );

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundSize: "48px 48px",
            backgroundImage:
              "linear-gradient(rgba(47,125,181,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(47,125,181,0.07) 1px, transparent 1px)",
          }}
        />
        <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              SZGH CNC
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
              {siteConfig.brand}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-steel-200 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.14em] text-steel-400">
              Токарные станки · Обрабатывающие центры · Токарно-фрезерные центры ·
              Системы ЧПУ
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-steel-200 sm:grid-cols-2">
              {[
                "Поставка напрямую от производителя",
                "Пусконаладка",
                "Техническая поддержка",
                "Гарантийное обслуживание",
                "Запасные части",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/solutions" className="btn-primary">
                Подобрать станок
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contacts?type=quote" className="btn-secondary">
                Получить коммерческое предложение
              </Link>
            </div>
          </div>

          <div className="animate-fade-in relative">
            <div className="panel relative overflow-hidden rounded-sm p-6 shadow-panel sm:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.18em] text-steel-400">
                  Эталонная модель
                </div>
                <div className="mt-2 font-display text-4xl font-semibold uppercase text-white">
                  SZGH-46J
                </div>
                <p className="mt-2 text-sm text-steel-300">
                  Токарный станок с ЧПУ с наклонной станиной. 45 мм пруток,
                  ±0,0075 мм, 5,5 кВт.
                </p>
                <div className="mt-6 aspect-[4/3] rounded-sm border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950">
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <div className="h-24 w-40 rounded-sm border border-steel-400/30 bg-steel-600/20 shadow-inner" />
                    <div className="text-xs uppercase tracking-[0.16em] text-steel-400">
                      Рендер / фото станка
                    </div>
                  </div>
                </div>
                <Link
                  to="/machines/szgh-46j"
                  className="btn-secondary mt-5 inline-flex"
                >
                  Смотреть карточку
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <h2 className="section-title">Станки SZGH</h2>
        <p className="section-lead">
          Каталог по типам оборудования — как в промышленном B2B: сначала задача,
          затем модель.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/catalog/${category.slug}`}
              className="panel group rounded-sm p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="text-xs uppercase tracking-[0.16em] text-steel-400">
                Категория
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-white group-hover:text-accent-soft">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-steel-300">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900/40 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="section-title">Популярные модели</h2>
          <p className="section-lead">
            Ключевые станки линейки с быстрым переходом к характеристикам и КП.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <h2 className="section-title">Сервис полного цикла</h2>
        <p className="section-lead">
          Не просто поставка: сопровождаем станок на всём жизненном цикле.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {serviceSteps.map((step, i) => (
            <div key={step.title} className="panel rounded-sm p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-accent-soft">
                0{i + 1}
              </div>
              <step.icon className="mt-3 h-5 w-5 text-steel-200" />
              <div className="mt-2 text-sm font-semibold text-white">
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <Link to="/service" className="btn-secondary mt-8 inline-flex">
          Подробнее о сервисе
        </Link>
      </section>

      <section className="container-page pb-20">
        <div className="panel overflow-hidden rounded-sm bg-gradient-to-r from-ink-800 to-ink-900 p-8 sm:p-10">
          <h2 className="font-display text-3xl font-semibold uppercase text-white sm:text-4xl">
            Нужен станок под задачу?
          </h2>
          <p className="mt-3 max-w-2xl text-steel-300">
            Опишите деталь, материал и серийность — подготовим подбор и коммерческое
            предложение.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
