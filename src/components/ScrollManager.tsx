import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to top on route change; honour #hash anchors (e.g. #lead on contacts).
 */
export function ScrollManager() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (scrollToHash()) return;

      // Wait a frame for the target page to paint
      const raf = window.requestAnimationFrame(() => {
        if (!scrollToHash()) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      const t = window.setTimeout(() => {
        scrollToHash();
      }, 80);
      return () => {
        window.cancelAnimationFrame(raf);
        window.clearTimeout(t);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
}
