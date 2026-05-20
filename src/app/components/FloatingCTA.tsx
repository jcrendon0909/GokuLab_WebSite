import { useState } from "react";
import { MessageCircle, Phone, FileText, X, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleWhatsApp = () => {
    // Track event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click_whatsapp", { event_category: "CTA" });
    }
    window.open("https://wa.me/5612668168?text=Hola,%20me%20interesa%20agendar%20una%20clase%20muestra%20gratuita%20en%20GOKU%20LAB", "_blank");
  };

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click_call", { event_category: "CTA" });
    }
    window.location.href = "tel:+5612668168";
  };

  const handleForm = () => {
    const el = document.getElementById("contacto-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contacto";
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options */}
      <div
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
          pointerEvents: open ? "all" : "none",
          transition: "all 0.3s ease",
        }}
        className="flex flex-col gap-2"
      >
        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95"
          style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.4)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
        >
          <MessageCircle size={20} />
          <span className="text-sm whitespace-nowrap">WhatsApp</span>
        </button>

        {/* Llamada */}
        <button
          onClick={handleCall}
          className="flex items-center gap-3 text-white px-4 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          style={{
            background: isDark ? "#0e1821" : "#1f2937",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(14,24,33,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
        >
          <Phone size={20} />
          <span className="text-sm whitespace-nowrap">Llamar ahora</span>
        </button>

        {/* Formulario */}
        <button
          onClick={handleForm}
          className="flex items-center gap-3 bg-[#7C3AED] text-white px-4 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95"
          style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.4)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
        >
          <FileText size={20} />
          <span className="text-sm whitespace-nowrap">Formulario</span>
        </button>
      </div>

      {/* Main toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white"
        style={{
          background: open
            ? "linear-gradient(135deg, #ef4444, #dc2626)"
            : "linear-gradient(135deg, #00C9FF, #7C3AED)",
          transition: "all 0.3s ease",
          transform: open ? "rotate(0deg)" : "rotate(0deg)",
          boxShadow: open
            ? "0 8px 32px rgba(239,68,68,0.5)"
            : "0 8px 32px rgba(0,201,255,0.5)",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? <X size={24} /> : <ChevronUp size={24} />}
      </button>

      {/* Label */}
      {!open && (
        <span
          className="text-xs text-white px-2 py-1 rounded-full transition-all duration-300"
          style={{
            background: isDark ? "rgba(14, 24, 33, 0.8)" : "rgba(31, 41, 55, 0.8)",
            backdropFilter: "blur(4px)",
          }}
        >
          ¡Agenda gratis!
        </span>
      )}
    </div>
  );
}
