import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { getMachinesByCategory } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { LeadForm } from "@/components/LeadForm";
import type { CategoryId } from "@/data/types";

const tasks: { id: CategoryId | "all"; title: string; hint: string }[] = [
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
    hint: "Оснастка, прототипы, мелкосерийные детали",
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
  const [taskId, setTaskId] = useState<(typeof tasks)[number]["id"]>("turning");

  const recommended = useMemo(() => {
    if (taskId === "all") return [];
    return getMachinesByCategory(taskId);
  }, [taskId]);

  const category = categories.find((c) => c.id === taskId);

  return (
    <div className="container-page section-y">
      <h1 className="section-title">Подбор станка</h1>
      <p className="section-lead">
        Выберите тип задачи — покажем подходящие модели SZGH и примем заявку на
        подбор.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => setTaskId(task.id)}
            className={`panel min-h-[7.5rem] rounded-sm p-5 text-left transition duration-300 ${
              taskId === task.id
                ? "border-accent/60 bg-accent/10 shadow-glow"
                : "hover:border-white/20"
            }`}
          >
            <div className="font-display text-xl font-semibold uppercase tracking-wide text-white">
              {task.title}
            </div>
            <p className="mt-2 text-sm text-steel-300">{task.hint}</p>
          </button>
        ))}
      </div>

      {category ? (
        <div className="mt-10">
          <h2 className="font-display text-3xl font-semibold uppercase text-white">
            Рекомендуем: {category.title}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} />
            ))}
          </div>
          <Link
            to={`/catalog/${category.slug}`}
            className="mt-4 inline-block text-sm font-semibold text-accent-soft hover:underline"
          >
            Смотреть всю категорию →
          </Link>
        </div>
      ) : null}

      <div className="mt-12 max-w-2xl">
        <LeadForm
          type="select"
          title="Заявка на подбор станка"
          machineModel={category?.title}
        />
      </div>
    </div>
  );
}
