import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";
import { ChatWidget } from "./ChatWidget";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "../contexts/ThemeProvider";

export function Layout() {
  const { pathname } = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-[#0A0F1E] text-gray-900 dark:text-white transition-colors duration-300">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          
          {/* El Chat se renderiza aquí, pero está controlado por el FAB */}
          <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          
          {/* El botón flotante con las 3 opciones */}
          <FloatingCTA onOpenChat={() => setIsChatOpen(true)} />
          
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}