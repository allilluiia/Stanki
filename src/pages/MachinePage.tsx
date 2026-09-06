import { Link, useParams } from "react-router-dom";
import { getMachineBySlug } from "@/data/machines";
import { getCategoryById } from "@/data/categories";
import { MetricGrid } from "@/components/MetricGrid";
import { StatusBadge } from "@/components/StatusBadge";
import { LeadForm } from "@/components/LeadForm";
import { MachineVisual } from "@/components/MachineVisual";

export function MachinePage() {
  const { machineSlug } = useParams();
  const machine = getMachineBySlug(machineSlug ?? "");

  if (!machine) {
    return (
      <div className="container-page section-y">
        <h1 className="section-title">Станок не найден</h1>
        <Link to="/catalog" className="btn-secondary mt-6 inline-flex">
          В каталог
        </Link>
      </div>
    );
  }

  const category = getCategoryById(machine.categoryId);

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="text-[11px] uppercase tracking-[0.16em] text-steel-400 sm:text-xs">
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

          <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-wide text-white sm:text-5xl md:text-6xl">
                  {machine.model}
                </h1>
                <StatusBadge status={machine.availability} />
              </div>
              <p className="mt-3 text-base text-steel-200 sm:text-lg">{machine.name}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-300 sm:text-base">
                {machine.application}
              </p>
              <div className="mt-6 flex flex-col gap-3 xs:flex-row">
                <Link
                  to={`/contacts?type=quote&machine=${machine.slug}`}
                  className="btn-primary"
                >
                  Получить КП
                </Link>
                <a href="#lead" className="btn-secondary">
                  Заявка на этой странице
                </a>
              </div>
            </div>

            <MachineVisual
              label={machine.model}
              className="aspect-[16/11] w-full shadow-panel"
            />
          </div>

          <div className="mt-8 sm:mt-10">
            <MetricGrid metrics={machine.heroMetrics} />
          </div>
        </div>
      </section>

      <div className="container-page section-y">
        <div className="panel mb-10 overflow-hidden rounded-sm sm:mb-12">
          <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-ink-700 to-ink-950 px-6 text-center">
            <div>
              <div className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl md:text-3xl">
                {machine.videoPlaceholder}
              </div>
              <p className="mt-2 text-sm text-steel-400">
                Видео реальной обработки — из материалов SZGH
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="space-y-10 sm:space-y-12">
            <section>
              <h2 className="font-display text-2xl font-semibold uppercase text-white sm:text-3xl">
                Возможности станка
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {machine.capabilities.map((item) => (
                  <li
                    key={item}
                    className="panel rounded-sm px-4 py-3.5 text-sm text-steel-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold uppercase text-white sm:text-3xl">
                Технические характеристики
              </h2>
              <div className="table-scroll mt-4">
                <div className="min-w-[520px] overflow-hidden rounded-sm border border-white/10 sm:min-w-0">
                  <table className="min-w-full text-sm">
                    <tbody>
                      {machine.specs.map((row) => (
                        <tr
                          key={row.label}
                          className="border-t border-white/5 first:border-0"
                        >
                          <th className="w-[48%] bg-ink-900/50 px-3 py-3 text-left font-medium text-steel-300 sm:px-4">
                            {row.label}
                          </th>
                          <td className="px-3 py-3 text-white sm:px-4">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold uppercase text-white sm:text-3xl">
                Стандартная комплектация
              </h2>
              <ul className="mt-4 space-y-2.5">
                {machine.standardEquipment.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-steel-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold uppercase text-white sm:text-3xl">
                Опции
              </h2>
              <ul className="mt-4 space-y-2.5">
                {machine.options.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-steel-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold uppercase text-white sm:text-3xl">
                Документы
              </h2>
              <ul className="mt-4 divide-y divide-white/5 rounded-sm border border-white/10">
                {machine.documents.map((doc) => (
                  <li
                    key={doc.title}
                    className="flex items-center justify-between gap-3 px-3 py-3.5 text-sm sm:px-4"
                  >
                    <span className="text-steel-100">{doc.title}</span>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.12em] text-steel-400 sm:text-xs">
                      {doc.availability === "available" ? "Доступен" : "По запросу"}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/docs?q=${encodeURIComponent(machine.model)}`}
                className="btn-secondary mt-4 inline-flex"
              >
                Открыть в документации
              </Link>
            </section>
          </div>

          <div id="lead" className="lg:sticky lg:top-28 lg:self-start">
            <LeadForm
              type="quote"
              machineSlug={machine.slug}
              machineModel={machine.model}
              title={`КП на ${machine.model}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
