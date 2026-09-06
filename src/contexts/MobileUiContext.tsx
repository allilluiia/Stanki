import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type MobileUiContextValue = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const MobileUiContext = createContext<MobileUiContextValue | null>(null);

export function MobileUiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);
  return (
    <MobileUiContext.Provider value={value}>{children}</MobileUiContext.Provider>
  );
}

export function useMobileUi() {
  const ctx = useContext(MobileUiContext);
  if (!ctx) {
    throw new Error("useMobileUi must be used within MobileUiProvider");
  }
  return ctx;
}
