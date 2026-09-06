import { Link } from "react-router-dom";
import type { Machine } from "@/data/types";
import { StatusBadge } from "@/components/StatusBadge";

export function MachineCard({ machine }: { machine: Machine }) {
  return (
    <Link
      to={`/machines/${machine.slug}`}
      className="panel group flex flex-col rounded-sm p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-panel"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-steel-400">
            {machine.brand}
          </div>
          <h3 className="mt-1 font-display text-2xl font-semibold uppercase tracking-wide text-white transition group-hover:text-accent-soft">
            {machine.model}
          </h3>
        </div>
        <StatusBadge status={machine.availability} />
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-300">
        {machine.shortDescription}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
        {machine.heroMetrics.slice(0, 2).map((m) => (
          <div key={m.label}>
            <div className="text-sm font-semibold text-white">
              {m.value}
              {m.unit ? ` ${m.unit}` : ""}
            </div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-steel-400">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
