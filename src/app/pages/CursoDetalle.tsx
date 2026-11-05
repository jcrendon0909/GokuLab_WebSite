import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { fetchCourseById } from "../../Data/courseService";
import { CourseData } from "../../Data/courses";
import { SEO } from "../components/SEO"; // <-- IMPORTAMOS EL SEO
import {
  Clock, Users, BarChart2, Monitor, CheckCircle,
  MessageCircle, ChevronLeft, Zap, ChevronDown, Sparkles, Star, Play, X
} from "lucide-react";

// Componente de Acordeón
function ModuleAccordion({ modules, courseColor }: { modules: any[], courseColor: string }) {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id || null);

  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <div key={mod.id} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all duration-300 hover:border-white/20">
          <button onClick={() => setOpenId(openId === mod.id ? null : mod.id)} className="w-full flex items-center justify-between p-6 text-left">
            <div>
              <h4 className="font-black text-white text-lg">{mod.title}</h4>
              <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-bold">{mod.lessons} lecciones</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5" style={{ color: courseColor }}>
              <ChevronDown size={24} className={`transition-transform duration-300 ${openId === mod.id ? "rotate-180" : ""}`} />
            </div>
          </button>
          <div className={`transition-all duration-300 overflow-hidden ${openId === mod.id ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-6 pt-0 border-t border-white/5">
              <ul className="space-y-3 mt-4">
                {mod.topics.map((topic: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: courseColor }} />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CursoDetalle() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchCourseById(id).then((data) => {
        setCourse(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A14]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00C9FF]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050A14] text-white">
        <h1 className="text-4xl font-black mb-4">Curso no encontrado</h1>
        <Link to="/cursos" className="text-[#00C9FF] hover:underline font-bold text-lg">Volver al catálogo</Link>
      </div>
    );
  }

  // Obtener imagen dinámica de R2
  // 1. Si el curso trae imgKey, construimos la URL directo a R2 (con el CDN de Cloudflare)
// 2. Si no trae (o es un curso viejo), usamos la imagen genérica.
const courseImg = course.imgKey 
  ? `https://media.gokulab.mx/Galery/${course.imgKey}` 
  : "https://media.gokulab.mx/Galery/pagina-principal1.jpg";
  const whatsappMsg = encodeURIComponent(`Hola, quiero agendar una masterclass del curso: ${course.title}`);
  const videoUrl = (course as any).videoUrl || "https://media.gokulab.mx/Galery/caballerocodigo.mp4";

  return (
    <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#00C9FF] selection:text-black">
      
      {/* SEO DINÁMICO POR CURSO */}
      <SEO 
        title={`Curso de ${course.title}`}
        description={`${course.subtitle} Dirigido a ${course.age}. Nivel ${course.level}. ${course.modality}.`}
        image={courseImg}
        url={`https://gokulab.mx/cursos/${course.id}`}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": course.title,
          "description": course.subtitle,
          "provider": {
            "@type": "Organization",
            "name": "GōkuLab",
            "sameAs": "https://gokulab.mx"
          },
          "educationalLevel": course.level,
          "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "student",
            "audienceType": course.age
          },
          "offers": {
            "@type": "Offer",
            "price": "1600",
            "priceCurrency": "MXN",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      
      {/* MODAL DE VIDEO */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              className="w-full h-auto aspect-video"
            />
          </div>
        </div>
      )}

      {/* 1. HERO DEL CURSO */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Link to="/cursos" className="hover:text-white flex items-center gap-1 transition-colors">
              <ChevronLeft size={16} /> Cursos
            </Link>
            <span>/</span>
            <span style={{ color: course.color }}>{course.title}</span>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm font-black uppercase tracking-widest" style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}40` }}>
              <Zap size={14} />
              <span>{course.level}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
              {course.title}
            </h1>
            <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
              {course.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: Users, label: "Edad", value: course.age },
                { icon: Clock, label: "Duración", value: course.duration },
                { icon: Monitor, label: "Modalidad", value: course.modality },
                { icon: BarChart2, label: "Nivel", value: course.level },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-2 mb-1">
                    <Icon size={14} style={{ color: course.color }} /> {label}
                  </div>
                  <div className="text-white text-base font-black">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a href={`https://wa.me/5612668168?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-full text-black font-black text-lg transition-transform hover:scale-105 shadow-xl" style={{ background: `linear-gradient(135deg, ${course.color}, #ffffff)` }}>
                <MessageCircle size={22} />
                Agendar Masterclass
              </a>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Inversión</p>
                <p className="text-3xl font-black text-white">{course.price}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100} className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050A14] to-transparent z-10 rounded-[3rem]"></div>
            <div className="w-full aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
              <img src={courseImg} alt={`Curso de ${course.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Play size={32} className="text-white ml-2" fill="white" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#0A0F1E] border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-2xl z-20">
              <Star className="text-[#FFE134]" fill="#FFE134" size={24} />
              <div>
                <p className="text-white font-black text-sm">Top Rated</p>
                <p className="text-gray-400 text-xs">Por padres de familia</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. EL VALOR (SOFT SKILLS) */}
      <section className="py-24 px-4 bg-[#0A0F1E] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              El verdadero <span style={{ color: course.color }}>superpoder</span> que se lleva
            </h2>
            <p className="text-lg text-gray-400">
              No solo aprende a usar una computadora. Desarrolla habilidades para destacar en la escuela, en su futuro profesional y en la vida.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.valueProps.map((prop, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors h-full">
                  <div className="text-4xl mb-4">{prop.icon}</div>
                  <h3 className="text-xl font-black text-white mb-3">{prop.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{prop.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TEMARIO */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 font-black uppercase tracking-widest" style={{ background: `${course.color}20`, color: course.color }}>
            <Sparkles size={14} /> Temario
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Un camino paso a paso
          </h2>
        </AnimatedSection>

        {course.modules && course.modules.length > 0 ? (
          <AnimatedSection>
            <ModuleAccordion modules={course.modules} courseColor={course.color} />
          </AnimatedSection>
        ) : (
          <p className="text-center text-gray-500">Cargando temario...</p>
        )}

        <AnimatedSection className="mt-20 text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mb-8">Herramientas que dominará</p>
          <div className="flex flex-wrap justify-center gap-4">
            {course.techs.map((tech) => (
              <span key={tech} className="px-6 py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 text-white">
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* 4. CTA FINAL */}
      <section className="py-32 px-4 text-center relative overflow-hidden bg-[#0A0F1E]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            ¿Listo para ver a tu hijo <span style={{ color: course.color }}>crear</span> su propio futuro?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Agenda una clase muestra gratuita. Sin compromiso, solo diversión y tecnología.
          </p>
          <a href={`https://wa.me/5612668168?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-black font-black text-xl transition-transform hover:scale-105 shadow-xl" style={{ background: `linear-gradient(135deg, ${course.color}, #ffffff)` }}>
            <MessageCircle size={24} />
            Agendar Masterclass Gratuita
          </a>
        </AnimatedSection>
      </section>

    </div>
  );
}