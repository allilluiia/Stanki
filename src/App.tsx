import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { MachinePage } from "@/pages/MachinePage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { ServicePage } from "@/pages/ServicePage";
import { DocsPage } from "@/pages/DocsPage";
import { AboutSzghPage } from "@/pages/AboutSzghPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactsPage } from "@/pages/ContactsPage";

const basename =
  import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:categorySlug" element={<CategoryPage />} />
          <Route path="machines/:machineSlug" element={<MachinePage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="about-szgh" element={<AboutSzghPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
