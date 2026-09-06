import type { MachineMetric } from "@/data/types";

export function MetricGrid({ metrics }: { metrics: MachineMetric[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="panel rounded-sm p-4">
          <div className="font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl">
            {metric.value}
            {metric.unit ? (
              <span className="ml-1 text-base font-medium text-steel-300">
                {metric.unit}
              </span>
            ) : null}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.12em] text-steel-400">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}
