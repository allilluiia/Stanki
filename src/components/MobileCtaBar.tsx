import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

/** Sticky action bar for phones / small tablets */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/92 backdrop-blur-md lg:hidden">
      <div className="container-page safe-bottom grid grid-cols-3 gap-2 py-2.5">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-white/10 text-xs font-semibold text-steel-100"
        >
          <Phone className="h-4 w-4 text-accent-soft" />
          Звонок
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm border border-white/10 text-xs font-semibold text-steel-100"
        >
          <Mail className="h-4 w-4 text-accent-soft" />
          Email
        </a>
        <Link
          to="/contacts?type=quote"
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent text-xs font-semibold text-white"
        >
          Получить КП
        </Link>
      </div>
    </div>
  );
}
