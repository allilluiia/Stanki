import { Link, useSearchParams } from "react-router-dom";
import { categories } from "@/data/categories";
import { getMachinesByCategory, searchMachines } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { StatusBadge } from "@/components/StatusBadge";

export function CatalogPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const hits = q ? searchMachines(q) : null;
  const hitSlugs = hits ? new Set(hits.map((m) => m.slug)) : null;

  return (
    <div className="container-page page-start">
      <h1 className="section-title">Каталог станков SZGH</h1>
      <p className="section-lead">
        {q
          ? `Результаты по запросу «${q}»: ${hits?.length ?? 0}.`
          : "Линейка металлообрабатывающего оборудования SZGH. Выберите категорию или модель и запросите коммерческое предложение."}
      </p>
      {q ? (
        <p className="mt-3 text-sm">
          <Link to="/catalog" className="link-quiet text-accent">
            Сбросить поиск
          </Link>
        </p>
      ) : null}

      <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
        {categories.map((category) => {
          const list = getMachinesByCategory(category.id).filter((m) =>
            hitSlugs ? hitSlugs.has(m.slug) : true,
          );
          if (hitSlugs && list.length === 0) return null;
          return (
            <section key={category.id}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="heading-2">
                    {category.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    {category.description}
                  </p>
                </div>
                <Link
                  to={`/catalog/${category.slug}`}
                  className="link-quiet shrink-0 text-sm font-semibold text-mark"
                >
                  Сравнение в категории →
                </Link>
              </div>

              <div className="mt-6 hidden md:block">
                <div className="overflow-hidden border border-line">
                  <table className="min-w-full text-left text-sm">
                    <caption className="sr-only">{category.title}: список моделей</caption>
                    <thead className="bg-canvas-soft text-[10px] uppercase tracking-[0.12em] text-ink-faint sm:text-xs">
                      <tr>
                        <th scope="col" className="px-3 py-3.5 font-semibold sm:px-4">
                          Модель
                        </th>
                        <th scope="col" className="px-3 py-3.5 font-semibold sm:px-4">
                          Тип
                        </th>
                        <th scope="col" className="px-3 py-3.5 font-semibold sm:px-4">
                          Статус
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((m) => (
                        <tr
                          key={m.slug}
                          className="border-t border-line-soft text-ink-soft transition-colors duration-200 ease-soft hover:bg-canvas-soft"
                        >
                          <th scope="row" className="px-3 py-3.5 font-normal sm:px-4">
                            <Link
                              to={`/machines/${m.slug}`}
                              className="font-semibold text-ink transition-colors duration-200 ease-soft hover:text-accent"
                            >
                              {m.model}
                            </Link>
                          </th>
                          <td className="px-3 py-3.5 sm:px-4">{m.name}</td>
                          <td className="px-3 py-3.5 sm:px-4">
                            {m.availability ? (
                              <StatusBadge status={m.availability} />
                            ) : (
                              <span className="text-ink-faint">По запросу</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((machine) => (
                  <MachineCard key={machine.slug} machine={machine} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
