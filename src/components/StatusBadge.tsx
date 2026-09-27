import type { Availability } from "@/data/types";
import { cn } from "@/lib/utils";

const labels: Record<Availability, string> = {
  in_stock: "В наличии",
  expected: "Ожидается",
  on_order: "Под заказ",
};

const styles: Record<Availability, string> = {
  in_stock: "border-accent/35 bg-accent-wash text-brand",
  expected: "border-stage bg-stage-soft text-ink-muted",
  on_order: "border-line bg-canvas-soft text-ink-muted",
};

export function StatusBadge({ status }: { status?: Availability }) {
  if (!status) return null;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
