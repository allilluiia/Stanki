import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

export function AboutPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="section-title">О компании {siteConfig.brand}</h1>
      <p className="section-lead">
        {siteConfig.brand} — B2B-поставщик металлообрабатывающего оборудования.
        Сейчас в фокусе линейка SZGH; архитектура сайта готова к добавлению других
        производителей.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-sm p-6">
          <h2 className="font-display text-2xl font-semibold uppercase text-white">
            Что мы делаем
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-steel-200">
            <li>• Поставка станков с ЧПУ предприятиям</li>
            <li>• Подбор оборудования под задачу</li>
            <li>• Пусконаладка и обучение</li>
            <li>• Гарантийный и постгарантийный сервис</li>
            <li>• Документация и запасные части</li>
          </ul>
        </div>
        <div className="panel rounded-sm p-6">
          <h2 className="font-display text-2xl font-semibold uppercase text-white">
            Как с нами работать
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-steel-300">
            Основной канал коммуникации — email. Пришлите задачу или модель: мы
            подготовим коммерческое предложение, сроки и комплект документов.
            Телефон — для срочных вопросов.
          </p>
          <div className="mt-5 space-y-1 text-sm">
            <a className="block text-accent-soft hover:underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a className="block text-steel-200 hover:text-white" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <Link to="/contacts" className="btn-primary mt-8 inline-flex">
        Связаться
      </Link>
    </div>
  );
}
