import { Link } from "react-router-dom";
import type { Machine } from "@/data/types";
import { StatusBadge } from "@/components/StatusBadge";
import { MachineVisual } from "@/components/MachineVisual";
import { cn } from "@/lib/utils";

export function MachineCard({
  machine,
  dense = false,
}: {
  machine: Machine;
  dense?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col border-line bg-surface transition-[transform,background-color,box-shadow] duration-220 ease-out will-change-transform",
        dense
          ? "border-b border-r hover:bg-canvas-soft/50"
          : "border shadow-frame hover:-translate-y-px hover:border-accent/40",
        !dense &&
          "[clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]",
      )}
    >
      <Link to={`/machines/${machine.slug}`} className="flex flex-1 flex-col">
        <div className="relative overflow-hidden border-b border-line">
          <div className="absolute left-3 top-3 z-10 flex gap-2">
            <span className="bg-brand px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-surface-muted">
              {machine.brand}
            </span>
            <StatusBadge status={machine.availability} />
          </div>
          <MachineVisual
            label={machine.model}
            categoryId={machine.categoryId}
            media={machine.media}
            className="aspect-[4/3] border-0"
          />
        </div>
        <div className={cn("flex flex-1 flex-col", dense ? "p-4" : "p-5 sm:p-6")}>
          <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-ink transition-colors duration-180 ease-out group-hover:text-accent sm:text-xl">
            {machine.model}
          </h3>
          <p className="mt-2 text-sm leading-snug text-ink-muted">{machine.name}</p>
          {machine.shortDescription && !dense ? (
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
              {machine.shortDescription}
            </p>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </Link>
      <div className="grid grid-cols-2 border-t border-line">
        <Link
          to={`/contacts?type=quote&machine=${machine.slug}`}
          className="inline-flex min-h-11 items-center justify-center bg-brand px-2 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-muted transition-colors duration-180 ease-out hover:bg-accent-hover"
        >
          Запросить КП
        </Link>
        <Link
          to={`/machines/${machine.slug}`}
          className="inline-flex min-h-11 items-center justify-center bg-surface-muted px-2 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-180 ease-out hover:bg-brand hover:text-surface-muted"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}
