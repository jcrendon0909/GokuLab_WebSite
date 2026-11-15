import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { AudienceTabs } from "../components/AudienceTabs";
import { useTheme } from "next-themes";
import { Clock, Users, Monitor, MessageCircle, Filter, Briefcase } from "lucide-react";
import { CourseData } from "../../Data/courses";
import { fetchAllCourses } from "../../Data/courseService";
import { SEO } from "../components/SEO";

export function CursosEmpresas() {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [cursos, setCursos] = useState<CourseData[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetchAllCourses().then(data => setCursos(data));
  }, []);

  const dynamicCourses = useMemo(() => {
    return cursos
      .filter(c => c.targetAudience.includes("company"))
      .map(c => ({
        ...c,
        img: c.imgKey ? `https://media.gokulab.mx/Galery/${c.imgKey}` : "https://media.gokulab.mx/Galery/pagina-principal1.jpg"
      }));
  }, [cursos]);

  const filtered = dynamicCourses.filter(c => activeCategory === "todos" || c.title.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <>
      <SEO 
        title="Capacitación Tecnológica para Empresas | GōkuLab B2B"
        description="Transforma tu equipo con nuestros programas corporativos en Inteligencia Artificial, Ciberseguridad y Liderazgo Digital."
        url="https://gokulab.mx/cursos/empresas"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Cursos corporativos en GōkuLab",
          "description": "Programas de capacitación tecnológica para empresas y organizaciones."
        }}
      />
      <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#10B981] selection:text-white">
        <div className="pt-20">
          <AudienceTabs active="empresas" />
        </div>

        <section className="pt-16 pb-16 px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm mb-6 bg-white/10 border border-white/20 text-[#10B981] font-bold uppercase tracking-wider">
                <Briefcase size={18} /> Soluciones B2B
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                Innovación para tu <span className="text-[#10B981]">Empresa</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Prepara a tu equipo para el futuro. Programas a la medida en IA, automatización y habilidades digitales para organizaciones.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course, i) => (
                <AnimatedSection key={course.id} delay={i * 60}>
                  <div className="rounded-3xl overflow-hidden flex flex-col h-full group bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2">
                    <div className="relative h-44 overflow-hidden">
                      <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = "https://media.gokulab.mx/Galery/pagina-principal1.jpg"; }} />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${course.color}dd, transparent)` }} />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm">{course.price}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 text-4xl drop-shadow-lg">{course.emoji}</div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-white mb-2 font-black text-base">{course.title}</h3>
                      <p className="text-white/60 text-sm mb-4 flex-1 line-clamp-2">{course.subtitle}</p>
                      <div className="flex gap-2 mt-auto">
                        <Link to={`/cursos/empresas/${course.id}`} className="flex-1 py-3 rounded-2xl text-center text-sm font-black text-white hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)` }}>
                          Ver programa
                        </Link>
                        <a href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20programa%20corporativo%20${encodeURIComponent(course.title)}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl flex items-center justify-center text-[#25D366] bg-[#25D36620]">
                          <MessageCircle size={18} />
                        </a>
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