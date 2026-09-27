/** Default product photo until per-model assets are provided */
export function machineHeroUrl() {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}media/machine-hero.jpg`;
}
