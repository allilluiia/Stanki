import type { Machine, MachineDocument } from "./types";

const defaultDocs = (model: string): MachineDocument[] => [
  { title: `Паспорт станка ${model} на русском`, availability: "on_request" },
  { title: "Руководство оператора", availability: "on_request" },
  { title: "Руководство по ЧПУ", availability: "on_request" },
  { title: "Электрическая схема", availability: "on_request" },
  { title: "Схема пневматики / гидравлики", availability: "on_request" },
  { title: "Каталог запасных частей", availability: "on_request" },
  { title: "Datasheet производителя", availability: "available" },
  { title: "CE Certificate", availability: "on_request" },
  { title: "Декларация / сертификат ЕАЭС", availability: "on_request" },
  { title: "Руководство по монтажу", availability: "on_request" },
  { title: "Габаритный чертёж", availability: "on_request" },
  { title: "Фундаментный план", availability: "on_request" },
];

const baseTurningEquipment = [
  "Система ЧПУ SZGH",
  "Сервоприводы осей",
  "Серводвигатель шпинделя",
  "Револьверная головка",
  "Гидростанция",
  "Система СОЖ",
  "Конвейер стружки",
  "Комплект инструмента",
  "Документация и комплект ЗИП",
];

const baseTurningOptions = [
  "Барфидер (податчик прутка)",
  "Ловитель деталей",
  "Дополнительный инструмент",
  "Автоматическая подача",
  "Роботизация",
  "Измерительный щуп",
];

function stubMachine(
  partial: Pick<
    Machine,
    | "slug"
    | "model"
    | "categoryId"
    | "name"
    | "shortDescription"
    | "application"
    | "heroMetrics"
    | "compare"
  > &
    Partial<Machine>,
): Machine {
  return {
    brand: "SZGH",
    availability: "on_order",
    capabilities: [
      "Серийное производство",
      "Высокая повторяемость",
      "Интеграция с ЧПУ SZGH",
    ],
    specs: partial.heroMetrics.map((m) => ({
      label: m.label,
      value: m.unit ? `${m.value} ${m.unit}` : m.value,
    })),
    standardEquipment: baseTurningEquipment,
    options: baseTurningOptions,
    documents: defaultDocs(partial.model),
    videoPlaceholder: `Видео обработки на ${partial.model} — по запросу`,
    ...partial,
  };
}

