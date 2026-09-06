import type { Availability } from "@/data/types";
import { cn } from "@/lib/utils";

const labels: Record<Availability, string> = {
  in_stock: "В наличии",
  expected: "Ожидается",
  on_order: "Под заказ",
};

const styles: Record<Availability, string> = {
  in_stock: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  expected: "border-brass/50 bg-brass/10 text-brass-soft",
  on_order: "border-steel-400/40 bg-steel-500/10 text-steel-200",
};

export function StatusBadge({ status }: { status: Availability }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
