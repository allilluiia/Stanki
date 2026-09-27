import type { CategoryId, Machine, MachineDocument } from "./types";
import { machineHeroUrl } from "@/lib/media";

/** Document slots — all on_request until a real URL is provided */
const documentSlots = (model: string): MachineDocument[] => [
  { title: `Паспорт станка ${model}`, type: "passport", availability: "on_request" },
  { title: "Руководство оператора", type: "operator_manual", availability: "on_request" },
  { title: "Руководство по ЧПУ", type: "cnc_manual", availability: "on_request" },
  { title: "Электрическая схема", type: "electrical", availability: "on_request" },
  { title: "Схема пневматики / гидравлики", type: "fluid", availability: "on_request" },
  { title: "Каталог запасных частей", type: "parts", availability: "on_request" },
  { title: "Datasheet производителя", type: "datasheet", availability: "on_request" },
  { title: "CE Certificate", type: "ce", availability: "on_request" },
  { title: "Декларация / сертификат ЕАЭС", type: "eaeu", availability: "on_request" },
  { title: "Руководство по монтажу", type: "installation", availability: "on_request" },
  { title: "Габаритный чертёж", type: "outline", availability: "on_request" },
  { title: "Фундаментный план", type: "foundation", availability: "on_request" },
];

function createMachine(input: {
  slug: string;
  model: string;
  categoryId: CategoryId;
  name: string;
  shortDescription?: string;
  application?: string;
  capabilities?: string[];
  standardEquipment?: string[];
  options?: string[];
}): Machine {
  return {
    brand: "SZGH",
    heroMetrics: [],
    specs: [],
    compare: {},
    capabilities: input.capabilities ?? [],
    standardEquipment: input.standardEquipment ?? [],
    options: input.options ?? [],
    documents: documentSlots(input.model),
    dataStatus: "draft",
    media: {
      hero: machineHeroUrl(),
    },
    slug: input.slug,
    model: input.model,
    categoryId: input.categoryId,
    name: input.name,
    shortDescription: input.shortDescription,
    application: input.application,
  };
}

/**
 * Catalog models aligned with SZGH product line.
 * Technical metrics are intentionally empty until verified from manufacturer datasheets.
 */
export const machines: Machine[] = [
  createMachine({
    slug: "szgh-25",
    model: "SZGH-25",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ",
    shortDescription: "Токарный станок с ЧПУ серии SZGH-25.",
  }),
  createMachine({
    slug: "szgh-36j",
    model: "SZGH-36J",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ с наклонной станиной",
    shortDescription: "Токарный станок с ЧПУ SZGH-36J.",
  }),
  createMachine({
    slug: "szgh-46j",
    model: "SZGH-46J",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ с наклонной станиной",
    shortDescription: "Токарный станок с ЧПУ SZGH-46J.",
    application:
      "Токарная обработка деталей и прутка. Полные характеристики — в datasheet производителя по запросу.",
  }),
  createMachine({
    slug: "szgh-6150-6180",
    model: "SZGH-6150 / 6180",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ",
    shortDescription: "Токарные станки SZGH-6150 / 6180.",
  }),
  createMachine({
    slug: "szgh-36y",
    model: "SZGH-36Y",
    categoryId: "mill-turn",
    name: "Токарно-фрезерный центр",
    shortDescription: "Токарно-фрезерный центр SZGH-36Y.",
  }),
  createMachine({
    slug: "szgh-46y",
    model: "SZGH-46Y",
    categoryId: "mill-turn",
    name: "Токарно-фрезерный центр",
    shortDescription: "Токарно-фрезерный центр SZGH-46Y.",
  }),
  createMachine({
    slug: "szgh-540",
    model: "SZGH-540",
    categoryId: "milling",
    name: "Фрезерный станок с ЧПУ",
    shortDescription: "Фрезерный станок с ЧПУ SZGH-540.",
  }),
  createMachine({
    slug: "szgh-650",
    model: "SZGH-650",
    categoryId: "milling",
    name: "Фрезерный станок с ЧПУ",
    shortDescription: "Фрезерный станок с ЧПУ SZGH-650.",
  }),
  createMachine({
    slug: "szgh-850",
    model: "SZGH-850",
    categoryId: "milling",
    name: "Фрезерный станок с ЧПУ",
    shortDescription: "Фрезерный станок с ЧПУ SZGH-850.",
  }),
  createMachine({
    slug: "vmc650",
    model: "VMC650",
    categoryId: "vmc",
    name: "Вертикальный обрабатывающий центр",
    shortDescription: "Вертикальный обрабатывающий центр VMC650.",
  }),
  createMachine({
    slug: "vmc850",
    model: "VMC850",
    categoryId: "vmc",
    name: "Вертикальный обрабатывающий центр",
    shortDescription: "Вертикальный обрабатывающий центр VMC850.",
  }),
  createMachine({
    slug: "szgh-1090",
    model: "SZGH-1090",
    categoryId: "gantry",
    name: "Портальный обрабатывающий центр",
    shortDescription: "Портальный обрабатывающий центр SZGH-1090.",
  }),
];

export function getMachineBySlug(slug: string) {
  return machines.find((m) => m.slug === slug);
}

export function getMachinesByCategory(categoryId: string) {
  return machines.filter((m) => m.categoryId === categoryId);
}

export function searchMachines(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return machines;
  return machines.filter(
    (m) =>
      m.model.toLowerCase().includes(q) ||
      m.slug.toLowerCase().includes(q) ||
      m.name.toLowerCase().includes(q),
  );
}
