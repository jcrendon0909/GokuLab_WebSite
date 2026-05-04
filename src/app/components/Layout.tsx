import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "../contexts/ThemeProvider";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[#0A0F1E] dark:bg-[#0A0F1E] light:bg-white text-white dark:text-white light:text-gray-900 transition-colors duration-300">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          <FloatingCTA />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
