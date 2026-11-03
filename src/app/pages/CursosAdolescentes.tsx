import { useState, useMemo } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { AudienceTabs } from "../components/AudienceTabs"; // <-- Importante
import { useTheme } from "next-themes";
import { Clock, Users, BarChart2, Monitor, MessageCircle, Filter } from "lucide-react";

import { coursesData } from "../../Data/courses";
import { CURSOS } from "../../Data/images";

const TEEN_IMG = "https://images.unsplash.com/photo-1635959952534-d99f969554a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";

type Category = "todos" | "programacion" | "videojuegos" | "diseno" | "ia";

const categories: { id: Category | "todos"; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "📚" },
  { id: "programacion", label: "Programación", emoji: "💻" },
  { id: "videojuegos", label: "Videojuegos", emoji: "🎮" },
  { id: "diseno", label: "Diseño y Video", emoji: "🎬" },
  { id: "ia", label: "Inteligencia Artificial", emoji: "🧠" },
];

export function CursosAdolescentes() {
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");
  const { theme } = useTheme();

  const dynamicCourses = useMemo(() => {
    return Object.values(coursesData)
      .filter(c => c.targetAudience.includes("teens"))
      .map(c => {
        let cat: Category = "programacion";
        if (c.title.toLowerCase().includes("roblox") || c.title.toLowerCase().includes("unity") || c.title.toLowerCase().includes("videojuegos")) cat = "videojuegos";
        else if (c.title.toLowerCase().includes("video") || c.title.toLowerCase().includes("diseño")) cat = "diseno";
        else if (c.title.toLowerCase().includes("inteligencia") || c.title.toLowerCase().includes("ia")) cat = "ia";

        return {
          id: c.id,
          title: c.title,
          desc: c.subtitle,
          age: c.age,
          level: c.level,
          duration: c.duration,
          modality: c.modality,
          price: c.price,
          techs: c.techs,
          category: cat,
          color: c.color,
          img: (CURSOS as any)[c.imgKey] || TEEN_IMG,
          emoji: c.emoji,
        };
      });
  }, []);

  const filtered = dynamicCourses.filter((c) => activeCategory === "todos" || c.category === activeCategory);

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: theme === "dark" 
          ? "linear-gradient(180deg, #050A14 0%, #1a0b2e 40%, #2d1b69 80%, #050A14 100%)"
          : "linear-gradient(180deg, #f5f3ff 0%, #ede9fe 40%, #ddd6fe 80%, #f5f3ff 100%)"
      }}
    >
      {/* PESTAÑAS DE AUDIENCIA (Reemplaza los botones viejos) */}
      <div className="pt-20">
        <AudienceTabs active="adolescentes" />
      </div>

      {/* HERO CYBERPUNK */}
      <section className="pt-16 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{ background: theme === "dark" ? "#00C9FF" : "#7C3AED", width: Math.random() * 3 + 1 + "px", height: Math.random() * 3 + 1 + "px", top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", opacity: Math.random() * 0.8 + 0.2, animation: `pulse ${Math.random() * 3 + 2}s infinite` }} />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm mb-6 backdrop-blur-sm" style={{ background: "rgba(124,58,237,0.15)", border: "2px solid rgba(124,58,237,0.5)" }}>
              <span className="text-3xl animate-bounce">🎮</span>
              <span className="text-gray-900 dark:text-white font-bold">12 – 17 años</span>
              <span className="text-2xl">⚡</span>
            </div>

            <h1 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.15 }}>
              <span style={{ background: "linear-gradient(90deg, #7C3AED, #00C9FF, #E53E3E)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientMove 4s ease infinite" }}>
                ¡Domina el Futuro!
              </span>
              <div className="text-gray-900 dark:text-white mt-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                Cursos Tech para Adolescentes
              </div>
            </h1>

            <p className="text-gray-700 dark:text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Deja de solo jugar y empieza a crear. Aprende a programar los videojuegos que amas, diseña tu propio contenido y prepárate para la universidad. 🚀👾
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="py-12 px-4" style={{ background: theme === "dark" ? "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,201,255,0.1))" : "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(0,201,255,0.05))" }}>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">No solo consumas tecnología. <span className="text-[#00C9FF]">Créala.</span></h3>
            <p className="text-gray-600 dark:text-white/70">Nuestra metodología basada en proyectos te prepara con un portafolio real para tu futuro académico y profesional.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-4 px-4 sticky top-[130px] z-30" style={{ background: theme === "dark" ? "rgba(5,10,20,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-1">
          <Filter size={18} className="text-gray-400 shrink-0" />
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold shrink-0 transition-all duration-300" style={{ background: activeCategory === cat.id ? "linear-gradient(135deg, #7C3AED, #00C9FF)" : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"), color: activeCategory === cat.id ? "#fff" : (theme === "dark" ? "#fff" : "#111827"), border: activeCategory === cat.id ? "none" : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)") }}>
              <span>{cat.emoji}</span><span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <AnimatedSection key={course.id} delay={i * 60}>
                <div className="rounded-3xl overflow-hidden flex flex-col h-full group relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ background: theme === "dark" ? `linear-gradient(135deg, ${course.color}15, rgba(5,10,20,0.95))` : `linear-gradient(135deg, ${course.color}10, rgba(255,255,255,0.95))`, border: theme === "dark" ? `2px solid ${course.color}40` : `2px solid ${course.color}20` }}>
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
                    <p className="text-gray-600 dark:text-white/60 text-sm mb-4 flex-1 line-clamp-2">{course.desc}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[{ icon: Users, text: course.age }, { icon: Clock, text: course.duration }, { icon: BarChart2, text: course.level }, { icon: Monitor, text: course.modality.split(" / ")[0] }].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2"><Icon size={14} className="text-gray-400" /><span className="text-gray-600 dark:text-white/60 text-xs font-medium">{text}</span></div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.techs.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}40` }}>{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link to={`/cursos/adolescentes/${course.id}`} className="flex-1 py-3 rounded-2xl text-center text-sm font-black text-white transition-opacity hover:opacity-90" style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)` }}>¡Quiero este! 🚀</Link>
                      <a href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20curso%20${encodeURIComponent(course.title)}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl flex items-center justify-center text-[#25D366]" style={{ background: theme === "dark" ? "#25D36620" : "#25D36615" }}><MessageCircle size={18} /></a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradientMove { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </div>
  );
}