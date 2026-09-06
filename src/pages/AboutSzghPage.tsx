import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

export function AboutSzghPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="section-title">Официальный дистрибьютор SZGH</h1>
      <p className="section-lead">
        {siteConfig.brand} представляет станки и системы ЧПУ SZGH на территории
        дистрибуции с полным циклом поставки и сервиса.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-sm p-6">
          <h2 className="font-display text-2xl font-semibold uppercase text-white">
            {siteConfig.brand} × SZGH
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-steel-300">
            Мы работаем как прямой канал поставки: оборудование, пусконаладка,
            обучение, гарантия и запасные части. Позиционирование — промышленный
            B2B-дистрибьютор, а не «перекупка станков».
          </p>
        </div>
        <div className="panel rounded-sm p-6">
          <h2 className="font-display text-2xl font-semibold uppercase text-white">
            Производитель SZGH
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-steel-300">
            ShenZhen GuanHong Automation разрабатывает и производит собственные
            системы ЧПУ, сервоприводы и двигатели. Это даёт единую экосистему
            станка и управляющей электроники.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Собственные узлы",
            text: "ЧПУ, приводы и двигатели SZGH — аргумент надёжности и сервиса.",
          },
          {
            title: "Гарантийные обязательства",
            text: "Условия гарантии фиксируются в договоре поставки.",
          },
          {
            title: "Инженеры и ПНР",
            text: "Ввод в эксплуатацию и обучение на площадке заказчика.",
          },
          {
            title: "Склад ЗИП",
            text: "Запасные части и расходники под эксплуатацию парка.",
          },
          {
            title: "Техподдержка",
            text: "Основной канал — email, срочные вопросы — телефон.",
          },
          {
            title: "Территория",
            text: "Дистрибуция по согласованной территории (уточняется в договоре).",
          },
        ].map((item) => (
          <div key={item.title} className="panel rounded-sm p-5">
            <h3 className="font-display text-xl font-semibold uppercase text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-steel-300">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-10 aspect-[21/9] overflow-hidden rounded-sm bg-gradient-to-br from-ink-700 to-ink-950">
        <div className="flex h-full items-center justify-center text-center">
          <div>
            <div className="font-display text-2xl uppercase tracking-wide text-white">
              Производство SZGH
            </div>
            <p className="mt-2 text-sm text-steel-400">
              Фотографии завода и сертификат дистрибьютора — добавляются после
              согласования с производителем
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/catalog" className="btn-primary">
          Каталог SZGH
        </Link>
        <Link to="/contacts?type=quote" className="btn-secondary">
          Получить КП
        </Link>
      </div>
    </div>
  );
}