export const machines: Machine[] = [
  stubMachine({
    slug: "szgh-25",
    model: "SZGH-25",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ",
    shortDescription: "Компактный токарный станок для прутка малого диаметра.",
    application: "Мелкие детали, серийная обработка прутка.",
    availability: "on_order",
    heroMetrics: [
      { label: "Диаметр прутка", value: "25", unit: "мм" },
      { label: "Точность", value: "±0,01", unit: "мм" },
      { label: "Оси", value: "2" },
      { label: "ЧПУ", value: "SZGH" },
    ],
    compare: { barDiameter: "25 мм", machiningLength: "—" },
  }),
  stubMachine({
    slug: "szgh-36j",
    model: "SZGH-36J",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ с наклонной станиной",
    shortDescription: "Токарный центр для прутка до 36 мм и серийного точения.",
    application: "Втулки, валы, крепёж, детали из прутка.",
    availability: "expected",
    heroMetrics: [
      { label: "Диаметр прутка", value: "36", unit: "мм" },
      { label: "Точность", value: "±0,0075", unit: "мм" },
      { label: "Шпиндель", value: "5,5", unit: "кВт" },
      { label: "Масса", value: "~2,5", unit: "т" },
    ],
    compare: {
      barDiameter: "36 мм",
      spindlePower: "5,5 кВт",
    },
  }),
  {
    slug: "szgh-46j",
    model: "SZGH-46J",
    brand: "SZGH",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ с наклонной станиной",
    shortDescription:
      "Промышленный токарный станок для серийной обработки прутка и штучных заготовок с высокой повторяемостью.",
    application:
      "Для валов, втулок, фланцев и деталей из прутка: точение, нарезание резьбы, обработка прутка в серийном режиме.",
    availability: "in_stock",
    heroMetrics: [
      { label: "Макс. диаметр прутка", value: "45", unit: "мм" },
      { label: "Точность обработки", value: "±0,0075", unit: "мм" },
      { label: "Масса станка", value: "3000", unit: "кг" },
      { label: "Серводвигатель шпинделя", value: "5,5", unit: "кВт" },
    ],
    capabilities: [
      "Точение",
      "Нарезание резьбы",
      "Обработка прутка",
      "Серийное производство",
    ],
    specs: [
      { label: "Модель", value: "SZGH-46J" },
      { label: "Тип", value: "Токарный станок с ЧПУ, наклонная станина" },
      { label: "Максимальный диаметр прутка", value: "45 мм" },
      { label: "Точность обработки", value: "±0,0075 мм" },
      { label: "Мощность серводвигателя шпинделя", value: "5,5 кВт" },
      { label: "Система ЧПУ", value: "SZGH" },
      { label: "Приводы", value: "Сервоприводы SZGH" },
      { label: "Револьверная головка", value: "В стандартной комплектации" },
      { label: "Гидросистема", value: "Гидростанция в комплекте" },
      { label: "Система СОЖ", value: "Да" },
      { label: "Конвейер стружки", value: "Да" },
      { label: "Масса станка", value: "3000 кг" },
      { label: "Назначение", value: "Серийное и мелкосерийное точение" },
    ],
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель с серводвигателем 5,5 кВт",
      "Револьверная головка",
      "Гидростанция",
      "Система СОЖ",
      "Конвейер стружки",
      "Комплект инструмента",
      "Документация",
    ],
    options: [
      "Барфидер",
      "Ловитель деталей",
      "Дополнительный инструмент",
      "Автоматическая подача",
      "Роботизация",
      "Измерительный щуп",
    ],
    documents: defaultDocs("SZGH-46J"),
    videoPlaceholder: "Видео реальной обработки детали на SZGH-46J",
    compare: {
      barDiameter: "45 мм",
      spindlePower: "5,5 кВт",
      maxPartDiameter: "—",
      machiningLength: "—",
    },
  },
  stubMachine({
    slug: "szgh-6150-6180",
    model: "SZGH-6150 / 6180",
    categoryId: "turning",
    name: "Токарный станок с ЧПУ",
    shortDescription: "Токарные станки для более длинных и крупных заготовок.",
    application: "Валы и детали средней длины.",
    heroMetrics: [
      { label: "Линейка", value: "6150/6180" },
      { label: "Тип", value: "Токарный ЧПУ" },
      { label: "ЧПУ", value: "SZGH" },
      { label: "Поставка", value: "Под заказ" },
    ],
    compare: { machiningLength: "6150 / 6180" },
  }),
  stubMachine({
    slug: "szgh-36y",
    model: "SZGH-36Y",
    categoryId: "mill-turn",
    name: "Токарно-фрезерный центр",
    shortDescription: "Токарно-фрезерный центр с осью Y для сложных деталей.",
    application: "Детали, требующие точения и фрезерования за один установ.",
    availability: "expected",
    standardEquipment: [
      ...baseTurningEquipment,
      "Ось Y",
      "Приводной инструмент",
    ],
    heroMetrics: [
      { label: "Диаметр прутка", value: "36", unit: "мм" },
      { label: "Оси", value: "X/Z/Y" },
      { label: "Приводной инструмент", value: "Да" },
      { label: "ЧПУ", value: "SZGH" },
    ],
    capabilities: [
      "Точение",
      "Фрезерование",
      "Обработка за один установ",
      "Серийное производство",
    ],
    compare: { barDiameter: "36 мм", travelY: "есть" },
  }),
  stubMachine({
    slug: "szgh-46y",
    model: "SZGH-46Y",
    categoryId: "mill-turn",
    name: "Токарно-фрезерный центр",
    shortDescription:
      "Токарно-фрезерный центр на базе 46-й платформы с осью Y.",
    application: "Сложные детали из прутка без переустанова.",
    availability: "on_order",
    standardEquipment: [
      ...baseTurningEquipment,
      "Ось Y",
      "Приводной инструмент",
    ],
    heroMetrics: [
      { label: "Диаметр прутка", value: "45", unit: "мм" },
      { label: "Оси", value: "X/Z/Y" },
      { label: "Приводной инструмент", value: "Да" },
      { label: "ЧПУ", value: "SZGH" },
    ],
    capabilities: [
      "Точение",
      "Фрезерование",
      "Нарезание резьбы",
      "Multi-tasking",
    ],
    compare: { barDiameter: "45 мм", travelY: "есть" },
  }),
  stubMachine({
    slug: "szgh-540",
    model: "SZGH-540",
    categoryId: "milling",
    name: "Фрезерный станок с ЧПУ",
    shortDescription: "Компактный фрезерный станок для оснастки и прототипов.",
    application: "Оснастка, мелкосерийное фрезерование.",
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель",
      "Система СОЖ",
      "Документация",
    ],
    options: ["4-я ось", "Щуп", "Дополнительная оснастка"],
    heroMetrics: [
      { label: "Серия", value: "540" },
      { label: "Тип", value: "Фрезерный" },
      { label: "ЧПУ", value: "SZGH" },
      { label: "Оси", value: "3" },
    ],
    compare: { travelX: "540 класс", travelY: "—", travelZ: "—" },
  }),
  stubMachine({
    slug: "szgh-650",
    model: "SZGH-650",
    categoryId: "milling",
    name: "Фрезерный станок с ЧПУ",
    shortDescription: "Фрезерный станок среднего размера.",
    application: "Корпусные детали и оснастка.",
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель",
      "Система СОЖ",
      "Документация",
    ],
    options: ["4-я ось", "Щуп", "Конвейер стружки"],
    heroMetrics: [
      { label: "Серия", value: "650" },
      { label: "Тип", value: "Фрезерный" },
      { label: "ЧПУ", value: "SZGH" },
      { label: "Оси", value: "3" },
    ],
    compare: { travelX: "650 класс" },
  }),
  stubMachine({
    slug: "szgh-850",
    model: "SZGH-850",
    categoryId: "milling",
    name: "Фрезерный станок с ЧПУ",
    shortDescription: "Фрезерный станок увеличенного рабочего пространства.",
    application: "Крупнее заготовки, серийное фрезерование.",
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель",
      "Система СОЖ",
      "Документация",
    ],
    options: ["4-я ось", "Щуп", "Конвейер стружки"],
    heroMetrics: [
      { label: "Серия", value: "850" },
      { label: "Тип", value: "Фрезерный" },
      { label: "ЧПУ", value: "SZGH" },
      { label: "Оси", value: "3" },
    ],
    compare: { travelX: "850 класс" },
  }),
  stubMachine({
    slug: "vmc650",
    model: "VMC650",
    categoryId: "vmc",
    name: "Вертикальный обрабатывающий центр",
    shortDescription: "Вертикальный ОЦ для точной обработки корпусных деталей.",
    application: "Серийное фрезерование, пресс-формы, корпуса.",
    availability: "expected",
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель",
      "Магазин инструмента",
      "Система СОЖ",
      "Конвейер стружки",
      "Документация",
    ],
    options: ["4-я ось", "Щуп", "Сквозное охлаждение", "Роботизация"],
    heroMetrics: [
      { label: "Тип", value: "VMC" },
      { label: "Серия", value: "650" },
      { label: "Магазин", value: "ATC" },
      { label: "ЧПУ", value: "SZGH" },
    ],
    capabilities: [
      "Фрезерование",
      "Сверление",
      "Резьбонарезание",
      "Серийное производство",
    ],
    compare: { travelX: "650 класс", travelY: "—", travelZ: "—" },
  }),
  stubMachine({
    slug: "vmc850",
    model: "VMC850",
    categoryId: "vmc",
    name: "Вертикальный обрабатывающий центр",
    shortDescription: "Вертикальный ОЦ увеличенного размера.",
    application: "Корпусные детали среднего и крупного размера.",
    availability: "on_order",
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель",
      "Магазин инструмента",
      "Система СОЖ",
      "Конвейер стружки",
      "Документация",
    ],
    options: ["4-я ось", "Щуп", "Сквозное охлаждение", "Роботизация"],
    heroMetrics: [
      { label: "Тип", value: "VMC" },
      { label: "Серия", value: "850" },
      { label: "Магазин", value: "ATC" },
      { label: "ЧПУ", value: "SZGH" },
    ],
    capabilities: [
      "Фрезерование",
      "Сверление",
      "Резьбонарезание",
      "Серийное производство",
    ],
    compare: { travelX: "850 класс" },
  }),
  stubMachine({
    slug: "szgh-1090",
    model: "SZGH-1090",
    categoryId: "gantry",
    name: "Портальный обрабатывающий центр",
    shortDescription: "Портальный ОЦ для крупногабаритных деталей.",
    application: "Длинные и крупные заготовки, рамы, плиты.",
    standardEquipment: [
      "Система ЧПУ SZGH",
      "Сервоприводы",
      "Шпиндель",
      "Система СОЖ",
      "Документация",
    ],
    options: ["Дополнительные оси", "Щуп", "Специальная оснастка"],
    heroMetrics: [
      { label: "Тип", value: "Портал" },
      { label: "Серия", value: "1090" },
      { label: "ЧПУ", value: "SZGH" },
      { label: "Поставка", value: "Под заказ" },
    ],
    capabilities: [
      "Обработка крупногабарита",
      "Фрезерование",
      "Сверление",
      "Длинные заготовки",
    ],
    compare: { travelX: "1090 класс" },
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
