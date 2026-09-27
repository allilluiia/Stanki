import { cn } from "@/lib/utils";
import type { CategoryId, MachineMedia } from "@/data/types";
import { machineHeroUrl } from "@/lib/media";

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
}: {
  className?: string;
  label: string;
  categoryId?: CategoryId;
  media?: MachineMedia;
  categoryLabel?: string;
  priority?: boolean;
}) {
  const typeLabel = categoryLabel ?? categoryLabels[categoryId];
  const src = media?.hero || machineHeroUrl();

  return (
    <div className={cn("media-frame relative isolate", className)}>
      <img
        src={src}
        alt={`${label} — ${typeLabel}`}
        className="h-full w-full object-contain object-center p-5 sm:p-7"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={622}
        height={1024}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fafaf8] via-[#fafaf8]/90 to-transparent px-4 pb-5 pt-14 sm:px-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
          {typeLabel}
        </div>
        <div className="mt-0.5 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
          {label}
        </div>
      </div>
    </div>
  );
}
