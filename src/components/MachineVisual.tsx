import { cn } from "@/lib/utils";

/** Premium CNC lathe silhouette for hero / machine visuals */
export function MachineVisual({
  className,
  label = "SZGH-46J",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-ink-700 via-ink-900 to-ink-950",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-machine-sheen" />
      <div className="pointer-events-none absolute -right-16 top-1/4 h-56 w-56 rounded-full bg-accent/25 blur-3xl animate-pulse-soft" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brass/15 blur-3xl" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-x-0 h-24 animate-scan-line bg-gradient-to-b from-accent/0 via-accent/25 to-accent/0" />
      </div>

      <svg
        viewBox="0 0 640 420"
        className="relative z-10 h-full w-full motion-safe:lg:animate-float"
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a4a5e" />
            <stop offset="45%" stopColor="#1c2633" />
            <stop offset="100%" stopColor="#0c1016" />
          </linearGradient>
          <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f7db5" stopOpacity="0" />
            <stop offset="50%" stopColor="#3d93cf" />
            <stop offset="100%" stopColor="#2f7db5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Floor reflection */}
        <ellipse cx="320" cy="372" rx="210" ry="18" fill="#2f7db5" opacity="0.12" />

        {/* Base */}
        <path
          d="M90 320 L550 320 L530 360 L110 360 Z"
          fill="url(#body)"
          stroke="#6b87a6"
          strokeOpacity="0.35"
        />

        {/* Slanted bed */}
        <path
          d="M130 300 L500 255 L520 300 L150 345 Z"
          fill="#141b24"
          stroke="#8fa8c2"
          strokeOpacity="0.25"
        />

        {/* Headstock */}
        <rect
          x="120"
          y="160"
          width="120"
          height="150"
          rx="6"
          fill="url(#body)"
          stroke="#6b87a6"
          strokeOpacity="0.4"
        />
        <circle cx="180" cy="235" r="42" fill="#0c1016" stroke="#2f7db5" strokeWidth="3" />
        <circle cx="180" cy="235" r="22" fill="#1c2633" stroke="#b08a4a" strokeWidth="2" />
        <circle cx="180" cy="235" r="8" fill="#3d93cf" />

        {/* Carriage / turret */}
        <rect
          x="300"
          y="200"
          width="95"
          height="70"
          rx="4"
          fill="#1c2633"
          stroke="#8fa8c2"
          strokeOpacity="0.35"
        />
        <rect x="318" y="175" width="18" height="30" fill="#2f7db5" opacity="0.85" />
        <rect x="344" y="168" width="18" height="37" fill="#3d93cf" opacity="0.7" />
        <rect x="370" y="180" width="18" height="25" fill="#2f7db5" opacity="0.55" />

        {/* Tailstock */}
        <rect
          x="460"
          y="210"
          width="70"
          height="95"
          rx="4"
          fill="url(#body)"
          stroke="#6b87a6"
          strokeOpacity="0.35"
        />
        <rect x="448" y="240" width="20" height="14" fill="#b08a4a" opacity="0.8" />

        {/* Control panel */}
        <rect
          x="250"
          y="120"
          width="70"
          height="48"
          rx="3"
          fill="#0c1016"
          stroke="#2f7db5"
          strokeOpacity="0.5"
        />
        <rect x="260" y="128" width="50" height="22" rx="2" fill="#1e4f72" opacity="0.7" />
        <circle cx="268" cy="158" r="3" fill="#3d93cf" />
        <circle cx="280" cy="158" r="3" fill="#b08a4a" />
        <circle cx="292" cy="158" r="3" fill="#6b87a6" />

        <line x1="100" y1="140" x2="540" y2="140" stroke="url(#accentLine)" strokeWidth="1.5" />
      </svg>

      <div className="absolute bottom-3 left-3 right-3 z-20 sm:bottom-5 sm:left-5 sm:right-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-steel-400">
          CNC Turning Center
        </div>
        <div className="font-display text-lg font-semibold uppercase tracking-wide text-white sm:text-2xl">
          {label}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-steel-400 sm:text-xs">
          45 мм · ±0,0075 · 5,5 кВт
        </div>
      </div>
    </div>
  );
}
