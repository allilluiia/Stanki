import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="container-page page-start">
      <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Ошибка</p>
      <h1 className="mt-2 font-display text-6xl font-bold uppercase tracking-wide text-ink sm:text-7xl">
        404
      </h1>
      <p className="mt-3 max-w-lg text-base text-ink-soft sm:text-lg">
        Страница не найдена. Проверьте адрес или перейдите в каталог станков SZGH.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/catalog" className="btn-primary">
          В каталог
        </Link>
        <Link to="/" className="btn-secondary">
          На главную
        </Link>
        <Link to="/solutions" className="btn-secondary">
          Подбор станка
        </Link>
      </div>
    </div>
  );
}
