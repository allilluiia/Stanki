import { Link, useParams } from "react-router-dom";
import { getMachineBySlug } from "@/data/machines";
import { getCategoryById } from "@/data/categories";
import { MetricGrid } from "@/components/MetricGrid";
import { StatusBadge } from "@/components/StatusBadge";
import { LeadForm } from "@/components/LeadForm";
import { MachineVisual } from "@/components/MachineVisual";
import { DocumentList } from "@/components/DocumentList";

export function MachinePage() {
  const { machineSlug } = useParams();
  const machine = getMachineBySlug(machineSlug ?? "");

  if (!machine) {
    return (
      <div className="container-page page-start">
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
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-faint sm:text-xs">
            <Link to="/catalog" className="hover:text-ink">
              Каталог
            </Link>
            {category ? (
              <>
                {" / "}
                <Link to={`/catalog/${category.slug}`} className="hover:text-ink">
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
                <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-wide text-ink sm:text-5xl md:text-6xl">
                  {machine.model}
                </h1>
                <StatusBadge status={machine.availability} />
              </div>
              <p className="mt-3 text-base text-ink-soft sm:text-lg">{machine.name}</p>
              {machine.application ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {machine.application}
                </p>
              ) : machine.shortDescription ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {machine.shortDescription}
                </p>
              ) : null}
              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <Link
                  to={`/contacts?type=quote&machine=${machine.slug}`}
                  className="btn-primary w-full sm:w-auto"
                >
                  Получить КП
                </Link>
                <a href="#lead" className="btn-secondary w-full sm:w-auto">
                  Заявка на этой странице
                </a>
              </div>
            </div>

            <MachineVisual
              label={machine.model}
              categoryId={machine.categoryId}
              media={machine.media}
              className="aspect-[16/11] w-full shadow-frame"
            />
          </div>

          {machine.heroMetrics.length > 0 ? (
            <div className="mt-8 sm:mt-10">
              <MetricGrid metrics={machine.heroMetrics} />
            </div>
          ) : null}
        </div>
      </section>

      <div className="container-page section-y">
        {machine.media?.video ? (
          <div className="panel mb-10 overflow-hidden rounded-none sm:mb-12">
            <div className="aspect-video bg-white">
              <video
                className="h-full w-full"
                controls
                preload="none"
                poster={machine.media.videoPoster}
                src={machine.media.video}
              />
            </div>
          </div>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="space-y-10 sm:space-y-12">
            {machine.capabilities.length > 0 ? (
              <section>
                <h2 className="heading-2">
                  Возможности станка
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {machine.capabilities.map((item) => (
                    <li
                      key={item}
                      className="rounded-none border border-line bg-surface px-4 py-3.5 text-sm text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {machine.specs.length > 0 ? (
              <section>
                <h2 className="heading-2">
                  Технические характеристики
                </h2>
                <div className="mt-4 overflow-hidden rounded-none border border-line">
                  <table className="min-w-full text-sm">
                    <tbody>
                      {machine.specs.map((row) => (
                        <tr
                          key={row.label}
                          className="border-t border-line-soft first:border-0"
                        >
                          <th className="w-[48%] bg-canvas-soft px-3 py-3 text-left font-medium text-ink-muted sm:px-4">
                            {row.label}
                          </th>
                          <td className="px-3 py-3 text-ink sm:px-4">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <section>
                <h2 className="heading-2">
                  Технические характеристики
                </h2>
                <p className="mt-3 text-sm text-ink-muted">
                  Полные характеристики предоставим в коммерческом предложении и
                  datasheet производителя по запросу.
                </p>
              </section>
            )}

            {machine.standardEquipment.length > 0 ? (
              <section>
                <h2 className="heading-2">
                  Стандартная комплектация
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {machine.standardEquipment.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {machine.options.length > 0 ? (
              <section>
                <h2 className="heading-2">
                  Опции
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {machine.options.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section>
              <h2 className="heading-2">
                Документы
              </h2>
              <div className="mt-4">
                <DocumentList documents={machine.documents} />
              </div>
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
              key={machine.slug}
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
