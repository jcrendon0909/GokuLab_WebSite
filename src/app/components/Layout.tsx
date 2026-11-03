import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { MessageCircle, X, Send } from "lucide-react";

// ==========================================
// URL CORREGIDA: agentevirtual-gokulab (NO valeria)
// ==========================================
const API_URL = import.meta.env.VITE_API_URL || "https://agentevirtual-gokulab.onrender.com";

type Message = { id: string; sender: "bot" | "user"; text: string; };

const QUICK_REPLIES = [
  "📚 Ver Cursos", 
  "💰 Costos", 
  "📅 Horarios", 
  "📍 Ubicación", 
  "🎓 Certificación", 
  "🧪 Hacer el Test",
  "🏢 Empresas"
];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const userId = "web_user_gokulab";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "¡Hola! 👋 Soy el Súper Agente Gōku. Estoy aquí para ayudarte a encontrar el curso perfecto, darte costos o resolver tus dudas. ¿En qué te puedo ayudar hoy?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    if (text.includes("Hacer el Test")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "¡Excelente decisión! 🚀 Te llevaré a nuestro test de orientación de 2 minutos. Al finalizar, te diré qué curso y habilidades son perfectas para ti.",
          },
        ]);
        setIsLoading(false);
        setTimeout(() => {
          setIsOpen(false);
          navigate("/test");
        }, 2000);
      }, 800);
      return;
    }

    if (text.includes("Empresas")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "¡Perfecto! Para soluciones corporativas, capacitación B2B o transformación digital, te invito a conocer nuestra división de empresas y BehaviorLab.",
          },
        ]);
        setIsLoading(false);
        setTimeout(() => {
          setIsOpen(false);
          navigate("/capacitaciones");
        }, 2500);
      }, 800);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: text,
          numero: userId,
          canal: "web",
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: data.respuesta || "Lo siento, tuve un problema. ¿Podrías repetirlo?",
        },
      ]);
    } catch (error) {
      console.error("Error conectando al bot:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "En este momento estoy desconectado. Por favor intenta de nuevo o escríbenos por WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-[#0A0F1E] border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-[#1E88E5] to-[#7C3AED] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">Súper Agente Gōku</h3>
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En línea
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-[#1E88E5] text-white rounded-br-sm" 
                      : "bg-white/10 text-gray-100 rounded-bl-sm border border-white/5"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm p-4 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isLoading && messages.length < 3 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 bg-[#050A14] border-t border-white/5 shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="flex items-center gap-2 bg-white/5 rounded-full p-1 pl-4 border border-white/10 focus-within:border-[#00C9FF] transition-colors"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 bg-[#1E88E5] hover:bg-[#00C9FF] text-white rounded-full transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-[#1E88E5] to-[#7C3AED]"
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
        
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-[#050A14] rounded-full animate-pulse" />
        )}
      </button>
    </>
  );
}

export function Layout() {
  const { pathname } = useLocation();

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
          <ChatWidget />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
} //error