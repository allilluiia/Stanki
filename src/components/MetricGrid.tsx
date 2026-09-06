import type { MachineMetric } from "@/data/types";

export function MetricGrid({ metrics }: { metrics: MachineMetric[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="panel rounded-sm p-3.5 sm:p-5">
          <div className="font-display text-xl font-semibold tracking-wide text-white sm:text-2xl md:text-3xl">
            {metric.value}
            {metric.unit ? (
              <span className="ml-1 text-sm font-medium text-steel-300 sm:text-base">
                {metric.unit}
              </span>
            ) : null}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-steel-400 sm:text-xs">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}
