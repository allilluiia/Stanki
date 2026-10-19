import { cn } from "@/lib/utils";
import type { CategoryId, MachineMedia } from "@/data/types";
import { resolveMediaUrl } from "@/lib/media";

const categoryLabels: Record<CategoryId, string> = {
  turning: "Токарный станок с ЧПУ",
  "mill-turn": "Токарно-фрезерный центр",
  milling: "Фрезерный станок с ЧПУ",
  vmc: "Вертикальный ОЦ",
  gantry: "Портальный ОЦ",
};

export function MachineVisual({
  className,
  label,
  categoryId = "turning",
  media,
  categoryLabel,
  priority = false,
  /** Hide bottom caption when parent already shows model name */
  hideCaption = false,
}: {
  className?: string;
  label: string;
  categoryId?: CategoryId;
  media?: MachineMedia;
  categoryLabel?: string;
  priority?: boolean;
  hideCaption?: boolean;
}) {
  const typeLabel = categoryLabel ?? categoryLabels[categoryId];
  const src = resolveMediaUrl(media?.hero);

  return (
    <div className={cn("media-frame relative isolate", className)}>
      <img
        src={src}
        alt={`${label} - ${typeLabel}`}
        className="machine-hero-img h-full w-full object-contain object-center p-4 sm:p-6"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={460}
        height={460}
      />
      {!hideCaption ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/95 to-transparent px-4 pb-4 pt-16 sm:px-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {typeLabel}
          </div>
          <div className="mt-0.5 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {label}
          </div>
        </div>
      ) : null}
    </div>
  );
}
