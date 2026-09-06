import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { MobileUiProvider } from "@/contexts/MobileUiContext";

export function Layout() {
  return (
    <MobileUiProvider>
      <div className="flex min-h-dvh w-full max-w-[100vw] flex-col overflow-x-clip">
        <Header />
        <main className="w-full min-w-0 flex-1 pb-[4.75rem] lg:pb-0">
          <Outlet />
        </main>
        <Footer />
        <MobileCtaBar />
      </div>
    </MobileUiProvider>
  );
}
