import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { AudienceTabs } from "../components/AudienceTabs";
import { useTheme } from "next-themes";
import { Clock, Users, Monitor, MessageCircle, Filter } from "lucide-react";
import { CourseData } from "../../Data/courses";
import { fetchAllCourses } from "../../Data/courseService";
import { SEO } from "../components/SEO";

export function CursosNinos() {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [cursos, setCursos] = useState<CourseData[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetchAllCourses().then(data => setCursos(data));
  }, []);

  const dynamicCourses = useMemo(() => {
    return cursos
      .filter(c => c.targetAudience.includes("kids"))
      .map(c => ({
        ...c,
        img: c.imgKey ? `https://media.gokulab.mx/Galery/${c.imgKey}` : "https://media.gokulab.mx/Galery/pagina-principal1.jpg"
      }))
      .sort((a, b) => (a.orden_kids || 99) - (b.orden_kids || 99));
  }, [cursos]);

  const filtered = dynamicCourses.filter(c => activeCategory === "todos" || c.title.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <>
      <SEO title="Cursos de Tecnología y Robótica para Niños (5-11 años) | GōkuLab" description="Despierta la lógica y creatividad de tus hijos con nuestros cursos de programación, robótica y diseño. Clases divertidas en Naucalpan y Ezequiel Montes." url="https://gokulab.mx/cursos/ninos" schema={{ "@context": "https://schema.org", "@type": "ItemList", "name": "Cursos para niños en GōkuLab", "description": "Lista de cursos de tecnología para niños de 5 a 11 años." }} />
      <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#00C9FF] selection:text-black">
        <div className="pt-20"><AudienceTabs active="ninos" /></div>
        <section className="pt-16 pb-16 px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">¡Aprende <span className="text-[#FF6B35]">Creando!</span></h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Convierte su imaginación en realidad con programación, robótica y diseño. ¡Diversión garantizada! 🎮🤖🎨</p>
            </AnimatedSection>
          </div>
        </section>
        <section className="py-6 px-4 sticky top-20 z-40 transition-colors duration-300 bg-[#050A14]/95 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter size={16} className="text-gray-400 shrink-0" />
            {["todos", "programación", "videojuegos", "diseño", "robótica"].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-bold shrink-0 capitalize transition-all ${activeCategory === cat ? "bg-[#FF6B35] text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>{cat}</button>
            ))}
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course, i) => (
                <AnimatedSection key={course.id} delay={i * 60}>
                  <div className="rounded-3xl overflow-hidden flex flex-col h-full group bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = "https://media.gokulab.mx/Galery/pagina-principal1.jpg"; }} />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${course.color}dd, transparent)` }} />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm">{course.price}</span>
                        <span className="text-xs px-3 py-1.5 rounded-full font-bold w-fit" style={{ background: course.color, color: "#fff" }}>{course.level}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 text-4xl drop-shadow-lg">{course.emoji}</div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-white mb-2 font-black text-base">{course.title}</h3>
                      <p className="text-white/60 text-sm mb-4 flex-1 line-clamp-2">{course.subtitle}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[{ icon: Users, text: course.age }, { icon: Clock, text: course.duration }, { icon: Monitor, text: course.modality.split(",")[0] }].map(({ icon: Icon, text }) => (
                          <div key={text} className="flex items-center gap-2"><Icon size={14} className="text-gray-400" /><span className="text-white/60 text-xs font-medium">{text}</span></div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Link to={`/cursos/ninos/${course.id}`} className="flex-1 py-3 rounded-2xl text-center text-sm font-black text-white hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)` }}>Ver curso</Link>
                        <a href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20curso%20${encodeURIComponent(course.title)}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl flex items-center justify-center text-[#25D366] bg-[#25D36620]"><MessageCircle size={18} /></a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}