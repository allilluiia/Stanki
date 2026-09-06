import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { getMachinesByCategory, machines } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";

export function CatalogPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="section-title">Каталог станков SZGH</h1>
      <p className="section-lead">
        Линейка оборудования прямого дистрибьютора. Сравните модели по ключевым
        параметрам и запросите КП.
      </p>

      <div className="mt-10 space-y-14">
        {categories.map((category) => {
          const list = getMachinesByCategory(category.id);
          return (
            <section key={category.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-white">
                    {category.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-steel-300">
                    {category.description}
                  </p>
                </div>
                <Link
                  to={`/catalog/${category.slug}`}
                  className="text-sm font-semibold text-accent-soft hover:underline"
                >
                  Вся категория →
                </Link>
              </div>

              <div className="mt-5 overflow-x-auto rounded-sm border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-ink-800/80 text-xs uppercase tracking-[0.12em] text-steel-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Модель</th>
                      <th className="px-4 py-3 font-semibold">Ключевой параметр</th>
                      <th className="px-4 py-3 font-semibold">Ещё</th>
                      <th className="px-4 py-3 font-semibold">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((m) => (
                      <tr
                        key={m.slug}
                        className="border-t border-white/5 text-steel-200 hover:bg-white/[0.03]"
                      >
                        <td className="px-4 py-3">
                          <Link
                            to={`/machines/${m.slug}`}
                            className="font-semibold text-white hover:text-accent-soft"
                          >
                            {m.model}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {m.heroMetrics[0]
                            ? `${m.heroMetrics[0].value}${m.heroMetrics[0].unit ? ` ${m.heroMetrics[0].unit}` : ""} — ${m.heroMetrics[0].label}`
                            : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {m.heroMetrics[1]
                            ? `${m.heroMetrics[1].value}${m.heroMetrics[1].unit ? ` ${m.heroMetrics[1].unit}` : ""}`
                            : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {m.availability === "in_stock"
                            ? "В наличии"
                            : m.availability === "expected"
                              ? "Ожидается"
                              : "Под заказ"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold uppercase text-white">
          Все модели
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => (
            <MachineCard key={machine.slug} machine={machine} />
          ))}
        </div>
      </section>
    </div>
  );
}
