import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "turning",
    slug: "tokarnye",
    title: "Токарные станки с ЧПУ",
    description:
      "Токарные станки с наклонной станиной для серийного и штучного производства деталей из прутка и штучных заготовок.",
  },
  {
    id: "mill-turn",
    slug: "tokarno-frezernye",
    title: "Токарно-фрезерные центры",
    description:
      "Многозадачные центры с осью Y и приводным инструментом для точения и фрезерования за один установ.",
  },
  {
    id: "milling",
    slug: "frezernye",
    title: "Фрезерные станки с ЧПУ",
    description:
      "Фрезерные станки с ЧПУ для прототипирования, оснастки и мелкосерийного производства.",
  },
  {
    id: "vmc",
    slug: "vertikalnye-oc",
    title: "Вертикальные обрабатывающие центры",
    description:
      "Вертикальные ОЦ для высокоточной обработки корпусных деталей и серийного производства.",
  },
  {
    id: "gantry",
    slug: "portalnye-oc",
    title: "Портальные обрабатывающие центры",
    description:
      "Портальные центры для крупногабаритных деталей и длинных заготовок.",
  },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
