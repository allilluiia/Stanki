import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { LeadForm, type LeadType } from "@/components/LeadForm";
import { CompanyRequisites } from "@/components/CompanyRequisites";
import { getMachineBySlug } from "@/data/machines";
import { hasEmail, hasPhone, siteConfig } from "@/lib/siteConfig";

export function ContactsPage() {
  const [params] = useSearchParams();
  const typeParam = params.get("type");
  const machineSlug = params.get("machine") ?? undefined;
  const machine = machineSlug ? getMachineBySlug(machineSlug) : undefined;

  const type: LeadType = useMemo(() => {
    if (typeParam === "quote" || typeParam === "select" || typeParam === "contact") {
      return typeParam;
    }
    return "contact";
  }, [typeParam]);

  const { company } = siteConfig;

  return (
    <div className="container-page page-start">
      <h1 className="section-title">Контакты</h1>
      <p className="section-lead">
        Укажите организацию, задачу и модель — ответим коммерческим предложением
        на указанный email.
      </p>

      <div className="stack-after-lead grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-3 sm:space-y-4">
          {hasEmail() ? (
            <a
              href={`mailto:${company.email}`}
              className="panel flex min-h-[4.5rem] items-center gap-4 rounded-none p-5 transition hover:border-mark"
            >
              <Mail className="h-5 w-5 text-mark" />
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink-faint">
                  Email
                </div>
                <div className="text-lg font-semibold text-ink">{company.email}</div>
              </div>
            </a>
          ) : null}

          {hasPhone() ? (
            <a
              href={company.phoneHref}
              className="panel flex items-center gap-4 rounded-none p-5 transition hover:border-mark"
            >
              <Phone className="h-5 w-5 text-mark" />
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink-faint">
                  Телефон
                </div>
                <div className="text-lg font-semibold text-ink">{company.phone}</div>
              </div>
            </a>
          ) : null}

          {company.address || company.legalAddress ? (
            <div className="panel flex items-start gap-4 rounded-none p-5">
              <MapPin className="mt-0.5 h-5 w-5 text-mark" />
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink-faint">
                  Адрес
                </div>
                <div className="text-sm text-ink">
                  {company.address ?? company.legalAddress}
                </div>
              </div>
            </div>
          ) : null}

          <div className="panel rounded-none p-6">
            <div className="text-xs uppercase tracking-[0.14em] text-ink-faint">
              Реквизиты
            </div>
            <div className="mt-4">
              <CompanyRequisites />
            </div>
          </div>

          <div className="panel rounded-none p-6 text-sm text-ink-muted">
            Чертёж детали или ТЗ можно приложить к ответу на наше письмо после
            заявки
            {hasEmail() ? (
              <>
                {" "}
                или отправить сразу на{" "}
                <a className="text-mark hover:underline" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </>
            ) : null}
            .
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-faint">
            {siteConfig.legalNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-ink-muted hover:text-ink hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <LeadForm
          key={`${type}-${machine?.slug ?? "general"}`}
          type={type}
          machineSlug={machine?.slug}
          machineModel={machine?.model}
        />
      </div>
    </div>
  );
}
