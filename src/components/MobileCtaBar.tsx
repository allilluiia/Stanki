import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { hasEmail, hasPhone, siteConfig } from "@/lib/siteConfig";
import { useMobileUi } from "@/contexts/MobileUiContext";

export function MobileCtaBar() {
  const { menuOpen } = useMobileUi();
  if (menuOpen) return null;

  const showPhone = hasPhone();
  const showEmail = hasEmail();
  const cols =
    showPhone && showEmail ? "grid-cols-3" : showPhone || showEmail ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 shadow-[0_-8px_24px_rgba(23,32,39,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-surface/85 lg:hidden">
      <div className={`safe-bottom safe-x grid ${cols} gap-2.5 px-3 py-2.5`}>
        {showPhone ? (
          <a
            href={siteConfig.company.phoneHref}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 border border-line text-xs font-semibold text-ink transition-colors duration-200 ease-soft hover:border-accent hover:bg-canvas-soft"
          >
            <Phone className="h-3.5 w-3.5 text-accent" />
            Звонок
          </a>
        ) : null}
        {showEmail ? (
          <a
            href={`mailto:${siteConfig.company.email}`}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 border border-line text-xs font-semibold text-ink transition-colors duration-200 ease-soft hover:border-accent hover:bg-canvas-soft"
          >
            <Mail className="h-3.5 w-3.5 text-accent" />
            Email
          </a>
        ) : null}
        <Link
          to="/contacts?type=quote#lead"
          className="inline-flex min-h-11 items-center justify-center bg-brand px-2 text-center text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-200 ease-soft hover:bg-accent-hover"
        >
          Получить КП
        </Link>
      </div>
    </div>
  );
}
