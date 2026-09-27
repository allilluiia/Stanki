import { Link } from "react-router-dom";
import {
  ClipboardList,
  Settings,
  GraduationCap,
  Wrench,
  PackageSearch,
  FileText,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function ServicePage() {
  const { claims } = siteConfig;

  const steps = [
    claims.machineSelection && {
      title: "Подбор оборудования",
      text: "Анализируем задачу производства и подбираем модели из каталога SZGH.",
      icon: ClipboardList,
    },
    claims.quoteRequests && {
      title: "Коммерческое предложение",
      text: "Готовим КП по выбранной модели и комплектации.",
      icon: FileText,
    },
    claims.logistics && {
      title: "Поставка",
      text: "Организуем поставку оборудования на площадку заказчика.",
      icon: Truck,
    },
    claims.commissioning && {
      title: "Ввод в эксплуатацию",
      text: "Пусконаладка на площадке заказчика.",
      icon: Settings,
    },
    claims.training && {
      title: "Обучение",
      text: "Обучение операторов и технологов на конкретной модели.",
      icon: GraduationCap,
    },
    claims.warrantyService && {
      title: "Обслуживание",
      text: "Гарантийный и постгарантийный сервис.",
      icon: Wrench,
    },
    claims.spareParts && {
      title: "Запасные части",
      text: "Поставка узлов и расходников.",
      icon: PackageSearch,
    },
    claims.documentationOnRequest && {
      title: "Документация",
      text: "Datasheet, руководства и схемы — по запросу.",
      icon: FileText,
    },
  ].filter(Boolean) as {
    title: string;
    text: string;
    icon: typeof ClipboardList;
  }[];

  return (
    <div className="container-page page-start">
      <h1 className="section-title">Сервис</h1>
      <p className="section-lead">
        Сопровождение сделки по станку SZGH. Ниже — только подтверждённые этапы
        работы. Дополнительные услуги согласуются в договоре.
      </p>

      {steps.length > 0 ? (
        <div className="stack-after-lead grid gap-cards sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="panel rounded-none p-6">
              <div className="flex items-center justify-between">
                <step.icon className="h-6 w-6 text-mark" />
                <span className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                  0{index + 1}
                </span>
              </div>
              <h2 className="mt-4 heading-2">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-muted">
          Оставьте заявку — состав услуг согласуем в коммерческом предложении.
        </p>
      )}

      <div className="panel mt-12 rounded-none p-6 sm:p-8">
        <h2 className="heading-2">
          Заявка в сервис
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Опишите модель, серийный номер (если есть) и задачу — ответим на
          указанный в форме email.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contacts?type=contact" className="btn-primary">
            Оставить заявку
          </Link>
          <Link to="/docs" className="btn-secondary">
            Документация
          </Link>
        </div>
      </div>
    </div>
  );
}
