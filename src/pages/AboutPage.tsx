import { Link } from "react-router-dom";
import { CompanyRequisites } from "@/components/CompanyRequisites";
import { siteConfig } from "@/lib/siteConfig";

export function AboutPage() {
  const { claims } = siteConfig;

  const activities = [
    claims.machineSelection && "Подбор станков с ЧПУ под задачу производства",
    claims.quoteRequests && "Подготовка коммерческих предложений",
    claims.documentationOnRequest && "Предоставление документации по запросу",
    claims.commissioning && "Пусконаладка",
    claims.training && "Обучение персонала",
    claims.warrantyService && "Гарантийный и постгарантийный сервис",
    claims.spareParts && "Поставка запасных частей",
    claims.logistics && "Организация поставки",
  ].filter(Boolean) as string[];

  return (
    <div className="container-page page-start">
      <h1 className="section-title">О компании {siteConfig.brand}</h1>
      <p className="section-lead">
        {siteConfig.brand} - B2B-поставщик металлообрабатывающего оборудования
        SZGH для промышленных предприятий.
      </p>

      <div className="stack-after-lead grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-none p-6">
          <h2 className="heading-2">
            Чем занимаемся
          </h2>
          {activities.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {activities.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">
              Каталог оборудования SZGH и приём заявок на коммерческое предложение.
            </p>
          )}
        </div>
        <div className="panel rounded-none p-6">
          <h2 className="heading-2">
            Как связаться
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Оставьте заявку через форму на сайте. Укажите организацию, задачу и
            интересующую модель - ответим на указанный email.
          </p>
          <div className="mt-5">
            <CompanyRequisites />
          </div>
        </div>
      </div>

      <div className="stack-after-lead flex flex-wrap gap-3">
        <Link to="/about-szgh" className="btn-secondary">
          О SZGH
        </Link>
        <Link to="/contacts" className="btn-primary">
          Связаться
        </Link>
      </div>
    </div>
  );
}
