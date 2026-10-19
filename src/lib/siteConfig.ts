/**
 * Central business / contact / legal configuration.
 * Prefer VITE_COMPANY_* env vars in production; leave empty until verified —
 * UI hides missing optional contact fields, legal pages still render structure.
 */

function env(key: keyof ImportMetaEnv): string | undefined {
  const value = import.meta.env[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const siteConfig = {
  brand: "Stanki",
  tagline: "Станки с ЧПУ SZGH для промышленного производства",
  description:
    "Каталог токарных станков, обрабатывающих центров и токарно-фрезерных центров SZGH. Подбор оборудования и коммерческие предложения для предприятий.",

  /** Public site URL used in legal documents */
  siteUrl: env("VITE_SITE_URL") ?? "https://stanki.example",

  company: {
    /** Полное наименование оператора / продавца */
    legalName: env("VITE_COMPANY_LEGAL_NAME"),
    /** Краткое наименование для интерфейса */
    shortName: env("VITE_COMPANY_SHORT_NAME") ?? "Stanki",
    phone: env("VITE_COMPANY_PHONE"),
    phoneHref: env("VITE_COMPANY_PHONE_HREF"),
    email: env("VITE_COMPANY_EMAIL"),
    /** Email для запросов по ПДн (если отличается) */
    privacyEmail: env("VITE_COMPANY_PRIVACY_EMAIL"),
    address: env("VITE_COMPANY_ADDRESS"),
    legalAddress: env("VITE_COMPANY_LEGAL_ADDRESS"),
    inn: env("VITE_COMPANY_INN"),
    kpp: env("VITE_COMPANY_KPP"),
    ogrn: env("VITE_COMPANY_OGRN"),
    bankDetails: env("VITE_COMPANY_BANK"),
    director: env("VITE_COMPANY_DIRECTOR"),
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

  legalNav: [
    { label: "Политика ПДн", href: "/privacy" },
    { label: "Cookie", href: "/cookies" },
    { label: "Пользовательское соглашение", href: "/terms" },
    { label: "Публичная оферта", href: "/offer" },
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

export function privacyContactEmail() {
  return siteConfig.company.privacyEmail ?? siteConfig.company.email;
}

export function hasRequisites() {
  const c = siteConfig.company;
  return Boolean(c.legalName || c.inn || c.ogrn || c.legalAddress || c.address);
}

export function contactFallbackText() {
  if (hasEmail() && hasPhone()) {
    return `Напишите на ${siteConfig.company.email} или позвоните ${siteConfig.company.phone}.`;
  }
  if (hasEmail()) return `Напишите на ${siteConfig.company.email}.`;
  if (hasPhone()) return `Позвоните ${siteConfig.company.phone}.`;
  return "Оставьте заявку через форму — мы ответим на указанный email.";
}

/** Lines for footer / contacts / legal docs */
export function operatorRequisiteLines(): string[] {
  const c = siteConfig.company;
  const lines: string[] = [];
  if (c.legalName) lines.push(c.legalName);
  if (c.inn) lines.push(`ИНН ${c.inn}${c.kpp ? ` / КПП ${c.kpp}` : ""}`);
  if (c.ogrn) lines.push(`ОГРН ${c.ogrn}`);
  if (c.legalAddress) lines.push(`Юр. адрес: ${c.legalAddress}`);
  else if (c.address) lines.push(`Адрес: ${c.address}`);
  if (c.email) lines.push(`Email: ${c.email}`);
  if (c.phone) lines.push(`Тел.: ${c.phone}`);
  if (c.director) lines.push(`Руководитель: ${c.director}`);
  if (c.bankDetails) lines.push(c.bankDetails);
  return lines;
}

export function operatorDisplayName() {
  return (
    siteConfig.company.legalName ??
    siteConfig.company.shortName ??
    siteConfig.brand
  );
}
