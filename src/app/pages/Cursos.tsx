import { useState, useMemo } from "react";
import { Link, useParams } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { AudienceTabs } from "../components/AudienceTabs";
import { useTheme } from "next-themes";
import { Clock, Users, Monitor, MessageCircle, Filter, Globe, Rocket, Award, Star, ArrowRight } from "lucide-react";
import { CURSOS, ALGORITHMICS_LOGO } from "../../Data/images";
import { coursesData } from "../../Data/courses";

type Segment = "ninos" | "adolescentes" | "adultos" | "empresas" | "todos";

const segmentConfig = {
  ninos: { title: "Cursos para Niñas y Niños", subtitle: "5 – 11 años", color: "#FF6B35", badge: "🧒", desc: "Despierta su lógica y creatividad con proyectos divertidos." },
  adolescentes: { title: "Cursos para Adolescentes", subtitle: "12 – 17 años", color: "#7C3AED", badge: "🎮", desc: "Prepáralos para el futuro con código, videojuegos e IA." },
  adultos: { title: "Cursos para Adultos", subtitle: "18+ años", color: "#00C9FF", badge: "👨‍💼", desc: "Actualízate profesionalmente y domina la tecnología sin miedos." },
  empresas: { title: "Capacitación para Empresas", subtitle: "Soluciones Corporativas", color: "#10B981", badge: "🏢", desc: "Transformación digital y liderazgo para tu organización." },
  todos: { title: "Todos los Cursos", subtitle: "Catálogo Completo", color: "#7C3AED", badge: "📚", desc: "Explora nuestra oferta completa en GōkuLab." }
};

