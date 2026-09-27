import { Link, useParams } from "react-router-dom";
import { getCategoryBySlug } from "@/data/categories";
import { getMachinesByCategory } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { StatusBadge } from "@/components/StatusBadge";

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug ?? "");

  if (!category) {
    return (
      <div className="container-page page-start">
        <h1 className="section-title">Категория не найдена</h1>
        <Link to="/catalog" className="btn-secondary mt-6 inline-flex">
          В каталог
        </Link>
      </div>
    );
  }

  const list = getMachinesByCategory(category.id);
  const fields = category.comparisonFields;

  return (
    <div className="container-page page-start">
      <div className="text-[11px] uppercase tracking-[0.16em] text-ink-faint sm:text-xs">
        <Link to="/catalog" className="hover:text-ink">
          Каталог
        </Link>{" "}
        / {category.title}
      </div>
      <h1 className="mt-3 section-title">{category.title}</h1>
      <p className="section-lead">{category.description}</p>

      {fields.length > 0 ? (
        <div className="stack-title hidden overflow-x-auto md:block">
          <div className="overflow-hidden rounded-none border border-line">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">
                Сравнение моделей категории {category.title}
              </caption>
              <thead className="bg-canvas-soft text-[10px] uppercase tracking-[0.12em] text-ink-faint sm:text-xs">
                <tr>
                  <th scope="col" className="px-3 py-3 sm:px-4">
                    Модель
                  </th>
                  {fields.map((field) => (
                    <th key={field.key} scope="col" className="px-3 py-3 sm:px-4">
                      {field.label}
                    </th>
                  ))}
                  <th scope="col" className="px-3 py-3 sm:px-4">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((m) => (
                  <tr key={m.slug} className="border-t border-line-soft hover:bg-canvas-soft">
                    <th scope="row" className="px-3 py-3 font-normal sm:px-4">
                      <Link
                        to={`/machines/${m.slug}`}
                        className="font-semibold text-ink hover:text-accent"
                      >
                        {m.model}
                      </Link>
                    </th>
                    {fields.map((field) => (
                      <td key={field.key} className="px-3 py-3 text-ink-soft sm:px-4">
                        {m.compare[field.key] ?? "—"}
                      </td>
                    ))}
                    <td className="px-3 py-3 sm:px-4">
                      <StatusBadge status={m.availability} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <div className="stack-after-lead grid gap-cards sm:grid-cols-2 lg:grid-cols-3">
        {list.map((machine) => (
          <MachineCard key={machine.slug} machine={machine} />
        ))}
      </div>
    </div>
  );
}
