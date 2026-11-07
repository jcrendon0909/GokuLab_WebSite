import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { MessageCircle, X, Send, Home, RotateCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { API_URL } from "../../config";
import { getSessionId } from "../../utils/session";

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
  const [userId] = useState(() => getSessionId());

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

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "¡Hola! 👋 Soy el Súper Agente Gōku. ¿En qué te puedo ayudar hoy?",
      },
    ]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    if (text.includes("Hacer el Test")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: "¡Excelente decisión! 🚀 Te llevaré a nuestro test de orientación de 2 minutos." }]);
        setIsLoading(false);
        setTimeout(() => { setIsOpen(false); navigate("/test"); }, 2000);
      }, 800);
      return;
    }

    if (text.includes("Empresas")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: "¡Perfecto! Para soluciones corporativas, te llevo a nuestra división de empresas." }]);
        setIsLoading(false);
        setTimeout(() => { setIsOpen(false); navigate("/capacitaciones"); }, 2500);
      }, 800);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: text, numero: userId, canal: "web" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: data.respuesta || "Lo siento, tuve un problema." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: "En este momento estoy desconectado." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5">
          
          <div className="bg-[#6a1b9a] p-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Asistente Virtual
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <button onClick={resetChat} className="p-1 hover:text-white transition-colors" title="Reiniciar"><RotateCw size={16} /></button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:text-white transition-colors" title="Cerrar"><X size={20} /></button>
            </div>
          </div>

          <div className="bg-[#29b6f6] p-3 flex items-center justify-between shrink-0 relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><span className="text-xl">🤖</span></div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">Súper Agente Gōku</h3>
                <p className="text-blue-100 text-xs">En línea</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 mr-2 border border-gray-200"><span className="text-sm">🤖</span></div>
                )}
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user" ? "bg-[#29b6f6] text-white rounded-tr-sm" : "bg-white text-gray-700 rounded-tl-sm border border-gray-100"
                }`}>
                  {msg.sender === "bot" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-[#29b6f6] font-bold underline hover:text-[#1E88E5]" />,
                        strong: ({ node, ...props }) => <strong {...props} className="font-black text-gray-900" />,
                        ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 my-2 space-y-1" />,
                        li: ({ node, ...props }) => <li {...props} className="text-sm" />,
                        h3: ({ node, ...props }) => <h3 {...props} className="text-base font-black text-gray-900 mt-2 mb-2" />,
                        hr: ({ node, ...props }) => <hr {...props} className="my-3 border-gray-200" />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 mr-2 border border-gray-200"><span className="text-sm">🤖</span></div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white px-3 py-2 border-t border-gray-100 shrink-0">
            <div className="grid grid-cols-3 gap-1.5">
              <button onClick={resetChat} className="col-span-3 flex items-center justify-center gap-2 py-1.5 rounded-xl bg-purple-50 text-[#6a1b9a] hover:bg-purple-100 transition-colors text-xs font-bold" title="Menú principal">
                <Home size={14} /> Menú Principal
              </button>
              {QUICK_REPLIES.map((reply) => (
                <button key={reply} onClick={() => handleSendMessage(reply)} className="text-[11px] font-semibold bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 py-1.5 px-1 rounded-xl transition-colors shadow-sm truncate" title={reply}>
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex items-center gap-2 bg-white rounded-full p-1 pl-4 border-2 border-[#29b6f6] focus-within:border-[#1E88E5] transition-colors">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Escribe tu pregunta..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none" />
              <button type="submit" disabled={!inputValue.trim() || isLoading} className="p-2 bg-[#29b6f6] hover:bg-[#1E88E5] text-white rounded-full transition-colors disabled:opacity-50"><Send size={16} /></button>
            </form>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-6 right-4 sm:right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-300 hover:scale-110 ${isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-[#6a1b9a] to-[#29b6f6]"}`}>
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
        {!isOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />}
      </button>
    </>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-[#0A0F1E] text-gray-900 dark:text-white transition-colors duration-300">
          <Header />
          <main><Outlet /></main>
          <Footer />
          <ChatWidget />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}