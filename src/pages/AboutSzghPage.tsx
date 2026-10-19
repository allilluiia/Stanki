import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

export function AboutSzghPage() {
  const { company } = siteConfig;

  return (
    <div className="container-page page-start">
      <h1 className="section-title">О SZGH</h1>
      <p className="section-lead">
        SZGH - производитель станков с ЧПУ и управляющей электроники.{" "}
        {siteConfig.brand} представляет линейку оборудования в каталоге и принимает
        заявки на коммерческие предложения.
      </p>

      <div className="stack-after-lead grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-none p-6">
          <h2 className="heading-2">
            Производитель
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            ShenZhen GuanHong Automation разрабатывает и производит станки с ЧПУ,
            системы управления, сервоприводы и двигатели. Единая экосистема станка и
            электроники упрощает сервис и поддержку.
          </p>
        </div>
        <div className="panel rounded-none p-6">
          <h2 className="heading-2">
            {siteConfig.brand} × SZGH
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Через каталог {siteConfig.brand} можно подобрать модель SZGH и запросить
            КП. Детали поставки и сервиса согласуются в коммерческом предложении и
            договоре.
          </p>
          {company.isOfficialDistributor ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-ink">
                Официальный дистрибьютор SZGH
              </p>
              {company.distributorCertificateUrl ? (
                <a
                  href={company.distributorCertificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-mark hover:underline"
                >
                  Подтверждающий документ →
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="stack-after-lead grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Системы ЧПУ",
            text: "Собственные контроллеры и приводы в экосистеме SZGH.",
          },
          {
            title: "Оборудование",
            text: "Токарные, фрезерные, VMC, токарно-фрезерные и портальные центры в каталоге.",
          },
          {
            title: "Документация",
            text: "Datasheet и руководства предоставляются по запросу.",
          },
        ].map((item) => (
          <div key={item.title} className="panel rounded-none p-6">
            <h3 className="heading-3">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="stack-after-lead flex flex-wrap gap-3">
        <Link to="/catalog" className="btn-primary">
          Каталог SZGH
        </Link>
        <Link to="/contacts?type=quote#lead" className="btn-secondary">
          Получить КП
        </Link>
      </div>
    </div>
  );
}
