import { useEffect, useState } from "react";

/**
 * Keep content mounted through exit animation.
 * open=true → mount then visible; open=false → hide then unmount after durationMs.
 */
export function usePresence(open: boolean, durationMs = 260) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), durationMs);
    return () => window.clearTimeout(t);
  }, [open, durationMs]);

  return { mounted, visible };
}
