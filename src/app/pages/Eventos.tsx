import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { Calendar, MapPin, Clock, ArrowRight, ExternalLink, Sparkles, Filter } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://agentevirtual-gokulab.onrender.com";

type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // Formato YYYY-MM-DD
  hora: string;
  lugar: string;
  tipo: "interno" | "externo";
  audiencia: string[]; // kids, teens, adults, parents, todos
  link: string;
  precio: string;
  destacado: boolean;
};

export function Eventos() {
  const { theme } = useTheme();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"todos" | "interno" | "externo">("todos");

  useEffect(() => {
    fetch(`${API_URL}/api/eventos`)
      .then((res) => res.json())
      .then((data) => {
        // Ordenamos los eventos por fecha
        const sorted = data.sort((a: Evento, b: Evento) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        setEventos(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando eventos:", err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = eventos.filter(
    (e) => activeTab === "todos" || e.tipo === activeTab
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return { day: "--", month: "---" };
    const date = new Date(dateStr);
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    return { day: date.getDate().toString().padStart(2, '0'), month: months[date.getMonth()] };
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-white selection:bg-[#00C9FF] selection:text-black">
      
      {/* HERO */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C3AED] blur-[150px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 bg-white/5 border border-white/10 text-[#00C9FF] font-black uppercase tracking-widest">
              <Sparkles size={14} /> Agenda y Comunidad
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#7C3AED]">Eventos</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Talleres, campamentos y los mejores eventos tech del ecosistema. ¡Aprende y conecta con la comunidad!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* TABS / FILTROS */}
      <section className="py-4 px-4 sticky top-20 z-30 bg-[#050A14]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <Filter size={18} className="text-gray-500" />
          {[
            { id: "todos", label: "Todos los Eventos" },
            { id: "interno", label: "Eventos GōkuLab" },
            { id: "externo", label: "Recomendados Tech" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#00C9FF] to-[#7C3AED] text-white shadow-lg"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* LISTA DE EVENTOS */}
      <section className="py-16 px-4 max-w-5xl mx-auto min-h-[50vh]">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00C9FF] mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando eventos...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Calendar size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No hay eventos próximos</h3>
            <p className="text-gray-400">Pronto tendremos nuevas aventuras para ti.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((ev, i) => {
              const { day, month } = formatDate(ev.fecha);
              const isInternal = ev.tipo === "interno";

              return (
                <AnimatedSection key={ev.id} delay={i * 100}>
                  <div className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#00C9FF]/50 transition-all duration-300 flex flex-col md:flex-row">
                    
                    {/* Fecha (Columna Izquierda) */}
                    <div className={`p-6 flex flex-col items-center justify-center md:w-32 shrink-0 ${isInternal ? "bg-[#7C3AED]/20" : "bg-[#00C9FF]/10"}`}>
                      <span className="text-4xl font-black text-white leading-none mb-1">{day}</span>
                      <span className={`text-sm font-bold tracking-widest ${isInternal ? "text-[#A78BFA]" : "text-[#00C9FF]"}`}>{month}</span>
                    </div>

                    {/* Contenido */}
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                          isInternal ? "bg-[#7C3AED] text-white" : "bg-[#00C9FF] text-black"
                        }`}>
                          {isInternal ? "GōkuLab" : "Recomendado"}
                        </span>
                        {ev.destacado && (
                          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFE134] text-black flex items-center gap-1">
                            <Sparkles size={12} /> Destacado
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-black text-white mb-2">{ev.titulo}</h3>
                      <p className="text-gray-400 mb-6 line-clamp-2">{ev.descripcion}</p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-300">
                        <div className="flex items-center gap-2"><Clock size={16} className="text-gray-500" /> {ev.hora}</div>
                        <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /> {ev.lugar}</div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                        <span className="font-bold text-white bg-white/10 px-4 py-2 rounded-xl">
                          {ev.precio}
                        </span>
                        
                        <a 
                          href={ev.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 ${
                            isInternal 
                              ? "bg-white text-black" 
                              : "bg-transparent border-2 border-[#00C9FF] text-[#00C9FF] hover:bg-[#00C9FF]/10"
                          }`}
                        >
                          {isInternal ? "Registrarme" : "Más información"}
                          {isInternal ? <ArrowRight size={18} /> : <ExternalLink size={18} />}
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 text-center border-t border-white/5">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">¿Quieres organizar un evento con nosotros?</h2>
          <p className="text-gray-400 mb-8">Escríbenos y llevemos la tecnología a tu escuela, empresa o comunidad.</p>
          <a
            href="https://wa.me/5612668168?text=Hola,%20me%20interesa%20organizar%20un%20evento%20con%20GōkuLab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-black rounded-full hover:scale-105 transition-transform"
          >
            Contactar al equipo
          </a>
        </AnimatedSection>
      </section>
    </div>
  );
}