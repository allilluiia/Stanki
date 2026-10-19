import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "stanki-cookie-consent";

type ConsentValue = "accepted" | "essential";

function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "essential") return value;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

/**
 * Cookie notice — shown until the visitor chooses an option.
 * Site currently uses only essential cookies / localStorage for consent itself.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  function choose(value: ConsentValue) {
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-[60] p-3 lg:bottom-0 lg:p-4 lg:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-label="Уведомление о файлах cookie"
      aria-live="polite"
    >
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 border border-line bg-white p-4 shadow-frame sm:flex-row sm:items-end sm:gap-6 sm:p-5">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
            Cookie и локальные данные
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Сайт использует необходимые технические данные (в т.ч. localStorage
            для сохранения вашего выбора) и может применять cookie для корректной
            работы. Подробнее — в{" "}
            <Link to="/cookies" className="text-accent underline-offset-2 hover:underline">
              политике cookie
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="btn-secondary min-h-11 px-4 text-xs"
            onClick={() => choose("essential")}
          >
            Только необходимые
          </button>
          <button
            type="button"
            className="btn-primary min-h-11 px-4 text-xs"
            onClick={() => choose("accepted")}
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
