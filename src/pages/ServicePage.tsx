import { Link } from "react-router-dom";
import {
  ClipboardList,
  Presentation,
  Settings,
  GraduationCap,
  Wrench,
  PackageSearch,
} from "lucide-react";

const steps = [
  {
    title: "Подбор оборудования",
    text: "Анализируем деталь, материал, серийность и требования по точности.",
    icon: ClipboardList,
  },
  {
    title: "Демонстрация",
    text: "Показываем возможности станка и типовые режимы обработки.",
    icon: Presentation,
  },
  {
    title: "Ввод в эксплуатацию",
    text: "ПНР на площадке заказчика, проверка точности и режимов.",
    icon: Settings,
  },
  {
    title: "Обучение",
    text: "Операторы и технологи получают практику на конкретной модели.",
    icon: GraduationCap,
  },
  {
    title: "Обслуживание и ремонт",
    text: "Плановое ТО, диагностика и восстановление работоспособности.",
    icon: Wrench,
  },
  {
    title: "Запасные части",
    text: "Склад ЗИП и поставка узлов под гарантию и постгарантию.",
    icon: PackageSearch,
  },
];

export function ServicePage() {
  return (
    <div className="container-page section-y">
      <h1 className="section-title">Сервис</h1>
      <p className="section-lead">
        Stanki сопровождает станок после поставки: от подбора до запасных частей.
        Для китайских станков это критично — мы строим сервис как часть продажи.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="panel rounded-sm p-6">
            <div className="flex items-center justify-between">
              <step.icon className="h-6 w-6 text-accent-soft" />
              <span className="text-xs uppercase tracking-[0.16em] text-steel-500">
                0{index + 1}
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-white">
              {step.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-steel-300">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="panel mt-12 rounded-sm p-8">
        <h2 className="font-display text-3xl font-semibold uppercase text-white">
          Гарантия и поддержка
        </h2>
        <p className="mt-3 max-w-3xl text-steel-300">
          Гарантийные обязательства фиксируются в договоре поставки. Техническая
          поддержка — преимущественно по email с приложением фото/видео и логов
          ЧПУ; срочные вопросы — по телефону.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contacts?type=contact" className="btn-primary">
            Заявка в сервис
          </Link>
          <Link to="/docs" className="btn-secondary">
            Документация
          </Link>
        </div>
      </div>
    </div>
  );
}
