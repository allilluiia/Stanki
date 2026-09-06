import { Link, useParams } from "react-router-dom";
import { getCategoryBySlug } from "@/data/categories";
import { getMachinesByCategory } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug ?? "");

  if (!category) {
    return (
      <div className="container-page py-16">
        <h1 className="section-title">Категория не найдена</h1>
        <Link to="/catalog" className="btn-secondary mt-6 inline-flex">
          В каталог
        </Link>
      </div>
    );
  }

  const list = getMachinesByCategory(category.id);

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="text-xs uppercase tracking-[0.16em] text-steel-400">
        <Link to="/catalog" className="hover:text-white">
          Каталог
        </Link>{" "}
        / {category.title}
      </div>
      <h1 className="mt-3 section-title">{category.title}</h1>
      <p className="section-lead">{category.description}</p>

      <div className="mt-8 overflow-x-auto rounded-sm border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ink-800/80 text-xs uppercase tracking-[0.12em] text-steel-400">
            <tr>
              <th className="px-4 py-3">Модель</th>
              <th className="px-4 py-3">Параметр 1</th>
              <th className="px-4 py-3">Параметр 2</th>
              <th className="px-4 py-3">Параметр 3</th>
              <th className="px-4 py-3">Параметр 4</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.slug} className="border-t border-white/5 hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <Link
                    to={`/machines/${m.slug}`}
                    className="font-semibold text-white hover:text-accent-soft"
                  >
                    {m.model}
                  </Link>
                </td>
                {m.heroMetrics.map((metric) => (
                  <td key={metric.label} className="px-4 py-3 text-steel-200">
                    <div className="font-medium text-white">
                      {metric.value}
                      {metric.unit ? ` ${metric.unit}` : ""}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.1em] text-steel-400">
                      {metric.label}
                    </div>
                  </td>
                ))}
                {Array.from({ length: Math.max(0, 4 - m.heroMetrics.length) }).map(
                  (_, i) => (
                    <td key={`empty-${i}`} className="px-4 py-3 text-steel-500">
                      —
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((machine) => (
          <MachineCard key={machine.slug} machine={machine} />
        ))}
      </div>
    </div>
  );
}
