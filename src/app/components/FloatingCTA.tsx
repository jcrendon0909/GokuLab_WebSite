import { useState } from "react";
import { MessageCircle, Phone, MessageSquare, X } from "lucide-react";

export function FloatingCTA({ onOpenChat }: { onOpenChat: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Opciones desplegables */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5612668168"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <MessageSquare size={20} />
            <span>WhatsApp</span>
          </a>
          
          {/* Llamar */}
          <a
            href="tel:+525612668168"
            className="flex items-center gap-3 px-6 py-3 bg-[#1A2333] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Phone size={20} />
            <span>Llamar ahora</span>
          </a>

          {/* Chat */}
          <button
            onClick={() => { setIsOpen(false); onOpenChat(); }}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#1E88E5] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform relative"
          >
            <MessageCircle size={20} />
            <span>Chatea con Gōku</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </button>
        </div>
      )}

      {/* Botón Principal (Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-[#7C3AED] to-[#1E88E5]"
        }`}
      >
        {isOpen ? <X size={28} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
      </button>
    </div>
  );
}