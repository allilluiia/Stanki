import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMachines } from "@/data/machines";
import { DocumentList } from "@/components/DocumentList";

export function DocsPage() {
  const [params] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => searchMachines(query), [query]);

  return (
    <div className="container-page page-start">
      <h1 className="section-title">Документация</h1>
      <p className="section-lead">
        Найдите модель и запросите комплект документов: паспорт, руководства,
        схемы, datasheet и сертификаты.
      </p>

      <div className="stack-after-lead max-w-xl">
        <label className="label-field" htmlFor="model-search">
          Введите модель станка
        </label>
        <input
          id="model-search"
          className="input-field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SZGH-46J"
          autoComplete="off"
        />
      </div>

      <div className="stack-after-lead space-y-8">
        {results.map((machine) => (
          <section key={machine.slug} className="panel rounded-none p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl font-semibold uppercase text-ink">
                  {machine.model}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{machine.name}</p>
              </div>
              <Link
                to={`/machines/${machine.slug}`}
                className="text-sm font-semibold text-mark hover:underline"
              >
                Карточка станка →
              </Link>
            </div>

            <div className="mt-5">
              <DocumentList documents={machine.documents} />
            </div>

            <Link
              to={`/contacts?type=quote&machine=${machine.slug}#lead`}
              className="btn-secondary mt-5 inline-flex"
            >
              Запросить комплект документов
            </Link>
          </section>
        ))}

        {results.length === 0 ? (
          <p className="text-ink-muted">Ничего не найдено. Попробуйте другую модель.</p>
        ) : null}
      </div>
    </div>
  );
}
