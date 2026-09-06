import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useMobileUi } from "@/contexts/MobileUiContext";

/** Sticky action bar for phones — hidden while menu is open */
export function MobileCtaBar() {
  const { menuOpen } = useMobileUi();
  if (menuOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/95 backdrop-blur-md lg:hidden">
      <div className="safe-bottom grid grid-cols-3 gap-2 px-3 py-2">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-sm border border-white/10 text-xs font-semibold text-steel-100"
        >
          <Phone className="h-3.5 w-3.5 text-accent-soft" />
          Звонок
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-sm border border-white/10 text-xs font-semibold text-steel-100"
        >
          <Mail className="h-3.5 w-3.5 text-accent-soft" />
          Email
        </a>
        <Link
          to="/contacts?type=quote"
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-2 text-center text-xs font-semibold leading-tight text-white"
        >
          Получить КП
        </Link>
      </div>
    </div>
  );
}