export function Cursos() {
  const { segmento } = useParams<{ segmento?: string }>();
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const { theme } = useTheme();

  // Si no hay segmento en la URL, mostramos el HUB
  const isHub = !segmento;
  const currentSegment = (segmento as Segment) || "todos";
  const config = segmentConfig[currentSegment] || segmentConfig.todos;

  // Filtramos la base de datos dinámica
  const dynamicCourses = useMemo(() => {
    let filtered = Object.values(coursesData);
    
    // Filtro por segmento (audiencia)
    if (currentSegment === "ninos") filtered = filtered.filter(c => c.targetAudience.includes("kids"));
    else if (currentSegment === "adolescentes") filtered = filtered.filter(c => c.targetAudience.includes("teens"));
    else if (currentSegment === "adultos") filtered = filtered.filter(c => c.targetAudience.includes("adults"));
    else if (currentSegment === "empresas") filtered = filtered.filter(c => c.targetAudience.includes("company"));

    return filtered.map(c => ({
      ...c,
      img: (CURSOS as any)[c.imgKey] || "https://images.unsplash.com/photo-1603354350266-a8de3496163b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      isTeen: c.targetAudience.includes("teens"),
      segment: c.targetAudience.includes("kids") ? "ninos" : c.targetAudience.includes("teens") ? "adolescentes" : c.targetAudience.includes("adults") ? "adultos" : "empresas"
    }));
  }, [currentSegment]);

  // Filtro extra por categoría (Programación, Robótica, etc. dentro del catálogo)
  const filteredCourses = dynamicCourses.filter(c => activeCategory === "todos" || c.title.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="bg-white dark:bg-[#0A0F1E] transition-colors duration-300 min-h-screen">
      
      {/* VISTA 1: HUB DE AUDIENCIAS (Si entran a /cursos) */}
      {isHub && (
        <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
              ¿Para quién es el <span className="text-[#7C3AED]">curso</span>?
            </h1>
            <p className="text-xl text-gray-600 dark:text-white/60 mb-16 max-w-2xl mx-auto">
              Selecciona el perfil y te mostraremos los programas diseñados específicamente para esa etapa de la vida.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { id: "ninos", title: "Niñas y Niños", age: "5-11 años", img: CURSOS.programacionVisual, color: "#FF6B35", desc: "Lógica, creatividad y primeros pasos en tecnología." },
              { id: "adolescentes", title: "Adolescentes", age: "12-17 años", img: CURSOS.disenoVideojuegos, color: "#7C3AED", desc: "Videojuegos, código y preparación para el futuro." },
              { id: "adultos", title: "Adultos", age: "18+ años", img: CURSOS.iaAdultos, color: "#00C9FF", desc: "Reconversión profesional, IA y habilidades digitales." },
              { id: "empresas", title: "Empresas", age: "B2B", img: CURSOS.corporativo, color: "#10B981", desc: "Capacitación y transformación digital organizacional." },
            ].map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 100}>
                <Link to={`/cursos/${item.id}`} className="group relative block h-[400px] rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl text-left">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="text-sm font-bold text-white/80 uppercase tracking-widest mb-2 block">{item.age}</span>
                    <h2 className="text-4xl font-black text-white mb-3">{item.title}</h2>
                    <p className="text-gray-300 mb-6">{item.desc}</p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-white group-hover:bg-gray-100 transition-colors">
                      Ver programas <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* VISTA 2: CATÁLOGO FILTRADO (Si entran a /cursos/ninos, etc.) */}
      {!isHub && (
        <>
          {/* HERO DEL SEGMENTO */}
          <section className="pt-32 pb-16 px-4 relative overflow-hidden" style={{ background: theme === "dark" ? `linear-gradient(180deg, #0A0F1E 0%, ${config.color}20 100%)` : `linear-gradient(180deg, #ffffff 0%, ${config.color}10 100%)` }}>
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm mb-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20" style={{ color: config.color }}>
                  <span className="text-xl">{config.badge}</span>
                  <span className="font-bold uppercase tracking-wider">{config.subtitle}</span>
                </div>
                <h1 className="text-gray-900 dark:text-white mb-4 font-black tracking-tighter" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                  {config.title}
                </h1>
                <p className="text-gray-600 dark:text-white/70 max-w-2xl mx-auto text-lg">
                  {config.desc}
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* PESTAÑAS PARA SALTAR ENTRE AUDIENCIAS */}
          <AudienceTabs active={currentSegment as any} />

          {/* FILTROS DE CATEGORÍA */}
          <section className="py-6 px-4 sticky top-[130px] z-30 transition-colors duration-300" style={{ background: theme === "dark" ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
            <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <Filter size={16} className="text-gray-400 shrink-0" />
              {["todos", "programación", "videojuegos", "diseño", "ia", "robótica"].map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-xl text-sm font-bold shrink-0 capitalize transition-all" style={{ background: activeCategory === cat ? config.color : (theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"), color: activeCategory === cat ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)") }}>
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* GRID DE CURSOS */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, i) => (
                  <AnimatedSection key={course.id} delay={i * 60}>
                    <div className="rounded-3xl overflow-hidden flex flex-col h-full group bg-white dark:bg-[#0A0F1E] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 transition-all hover:-translate-y-2 hover:shadow-xl">
                      <div className="relative h-44 overflow-hidden">
                        <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${course.color}dd, transparent)` }} />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm">{course.price}</span>
                          <span className="text-xs px-3 py-1.5 rounded-full font-bold w-fit" style={{ background: course.color, color: "#fff" }}>{course.level}</span>
                        </div>
                        <div className="absolute bottom-3 right-3 text-4xl drop-shadow-lg">{course.emoji}</div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-gray-900 dark:text-white mb-2 font-black text-base">{course.title}</h3>
                        <p className="text-gray-600 dark:text-white/60 text-sm mb-4 flex-1 line-clamp-2">{course.subtitle}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {[{ icon: Users, text: course.age }, { icon: Clock, text: course.duration }, { icon: Monitor, text: course.modality.split(" / ")[0] }].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2"><Icon size={14} className="text-gray-400" /><span className="text-gray-600 dark:text-white/60 text-xs font-medium">{text}</span></div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <Link to={`/cursos/${course.segment}/${course.id}`} className="flex-1 py-3 rounded-2xl text-center text-sm font-black text-white hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)` }}>
                            Ver curso
                          </Link>
                          <a href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20curso%20${encodeURIComponent(course.title)}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl flex items-center justify-center text-[#25D366]" style={{ background: theme === "dark" ? "#25D36620" : "#25D36615" }}>
                            <MessageCircle size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              {filteredCourses.length === 0 && (
                <div className="text-center py-20"><div className="text-5xl mb-4">🔍</div><p className="text-gray-500">No hay cursos en esta categoría.</p></div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}