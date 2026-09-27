import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "turning",
    slug: "tokarnye",
    title: "Токарные станки с ЧПУ",
    description:
      "Токарные станки с ЧПУ для обработки прутка и штучных заготовок.",
    comparisonFields: [
      { key: "barDiameter", label: "Диаметр прутка" },
      { key: "maxPartDiameter", label: "Макс. диаметр детали" },
      { key: "machiningLength", label: "Длина обработки" },
      { key: "spindlePower", label: "Мощность шпинделя" },
      { key: "spindleSpeed", label: "Обороты шпинделя" },
      { key: "accuracy", label: "Точность" },
      { key: "axes", label: "Оси" },
      { key: "weight", label: "Масса" },
    ],
  },
  {
    id: "mill-turn",
    slug: "tokarno-frezernye",
    title: "Токарно-фрезерные центры",
    description:
      "Многозадачные центры с возможностью точения и фрезерования.",
    comparisonFields: [
      { key: "barDiameter", label: "Диаметр прутка" },
      { key: "travelY", label: "Ось Y" },
      { key: "spindlePower", label: "Мощность шпинделя" },
      { key: "axes", label: "Оси" },
      { key: "accuracy", label: "Точность" },
    ],
  },
  {
    id: "milling",
    slug: "frezernye",
    title: "Фрезерные станки с ЧПУ",
    description: "Фрезерные станки с ЧПУ для оснастки и мелкосерийного производства.",
    comparisonFields: [
      { key: "travelX", label: "Ход X" },
      { key: "travelY", label: "Ход Y" },
      { key: "travelZ", label: "Ход Z" },
      { key: "spindleSpeed", label: "Обороты шпинделя" },
      { key: "axes", label: "Оси" },
    ],
  },
  {
    id: "vmc",
    slug: "vertikalnye-oc",
    title: "Вертикальные обрабатывающие центры",
    description: "Вертикальные ОЦ для корпусных деталей и серийного фрезерования.",
    comparisonFields: [
      { key: "travelX", label: "Ход X" },
      { key: "travelY", label: "Ход Y" },
      { key: "travelZ", label: "Ход Z" },
      { key: "spindleSpeed", label: "Обороты шпинделя" },
      { key: "spindlePower", label: "Мощность шпинделя" },
      { key: "axes", label: "Оси" },
    ],
  },
  {
    id: "gantry",
    slug: "portalnye-oc",
    title: "Портальные обрабатывающие центры",
    description: "Портальные центры для крупногабаритных и длинных заготовок.",
    comparisonFields: [
      { key: "travelX", label: "Ход X" },
      { key: "travelY", label: "Ход Y" },
      { key: "travelZ", label: "Ход Z" },
      { key: "axes", label: "Оси" },
      { key: "weight", label: "Масса" },
    ],
  },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
