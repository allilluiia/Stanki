/**
 * Central business / contact configuration.
 * Leave optional fields empty until verified — UI hides them.
 */
export const siteConfig = {
  brand: "Stanki",
  tagline: "Станки с ЧПУ SZGH для промышленного производства",
  description:
    "Каталог токарных станков, обрабатывающих центров и токарно-фрезерных центров SZGH. Подбор оборудования и коммерческие предложения для предприятий.",

  company: {
    legalName: undefined as string | undefined,
    phone: undefined as string | undefined,
    phoneHref: undefined as string | undefined,
    email: undefined as string | undefined,
    address: undefined as string | undefined,
    inn: undefined as string | undefined,
    ogrn: undefined as string | undefined,
    isOfficialDistributor: false,
    distributorCertificateUrl: undefined as string | undefined,
  },

  /**
   * Claims shown in trust layers / service pages.
   * Enable only after business confirmation.
   */
  claims: {
    machineSelection: true,
    quoteRequests: true,
    documentationOnRequest: true,
    commissioning: false,
    training: false,
    warrantyService: false,
    spareParts: false,
    logistics: false,
  },

  nav: [
    { label: "Каталог", href: "/catalog" },
    { label: "Решения", href: "/solutions" },
    { label: "Сервис", href: "/service" },
    { label: "Документация", href: "/docs" },
    { label: "Компания", href: "/about" },
    { label: "Контакты", href: "/contacts" },
  ],

  /** Demo form mode when no mail endpoint is configured (e.g. GitHub Pages) */
  form: {
    demoMode:
      import.meta.env.VITE_FORM_DEMO === "true" ||
      (!import.meta.env.VITE_MAIL_URL && import.meta.env.VITE_PAGES_PREVIEW === "true"),
  },
} as const;

export function hasPhone() {
  return Boolean(siteConfig.company.phone && siteConfig.company.phoneHref);
}

export function hasEmail() {
  return Boolean(siteConfig.company.email);
}

export function contactFallbackText() {
  if (hasEmail() && hasPhone()) {
    return `Напишите на ${siteConfig.company.email} или позвоните ${siteConfig.company.phone}.`;
  }
  if (hasEmail()) return `Напишите на ${siteConfig.company.email}.`;
  if (hasPhone()) return `Позвоните ${siteConfig.company.phone}.`;
  return "Оставьте заявку через форму — мы ответим на указанный email.";
}
