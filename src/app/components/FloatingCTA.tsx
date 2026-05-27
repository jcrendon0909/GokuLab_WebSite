import { useState } from "react";
import { MessageCircle, Phone, X, ChevronUp, Bot } from "lucide-react";
import { useTheme } from "next-themes";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // Estado para el chatbot
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
    // Abrimos el chatbot y cerramos el menú principal
    setChatOpen(true);
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Options */}
        <div
          style={{
            opacity: open && !chatOpen ? 1 : 0,
            transform: open && !chatOpen ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
            pointerEvents: open && !chatOpen ? "all" : "none",
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

          {/* Chatbot Goku Lab (Botón Modernizado) */}
          <button
            onClick={handleForm}
            className="group relative overflow-hidden flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-purple-500/30"
            style={{ 
              background: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", 
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)" 
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(124, 58, 237, 0.6)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(124, 58, 237, 0.3)")}
          >
            {/* Efecto de brillo animado al pasar el mouse (Sin config extra) */}
            <div 
              className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
              style={{ transition: "transform 0.8s ease-in-out" }} 
            />

            <Bot size={20} className="text-white relative z-10 drop-shadow-md" />
            
            <span className="text-sm font-semibold whitespace-nowrap text-white relative z-10 tracking-wide">
              Chatbot Goku Lab
            </span>

            {/* Punto verde animado de "En línea" */}
            <div className="relative flex h-2.5 w-2.5 ml-1 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-white/20"></span>
            </div>
          </button>
        </div>

        {/* Main toggle */}
        <button
          onClick={() => {
            if (chatOpen) {
              setChatOpen(false);
            } else {
              setOpen(!open);
            }
          }}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white"
          style={{
            background: open || chatOpen
              ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : "linear-gradient(135deg, #00C9FF, #7C3AED)",
            transition: "all 0.3s ease",
            transform: open || chatOpen ? "rotate(0deg)" : "rotate(0deg)",
            boxShadow: open || chatOpen
              ? "0 8px 32px rgba(239,68,68,0.5)"
              : "0 8px 32px rgba(0,201,255,0.5)",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {open || chatOpen ? <X size={24} /> : <ChevronUp size={24} />}
        </button>

        {/* Label */}
        {!open && !chatOpen && (
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

      {/* Ventana Flotante del Chatbot */}
      <div
        className="fixed bottom-28 right-6 z-40 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          width: "calc(100vw - 48px)",
          maxWidth: "380px",
          height: "70vh",
          maxHeight: "550px",
          opacity: chatOpen ? 1 : 0,
          transform: chatOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          pointerEvents: chatOpen ? "all" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,0,0,0.15)",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
        }}
      >
        <div 
          className="p-4 flex justify-between items-center text-white"
          style={{ background: "#7C3AED" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-sm">Asistente Virtual Goku Lab</h3>
          </div>
          <button 
            onClick={() => setChatOpen(false)}
            className="text-white hover:opacity-80 transition-opacity"
          >
            <X size={18} />
          </button>
        </div>
        
        <iframe 
         { src="https://chatbot-gokulab-valeria.onrender.com" }
           src="https://chat.gokulab.mx/"

          className="w-full flex-1 border-none bg-white"
          title="Goku Lab Chatbot"
        />
      </div>
    </>
  );
}
