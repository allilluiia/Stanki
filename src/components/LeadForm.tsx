import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { contactFallbackText, hasEmail, hasPhone, siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export type LeadType = "quote" | "select" | "contact";

interface LeadFormProps {
  type?: LeadType;
  machineSlug?: string;
  machineModel?: string;
  /** Free-form context (e.g. selected task / category title) — not a machine model */
  context?: string;
  categoryId?: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

const typeLabels: Record<LeadType, string> = {
  quote: "Запрос коммерческого предложения",
  select: "Подбор станка",
  contact: "Сообщение с сайта",
};

const USER_ERROR =
  "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по email.";

function buildDefaultMessage(machineModel?: string, context?: string) {
  if (machineModel) {
    return `Интересует модель ${machineModel}. Прошу подготовить коммерческое предложение.`;
  }
  if (context) {
    return `Интересует направление: ${context}. Прошу помочь с подбором оборудования.`;
  }
  return "";
}

function resolveMailUrl(): string | null {
  const envUrl = import.meta.env.VITE_MAIL_URL as string | undefined;
  if (envUrl && envUrl.trim()) return envUrl.trim();

  if (siteConfig.form.demoMode) return null;

  if (import.meta.env.PROD) {
    const base = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    return `${base}send-mail.php`;
  }

  return "/send-mail.php";
}

export function LeadForm({
  type = "contact",
  machineSlug,
  machineModel,
  context,
  categoryId,
  title,
  className,
  compact = false,
}: LeadFormProps) {
  const uid = useId();
  const [organization, setOrganization] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(() =>
    buildDefaultMessage(machineModel, context),
  );
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Укажите имя";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Укажите корректный email";
    }
    if (!message.trim()) next.message = "Укажите сообщение";
    if (!consent) next.consent = "Нужно согласие на обработку персональных данных";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorText("");
    if (!validate()) {
      setStatus("error");
      setErrorText("Проверьте обязательные поля формы.");
      return;
    }

    setStatus("loading");

    const payload = {
      organization: organization.trim().slice(0, 200),
      name: name.trim().slice(0, 120),
      email: email.trim().slice(0, 254),
      phone: phone.trim().slice(0, 24),
      message: message.trim().slice(0, 12000),
      formType: type,
      machineSlug: (machineSlug ?? "").slice(0, 80),
      machineModel: (machineModel ?? "").slice(0, 120),
      context: (context ?? "").slice(0, 200),
      categoryId: (categoryId ?? "").slice(0, 40),
      website: honeypot,
      formStartedAt: startedAt,
      consent: true,
    };

    const apiUrl = resolveMailUrl();

    if (!apiUrl) {
      // Demo / preview without backend
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setOrganization("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setConsent(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await response.text();
      let result: { success?: boolean; message?: string };
      try {
        result = JSON.parse(raw) as { success?: boolean; message?: string };
      } catch {
        throw new Error(USER_ERROR);
      }

      if (!response.ok || !result.success) {
        throw new Error(USER_ERROR);
      }

      setStatus("success");
      setOrganization("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorText(USER_ERROR);
    }
  }

  if (status === "success") {
    return (
      <div className={cn("panel rounded-none p-5 sm:p-7 md:p-8", className)}>
        <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-ink sm:text-2xl">
          Заявка отправлена
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted" role="status" aria-live="polite">
          {siteConfig.form.demoMode
            ? "Демо-режим: заявка не отправлялась на сервер. В production форма будет работать через настроенный почтовый endpoint."
            : "Спасибо. Мы получили вашу заявку и ответим на указанный email."}
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setStatus("idle")}
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <div className={cn("panel rounded-none p-6 sm:p-8 md:p-9", className)}>
      <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-ink sm:text-2xl">
        {title ?? typeLabels[type]}
      </h2>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{contactFallbackText()}</p>
      {siteConfig.form.demoMode ? (
        <p className="mt-2 text-xs text-accent">
          Демо-превью: отправка на почтовый сервер отключена.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        {/* Honeypot */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
          <div>
            <label className="label-field" htmlFor={`${uid}-org`}>
              Организация
            </label>
            <input
              id={`${uid}-org`}
              className="input-field"
              autoComplete="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
          <div>
            <label className="label-field" htmlFor={`${uid}-name`}>
              Фамилия и имя *
            </label>
            <input
              id={`${uid}-name`}
              className="input-field"
              autoComplete="name"
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `${uid}-name-err` : undefined}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {fieldErrors.name ? (
              <p id={`${uid}-name-err`} className="mt-1 text-xs text-red-700">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor={`${uid}-email`}>
              Email *
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              inputMode="email"
              className="input-field"
              autoComplete="email"
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${uid}-email-err` : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email ? (
              <p id={`${uid}-email-err`} className="mt-1 text-xs text-red-700">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label className="label-field" htmlFor={`${uid}-phone`}>
              Телефон
            </label>
            <input
              id={`${uid}-phone`}
              type="tel"
              inputMode="tel"
              className="input-field"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label-field" htmlFor={`${uid}-message`}>
            Сообщение *
          </label>
          <textarea
            id={`${uid}-message`}
            className="input-field min-h-[120px] resize-y"
            required
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? `${uid}-message-err` : undefined}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Модель, задача, материал, серийность…"
          />
          {fieldErrors.message ? (
            <p id={`${uid}-message-err`} className="mt-1 text-xs text-red-700">
              {fieldErrors.message}
            </p>
          ) : null}
          <p className="mt-2 text-xs text-ink-faint">
            Чертёж или ТЗ можно прислать ответом на письмо после заявки
            {hasEmail() ? ` (${siteConfig.company.email})` : ""}.
          </p>
        </div>

        <div className="border border-line bg-canvas-soft/80 px-3 py-3 sm:px-4">
          <label
            htmlFor={`${uid}-consent`}
            className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-muted"
          >
            <input
              id={`${uid}-consent`}
              name="consent"
              type="checkbox"
              required
              className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (fieldErrors.consent) {
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next.consent;
                    return next;
                  });
                }
              }}
              aria-invalid={Boolean(fieldErrors.consent)}
              aria-describedby={fieldErrors.consent ? `${uid}-consent-err` : undefined}
            />
            <span>
              Я даю согласие на обработку персональных данных на условиях{" "}
              <Link
                to="/privacy"
                className="font-medium text-accent underline-offset-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Политики обработки персональных данных
              </Link>
              .
            </span>
          </label>
          {fieldErrors.consent ? (
            <p id={`${uid}-consent-err`} className="mt-2 text-xs text-red-700">
              {fieldErrors.consent}
            </p>
          ) : null}
        </div>

        {status === "error" ? (
          <p className="rounded-none border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert" aria-live="assertive">
            {errorText}
            {hasPhone() || hasEmail() ? (
              <>
                {" "}
                {hasEmail() ? (
                  <a className="underline" href={`mailto:${siteConfig.company.email}`}>
                    {siteConfig.company.email}
                  </a>
                ) : null}
                {hasPhone() ? (
                  <>
                    {hasEmail() ? " / " : null}
                    <a className="underline" href={siteConfig.company.phoneHref}>
                      {siteConfig.company.phone}
                    </a>
                  </>
                ) : null}
              </>
            ) : null}
          </p>
        ) : null}

        <button
          type="submit"
          className="btn-primary w-full sm:w-auto"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Отправка…" : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
}
