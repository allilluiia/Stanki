import {
  hasEmail,
  hasPhone,
  hasRequisites,
  operatorDisplayName,
  siteConfig,
} from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Operator / seller requisites block for footer and contacts.
 * Renders available fields only; shows a short note if none are configured.
 */
export function CompanyRequisites({ className, compact = false }: Props) {
  const c = siteConfig.company;
  const hasAny =
    hasRequisites() || hasEmail() || hasPhone() || Boolean(c.director || c.bankDetails);

  if (!hasAny) {
    return (
      <div className={cn("text-sm text-ink-muted", className)}>
        <p className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
          {operatorDisplayName()}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-faint">
          Реквизиты оператора будут опубликованы после заполнения данных компании
          (ИНН, ОГРН, юридический адрес) в конфигурации сайта.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("text-sm text-ink-soft", className)}>
      <p className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
        {operatorDisplayName()}
      </p>
      <ul className={cn("mt-3 space-y-1.5", compact && "text-xs text-ink-muted")}>
        {c.inn ? (
          <li>
            ИНН {c.inn}
            {c.kpp ? ` / КПП ${c.kpp}` : ""}
          </li>
        ) : null}
        {c.ogrn ? <li>ОГРН {c.ogrn}</li> : null}
        {c.legalAddress ? <li>Юр. адрес: {c.legalAddress}</li> : null}
        {c.address && c.address !== c.legalAddress ? (
          <li>Адрес: {c.address}</li>
        ) : null}
        {hasEmail() ? (
          <li>
            <a className="link-quiet" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </li>
        ) : null}
        {hasPhone() ? (
          <li>
            <a className="link-quiet" href={c.phoneHref}>
              {c.phone}
            </a>
          </li>
        ) : null}
        {c.director ? <li>Руководитель: {c.director}</li> : null}
        {c.bankDetails && !compact ? <li>{c.bankDetails}</li> : null}
      </ul>
    </div>
  );
}
