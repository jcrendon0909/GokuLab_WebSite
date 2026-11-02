import { Link } from "react-router";
import { AnimatedSection } from "../components/AnimatedSection";
import { TechScroll } from "../components/TechScroll";
import { SocialMediaFeed } from "../components/SocialMediaFeed";
import { HOME_IMAGES, GALERIA_HOME_IMAGES } from "../../Data/images";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Play,
  Code2,
  Rocket,
  ShieldCheck,
  Globe,
  MonitorPlay
} from "lucide-react";

export function Home() {
  return (
    // Forzamos el fondo oscuro premium para toda la página
    <div className="bg-[#050A14] text-white min-h-screen font-sans selection:bg-[#00C9FF] selection:text-black">
      
      {/* 1. HERO DISRUPTIVO (Estilo Bento Box) */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Texto Izquierda */}
        <div className="w-full lg:w-1/2 z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
              </span>
              <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">Inscripciones Abiertas 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
              No solo juegan.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C9FF] via-[#7C3AED] to-[#FFE134]">
                Crean el futuro.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              La academia donde la tecnología es el superpoder. Formamos a los creadores digitales del mañana con proyectos reales, mentalidad emprendedora y las soft skills que el mundo exige.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/test"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition-transform text-lg"
              >
                Descubrir mi curso ideal
                <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/5612668168?text=Hola,%20quiero%20agendar%20una%20masterclass%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg backdrop-blur-md"
              >
                <MessageCircle size={20} className="text-[#00C9FF]" />
                Masterclass Gratis
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Bento Box Derecha */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 h-[500px]">
          {/* Tarjeta 1: Imagen Grande */}
          <AnimatedSection delay={100} className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden border border-white/10 group">
            <img src={HOME_IMAGES.hero} alt="Niños programando" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-3 backdrop-blur-md bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
                <Play size={18} className="text-[#FFE134]" fill="#FFE134" />
                <span className="font-bold text-sm">Conoce nuestra metodología</span>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Tarjeta 2: Estadística */}
          <AnimatedSection delay={200} className="col-span-1 rounded-3xl bg-[#1E88E5]/10 border border-[#1E88E5]/20 p-6 flex flex-col justify-center items-center text-center">
            <span className="text-5xl font-black text-[#1E88E5] mb-2">+2k</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Alumnos felices</span>
          </AnimatedSection>

          {/* Tarjeta 3: Código / Tech */}
          <AnimatedSection delay={300} className="col-span-1 rounded-3xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 p-6 flex flex-col justify-center relative overflow-hidden">
            <Code2 size={48} className="text-[#7C3AED] mb-4" />
            <span className="text-lg font-black text-white leading-tight">Aprende<br/>Scratch, Python<br/>y Roblox</span>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. TECH SCROLL (Cinta de tecnologías) */}
      <section className="py-10 border-y border-white/5 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto text-center px-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-6">Tecnologías que dominarán el futuro</p>
          <TechScroll />
        </div>
      </section>

      {/* 3. AUDIENCIAS (Cursos) */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Un ecosistema para <span className="text-[#FFE134]">todas las edades</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            No importa si es su primer acercamiento a la tecnología o si busca especializarse. Tenemos la ruta perfecta.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Niños", age: "5-11 años", desc: "Lógica y creación por bloques.", href: "/cursos/ninos", img: HOME_IMAGES.ninos, color: "#FF6B35" },
            { title: "Adolescentes", age: "12-17 años", desc: "Videojuegos, código y preparación.", href: "/cursos/adolescentes", img: HOME_IMAGES.adultos, color: "#7C3AED" },
            { title: "Adultos", age: "18+ años", desc: "Reconversión y habilidades IA.", href: "/cursos/adultos", img: HOME_IMAGES.adultos, color: "#00C9FF" },
            { title: "Empresas", age: "Corporativo", desc: "Capacitación y transformación.", href: "/capacitaciones", img: HOME_IMAGES.corporativo, color: "#10B981" },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 100}>
              <Link to={item.href} className="group relative block h-[400px] rounded-3xl overflow-hidden border border-white/10">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1 block">{item.age}</span>
                  <h3 className="text-3xl font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 mb-6">{item.desc}</p>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white group-hover:text-black transition-colors" style={{ color: item.color }}>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 4. COMUNIDAD VIVA (Galería + Redes) */}
      <section className="py-24 bg-[#0A0F1E] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Nuestra comunidad <span className="text-[#10B981]">en acción</span>
            </h2>
            <p className="text-gray-400 text-lg">Mira lo que nuestros alumnos están creando hoy mismo.</p>
          </AnimatedSection>

          {/* Grid de Galería */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden h-[400px] border border-white/10">
              <img src={GALERIA_HOME_IMAGES.clasePV} alt="Clase" className="w-full h-full object-cover" />
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[400px] border border-white/10">
              <img src={GALERIA_HOME_IMAGES.robotica} alt="Robotica" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Feed Social (Reincorporado) */}
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-[#00C9FF]" />
              <h3 className="text-xl font-bold">Últimas noticias de nuestras redes</h3>
            </div>
            <SocialMediaFeed />
          </div>
        </div>
      </section>

      {/* 5. PUENTE EMPRESAS (BehaviorLab) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#7C3AED] to-[#050A14] border border-[#7C3AED]/30 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-bold mb-6">
                <ShieldCheck size={16} /> Soluciones B2B
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
                Lleva la innovación a tu <span className="text-[#FFE134]">empresa</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                Capacita a tu equipo en IA, automatización y liderazgo digital. Descubre cómo el ecosistema GōkuLab y BehaviorLab transforman organizaciones.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/capacitaciones" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
                  Ver programas corporativos
                </Link>
                <a href="https://behaviorlab.gokulab.mx" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                  Ir a BehaviorLab <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="md:w-1/3 hidden md:flex justify-center">
              <Rocket size={200} className="text-white/10" />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 6. CTA FINAL (Full Width) */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00C9FF]/10 via-transparent to-transparent pointer-events-none" />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto">
          <Sparkles size={48} className="text-[#FFE134] mx-auto mb-8 animate-pulse" />
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            El futuro no se espera,<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#7C3AED]">se programa.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Únete a la academia donde tus ideas se convierten en realidad.
          </p>
          <a
            href="https://wa.me/5612668168?text=Hola,%20quiero%20agendar%20una%20masterclass%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-transform"
          >
            <MessageCircle size={24} />
            Agendar Masterclass Gratuita
          </a>
        </AnimatedSection>
      </section>

    </div>
  );
}