import { Link, useParams } from "react-router-dom";
import { getMachineBySlug } from "@/data/machines";
import { getCategoryById } from "@/data/categories";
import { MetricGrid } from "@/components/MetricGrid";
import { StatusBadge } from "@/components/StatusBadge";
import { LeadForm } from "@/components/LeadForm";

export function MachinePage() {
  const { machineSlug } = useParams();
  const machine = getMachineBySlug(machineSlug ?? "");

  if (!machine) {
    return (
      <div className="container-page py-16">
        <h1 className="section-title">Станок не найден</h1>
        <Link to="/catalog" className="btn-secondary mt-6 inline-flex">
          В каталог
        </Link>
      </div>
    );
  }

  const category = getCategoryById(machine.categoryId);

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="text-xs uppercase tracking-[0.16em] text-steel-400">
        <Link to="/catalog" className="hover:text-white">
          Каталог
        </Link>
        {category ? (
          <>
            {" / "}
            <Link to={`/catalog/${category.slug}`} className="hover:text-white">
              {category.title}
            </Link>
          </>
        ) : null}
        {" / "}
        {machine.model}
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              {machine.model}
            </h1>
            <StatusBadge status={machine.availability} />
          </div>
          <p className="mt-2 text-lg text-steel-200">{machine.name}</p>
          <p className="mt-3 max-w-2xl text-steel-300">{machine.application}</p>
        </div>
        <Link
          to={`/contacts?type=quote&machine=${machine.slug}`}
          className="btn-primary"
        >
          Получить КП
        </Link>
      </div>

      <div className="mt-8">
        <MetricGrid metrics={machine.heroMetrics} />
      </div>

      <div className="mt-8 panel overflow-hidden rounded-sm">
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-ink-700 to-ink-950">
          <div className="px-6 text-center">
            <div className="font-display text-2xl uppercase tracking-wide text-white">
              {machine.videoPlaceholder}
            </div>
            <p className="mt-2 text-sm text-steel-400">
              Видео реальной обработки — подключается из материалов SZGH
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-3xl font-semibold uppercase text-white">
              Возможности станка
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {machine.capabilities.map((item) => (
                <li
                  key={item}
                  className="panel rounded-sm px-4 py-3 text-sm text-steel-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold uppercase text-white">
              Технические характеристики
            </h2>
            <div className="mt-4 overflow-hidden rounded-sm border border-white/10">
              <table className="min-w-full text-sm">
                <tbody>
                  {machine.specs.map((row) => (
                    <tr key={row.label} className="border-t border-white/5 first:border-0">
                      <th className="w-1/2 bg-ink-900/50 px-4 py-3 text-left font-medium text-steel-300">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-white">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold uppercase text-white">
              Стандартная комплектация
            </h2>
            <ul className="mt-4 space-y-2">
              {machine.standardEquipment.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-steel-200">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold uppercase text-white">
              Опции
            </h2>
            <ul className="mt-4 space-y-2">
              {machine.options.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-steel-200">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold uppercase text-white">
              Документы
            </h2>
            <ul className="mt-4 divide-y divide-white/5 rounded-sm border border-white/10">
              {machine.documents.map((doc) => (
                <li
                  key={doc.title}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                >
                  <span className="text-steel-100">{doc.title}</span>
                  <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-steel-400">
                    {doc.availability === "available" ? "Доступен" : "По запросу"}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to={`/docs?q=${encodeURIComponent(machine.model)}`}
              className="btn-secondary mt-4 inline-flex"
            >
              Открыть в разделе документации
            </Link>
          </section>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <LeadForm
            type="quote"
            machineSlug={machine.slug}
            machineModel={machine.model}
            title={`КП на ${machine.model}`}
          />
        </div>
      </div>
    </div>
  );
}
