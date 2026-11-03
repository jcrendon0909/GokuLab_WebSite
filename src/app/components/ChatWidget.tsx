import { useState, useEffect, useRef } from "react";
import { Send, X, ExternalLink, Maximize2, RotateCw } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://agentevirtual-gokulab.onrender.com";

type Message = { id: string; sender: "bot" | "user"; text: string; };

const QUICK_REPLIES = [
  "💰 Costos", "📚 Cursos", "🕒 Horarios", "📍 Ubicación", 
  "🎓 Certificación", "🎯 Clase demo", "💳 Pagos", "🧠 Metodología",
  "✂️ Materiales", "🧑‍🏫 Maestros", "🅿️ Estacionamiento", "📚 Múltiples cursos",
  "📅 Reagendar", "🏕️ Vacacionales"
];

export function ChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = "web_user_gokulab";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        id: "welcome", 
        sender: "bot", 
        text: "¡Hola! 👋 Soy Gōku. Puedo ayudarte con información sobre cursos, horarios, costos, ubicación y más. ¿En qué te puedo ayudar?" 
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: text, numero: userId, canal: "web" }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: data.respuesta || "Lo siento, tuve un problema." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: "En este momento estoy desconectado. Por favor intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-[420px] h-[650px] max-h-[85vh] bg-[#f8f9fa] rounded-2xl shadow-2xl flex flex-col z-[60] overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5">
      
      {/* Header Morado */}
      <div className="bg-[#6a1b9a] p-3 px-4 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-white font-bold text-base leading-tight">Asistente Virtual</h3>
          <div className="flex items-center gap-1.5 text-xs text-green-300">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> En línea
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <ExternalLink size={16} className="cursor-pointer hover:text-white" />
          <Maximize2 size={16} className="cursor-pointer hover:text-white" />
          <RotateCw size={16} className="cursor-pointer hover:text-white" />
          <button onClick={onClose} className="hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Banner Azul */}
      <div className="bg-[#29b6f6] p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg leading-tight">Súper Agente Gōku</h4>
            <div className="flex items-center gap-1.5 text-xs text-white/90">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> En línea
            </div>
          </div>
        </div>
        <button className="bg-white text-[#29b6f6] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm relative z-10">
          Do it!
        </button>
        {/* Círculo decorativo de fondo */}
        <div className="absolute -bottom-8 -right-4 w-32 h-32 bg-white/10 rounded-full" />
      </div>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center text-xs text-gray-400 font-semibold mb-4">HOY</div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && (
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                <span className="text-lg">🤖</span>
              </div>
            )}
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div className={`p-4 text-sm leading-relaxed shadow-sm ${
                msg.sender === "user" 
                  ? "bg-[#6a1b9a] text-white rounded-2xl rounded-tr-sm" 
                  : "bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100"
              }`}>
                {msg.text}
              </div>
              <span className={`text-[10px] text-gray-400 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                ahora
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
              <span className="text-lg">🤖</span>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Botones de Acceso Rápido */}
      <div className="px-4 pb-2 bg-[#f8f9fa]">
        <div className="flex flex-wrap gap-2">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSendMessage(reply)}
              className="text-xs font-semibold bg-white hover:bg-gray-50 border border-[#29b6f6]/30 text-gray-700 px-3 py-1.5 rounded-full shadow-sm transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
          className="flex items-center gap-2 bg-white rounded-full p-1 pl-4 border-2 border-[#29b6f6] focus-within:border-[#1E88E5] transition-colors"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-[#29b6f6] hover:bg-[#1E88E5] text-white rounded-full transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}