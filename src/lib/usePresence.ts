import { useEffect, useRef, useState } from "react";

/**
 * Keep content mounted through exit animation.
 * open=true → mount then visible; open=false → hide then unmount after durationMs.
 */
export function usePresence(open: boolean, durationMs = 300) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let t = 0;

    if (open) {
      setMounted(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    setVisible(false);
    t = window.setTimeout(() => setMounted(false), durationMs);
    return () => window.clearTimeout(t);
  }, [open, durationMs]);

  return { mounted, visible };
}

/**
 * Two-phase expand: width first, then height (reverse on close).
 * Double-rAF so the browser paints the closed frame before transitioning.
 */
export function usePhasedExpand(open: boolean, xMs = 320, yMs = 360) {
  const [wide, setWide] = useState(false);
  const [tall, setTall] = useState(false);
  const gen = useRef(0);

  useEffect(() => {
    const id = ++gen.current;
    let raf1 = 0;
    let raf2 = 0;
    let t = 0;

    if (open) {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (gen.current !== id) return;
          setWide(true);
          t = window.setTimeout(() => {
            if (gen.current !== id) return;
            setTall(true);
          }, xMs);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        window.clearTimeout(t);
      };
    }

    setTall(false);
    t = window.setTimeout(() => {
      if (gen.current !== id) return;
      setWide(false);
    }, yMs);

    return () => window.clearTimeout(t);
  }, [open, xMs, yMs]);

  return {
    wide,
    tall,
    active: wide || tall || open,
  };
}
