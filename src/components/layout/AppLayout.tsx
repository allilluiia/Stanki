import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";

export function Layout() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Header />
      <main className="w-full flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
