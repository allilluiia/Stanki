import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { getMachinesByCategory } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { LeadForm } from "@/components/LeadForm";
import type { CategoryId } from "@/data/types";

const tasks: { id: CategoryId; title: string; hint: string }[] = [
  {
    id: "turning",
    title: "Точение / пруток",
    hint: "Валы, втулки, крепёж, серийная обработка прутка",
  },
  {
    id: "mill-turn",
    title: "Точение + фрезерование",
    hint: "Сложные детали за один установ, ось Y",
  },
  {
    id: "milling",
    title: "Фрезерование",
    hint: "Оснастка, алюминий, сверление и нарезание резьбы",
  },
  {
    id: "vmc",
    title: "Корпусные детали (VMC)",
    hint: "Серийное фрезерование на вертикальном ОЦ",
  },
  {
    id: "gantry",
    title: "Крупногабарит",
    hint: "Длинные и крупные заготовки на портале",
  },
];

export function SolutionsPage() {
  const [taskId, setTaskId] = useState<CategoryId>("turning");

  const recommended = useMemo(() => getMachinesByCategory(taskId), [taskId]);
  const category = categories.find((c) => c.id === taskId);

  return (
    <div className="container-page page-start">
      <h1 className="section-title">Подбор станка</h1>
      <p className="section-lead">
        Выберите тип задачи - покажем подходящие модели SZGH и примем заявку на
        подбор.
      </p>

      <div className="stack-after-lead grid gap-cards sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => setTaskId(task.id)}
            className={`panel min-h-[7.5rem] p-5 text-left transition-[border-color,background-color,box-shadow] duration-220 ease-out ${
              taskId === task.id
                ? "border-accent bg-accent-wash"
                : "hover:border-ink"
            }`}
          >
            <div className="font-display text-xl font-semibold tracking-tight text-ink">
              {task.title}
            </div>
            <p className="mt-2 text-sm text-ink-muted">{task.hint}</p>
          </button>
        ))}
      </div>

      {category ? (
        <div className="stack-after-lead">
          <h2 className="heading-2">
            Рекомендуем: {category.title}
          </h2>
          <div className="stack-title grid gap-cards sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} />
            ))}
          </div>
          <Link
            to={`/catalog/${category.slug}`}
            className="mt-4 inline-block text-sm font-semibold text-mark hover:underline"
          >
            Смотреть всю категорию →
          </Link>
        </div>
      ) : null}

      <div className="mt-12 max-w-2xl">
        <LeadForm
          key={`select-${taskId}`}
          type="select"
          title="Заявка на подбор станка"
          context={category?.title}
          categoryId={category?.id}
        />
      </div>
    </div>
  );
}
