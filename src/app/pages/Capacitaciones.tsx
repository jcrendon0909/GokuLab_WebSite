import { useMemo } from "react";
import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { useTheme } from "next-themes";
import { 
  Briefcase, ShieldCheck, ArrowRight, 
  MessageCircle, CheckCircle, ExternalLink, Building2, TrendingUp 
} from "lucide-react";

import { coursesData } from "../../Data/courses";
import { CURSOS } from "../../Data/images";

const CORPORATE_IMG = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

export function Capacitaciones() {
  const { theme } = useTheme();

  // Filtramos dinámicamente solo los cursos de tipo "company"
  const corporateCourses = useMemo(() => {
    return Object.values(coursesData)
      .filter(c => c.targetAudience.includes("company"))
      .map(c => ({
        ...c,
        img: (CURSOS as any)[c.imgKey] || CORPORATE_IMG,
      }));
  }, []);

  return (
    <div className="bg-[#050A14] text-white min-h-screen selection:bg-[#10B981] selection:text-black">
      
      {/* 1. HERO CORPORATIVO */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#10B981]/10 border border-[#10B981]/30 backdrop-blur-md">
              <Building2 size={16} className="text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981] uppercase tracking-widest">Soluciones B2B</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter">
              Potencia a tu equipo con <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#00C9FF]">
                tecnología real.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Diseñamos programas de capacitación a la medida para empresas y gobierno. Desde alfabetización digital hasta Inteligencia Artificial y transformación operativa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5612668168?text=Hola,%20quiero%20información%20sobre%20capacitación%20corporativa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#10B981] text-black font-black rounded-full hover:scale-105 transition-transform text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <MessageCircle size={20} />
                Solicitar Cotización
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="w-full lg:w-1/2 relative">
          <AnimatedSection delay={100}>
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img src={CORPORATE_IMG} alt="Capacitación Corporativa" className="w-full h-full object-cover aspect-[4/3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
            </div>
            {/* Tarjeta flotante */}
            <div className="absolute -bottom-6 -left-6 bg-[#0A0F1E] border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-2xl">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center">
                <TrendingUp className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-white font-black text-lg">+500</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Profesionales capacitados</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. CATÁLOGO B2B DINÁMICO */}
      <section className="py-24 px-4 bg-[#0A0F1E] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              Programas <span className="text-[#10B981]">Corporativos</span>
            </h2>
            <p className="text-lg text-gray-400">
              Cursos diseñados para cerrar la brecha digital en tu organización.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateCourses.map((course, i) => (
              <AnimatedSection key={course.id} delay={i * 100}>
                <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#10B981]/50 transition-colors h-full flex flex-col group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                      {course.price}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-white mb-2">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-1">{course.subtitle}</p>
                    
                    <div className="space-y-2 mb-6">
                      {course.techs.slice(0, 3).map(tech => (
                        <div key={tech} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle size={14} className="text-[#10B981]" /> {tech}
                        </div>
                      ))}
                    </div>

                    <a
                      href={`https://wa.me/5612668168?text=Hola,%20me%20interesa%20el%20programa%20corporativo:%20${encodeURIComponent(course.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#10B981] hover:text-black font-bold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      Cotizar este programa <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PUENTE A BEHAVIORLAB (Gobernanza e IA Avanzada) */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#7C3AED]/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#0A0F1E] to-[#1A0B2E] border border-[#7C3AED]/30 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-xs font-black text-[#A78BFA] uppercase tracking-widest mb-6">
                  <ShieldCheck size={14} /> Firma Hermana
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  ¿Buscas Gobernanza de IA o Automatización Avanzada?
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Si tu empresa ya identificó una oportunidad pero necesita implementar políticas de IA, automatizar procesos complejos o desplegar agentes inteligentes, nuestro brazo especializado <strong>BehaviorLab</strong> es la respuesta.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://behaviorlab.gokulab.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-[#7C3AED] text-white font-bold rounded-xl hover:scale-105 transition-transform"
                  >
                    Conocer BehaviorLab <ExternalLink size={18} />
                  </a>
                  <Link
                    to="/contacto"
                    className="flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Hablar con un asesor
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-[#7C3AED]/10 rounded-full flex items-center justify-center border border-[#7C3AED]/30 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
                  <ShieldCheck size={80} className="text-[#7C3AED]" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. CTA FINAL CORPORATIVO */}
      <section className="py-20 px-4 text-center border-t border-white/5">
        <AnimatedSection className="max-w-3xl mx-auto">
          <Briefcase size={48} className="text-[#10B981] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Diseñemos el futuro de tu equipo
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Agenda un diagnóstico gratuito de necesidades y te propondremos un plan de capacitación a la medida.
          </p>
          <a
            href="https://wa.me/5612668168?text=Hola,%20quiero%20agendar%20un%20diagnóstico%20corporativo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#10B981] text-black font-black text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <MessageCircle size={22} />
            Agendar Diagnóstico B2B
          </a>
        </AnimatedSection>
      </section>

    </div>
  );
}