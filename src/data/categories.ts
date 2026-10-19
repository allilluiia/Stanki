import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "turning",
    slug: "tokarnye",
    title: "Токарные станки с ЧПУ",
    navTitle: "Токарные",
    description:
      "Наклонная и плоская станина: пруток от 25 до 50 мм, поворот до Ø800 мм. Серии 25 / 36 / 46 / TK50 и крупногабарит 6150 / 6180.",
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
    navTitle: "Токарно-фрезерные",
    description:
      "Серия с осью Y: точение и фрезерование приводным инструментом за один зажим. Модели 36Y и 46Y.",
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
    navTitle: "Фрезерные",
    description:
      "Компактные вертикальные фрезеры 540 / 650 / 850, высокоскоростные D-версии и центр сверления-нарезки T6.",
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
    navTitle: "Вертикальные ОЦ",
    description:
      "VMC650 и VMC850: HIWIN roller, ATC 16-24, повторяемость до ±0,003 мм. Для пресс-форм и серийного фрезерования.",
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
    navTitle: "Портальные ОЦ",
    description:
      "SZGH-1090: неподвижный стол 900×1000 мм и нагрузка до 800 кг - когда заготовка не помещается на обычный VMC.",
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
