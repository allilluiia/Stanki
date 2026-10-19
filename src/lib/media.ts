function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`;
}

/** Default product photo until per-model assets are provided */
export function machineHeroUrl() {
  // Cache-bust when hero asset is retouched for contrast
  return `${withBase("media/machine-hero.png")}?v=2`;
}

/** Resolve catalog media path (local public/ or absolute URL) */
export function resolveMediaUrl(src?: string) {
  if (!src) return machineHeroUrl();
  if (/^https?:\/\//i.test(src)) return src;
  return withBase(src.replace(/^\//, ""));
}
