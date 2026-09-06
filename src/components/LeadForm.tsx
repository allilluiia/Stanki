import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export type LeadType = "quote" | "select" | "contact";

interface LeadFormProps {
  type?: LeadType;
  machineSlug?: string;
  machineModel?: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

const typeLabels: Record<LeadType, string> = {
  quote: "Запрос коммерческого предложения",
  select: "Подбор станка",
  contact: "Сообщение с сайта",
};

export function LeadForm({
  type = "contact",
  machineSlug,
  machineModel,
  title,
  className,
  compact = false,
}: LeadFormProps) {
  const [organization, setOrganization] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    machineModel
      ? `Интересует модель ${machineModel}. Прошу подготовить коммерческое предложение.`
      : "",
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorText("");

    const payload = {
      organization: organization.trim().slice(0, 200),
      name: name.trim().slice(0, 120),
      email: email.trim().slice(0, 254),
      phone: phone.trim().slice(0, 24),
      message: message.trim().slice(0, 12000),
      formType: type,
      machineSlug: machineSlug ?? "",
      machineModel: machineModel ?? "",
    };

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!payload.name || !payload.email || !emailOk || !payload.message) {
      setStatus("error");
      setErrorText("Укажите имя, корректный email и текст сообщения.");
      return;
    }

    try {
      const base = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;
      const apiUrl = import.meta.env.PROD
        ? `${base}send-mail.php`
        : "/send-mail.php";

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
        throw new Error(
          `Сервис отправки временно недоступен. Напишите на ${siteConfig.email}`,
        );
      }

      if (!result.success) {
        throw new Error(result.message || "Ошибка отправки");
      }

      setStatus("success");
      setOrganization("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorText(
        err instanceof Error
          ? err.message
          : `Не удалось отправить. Напишите на ${siteConfig.email}`,
      );
    }
  }

  return (
    <div className={cn("panel rounded-sm p-5 sm:p-7 md:p-8", className)}>
      <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-white sm:text-2xl">
        {title ?? typeLabels[type]}
      </h2>
      <p className="mt-2 text-sm text-steel-300">
        Заявка уходит на {siteConfig.email}. Или позвоните{" "}
        <a className="text-accent-soft hover:underline" href={siteConfig.phoneHref}>
          {siteConfig.phone}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
          <div>
            <label className="label-field" htmlFor="organization">
              Организация
            </label>
            <input
              id="organization"
              className="input-field"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="ООО «Пример»"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="name">
              Фамилия и имя *
            </label>
            <input
              id="name"
              className="input-field"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иванов Иван"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.ru"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="phone">
              Телефон
            </label>
            <input
              id="phone"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7…"
            />
          </div>
        </div>

        <div>
          <label className="label-field" htmlFor="message">
            Сообщение *
          </label>
          <textarea
            id="message"
            className="input-field min-h-[120px] resize-y"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Модель, задача, сроки…"
          />
        </div>

        {status === "success" ? (
          <p className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            Заявка отправлена. Мы свяжемся с вами по email.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {errorText}
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
