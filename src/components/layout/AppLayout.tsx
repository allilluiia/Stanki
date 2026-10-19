import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollManager } from "@/components/ScrollManager";
import { MobileUiProvider } from "@/contexts/MobileUiContext";

export function Layout() {
  return (
    <MobileUiProvider>
      <ScrollManager />
      <Header />
      <div className="flex min-h-dvh w-full max-w-full flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
        <main
          id="main-content"
          className="page-enter w-full min-w-0 flex-1"
        >
          <Outlet />
        </main>
        <Footer />
        <MobileCtaBar />
      </div>
      <CookieBanner />
    </MobileUiProvider>
  );
}
