import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMachines } from "@/data/machines";

export function DocsPage() {
  const [params] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => searchMachines(query), [query]);

  return (
    <div className="container-page section-y">
      <h1 className="section-title">Документация</h1>
      <p className="section-lead">
        Найдите модель и получите комплект документов дистрибьютора: паспорт,
        руководства, схемы, datasheet и сертификаты.
      </p>

      <div className="mt-8 max-w-xl">
        <label className="label-field" htmlFor="model-search">
          Введите модель станка
        </label>
        <input
          id="model-search"
          className="input-field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SZGH-46J"
        />
      </div>

      <div className="mt-10 space-y-8">
        {results.map((machine) => (
          <section key={machine.slug} className="panel rounded-sm p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl font-semibold uppercase text-white">
                  {machine.model}
                </h2>
                <p className="mt-1 text-sm text-steel-300">{machine.name}</p>
              </div>
              <Link
                to={`/machines/${machine.slug}`}
                className="text-sm font-semibold text-accent-soft hover:underline"
              >
                Карточка станка →
              </Link>
            </div>

            <ul className="mt-5 divide-y divide-white/5 rounded-sm border border-white/10">
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
              to={`/contacts?type=quote&machine=${machine.slug}`}
              className="btn-secondary mt-5 inline-flex"
            >
              Запросить комплект документов
            </Link>
          </section>
        ))}

        {results.length === 0 ? (
          <p className="text-steel-300">Ничего не найдено. Попробуйте другую модель.</p>
        ) : null}
      </div>
    </div>
  );
}
